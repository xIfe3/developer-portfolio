import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="ember-glow absolute -top-[28rem] left-1/2 h-[56rem] w-[70rem] -translate-x-1/2 opacity-70" />
        <div className="tile-grid absolute inset-0 [mask-image:radial-gradient(ellipse_40rem_28rem_at_50%_10%,#000_10%,transparent_75%)]" />
      </div>
      <div className="container-page flex flex-col items-center text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-none font-medium tracking-[-0.035em]">
          This page <em className="font-serif font-light text-saffron">wandered off.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[40ch] text-lg text-muted">
          The link may be old, or the project may have moved. The work is still all here.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button href="/#work">See my work</Button>
          <Button href="/" variant="ghost">Home</Button>
        </div>
      </div>
    </section>
  );
}
