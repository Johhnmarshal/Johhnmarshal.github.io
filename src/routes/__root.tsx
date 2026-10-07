import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

const SITE_URL = "https://tobiolabode.tech";
const APP_NAME = "Tobi John Olabode";
const DESCRIPTION =
  "Senior FinOps practitioner across Azure, AWS and GCP. I design the frameworks, dashboards and habits that turn a cloud bill into a decision — including the token economics of generative AI. Wales, United Kingdom.";

const STRUCTURED_DATA = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tobi John Olabode",
    jobTitle: "Senior FinOps Analyst",
    url: SITE_URL,
    sameAs: [
      "https://www.linkedin.com/in/tobiolabode",
      "https://github.com/Johhnmarshal",
      "https://medium.com/@tobiolabode",
      "https://www.youtube.com/@TheFinOpsArchitect",
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Cardiff University" },
      { "@type": "CollegeOrUniversity", name: "Ladoke Akintola University of Technology" },
    ],
    knowsAbout: [
      "FinOps",
      "Cloud Cost Optimisation",
      "Azure",
      "AWS",
      "GCP",
      "Power BI",
      "Terraform",
      "AI tokenomics",
      "FOCUS spec",
    ],
    address: { "@type": "PostalAddress", addressCountry: "GB", addressRegion: "Wales" },
    description: DESCRIPTION,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Tobi John Olabode specialise in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tobi specialises in cloud financial operations (FinOps) across Azure, AWS and GCP — helping organisations eliminate wasted cloud spend, build governance frameworks, and create engineering cultures where cost is a first-class concern. Over 6 years he has delivered 33.3% reductions in cloud spend through automated tooling, right-sizing programmes, commitment strategies, and cross-functional stakeholder alignment.",
        },
      },
      {
        "@type": "Question",
        name: "What measurable cloud cost savings has Tobi delivered?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Across engagements Tobi has contributed to over £8.35M in total cloud savings at a 26%+ effective savings rate. At Taylor & Eyre he drove a 25% reduction in AWS cloud spend. At Next Retail he built the FinOps function from scratch, including the FinOps Hub, governance frameworks, and chargeback models.",
        },
      },
      {
        "@type": "Question",
        name: "Which cloud platforms and FinOps tools does Tobi work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tobi is expert-level across Azure and AWS, and proficient on GCP. Tools include Azure Cost Management, AWS Cost Explorer, Power BI, Terraform, PowerShell, Azure Policy, SCPs, and custom Python scripts. He works with FOCUS-aligned cost data and has experience with AI tokenomics and Azure OpenAI cost governance.",
        },
      },
      {
        "@type": "Question",
        name: "Is Tobi John Olabode open to new roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tobi is based in Wales, United Kingdom, and open to Senior FinOps, Lead FinOps, and FinOps Architect roles — remote or hybrid. He is available for FinOps practitioner roles, cloud cost optimisation programmes, and building FinOps functions from scratch across Azure, AWS and GCP.",
        },
      },
    ],
  },
]);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} — FinOps` },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: APP_NAME },
      { name: "theme-color", content: "#f3efe6" },
      // Open Graph
      { property: "og:type", content: "profile" },
      { property: "og:title", content: `${APP_NAME} — Senior FinOps Practitioner` },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_GB" },
      { property: "og:image", content: `${SITE_URL}/og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${APP_NAME} — Senior FinOps Practitioner` },
      // Twitter / X card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${APP_NAME} — Senior FinOps Practitioner` },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og.jpg` },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: STRUCTURED_DATA,
      },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
