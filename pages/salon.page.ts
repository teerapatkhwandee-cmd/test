import { expect, type Page } from '@playwright/test';
import { parseBaht } from '../helpers/money';
import { escapeRegex, type SalonSelection } from '../helpers/scenario';

export class SalonPage {
  constructor(private readonly page: Page, private readonly selection: SalonSelection) {}

  get selectedService() {
    // Duration distinguishes variants; price is deliberately excluded from the locator.
    return this.page.getByRole('tab', { name: new RegExp(`^${escapeRegex(this.selection.service)} ${this.selection.durationMinutes} min `) });
  }

  async verifySalon() {
    await expect(this.page.getByRole('heading', { name: this.selection.salon, exact: true })).toBeVisible();
    await expect(this.page.getByRole('paragraph').filter({
      hasText: new RegExp(`^${escapeRegex(this.selection.address)}$`),
    })).toBeVisible();
    await expect(this.selectedService, 'Reviewed service missing; do not silently select a different service').toHaveCount(1);
    await expect(this.selectedService).toBeVisible();
  }

  async currentPrice() {
    // No role, accessible label, or test ID exists for the observed price span.
    const price = this.selectedService.locator('.prices');
    await expect(price).toHaveCount(1);
    await expect(price).toHaveText(/^\s*฿\s*[\d,]+(?:\.\d{1,2})?\s*$/u);
    return parseBaht(await price.innerText());
  }

  async openServiceDetails() {
    await this.selectedService.getByRole('link', { name: this.selection.service, exact: true }).click();
    await expect(this.page).toHaveURL(new RegExp(`/en/organization_services/${escapeRegex(this.selection.serviceSlug)}-`));
  }

  async unavailable() {
    // Only an explicit service-scoped availability message justifies a skip.
    return this.selectedService.getByText(/sold out|unavailable|หมด|ไม่พร้อมให้บริการ/i).isVisible();
  }

  async showAnonymousLoginBoundary() {
    const buy = this.selectedService.getByRole('button', { name: 'Buy eVoucher', exact: true });
    await expect(buy).toBeEnabled();
    await buy.click();
    await expect(this.page.getByRole('dialog').getByRole('heading', {
      name: 'Log in to GoWabi', exact: true,
    })).toBeVisible();
    // Do not log in from here: production may resume a pending purchase action.
  }
}
