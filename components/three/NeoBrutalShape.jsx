"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

/**
 * Satu shape 3D dengan style neobrutalism:
 * - Flat color (MeshBasicMaterial, no lighting needed)
 * - Bold black edges (EdgesGeometry + LineSegments)
 */
export default function NeoBrutalShape({
  geometry = "box",
  color = "#FDC800",
  position = [0, 0, 0],
  size = 1,
  rotationSpeed = 0.3,
  floatSpeed = 2,
  floatIntensity = 1,
  opacity = 0.2,
}) {
  const meshRef = useRef();

  // Buat geometry berdasarkan type
  const geo = useMemo(() => {
    switch (geometry) {
      case "box":
        return new THREE.BoxGeometry(size, size, size);
      case "sphere":
        return new THREE.SphereGeometry(size * 0.6, 8, 8);
      case "torus":
        return new THREE.TorusGeometry(size * 0.5, size * 0.2, 8, 16);
      case "octahedron":
        return new THREE.OctahedronGeometry(size * 0.6);
      case "tetrahedron":
        return new THREE.TetrahedronGeometry(size * 0.6);
      case "dodecahedron":
        return new THREE.DodecahedronGeometry(size * 0.5);
      case "cone":
        return new THREE.ConeGeometry(size * 0.4, size, 6);
      default:
        return new THREE.BoxGeometry(size, size, size);
    }
  }, [geometry, size]);

  // Edges geometry untuk border tebal (khas neobrutalism)
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  // Rotate perlahan
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.3;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.5;
    }
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.3}
      floatIntensity={floatIntensity}
    >
      <group ref={meshRef} position={position}>
        {/* Fill shape */}
        <mesh geometry={geo}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Bold black edges — ini yang bikin "neobrutalism" feel */}
        <lineSegments geometry={edges}>
          <lineBasicMaterial
            color="#1C293C"
            transparent
            opacity={opacity + 0.1}
            linewidth={1}
          />
        </lineSegments>
      </group>
    </Float>
  );
}

