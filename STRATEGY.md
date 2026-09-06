# Part 3 — Automation Strategy

## First-month priorities

In the first month, I would not try to automate all 300 regression test cases. I would review and group them by **business risk, execution frequency, stability, and automation value**, then build a small, reliable regression suite around the most critical customer journeys.

| Period | Focus | Deliverable |
| --- | --- | --- |
| Week 1 | Review the 300 cases, identify critical journeys and dependencies, and agree on environments and test data with developers. | A prioritized backlog with automation candidates, manual coverage, and reasons for each decision. |
| Week 2 | Establish fixtures, selectors, API helpers, and CI; automate a small smoke suite. | Reliable checks for login, search, service details, and the checkout boundary. |
| Week 3 | Add high-value negative cases and API/integration coverage for availability, capacity, and validation where the environment supports them. | Broader coverage using controlled data, with cleanup and independent tests. |
| Week 4 | Review failures, execution time, maintenance effort, and coverage gaps; stabilize the suite and document ownership. | A dependable smoke suite, scheduled regression coverage, and a prioritized next-month backlog. |

The scope would depend on environment readiness and testability. I would measure progress by coverage of critical risks, useful feedback time, and reliability, rather than the number of automated cases alone.

## What I would automate first

I would start with **high-risk and frequently repeated flows**: login, search, opening a service, selecting an available date/time for services that support scheduled appointments, and continuing through checkout. Production checks would stop before any real payment or booking confirmation.

The current repository covers an eVoucher journey, where the appointment is arranged separately after purchase. It does not validate date/time selection. Scheduled-booking coverage would require a separate service fixture and a verified scheduling flow.

I would also automate important negative cases, such as invalid login, unavailable time slots, and API validation, in a controlled environment with dedicated accounts. Invalid-login tests would not repeatedly target real production accounts because they can trigger lockouts or anti-abuse controls.

Where possible, I would test business rules such as availability and capacity at the **API/integration level**. For example, a capacity test should verify that competing requests cannot exceed a slot's configured limit, rather than relying only on whether the UI hides a slot. Tests that confirm bookings would use disposable staging data and cleanup facilities. Payment completion would use a payment sandbox.

## What I would keep manual

I would keep tests manual when automation provides little value or the result requires human judgment. This includes exploratory testing, visual/UX evaluation, new or frequently changing features, and infrequent scenarios with high maintenance costs. Some may remain manual permanently.

Real payments and actions affecting salons or customers would stay outside routine production automation. Keeping a scenario manual does not itself make it suitable to execute in production; such testing still requires an appropriate environment and authorization.

## Decision rule

My qualitative decision rule would be:

**Automate when:**

```text
Business risk × Execution frequency × Repeatability
    > Automation cost + Maintenance cost
```

This is a prioritization heuristic, not a numerical formula with directly comparable units. A strong candidate protects an important customer or revenue flow, runs often, has a clear expected result, and is stable enough to maintain. A low-risk scenario that runs occasionally and changes frequently would stay manual even if automation is technically possible.

## Keeping the suite fast and reliable

I would keep a small number of critical E2E tests and move most business-rule validation to API/integration tests. Tests should be independent, use predictable data, and create their required state through fixtures or APIs where possible. Fresh browser contexts isolate browser state, but server-side records still require separate data and cleanup.

I would avoid fixed sleeps and wait for observable application states or specific API responses. I would prefer accessible role/name locators when they provide a stable user-facing contract, and use agreed `data-testid` attributes where necessary. Fragile CSS chains and ambiguous text matches would be avoided.

In staging with synthetic accounts, failed tests should produce screenshots, traces, and useful logs, with sensitive values redacted and bounded artifact retention. The current production suite disables screenshots, video, and tracing to limit account-data exposure; the proposed staging diagnostics would not silently change that policy.

Flaky tests should be investigated and fixed. If a test needs temporary quarantine, I would record an owner, reason, and resolution deadline, and retain visibility of the coverage gap. Tests that no longer provide value could be removed after review. Repeated retries should not hide failures; the current production suite uses zero retries.

## CI execution

I would separate execution into:

- **Pull requests:** A fast, deterministic smoke suite on staging, supported by API/integration checks, so developers receive useful feedback quickly.
- **Scheduled or pre-release runs:** Broader regression coverage, including additional negative cases and relevant browser/device combinations as capacity allows.
- **Production:** A small, explicitly scoped smoke suite with serialized execution and no real payment or booking confirmation.

This is a target strategy. The current repository's CI runs the anonymous production catalog journey; authenticated checkout runs locally with explicit opt-in and can create or resume server-side checkout state. Moving to the target strategy requires a staging environment, controlled data, and appropriate CI configuration.

I would track execution duration, failure causes, flaky-test frequency, skipped critical tests, and escaped defects. A green run with skipped journeys should not be treated as proof that those journeys passed.

## Support needed from developers

I would need stable selectors, predictable test data, and APIs or fixtures that create the required state without navigating the UI every time. Availability, capacity, and payment tests also need controllable service configuration, disposable accounts, sandbox integrations, and reliable reset or cleanup mechanisms.

Clear acceptance criteria and visibility into business rules are essential, particularly for appointment reservations, capacity release, voucher behavior, and pricing. QA and developers should update affected tests together when UI behavior, APIs, or requirements change, with clear ownership for investigating CI failures.

## AI-assisted implementation

With Claude Code and repository access, I would use AI to accelerate test drafting, refactoring, and failure investigation. This describes a proposed workflow, not a claim that Claude Code was used for this submission.

I would review every generated test for correctness, maintainability, and business value, checking that assertions reflect independent requirements rather than merely reproducing the implementation. Generated changes would be validated with type checking and relevant test runs. Credentials and private customer data would not be included in prompts or committed artifacts. Actual AI use for this assignment belongs in `AI-NOTES.md`.
