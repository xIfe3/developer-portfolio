import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { StackBand } from "@/components/sections/StackBand";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";
import { Zephra } from "@/components/sections/Zephra";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StackBand />
      <Work />
      <Story />
      <Experience />
      <Zephra />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
