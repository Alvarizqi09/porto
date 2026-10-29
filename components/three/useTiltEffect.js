"use client";

import { useRef, useCallback } from "react";

/**
 * Hook CSS 3D tilt effect — tidak pakai Three.js!
 * Apply ke card element manapun.
 *
 * Usage:
 *   const { ref, handlers } = useTiltEffect();
 *   <div ref={ref} {...handlers}>content</div>
 */
export function useTiltEffect({ maxTilt = 8, scale = 1.02 } = {}) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1

      const rotateX = (y - 0.5) * -maxTilt * 2; // tilt atas-bawah
      const rotateY = (x - 0.5) * maxTilt * 2; // tilt kiri-kanan

      ref.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    },
    [maxTilt, scale]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return {
    ref,
    handlers: {
      onMouseMove,
      onMouseLeave,
    },
  };
}

