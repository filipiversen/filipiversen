<!-- Generated from public portfolio content. -->

# Details That Add Up

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/details-that-add-up)

A running list of small choices that make a UI feel sturdier.

Published: 2026-03-15

I keep a running file of these. None of them are clever individually; the
point is that they compound.

## Tabular numerals for anything counting

The default proportional digits in most fonts wobble when a number changes
in place — a counter, a price, a date. Set `font-variant-numeric: tabular-nums`
(or use the Tailwind `tabular-nums` utility) on anything that updates and the
shimmy disappears.

## A quiet border

Cards and list rows often need only a faint edge.
`border: 1px solid color-mix(in oklch, currentColor 12%, transparent)`
is a useful starting point. Check it against the actual surface in both themes.

## Optical alignment of icons

Icons with identical bounding boxes can still look misaligned. Check the
shapes together and move one by a pixel if needed. The direction depends
on the artwork; mathematical alignment is only a starting point.

## Easing curves that aren't `ease-in-out`

`cubic-bezier(0.22, 1, 0.36, 1)` (a soft-out curve) feels more like a UI
acknowledging an action and less like a PowerPoint transition. I reach for
it for short entrance transitions, usually around 200–400ms. Hover feedback
can be quicker.

## Hairlines that respect dark mode

A flat `#eee` border is subtle on a white page and harsh on a black one.
Defining a line token (`var(--color-line)`) and changing its value by theme
keeps borders legible without making them dominate the surface.
