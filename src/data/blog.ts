export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  description: string;
  keywords: string[];
  readTime: string;
};

export const posts: PostMeta[] = [
  {
    slug: "beyond-advisor-green",
    title: "Beyond Advisor-Green: Building an Open-Source Shadow Cost Detector for Multi-Cloud",
    date: "23 June 2026",
    dateISO: "2026-06-23",
    description:
      "Native cloud advisors are good at what they're designed for. They're not designed to surface the 10–30% of recoverable spend hiding behind all-green dashboards. Here's how I built Shadow Cost.",
    keywords: ["FinOps", "Cloud Cost Optimisation", "AWS", "Azure", "GCP", "Open Source", "Shadow Cost"],
    readTime: "12 min read",
  },
  {
    slug: "five-cloud-costs-that-hide-in-plain-sight",
    title: "Five Cloud Costs That Hide in Plain Sight",
    date: "23 May 2026",
    dateISO: "2026-05-23",
    description:
      "The biggest cloud savings rarely come from the line items everyone watches. They come from the ones nobody thought to look for.",
    keywords: ["FinOps", "Cloud Cost Optimisation", "AWS", "Azure", "GCP", "Cost Waste"],
    readTime: "7 min read",
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}
