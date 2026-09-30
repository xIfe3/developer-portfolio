"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
};

export function RevealImage({ src, alt, width, height, priority, sizes, className, imgClassName }: Props) {
  return (
    <m.div
      data-reveal
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(14% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <m.div
        data-reveal
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="size-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 40vw, 100vw"}
          className={cn("size-full object-cover", imgClassName)}
        />
      </m.div>
    </m.div>
  );
}
