import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Writing — Tobi John Olabode" },
      {
        name: "description",
        content:
          "Articles on cloud FinOps, multi-cloud cost governance, and the economics of generative AI — by Tobi John Olabode.",
      },
    ],
    links: [{ rel: "canonical", href: "https://tobiolabode.tech/blog/" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <header className="mb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">Writing</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Field notes from the cloud cost floor</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Practical FinOps — what I've learned building cost governance programmes across Azure, AWS and GCP.
        </p>
      </header>

      <ol className="space-y-0">
        {posts.map((post) => (
          <li key={post.slug} className="border-t border-line">
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group grid gap-2 py-8 md:grid-cols-12 md:gap-6"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-muted md:col-span-3 md:pt-1">
                {post.date}
              </p>
              <div className="md:col-span-9">
                <h2 className="font-serif text-xl leading-snug text-ink group-hover:text-accent transition-colors duration-150 sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-widest text-muted">{post.readTime}</p>
              </div>
            </Link>
          </li>
        ))}
        <li className="border-t border-line" />
      </ol>
    </main>
  );
}
