"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Africa/Lagos",
});

/** Live Enugu time. Renders a placeholder on the server so hydration always matches. */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={className}>
      <span className="sr-only">Local time in Enugu: </span>
      Enugu, NG · <time suppressHydrationWarning>{now ?? "--:--"}</time> WAT
    </span>
  );
}
