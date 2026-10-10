import type { BrowserContext } from '@playwright/test';

import { ORIGIN } from './config';
import { scenario } from './scenario';

const safeNavigation = /^\/en(?:\/.*)?$/;
const transactionPath = /\/(?:service_requests|carts|bookings|payments|purchases|orders)(?:\/|$)/i;

export type BlockedRequest = { method: string; hostname: string; path: string; reason: string };

/** Defense in depth; checkout inspection stops before any confirmation action. */
export async function installProductionSafety(context: BrowserContext, allowLogin: boolean, allowCheckout = false) {
  const blocked: BlockedRequest[] = [];
  let loginAttempts = 0;
  let checkoutEntries = 0;
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    
    // ตรวจจับว่าเป็น First Party Domain โดยไม่ยึดติดกับ ORIGIN exact match
    const firstParty = url.hostname === new URL(ORIGIN).hostname || url.hostname === 'gowabi.com' || url.hostname.endsWith('.gowabi.com');
    const readMethod = ['GET', 'HEAD', 'OPTIONS'].includes(request.method());
    
    const isAvailabilityCheck = url.pathname.includes('/member_availability');
    // 🟢 อนุญาต Request Validation ของ Service เพื่อเปลี่ยนหน้าเข้า Checkout
    const isServiceValidation = url.pathname.includes('/validate_service_request') || url.pathname.includes('/create_service_request');
    const isLoginPage = ['/en/users/sign_in', '/en/users/sign_in_json'].includes(url.pathname);
    const login = allowLogin && firstParty && isLoginPage && request.method() === 'POST' && loginAttempts === 0;

    const checkoutEntry = allowCheckout && firstParty && request.method() === 'GET' &&
      url.pathname === `/en/organization_services/${scenario.serviceId}/buy_as_deal` && checkoutEntries === 0;
    const checkoutSummary = allowCheckout && checkoutEntries === 1 && firstParty && request.method() === 'GET' &&
      /^\/en\/service_requests\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(url.pathname);
    
    let reason = '';
    if (firstParty && transactionPath.test(url.pathname) && !checkoutSummary) reason = 'Transaction endpoint';
    // 🟢 เพิ่ม !isServiceValidation ลงในเงื่อนไขตรงนี้
    else if (!readMethod && !login && !isAvailabilityCheck && !isServiceValidation) reason = 'Write request';
    // ใช้ firstParty ร่วมกับ safeNavigation เพื่อปล่อยผ่านหน้า /en
    else if (request.isNavigationRequest() && request.frame().parentFrame() === null &&
      !(firstParty && (safeNavigation.test(url.pathname) || isLoginPage)) && !checkoutEntry && !checkoutSummary) {
      reason = 'Unreviewed navigation';
    }

    if (reason) {
      if (firstParty || request.isNavigationRequest()) {
        blocked.push({ method: request.method(), hostname: url.hostname, path: url.pathname, reason });
      }
      await route.abort('blockedbyclient');
      return;
    }
    if (login) loginAttempts++;
    if (checkoutEntry) checkoutEntries++;
    await route.continue();
  });
  await context.routeWebSocket('**/*', socket => socket.close());
  return blocked;
}