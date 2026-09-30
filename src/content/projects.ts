export type ProjectTone = "saffron" | "vermilion" | "forest" | "paper";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  summary: string;
  impact?: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  tone: ProjectTone;
  role?: string;
  challenge?: string;
  built?: string[];
  results?: string[];
  /** Known limitations and what I'd change next — shows judgement, not just output. */
  learnings?: string[];
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "reginanostra",
    title: "ReginaNostra Schools",
    client: "ReginaNostra Schools",
    year: "2025",
    category: "SaaS · Education",
    role: "Sole engineer: build, deploy, staff training",
    summary:
      "The school's public website plus a student portal and admin console, in production at reginanostraschools.com. It replaced a paper-based workflow for student records, results, fees and announcements.",
    challenge:
      "A newly launched school needed its website and its internal records running before the first term. Admissions information, results, fee tracking and announcements were all on paper, and the staff who would run the system day to day weren't technical.",
    built: [
      "Public site (admissions, academics, fee structure, gallery, announcements, events) and a role-gated portal for students and admins, both served by one Express + MongoDB API.",
      "Bulk student onboarding from Excel or CSV uploads, so staff import a whole class at once instead of typing records one by one.",
      "Results management with downloadable PDF result slips generated on the server.",
      "Fee tracking: students upload a bank-transfer receipt, admins verify it, and duplicate submissions for the same session, term and fee type are rejected.",
      "JWT auth with role-based route guards, Helmet security headers and API rate limiting.",
    ],
    impact: "Adopted across the entire institution",
    results: ["Staff trained on the system and supported after launch"],
    learnings: [
      "Fee verification is manual (receipt upload, then admin review). That was the right call for a brand-new school, but the next step is a payment-gateway integration so fees reconcile automatically.",
    ],
    technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Cloudinary"],
    image: "/projects/reginanostra.png",
    imageAlt: "ReginaNostra Schools website homepage",
    githubUrl: "https://github.com/xIfe3/regina-nostras-schools",
    liveUrl: "https://www.reginanostraschools.com/",
    featured: true,
    tone: "paper",
  },
  {
    slug: "payzeph",
    title: "PayZeph",
    client: "Zephra Studio (in-house product)",
    year: "2026",
    category: "Fintech · Bill payments",
    role: "Lead engineer, full stack",
    summary:
      "A Nigerian bill-payment app. Users fund a wallet by card, then buy airtime, data, electricity and cable TV through real provider APIs. Built as a Turborepo monorepo with a NestJS API and a Next.js web app.",
    challenge:
      "Bill payment is a two-system problem. Money leaves our wallet, then a third-party provider has to deliver the airtime or electricity token, and either side can fail. The core requirement: a user must never lose money to a purchase that didn't go through.",
    built: [
      "Wallet funding via Flutterwave. A pending transaction is written first with a unique reference and verified server-side before the wallet is credited; re-verifying a settled reference is a no-op, so double callbacks can't double-credit.",
      "Bill purchases through VTpass, with meter and smartcard verification before payment and an automatic wallet refund when the provider call fails.",
      "Integer balances in Postgres (bigint, not floats) and a unique reference on every transaction, modelled with Drizzle ORM.",
      "Email OTP verification and refresh-token revocation backed by Redis keys with TTLs.",
      "A simulation mode: without provider keys, the API falls back to a mock checkout and simulated verification, so the full flow runs locally and in demos.",
      "Monorepo with shared UI, ESLint, Jest and TypeScript configs; each app has its own Dockerfile, with docker-compose for Postgres and Redis.",
    ],
    impact: "Wallet + four bill types on Flutterwave and VTpass",
    results: ["Shipped in 14 days"],
    learnings: [
      "The wallet debit checks the balance and then updates it in two separate statements, so two concurrent purchases could overdraw a wallet. The fix is a single conditional UPDATE … WHERE balance >= amount (or a row lock), with the debit and the ledger insert in one transaction.",
      "Purchases that time out, rather than fail cleanly, need a reconciliation job that re-queries the provider's status before refunding.",
      "Test coverage is still the scaffold's; the debit/refund paths are the first things that deserve real tests.",
    ],
    technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Drizzle ORM", "Redis", "Turborepo", "Docker"],
    image: "/projects/payzeph.png",
    imageAlt: "PayZeph bill payment app home screen",
    githubUrl: "https://github.com/zephradev/payzeph",
    liveUrl: "https://payzeph-zephra.vercel.app/",
    featured: true,
    tone: "vermilion",
  },
  {
    slug: "flowanalytics",
    title: "FlowAnalytics",
    client: "Zephra Studio (in-house product)",
    year: "2026",
    category: "SaaS · Analytics",
    role: "Lead engineer, full stack",
    summary:
      "A multi-tenant SaaS analytics dashboard: workspaces with roles, Stripe subscription billing, revenue and customer analytics, CSV reports, audit logs and API keys.",
    challenge:
      "Every B2B SaaS needs the same unglamorous foundations before its first customer: tenancy, billing, access control and an audit trail. The goal was to build those properly once, on a realistic product, rather than bolt them on later.",
    built: [
      "A workspace-scoped Prisma schema: customers, revenue events, notifications, API keys and audit entries all belong to a workspace, with cascade deletes and Owner / Admin / Member roles.",
      "Stripe Checkout for Free, Pro and Enterprise plans. Webhooks are signature-verified and upsert the subscription by its Stripe ID, so a retried event can't create a duplicate.",
      "NextAuth v5 with email/password and Google OAuth, plus a route proxy that redirects signed-out users and gates the dashboard behind onboarding.",
      "Revenue, growth and funnel charts in Recharts, and CSV exports of customers and revenue.",
      "Audit log and in-app notifications for billing and workspace events; transactional email via Resend.",
    ],
    impact: "Multi-tenant billing, roles and audit logs",
    learnings: [
      "API routes skip the proxy and each enforce auth themselves. A shared workspace-guard wrapper would make a missed check impossible rather than merely unlikely.",
      "The CSV export wraps cells in quotes but doesn't escape embedded quotes or formula characters; it should use a proper CSV writer.",
    ],
    technologies: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "NextAuth", "Stripe", "Recharts", "Resend"],
    image: "/projects/flowanalytics.png",
    imageAlt: "FlowAnalytics revenue dashboard with subscription charts",
    githubUrl: "https://github.com/zephradev/flowanalytics",
    liveUrl: "https://flowanalytics-zephra.vercel.app/",
    featured: true,
    tone: "forest",
  },
  {
    slug: "mintverse",
    title: "MintVerse NFT Marketplace",
    client: "MintVerse",
    year: "2024",
    category: "Frontend · Light Web3",
    summary:
      "Frontend and supporting backend for an NFT marketplace — wallet UX, listings, and minting flows. My scope was the product surface and API integration; on-chain contracts were owned by the blockchain team.",
    impact: "Launched with zero sev-1 incidents",
    technologies: ["Next.js", "Python", "Flask", "IPFS", "MySQL"],
    image: "/projects/mintverse.png",
    imageAlt: "MintVerse NFT marketplace listings page",
    githubUrl: "https://github.com/xIfe3/mintverse",
    liveUrl: "https://mintverse.art/",
    featured: false,
    tone: "saffron",
  },
  {
    slug: "medibook",
    title: "MediBook",
    client: "Zephra Studio (in-house product)",
    year: "2026",
    category: "SaaS · Health",
    summary:
      "A doctor appointment platform with specialty search, real-time slot availability, JWT auth, and separate dashboards for patients and doctors.",
    technologies: ["Next.js 14", "NestJS", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/projects/medibook.png",
    imageAlt: "MediBook doctor search and appointment booking screen",
    githubUrl: "https://github.com/zephradev/medibook",
    liveUrl: "https://medibook-zephra.vercel.app/",
    featured: false,
    tone: "vermilion",
  },
  {
    slug: "savvio",
    title: "Savvio",
    client: "Personal project",
    year: "2026",
    category: "SaaS · Finance",
    summary:
      "A budget management app with expense tracking, income monitoring, savings goals, recurring payments, budget alerts, and interactive analytics charts.",
    technologies: ["Next.js 15", "NestJS", "Prisma", "PostgreSQL", "Recharts", "JWT"],
    image: "/projects/savvio.png",
    imageAlt: "Savvio budgeting dashboard with spending charts",
    githubUrl: "https://github.com/xIfe3/savvio",
    liveUrl: "https://savvio-budgetting.vercel.app/",
    featured: false,
    tone: "paper",
  },
  {
    slug: "1010-realty",
    title: "1010 Realty Group",
    client: "1010 Realty",
    year: "2024",
    category: "Real Estate · Platform",
    summary:
      "Production real estate platform with live property listings, advanced search, and a fully typed Prisma + PostgreSQL data layer with SSR for solid SEO.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/projects/1010.png",
    imageAlt: "1010 Realty Group property listings",
    // Source repo is private/removed — no dead "Source code" link.
    liveUrl: "https://1010-realty-group.vercel.app/",
    featured: false,
    tone: "forest",
  },
  {
    slug: "hedgeon",
    title: "Hedgeon",
    client: "Hedgeon Finance",
    year: "2025",
    category: "Fintech · Investment platform",
    summary:
      "Investment-plan platform with user and admin portals: plan subscriptions, KYC document review, withdrawal requests with admin approval, transactional email, and a scheduled job that accrues returns daily.",
    technologies: ["Next.js", "Express", "TypeScript", "MongoDB", "Agenda"],
    image: "/projects/hedgeon-finance.png",
    imageAlt: "Hedgeon investment platform dashboard",
    githubUrl: "https://github.com/xIfe3/hedgeon-finance",
    liveUrl: "https://hedgeon-finance-ifekels-projects.vercel.app/",
    featured: false,
    tone: "saffron",
  },
];

export const getAllProjects = () => projects;
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getOtherProjects = () => projects.filter((p) => !p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
