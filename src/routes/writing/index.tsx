import { For } from "solid-js";
import PageMeta from "~/components/PageMeta";
import PageShell from "~/components/PageShell";
import SectionHeading from "~/components/SectionHeading";
import WritingList from "~/components/WritingList";
import { postsByYear, posts } from "~/content/writing";

export default function WritingIndex() {
  const selected = posts.filter((post) => post.featured !== undefined).sort((a, b) => a.featured! - b.featured!);
  const grouped = postsByYear(posts.filter((post) => post.featured === undefined));

  return (
    <PageShell>
      <PageMeta title="Writing — Filip Iversen" description="Notes on design, engineering, AI, and the work of building products." path="/writing" />

      <header class="mb-12">
        <h1
          data-hero-step="1"
          class="mb-2 text-2xl font-semibold tracking-tight text-balance"
        >
          Writing
        </h1>
        <p data-hero-step="2" class="text-pretty text-fg-muted">
          {posts.length} {posts.length === 1 ? "post" : "posts"} on design,
          engineering, AI, and building products.
        </p>
      </header>

      <section class="mb-12"><SectionHeading>Start here</SectionHeading><WritingList posts={selected} showYear /></section>
      <h2 class="mb-6 text-lg font-medium">More writing</h2>
      <For each={grouped}>
        {(group, gi) => (
          <section
            class="mb-12"
            data-hero-step={String(3 + gi())}
          >
            <SectionHeading>{group.year.toString()}</SectionHeading>
            <WritingList posts={group.items} />
          </section>
        )}
      </For>
    </PageShell>
  );
}
