import { expect, type Page } from '@playwright/test';

export class BookingPage {
  constructor(private readonly page: Page) {}

  private get form() {
    return this.page.locator('form.service-creation, .calender_2152, #service-selection-modal, div.calender').first();
  }

  async verifyBookingCalendar() {
    await expect(this.form).toBeVisible({ timeout: 20000 });

    // จัดระเบียบ Modal ให้แสดงผลตรงกลางเสมอเพื่อ CI Headless
    await this.page.evaluate(() => {
      const modalOrCal = document.querySelector('.calender_2152, form.service-creation, #service-selection-modal, div.calender') as HTMLElement;
      if (modalOrCal) {
        modalOrCal.style.position = 'relative';
        modalOrCal.style.margin = '20px auto';
        modalOrCal.style.zIndex = '999999';
      }
    });

    await this.form.scrollIntoViewIfNeeded();
  }

  async selectFutureDate() {
    const dateLinks = this.page.locator('.ui-datepicker-calendar td:not(.ui-state-disabled) a.ui-state-default');
    await expect(dateLinks.first()).toBeVisible({ timeout: 20000 });

    const targetDate = dateLinks.first();
    await targetDate.scrollIntoViewIfNeeded();
    await targetDate.click({ force: true });

    // รอสล็อตเวลาโหลด AJAX บน CI
    const timeSlot = this.page
      .locator('.timmer_block td, .time_select_block td, td[data-time], .time-slot-item, .col-1-calendar')
      .filter({ hasText: /([01]?[0-9]|2[0-3]):[0-5][0-9]/ })
      .first();

    await expect(timeSlot).toBeVisible({ timeout: 25000 });
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
    const availableSlots = this.page.locator('.timmer_block td.available, .timmer_block td:not(.disabled)');
    await expect(availableSlots.first()).toBeVisible({ timeout: 20000 });

    const exactSlot = availableSlots.filter({ hasText: preferredTime }).first();

    if (await exactSlot.isVisible()) {
      await exactSlot.click({ force: true });
      return preferredTime;
    }

    const availableSlot = availableSlots.first();
    const slotText = (await availableSlot.innerText()).trim();
    await availableSlot.click({ force: true });
    return slotText;
  }

  async verifySelection({ date, time, service, price }: { date: string; time: string; service: string; price: number }) {
    const visibleForm = this.form;
    await expect(visibleForm.locator(`text=${service}`).first()).toBeVisible({ timeout: 15000 });
    await expect(visibleForm.locator(`td.active, td.selected, .col-1-calendar`).filter({ hasText: time }).first()).toBeVisible({ timeout: 15000 });
    await expect(visibleForm.locator(`text=฿${price}`).first()).toBeVisible({ timeout: 15000 });
  }

  async inspectContinueButton() {
    const continueBtn = this.page
      .locator('button, input[type="submit"]')
      .filter({ hasText: /CONTINUE|ดำเนินการต่อ|ถัดไป/i })
      .first();

    await expect(continueBtn).toBeVisible({ timeout: 20000 });
    return continueBtn;
  }
}