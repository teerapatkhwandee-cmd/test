import type { BrowserContext } from '@playwright/test';

import { ORIGIN } from './config';
import { scenario } from './scenario';
const safeNavigation = /^\/en\/?$|^\/en\/search$|^\/en\/provider\/[^/]+$|^\/en\/organization_services\/[^/]+$|^\/en\/users\/sign_in$/;
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
    const firstParty = url.hostname === new URL(ORIGIN).hostname || url.hostname === 'gowabi.com' || url.hostname.endsWith('.gowabi.com');
    const readMethod = ['GET', 'HEAD', 'OPTIONS'].includes(request.method());
    const login = allowLogin && url.origin === ORIGIN &&
      ['/en/users/sign_in', '/en/users/sign_in_json'].includes(url.pathname) &&
      request.method() === 'POST' && loginAttempts === 0;

    const checkoutEntry = allowCheckout && url.origin === ORIGIN && request.method() === 'GET' &&
      url.pathname === `/en/organization_services/${scenario.serviceId}/buy_as_deal` && checkoutEntries === 0;
    const checkoutSummary = allowCheckout && checkoutEntries === 1 && url.origin === ORIGIN && request.method() === 'GET' &&
      /^\/en\/service_requests\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(url.pathname);
    let reason = '';
    if (firstParty && transactionPath.test(url.pathname) && !checkoutSummary) reason = 'Transaction endpoint';
    else if (!readMethod && !login) reason = 'Write request';
    else if (request.isNavigationRequest() && request.frame().parentFrame() === null &&
      !(url.origin === ORIGIN && safeNavigation.test(url.pathname)) && !checkoutEntry && !checkoutSummary) reason = 'Unreviewed navigation';

    if (reason) {
      // Never retain request bodies, query strings, headers, cookies, or credentials.
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
