"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Zap, Compass, Sun, ShieldCheck } from "lucide-react";

export function Hero3DSolarScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"3d" | "specs">("3d");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth;
    const height = container.clientHeight || 380;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);
    camera.lookAt(0, 0, 0);

    // 3. Renderer with transparent background & antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffae0, 2.8);
    sunLight.position.set(3, 5, 4);
    scene.add(sunLight);

    const greenFillLight = new THREE.PointLight(0x8cc63f, 2.2, 8);
    greenFillLight.position.set(-2, 1, 1);
    scene.add(greenFillLight);

    const cursorLight = new THREE.PointLight(0x8cc63f, 1.5, 6);
    cursorLight.position.set(0, 1, 2);
    scene.add(cursorLight);

    // 5. Build 3D Solar Panel Object
    const solarGroup = new THREE.Group();
    scene.add(solarGroup);

    // Solar Panel Frame (Aluminium)
    const frameWidth = 2.4;
    const frameHeight = 1.4;
    const frameDepth = 0.07;

    const frameGeo = new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x072a19,
      metalness: 0.85,
      roughness: 0.25,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    solarGroup.add(frameMesh);

    // Panel Outer Bevel Lip (Brushed metallic edge)
    const lipGeo = new THREE.BoxGeometry(frameWidth + 0.04, frameHeight + 0.04, 0.02);
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0x3f8f3a,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false,
    });
    lipGeo.translate(0, 0, -0.02);
    const lipMesh = new THREE.Mesh(lipGeo, lipMat);
    solarGroup.add(lipMesh);

    // Solar Cell Canvas Texture (Procedural high-res Topcon wafer grid)
    const cellCanvas = document.createElement("canvas");
    cellCanvas.width = 1024;
    cellCanvas.height = 512;
    const ctx = cellCanvas.getContext("2d");

    if (ctx) {
      // Dark silicon base
      ctx.fillStyle = "#03120a";
      ctx.fillRect(0, 0, 1024, 512);

      const cols = 10;
      const rows = 5;
      const cellW = 1024 / cols;
      const cellH = 512 / rows;
      const gap = 4;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellW + gap / 2;
          const y = r * cellH + gap / 2;
          const w = cellW - gap;
          const h = cellH - gap;

          // Cell gradient: deep monocrystalline navy to dark green
          const cellGrad = ctx.createLinearGradient(x, y, x + w, y + h);
          cellGrad.addColorStop(0, "#062215");
          cellGrad.addColorStop(0.5, "#04180e");
          cellGrad.addColorStop(1, "#072e1c");

          ctx.fillStyle = cellGrad;
          ctx.beginPath();
          // Chamfered corners for genuine monocrystalline look
          const corner = 6;
          ctx.moveTo(x + corner, y);
          ctx.lineTo(x + w - corner, y);
          ctx.lineTo(x + w, y + corner);
          ctx.lineTo(x + w, y + h - corner);
          ctx.lineTo(x + w - corner, y + h);
          ctx.lineTo(x + corner, y + h);
          ctx.lineTo(x, y + h - corner);
          ctx.lineTo(x, y + corner);
          ctx.closePath();
          ctx.fill();

          // Busbars (Silver electrical collector lines)
          ctx.strokeStyle = "rgba(140, 198, 63, 0.28)";
          ctx.lineWidth = 1;
          for (let b = 1; b <= 4; b++) {
            const bx = x + (w * b) / 5;
            ctx.beginPath();
            ctx.moveTo(bx, y);
            ctx.lineTo(bx, y + h);
            ctx.stroke();
          }

          // Ultra-fine grid fingers
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 0.5;
          for (let f = 1; f <= 12; f++) {
            const fy = y + (h * f) / 13;
            ctx.beginPath();
            ctx.moveTo(x, fy);
            ctx.lineTo(x + w, fy);
            ctx.stroke();
          }
        }
      }
    }

    const cellTexture = new THREE.CanvasTexture(cellCanvas);
    cellTexture.anisotropy = 4;

    const solarGlassGeo = new THREE.PlaneGeometry(frameWidth - 0.06, frameHeight - 0.06);
    const solarGlassMat = new THREE.MeshPhysicalMaterial({
      map: cellTexture,
      roughness: 0.15,
      metalness: 0.65,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const solarGlassMesh = new THREE.Mesh(solarGlassGeo, solarGlassMat);
    solarGlassMesh.position.z = frameDepth / 2 + 0.002;
    solarGroup.add(solarGlassMesh);

    // Rear Galvanized Mounting Struts
    const strutMat = new THREE.MeshStandardMaterial({
      color: 0x8a9990,
      metalness: 0.9,
      roughness: 0.35,
    });

    const strutGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.9, 12);
    const strutLeft = new THREE.Mesh(strutGeo, strutMat);
    strutLeft.position.set(-0.7, -0.3, -0.4);
    strutLeft.rotation.x = Math.PI / 4;
    solarGroup.add(strutLeft);

    const strutRight = new THREE.Mesh(strutGeo, strutMat);
    strutRight.position.set(0.7, -0.3, -0.4);
    strutRight.rotation.x = Math.PI / 4;
    solarGroup.add(strutRight);

    // 6. Photons Energy Particle Field (Sunlight stream)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 1] = Math.random() * 2 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2 + 0.5;
      speeds[i] = 0.01 + Math.random() * 0.025;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x8cc63f,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Initial Solar tilt (optimal 24° AP latitude tilt)
    solarGroup.rotation.x = -Math.PI / 6; // ~30 deg
    solarGroup.rotation.y = Math.PI / 12;

    // Interaction State
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = solarGroup.rotation.x;
    let targetRotY = solarGroup.rotation.y;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Move specular cursor light
      cursorLight.position.x = normX * 2;
      cursorLight.position.y = normY * 1.5 + 0.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;

        // Clamp rotation
        targetRotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 6, targetRotX));
      } else {
        // Gentle cursor parallax sway
        targetRotY = Math.PI / 12 + normX * 0.25;
        targetRotX = -Math.PI / 6 - normY * 0.15;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth damping interpolation toward target
      solarGroup.rotation.x += (targetRotX - solarGroup.rotation.x) * 0.08;
      solarGroup.rotation.y += (targetRotY - solarGroup.rotation.y) * 0.08;

      // Idle floating sway if not dragging
      if (!isDragging) {
        solarGroup.position.y = Math.sin(time * 1.2) * 0.04;
      }

      // Animate solar photons flowing down
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] -= speeds[i];
        if (posArray[i * 3 + 1] < -0.8) {
          posArray[i * 3 + 1] = 2.2;
          posArray[i * 3] = (Math.random() - 0.5) * 2.8;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 1.8 + 0.3;
        }
      }
      posAttr.needsUpdate = true;

      // Dynamic light pulsation
      sunLight.intensity = 2.6 + Math.sin(time * 2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      // Disposal
      renderer.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      lipGeo.dispose();
      lipMat.dispose();
      solarGlassGeo.dispose();
      solarGlassMat.dispose();
      strutGeo.dispose();
      strutMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      cellTexture.dispose();

      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-[32px] bg-[#072A19]/80 backdrop-blur-xl border border-[rgba(255,255,255,0.16)] p-5 sm:p-6 shadow-2xl overflow-hidden text-white transition-all">
      {/* Top Bar with Mode Switcher */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.14)] gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#3F8F3A]/25 border border-[#8CC63F]/40 flex items-center justify-center text-[#8CC63F]">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold font-heading text-white">Topcon N-Type Bi-Facial</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8CC63F]/20 text-[#8CC63F] border border-[#8CC63F]/40 font-mono">
                3D Interactive
              </span>
            </div>
            <p className="text-[11px] text-[#9DB3A5]">Real-time AP Rooftop Module Visualisation</p>
          </div>
        </div>

        {/* View Switcher Pill */}
        <div className="flex items-center bg-[#04140C]/70 rounded-full p-1 border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("3d")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeTab === "3d" ? "bg-[#8CC63F] text-[#04140C] font-semibold" : "text-[#9DB3A5] hover:text-white"
            }`}
          >
            3D Model
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeTab === "specs" ? "bg-[#8CC63F] text-[#04140C] font-semibold" : "text-[#9DB3A5] hover:text-white"
            }`}
          >
            Specs
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      {activeTab === "3d" ? (
        <div className="relative">
          <div
            ref={containerRef}
            className="w-full h-[280px] sm:h-[310px] cursor-grab active:cursor-grabbing touch-none select-none relative"
            title="Click and drag to rotate the 3D Topcon solar panel"
          />

          {/* Interactive Instruction Pill Overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04140C]/80 backdrop-blur-md border border-white/10 text-[11px] text-[#8CC63F]">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Drag to rotate in 3D</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04140C]/80 backdrop-blur-md border border-white/10 text-[11px] text-[#9DB3A5]">
              <Sun className="w-3.5 h-3.5 text-[#8CC63F]" />
              <span>Optimal AP Tilt: 24°</span>
            </div>
          </div>
        </div>
      ) : (
        /* Specs View */
        <div className="py-4 space-y-3 min-h-[280px] sm:min-h-[310px] flex flex-col justify-center text-xs sm:text-sm">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
            <span className="text-[#9DB3A5]">Panel Technology</span>
            <span className="font-semibold text-[#8CC63F]">Topcon N-Type High Yield</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
            <span className="text-[#9DB3A5]">Turnkey EPC Rate</span>
            <span className="font-semibold text-[#8CC63F]">₹66,000 / kW Complete</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
            <span className="text-[#9DB3A5]">Central Subsidy</span>
            <span className="font-semibold text-[#8CC63F]">₹78,000 (≥ 3 kW)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
            <span className="text-[#9DB3A5]">Bank Loan Rate</span>
            <span className="font-semibold text-white">From 5.75% p.a. (up to ₹2 Lakh)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#04140C]/60 border border-[rgba(255,255,255,0.1)]">
            <span className="text-[#9DB3A5]">Mounting Structure</span>
            <span className="font-semibold text-white">Elevated Galvanized Steel</span>
          </div>
        </div>
      )}

      {/* Bottom Live Generation Banner */}
      <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.12)] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#9DB3A5]">
          <ShieldCheck className="w-4 h-4 text-[#8CC63F]" />
          <span>Authorised PM Surya Ghar Vendor</span>
        </div>
        <div className="text-[11px] font-mono text-[#8CC63F] bg-[#8CC63F]/10 px-2.5 py-0.5 rounded-full border border-[#8CC63F]/30">
          On-Grid AP Standard
        </div>
      </div>
    </div>
  );
}
