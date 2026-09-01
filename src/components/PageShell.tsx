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
  "relative -my-2 py-2 transition-colors duration-150 ease hover-hover:hover:text-fg";

const CHROME = "mx-auto w-full max-w-prose px-6 md:px-8";

export default function PageShell(props: Props) {
  const mainWidth = () =>
    props.wide
      ? "mx-auto w-full max-w-case px-6 md:px-8"
      : "mx-auto w-full max-w-prose px-6 md:px-8";

  return (
    <div class="flex min-h-screen w-full flex-col py-8 md:py-12">
      {/* Top anchor for the footer "↑ top" link */}
      <span id="top" class="sr-only" />

      <header
        class={`mb-12 flex items-center justify-between text-sm md:mb-16 ${CHROME}`}
      >
        <a
          href="/"
          aria-label="Home — Filip Iversen"
          class="relative -m-2 p-2 font-mono tracking-tight text-fg-muted transition-colors hover-hover:hover:text-fg"
        >
          fi.
        </a>
        <nav class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
          <a href="/" class={NAV_LINK}>
            index
          </a>
          <a href="/writing" class={NAV_LINK}>
            writing
          </a>
          <ThemeToggle />
        </nav>
      </header>

      <main class={`flex-1 ${mainWidth()}`}>{props.children}</main>
      <ProseLightbox />

      <footer
        class={`mt-24 border-t border-line pt-6 font-mono text-xs text-fg-faint md:mt-32 ${CHROME}`}
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} {profile.name.toLowerCase()}
          </span>
          <div class="flex items-center gap-4">
            {profile.links.map((link) => (
              <a
                href={link.href}
                class="-my-2 py-2 transition-colors duration-150 ease hover-hover:hover:text-fg"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label.toLowerCase()}
              </a>
            ))}
            <a
              href="#top"
              class="-my-2 py-2 transition-colors duration-150 ease hover-hover:hover:text-fg"
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
