export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    role: "Founder · Engineering Lead",
    company: "Zephra Studio",
    location: "Remote",
    period: "Mar 2026 — Present",
    description:
      "Leading Zephra Studio as a senior-led engineering practice for early-stage startups and growth teams. Building AI-enabled SaaS products, productizing LangChain workflows, and shipping platform-grade software with a focus on reliability and speed.",
    achievements: [
      "Established Zephra Studio as a production engineering partner for AI and SaaS teams",
      "Delivered end-to-end web platforms and agency-grade delivery capabilities while maintaining a lean founder-led team",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "LangChain", "Prisma", "PostgreSQL", "Docker"],
  },
  {
    role: "Software Engineer · Full-Stack",
    company: "Babelos",
    location: "Remote",
    period: "Sep 2025 — Present",
    description:
      "Building a production SaaS on Next.js + NestJS with Dockerised microservices. Designing PostgreSQL schemas, Redis caching, REST/GraphQL surfaces, and integrating LLM-powered features into the product.",
    achievements: [
      "Wired LangChain-based assistant into the product UX",
      "Owned GraphQL schema design for a multi-tenant surface",
    ],
    technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "LangChain", "Docker"],
  },
  {
    role: "Software Engineer · Full-Stack",
    company: "Kedusoft",
    location: "Remote",
    period: "Sep 2024 — Jul 2025",
    description:
      "Built SaaS and fintech platforms with Stripe and Paystack payment integrations. Optimised PostgreSQL queries, added Redis caching, and deployed via Docker + GitHub Actions CI/CD.",
    achievements: [
      "Rebuilt payment layer eliminating silent failures",
      "Cut API response times via targeted query and cache optimisation",
    ],
    technologies: ["React", "TypeScript", "PostgreSQL", "Redis", "Docker", "Stripe", "Paystack"],
  },
  {
    role: "Software Engineer · Full-Stack",
    company: "World Brain Technology",
    location: "Enugu, NG",
    period: "Feb 2024 — Aug 2024",
    description:
      "Built a SaaS platform for SMEs using React, Node.js, GraphQL, and PostgreSQL. Designed dashboards for data visualisation and deployed to AWS + GCP.",
    achievements: [
      "Proposed services split cutting API latency by ~45%",
      "Stood up observability stack for early incident detection",
    ],
    technologies: ["React", "Node.js", "GraphQL", "PostgreSQL", "AWS", "GCP", "Docker"],
  },
  {
    role: "Junior Developer Intern",
    company: "CV2 Career Internship",
    location: "Remote",
    period: "Aug 2023 — Jan 2024",
    description:
      "Contributed to a SaaS platform built with Python and Firebase. Shipped features, fixed bugs, and participated in code reviews — hands-on exposure to agile workflows and CI/CD.",
    achievements: [],
    technologies: ["Python", "Firebase", "Agile", "CI/CD"],
  },
  {
    role: "Lecturer · Software Development",
    company: "Aptech Computer Education",
    location: "Enugu, NG",
    period: "Sep 2022 — Dec 2023",
    description:
      "Taught full-stack web development — JavaScript, React, Node.js, and databases. Mentored students through hands-on projects and designed structured curriculum materials.",
    achievements: [
      "Designed curriculum graduates still reference on the job",
      "Mentored dozens of students into junior dev roles",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB", "MySQL"],
  },
  {
    role: "Freelance Contract Developer",
    company: "BeeTec",
    location: "Remote",
    period: "Apr 2022 — Aug 2022",
    description:
      "Delivered client projects end-to-end — built and deployed responsive web applications, integrated third-party APIs, and optimised performance against tight deadlines while collaborating with remote teams.",
    achievements: [
      "Shipped multiple production sites inside a 4-month sprint",
      "Built recurring client relationships from one-off gigs",
    ],
    technologies: ["React", "Next.js", "Node.js", "TailwindCSS"],
  },
];
