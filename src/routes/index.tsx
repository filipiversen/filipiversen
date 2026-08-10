import { Title, Meta } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";
import PageShell from "~/components/PageShell";
import SectionHeading from "~/components/SectionHeading";
import ProjectList from "~/components/ProjectList";
import WritingList from "~/components/WritingList";
import { profile } from "~/content/profile";
import { projects } from "~/content/projects";
import { posts } from "~/content/writing";

const MagneticLinks = clientOnly(
  () => import("~/components/islands/MagneticLink"),
);

const MAGNETIC_LINK =
  "inline-block underline decoration-line underline-offset-[0.25em] transition-[text-decoration-color] hover-hover:hover:text-fg hover-hover:hover:decoration-fg";

export default function Home() {
  const recent = posts.slice(0, 5);

  return (
    <PageShell>
      <Title>{profile.name} — {profile.role}</Title>
      <Meta name="description" content={profile.intro} />

      <section class="mb-16 md:mb-20">
        <h1 class="mb-3 text-2xl font-semibold tracking-tight text-balance md:text-[1.75rem]">
          <span data-hero-step="1" class="block">{profile.name}</span>
          <span data-hero-step="2" class="mt-2 block text-lg text-fg-muted md:text-xl">
            {profile.role}
          </span>
        </h1>
        <p
          data-hero-step="3"
          class="mb-4 max-w-[34rem] text-pretty text-base leading-relaxed text-fg-muted md:text-[1.0625rem]"
        >
          I design and build web interfaces with a soft spot for getting
          things shipped. Most of my time goes to design and engineering
          at{" "}
          <a
            href={profile.companies[0].href}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            class={MAGNETIC_LINK}
          >
            {profile.companies[0].name}
          </a>
          , where we{"\u2019"}re building the future of commercial lending
          in the US. I also co-founded an AI-first feedback product called{" "}
          <a
            href={profile.companies[1].href}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            class={MAGNETIC_LINK}
          >
            {profile.companies[1].name}
          </a>
        </p>
        <p
          data-hero-step="4"
          class="max-w-[34rem] text-pretty text-base leading-relaxed text-fg-muted md:text-[1.0625rem]"
        >
          You can reach me at{" "}
          <a
            href={`mailto:${profile.email}`}
            data-magnetic
            class={MAGNETIC_LINK}
          >
            email
          </a>{" "}
          or see some of my public work on{" "}
          <a
            href="https://github.com/filipiversen"
            target="_blank"
            rel="noreferrer"
            data-magnetic
            class={MAGNETIC_LINK}
          >
            GitHub
          </a>
          .
        </p>
        <MagneticLinks />
      </section>

      <section
        id="projects"
        data-hero-step="5"
        class="mb-16 scroll-mt-12 md:mb-20"
      >
        <SectionHeading aside={`${projects.length} total`}>
          Projects
        </SectionHeading>
        <ProjectList projects={projects} />
      </section>

      <section data-hero-step="6" class="mb-16 md:mb-20">
        <SectionHeading
          aside={
            <a
              href="/writing"
              class="transition-colors hover-hover:hover:text-fg"
            >
              all →
            </a>
          }
        >
          Writing
        </SectionHeading>
        <WritingList posts={recent} stagger />
      </section>

      <section data-hero-step="7">
        <SectionHeading>Want to work with me?</SectionHeading>
        <p class="mb-4 max-w-[34rem] text-pretty text-base leading-relaxed text-fg-muted md:text-[1.0625rem]">
          Alongside my own work, I run two offerings:
        </p>
        <ul class="max-w-[34rem] space-y-3 text-base leading-relaxed text-fg-muted md:text-[1.0625rem]">
          {profile.offerings.map((offering) => (
            <li class="text-pretty">
              <a
                href={offering.href}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                class={MAGNETIC_LINK}
              >
                {offering.name}
              </a>{" "}
              offers {offering.description}.
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
