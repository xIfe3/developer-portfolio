"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

export default function WorkTemplate({ children }: { children: ReactNode }) {
  return (
    // Slide only, no opacity: starting at opacity 0 hid the LCP image until hydration.
    <m.div
      data-reveal
      initial={{ y: 24 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
