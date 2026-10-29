<!-- Generated from public portfolio content. -->

# Survey Loop

By Filip Iversen

[Canonical page](https://www.filipiversen.com/projects/survey-loop)

Designing a survey editor, a responsive respondent experience, and AI reports people can inspect.

Work period: 2023–present · Co-founder · Product Design · Frontend · live

Last reviewed: 2026-10-29

**Focus:** Evolving an editor and making AI findings inspectable.

**My contribution:** I co-founded the product and own design and frontend engineering. A backend partner architected the backend; I also contribute backend features.

**What shipped:** A live survey platform with paying organizations, including the canvas editor, respondent experience, and evidence-linked AI reports.

**Evidence:** Customers have responded positively to the editor. The case includes real-interface recordings with sample data; creation-time and reporting-accuracy improvements have not been measured.

I wanted Survey Loop to feel good to use, whether you were building a survey,
answering one, or trying to understand what customers were telling you.
Authors need to work on the questions and the order together. Respondents
need a clear way through them. The people reading the results need to see
what the feedback supports.

I co-founded Survey Loop in August 2023, around the time I left Denim Social.
It's an AI-native customer experience and survey platform for financial
services and events, live with paying organizations. I own product design
and frontend engineering, including the editor and shared component library.
I contribute backend features alongside a backend partner who architected
that part of the product.

[Watch the video](https://www.filipiversen.com/work/survey-loop/walkthrough.mp4)

[English descriptions](https://www.filipiversen.com/work/survey-loop/walkthrough.vtt)

[Watch the Survey Loop walkthrough](https://www.filipiversen.com/work/survey-loop/walkthrough.mp4).

_The real Survey Loop interface with sample data. Assistant and MCP steps are simulated. 40 seconds, no audio._

_Read the walkthrough_


A scripted assistant request creates a draft post-event survey. At 8 seconds, the draft opens in the real builder with recommendation, event rating, and written follow-up questions. At 16 seconds, the appearance controls change its branding from violet to green. At 26 seconds, the respondent preview selects ratings, writes “More time for workshop questions,” and reaches the completion screen. No response is submitted to a live service.

## From a form to a canvas

The first Survey Loop builder was form-based: authors added fields dynamically,
with no drag-and-drop. I designed and built the next iteration around a canvas,
where authors could reorder blocks, edit questions in place, and adjust the
selected block’s settings beside it.

### Before: a form-based builder

1. Add fields dynamically.
2. Configure them through form controls.
3. No drag-and-drop.

### After: edit in context

1. Add a question to the canvas.
2. Edit its wording in place and drag to reorder.
3. Adjust the selected question’s settings beside it.

_A retrospective comparison of the interaction models, not screenshots of the original builder._

### Editing the question in its context

The editor has three parts: a library of question and content blocks, a
canvas, and a contextual inspector. Authors can add or reorder blocks,
write directly in the canvas, and configure the selected block in the sidebar.
Survey-wide settings, such as appearance, use that same sidebar when a block
isn't selected.

The distinction is visible in the work. Wording and order belong with the
questions on the canvas. Detailed settings belong beside the selected block.
The inspector changes with the selection, so it doesn't need to show every
question's controls at once.

![Survey Loop editor with a block library at left, the survey canvas in the middle, and appearance settings at right. The header shows Draft and Saved, with Preview and Versions controls.](https://www.filipiversen.com/work/survey-loop/walkthrough-poster.png)

_A still from the recorded product demo, using sample data. Left: add blocks. Center: work on the survey in context. Right: change appearance or the selected block's settings. The header keeps save status and preview available._

## Saving is part of the interaction

Inline editing makes changes feel immediate, but the interface still has to
tell the author whether those changes reached the server. The editor shows
saving, saved, and failed states. Opening a preview or using Save and close
waits for pending changes; a failed save keeps the action from proceeding
and shows an error.

Version history gives authors a way to restore an earlier survey. That is a
separate action from autosave: one preserves the current edits, while the
other lets someone deliberately return to a previous version.

I designed and built the editor and the respondent experience with the same
token-based component library. The respondent sees the company's branding
through the questions and completion screen, with a layout that works on a
phone. The recording below follows that side of the product.

[Watch the video](https://www.filipiversen.com/work/survey-loop/mobile.mp4)

[English descriptions](https://www.filipiversen.com/work/survey-loop/mobile.vtt)

[Watch the mobile respondent flow](https://www.filipiversen.com/work/survey-loop/mobile.mp4).

_The actual respondent interface, from ratings to a written answer and completion. Fictional sample response; no live submission. 16 seconds, no audio._

_Read the respondent flow_


The respondent selects a recommendation score of 9 out of 10 and an event rating of 5 out of 5, then writes “More time for workshop questions.” The preview ends at the branded completion screen.

## When one complaint became a theme

Early AI reports sometimes found feedback that wasn't there, or made one
negative response sound like a common sentiment. That could send a survey
owner toward the wrong problem. A fluent summary wasn't enough.

I refined the reporting instructions to favor recurring patterns, keep the
language proportional to the feedback, and require response references for
strengths and concerns. The implementation filters out unknown evidence IDs
and removes findings left without supporting references.

People can inspect the responses behind a finding, including the question
and answer, and open the original response. This makes the summary easier
to question. A valid response reference doesn't prove that the model's
interpretation is right, and we haven't measured an accuracy improvement.
The reports are in production; the original feedback remains available
alongside them.

### Start with the responses

1. “The workshop was useful.”
2. “The examples helped me understand the topic.”
3. “I wanted more time for questions.”

### An overstatement

“Attendees were frustrated by the lack of time for questions.”

This turns one response into a claim about the group.

### Proportional wording

“One respondent wanted more time for questions.” [Inspect response 3](https://www.filipiversen.com/projects/survey-loop#example-response-3)

_Fictional responses and illustrative wording explain the reporting change. These are not historical model outputs or a measured evaluation. A valid reference still needs human interpretation._

## The same product through an assistant

The API gave us another way to work with all of this. We added support for MCP, the Model Context Protocol, so a connected AI assistant can use Survey Loop's tools to create and edit surveys, read responses, and query analytics. The assistant gets structured data and defined actions through the same API the application uses.

For example, you could ask an assistant to create a draft post-event survey with an NPS question and a written follow-up. It can create that draft in Survey Loop, ready for you to open in the builder and refine. Once responses arrive, you could ask it to compare NPS across two periods and pull the written feedback for review. Those requests use the surveys and responses already in your account, without exporting a spreadsheet for each conversation.

That connection also has to respect how the product works. MCP access is authenticated and follows the user's organization permissions. Read-only connections can inspect data without changing it. A survey created through an assistant is the same survey you open in the application, so you can move between the two as the work requires.

## Building around contract work

Bootstrapping is harder than people make it sound. I developed Survey Loop
alongside contract work and, later, my employed role. The first frontend
was built in Vue; I later rebuilt it in Next.js. I continue to design and
implement the product with a backend partner.

Customers have responded positively to the editor. I don't have a measured
change in survey-creation time or completion rate to attach to it. What I
can show is the live interaction: building a survey, checking the respondent
experience, and moving between an AI-assisted draft and direct editing.
