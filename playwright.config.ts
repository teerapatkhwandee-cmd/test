import { defineConfig } from '@playwright/test';
import { ORIGIN } from './helpers/config';


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
    baseURL: ORIGIN,
    // Native window sizing cannot use device scale emulation.
    deviceScaleFactor: undefined,
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
