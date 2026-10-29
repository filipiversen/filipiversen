import { For, Show } from "solid-js";
import type { Project } from "~/content/projects";

export default function FeaturedWork(props: { projects: Project[] }) {
  return (
    <div class="featured-work">
      <For each={props.projects}>
        {(project) => (
          <article class="featured-project">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="font-medium" style={`view-transition-name: project-title-${project.slug}`}>
                <a href={project.href} class="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover-hover:hover:decoration-fg">{project.title} →</a>
              </h3>
              <p class="font-mono text-xs text-fg-faint">{project.period ?? project.year} · {project.status}</p>
            </div>
            <p class="mt-1 text-pretty text-sm leading-relaxed text-fg-muted">{project.focus}</p>
            <div class="project-summary mt-4">
              <dl class="case-facts">
                <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>
                <div><dt>Released</dt><dd>{project.outcome}</dd></div>
              </dl>
              <Show when={project.slug === "lenders-cooperative" || project.slug === "survey-loop"}>
                <a href={project.href} aria-label={`Explore ${project.title}`} class="project-preview-link">
                  {project.slug === "lenders-cooperative" ? (
                    <div class="workflow-preview">
                      <span class="preview-label">Workflow diagram</span>
                      <div class="preview-application">
                        <span>One application</span>
                        <span class="text-fg-muted">Progress · tasks · blockers</span>
                      </div>
                      <div class="preview-tasks">
                        <span>Finish a task</span><span aria-hidden="true">↓</span><span>Next task</span>
                      </div>
                      <span class="text-sm text-fg-muted">Or move to the information you need.</span>
                    </div>
                  ) : (
                    <div class="product-preview">
                      <img src="/work/survey-loop/walkthrough-poster.png" width="1440" height="900" loading="lazy" alt="Survey Loop's block library, survey canvas, and contextual settings, with sample data." />
                      <span class="preview-label">Product interface · sample data</span>
                    </div>
                  )}
                </a>
              </Show>
            </div>
          </article>
        )}
      </For>
    </div>
  );
}
