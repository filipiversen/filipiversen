<!-- Generated from public portfolio content. -->

# Your Attention Does Not Parallelize

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/your-attention-does-not-parallelize)

Running more agents only helps when you have time to review what they produce.

Published: 2026-07-06

Starting an AI agent can take one sentence. Reviewing its work takes longer.

At Survey Loop, a Sentry error or user-reported bug goes into a channel.
We tag Cursor, it produces a tested pull request, and we review and merge.
The handoff still needs a person to check what changed and whether it solves
the reported problem.

Adding more incoming work creates more of those reviews. A passing test run
helps, but it doesn't decide whether the fix fits the product.

[Addy Osmani calls this the orchestration tax](https://addyosmani.com/blog/orchestration-tax/).
His point is that agent output can grow faster than your capacity to review
it. I think that’s a useful constraint to put at the start of an automation
project.

## Set a review budget

How many decisions can the responsible person review well in a day? How
much context does each decision require? An invoice exception and an
architectural change consume very different amounts of attention.

That budget helps decide which tasks can run independently, which should
stay sequential, and which need the person involved from the beginning.
The number of agents the tool can launch tells you very little about this.

## Make the queue manageable

I’d start with three habits:

- Have the system run tests, schema checks, and evaluations before requesting
  review. Show those results alongside the work.
- Route decisions according to risk. An invoice workflow might process
  routine matches within agreed limits and flag a price variance for review.
- Collect related reviews into a queue so someone can work through them in
  one sitting, with the relevant context close at hand.

Measure completed, reviewed work alongside the backlog. If the queue keeps
growing, reduce the incoming work or change what the system asks people to
decide before adding another agent.
