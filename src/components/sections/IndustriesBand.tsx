import { Marquee } from "@/components/motion/Marquee";
import { site } from "@/content/site";

export function IndustriesBand() {
  return (
    <section aria-label="Industries I build for" className="bg-forest py-5 text-paper">
      <Marquee
        items={site.industries}
        className="font-display text-[clamp(1.4rem,3vw,2.2rem)] italic"
        separatorClassName="not-italic text-saffron"
        duration={28}
      />
    </section>
  );
}
