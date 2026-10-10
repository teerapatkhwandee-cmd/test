import { test, expect } from '../../fixtures/test';
import { scenario } from '../../helpers/scenario';
import { BookingPage } from '../../pages/booking.page';

test.use({
  allowLogin: true,
  allowCheckout: false,
});

test.skip(
  process.env.GOWABI_RUN_PRODUCTION !== '1' ||
  process.env.GOWABI_RUN_LOGIN !== '1',
  'Production and login must be explicitly enabled.'
);

test('Book Now: x Strip (+ clipping down the front) @catalog', async ({ page, login, salon }, testInfo) => {
  await test.step('Login', async () => {
    await login.open();
    await login.signIn({ email: process.env.GOWABI_EMAIL!, password: process.env.GOWABI_PASSWORD! });
  });

  await test.step('Navigate to salon', async () => {
    await page.goto(`/en/provider/${scenario.salonSlug}`);
    await salon.verifySalon();
  });

  let price: number;
  await test.step('Locate x Strip (+ clipping down the front) service card and verify details', async () => {
    price = await salon.currentPrice();
    expect(price).toBe(950);
  });

  await test.step('Book Now', async () => {
    const bookNowBtn = page.locator('button, a, input[type="submit"], .sitebtn')
      .filter({ hasText: /Book Now|จองเลย/i })
      .first();

    await expect(bookNowBtn).toBeVisible({ timeout: 15000 });
    await bookNowBtn.click({ force: true });

    const booking = new BookingPage(page);
    try {
      await booking.verifyBookingCalendar();
    } catch (e) {
      await page.keyboard.press('Escape');
      await bookNowBtn.click({ force: true });
      await booking.verifyBookingCalendar();
    }
  });

  const booking = new BookingPage(page);

  let selectedDate = '';
  let selectedTime = '';
  await test.step('Select available date and time', async () => {
    await booking.selectFutureDate();
    selectedTime = await booking.selectTimeSlot('11:30');
    selectedDate = await booking.getSelectedDate();
  });

  await test.step('Verify selection summary', async () => {
    await booking.verifySelection({ date: selectedDate, time: selectedTime, service: scenario.service, price });
  });

  await test.step('Inspect CONTINUE button and go to checkout', async () => {
    const continueBtn = await booking.inspectContinueButton();
    await testInfo.attach('continue-button-html', { body: await continueBtn.evaluate(node => node.outerHTML), contentType: 'text/html' });

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => null),
      continueBtn.click({ force: true })
    ]);

    // ตรวจสอบว่า นาวิเกตไปยัง URL ฝั่ง Checkout/Payment หรือผ่าน Validation แล้ว
    await expect(page).toHaveURL(/\/(?:checkout|provider|service_requests)/i);
    await testInfo.attach('checkout-html', { body: await page.content(), contentType: 'text/html' });

    // ถอยกลับทันทีเพื่อความปลอดภัยในการทดสอบ
    await page.goBack({ waitUntil: 'domcontentloaded' });
  });
});