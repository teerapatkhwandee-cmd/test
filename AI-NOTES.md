# Part 4 — AI Usage

## 1. Which AI tools I used and for what

I used **Claude Code and ChatGPT** during this assignment.

**Claude Code** helped me:

- Create and refactor Playwright tests.
- Inspect the existing project structure and improve reusable helpers and page objects.
- Troubleshoot failed tests and locator issues.
- Review test code for readability and maintainability.

**ChatGPT** helped me:

- Brainstorm test scenarios and edge cases.
- Review the automation strategy and improvement ideas.
- Analyze errors and possible causes when tests failed.
- Improve documentation and make explanations more concise.

The repository assistant in Codex also helped turn my supplied drafts into `FINDINGS.md`, `STRATEGY.md`, and `AI-NOTES.md`, organize the content, and distinguish observed behavior from unverified risks and future proposals.

I treated AI as an assistant, not the source of truth. I checked suggestions against the actual GoWabi website, Playwright results, and assignment requirements. The findings document explicitly identifies proposed improvements and unverified risks rather than presenting every suggestion as a confirmed bug.

## 2. Most useful prompt

The following prompt established the intended objective and production boundaries:

> You are helping me build a Playwright TypeScript QA automation assignment for GoWabi.
>
> Target: GoWabi production website. This is a LIVE PRODUCTION environment.
>
> - Read-only testing only.
> - Never complete a payment.
> - Never confirm or submit a real booking.
> - Stop before any action that could create real production data.
> - Keep concurrency at 1 worker.
> - Do not perform load or stress testing.
>
> Inspect the customer booking flow: Search for “massage” in Bangkok → open a salon → select a service → select an available date/time → continue to checkout → stop before payment or booking confirmation.
>
> Prefer stable Playwright locators and reusable helpers. If an action cannot be safely validated in production, explain the limitation instead of bypassing it.

**Why this prompt was useful:** It gave AI both the testing objective and explicit boundaries. It also required limitations to be reported rather than inventing coverage or bypassing restrictions.

**What subsequent inspection clarified:** The selected service uses an eVoucher flow, so no appointment date/time is selected. Opening checkout also creates or resumes server-side checkout state, even though the entry uses GET. The implemented authenticated journey therefore does not fully satisfy the original prompt's strict “read-only / no production data” boundary. It is an explicitly enabled local test with narrowly scoped checkout access; it does not submit PLACE ORDER, payment, or booking confirmation, and no draft cleanup is claimed. A strictly read-only run must stop before this checkout entry. These limitations are documented in `README.md` and `docs/validation.md`.

This showed why a safety prompt alone is insufficient: the actual effects of navigation and requests still need inspection.

## 3. Example where AI gave a wrong or questionable solution

**Example: Login test**

AI initially suggested a generic login approach and selectors based on assumptions about the page. Running the test against the real website exposed differences in the login response and authenticated page state.

I noticed the problem through Playwright failures and inspection in headed mode. The investigation recorded in `docs/validation.md` identified concrete issues:

- The login used an AJAX endpoint that the initial request guard did not permit.
- A successful login response could identify the user without automatically redirecting home. HTTP 200 alone was insufficient proof of authentication.
- At a 1280px viewport, the desktop account menu was hidden under a responsive `tablet-hide` ancestor, so the expected Log Out control was not visible.

The corrected approach permits one POST to an observed login endpoint, checks the login response, opens home in the same browser context, and opens the account menu before asserting that Log Out is visible. The desktop configuration uses a 1920×1080 headless viewport. The authenticated journey then retains that browser session through search and checkout; no authentication state file is exported.

**Validation:** I reported a standalone run of `tests/auth/login.spec.ts` with **1 passed**, followed by `tests/catalog/authenticated-massage.spec.ts` with **1 passed**. The repository's validation notes independently record a passing authenticated journey, including login and checkout assertions, but do not retain a separate passing standalone-login result. These are historical results, not new runs performed while preparing this document.

This reinforced my rule that AI-generated code is a starting point. I validate it by running tests, observing the actual application, investigating failures, and checking that assertions pass for the correct reason. For this production suite, screenshots, video, and tracing are disabled to limit account-data exposure; I do not claim retained traces as evidence. In a controlled environment with synthetic accounts, failure traces would be useful additional diagnostics.
