"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Skills ditampilkan sebagai text labels yang tersebar
 * di permukaan sphere (word cloud 3D).
 *
 * Data skills di-pass sebagai props dari parent.
 */
export default function SkillSphere({
  skills = [],
  radius = 4,
  visible = true,
}) {
  const groupRef = useRef();

  // Distribusi titik di permukaan sphere (Fibonacci sphere)
  const points = useMemo(() => {
    const count = skills.length || 20;
    const pts = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);

      pts.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ],
        label: skills[i] || `Skill ${i + 1}`,
      });
    }

    return pts;
  }, [skills, radius]);

  // Rotate keseluruhan sphere pelan
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {points.map((point, i) => (
        <Text
          key={i}
          position={point.position}
          fontSize={0.35}
          color="#1C293C"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#FDC800"
        >
          {point.label}
        </Text>
      ))}
    </group>
  );
}

