"use client";

import { useState, useEffect } from "react";

/**
 * Detect kalau browser support WebGL.
 * Kalau tidak support, kita fallback ke BackgroundBlobs biasa.
 */
export function useWebGLSupport() {
  const [supported, setSupported] = useState(null); // null = loading

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}

