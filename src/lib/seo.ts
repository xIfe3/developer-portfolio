import type { Metadata } from "next";
import type { Project } from "@/content/projects";
import { SITE_URL, site, socials } from "@/content/site";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.zephra.name,
    url: site.zephra.url,
    description: site.zephra.description,
    founder: { "@type": "Person", name: site.name },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(site.portraits.hero.src),
    jobTitle: site.jobTitle,
    description: site.description,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.country,
    },
    sameAs: socials.map((s) => s.href),
    worksFor: { "@type": "Organization", name: site.zephra.name, url: site.zephra.url },
  };
}

export function projectJsonLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    url: absoluteUrl(`/work/${p.slug}`),
    image: absoluteUrl(p.image),
    description: p.summary,
    dateCreated: p.year,
    genre: p.category,
    keywords: p.technologies.join(", "),
    creator: { "@type": "Person", name: site.name, url: absoluteUrl("/") },
  };
}

const defaultTitle = `${site.name} — Full-Stack Engineer · Founder of Zephra`;

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: site.twitterHandle,
    title: defaultTitle,
    description: site.description,
  },
  icons: { icon: "/favicon.png" },
};
