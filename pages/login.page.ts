import { expect, type Page } from '@playwright/test';
import { ORIGIN } from '../helpers/config';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/en/users/sign_in', {
      waitUntil: 'domcontentloaded',
    });

    await expect(
      this.page.getByRole('heading', {
        name: 'Log in to GoWabi',
        exact: true,
      })
    ).toBeVisible();
  }

  private async verifyAccountMenu() {
    const accountToggle = this.page.locator(
      '.user-menu-dropdown > button.after_login:visible'
    );

    await expect(accountToggle).toBeVisible({
      timeout: 10000,
    });
  }

  async signIn(credentials: { email: string; password: string }) {
    let responseStatus: number | undefined;
    let authenticated = false;
    let serverIdentifiedUser = false;
    let responseOutcome = 'not inspected';
    let stage = 'fill login form';

    try {
      await this.page
        .getByRole('textbox', {
          name: 'Email',
          exact: true,
        })
        .fill(credentials.email);

      await this.page
        .getByRole('textbox', {
          name: 'Password',
          exact: true,
        })
        .fill(credentials.password);

      stage = 'submit login and receive response';

      const [response] = await Promise.all([
        this.page.waitForResponse(response => {
          const url = new URL(response.url());

          return (
            url.origin === ORIGIN &&
            ['/en/users/sign_in', '/en/users/sign_in_json'].includes(
              url.pathname
            ) &&
            response.request().method() === 'POST'
          );
        }),

        this.page
          .getByRole('button', {
            name: 'LOGIN',
            exact: true,
          })
          .click(),
      ]);

      responseStatus = response.status();

      await response.finished();

      stage = 'inspect login response';

      if (!response.ok()) {
        throw new Error('Login HTTP request failed');
      }

      const payload: unknown = await response.json().catch(() => null);

      if (
        payload &&
        typeof payload === 'object' &&
        !Array.isArray(payload)
      ) {
        const result = payload as Record<string, unknown>;

        serverIdentifiedUser =
          typeof result.current_user_id === 'number' &&
          result.current_user_id > 0 &&
          result.user !== null &&
          typeof result.user === 'object';

        const rejected =
          result.success === false ||
          result.status === false ||
          result.status === 'error' ||
          result.status === 'failure';

        responseOutcome = rejected
          ? 'explicit failure flag'
          : 'JSON received; authentication unconfirmed';

        if (rejected) {
          throw new Error('Login response indicates failure');
        }
      } else {
        responseOutcome =
          'no JSON object; authentication unconfirmed';
      }

      if (serverIdentifiedUser) {
        stage = 'open home after server identified user';

        await this.page.goto('/en', {
          waitUntil: 'domcontentloaded',
        });

        // Give client-side navbar/auth state a moment to render.
        await this.page
          .waitForLoadState('networkidle', {
            timeout: 10000,
          })
          .catch(() => {});
      }

      stage = 'verify authenticated account menu on home';

      await this.verifyAccountMenu();

      authenticated = true;
    } catch {
      const stillOnLoginPage =
        new URL(this.page.url()).pathname ===
        '/en/users/sign_in';

      throw new Error(
        `Login was not verified at stage "${stage}" ` +
          `(HTTP status: ${responseStatus ?? 'not received'}; ` +
          `response: ${responseOutcome}; ` +
          `still on login page: ${stillOnLoginPage}). ` +
          `No automatic retry or checkout continuation was performed.`
      );
    } finally {
      if (!authenticated) {
        await this.page.close().catch(() => {});
      }
    }
  }
}