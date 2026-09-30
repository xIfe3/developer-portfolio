import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { IndustriesBand } from "@/components/sections/IndustriesBand";
import { Process } from "@/components/sections/Process";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";
import { Zephra } from "@/components/sections/Zephra";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustriesBand />
      <Work />
      <Story />
      <Zephra />
      <Process />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
