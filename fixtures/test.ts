import { test as base, expect } from '@playwright/test';
import { installProductionSafety, type BlockedRequest } from '../helpers/production-safety';
import { scenario } from '../helpers/scenario';
import { fitDesktopViewport } from '../helpers/desktop-viewport';
import { HomePage } from '../pages/home.page';
import { SearchPage } from '../pages/search.page';
import { SalonPage } from '../pages/salon.page';
import { ServicePage } from '../pages/service.page';
import { LoginPage } from '../pages/login.page';

type Fixtures = {
  allowLogin: boolean;
  allowCheckout: boolean;
  safety: BlockedRequest[];
  home: HomePage;
  search: SearchPage;
  salon: SalonPage;
  service: ServicePage;
  login: LoginPage;
};

export const test = base.extend<Fixtures>({
  viewport: async ({ headless }, use) => {
    await use(headless ? { width: 1920, height: 1080 } : null);
  },
  page: async ({ page, headless }, use) => {
    const session = headless ? undefined : await fitDesktopViewport(page);
    try {
      await use(page);
    } finally {
      if (!page.isClosed()) await session?.detach();
    }
  },
  allowLogin: [false, { option: true }],
  allowCheckout: [false, { option: true }],
  safety: [async ({ context, allowLogin, allowCheckout }, use, testInfo) => {
    if (testInfo.config.workers !== 1) throw new Error('Production safety requires exactly one worker.');
    const blocked = await installProductionSafety(context, allowLogin, allowCheckout);
    await use(blocked);
    await testInfo.attach('blocked-production-requests', {
      body: JSON.stringify(blocked, null, 2), contentType: 'application/json',
    });
    const expectedBlocks = new Set(['/en/users/save_action_after', '/cdn-cgi/rum']);
    const unexpected = blocked.filter(r => 
      !expectedBlocks.has(r.path) && 
      !(r.method === 'POST' && r.path === '/tr/' && r.reason === 'Write request') &&
      r.reason !== 'Unreviewed navigation'
    );
    expect(unexpected, 'Unexpected production request blocked; review flow before extending access').toEqual([]);
  }, { auto: true }],
  home: async ({ page }, use) => use(new HomePage(page)),
  search: async ({ page }, use) => use(new SearchPage(page)),
  salon: async ({ page }, use) => use(new SalonPage(page, scenario)),
  service: async ({ page }, use) => use(new ServicePage(page)),
  login: async ({ page }, use) => use(new LoginPage(page)),
});

export { expect } from '@playwright/test';