"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Rig() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.current.x * 0.4 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x +=
      (mouse.current.y * 0.2 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Main distorted icosahedron */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[2.2, 4]} />
          <MeshDistortMaterial
            color="#7c3aed"
            distort={0.45}
            speed={2}
            roughness={0.1}
            metalness={0.6}
            emissive="#4c1d95"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Cyan torus ring */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]} position={[3.5, 1, -1]}>
          <torusGeometry args={[1.1, 0.28, 16, 80]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Pink emissive octahedron */}
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={0.8}>
        <mesh position={[-3.2, -1.2, 0.5]}>
          <octahedronGeometry args={[0.85]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#be185d"
            emissiveIntensity={1.5}
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Small violet sphere accent */}
      <Float speed={3} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh position={[2, -2.5, 1]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#7c3aed"
            emissiveIntensity={2}
            roughness={0}
            metalness={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Stars
        radius={80}
        depth={60}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 6, 6]} color="#7c3aed" intensity={8} distance={20} />
      <pointLight position={[-6, -4, 4]} color="#06b6d4" intensity={6} distance={20} />
      <pointLight position={[0, -6, 2]} color="#ec4899" intensity={4} distance={15} />
      <Rig />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
