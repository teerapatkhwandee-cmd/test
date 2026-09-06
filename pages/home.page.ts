import { expect, type Page } from '@playwright/test';
import { ORIGIN } from '../helpers/config';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    // Login already opens home in this session; avoid fetching it a second time.
    const current = new URL(this.page.url());
    if (current.origin !== ORIGIN || current.pathname !== '/en' || current.search) {
      await this.page.goto('/en', { waitUntil: 'domcontentloaded' });
    }
    await expect(this.page.getByRole('textbox', {
      name: 'Type venue or service you want to book', exact: true,
    })).toBeVisible();
  }

  async search(keyword: string) {
    const input = this.page.getByRole('textbox', {
      name: 'Type venue or service you want to book', exact: true,
    });
    await input.fill(keyword);
    await expect(input).toHaveValue(keyword);
    await this.page.getByRole('button', { name: 'SEARCH', exact: true }).click();
    await expect(this.page).toHaveURL(url => url.pathname === '/en/search' &&
      url.searchParams.get('filter[search_text]') === keyword);
  }
}
