# Complete final project files

Generated from delivered source. No credentials or runtime reports are included.

## .gitignore

```text
node_modules/
playwright-report/
test-results/
blob-report/
.playwright-mcp/
.auth/
.env
.env.*
!.env.example
*.tsbuildinfo
.DS_Store
```

## .env.example

```text
# Copy to .env locally. Never commit .env or credentials.
GOWABI_EMAIL=
GOWABI_PASSWORD=
# Production tests are opt-in. Login is a separate opt-in.
GOWABI_RUN_PRODUCTION=0
GOWABI_RUN_LOGIN=0
```

## package.json

```json
{
  "name": "gowabi-production-qa",
  "version": "1.0.0",
  "private": true,
  "engines": { "node": ">=20" },
  "scripts": {
    "test": "playwright test",
    "test:production": "playwright test --grep @catalog",
    "test:login": "playwright test --grep @login",
    "test:list": "playwright test --list",
    "typecheck": "tsc --noEmit",
    "report": "playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "1.62.1",
    "@types/node": "22.10.2",
    "dotenv": "16.4.7",
    "typescript": "5.7.2"
  }
}
```

## package-lock.json

```json
{
  "name": "gowabi-production-qa",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "gowabi-production-qa",
      "version": "1.0.0",
      "devDependencies": {
        "@playwright/test": "1.62.1",
        "@types/node": "22.10.2",
        "dotenv": "16.4.7",
        "typescript": "5.7.2"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@playwright/test": {
      "version": "1.62.1",
      "resolved": "https://registry.npmjs.org/@playwright/test/-/test-1.62.1.tgz",
      "integrity": "sha512-DTcUc8qii+cpHvtOwggMtBRMjKZHXYWdw8syRYu2vtzuq4Wxphqq4NfCs5Zt44L6mA8rfDfj+PHnxFc/FeK6mQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "playwright": "1.62.1"
      },
      "bin": {
        "playwright": "cli.js"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@types/node": {
      "version": "22.10.2",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-22.10.2.tgz",
      "integrity": "sha512-Xxr6BBRCAOQixvonOye19wnzyDiUtTeqldOOmj3CkeblonbccA12PFwlufvRdrpjXxqnmUaeiU5EOA+7s5diUQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.20.0"
      }
    },
    "node_modules/dotenv": {
      "version": "16.4.7",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-16.4.7.tgz",
      "integrity": "sha512-47qPchRCykZC03FhkYAhrvwU4xDBFIj1QPqaarj6mdM/hgUzfPHcpkHJOn3mJAufFeeAxAzeGsr5X0M4k6fLZQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",
      "integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/playwright": {
      "version": "1.62.1",
      "resolved": "https://registry.npmjs.org/playwright/-/playwright-1.62.1.tgz",
      "integrity": "sha512-0M+L3LAD8/nm554LOla9Ayx0j0tmFZ0FBcoQ7F1VuVHpM/XpiC8RcDzBQB8W5+hA8L22THxELzeF+2WcUzvcLg==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "playwright-core": "1.62.1"
      },
      "bin": {
        "playwright": "cli.js"
      },
      "engines": {
        "node": ">=20"
      },
      "optionalDependencies": {
        "fsevents": "2.3.2"
      }
    },
    "node_modules/playwright-core": {
      "version": "1.62.1",
      "resolved": "https://registry.npmjs.org/playwright-core/-/playwright-core-1.62.1.tgz",
      "integrity": "sha512-wPYSwEBJY9GHraISXqyqtx0na0LpO3XEX7jNDhntbex7tzUS7kLnZsOlFruFJB4Hi/rhDMjXGqHewDZ68nYZVw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "playwright-core": "cli.js"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/typescript": {
      "version": "5.7.2",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.7.2.tgz",
      "integrity": "sha512-i5t66RHxDvVN40HfDd1PsEThGNnlMCMT3jMUuoh9/0TaqWevNontacunWyN02LA9/fIbEWlcHZcgTKb9QoaLfg==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "6.20.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.20.0.tgz",
      "integrity": "sha512-Ny6QZ2Nju20vw1SRHe3d9jVu6gJ+4e3+MMpqu7pqE5HT6WsTSlce++GQmK5UXS8mzV8DSYHrQH+Xrf2jVcuKNg==",
      "dev": true,
      "license": "MIT"
    }
  }
}
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["playwright.config.ts", "tests/**/*.ts", "pages/**/*.ts", "fixtures/**/*.ts", "helpers/**/*.ts"]
}
```

## playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: !!process.env.CI,
  maxFailures: 1,
  timeout: 120_000,
  expect: { timeout: 20_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.gowabi.com',
    ...devices['Desktop Chrome'],
    locale: 'en-US',
    timezoneId: 'Asia/Bangkok',
    navigationTimeout: 60_000,
    actionTimeout: 20_000,
    serviceWorkers: 'block',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
```

## .github/workflows/playwright.yml

```yaml
name: Playwright QA
on:
  push:
  pull_request:
  workflow_dispatch:
    inputs:
      run_production:
        description: Run the single read-only production catalog journey
        type: boolean
        default: false

permissions:
  contents: read

# Serialize this repository's jobs; never fan out production tests in a matrix.
concurrency:
  group: gowabi-production-qa
  cancel-in-progress: false

jobs:
  qa:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    env:
      GOWABI_RUN_LOGIN: '0'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run test:list
      - if: github.event_name == 'workflow_dispatch' && inputs.run_production
        run: npx playwright install --with-deps chromium
      - if: github.event_name == 'workflow_dispatch' && inputs.run_production
        run: npm run test:production
        env:
          GOWABI_RUN_PRODUCTION: '1'
      - uses: actions/upload-artifact@v4
        if: always() && github.event_name == 'workflow_dispatch' && inputs.run_production
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

## helpers/production-safety.ts

```typescript
import type { BrowserContext } from '@playwright/test';

export const ORIGIN = 'https://www.gowabi.com';
const safeNavigation = /^\/en\/?$|^\/en\/search$|^\/en\/provider\/[^/]+$|^\/en\/organization_services\/[^/]+$|^\/en\/users\/sign_in$/;
const transactionPath = /\/(?:service_requests|carts|bookings|payments|purchases|orders)(?:\/|$)/i;

export type BlockedRequest = { method: string; path: string; reason: string };

/** Defense in depth; page objects must also avoid transaction actions. */
export async function installProductionSafety(context: BrowserContext, allowLogin: boolean) {
  const blocked: BlockedRequest[] = [];
  let loginAttempts = 0;
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    const firstParty = url.hostname === 'gowabi.com' || url.hostname.endsWith('.gowabi.com');
    const readMethod = ['GET', 'HEAD', 'OPTIONS'].includes(request.method());
    const login = allowLogin && url.origin === ORIGIN &&
      ['/en/users/sign_in', '/en/users/sign_in_json'].includes(url.pathname) &&
      request.method() === 'POST' && loginAttempts === 0;

    let reason = '';
    if (firstParty && transactionPath.test(url.pathname)) reason = 'Transaction endpoint';
    else if (!readMethod && !login) reason = 'Write request';
    else if (request.isNavigationRequest() && request.frame().parentFrame() === null &&
      !(url.origin === ORIGIN && safeNavigation.test(url.pathname))) reason = 'Unreviewed navigation';

    if (reason) {
      // Never retain request bodies, query strings, headers, cookies, or credentials.
      if (firstParty || request.isNavigationRequest()) {
        blocked.push({ method: request.method(), path: url.pathname, reason });
      }
      await route.abort('blockedbyclient');
      return;
    }
    if (login) loginAttempts++;
    await route.continue();
  });
  await context.routeWebSocket('**/*', socket => socket.close());
  return blocked;
}
```

## helpers/credentials.ts

```typescript
export function getCredentials(): { email: string; password: string } {
  const email = process.env.GOWABI_EMAIL?.trim();
  const password = process.env.GOWABI_PASSWORD;
  if (!email || !password) {
    throw new Error('Set GOWABI_EMAIL and GOWABI_PASSWORD in the local .env file or environment. Do not put credentials in test code.');
  }
  return { email, password };
}
```

## helpers/money.ts

```typescript
export function parseBaht(text: string): number {
  const match = text.trim().match(/^฿\s*([\d,]+(?:\.\d{1,2})?)$/u);
  if (!match) throw new Error('Expected one THB price from the scoped current-price element.');
  const amount = Number(match[1].replaceAll(',', ''));
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('Expected a positive service price.');
  return amount;
}
```

## fixtures/test.ts

```typescript
import { test as base, expect } from '@playwright/test';
import { installProductionSafety, type BlockedRequest } from '../helpers/production-safety';
import { HomePage } from '../pages/home.page';
import { SearchPage } from '../pages/search.page';
import { SalonPage } from '../pages/salon.page';
import { ServicePage } from '../pages/service.page';
import { LoginPage } from '../pages/login.page';

type Fixtures = {
  allowLogin: boolean;
  safety: BlockedRequest[];
  home: HomePage;
  search: SearchPage;
  salon: SalonPage;
  service: ServicePage;
  login: LoginPage;
};

export const test = base.extend<Fixtures>({
  allowLogin: [false, { option: true }],
  safety: [async ({ context, allowLogin }, use, testInfo) => {
    if (testInfo.config.workers !== 1) throw new Error('Production safety requires exactly one worker.');
    const blocked = await installProductionSafety(context, allowLogin);
    await use(blocked);
    await testInfo.attach('blocked-production-requests', {
      body: JSON.stringify(blocked, null, 2), contentType: 'application/json',
    });
    // Saving a pending purchase action is intentionally blocked at the anonymous login boundary.
    // Cloudflare real-user telemetry is also blocked; it is not needed for the journey.
    const expectedBlocks = new Set(['/en/users/save_action_after', '/cdn-cgi/rum']);
    const unexpected = blocked.filter(r => !expectedBlocks.has(r.path));
    expect(unexpected, 'Unexpected production request blocked; review flow before extending access').toEqual([]);
  }, { auto: true }],
  home: async ({ page }, use) => use(new HomePage(page)),
  search: async ({ page }, use) => use(new SearchPage(page)),
  salon: async ({ page }, use) => use(new SalonPage(page)),
  service: async ({ page }, use) => use(new ServicePage(page)),
  login: async ({ page }, use) => use(new LoginPage(page)),
});

export { expect } from '@playwright/test';
```

## pages/home.page.ts

```typescript
import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/en', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('textbox', {
      name: 'Type venue or service you want to book', exact: true,
    })).toBeVisible();
  }

  async searchForMassage() {
    const input = this.page.getByRole('textbox', {
      name: 'Type venue or service you want to book', exact: true,
    });
    await input.fill('massage');
    await expect(input).toHaveValue('massage');
    await this.page.getByRole('button', { name: 'SEARCH', exact: true }).click();
    await expect(this.page).toHaveURL(url => url.pathname === '/en/search' &&
      url.searchParams.get('filter[search_text]') === 'massage');
  }
}
```

## pages/search.page.ts

```typescript
import { expect, type Page } from '@playwright/test';

export class SearchPage {
  constructor(private readonly page: Page) {}

  async openMassageHome() {
    // Image alt text includes both English and Thai; match only the observed English prefix.
    const salonLink = this.page.getByRole('link', { name: /^Massage Home Massage Home/ });
    await expect(salonLink, 'Reviewed Bangkok salon must appear in massage results').toHaveCount(1);
    await expect(salonLink).toBeVisible();
    await salonLink.click();
    await expect(this.page).toHaveURL(/\/en\/provider\/massage-home$/);
  }
}
```

## pages/salon.page.ts

```typescript
import { expect, type Page } from '@playwright/test';
import { parseBaht } from '../helpers/money';

export class SalonPage {
  constructor(private readonly page: Page) {}

  get thaiMassage() {
    // Duration distinguishes variants; price is deliberately excluded from the locator.
    return this.page.getByRole('tab', { name: /^Thai Massage 60 min / });
  }

  async verifyBangkokSalon() {
    await expect(this.page.getByRole('heading', { name: 'Massage Home', exact: true })).toBeVisible();
    await expect(this.page.getByRole('paragraph').filter({
      hasText: /^5\/9D Aqua Residences, Bang Kho, Chom Thong, Bangkok, 10150$/,
    })).toBeVisible();
    await expect(this.thaiMassage, 'Reviewed service missing; do not silently select a different service').toHaveCount(1);
    await expect(this.thaiMassage).toBeVisible();
  }

  async currentPrice() {
    // No role, accessible label, or test ID exists for the observed price span.
    const price = this.thaiMassage.locator('.prices');
    await expect(price).toHaveCount(1);
    await expect(price).toHaveText(/^\s*฿\s*[\d,]+(?:\.\d{1,2})?\s*$/u);
    return parseBaht(await price.innerText());
  }

  async openServiceDetails() {
    await this.thaiMassage.getByRole('link', { name: 'Thai Massage', exact: true }).click();
    await expect(this.page).toHaveURL(/\/en\/organization_services\/thai-massage-/);
  }

  async unavailable() {
    // Only an explicit service-scoped availability message justifies a skip.
    return this.thaiMassage.getByText(/sold out|unavailable|หมด|ไม่พร้อมให้บริการ/i).isVisible();
  }

  async showAnonymousLoginBoundary() {
    const buy = this.thaiMassage.getByRole('button', { name: 'Buy eVoucher', exact: true });
    await expect(buy).toBeEnabled();
    await buy.click();
    await expect(this.page.getByRole('dialog').getByRole('heading', {
      name: 'Log in to GoWabi', exact: true,
    })).toBeVisible();
    // Do not log in from here: production may resume a pending purchase action.
  }
}
```

## pages/service.page.ts

```typescript
import { expect, type Page } from '@playwright/test';
import { parseBaht } from '../helpers/money';

export class ServicePage {
  constructor(private readonly page: Page) {}

  async verifyVoucherDetails(expectedPrice: number) {
    await expect(this.page.getByRole('heading', { name: 'Thai Massage', exact: true })).toBeVisible();
    const breadcrumb = this.page.getByRole('list').filter({
      has: this.page.getByRole('link', { name: 'Home', exact: true }),
    });
    await expect(breadcrumb.getByRole('link', { name: 'Massage Home', exact: true })).toBeVisible();
    // DOM-observed fallback scoped to the primary price, excluding similar services and struck prices.
    const price = this.page.locator('.org-service-show__price-container .bold');
    await expect(price).toHaveCount(1);
    await expect(price).toHaveText(/^\s*฿\s*[\d,]+(?:\.\d{1,2})?\s*$/u);
    expect(parseBaht(await price.innerText()), 'Price should match the selected salon card').toBe(expectedPrice);
    await expect(this.page.getByRole('listitem').filter({
      hasText: /^\s*This voucher is valid for \d+ days after purchase\.\s*$/,
    })).toBeVisible();
    await this.page.getByText('How can I make an appointment or change my appointment date?', {
      exact: true,
    }).click();
    await expect(this.page.getByText(/You can make or reschedule an appointment directly with the shop/)).toBeVisible();
    // FAQ is positive evidence; absence checks alone do not establish an eVoucher flow.
    await expect(this.page.getByRole('button', { name: 'Buy eVoucher', exact: true })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: /date|time|วันที่|เวลา/i })).toHaveCount(0);
    await expect(this.page.locator('input[type="date"], input[type="time"], input[type="datetime-local"]')).toHaveCount(0);
    await expect(this.page.getByRole('grid')).toHaveCount(0);
    // No purchase, cart, time-slot reservation, or checkout action is exposed here.
  }
}
```

## pages/login.page.ts

```typescript
import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    // Fresh test context plus direct login avoids the pending eVoucher action.
    await this.page.goto('/en/users/sign_in', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Log in to GoWabi', exact: true })).toBeVisible();
  }

  async signIn(credentials: { email: string; password: string }) {
    let responseStatus: number | undefined;
    let stage = 'fill login form';
    try {
      await this.page.getByRole('textbox', { name: 'Email', exact: true }).fill(credentials.email);
      await this.page.getByRole('textbox', { name: 'Password', exact: true }).fill(credentials.password);
      stage = 'submit login and receive response';
      const [response] = await Promise.all([
        this.page.waitForResponse(response => {
          const url = new URL(response.url());
          return url.origin === 'https://www.gowabi.com' &&
            ['/en/users/sign_in', '/en/users/sign_in_json'].includes(url.pathname) &&
            response.request().method() === 'POST';
        }),
        this.page.getByRole('button', { name: 'LOGIN', exact: true }).click(),
      ]);
      // Record only HTTP status, never response bodies, tokens or credential values.
      responseStatus = response.status();
      await response.finished();
      // HTTP 200 is not authentication proof and AJAX login need not redirect automatically.
      // Read home in this same context and verify the actual authenticated menu.
      stage = 'open home in the same session';
      await this.page.goto('/en', { waitUntil: 'domcontentloaded' });
      await expect(this.page).toHaveURL(/\/en\/?$/);
      stage = 'open account menu';
      await this.page.getByRole('button', { name: 'Toggle navigation', exact: true }).click();
      stage = 'verify authenticated Log Out link';
      await expect(this.page.getByRole('link', { name: 'Log Out', exact: true })).toBeVisible();
    } catch {
      throw new Error(`Login was not verified at stage "${stage}" (HTTP status: ${responseStatus ?? 'not received'}). Check the account manually; no automatic retry or checkout continuation was performed.`);
    } finally {
      // Playwright error-context snapshots can expose password input values even with tracing off.
      // Close this credential-bearing page before the runner captures failure artifacts.
      await this.page.close().catch(() => {});
    }
    // One attempt only. No CAPTCHA bypass, OTP requests, account creation or purchases.
  }
}
```

## tests/catalog/massage-voucher.spec.ts

```typescript
import { test, expect } from '../../fixtures/test';

test.skip(process.env.GOWABI_RUN_PRODUCTION !== '1', 'Set GOWABI_RUN_PRODUCTION=1 for one safe production run.');

test('Bangkok massage eVoucher details and anonymous login boundary @catalog', async ({
  page, home, search, salon, service,
}, testInfo) => {
  await test.step('Search massage and open the reviewed Bangkok salon', async () => {
    await home.open();
    await home.searchForMassage();
    await search.openMassageHome();
    await salon.verifyBangkokSalon();
  });
  test.skip(await salon.unavailable(), 'Selected service is explicitly unavailable; no alternative purchase attempted.');
  const price = await salon.currentPrice();
  await test.step('Inspect the selected service and verify eVoucher limitations', async () => {
    await salon.openServiceDetails();
    await service.verifyVoucherDetails(price);
  });
  await testInfo.attach('observed-selection', {
    body: JSON.stringify({
      salon: 'Massage Home', service: 'Thai Massage', durationMinutes: 60,
      priceTHB: price, date: null, time: null, flow: 'eVoucher',
      limitation: 'Appointment arranged with salon after purchase. Checkout not verified.',
    }, null, 2), contentType: 'application/json',
  });
  await test.step('Stop at anonymous login without saving a pending purchase', async () => {
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/en\/provider\/massage-home$/);
    await salon.verifyBangkokSalon();
    await salon.showAnonymousLoginBoundary();
    await expect(page).toHaveURL(/\/en\/provider\/massage-home$/);
  });
});
```

## tests/auth/login.spec.ts

```typescript
import { test } from '../../fixtures/test';
import { getCredentials } from '../../helpers/credentials';

test.use({ allowLogin: true });
test.skip(process.env.GOWABI_RUN_PRODUCTION !== '1' || process.env.GOWABI_RUN_LOGIN !== '1',
  'Real login requires GOWABI_RUN_PRODUCTION=1 and GOWABI_RUN_LOGIN=1.');

test('Existing account can log in and stops at home @login', async ({ login }) => {
  const credentials = getCredentials();
  await login.open();
  await login.signIn(credentials);
});
```

## README.md

````markdown
# GoWabi Playwright QA assignment

TypeScript, **@playwright/test 1.62.1**, Chromium, **one worker**, no retries or fixed sleeps.
This is a new project: the workspace initially contained only Playwright MCP inspection artifacts.

## Quick start

```sh
npm ci
npx playwright install chromium
npm run typecheck
npm run test:list
GOWABI_RUN_PRODUCTION=1 npm run test:production
npm run report
```

The production command runs one catalog journey. `npm test` skips live tests unless explicitly enabled.
Do not run multiple terminal sessions, use sharding, increase workers, or use this project for load testing.
If a production restriction or challenge appears, stop and report it; do not disable it.

## Optional real login

The owner authorized an existing account login. Credentials are **not** included in this project.
Copy `.env.example` to `.env` locally and populate `GOWABI_EMAIL` and `GOWABI_PASSWORD`.
Alternatively export these variables in your terminal. Shell environment values take precedence over `.env`.
Never put a password in chat, a command argument, test source, or a committed file.

```sh
cp .env.example .env
# Edit .env locally before running the next command.
GOWABI_RUN_PRODUCTION=1 GOWABI_RUN_LOGIN=1 npm run test:login
```

Login uses a **fresh browser context and the standalone login page**, then stops at the home page.
It never submits credentials in the purchase-triggered modal, because the website can resume a saved purchase action after login.
Only one login POST is allowed, to `/en/users/sign_in` or the live-observed AJAX endpoint `/en/users/sign_in_json`. Missing credentials fail before navigation when this test is explicitly enabled.
Invalid credentials, OTP, CAPTCHA, or an unexpected redirect fail the test without another login attempt.
Login is never enabled in CI. No account creation, password recovery, or logout mutation is performed.
Browser contexts close after each test. Authentication state is neither saved nor committed.
The login page is closed before failure artifacts are captured because Playwright error-context snapshots can include password input values even with tracing disabled. Local reports may still contain account UI information: do not publish reports from real-login runs.

## Actual live inspection, 5 September 2026

Inspected with **Playwright MCP**, using the live rendered UI rather than repository source code.

1. Opened `https://www.gowabi.com/en`.
2. Filled the search textbox with `massage` and clicked `SEARCH`.
3. Search navigated to `/en/search` with `filter[search_text]=massage`.
4. Opened **Massage Home**, whose address is **5/9D Aqua Residences, Bang Kho, Chom Thong, Bangkok, 10150**.
5. Located the **Thai Massage, 60 min** card. It exposes `Add to Cart` and `Buy eVoucher`.
6. Followed the **Thai Massage** service-name link to its service-detail page.
7. The detail page identifies an **eVoucher**. The appointment FAQ says appointments are arranged directly with the shop, and its contact information becomes available after purchase.
8. In a fresh anonymous context, clicking the card's **Buy eVoucher** displayed the **Log in to GoWabi** modal on the salon page. Email, Password and LOGIN were visible.
9. That action attempted `POST /en/users/save_action_after`. This request was **blocked**, not fulfilled or faked, to avoid saving an action that could resume after authentication.

The automated boundary test therefore checks the real login modal **with a documented safety interception**. It is not a full, unmodified checkout end-to-end test.

Earlier, a login modal appeared after the recorded `How To Book` click, followed later by an unexplained change to a `/en/service_requests/<id>` URL. The shared MCP browser was subsequently found to have an authenticated session. That earlier observation is ambiguous and is **not** used as the canonical flow or test expectation. The fresh anonymous inspection above establishes the reproducible login boundary.

A later guarded probe using the existing authenticated session also reported a service-request URL. No checkout summary fields were established. This is not evidence of a completed booking, nor proof that no server-side draft exists. The automation does not reproduce this authenticated purchase continuation.

## Assignment coverage and limitations

| Requirement | Observed / implemented |
| --- | --- |
| Open English homepage, search massage | Implemented through visible UI |
| Bangkok salon | Explicit address assertion on Massage Home |
| Select massage service | Opens the Thai Massage 60-minute detail page and inspects its card |
| Date selection | Not offered in the inspected eVoucher UI; intentionally not fabricated |
| Available time selection | Not offered in the inspected eVoucher UI; intentionally not fabricated |
| Continue toward checkout | Anonymous Buy eVoucher opens login; pending action is blocked |
| Login | Separate opt-in test using environment credentials; stops at home |
| Checkout salon/service/price | **Unverified**; catalog details are not presented as checkout assertions |
| Checkout date/time | **Unverified**; there is no selected appointment date/time in the inspected flow |
| Payment/purchase/booking confirmation | Prohibited; no automation method performs it |

The observed voucher service requires contacting the shop for an appointment after purchase.
Duration (60 minutes), voucher expiry, and the shop's opening hours are **not** a selected appointment date or an available slot.
These findings apply to this inspected service; they do not establish that every GoWabi provider uses the same flow.
Full checkout assertions need an approved non-production environment, or a separately verified production route that does not create a service request, reservation, order, or purchase.

## Locator evidence

| Element | Locator |
| --- | --- |
| Homepage search | `getByRole('textbox', { name: 'Type venue or service you want to book', exact: true })` |
| Search button | `getByRole('button', { name: 'SEARCH', exact: true })` |
| Search result | `getByRole('link', { name: /^Massage Home Massage Home/ })` |
| Salon heading | `getByRole('heading', { name: 'Massage Home', exact: true })` |
| Salon address | `getByRole('paragraph').filter({ hasText: /^5\/9D Aqua Residences, Bang Kho, Chom Thong, Bangkok, 10150$/ })` |
| Specific service card | `getByRole('tab', { name: /^Thai Massage 60 min / })` |
| Service details | `card.getByRole('link', { name: 'Thai Massage', exact: true })` |
| Purchase entry / login boundary | `card.getByRole('button', { name: 'Buy eVoucher', exact: true })` |
| Login modal heading | `getByRole('dialog').getByRole('heading', { name: 'Log in to GoWabi', exact: true })` |
| Login fields | `getByRole('textbox', { name: 'Email', exact: true })`, and `Password` |

Two documented CSS fallbacks identify prices, because the observed spans have no role, label or test ID:
`card.locator('.prices')` and `page.locator('.org-service-show__price-container .bold')`.
Each must resolve to exactly one element. Price is captured dynamically from the card and compared with the detail page, never hard-coded.
Native date/time input selectors are used only for an absence check, alongside positive eVoucher/FAQ evidence.
No XPath, `nth()`, or `waitForTimeout()` is used.

## Localization and availability

The assignment executes the observed **English** route with `en-US` browser locale and Bangkok timezone.
Thai reviews and bilingual result image labels are normal; the result locator matches its English prefix without depending on Thai alt-text wording.
Availability messages recognize English and Thai. This is **not a tested Thai-UI suite**: a `/th` variant needs its own live inspection before adding translated locators.

Only an explicit unavailable/sold-out message inside the selected card causes a skip, with a report reason.
A missing card, unexpected disabled button, changed UI, or timeout fails with context instead of being silently treated as a pass or switching to another purchase.
No calendar loop or slot reservation is implemented for an eVoucher. Any future scheduling test must stop before a slot hold or reservation mutation.

## Project structure and growth

```text
tests/
  catalog/massage-voucher.spec.ts
  auth/login.spec.ts
pages/
  home.page.ts
  search.page.ts
  salon.page.ts
  service.page.ts
  login.page.ts
fixtures/test.ts
helpers/
  production-safety.ts
  credentials.ts
  money.ts
playwright.config.ts
tsconfig.json
package.json
package-lock.json
.env.example
.gitignore
.github/workflows/playwright.yml
docs/validation.md
```

For 300+ tests, organize specs by feature and reuse focused page objects and typed fixtures.
Every test gets an isolated context and independent state. Keep test data separate from selectors when adding independently inspected providers.
Keep a small tagged production smoke subset; run broad regression and all transaction tests against an approved test environment.
Do not run hundreds of production journeys simply because the repository can contain hundreds of specs.

## Production guard and CI

All specs import `fixtures/test.ts`. Its automatic fixture installs the guard before navigation and rejects worker overrides other than one.
The guard blocks write methods, transaction paths including `/service_requests` and `/carts`, unreviewed top-level navigations, service workers and WebSockets.
The only write exception is one standalone login POST in the explicitly enabled login test.
Blocked paths are attached without request bodies, headers, cookies, query strings or credentials.
The anonymous pending-action request and Cloudflare telemetry (`/cdn-cgi/rum`) remain blocked but are expected; other blocked first-party requests fail review.

This is defense in depth, not a universal guarantee against server-side side effects from GET requests.
Do not extend the allowlist or add purchase actions without inspecting their production behavior and respecting the stop boundary.

Push/PR CI performs dependency installation, TypeScript checking and test discovery without visiting production.
The single production smoke test runs only via **Run workflow → run_production**, serialized across this repository, without login secrets.
CI uses `npm ci` and the committed lockfile. Workflow configuration has been created locally; no GitHub workflow has been executed here.

## Validation

See [docs/validation.md](docs/validation.md) for actual commands, results, failed attempts and remaining unverified scope.
````

## docs/validation.md

````markdown
# Validation — 5 September 2026

Environment: macOS ARM64, Node 20.18.0, npm 10.8.2, @playwright/test **1.62.1**, bundled Chromium.

| Command / activity | Actual result |
| --- | --- |
| `npm view @playwright/test@1.62.1 version` | Returned `1.62.1` |
| `npm install` | Installed dependencies and generated package-lock.json |
| `npx playwright install chromium` | Exit 0 |
| `npm run typecheck` after final source changes | Exit 0 |
| `npm run test:list` | Discovered 2 tests in 2 files |
| `GOWABI_RUN_PRODUCTION=1 npm run test:production` after fixes | **1 passed (18.0s)**; test duration 16.5s; **1 worker** |
| `npm test` with no production opt-in | **2 skipped**, exit 0; this is not a production pass |
| Real credential login test | **Failed**: login requests returned HTTP 200, but authenticated UI was not verified; checkout not reached |
| GitHub Actions | Created, not run remotely |
| Checkout summary / selected appointment / transaction | **Not verified / not performed by the test** |

Successful production runner output:

```text
Running 1 test using 1 worker

✓ 1 [chromium] › tests/catalog/massage-voucher.spec.ts:5:5
  › Bangkok massage eVoucher details and anonymous login boundary @catalog (16.5s)

1 passed (18.0s)
```

The successful journey executed home search, Bangkok address verification, service detail navigation,
dynamic card/detail price comparison, eVoucher FAQ verification, date/time absence checks, and
anonymous Buy eVoucher → login modal assertions. The pending-action POST was blocked by the safety fixture.
This is **not** a checkout or authenticated purchase pass.

Before that successful run:

- Sandboxed Chromium launch failed with macOS `bootstrap_check_in ... Permission denied`. The approved run outside the sandbox launched successfully.
- The first live run exposed a duplicated address locator and blocked Cloudflare telemetry. The address now uses a paragraph scope; telemetry stays blocked and is explicitly expected.
- Another run exposed newline whitespace in the price span. The assertion now accepts surrounding whitespace without hard-coding the price.
- Another run exposed repeated salon links in FAQ content. The salon assertion now scopes to the breadcrumb list.
- Another run exposed newline whitespace in the eVoucher list item. The assertion now handles it.

All live runs were sequential, with one worker and zero automatic retries. There was no load/stress run.
The final default `npm test` check replaced the local HTML report with its **two skipped tests**.
The successful production console result is recorded above; no retained trace/screenshot is claimed.

## Credential-login follow-up

The user supplied credentials locally in `.env.example`. They were moved into ignored `.env` with file mode 0600, and `.env.example` was restored to empty placeholders. No credential values are included in this document or the source bundle.

The first login run was blocked before its AJAX submission reached the server because the guard allowed only the HTML form endpoint. The observed request was `POST /en/users/sign_in_json`; the guard was corrected to allow one login POST across the two exact login endpoints.

The next run sent the permitted login request but failed after 20 seconds because the page remained at `/en/users/sign_in`. The user then confirmed that the account works with email and password. A headed diagnostic run returned HTTP 200 but did not verify authentication. A further run removed the assumption of an automatic home redirect: it opened home in the same context, but still did not pass the authenticated-menu check. Three credential submissions were permitted in total during this investigation, plus the initial blocked attempt; all runs were sequential, with no automatic retries. Further submissions were stopped. HTTP 200 alone does not establish successful login or an invalid password. **Checkout remains unverified.**

The failed run's local error-context snapshot contained input values. Runtime reports were regenerated with both live flags disabled to clear those artifacts. Login now closes its credential-bearing page before reporting failure and records only the HTTP status on future runs. The page-closing and HTTP-status diagnostics were exercised in the headed failed runs. The final additional diagnostic stage label was type-checked but was not followed by another credential submission.

Playwright MCP also observed the login modal in a fresh anonymous context. The shared MCP browser
already had an authenticated session during later inspection, but this does not count as a successful
execution of `tests/auth/login.spec.ts`. Credentials and session state were not exported to this repository.

Remaining boundary: the service-request navigation observed during exploratory inspection was not
validated as a safe checkout, and no checkout field assertions have been invented. See README for the
inspection ambiguity and safety interception details.
````
