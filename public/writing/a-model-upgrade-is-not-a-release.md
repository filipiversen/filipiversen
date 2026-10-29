<!-- Generated from public portfolio content. -->

# A Model Upgrade Needs More Than a Config Change

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/a-model-upgrade-is-not-a-release)

Prompts, tools, evaluations, and fallbacks determine whether a new model improves your product.

Published: 2026-04-18

When a better model ships, it’s tempting to change one string in a config
file and announce an upgrade. Longer context, lower cost, stronger agent
behavior. It sounds like an easy win.

But the change still needs to pass through the system around the model:
the prompts, tools, evaluations, and failure handling. That’s what I mean
by the harness, and it’s the part you control.

## The part you own

Model providers set their own schedules. Prices change, capabilities shift,
and versions are eventually deprecated. Your application has to keep
working through those changes.

You control how it uses the model:

- The prompts and context you assemble from your data.
- The tools the model can call and the permissions on each.
- The evaluation cases that reveal whether a swap made things better or worse.
- The validation, retries, and fallbacks that handle bad output and failed requests.

Those are worth improving even when you aren’t changing models.

## Two small investments

I’d start with one place in the code that maps a task, such as classifying a
document or drafting a reply, to a model. Keep it small. The point is to make
a model change easy to find and review without building a framework around it.

Then keep a fixed set of real cases you can run before a release. Include
ordinary inputs, known failures, and cases where the system should ask for
help. A provider’s benchmark can tell you what to investigate; your own
cases tell you whether the change helps your product.

## Before shipping the upgrade

Run the old and new configurations against the same cases. Compare the
results, inspect regressions, and check cost and response time as well as
answer quality. Keep the previous configuration available so you can roll
back if production reveals a problem the evaluations missed.
