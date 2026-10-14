import { For } from "solid-js";
import { Title, Meta } from "@solidjs/meta";
import PageShell from "~/components/PageShell";
import SectionHeading from "~/components/SectionHeading";
import WritingList from "~/components/WritingList";
import { postsByYear, posts } from "~/content/writing";

export default function WritingIndex() {
  const grouped = postsByYear();

  return (
    <PageShell>
      <Title>Writing — Filip Iversen</Title>
      <Meta name="description" content="Notes on design, engineering, AI, and the work of building products." />

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

      <For each={grouped}>
        {(group, gi) => (
          <section
            class="mb-12"
            data-hero-step={String(3 + gi())}
          >
            <SectionHeading>{group.year.toString()}</SectionHeading>
            <WritingList posts={group.items} stagger />
          </section>
        )}
      </For>
    </PageShell>
  );
}
