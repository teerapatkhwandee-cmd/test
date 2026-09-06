# GoWabi Playwright QA assignment

TypeScript, Playwright Chromium, one worker, zero retries. The authenticated journey logs in **before** searching and keeps the same browser session through checkout.

Latest local live validation after the scenario refactor, 6 September 2026: **1 passed (56.8s total; 54.3s test)** for the authenticated checkout test. TypeScript checking passed; test discovery found 3 tests. The anonymous catalog command used by CI also passed locally: **1 passed (1.1m)**. The workflow YAML parsed successfully. This is local evidence, not a GitHub-hosted CI result.

## Run

Requires Node.js 20 or newer (CI uses Node.js 22). Run commands from the repository root.

```sh
npm ci
npx playwright install chromium
npm run typecheck
npm run test:list
```

Create `.env` with `cp -n .env.example .env` (preserves an existing file). The commands below use POSIX shell syntax.

Populate `GOWABI_EMAIL` and `GOWABI_PASSWORD` in your local `.env`. Do not put credentials into test source or share `.env` and account reports.

```sh
# Login → search → salon/service → Buy eVoucher → checkout assertions
GOWABI_RUN_PRODUCTION=1 GOWABI_RUN_LOGIN=1 npm run test:authenticated

# Open a browser with the desktop layout scaled to fit its initial window
GOWABI_RUN_PRODUCTION=1 GOWABI_RUN_LOGIN=1 npm run test:authenticated -- --headed

# Anonymous catalog and login-modal boundary only
GOWABI_RUN_PRODUCTION=1 npm run test:production

# Standalone login verification
GOWABI_RUN_PRODUCTION=1 GOWABI_RUN_LOGIN=1 npm run test:login

npm run report
```

`npm test` skips live tests unless their opt-in flags are enabled. Run production tests sequentially; do not increase workers, shard, or load-test production. No payment or order-confirmation button is clicked.

## Faster local runs

Run only the journey you are changing using the commands above. With both opt-in flags enabled, `npm test` runs all three tests sequentially, including standalone login and the login inside the authenticated journey. `test:authenticated` selects only the checkout journey.

The authenticated journey reuses home after login; checkout assertions wait for the required content instead of an extra full-page `load` wait. Returning to the salon still waits for `load`: using DOM readiness alone was followed by a checkout navigation failure and has been reverted pending live validation. These changes have not yet been benchmarked against production. Lowering timeouts only makes failures stop sooner; it does not speed up successful assertions. Keep one worker for production.

## Configure the test scenario

Edit `helpers/scenario.ts` to change the search keyword, salon name/slug/address, service name/slug, duration and reviewed service ID. Page objects receive these expected values; prices continue to be read from the live page. The checkout guard uses the same service ID and still permits only one checkout entry for that selected service.

Set `GOWABI_BASE_URL` in the environment or local `.env` to change the origin (default: `https://www.gowabi.com`). Login response matching, navigation guards and Playwright share this value. Routes and UI labels currently target the English GoWabi interface; changing the origin does not make the suite compatible with another application.

Test data remains explicit so assertions have independent expected values. UI selectors and English route patterns remain in page objects. `.env.example` contains empty credential placeholders.

## Checkout coverage

The selected service is **Massage Home → Thai Massage, 60 min** in Bangkok. The test captures its catalog price dynamically and compares it with the service detail page and checkout final price.

| Checkout requirement | Assertion |
| --- | --- |
| Correct salon | Visible Massage Home checkout heading |
| Correct service | Thai Massage service paragraph |
| Correct duration | 60 min; not treated as appointment time |
| Correct price | Bold final-price paragraph equals the captured catalog price |
| Date and time | Not applicable to this Deal Voucher flow: no appointment is selected, and checkout exposes no date/time inputs or labelled date/time fields |
| Actual checkout reached | Service-request URL, Your Booking and Payment headings, visible PLACE ORDER button |
| Payment / order confirmation | Not performed |

The service detail FAQ says to arrange an appointment with the salon after purchase. The test reports date/time as `null` with an explicit annotation; it does **not** claim to validate a selected appointment. If the assignment requires all five fields including a chosen date and time, a separate scheduling flow is still required. The price-hold countdown at checkout is not an appointment time.

The report includes `verified-checkout-summary` with salon, service, duration, price and the appointment limitation. It does not attach the full checkout form or account details on successful runs.

## Login implementation

Login permits one POST to the observed `/en/users/sign_in` or `/en/users/sign_in_json` endpoint. The observed JSON response can identify the user while returning no redirect. After a positive user identifier, the test opens home in the same context and verifies the visible Log Out link by opening `.user-menu-dropdown > button.after_login`.

Headless runs use a **1920×1080** viewport. Headed runs (`--headed` or `--debug`) keep a desktop layout at least 1920 CSS pixels wide and scale its rendering to fit the initial browser window, so desktop account controls remain available. Restart the run to fit a different window size. At the previous 1280px viewport the website hid this desktop account menu under a `tablet-hide` ancestor, causing incorrect login failures. Successful login keeps the page open for search. Failed login closes the credential-bearing page before Playwright captures failure context. No authentication state is exported.

## Production request guard

All tests import `fixtures/test.ts`. By default the guard blocks writes, transaction endpoints, unreviewed top-level navigation, WebSockets and service workers. It records only request methods, paths and reasons.

Only the authenticated checkout test opts into one GET to the observed `/en/organization_services/134870/buy_as_deal` entry and GET access to the service-request summary. This entry is scoped to the inspected Thai Massage service. All payment and confirmation writes remain blocked. The anonymous pending-action POST and Cloudflare telemetry remain blocked and expected.

**Opening checkout creates or resumes server-side checkout state:** the live page displayed a cart count and a price-hold countdown. Closing the browser is not proof that the server-side draft is removed. The test does not submit PLACE ORDER or claim to clean up that draft.

## GitHub Actions

`.github/workflows/playwright.yml` runs on every push and pull request, and manually through **Actions → Playwright QA → Run workflow**. Place this project at the GitHub repository root so the workflow and lockfile are found.

The job installs locked dependencies with `npm ci`, checks TypeScript, discovers tests, installs Chromium and its Linux dependencies, then actually runs `npm run test:production`. `GOWABI_RUN_PRODUCTION=1` enables the anonymous catalog test; discovery alone is not treated as a test run. No repository secrets are needed. Login and authenticated checkout are excluded from CI and can be run locally with the commands above.

Runs use one worker, zero retries, a ten-minute job limit, read-only repository permissions and repository-wide workflow serialization. Test failures fail the job. The HTML report is uploaded after the test step, including on failure, and retained for seven days. Download the artifact and open it with `npx playwright show-report <extracted-report-directory>`.

The catalog test deliberately skips if the selected service explicitly reports that it is unavailable; inspect the report for skips because a green job can mean no completed journey in that case. A missing salon or service fails instead of selecting a different item silently.

This setup follows the [Playwright CI installation and execution pattern](https://playwright.dev/docs/ci). GitHub-hosted execution has not been verified. It needs outbound access to GoWabi and browser/package download hosts; bot protection may reject hosted runner traffic. A future staging deployment with seeded data should run the full suite on pull requests, leaving production checks as a small scheduled or manual smoke test.

## What is covered

- Anonymous journey: search by the configured keyword, open the selected Bangkok salon, verify its address and service, compare catalog/detail prices, inspect voucher terms and stop at the login modal.
- Login: an existing account signs in and the account menu exposes Log Out, confirming the browser session.
- Authenticated journey: login before search, retain the session, open the selected eVoucher checkout and verify salon, service, duration and final price against the selection.
- Voucher appointment behavior: verify the appointment FAQ and absence of date/time controls; record that no appointment was selected.

## Intentionally not covered

| Area | Reason |
| --- | --- |
| Payment, PLACE ORDER, purchase confirmation, cancellation and refunds | These affect real transactions. Coverage stops at checkout; sandbox payments and disposable orders are needed for these cases. |
| Choosing an appointment date/time | This selected eVoucher flow arranges appointments with the salon after purchase. A separate bookable scheduling flow is required. |
| Registration, password reset, invalid-login matrices, OTP and CAPTCHA | These can send messages or lock real accounts. Use isolated test accounts and a controlled authentication environment first. |
| All salons/services, mobile layouts, other languages, Firefox and WebKit | Scope is one English desktop Chromium journey. Broader coverage needs representative fixtures and a browser/device matrix. |
| Discounts, points, taxes/fees and independent pricing rules | Current assertions check price consistency across pages, not the correctness of the business calculation. Seeded pricing cases are needed. |
| Load, security and comprehensive accessibility testing | These require separate test strategies and environments; this suite is a functional smoke test. |
| Cleaning up server-side checkout drafts | No reviewed cleanup mechanism is available. Opening checkout may create or resume state, so the authenticated journey stays out of automatic CI. |

## Flakiness risks and improvements

| Risk | Current handling | Improvement |
| --- | --- | --- |
| Live inventory, search ranking, renamed services or changed addresses | Explicit scenario expectations; skip only an explicit unavailable status | Seed a stable staging salon/service and reset inventory before each run. Keep production checks limited. |
| Price changes between catalog and checkout | Read the catalog price dynamically and compare later pages | Use controlled prices or a quote/version identifier; retain mismatch evidence instead of blindly retrying. |
| UI copy, repeated image alt text, CSS classes and English routes changing | Page objects centralize locators; assertions scope matches and check uniqueness | Add stable test IDs with the application team and use route helpers; expand locale coverage separately. |
| Desktop account menu hidden at narrower widths | 1920×1080 in headless; headed scales the desktop layout to fit the initial window | Test responsive account navigation explicitly and use a stable account control. |
| Slow network, asynchronous login handling or Cloudflare challenges | Auto-waiting assertions, bounded timeouts, one login attempt, no automatic retries | Use a controlled staging runner and wait for specific UI readiness; do not bypass CAPTCHA or merely increase timeouts. |
| Request guard rejects a newly introduced endpoint | Unexpected blocked requests fail and are attached to the report | Review endpoint behavior and update narrowly scoped rules; avoid broad allowlists. |
| Shared account and leftover checkout state | Fresh browser contexts and serialized runs | Use dedicated disposable accounts plus a staging reset/cleanup API; fresh contexts alone do not reset server state. |

Tracing, screenshots and video are disabled to reduce credential/account exposure. Failures retain scoped diagnostics and the Playwright report, but this limits debugging detail. In staging with synthetic accounts, enable failure traces and review artifact redaction and retention before uploading them. Zero retries keeps failures visible and avoids repeating production login or checkout actions.

## Structure and evidence

- `tests/catalog/authenticated-massage.spec.ts`: login-first checkout journey.
- `tests/catalog/massage-voucher.spec.ts`: anonymous catalog journey.
- `tests/auth/login.spec.ts`: standalone login test.
- `pages/`: focused page objects, including `checkout.page.ts`.
- `helpers/production-safety.ts`: request guard.
- `docs/validation.md`: actual results and historical troubleshooting.

Historical inspection applied to this provider and service only; it does not establish that every GoWabi provider follows the same flow. `docs/final-code.md` and the old ZIP are historical exports and are not the current source of truth.
