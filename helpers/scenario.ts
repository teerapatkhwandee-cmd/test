
// Expected test data for Strip Ministry of Waxing (Central Embassy)

export const scenario = {
  keyword: 'Strip Ministry of Waxing',
  salon: 'Strip Ministry of Waxing (Central Embassy)',
  salonSlug: 'strip-ministry-of-waxing-central-embassy',
  address: '4th Floor, Central Embassy, 1031 Ploenchit road, Pathumwan, Bangkok 10330',
  service: 'x Strip (+ clipping down the front)',
  serviceSlug: 'x-strip-clipping-down-the-front',
  durationMinutes: 60,
  serviceId: '2122',
} as const;

export type SalonSelection = {
  salon: string;
  salonSlug: string;
  address: string;
  service: string;
  serviceSlug: string;
  durationMinutes: number;
};

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
