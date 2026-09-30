import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain grid min-h-[80vh] place-items-center bg-paper pt-24">
      <div className="container-page text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vermilion-ink">✺ 404</p>
        <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none font-[350]">
          This page <em className="font-light">wandered off.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[40ch] text-lg text-ink-soft">
          The link may be old, or the project may have moved. The work is still all here.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/#work">See my work</Button>
          <Button href="/" variant="outline">Home</Button>
        </div>
      </div>
    </section>
  );
}
