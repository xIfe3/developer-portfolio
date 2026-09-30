"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";

// LazyMotion + `m` components ship only the DOM animation features we use,
// instead of the full `motion` bundle.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <SmoothScroll />
      </MotionConfig>
    </LazyMotion>
  );
}
