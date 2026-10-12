import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "ember";

const variants: Record<Variant, string> = {
  primary: "bg-text text-bg hover:bg-saffron",
  ghost: "border border-line text-text hover:border-text/40 hover:bg-surface-2",
  ember: "bg-ember text-text hover:bg-[#ff5a3d]",
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
    "inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium",
    "transition-[transform,background-color,border-color,color] duration-500 ease-spring hover:-translate-y-0.5",
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
