<!-- Generated from public portfolio content. -->

# Frameworks Matter Less, Model Fluency Matters More

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/frameworks-matter-less-model-fluency-matters-more)

Framework choice includes how well your team and its AI tools can work with the code.

Published: 2026-03-15

React, Vue, Svelte, Solid, and Angular can all support good products. Team
experience, libraries, performance, and maintenance usually matter more
than winning a framework argument.

AI adds another consideration: how much correction does your assistant
need when it works in your stack?

## Familiar patterns make a difference

Survey Loop uses React and Next.js. Its design system, pages, API helpers,
and dashboard components follow patterns that AI assistants can work with.
That makes assistance useful across everyday implementation work.

React has a large collection of public tutorials, open-source components,
TypeScript examples, and library documentation. That is useful material for
people and assistants to consult. It is also a plausible reason for model
familiarity, though a large public ecosystem doesn't tell us exactly what
any model was trained on.

The practical test is what the assistant does in your repository. Can it
follow the component patterns, use the right data-fetching helpers, and
make a change without introducing a second way to do the same thing?

## Give the assistant local context

A familiar framework only takes you so far. An assistant still needs to
understand the decisions your team has made within it:

- Common language and framework patterns.
- Clear repository conventions.
- Strong type definitions.
- Reusable components.
- Local rules or skill files.
- Tests and stories that show intended behavior.

In Survey Loop, the design system and API helpers give generated code an
existing structure to follow. The [design-system rules](https://www.filipiversen.com/writing/write-ai-skills-for-your-design-system)
explain decisions that a component's props alone can't communicate.

That work is useful in Vue or Solid too. Clear local examples reduce the
amount an assistant has to guess, regardless of the framework.

## The framework still has to fit the team

I wouldn't recommend a rewrite on the strength of AI tooling alone. A team
that knows Vue and has good conventions may lose more from moving to React
than it gains. Model behavior also changes, so a stack decision needs a
longer life than one model's strengths.

Keep the usual factors in view: team expertise, existing code, ecosystem
dependencies, performance needs, hiring, design-system maturity, and
deployment. Add the quality of AI assistance to that list.

Before committing, give the assistant representative work in the stack:
a component change, a bug fix, a test. Review the result and the corrections
it needed. That gives you something concrete to compare alongside the
team's own experience.
