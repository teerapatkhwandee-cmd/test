import { expect, type Page } from '@playwright/test';
import { parseBaht } from '../helpers/money';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async verifyVoucher(expected: { salon: string; service: string; durationMinutes: number; priceTHB: number }) {
    await expect(this.page).toHaveURL(url => /^\/en\/service_requests\/[0-9a-f-]+$/.test(url.pathname));
    await expect(this.page.getByRole('heading', { name: '1. Your Booking', exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: expected.salon, exact: true })).toBeVisible();
    await expect(this.page.getByRole('paragraph').filter({ hasText: new RegExp(`^\\s*${escapeRegex(expected.service)}\\s*$`) })).toBeVisible();
    await expect(this.page.getByRole('paragraph').filter({ hasText: new RegExp(`^\\s*${expected.durationMinutes}\\s+min\\s*$`) })).toBeVisible();
    await expect(this.page.getByText('Deal Voucher', { exact: true })).toBeVisible();
    await expect(this.page.getByRole('paragraph').filter({ hasText: /^\s*Final Price\s*$/ })).toBeVisible();
    // Live checkout marks the final amount with strong inside a paragraph;
    // full price and discount paragraphs are not bold. Do not match footer prices.
    const finalPrice = this.page.getByRole('paragraph')
      .filter({ has: this.page.locator('strong') })
      .filter({ hasText: /^\s*฿\s*[\d,]+(?:\.\d{1,2})?\s*$/ });
    await expect(finalPrice).toHaveCount(1);
    await expect(finalPrice).toBeVisible();
    expect(parseBaht(await finalPrice.innerText()), 'Checkout final price must equal the selected service price').toBe(expected.priceTHB);
    await expect(this.page.getByRole('heading', { name: '3. Payment', exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'PLACE ORDER', exact: true })).toBeVisible();
    // eVoucher appointments are arranged later, as verified on the service detail page.
    // Duration and the checkout price-hold countdown are not an appointment date/time.
    await expect(this.page.locator('input[type="date"], input[type="time"], input[type="datetime-local"]')).toHaveCount(0);
    await expect(this.page.getByLabel(/^(?:(?:appointment|booking)\s+)?(?:date|time)$/i)).toHaveCount(0);
    return { ...expected, date: null, time: null, appointment: 'Not selected: Deal Voucher', checkoutVerified: true };
  }
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
