import 'dotenv/config';

export const ORIGIN = new URL(process.env.GOWABI_BASE_URL || 'https://www.gowabi.com').origin;
