export function getCredentials(): { email: string; password: string } {
  const email = process.env.GOWABI_EMAIL?.trim();
  const password = process.env.GOWABI_PASSWORD;
  if (!email || !password) {
    throw new Error('Set GOWABI_EMAIL and GOWABI_PASSWORD in the local .env file or environment. Do not put credentials in test code.');
  }
  return { email, password };
}
