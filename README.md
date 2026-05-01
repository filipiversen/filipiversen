# filipiversen.com

Personal site. SolidStart in **Islands mode**, deployed to Vercel.

## Stack

- [SolidStart](https://docs.solidjs.com/solid-start) (`experimental.islands: true`)
- TypeScript, Vite (via Vinxi)
- Tailwind CSS v4 (CSS-first config in `src/styles/app.css`)
- MDX for posts (`@mdx-js/rollup` + `solid-mdx`)
- Self-hosted Geist Sans / Geist Mono via Fontsource

## Develop

```bash
npm install
npm run dev
```

The site runs on [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Build output targets the Vercel preset (`server.preset: "vercel"` in
`app.config.ts`). The `/` and `/writing` routes — and every `/writing/[slug]`
they link to — are pre-rendered at build time via `crawlLinks: true`.

## Layout

```
src/
  app.tsx, entry-{client,server}.tsx   # framework entrypoints
  routes/
    index.tsx                          # home (intro + projects + recent writing)
    writing/index.tsx                  # writing index
    writing/[slug].tsx                 # individual post
  content/
    profile.ts                         # bio + links
    projects.ts                        # typed project list
    writing.ts                         # MDX loader (eager glob + frontmatter)
    writing/*.mdx                      # posts
  components/
    PageShell, SectionHeading, ProjectList, WritingList   # zero-JS HTML
    islands/                           # hydrated on the client
      ThemeToggle, ProjectRowEffects, MagneticLink, SignalDemo
  styles/app.css                       # Tailwind v4 + tokens + view transitions
```

## Notes on Islands mode

- Anything in `src/components/islands/` is loaded via `clientOnly()` and only
  hydrates if it actually appears on the page.
- Page-to-page navigation is a full document load (Islands mode disables the
  client-side router). The CSS `@view-transition` rule handles the visual
  swap, plus a `view-transition-name` shared between the writing list title
  and the post title.

## Adding a post

1. Drop a new `.mdx` file in `src/content/writing/`.
2. Frontmatter:

   ```mdx
   ---
   title: A short title
   description: Optional one-liner shown in the index.
   date: 2026-05-01
   tag: notes
   draft: false
   ---
   ```

3. To embed the live signal demo, just use `<SignalDemo />` — it's mapped in
   `routes/writing/[slug].tsx` via the `MDXProvider`.

## Deployment

The repo is set up for [Vercel](https://vercel.com). The Nitro Vercel preset
emits a complete `.vercel/output/` build (`config.json` + prerendered static
HTML + edge function fallback) on `npm run build`.

### One-time setup

1. Push the repo to GitHub (or GitLab/Bitbucket).
2. In the Vercel dashboard: **Add New… → Project**, import the repo.
3. Vercel auto-detects SolidStart. Build command (`npm run build`) and
   output directory are detected from `app.config.ts`.
4. **Project → Settings → Domains** → add `filipiversen.com` (apex) and
   `www.filipiversen.com`. Vercel will guide DNS records (`A 76.76.21.21`
   for the apex, `CNAME cname.vercel-dns.com` for `www`).

### CLI deploy (alternative)

```bash
npm i -g vercel
vercel link
npm run build
vercel deploy --prebuilt --prod
```

### Verifying after deploy

- `curl -I https://filipiversen.com/` → expect `200` and `cache-control:
  public, max-age=…`
- The home, writing index, and any indexed posts are served as fully
  pre-rendered HTML — no cold-start, no SSR runtime cost.
- Lighthouse should score 100/100/100/100 on the home page.
