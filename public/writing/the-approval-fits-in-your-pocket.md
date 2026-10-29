<!-- Generated from public portfolio content. -->

# The Approval Fits in Your Pocket

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/the-approval-fits-in-your-pocket)

A small approval interface works when the summary, permissions, and default behavior are trustworthy.

Published: 2026-06-20

Some operational work takes a whole screen to prepare and only a moment
to approve. Someone gathers records, reconciles a spreadsheet, and checks
the numbers before asking another person for a decision.

Automation can separate the preparation from the approval. That opens up
a useful design question: how much of the decision can fit on a phone?

## Make the decision small enough to understand

Consider an invoice matched to a purchase order with a 2% price variance.
An approval screen could show the invoice, the purchase order, the amount
of the difference, and the action that approving it would take. The source
records should be close enough to inspect without hunting through another app.

That can be a reasonable phone-sized task. An unfamiliar exception or a
decision with broad consequences may need more room and more time. The
interface should make it easy to move into a fuller review.

## Keep the proposed change beside the work

In [Eret](https://www.filipiversen.com/projects/eret), an assistant can prepare changes to an estimate
while its line items and financial summary remain visible. The person can
refine the plan, approve the changes, or discard them. An approval applies
to the proposed operation, within that person's permissions.

That gives me a concrete starting point for a smaller screen: preserve the
target, the change, and the path back to the underlying work. The invoice
example above is a design example, not a claim that Eret has shipped that
phone interface.

## What has to be true first

The summary must match the underlying records. A person approving a
description of the work needs to be able to check it, with the source one
tap away.

The approval must authorize exactly what was described. Permissions and
validation should limit what the agent can do with that decision.

The default must be safe. If nobody answers, the system waits or routes
the request to someone else. Silence is never consent.

I’d design the queue around those requirements before making it available
on a phone. A compact screen is useful when it gives someone enough
context to decide, inspect the source, or defer the question until they
can give it proper attention.
