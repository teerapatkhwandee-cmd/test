# Validation — 5 September 2026

## Latest checkout verification — 6 September 2026

`GOWABI_RUN_PRODUCTION=1 GOWABI_RUN_LOGIN=1 npm run test:authenticated` — **1 passed (34.7s)**; test duration 33.1s, one worker, zero retries. `npm run typecheck` passed. Discovery found 3 tests in 3 files.

Verified the complete login-first journey through the actual checkout summary: Massage Home, Thai Massage, 60 min, final price ฿350 matching the dynamic catalog selection. The test asserts Your Booking, Payment and PLACE ORDER UI, compares the checkout amount and records `verified-checkout-summary` without account data.

Date/time are **not applicable to this Deal Voucher flow**, not passed appointment assertions. The service FAQ describes arranging appointments after purchase; checkout showed Deal Voucher and no selected appointment, native date/time controls or labelled date/time fields. A separate scheduling flow is required to verify a selected appointment date/time.

The observed entry is GET `/en/organization_services/134870/buy_as_deal`, followed by a UUID service-request summary. The guard now permits one entry and the summary only in the authenticated checkout test. Opening this page creates or resumes checkout state; the live UI showed a cart item and price-hold countdown. No PLACE ORDER, payment or confirmation action was submitted, and no draft cleanup is claimed.

During implementation, a click before the salon page finished loading changed only the URL fragment. Waiting for load allowed the actual entry request to run. Subsequent checks were corrected to tolerate the checkout's `#organization_image` fragment and whitespace around rendered paragraph text. The final run above exercised these corrections.

This latest result supersedes the historical statements below that checkout was unimplemented or unverified. The current report contains the final passing test and verified summary; earlier diagnostic reports have been replaced.

## Latest login-before-search verification

`GOWABI_RUN_PRODUCTION=1 GOWABI_RUN_LOGIN=1 npm run test:authenticated` — **1 passed (16.9s)**, test duration 15.7s. `npm run typecheck` also passed.

The live DOM showed the `Log Out` link inside `.user-menu-dropdown`, under a `tablet-hide` ancestor. At the previous 1280px viewport, opening the navigation did not expose this desktop account menu. The configuration now uses 1920×1080, and login opens the observed `.user-menu-dropdown > button.after_login` before asserting the visible `Log Out` link. The AJAX response identifies the user but supplies no redirect; the test opens home in the same context and verifies the authenticated UI there. It then successfully searches and inspects the selected salon/service. The page remains open after successful login.

This supersedes the earlier login-failure status below. **Checkout remains unimplemented and unverified.** Earlier failed diagnostic attempts and historical results are retained below; they do not describe the latest login outcome.

Environment: macOS ARM64, Node 20.18.0, npm 10.8.2, @playwright/test **1.62.1**, bundled Chromium.

| Command / activity | Actual result |
| --- | --- |
| `npm view @playwright/test@1.62.1 version` | Returned `1.62.1` |
| `npm install` | Installed dependencies and generated package-lock.json |
| `npx playwright install chromium` | Exit 0 |
| `npm run typecheck` after final source changes | Exit 0 |
| `npm run test:list` | Discovered 2 tests in 2 files |
| `GOWABI_RUN_PRODUCTION=1 npm run test:production` after fixes | **1 passed (18.0s)**; test duration 16.5s; **1 worker** |
| `npm test` with no production opt-in | **2 skipped**, exit 0; this is not a production pass |
| Real credential login test | **Failed**: login requests returned HTTP 200, but authenticated UI was not verified; checkout not reached |
| GitHub Actions | Created, not run remotely |
| Checkout summary / selected appointment / transaction | **Not verified / not performed by the test** |

Successful production runner output:

```text
Running 1 test using 1 worker

✓ 1 [chromium] › tests/catalog/massage-voucher.spec.ts:5:5
  › Bangkok massage eVoucher details and anonymous login boundary @catalog (16.5s)

1 passed (18.0s)
```

The successful journey executed home search, Bangkok address verification, service detail navigation,
dynamic card/detail price comparison, eVoucher FAQ verification, date/time absence checks, and
anonymous Buy eVoucher → login modal assertions. The pending-action POST was blocked by the safety fixture.
This is **not** a checkout or authenticated purchase pass.

Before that successful run:

- Sandboxed Chromium launch failed with macOS `bootstrap_check_in ... Permission denied`. The approved run outside the sandbox launched successfully.
- The first live run exposed a duplicated address locator and blocked Cloudflare telemetry. The address now uses a paragraph scope; telemetry stays blocked and is explicitly expected.
- Another run exposed newline whitespace in the price span. The assertion now accepts surrounding whitespace without hard-coding the price.
- Another run exposed repeated salon links in FAQ content. The salon assertion now scopes to the breadcrumb list.
- Another run exposed newline whitespace in the eVoucher list item. The assertion now handles it.

All live runs were sequential, with one worker and zero automatic retries. There was no load/stress run.
The final default `npm test` check replaced the local HTML report with its **two skipped tests**.
The successful production console result is recorded above; no retained trace/screenshot is claimed.

## Credential-login follow-up

The user supplied credentials locally in `.env.example`. They were moved into ignored `.env` with file mode 0600, and `.env.example` was restored to empty placeholders. No credential values are included in this document or the source bundle.

The first login run was blocked before its AJAX submission reached the server because the guard allowed only the HTML form endpoint. The observed request was `POST /en/users/sign_in_json`; the guard was corrected to allow one login POST across the two exact login endpoints.

The next run sent the permitted login request but failed after 20 seconds because the page remained at `/en/users/sign_in`. The user then confirmed that the account works with email and password. A headed diagnostic run returned HTTP 200 but did not verify authentication. A further run removed the assumption of an automatic home redirect: it opened home in the same context, but still did not pass the authenticated-menu check. Three credential submissions were permitted in total during this investigation, plus the initial blocked attempt; all runs were sequential, with no automatic retries. Further submissions were stopped. HTTP 200 alone does not establish successful login or an invalid password. **Checkout remains unverified.**

The failed run's local error-context snapshot contained input values. Runtime reports were regenerated with both live flags disabled to clear those artifacts. Login now closes its credential-bearing page before reporting failure and records only the HTTP status on future runs. The page-closing and HTTP-status diagnostics were exercised in the headed failed runs. The final additional diagnostic stage label was type-checked but was not followed by another credential submission.

Playwright MCP also observed the login modal in a fresh anonymous context. The shared MCP browser
already had an authenticated session during later inspection, but this does not count as a successful
execution of `tests/auth/login.spec.ts`. Credentials and session state were not exported to this repository.

Remaining boundary: the service-request navigation observed during exploratory inspection was not
validated as a safe checkout, and no checkout field assertions have been invented. See README for the
inspection ambiguity and safety interception details.
