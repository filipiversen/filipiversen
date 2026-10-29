import { For } from "solid-js";
import PageShell from "~/components/PageShell";
import PageMeta from "~/components/PageMeta";
import SectionHeading from "~/components/SectionHeading";
import FeaturedWork from "~/components/FeaturedWork";
import WritingList from "~/components/WritingList";
import { profile } from "~/content/profile";
import { projects } from "~/content/projects";
import { posts } from "~/content/writing";

const LINK = "inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover-hover:hover:decoration-fg";

export default function Home() {
  const selectedWriting = posts.filter((post) => post.featured !== undefined)
    .sort((a, b) => a.featured! - b.featured!);

  return (
    <PageShell>
      <PageMeta title={`${profile.name} — ${profile.role}`} description={profile.intro} path="/" markdown="/profile.md" />
      <header class="mb-12">
        <h1 class="text-3xl font-semibold tracking-tight">{profile.name}</h1>
        <p class="mt-2 text-lg text-fg-muted">{profile.role}</p>
        <p class="mt-5 text-pretty leading-relaxed text-fg-muted">{profile.intro}</p>
        <div class="mt-3 flex flex-wrap gap-x-6 text-sm">
          <a href={`mailto:${profile.email}`} class={LINK}>Email me</a>
          <a href={profile.resume} target="_blank" rel="noreferrer" class={LINK}>View resume (PDF)</a>
        </div>
        <div class="mt-4 text-xs text-fg-faint">
          <a href="/profile.md" target="_blank" rel="noreferrer" class={LINK}>View as Markdown</a>
        </div>
      </header>

      <section id="current" class="mb-12 scroll-mt-8">
        <SectionHeading>Current focus</SectionHeading>
        <p class="text-pretty leading-relaxed text-fg-muted">
          {profile.currentFocus} <a href={profile.agency.href} class="underline decoration-line underline-offset-4 hover-hover:hover:decoration-fg">{profile.agency.name}</a>, {profile.agency.description}.
        </p>
        <p class="mt-3 leading-relaxed text-fg-muted">{profile.opportunities}</p>
      </section>

      <section id="career" class="mb-12 scroll-mt-8">
        <span id="about" class="block scroll-mt-8" />
        <SectionHeading>Career</SectionHeading>
        <p class="mb-5 text-pretty text-sm leading-relaxed text-fg-muted">{profile.background}</p>
        <dl class="career-timeline">
          <For each={profile.career}>{(entry) => (
            <div>
              <dt>{entry.period}</dt>
              <dd>
                {entry.href ? (
                  <a href={entry.href} class="underline decoration-line underline-offset-4">{entry.role} · {entry.organization}</a>
                ) : (
                  <>{entry.role} · {entry.organization}</>
                )}
                {entry.detail && <span>{entry.detail}</span>}
              </dd>
            </div>
          )}</For>
        </dl>
      </section>

      <section id="projects" class="mb-12 scroll-mt-8">
        <span id="contributions" class="block scroll-mt-8" />
        <SectionHeading>Selected work</SectionHeading>
        <FeaturedWork projects={projects} />
        <a href="/projects/lenders-cooperative#peak-from-figma-to-the-product" class={`${LINK} mt-5 text-sm`}>Peak: shared tokens, Figma, and component code →</a>
      </section>

      <section id="how-i-work" class="mb-12 scroll-mt-8">
        <span id="approach" class="block scroll-mt-8" />
        <SectionHeading>How I work</SectionHeading>
        <div class="space-y-6">
          <For each={profile.principles}>{(principle) => (
            <div>
              <h3 class="font-medium">{principle.title}</h3>
              <p class="mt-2 text-sm leading-relaxed text-fg-muted">{principle.description}</p>
              <div class="flex flex-wrap gap-x-5 text-sm"><For each={principle.examples}>{(example) => <a href={example.href} class={LINK}>{example.label} →</a>}</For></div>
            </div>
          )}</For>
        </div>
      </section>

      <section id="writing" class="mb-12 scroll-mt-8">
        <SectionHeading aside={<a href="/writing" class="inline-flex min-h-11 items-center hover-hover:hover:text-fg">all writing →</a>}>Selected writing</SectionHeading>
        <WritingList posts={selectedWriting} />
      </section>

      <section id="contact" class="scroll-mt-8">
        <SectionHeading>Contact</SectionHeading>
        <p class="text-pretty leading-relaxed text-fg-muted">Have a product or role you’d like to discuss? Tell me about the people using it and the work you want to improve.</p>
        <p class="mt-3 text-sm text-fg-muted">{profile.location}</p>
        <a href={`mailto:${profile.email}`} class={`${LINK} mt-3 break-all`}>{profile.email}</a>
        <div class="flex flex-wrap gap-x-5 text-sm"><For each={profile.links.filter((link) => link.label !== "Email")}>{(link) => <a href={link.href} class={LINK}>{link.label} ↗</a>}</For></div>
      </section>
    </PageShell>
  );
}
