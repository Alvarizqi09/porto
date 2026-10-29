"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Torus + Dodecahedron yang melayang & rotate
 * di area kanan viewport (sejajar dengan Photo).
 *
 * Ini TIDAK menggantikan Photo.jsx — tapi complement di 3D canvas layer.
 */
export default function HeroObject3D({ visible = true }) {
  const torusRef = useRef();
  const dodecRef = useRef();

  // Geometries
  const torusGeo = useMemo(
    () => new THREE.TorusGeometry(2.5, 0.3, 8, 32),
    []
  );
  const torusEdges = useMemo(
    () => new THREE.EdgesGeometry(torusGeo),
    [torusGeo]
  );

  const dodecGeo = useMemo(
    () => new THREE.DodecahedronGeometry(1.2),
    []
  );
  const dodecEdges = useMemo(
    () => new THREE.EdgesGeometry(dodecGeo),
    [dodecGeo]
  );

  useFrame((_, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.15;
      torusRef.current.rotation.z += delta * 0.1;
    }
    if (dodecRef.current) {
      dodecRef.current.rotation.y += delta * 0.2;
      dodecRef.current.rotation.x += delta * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <group position={[5, 0, 0]}>
      {/* Torus besar — "frame" di sekitar area photo */}
      <Float speed={1.5} floatIntensity={0.8}>
        <group ref={torusRef}>
          <mesh geometry={torusGeo}>
            <meshBasicMaterial
              color="#FDC800"
              transparent
              opacity={0.3}
            />
          </mesh>
          <lineSegments geometry={torusEdges}>
            <lineBasicMaterial color="#1C293C" opacity={0.4} transparent />
          </lineSegments>
        </group>
      </Float>

      {/* Dodecahedron kecil floating di atas-kanan */}
      <Float speed={2} floatIntensity={1.2}>
        <group ref={dodecRef} position={[2, 2, -1]}>
          <mesh geometry={dodecGeo}>
            <meshBasicMaterial
              color="#432DD7"
              transparent
              opacity={0.25}
            />
          </mesh>
          <lineSegments geometry={dodecEdges}>
            <lineBasicMaterial color="#1C293C" opacity={0.35} transparent />
          </lineSegments>
        </group>
      </Float>
    </group>
  );
}

