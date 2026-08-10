import type { JSX } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { profile } from "~/content/profile";

const ThemeToggle = clientOnly(() => import("./islands/ThemeToggle"));
const ProseLightbox = clientOnly(() => import("./islands/ProseLightbox"));

type Props = {
  children: JSX.Element;
};

const NAV_LINK =
  "relative -my-2 py-2 transition-colors duration-150 ease hover-hover:hover:text-fg";

export default function PageShell(props: Props) {
  return (
    <div class="mx-auto flex min-h-screen w-full max-w-prose flex-col px-6 py-8 md:px-8 md:py-12">
      {/* Top anchor for the footer "↑ top" link */}
      <span id="top" class="sr-only" />

      <header class="mb-12 flex items-center justify-between text-sm md:mb-16">
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

      <main class="flex-1">{props.children}</main>
      <ProseLightbox />

      <footer class="mt-24 border-t border-line pt-6 font-mono text-xs text-fg-faint md:mt-32">
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
