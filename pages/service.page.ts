import { expect, type Page } from '@playwright/test';
import { parseBaht } from '../helpers/money';

export class ServicePage {
  constructor(private readonly page: Page) {}

  async verifyVoucherDetails(expected: { salon: string; service: string; priceTHB: number }) {
    await expect(this.page.getByRole('heading', { name: expected.service, exact: true })).toBeVisible();
    const breadcrumb = this.page.getByRole('list').filter({
      has: this.page.getByRole('link', { name: 'Home', exact: true }),
    });
    await expect(breadcrumb.getByRole('link', { name: expected.salon, exact: true })).toBeVisible();
    // DOM-observed fallback scoped to the primary price, excluding similar services and struck prices.
    const price = this.page.locator('.org-service-show__price-container .bold');
    await expect(price).toHaveCount(1);
    await expect(price).toHaveText(/^\s*฿\s*[\d,]+(?:\.\d{1,2})?\s*$/u);
    expect(parseBaht(await price.innerText()), 'Price should match the selected salon card').toBe(expected.priceTHB);
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
