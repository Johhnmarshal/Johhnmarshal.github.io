export const EMAIL = "tobijohnolabode@gmail.com";

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tobiolabode" },
  { label: "GitHub", href: "https://github.com/Johhnmarshal" },
  { label: "Medium", href: "https://medium.com/@tobiolabode" },
  { label: "YouTube", href: "https://www.youtube.com/@TheFinOpsArchitect" },
] as const;

export const filters = [
  "All",
  "Dashboards",
  "AI",
  "Governance",
  "Automation",
  "Open source",
  "Community",
  "Writing",
] as const;

export type Filter = (typeof filters)[number];

export type Category = Exclude<Filter, "All">;

export type Project = {
  id: string;
  index: string;
  title: string;
  category: Category;
  context: string;
  outcome: string;
  summary: string;
  href?: string;
  hrefLabel?: string;
};

export const projects: Project[] = [
  {
    id: "executive-dashboard",
    index: "01",
    title: "Multi-cloud executive dashboard",
    category: "Dashboards",
    context: "Next · Azure & GCP",
    outcome: "£16.7m tracked · 26.17% ESR",
    summary:
      "One view of executive cloud spend across subscriptions, services and commitment discounts. Effective cost set against realised savings, down to resource group.",
  },
  {
    id: "ai-cost",
    index: "02",
    title: "Azure AI cost tracker",
    category: "AI",
    context: "Next · Azure OpenAI",
    outcome: "3.6bn tokens a month",
    summary:
      "Daily cost for Azure AI and ML services, with tokens and calls beside the bill. Department, environment and month filters so owners can see model economics as usage scales.",
  },
  {
    id: "gcp-cud",
    index: "03",
    title: "GCP cost and discount ratios",
    category: "Dashboards",
    context: "Next · GCP",
    outcome: "£1.45m year to date",
    summary:
      "Year-to-date GCP spend across billing accounts, with cost-to-discount ratios by project, environment and service. Built to show which committed use is actually earning its keep.",
  },
  {
    id: "anomaly",
    index: "04",
    title: "Daily anomaly watch",
    category: "Dashboards",
    context: "Next · FinOps Hub",
    outcome: "30-day rolling baseline",
    summary:
      "Yesterday’s spend against a 30-day baseline, stacked by department. Drill from product to subscription, environment and resource group before a spike becomes a month-end story.",
  },
  {
    id: "governance",
    index: "05",
    title: "Tags, policy and showback",
    category: "Governance",
    context: "Next & Taylor & Eyre",
    outcome: "95% allocation accuracy",
    summary:
      "At Taylor & Eyre, tagging policies and service control policies lifted allocation accuracy to 95%. At Next, product tags and showback give shared platforms an owner instead of a communal bill.",
  },
  {
    id: "automation",
    index: "06",
    title: "A quarter less waste",
    category: "Automation",
    context: "Taylor & Eyre · AWS",
    outcome: "25% less waste · 80% less manual reporting",
    summary:
      "Right-sizing, idle cleanup and savings plans, plus shutdown scripts that took about 30% out of non-production. A Python system on AWS APIs retired most of the hand-built reporting pack.",
  },
  {
    id: "shadow",
    index: "07",
    title: "Shadow Cost detector",
    category: "Open source",
    context: "Open source · Azure",
    outcome: "Beyond advisor-green",
    summary:
      "Tooling for the spend native advisors leave looking healthy: orphaned resources and quiet waste inside a complex Azure estate. Written to plug into a FinOps workflow, not replace it.",
    href: "https://github.com/Johhnmarshal",
    hrefLabel: "View on GitHub",
  },
  {
    id: "data-cloud",
    index: "08",
    title: "FinOps for data cloud platforms",
    category: "Community",
    context: "FinOps Foundation · June 2026",
    outcome: "Working group contributor",
    summary:
      "Named contributor to the FinOps Foundation paper on practical scenarios for data-cloud cost: idle spend, tagging, query-level attribution, anomaly response, and chargeback. Written for Snowflake, and built to carry to Databricks, Fabric, BigQuery, and Redshift.",
    href: "https://www.finops.org/wg/finops-for-data-cloud-platforms-practical-scenarios/",
    hrefLabel: "Read on FinOps.org",
  },
  {
    id: "essay",
    index: "09",
    title: "The cloud bill is a dataset",
    category: "Writing",
    context: "Medium · 2026",
    outcome: "FOCUS, AI, unit cost",
    summary:
      "Why multi-cloud cost is a data problem — normalisation, the FOCUS spec, and the unit economics of generative AI — from someone who learned ledgers before billing exports.",
    href: "https://medium.com/@tobiolabode/why-your-cloud-bill-is-a-big-data-problem-a-data-scientists-take-on-finops-in-2026-31550f3d8fe0",
    hrefLabel: "Read on Medium",
  },
];

export const skillGroups = [
  {
    index: "01",
    title: "FinOps",
    items: [
      "Framework design",
      "Forecasting and budgets",
      "Showback and chargeback",
      "Right-sizing",
      "Waste elimination",
      "Maturity assessments",
      "FOCUS-aligned cost data",
    ],
  },
  {
    index: "02",
    title: "Platforms",
    items: [
      "Azure — expert",
      "AWS — expert",
      "GCP — proficient",
      "Savings plans, RIs, CUDs",
      "SCPs and policy",
      "Apptio and CloudHealth",
    ],
  },
  {
    index: "03",
    title: "Automation",
    items: [
      "Python",
      "Terraform and IaC",
      "PowerShell",
      "Bash and Linux",
      "Power BI and SQL",
      "Anomaly detection",
    ],
  },
  {
    index: "04",
    title: "AI cost",
    items: [
      "Token economics",
      "Model tiering",
      "LLM showback",
      "Azure OpenAI cost",
      "Unit cost of AI",
      "GreenOps for AI",
    ],
  },
] as const;

export const credentials = [
  "FinOps Certified Practitioner — FinOps Foundation",
  "AWS Cloud Practitioner — AWS Cloud Quest",
  "AWS Machine Learning Foundations & Introduction to Generative AI — AWS",
  "Introduction to FinOps — FinOps Foundation",
  "Generative AI with AWS — Udacity",
] as const;

export const roles = [
  {
    dates: "Oct 2025 — Present",
    org: "Next Retail Limited",
    title: "Senior FinOps Analyst",
    note: "Azure & GCP. FinOps Hub, tagging, showback, and the practice built from a blank page.",
  },
  {
    dates: "Nov 2022 — Apr 2025",
    org: "Taylor & Eyre Limited",
    title: "FinOps Engineer",
    note: "AWS. Waste, savings plans, tagging, SCPs, and the reporting that replaced the manual pack.",
  },
  {
    dates: "Feb 2019 — Sep 2022",
    org: "FBNQuest Merchant Bank",
    title: "Senior Transaction Analyst",
    note: "Regulated financial operations at investment-bank standard: equity trades, reconciliation, and compliance. Where every figure has to survive audit.",
  },
] as const;
