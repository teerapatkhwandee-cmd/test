import { expect, type Page } from '@playwright/test';
import { escapeRegex } from '../helpers/scenario';

export class SearchPage {
  constructor(private readonly page: Page) {}

  async openSalon(selection: { salon: string; salonSlug: string }) {
    // Image alt text includes both English and Thai; match only the observed English prefix.
    const salonLink = this.page.getByRole('link', { name: new RegExp(`^${escapeRegex(selection.salon)} ${escapeRegex(selection.salon)}`) });
    await expect(salonLink, 'Reviewed Bangkok salon must appear in massage results').toHaveCount(1);
    await expect(salonLink).toBeVisible();
    await salonLink.click();
    await expect(this.page).toHaveURL(url => url.pathname === `/en/provider/${selection.salonSlug}`);
  }
}
