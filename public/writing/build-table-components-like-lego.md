<!-- Generated from public portfolio content. -->

# Build Table Components Like Lego

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/build-table-components-like-lego)

What Survey Loop's table component teaches about composing data UI from small pieces instead of one giant grid abstraction.

Published: 2026-03-15

Our Survey Loop tables have to serve different screens without making every screen look or behave the same.

Sorting and filtering arrive first. Then come sticky headers, expandable rows, bulk actions, action menus, responsive cards, empty states, saved views, search, and column visibility. Each addition brings interaction and keyboard behavior to consider.

Putting every behavior behind one `DataTable` configuration would make each new screen depend on that abstraction. I wanted screens to have more control over their content.

In Survey Loop, we split the table into pieces that each screen can compose.

## The table is a layout primitive

The core `Table` in Survey Loop is not a native `<table>`. It is a grid wrapper with ARIA roles. It exposes compound pieces:

- `Table`
- `TableHeader`
- `TableHeaderCell`
- `TableBody`
- `TableRow`
- `TableCell`
- `ExpandableTableRow`
- `TableExpansionContent`

This is more verbose than one `columns={[...]}` prop. It gives each screen control over its content. Each screen can decide what belongs in a cell: text, buttons, links, tags, dropdowns, checkboxes, or custom layouts.

The table component owns the shared mechanics. Each screen supplies its content.

A grid with ARIA roles also takes on accessibility work that native HTML would otherwise provide. Roles alone don’t supply keyboard navigation. The [WAI-ARIA grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) describes those responsibilities. For a simple read-only table, I would start with native table markup; this article describes our implementation, not a blanket recommendation to replace it.

## Column layout uses CSS grid

Survey Loop's `Table` accepts a `columnTemplate` prop. It can be a CSS grid template string or an array of numbers and strings. Under the hood, it becomes `--sl-table-template`, and rows use CSS grid/subgrid so headers and body cells stay aligned.

Product screens can define fixed action columns, flexible names, compact checkbox columns, or percentage-based splits using familiar CSS values. The component doesn't need its own column-sizing language.

## Interaction is composable

The table supports row interactivity without making every row a button. It uses event delegation for row clicks, optional keyboard activation, and a `data-row-click-stop` escape hatch for interactive children.

Real tables often contain buttons, links, dropdowns, inputs, and menus. Row-click behavior needs to leave those controls usable on their own.

Expandable rows follow the same pattern. `ExpandableTableRow` handles expansion and animation, while `TableExpansionContent` gives the expanded area a consistent wrapper. The component provides the behavior. The product decides what details to show.

## Responsive behavior belongs in cells

Responsive tables are hard because the desktop shape and mobile shape are not the same information problem.

Survey Loop handles this through `mobileMode` on the table and cell-level props like `mobileLabel`, `mobileHidden`, and `mobileTitle`. A desktop row can become a stacked card without forcing the screen to maintain a separate mobile component tree.

The cell already knows what it contains. Giving it mobile metadata is more flexible than asking a parent `DataTable` to infer labels from a column config.

## Toolbars should stay separate

Survey Loop also has a separate `TableToolbar`.

Search, filters, saved views, and row actions are related to tables, but they are not the table. Keeping toolbar composition separate prevents the table from becoming responsible for every product workflow around data.

This makes screens easier to assemble:

- Use the table for tabular layout.
- Use the toolbar for table-adjacent controls.
- Use query hooks or page state for data fetching and filtering.
- Use product components for the cell content.
