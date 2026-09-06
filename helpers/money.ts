export function parseBaht(text: string): number {
  const match = text.trim().match(/^฿\s*([\d,]+(?:\.\d{1,2})?)$/u);
  if (!match) throw new Error('Expected one THB price from the scoped current-price element.');
  const amount = Number(match[1].replaceAll(',', ''));
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('Expected a positive service price.');
  return amount;
}
