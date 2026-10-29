import { useParams } from "@solidjs/router";
import { createMemo, For, Show } from "solid-js";
import { Title, Meta } from "@solidjs/meta";
import { MDXProvider } from "solid-mdx";
import { HttpStatusCode, clientOnly } from "@solidjs/start";
import PageMeta from "~/components/PageMeta";
import { profile } from "~/content/profile";
import PageShell from "~/components/PageShell";
import { mdxComponents } from "~/components/mdx-components";
import { getProject, projects } from "~/content/projects";

const TitleReveal = clientOnly(
  () => import("~/components/islands/TitleReveal"),
);

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const project = createMemo(() => getProject(params.slug));
  const nextProject = () => {
    const index = projects.findIndex((item) => item.slug === params.slug);
    return projects[(index + 1) % projects.length];
  };

  return (
    <PageShell wide>
      <Show
        when={project()}
        keyed
        fallback={
          <>
            <HttpStatusCode code={404} />
            <Title>Not found — Filip Iversen</Title>
            <Meta name="robots" content="noindex" />
            <h1 class="mx-auto max-w-[38rem] text-2xl font-semibold tracking-tight">
              Not found
            </h1>
            <p class="mx-auto mt-2 max-w-[38rem] text-pretty text-fg-muted">
              That project doesn't exist (yet).{" "}
              <a
                href="/"
                class="underline decoration-line underline-offset-[0.25em] hover-hover:hover:decoration-fg"
              >
                Back home →
              </a>
            </p>
          </>
        }
      >
        {(p) => (
          <article>
            <PageMeta title={`${p.meta.title} — Filip Iversen`} description={p.meta.description} path={p.meta.href} image={`/og/${p.meta.slug}.png`} markdown={`${p.meta.href}.md`} article />

            <div class="reading-progress" aria-hidden="true" />

            <header class="mx-auto mb-10 w-full max-w-[38rem]">
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
                  href="/#projects"
                  class="-my-2 py-2 transition-colors hover-hover:hover:text-fg"
                >
                  projects
                </a>
              </nav>
              <h1
                data-hero-step="2"
                data-title-reveal
                class="text-3xl font-semibold tracking-tight text-balance md:text-[2rem]"
                style={`view-transition-name: project-title-${p.meta.slug}`}
              >
                {p.meta.title}
              </h1>
              <div
                data-hero-step="3"
                class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-faint"
              >
                <span class="tabular-nums">{p.meta.period ?? p.meta.year}</span>
                {p.meta.role ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{p.meta.role}</span>
                  </>
                ) : null}
                {p.meta.status ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span class="uppercase tracking-[0.1em]">
                      {p.meta.status}
                    </span>
                  </>
                ) : null}
                {p.meta.url ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <a
                      href={p.meta.url!}
                      target="_blank"
                      rel="noreferrer"
                      class="-my-2 py-2 transition-colors hover-hover:hover:text-fg"
                    >
                      visit ↗
                    </a>
                  </>
                ) : null}
              </div>
              <p class="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{p.meta.description}</p>
              <dl class="case-facts mt-6">
                <div><dt>My contribution</dt><dd>{p.meta.contribution}</dd></div>
                <div><dt>What shipped</dt><dd>{p.meta.outcome}</dd></div>
                <div><dt>Evidence</dt><dd>{p.meta.evidence}</dd></div>
              </dl>
              <div class="mt-4 flex flex-wrap items-center gap-x-5 text-xs text-fg-faint">
                <span>Last reviewed <time datetime={p.meta.reviewed}>{p.meta.reviewed}</time></span>
                <a href={`${p.meta.href}.md`} target="_blank" rel="noreferrer" class="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover-hover:hover:text-fg">View as Markdown</a>
              </div>
              <nav aria-label="In this case" class="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <For each={p.meta.sections}>{(section) => <a class="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover-hover:hover:decoration-fg" href={`#${section.id}`}>{section.label}</a>}</For>
              </nav>
            </header>

            <div data-hero-step="4" class="prose prose--wide">
              <MDXProvider components={mdxComponents}>
                {(() => {
                  const C = p.Component;
                  return <C />;
                })()}
              </MDXProvider>
            </div>

            <nav aria-label="Continue exploring" class="mx-auto mt-12 w-full max-w-[38rem] border-t border-line pt-6">
              <p class="font-mono text-xs uppercase tracking-wider text-fg-faint">Next case</p>
              <a href={nextProject().href} class="mt-1 inline-flex min-h-11 items-center gap-3 text-lg font-medium">{nextProject().title} <span aria-hidden="true">→</span></a>
              <div class="mt-3 flex flex-wrap gap-x-6 text-sm text-fg-muted">
                <a class="inline-flex min-h-11 items-center underline decoration-line underline-offset-4" href="/#projects">All selected work</a>
                <a class="inline-flex min-h-11 items-center underline decoration-line underline-offset-4" href={`mailto:${profile.email}`}>Discuss working together</a>
              </div>
            </nav>
            <TitleReveal />
          </article>
        )}
      </Show>
    </PageShell>
  );
}
