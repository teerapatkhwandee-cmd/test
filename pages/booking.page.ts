import { expect, type Page } from '@playwright/test';

export class BookingPage {
  constructor(private readonly page: Page) {}

  private get form() {
    return this.page.locator('form.service-creation, .calender_2152, #service-selection-modal').first();
  }

  async verifyBookingCalendar() {
    await expect(this.form).toBeVisible({ timeout: 15000 });
  }

  async selectFutureDate() {
    const dateLink = this.page
      .locator('.ui-datepicker-calendar td:not(.ui-state-disabled) a.ui-state-default')
      .first();

    if (await dateLink.isVisible()) {
      await dateLink.click({ force: true });
    }

    await expect(this.page.locator('.timmer_block td.available').first()).toBeVisible({ timeout: 15000 });
  }

  async getSelectedDate(): Promise<string> {
    const selectedDayEl = this.page.locator('.ui-datepicker-calendar td.ui-datepicker-current-day a, .ui-datepicker-calendar a.ui-state-active').first();
    const monthEl = this.page.locator('.ui-datepicker-month').first();
    const yearEl = this.page.locator('.ui-datepicker-year').first();

    if (await selectedDayEl.isVisible()) {
      const day = (await selectedDayEl.innerText()).trim();
      const month = await monthEl.isVisible() ? (await monthEl.innerText()).trim() : '';
      const year = await yearEl.isVisible() ? (await yearEl.innerText()).trim() : '';
      return `${day} ${month} ${year}`.trim();
    }

    const fallbackDay = await this.page.locator('.ui-datepicker-calendar a.ui-state-default').first().innerText();
    return fallbackDay.trim();
  }

  async selectTimeSlot(preferredTime = '11:30') {
    const availableSlots = this.page.locator('.timmer_block td.available');
    await expect(availableSlots.first()).toBeVisible({ timeout: 15000 });

    const exactSlot = availableSlots.filter({ hasText: preferredTime }).first();

    if (await exactSlot.isVisible()) {
      await exactSlot.click({ force: true });
      return preferredTime;
    }

    const availableSlot = availableSlots.first();
    const slotText = (await availableSlot.locator('.col-1-calendar').innerText()).trim();
    await availableSlot.click({ force: true });
    return slotText;
  }

  async verifySelection({ date, time, service, price }: { date: string; time: string; service: string; price: number }) {
    // 🟢 แก้ไข Strict Mode Violation โดยใช้ .first()
    await expect(this.page.getByText(service).first()).toBeVisible();
    await expect(this.page.getByText(time).first()).toBeVisible();
    await expect(this.page.getByText(`฿${price}`).first()).toBeVisible();
  }

  async inspectContinueButton() {
    const continueBtn = this.page
      .locator('button, input[type="submit"]')
      .filter({ hasText: /CONTINUE|ดำเนินการต่อ|ถัดไป/i })
      .first();

    await expect(continueBtn).toBeVisible({ timeout: 15000 });
    return continueBtn;
  }
}