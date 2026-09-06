import type { Page } from '@playwright/test';

// Keep desktop media queries active while fitting the rendered page into the
// available headed window. Changing only the CSS viewport hides account controls.
export async function fitDesktopViewport(page: Page) {
  const size = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  const width = Math.max(1920, size.width);
  const scale = size.width / width;
  const session = await page.context().newCDPSession(page);
  await session.send('Emulation.setDeviceMetricsOverride', {
    width,
    height: Math.floor(size.height / scale),
    deviceScaleFactor: 0,
    mobile: false,
    viewport: { x: 0, y: 0, width, height: Math.floor(size.height / scale), scale },
  });
  return session;
}
