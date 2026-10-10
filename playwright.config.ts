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
    // 🟢 1. กำหนดขนาด Viewport มาตรฐานสำหรับ Desktop
    viewport: { width: 1920, height: 1080 },
    
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

    // 🟢 2. เพิ่ม launchOptions เพื่อให้เวลาสั่งรัน --headed ตัวเบราว์เซอร์จะสั่งเปิดขยายเต็มหน้าจอ
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
  projects: [
    { 
      name: 'chromium', 
      use: { 
        browserName: 'chromium',
        // 🟢 3. ถ้าเปิด --headed ให้ใช้ขนาด Native Window (ไม่โดนล็อค viewport)
        viewport: null,
      } 
    }
  ],
});