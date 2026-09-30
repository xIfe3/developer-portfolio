export function resolveSiteUrl(env: {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
}): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const raw = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  const url = new URL(raw);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Site URL must use http or https, got "${raw}"`);
  }
  return url.origin;
}

export const SITE_URL = resolveSiteUrl({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});

export const site = {
  name: "Ifeanyi Onyekwelu",
  shortName: "Ifeanyi O.",
  role: "Full-Stack Engineer & Founder of Zephra",
  jobTitle: "Full-Stack Engineer",
  description:
    "Full-stack engineer with 5+ years building production web platforms, scalable backend systems and AI-integrated products for fintech, SaaS and education teams. Founder of Zephra Studio.",
  keywords: [
    "Ifeanyi Onyekwelu",
    "full-stack engineer",
    "full-stack developer Nigeria",
    "hire Next.js developer",
    "AI integration engineer",
    "LangChain developer",
    "fintech developer",
    "SaaS developer",
    "Zephra Studio",
  ],
  location: { city: "Enugu", country: "Nigeria", timezone: "UTC+1" },
  email: "ifeanyi@xife3.space",
  phone: { display: "+234 816 619 0067", href: "tel:+2348166190067" },
  whatsapp: "https://wa.link/rlr1e3",
  resume: "/ifeanyi-onyekwelu-resume.pdf",
  twitterHandle: "@_xIfe3",
  portraits: {
    hero: {
      src: "/profile.jpg",
      alt: "Portrait of Ifeanyi Onyekwelu, full-stack engineer",
      width: 1024,
      height: 1024,
    },
    story: [
      {
        src: "/ifeanyi.jpeg",
        alt: "Ifeanyi Onyekwelu smiling, photographed in warm light",
        width: 896,
        height: 970,
      },
      {
        src: "/profile.jpg",
        alt: "Ifeanyi Onyekwelu, founder of Zephra Studio",
        width: 1024,
        height: 1024,
      },
    ],
  },
  stats: [
    { value: "5+", label: "Years engineering" },
    { value: "25+", label: "Shipped projects" },
    { value: "10+", label: "Production clients" },
    { value: "2022", label: "Shipping since" },
  ],
  clients: ["Babelos", "Kedusoft", "World Brain Tech", "ReginaNostra", "Proxima", "Ricald AI"],
  industries: ["Fintech", "SaaS platforms", "AI products", "Payments", "Education", "Real estate"],
  zephra: {
    name: "Zephra Studio",
    url: "https://zephra.dev",
    description:
      "Senior-led engineering studio for early-stage startups, growth teams and founders who need a reliable development partner.",
  },
} as const;

export type Social = { label: "GitHub" | "LinkedIn" | "X"; href: string };

export const socials: readonly Social[] = [
  { label: "GitHub", href: "https://github.com/xIfe3" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ifeanyichukwu-onyekwelu" },
  { label: "X", href: "https://x.com/_xIfe3" },
];

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Story", href: "/#story" },
  { label: "Zephra", href: "/#zephra" },
  { label: "Contact", href: "/#contact" },
] as const;
