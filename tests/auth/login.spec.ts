import { test } from '../../fixtures/test';
import { getCredentials } from '../../helpers/credentials';

test.use({ allowLogin: true });
test.skip(process.env.GOWABI_RUN_PRODUCTION !== '1' || process.env.GOWABI_RUN_LOGIN !== '1',
  'Real login requires GOWABI_RUN_PRODUCTION=1 and GOWABI_RUN_LOGIN=1.');

test('Existing account can log in and stops at home @login', async ({ login }) => {
  const credentials = getCredentials();
  await login.open();
  await login.signIn(credentials);
});
