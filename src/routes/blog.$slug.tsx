import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/data/blog";
import { FiveCloudCosts } from "@/content/blog/five-cloud-costs";
import { BeyondAdvisorGreen } from "@/content/blog/beyond-advisor-green";

const SITE_URL = "https://tobiolabode.tech";

const contentMap: Record<string, React.ComponentType> = {
  "five-cloud-costs-that-hide-in-plain-sight": FiveCloudCosts,
  "beyond-advisor-green": BeyondAdvisorGreen,
};

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) return {};
    const articleSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.dateISO,
      author: {
        "@type": "Person",
        name: "Tobi John Olabode",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Person",
        name: "Tobi John Olabode",
        url: SITE_URL,
      },
      url: `${SITE_URL}/blog/${post.slug}/`,
      keywords: post.keywords.join(", "),
    });
    return {
      meta: [
        { title: `${post.title} — Tobi John Olabode` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/blog/${post.slug}/` },
        { property: "article:published_time", content: post.dateISO },
        { property: "article:author", content: "Tobi John Olabode" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${post.slug}/` }],
      scripts: [{ type: "application/ld+json", children: articleSchema }],
    };
  },
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: BlogPost,
  notFoundComponent: () => (
    <main id="main" className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="font-serif text-3xl text-ink">Post not found.</p>
      <Link to="/blog" className="mt-6 inline-block text-sm text-accent underline">
        ← All posts
      </Link>
    </main>
  ),
});

function BlogPost() {
  const post = Route.useLoaderData();
  const Content = contentMap[post.slug];

  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <nav className="mb-10">
        <Link to="/blog" className="text-xs font-medium uppercase tracking-widest text-muted hover:text-accent transition-colors">
          ← Writing
        </Link>
      </nav>

      <header className="mb-12 border-b border-line pb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">{post.date} · {post.readTime}</p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">{post.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.keywords.map((kw) => (
            <span key={kw} className="px-2 py-0.5 text-xs font-medium text-muted border border-line">
              {kw}
            </span>
          ))}
        </div>
      </header>

      <article className="blog-prose">
        {Content ? <Content /> : <p className="text-muted">Content not found.</p>}
      </article>

      <footer className="mt-16 border-t border-line pt-10">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">Written by</p>
        <p className="mt-2 font-serif text-xl text-ink">Tobi John Olabode</p>
        <p className="mt-1 text-sm text-muted">Senior FinOps Practitioner · Wales, UK</p>
        <div className="mt-6">
          <Link to="/blog" className="text-xs font-medium uppercase tracking-widest text-muted hover:text-accent transition-colors mr-8">
            ← All posts
          </Link>
          <a href="/#contact" className="text-xs font-medium uppercase tracking-widest text-accent hover:underline">
            Get in touch
          </a>
        </div>
      </footer>
    </main>
  );
}
