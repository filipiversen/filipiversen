<!-- Generated from public portfolio content. -->

# Lenders Cooperative / Allocore

By Filip Iversen

[Canonical page](https://www.filipiversen.com/projects/lenders-cooperative)

Building Peak, a shared Figma design system, and carrying it into complex lending workflows.

Work period: 2024–2026 · Senior Product Designer · past work

Last reviewed: 2026-11-10

**Focus:** Shared Figma foundations for commercial and government lending.

**My contribution:** I led the Figma migration and Peak design system, owned commercial product design within a six-person team, and built the commercial component library.

**What shipped:** Peak adopted by every designer across both businesses; commercial origination workspace and government borrower portal released.

**Evidence:** Original Figma components, states, and theme variables. Customers reported faster origination; no quantitative before-and-after measure was collected.

![Peak design system overview with original button, input, and table components from the shared Figma library.](https://www.filipiversen.com/work/lenders-cooperative/peak-overview-3200.webp)

_Peak, the shared design system I led for Lenders Cooperative and Allocore. Original Figma components arranged for this case study. Select any image to inspect it at full size._

## Peak, from Figma to the product

Lenders Cooperative and Allocore needed a shared way to design across
commercial and government lending. When I joined, components and layouts
were scattered across Adobe XD files. Designers kept rebuilding the same
controls while product, engineering, marketing, and sales needed new work.

I led the move to Figma and built Peak with the design team: a shared library
of components, interaction states, and tokens. My work connected the library
to product design and its commercial code implementation, so the decisions
we made in Figma could carry through to working interfaces.

The library needed to work for the people designing the next screen. I used
an atomic component structure: small, reusable elements composed into fields,
controls, tables, and larger interfaces. Auto Layout and nested components
kept those relationships inside the components themselves.

I owned commercial product design within a six-person team, working alongside
the design director and the broader government team at Allocore. Peak was
shared across both businesses. Every designer used it; engineering adoption
continued as the products were updated.

### Components that carry their behavior

A button in Peak includes its interaction states and configuration. The
Figma Button set contains 45 authored variants, with separate properties for
visual variant, state, and size. Boolean properties expose the leading icon,
trailing icon, dropdown, and counter, so designers can configure an instance
without pulling it apart.

The Input set contains 35 authored variants across text, select, search, and
date controls. Its properties cover size, state, leading and trailing visuals,
a loader, and supporting messages. Focus, error, hover, and disabled states
are part of the library, alongside the default appearance.

![Peak button state matrix, configurable component properties, and input examples showing default, focus, error, and disabled states.](https://www.filipiversen.com/work/lenders-cooperative/peak-states-3200.webp)

_States and properties from the original Button and Input sets. The counts describe these two sets, not the entire library or every possible combination of properties._

This made the Figma library useful for working through behavior as well as
appearance. A designer could show a field with an error, a focused control,
or an action with a counter using the same component structure as the rest
of the flow.

### One component, two brands

We organized tokens into system, theme, and component layers. In Figma,
variables and aliases separate a component's purpose from the brand value
it uses. The same control can take on the Lenders Cooperative or Allocore
theme through a variable mode.

For example, the semantic action-background token resolves to the shared
action color in the LOS Theme and the darker action color in Allocore.
Changing that mapping changes the themed control while preserving its
structure, states, and properties.

![The same Peak controls in Lenders Cooperative and Allocore themes, with the actual global-to-alias token paths and brand color values.](https://www.filipiversen.com/work/lenders-cooperative/peak-themes-3200.webp)

_Two actual variable modes and their token mappings. The forms are illustrative compositions built from the shared components._

### Carrying the decisions into code

I built the commercial component implementation and worked with engineering
on Storybook, synchronized tokens, and discrepancies between design and code.
Accessibility work included contrast and keyboard-navigation audits against
WCAG AA requirements, followed by fixes with the frontend teams.

I also built an AI-assisted prototyping platform around our component library.
We used it to turn early designs into working demos for internal feedback and
customers. Using our own components kept the prototypes connected to the
system we were developing.

## From components to a lending workspace

Dense lending interfaces put the system to work. Tables needed to accommodate
loan groups, status, ownership, actions, and conversation while keeping the
records readable. The same small controls had to hold together inside these
larger compositions.

![A grouped collateral table from the Peak Figma library, showing loan groups, cells, and row actions with sample names and records.](https://www.filipiversen.com/work/lenders-cooperative/peak-table-3200.webp)

_An existing table composition from the Peak library. It shows the system's components working together in a financial workflow; names and selected descriptions are sample content._

The applications view brings navigation and record-level context together.
Lenders can scan stage, amount, ownership, and recent comments, then narrow
the list to the work they need. The design keeps those controls close to the
records they affect.

![Lenders Cooperative applications table with product navigation, searchable records, loan stages, ownership, internal status, and recent comments, using sample names.](https://www.filipiversen.com/work/lenders-cooperative/lending-applications-workspace-3200.webp)

_An applications-list design from the navigation and table project, presented with sample records. This is a Figma design artifact; the application-level task workflow below is a separate part of the work._

Filtering and display settings needed the same care as the table itself.
Searchable fields help people find a filter; an applied condition makes the
current selection visible; reset and save actions sit beside it. Grouping,
ordering, and column visibility let lenders shape the view around their work.
A shared data table shipped primarily to back-office users, with filters,
saved views, column resizing, and display settings.

![Enlarged filter menus, an applied loan officer condition with reset and save actions, and settings for grouping, ordering, and visible table columns.](https://www.filipiversen.com/work/lenders-cooperative/lending-table-controls-3200.webp)

_Original filter and display controls, enlarged to make the interaction details readable. The menus show sample people and are expanded to reveal the full lists._

### A sequence that leaves room to move

Inside an individual application, the problem was how lenders moved through
the work. The old interface sent them back to a queue across all loans after
each task. They had to find the next task and often kept several tabs open
to gather information.

Interviews with bank and credit union users, Customer Success calls, and our
internal origination team showed how much the order varied. I designed an
application workspace that supported both a sequence and the freedom to
move elsewhere. The side navigation showed completed, pending, and blocked
work, including the reasons for blockers. Finishing a task advanced to the
next one; lenders could also choose another task themselves.

### Before: find the loan again

1. Finish a task for one loan.
2. Return to the queue across all loans.
3. Find and open the next task.
4. Repeat, using other tabs for context.

### After: stay with the application

1. Open the application's workspace.
2. See progress and reasons for blockers.
3. Finish a task and advance to the next.
4. Jump to another task when needed.

_A retrospective diagram of the application-level workflow change._

### Working with the task screens we had

The workspace had to fit around existing task screens. Redesigning all of
them was outside scope, and some intended details were omitted under
engineering constraints. Keeping those tasks in place let us improve
navigation without waiting for the whole origination process to be rebuilt.

The commercial back-office workspace shipped. Customers and Customer Success
reported faster origination; we did not collect a quantitative before-and-after
measure.

## A separate borrower experience

Borrowers and grant recipients needed to understand their accounts, find
tasks and messages, and move between loan accounts. I led the initial
redesign across commercial and government needs, then worked with the
broader design team to complete it. The government experience shipped,
including the SBA portal. The commercial borrower experience was still in
development when I left in October 2026.

The application exploration below breaks a complex request into clear
decisions. It starts with purpose, then asks for an amount. The alternative
path for “not sure” lets the borrower continue without having to invent a
number first.

![Borrower application exploration showing loan purpose, an illustrative amount selection, and an alternative path for borrowers who are unsure.](https://www.filipiversen.com/work/lenders-cooperative/lending-borrower-flow-3200.webp)

_A guided application exploration from the original Figma file, with illustrative financial values. These screens show design exploration, not the shipped government portal._

The mobile verification exploration treats selection, progress, and completion
as one experience. Capture guidance appears before the upload. The progress
screen explains the work underway. The final state acknowledges submission
while making clear that verification is still in progress.

![Three mobile verification designs showing ID selection and capture guidance, upload progress, and a submitted ID awaiting verification.](https://www.filipiversen.com/work/lenders-cooperative/lending-mobile-verification-3200.webp)

_Original mobile design explorations showing the states around ID submission._

Peak gave the design team a common foundation across these different kinds
of work. My contribution spanned that foundation and its application: the
Figma library, commercial product design, and the component implementation
that carried the system into code.
