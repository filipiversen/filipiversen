<!-- Generated from public portfolio content. -->

# Build AI for an Ordinary Tuesday

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/ship-practical-ai-not-pilots)

What it takes to turn an impressive demo into a system people can depend on.

Published: 2026-05-20

An AI demo can summarize a document, draft an email, or answer a question
from the wiki and impress everyone in the room. Getting it into daily use
takes a different kind of work.

The demo usually runs on a clean input with someone steering. A production
system has to handle the inputs people send it, including the ones nobody
thought to put in the presentation.

## What the demo skips

- **Failure handling.** What happens when a document is malformed, an API is
  down, the model returns unusable output, or a request is out of scope?
- **Evaluation.** Keep a fixed set of real cases so you can measure changes
  and catch regressions before a release.
- **Permissions and review.** Decide what the system can do on its own and
  where it must stop for a person.
- **Cost and response time.** Check both at the volume you expect people to
  use. A feature that works for one request may struggle with many at once.

It’s easy to leave these out of an early demo. They still need answers
before people depend on the system.

## Keep a failed step recoverable

The [insurance platform](https://www.filipiversen.com/projects/insurance-policy-platform) has a useful
example, even though the recovery itself doesn't need AI. An external
provider can accept a policy while a later local update fails. Staff need
to finish that update without submitting the policy again.

That is the kind of behavior I want to see in a production review: what
succeeded, what remains unfinished, and what the person can safely retry.
The same questions apply when a model is involved in preparing the work.

## Build for the ordinary day

I want the system to survive an ordinary Tuesday: the inputs are messy,
the person who built it is busy, and someone needs to get their work done.

That means making room for types, tests, evaluations, and logs from the
start of the production build. It also means deciding who gets told when
something fails and what they can do about it. A prototype can help you
learn quickly, but hardening it needs its own time in the plan.

Before handing it over, I want to be able to answer a practical question:
how will someone know whether it’s working without asking the person who
built it? They should have a way to see completed work, inspect failures,
and take over when the system needs help.
