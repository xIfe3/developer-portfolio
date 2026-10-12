import { cn } from "@/lib/utils";

/** Ember ✺ mark + mono caps label that sits above every section heading. */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("label-mono flex items-center gap-2.5 text-muted", className)}>
      <svg aria-hidden viewBox="0 0 24 24" className="size-3 shrink-0 fill-ember">
        <path d="M12 0l2.6 8.4L23 6l-6 6.2 6 5.8-8.4-2.4L12 24l-2.6-8.4L1 18l6-6L1 6l8.4 2.4z" />
      </svg>
      {children}
    </p>
  );
}
