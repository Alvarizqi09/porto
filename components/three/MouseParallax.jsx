"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Geser seluruh scene sedikit berdasarkan posisi mouse.
 * Efek parallax subtle yang bikin "alive".
 */
export default function MouseParallax({ intensity = 0.5, children }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;

    if (groupRef.current) {
      // Smooth lerp ke target position
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        mouse.current.x * intensity,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        mouse.current.y * intensity * 0.5,
        0.05
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

