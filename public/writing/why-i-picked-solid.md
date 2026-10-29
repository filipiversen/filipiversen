<!-- Generated from public portfolio content. -->

# Why I Picked Solid for This Site

By Filip Iversen

[Canonical page](https://www.filipiversen.com/writing/why-i-picked-solid)

A short note on prerendered pages, signals, and keeping a personal site small.

Published: 2026-04-22

I rebuilt this site with SolidStart because most of it is writing and links,
with a few interactive details. I wanted those details to be easy to build
without turning the content into a complicated application.

## HTML first

The home page, writing index, and linked articles are prerendered during
the build. Their content is available as HTML before the browser runs the
client application.

The current setup uses SolidStart's normal client runtime. Interactive
components such as the theme toggle, project hover effects, and signal demo
load through `clientOnly`. That keeps them separate from the content, though
it doesn't make the site JavaScript-free or put it in Islands mode.

## Signals are easy to follow

What I like most about Solid is that a signal is a getter and a setter,
and a memo is a derived value. Components set up their reactive work once;
changes update the parts that depend on them.

Below is a small demo inside this MDX file. The buttons change one signal,
and two memos derive values from it. The numbers update while the surrounding
labels and markup stay in place.

[Open the interactive signal demo in the article](https://www.filipiversen.com/writing/why-i-picked-solid)

Most of the interactive details on this site need only a few signals,
a memo or two, and an effect where they interact with the browser.

## The tradeoff

The MDX integration needed some configuration, and a personal site like
this could be built with a simpler static-site setup. I picked Solid partly
because I enjoy its reactive model and wanted somewhere small to work with it.

The source is on [GitHub](https://github.com/filipiversen/filipiversen).
