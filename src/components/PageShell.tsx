import type { JSX } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { profile } from "~/content/profile";

const ThemeToggle = clientOnly(() => import("./islands/ThemeToggle"));
const ProseLightbox = clientOnly(() => import("./islands/ProseLightbox"));

type Props = {
  children: JSX.Element;
  /** Expand `<main>` to the 1600px case-study canvas. Chrome stays on the prose column. */
  wide?: boolean;
};

const NAV_LINK =
  "inline-flex min-h-11 items-center px-2 transition-colors duration-150 ease hover-hover:hover:text-fg";

const CHROME = "mx-auto w-full max-w-[42rem] px-6 md:px-8";

export default function PageShell(props: Props) {
  const mainWidth = () =>
    props.wide
      ? "mx-auto w-full max-w-case px-6 md:px-8"
      : "mx-auto w-full max-w-[42rem] px-6 md:px-8";

  return (
    <div class="flex min-h-screen w-full flex-col py-6 md:py-10">
      <a class="skip-link" href="#main">Skip to content</a>
      {/* Top anchor for the footer "↑ top" link */}
      <span id="top" class="sr-only" />

      <header
        class={`mb-10 flex items-center justify-between gap-2 text-sm md:mb-12 ${CHROME}`}
      >
        <a
          href="/"
          aria-label="Home — Filip Iversen"
          class="inline-flex min-h-11 min-w-11 items-center font-mono tracking-tight text-fg-muted transition-colors hover-hover:hover:text-fg"
        >
          fi.
        </a>
        <nav aria-label="Main" class="flex items-center font-mono text-xs uppercase tracking-[0.06em] text-fg-muted">
          <a href="/#projects" class={NAV_LINK}>Work</a>
          <a href="/#career" class={NAV_LINK}>Career</a>
          <a href="/writing" class={NAV_LINK}>
            writing
          </a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="main" tabIndex={-1} class={`flex-1 ${mainWidth()}`}>{props.children}</main>
      <ProseLightbox />

      <footer
        class={`mt-16 border-t border-line pt-6 font-mono text-xs text-fg-faint md:mt-20 ${CHROME}`}
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} {profile.name.toLowerCase()}
          </span>
          <div class="flex flex-wrap items-center gap-1">
            <a href={profile.resume} target="_blank" rel="noreferrer" class="inline-flex min-h-11 items-center px-1 hover-hover:hover:text-fg">resume</a>
            {profile.links.map((link) => (
              <a
                href={link.href}
                class="inline-flex min-h-11 min-w-11 items-center justify-center px-1 transition-colors duration-150 ease hover-hover:hover:text-fg"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label.toLowerCase()}
              </a>
            ))}
            <a
              href="#top"
              class="inline-flex min-h-11 min-w-11 items-center justify-center px-1 transition-colors duration-150 ease hover-hover:hover:text-fg"
              aria-label="Scroll to top"
            >
              ↑ top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
