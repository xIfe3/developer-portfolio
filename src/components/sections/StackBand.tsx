import { Marquee } from "@/components/motion/Marquee";
import { site } from "@/content/site";

export function StackBand() {
  return (
    <section aria-label="Tools I ship with" className="border-y border-line py-5">
      <Marquee
        items={site.stack}
        className="font-display text-[clamp(1.1rem,2vw,1.4rem)] text-muted"
        separator={<span className="block size-1.5 rounded-full bg-ember" />}
        duration={40}
      />
    </section>
  );
}
