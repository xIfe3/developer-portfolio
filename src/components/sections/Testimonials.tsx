import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading, accent } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";
import { TestimonialRail } from "./TestimonialRail";

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kind words"
          title={[{ text: "What clients say" }, { text: "after launch.", className: accent }]}
        />
        <Reveal className="mt-4">
          <TestimonialRail items={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
