import { expect, type Page } from '@playwright/test';

export class SalonPage {
  constructor(private readonly page: Page, private readonly scenario?: any) {}

  async open() {
    if (this.scenario?.salonSlug) {
      await this.page.goto(`/en/provider/${this.scenario.salonSlug}`);
    }
  }

  async verifySalon() {
    if (this.scenario?.salonSlug) {
      await expect(this.page).toHaveURL(new RegExp(this.scenario.salonSlug));
    }
  }

  get selectedService() {
    const serviceName = this.scenario?.serviceName || this.scenario?.service || '';
    return this.page
      .locator('.org-service-show, .service-card, .service-item, div')
      .filter({ hasText: serviceName })
      .first();
  }

  async currentPrice(): Promise<number> {
    const priceText = await this.selectedService
      .locator('.price, [class*="price"], .org-service-show__price')
      .first()
      .innerText();
    const cleanPrice = priceText.replace(/[^0-9]/g, '');
    return parseInt(cleanPrice, 10);
  }

  async clickBookNow() {
    const bookNowBtn = this.selectedService
      .locator('button, a, input[type="submit"], .sitebtn')
      .filter({ hasText: /Book Now|จองตอนนี้/i })
      .first();

    if (await bookNowBtn.isVisible()) {
      await bookNowBtn.click({ force: true });
    } else {
      await this.page
        .locator('button, a, .sitebtn')
        .filter({ hasText: /Book Now|จองตอนนี้/i })
        .first()
        .click({ force: true });
    }
  }

  // 🟢 เพิ่ม 3 methods สำหรับแก้ TypeScript Error
  async unavailable(): Promise<boolean> {
    const unavailableBadge = this.page.locator('.sold-out, .unavailable, :text("Unavailable")').first();
    return await unavailableBadge.isVisible().catch(() => false);
  }

  async openServiceDetails() {
    const detailsLink = this.selectedService.locator('a, .service-title, h3, h4').first();
    if (await detailsLink.isVisible()) {
      await detailsLink.click({ force: true });
    }
  }

  async showAnonymousLoginBoundary() {
    const loginModal = this.page.locator('#login-modal, .login-modal, [data-testid="login-modal"]').first();
    await expect(loginModal).toBeVisible({ timeout: 15000 });
  }
}