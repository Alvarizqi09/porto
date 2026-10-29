"use client";

import { useState, useEffect } from "react";

/**
 * Respect user's "prefers-reduced-motion" setting.
 * Kalau user set reduced motion, kita matikan animasi 3D.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

