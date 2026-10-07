import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

const SITE_URL = "https://tobiolabode.tech";
const APP_NAME = "Tobi John Olabode";
const DESCRIPTION =
  "Tobi John Olabode — Senior FinOps practitioner based in Wales, UK. Multi-cloud cost governance across Azure, AWS and GCP: frameworks, dashboards, and the token economics of generative AI. FinOps Certified Practitioner.";

const STRUCTURED_DATA = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tobi John Olabode",
    givenName: "Tobi",
    additionalName: "John",
    familyName: "Olabode",
    jobTitle: "Senior FinOps Analyst",
    url: SITE_URL,
    image: `${SITE_URL}/avatar.jpg`,
    // disambiguates from other people named Tobi Olabode
    disambiguatingDescription:
      "FinOps practitioner based in Wales, UK. Not to be confused with Tobi Olabode the machine-learning engineer (London) or other people sharing the Olabode surname. Full legal name: Tobi John Olabode.",
    description: DESCRIPTION,
    sameAs: [
      "https://www.linkedin.com/in/tobiolabode",
      "https://github.com/Johhnmarshal",
      "https://medium.com/@tobiolabode",
      "https://www.youtube.com/@TheFinOpsArchitect",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "FinOps Certified Practitioner",
        credentialCategory: "Professional Certification",
        recognizedBy: { "@type": "Organization", name: "FinOps Foundation", url: "https://www.finops.org" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Cloud Practitioner",
        credentialCategory: "Professional Certification",
        recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
      },
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "FinOps Foundation",
        url: "https://www.finops.org",
      },
      {
        "@type": "Organization",
        name: "Operational Research Society",
        url: "https://www.theorsociety.com",
      },
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Cardiff University",
        url: "https://www.cardiff.ac.uk",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Ladoke Akintola University of Technology",
      },
    ],
    knowsAbout: [
      "FinOps",
      "Cloud Financial Management",
      "Cloud Cost Optimisation",
      "Azure Cost Management",
      "AWS Cost Explorer",
      "GCP Billing",
      "Power BI",
      "Terraform",
      "AI tokenomics",
      "FOCUS spec",
      "Showback and chargeback",
      "Committed use discounts",
      "Savings plans",
      "Right-sizing",
      "FinOps maturity assessment",
      "Generative AI cost governance",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
      addressRegion: "Wales",
    },
    nationality: { "@type": "Country", name: "United Kingdom" },
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
      { title: `Tobi John Olabode — Senior FinOps · Wales, UK` },
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
      { rel: "icon", type: "image/jpeg", href: "/avatar.jpg" },
      { rel: "icon", type: "image/jpeg", sizes: "512x512", href: "/avatar.jpg" },
      { rel: "apple-touch-icon", sizes: "512x512", href: "/avatar.jpg" },
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
