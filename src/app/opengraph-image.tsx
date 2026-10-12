import { OG_SIZE, renderOgCard } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Full-stack engineer and founder of Zephra`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Full-stack engineer · Founder, Zephra",
    title: "I build AI and fintech software that",
    titleItalic: "holds up in production.",
    footer: "Fintech · SaaS · AI products",
  });
}
