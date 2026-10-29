<!-- Generated from public portfolio content. -->

# Insurance Policy Platform

By Filip Iversen

[Canonical page](https://www.filipiversen.com/projects/insurance-policy-platform)

Keeping coverage choices, payment, and policy records consistent across customer and staff workflows.

Work period: 2026 · Product Design · Frontend · live

Last reviewed: 2026-10-29

**Focus:** Keeping quotes and policy records consistent across customer and staff workflows.

**My contribution:** I owned product design and frontend engineering, working with a backend partner.

**What shipped:** A live replacement for quoting, policy submission, and CRM. Claims stayed outside the scope.

**Evidence:** Quote and recovery workflows are shown as labeled illustrations with fictional data.

A customer can change their coverage at checkout. That choice needs to
follow through to payment, the saved quote, and the record staff use to
submit the policy. If those views disagree, someone has to work out which
one is right.

I owned the product design and frontend for an insurance platform built
with a backend partner through Northway. It replaced third-party quoting,
policy submission, and CRM software. Claims remained outside the replacement.
The platform is in production; the initial release took a few weeks, and
we continue to improve it weekly.

![Three illustrative screens follow the same quote from coverage selection through payment review to an accepted submission in the admin interface. Interfaces and rates are fictional.](https://www.filipiversen.com/work/insurance-policy-platform/02-connected-quote.svg)

_Coverage selection stays connected to checkout and the saved quote. Interfaces and rates are illustrative._

The work connected customer, broker, and internal workflows. We started
with an existing stack and component library, so much of the effort went
into the insurance behavior and making each state understandable to the
person who needed to act on it.

## Following a quote through the product

The customer-facing work included landing pages, account creation, quote forms
that branch by product and jurisdiction, and online payment collection. The
platform generates policy documents, declarations, and notices, with policy
management available to the people administering the business.

The way someone finishes depends on the program they enter through. Some
customers pay online; other quotes go to a broker for submission.

Those pieces share the same backend. Product and jurisdiction affect the
quote flow; policy state and document templates govern the documents. The
interface has to present those differences while keeping the underlying
records connected.

Customers can change their coverage at checkout, and that choice updates the
saved quote. The payment must use the same selection that staff see in the
admin record.

## Configuring agencies and brokers

The scope included both an agency configuration and an MGA-style organization
working with multiple brokers. They needed different branding, forms,
products, commissions, and document templates, with access controlled by role.

We handled those differences through the data model, permission boundaries,
and configurable components. The application could share its forms, tables,
and navigation while applying the configuration for a particular tenant.

Reusable quote templates have separate partner assignments. The same template
can serve multiple partners while each keeps its own branding, links, and
default flow. Agent links inherit their partner's configuration.

That was a substantial part of the work. The number of screens alone doesn't
describe the combinations of products, jurisdictions, and broker access the
platform needs to represent.

## Recovering an accepted policy submission

The external provider can accept a policy even if updating the customer record
in our system fails. Retrying the whole process could create a second submission.
The application keeps the accepted result and lets staff retry the local customer
activation, linking the recovered record to the existing policy. If the result
of a payment operation is uncertain, it requires review before another attempt.

![An accepted external policy is retained while a failed local customer activation is retried. The recovered customer record links to the existing policy. Illustrative record shown.](https://www.filipiversen.com/work/insurance-policy-platform/05-submission-recovery.svg)

_Recover the unfinished local update without repeating an accepted policy submission._

## Shared foundations

The build started with Next.js and TypeScript, a typed API client, PostgreSQL,
deployment, and observability. The component library already covered forms,
tables, navigation, and dashboards, including focus states and dark-mode
styles.

The interface and API share one Next.js runtime. Business rules and access
checks run on the server. TypeORM handles database access, while external
services handle payments, address validation, and policy submission.

Reusing those foundations let us spend the initial release on quote rules,
policy behavior, payment hooks, and tenant configuration. My work covered
the interface and product experience, with a backend partner on the platform.
