"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface HeroSceneProps {
  progressRef: React.MutableRefObject<number>;
  selectedKw: number;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}

// 1. Procedural 8-Panel Solar Array with dynamic kW illumination
function SolarRooftopArray({
  selectedKw,
  progressRef,
}: {
  selectedKw: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const activePanelsCount = selectedKw === 3 ? 4 : selectedKw === 5 ? 6 : 8;

  const panels = useMemo(() => {
    const list = [];
    const spacingX = 0.58;
    const spacingZ = 0.95;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const id = r * 4 + c;
        const x = (c - 1.5) * spacingX;
        const z = (r - 0.5) * spacingZ;
        list.push({ id, x, z });
      }
    }
    return list;
  }, []);

  const materialsRef = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

  useFrame(() => {
    const p = progressRef.current; // 0 to 1
    const baseGlow = Math.max(0.15, Math.min(1.0, p * 1.3));

    panels.forEach((item) => {
      const mat = materialsRef.current[item.id];
      if (mat) {
        const isActive = item.id < activePanelsCount;
        if (isActive) {
          mat.emissive.setRGB(0.55 * baseGlow, 0.78 * baseGlow, 0.25 * baseGlow);
          mat.emissiveIntensity = 0.6 + baseGlow * 1.4;
        } else {
          mat.emissive.setRGB(0.03, 0.16, 0.1);
          mat.emissiveIntensity = 0.2;
        }
      }
    });
  });

  return (
    <group position={[0, 1.05, 0.1]} rotation={[-0.28, 0, 0]}>
      {/* Aluminum mounting structure rails */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[2.5, 0.04, 2.0]} />
        <meshStandardMaterial color="#6B7280" metalness={0.8} roughness={0.3} />
      </mesh>

      {panels.map((p) => {
        return (
          <group key={p.id} position={[p.x, 0, p.z]}>
            {/* Panel Frame */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.52, 0.03, 0.88]} />
              <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.4} />
            </mesh>
            {/* Panel Glass / Photovoltaic Cells */}
            <mesh position={[0, 0.018, 0]}>
              <boxGeometry args={[0.48, 0.01, 0.84]} />
              <meshStandardMaterial
                ref={(el) => {
                  materialsRef.current[p.id] = el;
                }}
                color="#04140C"
                roughness={0.15}
                metalness={0.85}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// 2. Procedural Low-Poly Indian Home & Rooftop
function ProceduralHome() {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Main Building Body */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[3.2, 0.9, 2.8]} />
        <meshStandardMaterial color="#E8EFE5" roughness={0.6} />
      </mesh>

      {/* Parapet Roof Border */}
      <mesh position={[0, 0.96, 0]}>
        <boxGeometry args={[3.3, 0.14, 2.9]} />
        <meshStandardMaterial color="#CBD8C7" roughness={0.5} />
      </mesh>

      {/* Front Entrance & Windows */}
      <mesh position={[0, 0.35, 1.41]}>
        <boxGeometry args={[0.65, 0.7, 0.04]} />
        <meshStandardMaterial color="#0B4A2B" roughness={0.4} />
      </mesh>
      <mesh position={[-0.9, 0.45, 1.41]}>
        <boxGeometry args={[0.6, 0.45, 0.04]} />
        <meshStandardMaterial color="#1E3A2B" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[0.9, 0.45, 1.41]}>
        <boxGeometry args={[0.6, 0.45, 0.04]} />
        <meshStandardMaterial color="#1E3A2B" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Rooftop Water Tank (Signature Indian rooftop feature) */}
      <group position={[1.1, 1.25, -0.8]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.5, 16]} />
          <meshStandardMaterial color="#1F2937" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.55, 0.12, 0.55]} />
          <meshStandardMaterial color="#9CA3AF" roughness={0.8} />
        </mesh>
      </group>

      {/* Inverter Box mounted on house side */}
      <mesh position={[1.62, 0.5, 0.4]}>
        <boxGeometry args={[0.06, 0.35, 0.25]} />
        <meshStandardMaterial color="#8CC63F" emissive="#3F8F3A" emissiveIntensity={0.6} />
      </mesh>

      {/* Foundation plinth */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.8, 0.12, 3.4]} />
        <meshStandardMaterial color="#072A19" roughness={0.9} />
      </mesh>
    </group>
  );
}

// 3. Simple Background Silhouette Houses & Stylised Grid Pole
function BackgroundScenery() {
  return (
    <group>
      {/* Background House Left */}
      <mesh position={[-4.2, -0.6, -2.5]}>
        <boxGeometry args={[2.6, 0.8, 2.2]} />
        <meshStandardMaterial color="#072A19" roughness={0.9} />
      </mesh>

      {/* Background House Right */}
      <mesh position={[4.0, -0.6, -3.0]}>
        <boxGeometry args={[2.8, 0.85, 2.4]} />
        <meshStandardMaterial color="#072A19" roughness={0.9} />
      </mesh>

      {/* Stylised Grid Utility Pole (Right side) */}
      <group position={[3.2, 0.4, 1.0]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 2.6, 8]} />
          <meshStandardMaterial color="#4B5563" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.85, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.9, 0.05, 0.05]} />
          <meshStandardMaterial color="#374151" roughness={0.7} />
        </mesh>
        <mesh position={[-0.38, 1.95, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 6]} />
          <meshStandardMaterial color="#8CC63F" emissive="#3F8F3A" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.38, 1.95, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 6]} />
          <meshStandardMaterial color="#8CC63F" emissive="#3F8F3A" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// 4. Sun Orb that arcs across the sky with scroll progress
function SunOrb({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load("/images/hero/sun-orb.png");
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = progressRef.current; // 0 to 1
    const x = -4.8 + p * 9.6;
    const y = 0.4 + Math.sin(p * Math.PI) * 3.4;
    const z = -4.0 + Math.sin(p * Math.PI) * 1.5;

    meshRef.current.position.set(x, y, z);
    const scale = 0.9 + Math.sin(p * Math.PI) * 0.45;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={meshRef} position={[-4.8, 0.4, -4]}>
      <sprite scale={[2.8, 2.8, 1]}>
        <spriteMaterial
          map={texture}
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.95}
        />
      </sprite>

      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color="#8CC63F" />
      </mesh>

      <pointLight color="#8CC63F" intensity={2.5} distance={15} decay={1.8} />
    </group>
  );
}

// Deterministic pseudo-random number generator
function getDeterministicHash(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function initOffsets(count: number): Float32Array {
  const offs = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    offs[i] = getDeterministicHash(i);
  }
  return offs;
}

function initSpeeds(count: number): Float32Array {
  const spds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    spds[i] = 0.15 + getDeterministicHash(i + 1000) * 0.25;
  }
  return spds;
}

// 5. Energy Particle Stream: "Rooftop Panels -> Home Inverter -> Power Grid Pole"
function EnergyParticleStream({
  progressRef,
  particleCount = 500,
}: {
  progressRef: React.MutableRefObject<number>;
  particleCount?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const offsetsRef = useRef<Float32Array>(initOffsets(particleCount));
  const speedsRef = useRef<Float32Array>(initSpeeds(particleCount));

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.8, 0.1),
      new THREE.Vector3(0.9, 0.5, 0.3),
      new THREE.Vector3(1.62, 0.1, 0.4),
      new THREE.Vector3(2.3, 1.2, 0.7),
      new THREE.Vector3(3.2, 2.2, 1.0),
    ]);
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = getDeterministicHash(i);
      const pt = curve.getPoint(u);
      pos[i * 3] = pt.x + (getDeterministicHash(i + 2000) - 0.5) * 0.08;
      pos[i * 3 + 1] = pt.y + (getDeterministicHash(i + 3000) - 0.5) * 0.08;
      pos[i * 3 + 2] = pt.z + (getDeterministicHash(i + 4000) - 0.5) * 0.08;
    }
    return pos;
  }, [particleCount, curve]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const scrollProg = progressRef.current;
    const speedMultiplier = 0.4 + scrollProg * 1.2;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    const offs = offsetsRef.current;
    const spds = speedsRef.current;

    for (let i = 0; i < particleCount; i++) {
      offs[i] = (offs[i] + delta * spds[i] * speedMultiplier) % 1.0;
      const pt = curve.getPoint(offs[i]);

      posArray[i * 3] = pt.x + Math.sin(i + offs[i] * 10) * 0.03;
      posArray[i * 3 + 1] = pt.y + Math.cos(i + offs[i] * 10) * 0.03;
      posArray[i * 3 + 2] = pt.z;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#8CC63F"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 6. Floating 3D Depth Chips (Layer 3): ₹66,000/kW & ₹78,000 subsidy
function FloatingDepthChips() {
  const chip1Ref = useRef<THREE.Group>(null);
  const chip2Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (chip1Ref.current) {
      chip1Ref.current.position.y = 1.35 + Math.sin(t * 1.2) * 0.08;
    }
    if (chip2Ref.current) {
      chip2Ref.current.position.y = 1.05 + Math.cos(t * 1.4) * 0.08;
    }
  });

  return (
    <>
      <group ref={chip1Ref} position={[-1.6, 1.35, 0.4]}>
        <Html center transform distanceFactor={5.5}>
          <div className="px-3 py-1.5 rounded-full bg-[#072A19]/85 backdrop-blur-md border border-[#8CC63F]/40 shadow-[0_4px_16px_rgba(4,20,12,0.8)] text-[#8CC63F] text-[11px] font-semibold whitespace-nowrap select-none pointer-events-none">
            ₹66,000 / kW Complete EPC
          </div>
        </Html>
      </group>

      <group ref={chip2Ref} position={[1.7, 1.05, 0.6]}>
        <Html center transform distanceFactor={5.5}>
          <div className="px-3 py-1.5 rounded-full bg-[#072A19]/85 backdrop-blur-md border border-[#8CC63F]/40 shadow-[0_4px_16px_rgba(4,20,12,0.8)] text-[#8CC63F] text-[11px] font-semibold whitespace-nowrap select-none pointer-events-none">
            ₹78,000 Direct Central Subsidy
          </div>
        </Html>
      </group>
    </>
  );
}

// 7. Parallax Scene Group (Rotates and shifts root group instead of mutating camera)
function ParallaxSceneGroup({
  pointerRef,
  children,
}: {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Parallax ±4° = approx ±0.07 rad
    const targetRotY = pointerRef.current.x * 0.07;
    const targetRotX = pointerRef.current.y * 0.05;

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

export function HeroScene({ progressRef, selectedKw, pointerRef }: HeroSceneProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.2, 5.0], fov: 42 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
        style={{ pointerEvents: "none" }}
      >
        <ambientLight color="#D5E6CC" intensity={0.8} />
        <directionalLight position={[3, 5, 4]} color="#F1F8EC" intensity={1.2} />

        <ParallaxSceneGroup pointerRef={pointerRef}>
          <group position={[0, -0.3, 0]}>
            <ProceduralHome />
            <SolarRooftopArray selectedKw={selectedKw} progressRef={progressRef} />
            <BackgroundScenery />
            <SunOrb progressRef={progressRef} />
            <EnergyParticleStream
              progressRef={progressRef}
              particleCount={isMobile ? 250 : 550}
            />
            <FloatingDepthChips />
          </group>
        </ParallaxSceneGroup>
      </Canvas>
    </div>
  );
}
