import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "ghost-light";

const variants: Record<Variant, string> = {
  primary: "bg-vermilion text-white hover:bg-vermilion-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-forest hover:bg-saffron hover:text-ink",
  "ghost-light": "border border-paper/40 text-paper hover:bg-paper hover:text-forest",
};

export function Button({
  href,
  variant = "primary",
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = cn(
    "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold",
    "transition-[transform,background-color,color] duration-500 ease-spring",
    "hover:-translate-y-[3px] hover:-rotate-[1.5deg]",
    variants[variant],
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
