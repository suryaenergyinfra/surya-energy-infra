"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Compass, Sun } from "lucide-react";

export function Hero3DModule() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth;
    const height = container.clientHeight || 290;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 3.6);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffae0, 2.8);
    sunLight.position.set(3, 5, 4);
    scene.add(sunLight);

    const greenFillLight = new THREE.PointLight(0x8cc63f, 2.0, 8);
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
    const frameHeight = 1.35;
    const frameDepth = 0.07;

    const frameGeo = new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x072a19,
      metalness: 0.85,
      roughness: 0.25,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    solarGroup.add(frameMesh);

    // Panel Outer Bevel Lip (Leaf-tinted metallic border)
    const lipGeo = new THREE.BoxGeometry(frameWidth + 0.04, frameHeight + 0.04, 0.02);
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0x3f8f3a,
      metalness: 0.9,
      roughness: 0.2,
    });
    lipGeo.translate(0, 0, -0.02);
    const lipMesh = new THREE.Mesh(lipGeo, lipMat);
    solarGroup.add(lipMesh);

    // Solar Cell Canvas Texture (High-res procedural Topcon wafer grid)
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

          // Monocrystalline cell gradient
          const cellGrad = ctx.createLinearGradient(x, y, x + w, y + h);
          cellGrad.addColorStop(0, "#072617");
          cellGrad.addColorStop(0.5, "#04170e");
          cellGrad.addColorStop(1, "#0a3620");

          ctx.fillStyle = cellGrad;
          ctx.beginPath();
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

          // Silver busbars (16BB Topcon standard)
          ctx.strokeStyle = "rgba(220, 240, 210, 0.85)";
          ctx.lineWidth = 1.2;
          for (let b = 1; b < 5; b++) {
            const bx = x + (w * b) / 5;
            ctx.beginPath();
            ctx.moveTo(bx, y);
            ctx.lineTo(bx, y + h);
            ctx.stroke();
          }

          // Micro-fingers
          ctx.strokeStyle = "rgba(180, 220, 170, 0.22)";
          ctx.lineWidth = 0.5;
          for (let f = 1; f < 13; f++) {
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

    // Solar Glass Surface
    const solarGlassGeo = new THREE.PlaneGeometry(frameWidth - 0.06, frameHeight - 0.06);
    const solarGlassMat = new THREE.MeshPhysicalMaterial({
      map: cellTexture,
      roughness: 0.12,
      metalness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });
    const solarGlassMesh = new THREE.Mesh(solarGlassGeo, solarGlassMat);
    solarGlassMesh.position.z = frameDepth / 2 + 0.002;
    solarGroup.add(solarGlassMesh);

    // Rear Glass (Bi-facial plate)
    const rearGlassGeo = new THREE.PlaneGeometry(frameWidth - 0.06, frameHeight - 0.06);
    const rearGlassMat = new THREE.MeshStandardMaterial({
      color: 0x072a19,
      roughness: 0.3,
      metalness: 0.4,
    });
    const rearGlassMesh = new THREE.Mesh(rearGlassGeo, rearGlassMat);
    rearGlassMesh.position.z = -frameDepth / 2 - 0.002;
    rearGlassMesh.rotation.y = Math.PI;
    solarGroup.add(rearGlassMesh);

    // Mounting Struts (AP Elevated Galvanized Structure)
    const strutMat = new THREE.MeshStandardMaterial({
      color: 0x8a9990,
      metalness: 0.85,
      roughness: 0.3,
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

    // Floating Solar Photon Particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3.5;
      positions[i * 3 + 1] = Math.random() * 2 - 0.5;
      positions[i * 3 + 2] = Math.random() * 2 + 0.3;
      speeds[i] = 0.008 + Math.random() * 0.015;
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

    // AP Standard 24° Tilt Orientation
    const defaultRotX = 0.28; // ~16° viewing angle
    const defaultRotY = -0.35; // gentle isometric presentation
    solarGroup.rotation.x = defaultRotX;
    solarGroup.rotation.y = defaultRotY;

    // Interactive Drag Orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = defaultRotY;
    let targetRotX = defaultRotX;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Specular light follow
      cursorLight.position.x = normX * 2;
      cursorLight.position.y = normY * 1.5 + 0.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        // Clamp X tilt
        targetRotX = Math.max(-0.2, Math.min(0.8, targetRotX));
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 290;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth damping toward rotation target
      if (!isDragging) {
        // Subtle ambient oscillation
        const subtleOrbit = Math.sin(time * 0.5) * 0.08;
        solarGroup.rotation.y += (targetRotY + subtleOrbit - solarGroup.rotation.y) * 0.05;
        solarGroup.rotation.x += (targetRotX - solarGroup.rotation.x) * 0.05;
      } else {
        solarGroup.rotation.y += (targetRotY - solarGroup.rotation.y) * 0.15;
        solarGroup.rotation.x += (targetRotX - solarGroup.rotation.x) * 0.15;
      }

      // Animate solar particles streaming toward the panel
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 2] -= speeds[i]; // Move toward panel (Z decreases)
        posArray[i * 3 + 1] -= speeds[i] * 0.3; // Slight downward drift

        // Reset particle when it strikes the panel
        if (posArray[i * 3 + 2] < 0.1) {
          posArray[i * 3] = (Math.random() - 0.5) * 3.5;
          posArray[i * 3 + 1] = Math.random() * 2 - 0.5;
          posArray[i * 3 + 2] = 2.0 + Math.random() * 1.5;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      dom.removeEventListener("pointerdown", handlePointerDown);

      cellTexture.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      lipGeo.dispose();
      lipMat.dispose();
      solarGlassGeo.dispose();
      solarGlassMat.dispose();
      rearGlassGeo.dispose();
      rearGlassMat.dispose();
      strutGeo.dispose();
      strutMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[270px] sm:h-[300px]">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        title="Click and drag to rotate the 3D Topcon solar panel"
      />

      {/* Floating Interactive Indicators */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none px-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#04140C]/85 backdrop-blur-md border border-white/10 text-[11px] text-[#8CC63F]">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "14s" }} />
          <span>Drag to rotate in 3D</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#04140C]/85 backdrop-blur-md border border-white/10 text-[11px] text-[#9DB3A5]">
          <Sun className="w-3.5 h-3.5 text-[#8CC63F]" />
          <span>Optimal AP Tilt: 24°</span>
        </div>
      </div>
    </div>
  );
}
