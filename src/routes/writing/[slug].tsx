import { useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { Title, Meta } from "@solidjs/meta";
import { MDXProvider } from "solid-mdx";
import { HttpStatusCode, clientOnly } from "@solidjs/start";
import PageMeta from "~/components/PageMeta";
import PageShell from "~/components/PageShell";
import { mdxComponents } from "~/components/mdx-components";
import { getPost } from "~/content/writing";

const SignalDemo = clientOnly(
  () => import("~/components/islands/SignalDemo"),
);
const TitleReveal = clientOnly(
  () => import("~/components/islands/TitleReveal"),
);

const components = {
  ...mdxComponents,
  SignalDemo,
};

export default function WritingPost() {
  const params = useParams<{ slug: string }>();
  const post = createMemo(() => getPost(params.slug));

  return (
    <PageShell>
      <Show
        when={post()}
        keyed
        fallback={
          <>
            <HttpStatusCode code={404} />
            <Title>Not found — Filip Iversen</Title>
            <Meta name="robots" content="noindex" />
            <h1 class="text-2xl font-semibold tracking-tight">Not found</h1>
            <p class="mt-2 text-pretty text-fg-muted">
              That post doesn't exist (yet).{" "}
              <a
                href="/writing"
                class="underline decoration-line underline-offset-[0.25em] hover-hover:hover:decoration-fg"
              >
                Back to writing →
              </a>
            </p>
          </>
        }
      >
        {(p) => (
          <article>
            <PageMeta title={`${p.meta.title} — Filip Iversen`} description={p.meta.description ?? "Notes on product design and engineering."} path={p.meta.href} markdown={`${p.meta.href}.md`} article />

            <div class="reading-progress" aria-hidden="true" />

            <header class="mb-10">
              <nav
                data-hero-step="1"
                aria-label="Breadcrumb"
                class="mb-6 flex items-center gap-1.5 font-mono text-xs text-fg-faint"
              >
                <a
                  href="/"
                  class="-my-2 py-2 transition-colors hover-hover:hover:text-fg"
                >
                  index
                </a>
                <span aria-hidden="true" class="text-fg-faint/60">/</span>
                <a
                  href="/writing"
                  class="-my-2 py-2 transition-colors hover-hover:hover:text-fg"
                >
                  writing
                </a>
              </nav>
              <h1
                data-hero-step="2"
                data-title-reveal
                class="text-3xl font-semibold tracking-tight text-balance md:text-[2rem]"
                style={`view-transition-name: post-title-${p.meta.slug}`}
              >
                {p.meta.title}
              </h1>
              <div
                data-hero-step="3"
                class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-faint"
              >
                <time datetime={p.meta.date}>{p.meta.dateLabel}</time>
                <a href={`${p.meta.href}.md`} target="_blank" rel="noreferrer" class="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover-hover:hover:text-fg">View as Markdown</a>
                {p.meta.tag ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span class="uppercase tracking-[0.1em]">
                      {p.meta.tag}
                    </span>
                  </>
                ) : null}
              </div>
            </header>

            <div data-hero-step="4" class="prose">
              <MDXProvider components={components}>
                {(() => {
                  const C = p.Component;
                  return <C />;
                })()}
              </MDXProvider>
            </div>

            <a href="/writing" class="mt-10 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4">← All writing</a>
            <TitleReveal />
          </article>
        )}
      </Show>
    </PageShell>
  );
}
