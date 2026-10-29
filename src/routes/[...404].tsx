import { HttpStatusCode } from "@solidjs/start";
import { Meta, Title } from "@solidjs/meta";
import PageShell from "~/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <HttpStatusCode code={404} />
      <Title>Page not found — Filip Iversen</Title>
      <Meta name="robots" content="noindex" />
      <h1 class="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p class="mt-4 leading-relaxed text-fg-muted">That address doesn’t match a page on this site.</p>
      <a href="/#projects" class="mt-4 inline-flex min-h-11 items-center underline decoration-line underline-offset-4">Explore selected work →</a>
    </PageShell>
  );
}
