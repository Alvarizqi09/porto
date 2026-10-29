"use client";

import { useMemo } from "react";
import NeoBrutalShape from "./NeoBrutalShape";

// Warna dari design system neobrutalism
const COLORS = [
  "#FDC800", // primary yellow
  "#432DD7", // accent blue-violet
  "#7B61FF", // lighter violet
  "#FDC800",
  "#432DD7",
];

const GEOMETRIES = [
  "box",
  "sphere",
  "torus",
  "octahedron",
  "tetrahedron",
  "dodecahedron",
  "cone",
];

// Deterministic random (same seed = same layout setiap render)
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export default function FloatingShapes({ count = 18 }) {
  const shapes = useMemo(() => {
    const rand = seededRandom(42);
    const items = [];

    for (let i = 0; i < count; i++) {
      // Spread shapes across the viewport
      const x = (rand() - 0.5) * 30; // -15 to 15
      const y = (rand() - 0.5) * 20; // -10 to 10
      const z = (rand() - 0.5) * 10 - 5; // -10 to 0 (behind)

      items.push({
        id: i,
        geometry: GEOMETRIES[Math.floor(rand() * GEOMETRIES.length)],
        color: COLORS[Math.floor(rand() * COLORS.length)],
        position: [x, y, z],
        size: 0.5 + rand() * 1.5,
        rotationSpeed: 0.1 + rand() * 0.4,
        floatSpeed: 1 + rand() * 2,
        floatIntensity: 0.5 + rand() * 1.5,
        opacity: 0.08 + rand() * 0.15, // subtle, tidak mengganggu content
      });
    }

    return items;
  }, [count]);

  return (
    <group>
      {shapes.map((shape) => (
        <NeoBrutalShape key={shape.id} {...shape} />
      ))}
    </group>
  );
}

