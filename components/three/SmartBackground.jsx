"use client";

import dynamic from "next/dynamic";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { useWebGLSupport } from "./useWebGLSupport";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

/**
 * Smart background: otomatis pilih antara
 * - 3D Three.js scene (kalau WebGL support)
 * - SVG BackgroundBlobs (fallback kalau WebGL tidak support)
 */
export default function SmartBackground() {
  const webgl = useWebGLSupport();

  // Loading state — tampilkan BackgroundBlobs dulu sambil detect WebGL
  if (webgl === null) return <BackgroundBlobs />;

  // WebGL support → pakai 3D
  if (webgl) return <ThreeScene />;

  // Fallback → pakai SVG blobs
  return <BackgroundBlobs />;
}

