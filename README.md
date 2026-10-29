# filipiversen.com

Personal site. SolidStart with prerendered content, deployed to Vercel.

## Stack

- [SolidStart](https://docs.solidjs.com/solid-start) with its normal client runtime
- TypeScript, Vite 8, Nitro 3
- Tailwind CSS v4 (CSS-first config in `src/styles/app.css`)
- MDX for posts (`@mdx-js/rollup` + `solid-mdx`)
- Self-hosted Geist Sans / Geist Mono via Fontsource

## Develop

```bash
npm install
npm run dev
```

Use the local URL printed by Vite. For a stable review URL:

```bash
npm run dev -- --host 127.0.0.1 --port 4174 --strictPort
```

Public Markdown is generated on startup and refreshed when public content changes.

## Build

```bash
npm run build
```

Build output targets the Vercel preset (`nitro.preset: "vercel"` in
`vite.config.ts`). The `/` and `/writing` routes, and the linked
case studies and articles, are pre-rendered at build time via `crawlLinks: true`.

## Layout

```
src/
  app.tsx, entry-{client,server}.tsx   # framework entrypoints
  routes/
    index.tsx                          # professional profile, career, work, approach, writing
    projects/[slug].tsx                # case study with contribution and evidence
    writing/index.tsx                  # writing index
    writing/[slug].tsx                 # individual post
  content/
    profile.ts                         # shared public bio, career, approach, and links
    projects.ts                        # typed project list
    writing.ts                         # MDX metadata + lazy body loader
    writing/*.mdx                      # posts
  components/
    PageShell, SectionHeading, ProjectList, WritingList   # shared page components
    islands/                           # hydrated on the client
      ThemeToggle, ProjectRowEffects, MagneticLink, SignalDemo
  styles/app.css                       # Tailwind v4 + tokens + view transitions
```

## Rendering

- Anything in `src/components/islands/` is loaded via `clientOnly()` and only
  renders on the client if it appears on the page.
- Content is prerendered to HTML and uses SolidStart’s normal client runtime.
  The `islands` directory name does not enable Islands mode.

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
   output directory are configured in `vite.config.ts`.
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
- Verify canonical/social metadata, valid robots.txt and sitemap.xml, and HTTP 404 for an unknown route.
- Measure performance on the deployed site; local timings do not establish a Lighthouse or Core Web Vitals score.

## Content and sharing

The build generates `public/sitemap.xml` from published MDX frontmatter. Index pages import metadata; article bodies load only when needed. Social preview cards live in `public/og/`. Run `node scripts/generate-social-cards.mjs` to update their SVG sources, then render matching PNGs at 1200×630. Keep titles and descriptions aligned when updating a case. `npm run build` verifies prerendered routes, sharing assets, section anchors, and metadata/body separation. Private career material under `docs/` is excluded from Git and Vercel uploads.

## Public profile and Markdown

`src/content/profile.ts` supplies the homepage and its `/profile.md` alternative.
The former `/profile` page permanently redirects to `/`; its section anchors
remain available on the homepage, and it is excluded from the sitemap. Published
case studies and articles export to `/projects/<slug>.md` and `/writing/<slug>.md`.
`/llms.txt` is a small annotated index of those files. HTML pages advertise their
Markdown alternative and link visibly to it. These are alternate presentations
of public content, not an export of the private career archive.
Markdown responses use `text/plain` in development and the Vercel route config
so browsers display the source instead of starting a download.

Run `npm run content:generate` to regenerate manually. `npm run dev` and
`npm run build` do it automatically. Edit the sources, not the generated files.
The converter preserves captions, alt text, transcripts, code examples, and
absolute links. New JSX components need an explicit text representation; the
generator fails rather than silently dropping them. Exports marked as generated
are removed when their source is deleted or becomes a draft. Handwritten assets
are preserved.

Case frontmatter includes `focus`, `contribution`, `outcome`, `evidence`, and
`reviewed`. The `reviewed` date records an editorial fact review against the
confirmed source material; update it deliberately when reviewing those facts.
It is separate from the work period and original article publication date, and
is never set to the build date. A review does not imply independently measured
product results. Keep qualifications beside the claims they qualify.

Run `npm run test:content` for conversion and publication-boundary checks,
`npm run typecheck`, then `npm run build` for production verification.
