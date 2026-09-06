import { test, expect } from '../../fixtures/test';
import { scenario } from '../../helpers/scenario';

test.skip(process.env.GOWABI_RUN_PRODUCTION !== '1', 'Set GOWABI_RUN_PRODUCTION=1 for one safe production run.');

test('Bangkok massage eVoucher details and anonymous login boundary @catalog', async ({
  page, home, search, salon, service,
}, testInfo) => {
  await test.step('Search massage and open the reviewed Bangkok salon', async () => {
    await home.open();
    await home.search(scenario.keyword);
    await search.openSalon(scenario);
    await salon.verifySalon();
  });
  test.skip(await salon.unavailable(), 'Selected service is explicitly unavailable; no alternative purchase attempted.');
  const price = await salon.currentPrice();
  await test.step('Inspect the selected service and verify eVoucher limitations', async () => {
    await salon.openServiceDetails();
    await service.verifyVoucherDetails({ ...scenario, priceTHB: price });
  });
  await testInfo.attach('observed-selection', {
    body: JSON.stringify({
      salon: scenario.salon, service: scenario.service, durationMinutes: scenario.durationMinutes,
      priceTHB: price, date: null, time: null, flow: 'eVoucher',
      limitation: 'Appointment arranged with salon after purchase. Checkout not verified.',
    }, null, 2), contentType: 'application/json',
  });
  await test.step('Stop at anonymous login without saving a pending purchase', async () => {
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(url => url.pathname === `/en/provider/${scenario.salonSlug}`);
    await salon.verifySalon();
    await salon.showAnonymousLoginBoundary();
    await expect(page).toHaveURL(url => url.pathname === `/en/provider/${scenario.salonSlug}`);
  });
});
