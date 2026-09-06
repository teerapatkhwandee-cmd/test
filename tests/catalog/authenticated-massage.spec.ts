import { test, expect } from '../../fixtures/test';
import { scenario } from '../../helpers/scenario';
import { getCredentials } from '../../helpers/credentials';
import { CheckoutPage } from '../../pages/checkout.page';

test.use({ allowLogin: true, allowCheckout: true });
test.skip(process.env.GOWABI_RUN_PRODUCTION !== '1' || process.env.GOWABI_RUN_LOGIN !== '1',
  'Authenticated journey requires GOWABI_RUN_PRODUCTION=1 and GOWABI_RUN_LOGIN=1.');

test('Login, search and verify eVoucher checkout salon, service and price @authenticated', async ({
  page, login, home, search, salon, service,
}, testInfo) => {
  const credentials = getCredentials();
  await test.step('Log in before searching, keeping the same page and session', async () => {
    await login.open();
    await login.signIn(credentials);
  });
  await test.step('Search massage in the authenticated session', async () => {
    await home.open();
    await home.search(scenario.keyword);
    await search.openSalon(scenario);
    await salon.verifySalon();
  });
  test.skip(await salon.unavailable(), 'Selected service is explicitly unavailable.');
  const price = await salon.currentPrice();
  await test.step('Verify selected service details', async () => {
    await salon.openServiceDetails();
    await service.verifyVoucherDetails({ ...scenario, priceTHB: price });
  });
  await test.step('Open eVoucher checkout', async () => {
    // Restore the previous load boundary: DOM visibility alone may precede button setup.
    await page.goBack({ waitUntil: 'load' });
    await salon.verifySalon();
    await salon.selectedService.getByRole('button', { name: 'Buy eVoucher', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/service_requests\//);
    // Checkout assertions below wait for the required content to become visible.
  });
  await test.step('Verify checkout salon, service, duration, final price and voucher appointment limitations', async () => {
    const summary = await new CheckoutPage(page).verifyVoucher({
      salon: scenario.salon, service: scenario.service, durationMinutes: scenario.durationMinutes, priceTHB: price,
    });
    testInfo.annotations.push({ type: 'appointment-not-applicable', description: 'Deal Voucher has no selected date/time; appointments are arranged with the salon after purchase.' });
    await testInfo.attach('verified-checkout-summary', {
      body: JSON.stringify(summary, null, 2), contentType: 'application/json',
    });
  });
});
