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
  /** Optional SVG string rendered as a visual preview at the top of the card */
  thumbnail?: string;
};

export const projects: Project[] = [
  {
    id: "executive-dashboard",
    index: "01",
    title: "Multi-cloud executive dashboard",
    category: "Dashboards",
    context: "Next · Azure & GCP",
    outcome: "£16.7m tracked · 33.3% ESR",
    summary:
      "One view of executive cloud spend across subscriptions, services and commitment discounts. Effective cost set against realised savings — £8.35m recovered at 33.3% effective savings rate — down to resource group. Built in Power BI against Azure Cost Management and GCP Billing exports.",
    thumbnail: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="480" height="220" fill="#f3efe6"/>
      <text x="20" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">EFFECTIVE COST</text>
      <text x="20" y="50" fill="#1c1915" font-size="22" font-weight="700" font-family="serif">£16.72M</text>
      <text x="170" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">TOTAL SAVINGS</text>
      <text x="170" y="50" fill="#9a341f" font-size="22" font-weight="700" font-family="serif">£8.35M</text>
      <text x="340" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">ESR</text>
      <text x="340" y="50" fill="#9a341f" font-size="22" font-weight="700" font-family="serif">33.3%</text>
      <line x1="20" y1="68" x2="460" y2="68" stroke="#1c191520" stroke-width="1"/>
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#9a341f" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#9a341f" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="M20,190 L72,175 L124,168 L176,152 L228,138 L280,122 L332,104 L384,88 L436,72 L460,62 L460,210 L20,210 Z" fill="url(#g1)"/>
      <path d="M20,190 L72,175 L124,168 L176,152 L228,138 L280,122 L332,104 L384,88 L436,72 L460,62" stroke="#9a341f" stroke-width="2" fill="none"/>
      <path d="M20,200 L72,196 L124,193 L176,186 L228,178 L280,168 L332,156 L384,144 L436,132 L460,124" stroke="#1c1915" stroke-width="1.5" fill="none" opacity="0.4" stroke-dasharray="4 3"/>
      <text x="20" y="208" fill="#6b6560" font-size="8" font-family="sans-serif">Jan</text>
      <text x="120" y="208" fill="#6b6560" font-size="8" font-family="sans-serif">Mar</text>
      <text x="220" y="208" fill="#6b6560" font-size="8" font-family="sans-serif">May</text>
      <text x="320" y="208" fill="#6b6560" font-size="8" font-family="sans-serif">Jul</text>
      <text x="420" y="208" fill="#6b6560" font-size="8" font-family="sans-serif">Sep</text>
    </svg>`,
  },
  {
    id: "ai-cost",
    index: "02",
    title: "Azure AI cost tracker",
    category: "AI",
    context: "Next · Azure OpenAI",
    outcome: "3.6bn tokens a month",
    summary:
      "Daily cost for Azure AI and ML services, with tokens and calls beside the bill. Department, environment and month filters so owners can see model economics as usage scales. Critical as generative AI workloads move from experiments to production spend.",
    thumbnail: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="480" height="220" fill="#f3efe6"/>
      <text x="20" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">AZURE AI COST · LAST 30 DAYS</text>
      <text x="20" y="52" fill="#1c1915" font-size="20" font-weight="700" font-family="serif">£3,458.92</text>
      <text x="200" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">TOKENS CONSUMED</text>
      <text x="200" y="52" fill="#9a341f" font-size="20" font-weight="700" font-family="serif">3.6B</text>
      <line x1="20" y1="64" x2="460" y2="64" stroke="#1c191520" stroke-width="1"/>
      <g transform="translate(20,80)">
        <rect x="0"   y="82" width="24" height="48" fill="#9a341f" opacity="0.7"/>
        <rect x="30"  y="62" width="24" height="68" fill="#9a341f" opacity="0.7"/>
        <rect x="60"  y="30" width="24" height="100" fill="#9a341f" opacity="0.9"/>
        <rect x="90"  y="15" width="24" height="115" fill="#9a341f"/>
        <rect x="120" y="40" width="24" height="90" fill="#9a341f" opacity="0.8"/>
        <rect x="150" y="45" width="24" height="85" fill="#9a341f" opacity="0.7"/>
        <rect x="180" y="50" width="24" height="80" fill="#9a341f" opacity="0.7"/>
        <rect x="210" y="58" width="24" height="72" fill="#9a341f" opacity="0.6"/>
        <rect x="240" y="28" width="24" height="102" fill="#9a341f" opacity="0.8"/>
        <rect x="270" y="68" width="24" height="62" fill="#9a341f" opacity="0.6"/>
        <rect x="300" y="105" width="24" height="25" fill="#9a341f" opacity="0.4"/>
        <rect x="330" y="100" width="24" height="30" fill="#9a341f" opacity="0.4"/>
        <rect x="360" y="96" width="24" height="34" fill="#9a341f" opacity="0.5"/>
        <rect x="390" y="102" width="24" height="28" fill="#9a341f" opacity="0.4"/>
        <line x1="0" y1="130" x2="430" y2="130" stroke="#1c191518" stroke-width="1"/>
      </g>
      <text x="20" y="212" fill="#6b6560" font-size="8" font-family="sans-serif">Marketing · Technology · Finance · Other departments</text>
    </svg>`,
  },
  {
    id: "gcp-cud",
    index: "03",
    title: "GCP cost and discount ratios",
    category: "Dashboards",
    context: "Next · GCP",
    outcome: "£1.45m year to date",
    summary:
      "Year-to-date GCP spend across billing accounts, with cost-to-discount ratios by project, environment and service. Built to show which committed use discounts are actually earning their keep — filterable by department, environment and service description.",
    thumbnail: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="480" height="220" fill="#f3efe6"/>
      <text x="20" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">TOTAL COST GCP COMBINED</text>
      <text x="20" y="52" fill="#1c1915" font-size="20" font-weight="700" font-family="serif">£1.45M</text>
      <text x="220" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">DISCOUNT RECEIVED</text>
      <text x="220" y="52" fill="#9a341f" font-size="20" font-weight="700" font-family="serif">£838.55K</text>
      <line x1="20" y1="64" x2="460" y2="64" stroke="#1c191520" stroke-width="1"/>
      <g transform="translate(20,76)">
        <rect x="0"   y="0"  width="36" height="120" fill="#9a341f"/>
        <rect x="44"  y="80" width="36" height="40"  fill="#1c1915" opacity="0.4"/>
        <rect x="88"  y="75" width="36" height="45"  fill="#1c1915" opacity="0.4"/>
        <rect x="132" y="60" width="36" height="60"  fill="#1c1915" opacity="0.5"/>
        <rect x="176" y="65" width="36" height="55"  fill="#1c1915" opacity="0.4"/>
        <rect x="220" y="55" width="36" height="65"  fill="#1c1915" opacity="0.5"/>
        <rect x="264" y="60" width="36" height="60"  fill="#1c1915" opacity="0.4"/>
        <rect x="308" y="78" width="36" height="42"  fill="#1c1915" opacity="0.35"/>
        <rect x="352" y="82" width="36" height="38"  fill="#1c1915" opacity="0.35"/>
        <path d="M18,5 L62,82 L106,78 L150,62 L194,68 L238,58 L282,62 L326,80 L370,84" stroke="#9a341f" stroke-width="2" fill="none" opacity="0.8"/>
        <circle cx="18" cy="5" r="3" fill="#9a341f"/>
        <line x1="0" y1="122" x2="430" y2="122" stroke="#1c191518" stroke-width="1"/>
      </g>
      <text x="20" y="212" fill="#6b6560" font-size="8" font-family="sans-serif">Jan · Feb · Mar · Apr · May · Jun · Jul · Aug · Sep · Jan peak £508.76K</text>
    </svg>`,
  },
  {
    id: "anomaly",
    index: "04",
    title: "Daily anomaly watch",
    category: "Dashboards",
    context: "Next · FinOps Hub",
    outcome: "30-day rolling baseline · 15+ business units",
    summary:
      "Yesterday’s spend against a 30-day baseline, stacked by department. Drill from product to subscription, environment and resource group before a spike becomes a month-end story. Replaced the manual daily pack and cut reporting time by 80%.",
    thumbnail: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="480" height="220" fill="#f3efe6"/>
      <text x="20" y="28" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">YESTERDAY VS 30-DAY AVERAGE</text>
      <text x="20" y="52" fill="#1c1915" font-size="20" font-weight="700" font-family="serif">£34.73K</text>
      <text x="160" y="44" fill="#6b6560" font-size="9" font-family="sans-serif">vs 30d avg £43.02K</text>
      <text x="160" y="56" fill="#9a341f" font-size="9" font-family="sans-serif" font-weight="600">+19.27% below baseline ✓</text>
      <line x1="20" y1="66" x2="460" y2="66" stroke="#1c191520" stroke-width="1"/>
      <defs>
        <linearGradient id="g4a" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#9a341f" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#9a341f" stop-opacity="0.05"/>
        </linearGradient>
        <linearGradient id="g4b" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#1c1915" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#1c1915" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      <path d="M20,180 L72,172 L124,165 L176,155 L228,168 L268,140 L300,158 L332,145 L364,130 L396,142 L428,155 L460,148 L460,210 L20,210 Z" fill="url(#g4a)"/>
      <path d="M20,180 L72,172 L124,165 L176,155 L228,168 L268,140 L300,158 L332,145 L364,130 L396,142 L428,155 L460,148" stroke="#9a341f" stroke-width="2" fill="none"/>
      <path d="M20,192 L72,188 L124,185 L176,180 L228,188 L268,174 L300,180 L332,172 L364,160 L396,168 L428,175 L460,170 L460,210 L20,210 Z" fill="url(#g4b)"/>
      <path d="M20,192 L72,188 L124,185 L176,180 L228,188 L268,174 L300,180 L332,172 L364,160 L396,168 L428,175 L460,170" stroke="#1c1915" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="4 3"/>
      <circle cx="364" cy="130" r="5" fill="none" stroke="#9a341f" stroke-width="1.5"/>
      <text x="370" y="126" fill="#9a341f" font-size="8" font-family="sans-serif" font-weight="600">SPIKE</text>
      <text x="20" y="212" fill="#6b6560" font-size="8" font-family="sans-serif">Apr 9 → May 8 · stacked by department · subscription · environment</text>
    </svg>`,
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
    thumbnail: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="480" height="220" fill="#f3efe6"/>
      <text x="20" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">ALLOCATION ACCURACY</text>
      <text x="20" y="55" fill="#1c1915" font-size="28" font-weight="700" font-family="serif">95%</text>
      <text x="120" y="30" fill="#6b6560" font-size="9" font-family="sans-serif" letter-spacing="1.5">TAGGED RESOURCES</text>
      <text x="120" y="55" fill="#9a341f" font-size="28" font-weight="700" font-family="serif">9,400+</text>
      <line x1="20" y1="68" x2="460" y2="68" stroke="#1c191520" stroke-width="1"/>
      <text x="20" y="90" fill="#6b6560" font-size="8" font-family="sans-serif" letter-spacing="1">COST CENTRE COVERAGE</text>
      <rect x="20" y="97" width="380" height="10" rx="2" fill="#e7e1d4"/>
      <rect x="20" y="97" width="361" height="10" rx="2" fill="#9a341f" opacity="0.85"/>
      <text x="406" y="107" fill="#9a341f" font-size="9" font-family="sans-serif" font-weight="600">95%</text>
      <text x="20" y="127" fill="#6b6560" font-size="8" font-family="sans-serif" letter-spacing="1">OWNER TAG COVERAGE</text>
      <rect x="20" y="134" width="380" height="10" rx="2" fill="#e7e1d4"/>
      <rect x="20" y="134" width="342" height="10" rx="2" fill="#9a341f" opacity="0.7"/>
      <text x="406" y="144" fill="#9a341f" font-size="9" font-family="sans-serif" font-weight="600">90%</text>
      <text x="20" y="164" fill="#6b6560" font-size="8" font-family="sans-serif" letter-spacing="1">ENVIRONMENT TAG COVERAGE</text>
      <rect x="20" y="171" width="380" height="10" rx="2" fill="#e7e1d4"/>
      <rect x="20" y="171" width="323" height="10" rx="2" fill="#9a341f" opacity="0.55"/>
      <text x="406" y="181" fill="#9a341f" font-size="9" font-family="sans-serif" font-weight="600">85%</text>
      <text x="20" y="212" fill="#6b6560" font-size="8" font-family="sans-serif">Azure Policy · AWS SCPs · showback · chargeback · enforcement automation</text>
    </svg>`,
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
    outcome: "Named contributor · FinOps Foundation",
    summary:
      "Named in the acknowledgments of the FinOps Foundation's practical scenarios paper for data-cloud cost governance. Scenarios cover idle spend, tagging, query-level attribution, anomaly response, and chargeback — written for Snowflake, designed to carry to Databricks, Fabric, BigQuery, and Redshift.",
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
  "Cloud GreenOps for AI — Greenpixie",
  "Generative AI with AWS — Udacity",
] as const;

export const roles = [
  {
    dates: "Oct 2025 — Present",
    org: "Next Retail Limited",
    title: "Senior FinOps Analyst",
    note: "Azure & GCP. FinOps Hub, tagging, showback, and the practice built from a blank page.",
    achievements: [
      "Designed and delivered the FinOps Hub — monthly, daily and AI cost dashboards — giving Domain Managers and senior leadership real-time visibility.",
      "Built showback and chargeback models that gave shared platforms an owner instead of a communal bill.",
      "Led Product Tag Implementation across subscriptions; drove monthly Domain Cost Review meetings direct to leadership.",
      "Automated reporting with PowerShell and Terraform; evaluated advanced FinOps tooling business case.",
      "Contributed to budget forecasting and anomaly detection pipelines across Azure and GCP.",
    ],
  },
  {
    dates: "Nov 2022 — Apr 2025",
    org: "Taylor & Eyre Limited",
    title: "FinOps Engineer",
    note: "AWS. Waste, savings plans, tagging, SCPs, and the reporting that replaced the manual pack.",
    achievements: [
      "Reduced cloud waste by 25% using AWS Cost Explorer, Budgets and Anomaly Detection.",
      "Built automated Power BI dashboards giving real-time cost visibility across 15+ business units.",
      "Built a Python-based automated cost reporting system, cutting manual effort by 80%.",
      "Deployed automated shutdown scripts for dev/test environments, achieving ~30% non-production cost reduction.",
      "Established resource tagging policies and SCPs, lifting cost allocation accuracy to 95%.",
      "Trained 50+ engineers on cost-conscious development practices and FinOps principles.",
      "Supported contract negotiations and strategic procurement, contributing to 15% annual savings.",
    ],
  },
  {
    dates: "Feb 2019 — Sep 2022",
    org: "FBNQuest Merchant Bank",
    title: "Senior Transaction Analyst",
    note: "Led a team of six through equity trades, reconciliation, and MiFID II compliance at 99%+ accuracy. The practice where a figure has to survive audit before it leaves the desk.",
    achievements: [
      "Led a team of six analysts to 99%+ error-free equity trade execution.",
      "Reduced transaction processing time by 40% through workflow optimisation.",
      "Developed automated reconciliation processes and Power BI financial reporting dashboards.",
      "Streamlined KYC/AML client onboarding by 15% while maintaining SEC Nigeria and MiFID II compliance.",
    ],
  },
] as const;
