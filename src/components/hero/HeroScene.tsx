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

// Deterministic pseudo-random number generator for hooks purity
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
    spds[i] = 0.18 + getDeterministicHash(i + 1000) * 0.28;
  }
  return spds;
}

// Procedural Topcon Bi-Facial Solar Cell Texture
function createSolarCellTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Deep dark blue-black anti-reflective monocrystalline base
  ctx.fillStyle = "#07131D";
  ctx.fillRect(0, 0, 256, 512);

  // 10 rows x 6 columns of silicon wafers
  const rows = 10;
  const cols = 6;
  const cellW = 256 / cols;
  const cellH = 512 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW;
      const y = r * cellH;

      // Cell body with micro-texture gradient
      const grad = ctx.createLinearGradient(x, y, x + cellW, y + cellH);
      grad.addColorStop(0, "#092233");
      grad.addColorStop(1, "#05131C");
      ctx.fillStyle = grad;
      ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);

      // Chamfered wafer corners
      ctx.fillStyle = "#030A10";
      ctx.fillRect(x + 1, y + 1, 2, 2);
      ctx.fillRect(x + cellW - 3, y + 1, 2, 2);
      ctx.fillRect(x + 1, y + cellH - 3, 2, 2);
      ctx.fillRect(x + cellW - 3, y + cellH - 3, 2, 2);

      // Fine current collector fingers
      ctx.strokeStyle = "rgba(160, 210, 240, 0.2)";
      ctx.lineWidth = 0.5;
      for (let i = 4; i < cellH - 2; i += 5) {
        ctx.beginPath();
        ctx.moveTo(x + 2, y + i);
        ctx.lineTo(x + cellW - 2, y + i);
        ctx.stroke();
      }
    }
  }

  // Silver busbars (4 multi-busbars)
  ctx.strokeStyle = "rgba(230, 245, 255, 0.8)";
  ctx.lineWidth = 1.0;
  for (let b = 1; b <= 4; b++) {
    const bx = (b * 256) / 5;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx, 512);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 1. Procedural 8-Panel Solar Array with realistic aluminum rack & Topcon cells
function SolarRooftopArray({
  selectedKw,
  progressRef,
}: {
  selectedKw: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const activePanelsCount = selectedKw === 3 ? 4 : selectedKw === 5 ? 6 : 8;
  const cellTexture = useMemo(() => createSolarCellTexture(), []);

  // 8 panels arranged in 2 rows of 4
  const panels = useMemo(() => {
    const list = [];
    const spacingX = 0.52;
    const spacingZ = 0.88;
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
    const baseGlow = Math.max(0.15, Math.min(1.0, p * 1.4));

    panels.forEach((item) => {
      const mat = materialsRef.current[item.id];
      if (mat) {
        const isActive = item.id < activePanelsCount;
        if (isActive) {
          mat.emissive.setRGB(0.55 * baseGlow, 0.78 * baseGlow, 0.25 * baseGlow);
          mat.emissiveIntensity = 0.5 + baseGlow * 1.5;
        } else {
          mat.emissive.setRGB(0.02, 0.05, 0.03);
          mat.emissiveIntensity = 0.15;
        }
      }
    });
  });

  return (
    <group position={[0.1, 1.28, 0.12]} rotation={[-0.26, 0, 0]}>
      {/* Aluminum mounting structure rails */}
      <mesh position={[0, -0.04, -0.38]}>
        <boxGeometry args={[2.2, 0.03, 0.04]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.04, 0.38]}>
        <boxGeometry args={[2.2, 0.03, 0.04]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Diagonal mounting leg struts */}
      <mesh position={[-0.9, -0.08, -0.38]}>
        <cylinderGeometry args={[0.015, 0.015, 0.14, 6]} />
        <meshStandardMaterial color="#64748B" metalness={0.8} />
      </mesh>
      <mesh position={[0.9, -0.08, -0.38]}>
        <cylinderGeometry args={[0.015, 0.015, 0.14, 6]} />
        <meshStandardMaterial color="#64748B" metalness={0.8} />
      </mesh>
      <mesh position={[-0.9, -0.04, 0.38]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 6]} />
        <meshStandardMaterial color="#64748B" metalness={0.8} />
      </mesh>
      <mesh position={[0.9, -0.04, 0.38]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 6]} />
        <meshStandardMaterial color="#64748B" metalness={0.8} />
      </mesh>

      {/* 8 Photovoltaic Modules */}
      {panels.map((p) => (
        <group key={p.id} position={[p.x, 0, p.z]}>
          {/* Anodized aluminum frame */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.48, 0.025, 0.82]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Topcon Solar Cell surface */}
          <mesh position={[0, 0.014, 0]}>
            <boxGeometry args={[0.45, 0.005, 0.79]} />
            <meshStandardMaterial
              ref={(el) => {
                materialsRef.current[p.id] = el;
              }}
              map={cellTexture || undefined}
              color="#0A1822"
              roughness={0.12}
              metalness={0.85}
              emissive="#020805"
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Helper: Potted Plant with layered terracotta pot and spherical foliage
function PottedPlant({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Terracotta Pot */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.16, 12]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      {/* Foliage Clusters */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color="#2E6B30" roughness={0.7} />
      </mesh>
      <mesh position={[0.04, 0.28, 0.03]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#3F8F3A" roughness={0.7} />
      </mesh>
      <mesh position={[-0.04, 0.26, -0.03]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#1E4D2B" roughness={0.7} />
      </mesh>
    </group>
  );
}

// 2. Procedural Modern Indian Home & Rooftop with authentic architectural elements
function ProceduralHome() {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Foundation plinth / courtyard base */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[3.2, 0.12, 2.8]} />
        <meshStandardMaterial color="#0E2319" roughness={0.85} />
      </mesh>
      {/* Paved Entrance Steps */}
      <mesh position={[-0.4, 0.04, 1.25]}>
        <boxGeometry args={[0.9, 0.08, 0.35]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.5} />
      </mesh>
      <mesh position={[-0.4, 0.12, 1.15]}>
        <boxGeometry args={[0.8, 0.08, 0.3]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
      </mesh>

      {/* Main Building Body (Clean off-white modern stucco) */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[2.7, 1.1, 2.3]} />
        <meshStandardMaterial color="#EEF4EB" roughness={0.45} />
      </mesh>

      {/* Rooftop Parapet Wall (Around the flat roof) */}
      <mesh position={[0, 1.25, 1.1]}>
        <boxGeometry args={[2.74, 0.16, 0.12]} />
        <meshStandardMaterial color="#E2EADE" roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.25, -1.1]}>
        <boxGeometry args={[2.74, 0.16, 0.12]} />
        <meshStandardMaterial color="#E2EADE" roughness={0.45} />
      </mesh>
      <mesh position={[-1.31, 1.25, 0]}>
        <boxGeometry args={[0.12, 0.16, 2.2]} />
        <meshStandardMaterial color="#E2EADE" roughness={0.45} />
      </mesh>
      <mesh position={[1.31, 1.25, 0]}>
        <boxGeometry args={[0.12, 0.16, 2.2]} />
        <meshStandardMaterial color="#E2EADE" roughness={0.45} />
      </mesh>
      {/* Parapet Coping Trim (Dark slate cap) */}
      <mesh position={[0, 1.34, 0]}>
        <boxGeometry args={[2.8, 0.03, 2.36]} />
        <meshStandardMaterial color="#2D3748" roughness={0.3} />
      </mesh>

      {/* Roof Access Cabin (Mumty) in Back-Left Corner */}
      <group position={[-0.75, 1.55, -0.6]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.65, 0.8]} />
          <meshStandardMaterial color="#EEF4EB" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.34, 0]}>
          <boxGeometry args={[0.86, 0.04, 0.86]} />
          <meshStandardMaterial color="#2D3748" roughness={0.3} />
        </mesh>
        <mesh position={[0.41, -0.05, 0]}>
          <boxGeometry args={[0.02, 0.5, 0.3]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
      </group>

      {/* Water Tank (Signature Indian Rooftop Sintex tank) on Elevated Platform */}
      <group position={[0.8, 1.5, -0.55]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.48, 0.16, 0.48]} />
          <meshStandardMaterial color="#64748B" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.42, 16]} />
          <meshStandardMaterial color="#111827" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.12, 0.2, 0.06, 16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.208, 0.208, 0.02, 16]} />
          <meshStandardMaterial color="#1F2937" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.208, 0.208, 0.02, 16]} />
          <meshStandardMaterial color="#1F2937" roughness={0.3} />
        </mesh>
      </group>

      {/* Front Entrance Door */}
      <group position={[-0.4, 0.52, 1.16]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.55, 0.82, 0.03]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[0.48, 0.76, 0.02]} />
          <meshStandardMaterial color="#2B1D14" roughness={0.35} />
        </mesh>
        <mesh position={[0.18, 0, 0.03]}>
          <boxGeometry args={[0.02, 0.1, 0.02]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Front Picture Window (Architectural tinted glass with thin frame) */}
      <group position={[0.65, 0.65, 1.16]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.85, 0.65, 0.03]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.78, 0.58, 0.02]} />
          <meshStandardMaterial color="#0E1B15" roughness={0.08} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.02, 0.58, 0.01]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
      </group>

      {/* Side Picture Window (Right wall) */}
      <group position={[1.36, 0.65, 0.2]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.55, 0.03]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.64, 0.48, 0.02]} />
          <meshStandardMaterial color="#0E1B15" roughness={0.08} metalness={0.9} />
        </mesh>
      </group>

      {/* Modern Solar Inverter mounted on Right Wall */}
      <group position={[1.38, 0.65, -0.6]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.42, 0.1]} />
          <meshStandardMaterial color="#0B4A2B" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[0.26, 0.38, 0.04]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0.055]}>
          <boxGeometry args={[0.08, 0.04, 0.01]} />
          <meshStandardMaterial
            color="#8CC63F"
            emissive="#8CC63F"
            emissiveIntensity={2.0}
          />
        </mesh>
        <mesh position={[-0.08, -0.24, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.6} />
        </mesh>
        <mesh position={[0.08, -0.24, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.6} />
        </mesh>
      </group>

      {/* Potted Ornamental Greenery flanking entrance and on parapet */}
      <PottedPlant position={[-0.95, 0.1, 1.25]} />
      <PottedPlant position={[0.1, 0.1, 1.25]} />
      <PottedPlant position={[-1.0, 1.35, 0.9]} scale={0.75} />
      <PottedPlant position={[1.0, 1.35, 0.9]} scale={0.75} />
    </group>
  );
}

// 3. Grid Utility Pole on the far right
function GridUtilityPole({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 2.6, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.95, 0]} rotation={[0, 0.25, 0]}>
        <boxGeometry args={[0.9, 0.06, 0.06]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
      <mesh position={[-0.36, 2.05, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
        <meshStandardMaterial color="#8CC63F" emissive="#3F8F3A" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.36, 2.05, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
        <meshStandardMaterial color="#8CC63F" emissive="#3F8F3A" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 1.4, 0.1]}>
        <cylinderGeometry args={[0.12, 0.12, 0.35, 12]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
    </group>
  );
}

// 4. Sun Orb in Upper Sky (Positioned high so it NEVER overlaps H1 text)
function SunOrb({
  progressRef,
  isMobile,
}: {
  progressRef: React.MutableRefObject<number>;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const loader = new THREE.TextureLoader();
    return loader.load("/images/hero/sun-orb.png");
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = progressRef.current; // 0 to 1

    if (isMobile) {
      // Mobile arc: travels horizontally in upper sky above text
      const x = -1.2 + p * 2.4;
      const y = 2.4 + Math.sin(p * Math.PI) * 0.8;
      const z = -3.5;
      meshRef.current.position.set(x, y, z);
    } else {
      // Desktop arc: travels across wide upper sky from dawn (x=0.6) to midday (x=1.8) to golden hour (x=3.0)
      // Never overlaps the H1 text (which is at x < 0.0, y < 1.5)
      const x = 0.6 + p * 2.4;
      const y = 2.3 + Math.sin(p * Math.PI) * 0.9;
      const z = -3.8;
      meshRef.current.position.set(x, y, z);
    }

    const scale = (isMobile ? 0.6 : 0.85) * (0.9 + Math.sin(p * Math.PI) * 0.3);
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={meshRef} position={[0.6, 2.3, -3.8]}>
      {texture && (
        <sprite scale={[2.0, 2.0, 1]}>
          <spriteMaterial
            map={texture}
            transparent
            blending={THREE.AdditiveBlending}
            opacity={0.92}
          />
        </sprite>
      )}

      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#8CC63F" />
      </mesh>

      <pointLight color="#8CC63F" intensity={2.5} distance={14} decay={1.8} />
    </group>
  );
}

// 5. Energy Particle Stream: "Rooftop Solar -> Home Inverter -> Grid"
function EnergyParticleStream({
  progressRef,
  particleCount = 400,
}: {
  progressRef: React.MutableRefObject<number>;
  particleCount?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const offsetsRef = useRef<Float32Array>(initOffsets(particleCount));
  const speedsRef = useRef<Float32Array>(initSpeeds(particleCount));

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.1, 1.35, 0.2), // Central array on roof
      new THREE.Vector3(1.1, 1.3, 0.1), // Roof edge
      new THREE.Vector3(1.36, 1.0, -0.4), // Down right side wall
      new THREE.Vector3(1.4, 0.65, -0.6), // Inverter entry
      new THREE.Vector3(1.7, 0.7, -0.6), // Leaving inverter
      new THREE.Vector3(2.4, 1.4, 0.0), // Overhead line towards grid pole
    ]);
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = getDeterministicHash(i);
      const pt = curve.getPoint(u);
      pos[i * 3] = pt.x + (getDeterministicHash(i + 2000) - 0.5) * 0.06;
      pos[i * 3 + 1] = pt.y + (getDeterministicHash(i + 3000) - 0.5) * 0.06;
      pos[i * 3 + 2] = pt.z + (getDeterministicHash(i + 4000) - 0.5) * 0.06;
    }
    return pos;
  }, [particleCount, curve]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !offsetsRef.current || !speedsRef.current) return;
    const scrollProg = progressRef.current;
    const speedMultiplier = 0.5 + scrollProg * 1.2;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    const offs = offsetsRef.current;
    const spds = speedsRef.current;

    for (let i = 0; i < particleCount; i++) {
      offs[i] = (offs[i] + delta * spds[i] * speedMultiplier) % 1.0;
      const pt = curve.getPoint(offs[i]);

      posArray[i * 3] = pt.x + Math.sin(i + offs[i] * 8) * 0.02;
      posArray[i * 3 + 1] = pt.y + Math.cos(i + offs[i] * 8) * 0.02;
      posArray[i * 3 + 2] = pt.z;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8CC63F"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 6. Floating 3D Depth Chips (Centered around solar array, completely visible)
function FloatingDepthChips({ isMobile }: { isMobile: boolean }) {
  const chip1Ref = useRef<THREE.Group>(null);
  const chip2Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (chip1Ref.current) {
      chip1Ref.current.position.y = 1.45 + Math.sin(t * 1.2) * 0.06;
    }
    if (chip2Ref.current) {
      chip2Ref.current.position.y = 1.15 + Math.cos(t * 1.4) * 0.06;
    }
  });

  if (isMobile) return null;

  return (
    <>
      {/* Chip 1: ₹66,000 / kW Complete EPC (Orbiting left side of solar array) */}
      <group ref={chip1Ref} position={[-0.75, 1.45, 0.4]}>
        <Html center transform distanceFactor={5.2}>
          <div className="px-3.5 py-1.5 rounded-full bg-[#072A19]/90 backdrop-blur-md border border-[#8CC63F]/50 shadow-[0_4px_20px_rgba(4,20,12,0.85)] text-[#8CC63F] text-xs font-semibold whitespace-nowrap select-none pointer-events-none">
            ₹66,000 / kW Complete EPC
          </div>
        </Html>
      </group>

      {/* Chip 2: ₹78,000 Direct Central Subsidy (Orbiting right side of solar array) */}
      <group ref={chip2Ref} position={[0.95, 1.15, 0.3]}>
        <Html center transform distanceFactor={5.2}>
          <div className="px-3.5 py-1.5 rounded-full bg-[#072A19]/90 backdrop-blur-md border border-[#8CC63F]/50 shadow-[0_4px_20px_rgba(4,20,12,0.85)] text-[#8CC63F] text-xs font-semibold whitespace-nowrap select-none pointer-events-none">
            ₹78,000 Direct Central Subsidy
          </div>
        </Html>
      </group>
    </>
  );
}

// 7. Dynamic Scene Lighting (Tracks scroll timeline from Dawn to Golden Hour)
function DynamicSceneLighting({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    if (!dirLightRef.current || !ambientLightRef.current) return;
    const p = progressRef.current; // 0 (dawn) -> 0.5 (midday) -> 1 (golden)

    // Dawn color: #FFA351, Midday: #FFFDF0, Golden: #FF9436
    if (p < 0.5) {
      const t = p * 2;
      dirLightRef.current.color.setRGB(
        THREE.MathUtils.lerp(1.0, 1.0, t),
        THREE.MathUtils.lerp(0.64, 0.99, t),
        THREE.MathUtils.lerp(0.32, 0.94, t)
      );
      dirLightRef.current.intensity = THREE.MathUtils.lerp(1.1, 1.8, t);
      ambientLightRef.current.color.setRGB(
        THREE.MathUtils.lerp(0.4, 0.88, t),
        THREE.MathUtils.lerp(0.55, 0.95, t),
        THREE.MathUtils.lerp(0.45, 0.88, t)
      );
    } else {
      const t = (p - 0.5) * 2;
      dirLightRef.current.color.setRGB(
        THREE.MathUtils.lerp(1.0, 1.0, t),
        THREE.MathUtils.lerp(0.99, 0.58, t),
        THREE.MathUtils.lerp(0.94, 0.22, t)
      );
      dirLightRef.current.intensity = THREE.MathUtils.lerp(1.8, 1.6, t);
      ambientLightRef.current.color.setRGB(
        THREE.MathUtils.lerp(0.88, 0.55, t),
        THREE.MathUtils.lerp(0.95, 0.65, t),
        THREE.MathUtils.lerp(0.88, 0.45, t)
      );
    }

    // Directional light position tracks sun
    const lx = THREE.MathUtils.lerp(1.0, 4.5, p);
    const ly = 3.0 + Math.sin(p * Math.PI) * 2.0;
    const lz = THREE.MathUtils.lerp(2.0, -1.0, p);
    dirLightRef.current.position.set(lx, ly, lz);
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.9} />
      <directionalLight ref={dirLightRef} position={[2, 4, 3]} castShadow={false} />
    </>
  );
}

// 8. Parallax Scene Group (Rotates and shifts root group instead of mutating camera)
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
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.4, 5.2], fov: isMobile ? 46 : 38 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
        style={{ pointerEvents: "none" }}
      >
        <DynamicSceneLighting progressRef={progressRef} />

        <ParallaxSceneGroup pointerRef={pointerRef}>
          {/* Responsive 3D House Group:
              - Desktop: Shifted to right [1.35, -0.3, 0], scale 0.88, isometric rotation [0.32, -0.62, 0]
              - Mobile: Shifted down [0, -1.3, 0.2], scale 0.72, isometric rotation [0.35, -0.55, 0] */}
          <group
            position={isMobile ? [0, -1.3, 0.2] : [1.35, -0.3, 0]}
            rotation={isMobile ? [0.35, -0.55, 0] : [0.32, -0.62, 0]}
            scale={isMobile ? [0.72, 0.72, 0.72] : [0.88, 0.88, 0.88]}
          >
            <ProceduralHome />
            <SolarRooftopArray selectedKw={selectedKw} progressRef={progressRef} />
            <EnergyParticleStream
              progressRef={progressRef}
              particleCount={isMobile ? 180 : 450}
            />
            <FloatingDepthChips isMobile={isMobile} />
          </group>

          {/* Grid Utility Pole on the far right (Desktop only) */}
          {!isMobile && <GridUtilityPole position={[3.1, -0.4, 0.2]} />}

          {/* Sun Orb in World Sky space (OUTSIDE house group, never overlaps H1) */}
          <SunOrb progressRef={progressRef} isMobile={isMobile} />
        </ParallaxSceneGroup>
      </Canvas>
    </div>
  );
}
