"use client";

import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -80 } });
    return () => lenis.destroy();
  }, [reduce]);

  return null;
}
