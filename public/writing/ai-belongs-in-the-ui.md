<!-- Generated from public portfolio content. -->

# AI Belongs in the UI

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/ai-belongs-in-the-ui)

What misleading survey reports taught me about context, evidence, and where AI belongs in a product.

Published: 2026-03-15

An early Survey Loop report could make one negative comment sound like a
common complaint. It could also find feedback that wasn't there. The prose
read well, which made the problem harder to spot.

I worked on the reporting behavior and the interface around it. The useful
question was whether a survey owner could understand a finding, check the
responses behind it, and decide what to do next.

## Start with the survey someone is looking at

When someone opens a survey, the product already knows the questions, ratings,
and written answers they are reviewing. A summary can use that context
without making the person start a conversation and explain which survey
they mean.

The survey detail page puts the summary beside the rest of the results.
Loading, processing, and error states explain what is happening; the last
updated time tells someone how current the report is. The dashboard can
also summarize feedback across surveys, with a path into the individual
results.

Chat is useful when someone wants to explore or ask a follow-up. A summary
panel gives the recurring question a place in the product.

## A reference has to lead somewhere useful

I refined the reporting prompts to favor recurring patterns, require
supporting response references for strengths and concerns, and omit findings
that lack support. The implementation filters out references to unknown
response evidence and drops findings left without references.

The interface connects a finding to the question and answer behind it, with
an Open response link. That gives someone a way to disagree with the summary
using the source material in front of them.

There is a limit to what a citation proves. A response can be real and still
be interpreted badly. Checking an ID prevents a broken reference; it doesn't
prove the conclusion or establish how common a sentiment is. I haven't
measured an accuracy improvement from these changes.

## Give the person somewhere to go next

A useful report needs more than a paragraph that sounds finished. It needs
the responses, a way to see when the summary was produced, and a clear state
when generation fails. Those are interface decisions as much as reporting
implementation.

The [Survey Loop case](https://www.filipiversen.com/projects/survey-loop) shows how this fits with the
editor and assistant. Someone can create a draft through an assistant,
refine it in the editor, and later inspect a report against the answers.
Each part uses the product context already available to it.
