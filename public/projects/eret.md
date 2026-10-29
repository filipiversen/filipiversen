<!-- Generated from public portfolio content. -->

# Eret

By Filip Iversen

[Canonical page](https://www.filipiversen.com/projects/eret)

Keeping a contractor's estimates, jobs, and payments connected.

Work period: 2026 · Founder · Product Design · Engineering · live

Last reviewed: 2026-10-29

**Focus:** Reviewing and approving AI-proposed estimate changes.

**My contribution:** As founder, I own product design and engineering.

**What shipped:** A live contractor platform connecting leads, estimates, proposals, jobs, and billing, with review and approval for assistant-proposed changes.

**Evidence:** A real estimate screen accompanies the account of review, approval boundaries, and end-to-end workflow testing.

A contractor can spend the whole day building someone else's project, then
spend the evening reconstructing their own business from texts, spreadsheets,
receipts, and half-finished notes.

That's the problem I built Eret around. As founder, I owned the product's
design and engineering. Eret connects leads, estimates, proposals, jobs, and
billing for contractors with between one and 50 employees. It also lets AI
assistants help with the work, with permissions and approvals built into the
operations they can use.

Eret is live. This case follows two connected design problems: carrying
information from an estimate into a job, and letting someone review an
assistant's proposed changes without losing sight of the estimate.

![Eret estimate with line-item costs, a financial summary, and the assistant panel open](https://www.filipiversen.com/devices/macbook-screen.webp)

_The estimate stays in view. The assistant names the estimate it is following, while line items and the financial summary remain beside it._

## Carrying the information through the job

In a small contracting business, the owner may also be the salesperson,
estimator, project manager, and collections department. A customer or project
can end up entered into several different systems as the work moves along.

I wanted one piece of information to enter the business once and remain useful
throughout the job. In Eret, a lead carries through estimating and proposals
into a job. Materials move into purchasing, vendor bills update project costs,
and completed work flows into invoices and payments. Each stage keeps its
connection to the customer, scope, and financial record.

I mapped the journey before building it in complete working slices: identity and organization
boundaries, sales intake, estimates, proposals, jobs, and the financial work
that follows.

Estimating is a good example of how much belongs in one slice. An estimate can
use catalog items and assemblies, include waste percentages and allowances,
and present the customer with different options. The quantities, costs, and
customer-facing scope need to agree when that estimate becomes a proposal.

## Reviewing an assistant's changes

An assistant can inspect an estimate, identify questionable or missing lines,
and prepare a revision plan. The person working on the estimate can refine
that plan, approve the changes, or discard them.

I use the same registered operations for the interface and assistants. Each
operation specifies who can use it, whether an agent can execute it, what
needs human confirmation, and what goes into the audit trail.

Actions fall into three groups: agent-safe, confirmation-required, and
human-only. An assistant's access is capped by the permissions of the person
it represents.

For example, an external assistant can propose assigning a lead to another
team member. Eret shows the approver the target, reason, risk, expiry, and
proposed change. Approval allows Eret to execute that operation and record
the result. It doesn't give the assistant general permission to make other
changes.

## Keeping money outside the model

Construction software has very little room for imaginative arithmetic.

Eret stores money as integer cents and performs pricing, markup, tax, waste,
allowance, invoice, and payment calculations on the server. AI can help
organize scope and draft descriptions. The application remains responsible
for the amounts.

I applied the same separation to vendor-bill extraction. Confidence comes
from the source evidence and arithmetic checks performed by the application.
The model doesn't grade its own answer.

## Testing a complete job

Eret runs as a TypeScript modular monolith, with a Fastify API, a Next.js web
app, background workers, and PostgreSQL. Keeping the business rules together
lets me follow a customer action from the interface through the API and into
the database, including changes that touch several stages of a job.

Testing the work through the application exposed problems that isolated tests
had missed. In one case, a failed background handler could roll back the record
of its own attempt. I found it by driving queued work through PostgreSQL.

I test the whole sequence in the browser: create the lead, prepare the
estimate, review the assistant's changes, send the proposal, open the customer
link, approve it, and inspect the resulting job. Permissions, failure cases,
and conflicting edits need to hold through that sequence too.

AI is also part of the development process. I give coding agents bounded
assignments using product stories, operation contracts, and acceptance
scenarios. Tests refer back to the stories they cover. That gives me a way to
check generated work against the intended behavior.

The estimate stays beside the conversation while someone reviews a change.
They can inspect its line items and financial summary before deciding whether
to apply the revision. That context needs to remain available as the assistant
takes on more of the preparation work.
