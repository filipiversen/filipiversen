<!-- Generated from public portfolio content. -->

# Your Company Already Wrote the Manual

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/your-company-already-wrote-the-manual)

Tickets, docs, and calls can give agents useful context, provided someone curates what they can use.

Published: 2026-06-28

A lot of a company’s operating knowledge is already written down. It’s
scattered across help-desk tickets, onboarding docs, Slack threads, and
call recordings. More of it lives in the head of the person everyone asks
when the documentation runs out.

A general-purpose model won’t know that history unless you give it a way
to find it. Before building another chatbot, I’d look at the material
the company already has.

## Give the material some structure

Useful context includes the relationships between documents: which policy
applies to which product, which fix resolved an error, and which guidance
has been replaced. A collection of files needs that context to be useful
for more than keyword matching.

For an innovation network, I worked on a [knowledge platform](https://www.filipiversen.com/projects/ai-knowledge-platform) that let staff
import PDFs and websites, review the extracted material, and publish it
into a searchable library. Answers linked back to the passages they used.

The review step mattered. Staff decided what was ready to publish, and
updated source material needed approval before replacing the evidence
readers could already find.

## Start with what exists

I’d approach a company’s internal material in the same order:

1. Inventory the docs, tickets, and recordings people already use. Find
   the recurring questions and the sources that answer them.
2. Index a curated set with clear owners, access permissions, and a way
   to retire outdated guidance.
3. Give the agent access to that material and test it on real questions.
   Check whether the cited passage supports the answer, including cases
   where the library doesn’t have enough information.

New tickets and calls can improve the library, but they still need review.
An outdated answer copied into ten documents is still outdated. Keep the
source, its owner, and its publication status visible so someone can
correct it when the underlying work changes.
