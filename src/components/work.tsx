import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { filters, projects, type Filter } from "@/data/portfolio";

function spanClass(filter: Filter, index: number, total: number) {
  if (filter !== "All") {
    if (total === 1) return "md:col-span-7";
    return "md:col-span-6";
  }
  if (index === 0) return "md:col-span-7";
  if (index === 1) return "md:col-span-5";
  const rest = total - 2;
  if (rest % 3 === 1 && index === total - 1) return "md:col-span-6";
  return "md:col-span-4";
}

export function Work() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <section id="work" className="scroll-mt-24" aria-labelledby="work-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">02 — Selected work</p>
            <h2 id="work-heading" className="mt-3 font-serif text-4xl text-ink md:text-5xl">
              From the FinOps Hub
            </h2>
            <p className="mt-3 max-w-lg text-muted">
              Dashboards, governance and the AWS practice before them. On a large screen, hover a card for the short version.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
          {filters.map((item) => {
            const count = item === "All" ? projects.length : projects.filter((project) => project.category === item).length;
            const pressed = filter === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(item)}
                className={`inline-flex min-h-11 items-center gap-2 border px-3 text-sm transition-colors duration-150 ${
                  pressed ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"
                }`}
              >
                {item}
                <span className={pressed ? "text-paper/70" : "text-muted"}>{count}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
          {visible.map((project, index) => (
            <li key={project.id} className={spanClass(filter, index, visible.length)}>
              <article
                className={`project relative flex h-full flex-col overflow-hidden ${
                  filter === "All" && index === 0 ? "min-h-80" : "min-h-72"
                }`}
              >
                {project.thumbnail ? (
                  <div
                    className="border-b border-line"
                    dangerouslySetInnerHTML={{ __html: project.thumbnail }}
                  />
                ) : null}
                <div className="flex flex-1 flex-col justify-between gap-8 p-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-sm italic text-accent">{project.index}</span>
                      <span className="text-xs font-medium uppercase tracking-widest text-muted">
                        {project.category}
                      </span>
                    </div>
                    <h3
                      className={`mt-4 font-serif text-ink ${
                        filter === "All" && index === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{project.context}</p>
                  </div>
                  <p className="text-sm font-medium text-ink">{project.outcome}</p>
                </div>
                <div className="reveal">
                  <p className="text-sm leading-normal">{project.summary}</p>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium underline decoration-1 underline-offset-4"
                    >
                      {project.hrefLabel}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
