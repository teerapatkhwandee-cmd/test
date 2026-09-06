// Expected test data: change the selected scenario here, independently of page objects.
export const scenario = {
  keyword: 'massage',
  salon: 'Massage Home',
  salonSlug: 'massage-home',
  address: '5/9D Aqua Residences, Bang Kho, Chom Thong, Bangkok, 10150',
  service: 'Thai Massage',
  serviceSlug: 'thai-massage',
  durationMinutes: 60,
  serviceId: '134870',
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
