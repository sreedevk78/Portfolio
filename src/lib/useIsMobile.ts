"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` when the viewport is narrower than 768 px (md breakpoint).
 * Server-side and first paint default to `false` so desktop markup is rendered
 * on the server, avoiding hydration mismatches.
 */
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}
