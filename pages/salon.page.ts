import { expect, type Page } from '@playwright/test';

export class SalonPage {
  constructor(private readonly page: Page, private readonly scenario: any) {}

  async open() {
    await this.page.goto(`/en/provider/${this.scenario.salonSlug}`);
  }

  async verifySalon() {
    await expect(this.page).toHaveURL(new RegExp(this.scenario.salonSlug));
  }

  // หาการ์ดบริการจากชื่อบริการใน scenario
  get selectedService() {
    return this.page
      .locator('.org-service-show, .service-card, .service-item, div')
      .filter({ hasText: this.scenario.serviceName || 'x Strip (+ clipping down the front)' })
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
    // หาปุ่ม Book Now / จองตอนนี้ ภายใน Card หรือระดับหน้าเว็บ
    const bookNowBtn = this.selectedService
      .locator('button, a, input[type="submit"], .sitebtn')
      .filter({ hasText: /Book Now|จองตอนนี้/i })
      .first();

    if (await bookNowBtn.isVisible()) {
      await bookNowBtn.click({ force: true });
    } else {
      // Fallback: หากดภายใน Card ไม่เจอ ให้หาปุ่ม Book Now แรกถัดจากชื่อบริการ
      await this.page
        .locator('button, a, .sitebtn')
        .filter({ hasText: /Book Now|จองตอนนี้/i })
        .first()
        .click({ force: true });
    }
  }
}