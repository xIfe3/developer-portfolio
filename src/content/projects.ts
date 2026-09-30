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
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "hedgeon",
    title: "Hedgeon Investment Analytics",
    client: "Hedgeon Finance",
    year: "2025",
    category: "Fintech · Dashboard",
    summary:
      "Full-stack investment dashboard delivering real-time portfolio analytics to professional traders. Aggregation pipelines feed chart renderers sub-second on 10M+ rows.",
    impact: "60% latency reduction on core analytics queries",
    technologies: ["Next.js", "Node.js", "MongoDB", "Chart.js"],
    image: "/projects/hedgeon-finance.png",
    imageAlt: "Hedgeon investment analytics dashboard showing portfolio charts",
    githubUrl: "https://github.com/xIfe3/hedgeon-finance",
    liveUrl: "https://hedgeon-finance-ifekels-projects.vercel.app/",
    featured: true,
    tone: "saffron",
  },
  {
    slug: "payzeph",
    title: "PayZeph",
    client: "Zephra Studio",
    year: "2026",
    category: "Fintech · Platform",
    summary:
      "A full-stack monorepo bill payment app with shared UI components, automated testing with Jest & Playwright, and Docker-based deployment.",
    impact: "Shipped in 14 days",
    technologies: ["Next.js", "NestJS", "TypeScript", "Turborepo", "Docker"],
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
    client: "Zephra Studio",
    year: "2026",
    category: "SaaS · Analytics",
    summary:
      "A production-ready SaaS dashboard with tiered subscriptions, revenue analytics, CSV exports, Stripe billing, and Google OAuth.",
    impact: "Ready for production in 2 weeks",
    technologies: ["Next.js 16", "Prisma", "Stripe", "Recharts", "NextAuth"],
    image: "/projects/flowanalytics.png",
    imageAlt: "FlowAnalytics revenue dashboard with subscription charts",
    githubUrl: "https://github.com/zephradev/flowanalytics",
    liveUrl: "https://flowanalytics-zephra.vercel.app/",
    featured: true,
    tone: "forest",
  },
  {
    slug: "reginanostra",
    title: "ReginaNostra Schools",
    client: "ReginaNostra",
    year: "2025",
    category: "SaaS · Education",
    summary:
      "End-to-end school management platform in production use by staff and students — replaced a paper-based workflow with attendance, reporting, and role-based access.",
    impact: "Adopted across the entire institution",
    technologies: ["Next.js", "Node.js", "Tailwind"],
    image: "/projects/reginanostra.png",
    imageAlt: "ReginaNostra Schools website homepage",
    githubUrl: "https://github.com/xIfe3/regina-nostras-schools",
    liveUrl: "https://www.reginanostraschools.com/",
    featured: true,
    tone: "paper",
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
    githubUrl: "https://github.com/xIfe3/10-10-realty-group",
    liveUrl: "https://1010-realty-group.vercel.app/",
    featured: false,
    tone: "forest",
  },
  {
    slug: "medibook",
    title: "MediBook",
    client: "Zephra Studio",
    year: "2026",
    category: "SaaS · Health",
    summary:
      "A doctor appointment platform with specialty search, real-time slot availability, JWT auth, and separate dashboards for patients and doctors.",
    impact: "2× faster than industry average",
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
    impact: "Built without scope creep",
    technologies: ["Next.js 15", "NestJS", "Prisma", "PostgreSQL", "Recharts", "JWT"],
    image: "/projects/savvio.png",
    imageAlt: "Savvio budgeting dashboard with spending charts",
    githubUrl: "https://github.com/xIfe3/savvio",
    liveUrl: "https://savvio-budgetting.vercel.app/",
    featured: false,
    tone: "paper",
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
