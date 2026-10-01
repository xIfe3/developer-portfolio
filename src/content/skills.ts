export type SkillGroup = {
  title: string;
  blurb: string;
  skills: { name: string; icon?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "Typed React apps, design systems, and interfaces that stay performant under real-world data loads.",
    skills: [
      { name: "TypeScript", icon: "/icons/typeScript.svg" },
      { name: "React / Next.js", icon: "/icons/react.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
      { name: "JavaScript", icon: "/icons/JavaScript.svg" },
      { name: "HTML / CSS", icon: "/icons/html5.svg" },
    ],
  },
  {
    title: "Backend & APIs",
    blurb: "REST and GraphQL services, event-driven pipelines, queue workers, and payment integrations at scale.",
    skills: [
      { name: "Node.js / NestJS", icon: "/icons/nodejs.svg" },
      { name: "PostgreSQL", icon: "/icons/postgres.svg" },
      { name: "Python / FastAPI", icon: "/icons/fastapi.svg" },
      { name: "Prisma / Drizzle" },
      { name: "Redis", icon: "/icons/redis.svg" },
    ],
  },
  {
    title: "AI & DevOps",
    blurb: "LLM-powered features, LangChain workflows, RAG pipelines, plus the containers and CI/CD that keep them shipping.",
    skills: [
      { name: "LangChain" },
      { name: "OpenAI / Anthropic APIs" },
      { name: "RAG · Embeddings" },
      { name: "Docker · CI/CD", icon: "/icons/docker.svg" },
      { name: "AWS / GCP", icon: "/icons/aws.svg" },
    ],
  },
];
