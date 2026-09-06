# Part 2 — Findings and Improvement Opportunities

These findings summarize the supplied exploratory review of massage services in Bangkok, desktop navigation, and checkout. They are improvement proposals, not confirmed functional defects. Business impacts are potential outcomes, not measured results. Severity expresses the reviewer's assessment of potential impact; prioritization should be validated with product requirements and user evidence.

The current automated journey covers an eVoucher checkout without selecting an appointment. It does not establish how all providers handle scheduled bookings. The automation below is proposed future coverage, not a claim that these tests already exist. No supporting screenshots are included in this document.

## 1. Search by Available Date and Time

**What I did:** I searched for “massage” in Bangkok and reviewed the available search filters.

**What happened:** I did not find a clear option to filter salons by a preferred appointment date and time in the reviewed search interface. This observation is limited to that interface and does not establish that availability filtering is absent everywhere.

**What I expected / proposed improvement:** For services that support scheduled appointments, let customers select a preferred date and time from search and see services with matching availability. Keep eVoucher services clearly identified when appointment availability is not available before purchase.

Example: `Sep 6 → 18:00–20:00 → Show Available Services`.

**Severity: Medium — usability improvement.**

**Why it matters to the business:** Repeatedly opening salons without finding a suitable appointment could frustrate customers and contribute to abandoned searches and lost bookings.

**Would I automate this? — API + E2E, once the feature and availability contract exist.**

- **API:** With controlled availability data, verify that results match the selected date, time range, and timezone, and exclude unavailable slots. Cover no matching availability and time-range boundaries.
- **E2E:** Search → select date/time → review available results → open a salon → verify a matching slot remains selectable. Also verify the empty-results message.

## 2. Make “Book Now” vs “Buy eVoucher” Clearer

**What I did:** I searched for massage services and reviewed the available booking options.

**What happened:** The review identified “Book Now” and “Buy eVoucher” labels. Their difference may not be immediately clear to customers. The inspected eVoucher flow explains that the customer arranges an appointment with the salon after purchase; the scheduled “Book Now” flow needs separate verification.

**What I expected / proposed improvement:** Explain the booking model before the customer proceeds. For services supporting these models, use wording such as:

- **Book Now:** Select an appointment date and time, where supported by the service.
- **Buy eVoucher:** Purchase a voucher, then arrange the appointment with the salon according to its terms. A voucher purchase does not itself confirm an appointment.

**Severity: High — proposed priority based on potential misunderstanding; no affected customer case was confirmed.**

**Why it matters to the business:** Customers who mistake a voucher purchase for a confirmed appointment could encounter scheduling issues, request refunds, or contact support.

**Would I automate this? — API + E2E.**

- **API:** If booking type is exposed by the API, verify it against configured service fixtures and the documented contract.
- **E2E:** Verify that each supported booking type displays the correct explanation and follows its intended flow. For eVouchers, verify the appointment instructions; for scheduled services, verify date/time selection and the selected appointment summary in a controlled environment.

## 3. Respect Salon/Clinic Service Capacity

**Review basis:** I considered whether appointment availability reflects limited therapist or treatment-room capacity. The supplied notes do not demonstrate a completed capacity test, simultaneous booking attempts, or an actual overbooking.

**What happened:** No capacity defect was confirmed. This is a risk to investigate in a scheduled-booking flow, not an observed failure in the tested eVoucher journey.

**What I expected / proposed improvement:** Available appointments should respect the provider's configured capacity and reservation rules. For example, if a slot has capacity for one customer, a confirmed booking should prevent another booking from exceeding that capacity.

Example: `18:00 → Capacity: 1 → 1 booking confirmed → Slot unavailable`.

**Severity: High if overbooking is reproduced — currently an unverified risk.**

**Why it matters to the business:** Overbooking could cause scheduling conflicts, cancellations, refunds, customer complaints, and operational problems for salon partners.

**Would I automate this? — API + E2E in staging with disposable booking data.**

- **API:** Configure capacity to one and submit competing booking requests. Verify that only one succeeds, capacity is not exceeded, and the other receives the documented conflict response. Verify capacity release after cancellation or reservation expiry according to business rules.
- **E2E:** Using two customer sessions, fill the final slot in one session and verify the other cannot complete a booking for that slot, including when its availability view is stale.

## 4. Add a Clear Main Navigation Bar

**What I did:** I opened the GoWabi homepage on desktop and reviewed the main navigation.

**What happened:** Search, categories, and account options were present, but I did not find a clear, consolidated navigation bar for the important sections in the reviewed layout. This is a discoverability assessment, not proof that the destinations are missing.

**What I expected / proposed improvement:** Provide clear and consistent access to key destinations, subject to the site's information architecture and the customer's login state.

Example: `Home | Categories | Promotions | Nearby | My Bookings | eVouchers`.

**Severity: Medium — usability improvement.**

**Why it matters to the business:** Difficulty finding services or existing bookings could increase confusion and cause customers to leave before completing their intended task.

**Would I automate this? — E2E after the navigation design is agreed.**

- Verify that the expected navigation items are visible at supported viewport sizes, accessible by keyboard, and lead to the correct destinations.
- Verify the agreed behavior of account-specific destinations for signed-in and signed-out customers.
- Use usability testing to assess whether discoverability improves; automated checks alone cannot establish that.

## 5. Present Payment as the Final Checkout Step

**What I did:** I selected a service and continued to checkout.

**What happened:** In the reviewed desktop layout, Booking Details, Customer Details, and Payment appeared side by side. I found the intended sequence less clear because payment was visible while reviewing or entering other information. No payment was submitted and no validation defect was confirmed.

**What I expected / proposed improvement:** Make the sequence explicit: **Review Booking → Enter Customer Details → Payment**. Consider placing payment below the preceding sections or using a step-based flow, depending on the agreed design.

**Severity: Medium — usability improvement.**

**Why it matters to the business:** A clearer sequence could reduce confusion and input mistakes, potentially reducing checkout abandonment. This requires user research or conversion data to validate; a side-by-side layout is not inherently incorrect.

**Would I automate this? — E2E after the checkout requirements are agreed.**

- Verify the agreed section order or step progression and that booking details remain accurate through the flow.
- Verify that missing or invalid required customer details prevent progression or submission as specified and produce clear validation messages.
- Verify that payment is presented as the final step in the proposed design. Keep real payment submission outside production smoke tests; use a payment sandbox for purchase completion coverage.
