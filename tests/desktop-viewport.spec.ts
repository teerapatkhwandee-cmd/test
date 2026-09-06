import { test, expect } from '../fixtures/test';

test('Desktop layout stays visible and clickable in the browser window', async ({ page, headless }) => {
  await page.setContent(`
    <style>
      body { margin: 0; }
      button { position: fixed; right: 0; bottom: 0; }
      @media (max-width: 1400px) { button { display: none; } }
    </style>
    <button onclick="this.textContent = 'Clicked'">Desktop account</button>
  `);
  expect(await page.evaluate(() => innerWidth)).toBeGreaterThanOrEqual(1920);
  if (headless) expect(page.viewportSize()).toEqual({ width: 1920, height: 1080 });
  await page.getByRole('button', { name: 'Desktop account', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Clicked', exact: true })).toBeVisible();
});
