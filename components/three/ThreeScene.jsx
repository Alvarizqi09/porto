"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import ThreeCanvas from "./ThreeCanvas";
import FloatingShapes from "./FloatingShapes";
import MouseParallax from "./MouseParallax";
import HeroObject3D from "./HeroObject3D";

/**
 * Orchestrator: gabungkan semua 3D component,
 * dan kontrol visibility berdasarkan halaman aktif.
 */
export default function ThreeScene() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Reduce shapes on mobile
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  }, []);

  return (
    <ThreeCanvas>
      <MouseParallax intensity={0.4}>
        {/* Background shapes — tampil di semua halaman */}
        <FloatingShapes count={isMobile ? 8 : 15} />

        {/* Hero object — hanya di home page */}
        <HeroObject3D visible={isHome} />
      </MouseParallax>
    </ThreeCanvas>
  );
}

