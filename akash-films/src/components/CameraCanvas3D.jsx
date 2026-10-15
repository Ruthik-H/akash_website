import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

let cachedLensCanvas = null;

function getProceduralLensCanvas() {
  if (cachedLensCanvas) return cachedLensCanvas;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const cx = 256;
  const cy = 256;
  const r = 248;

  // 1. Dark outer lens housing & rim
  ctx.fillStyle = '#0a0c0e';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // 2. Beveled metal ring
  const metalGrad = ctx.createRadialGradient(cx, cy, r - 35, cx, cy, r);
  metalGrad.addColorStop(0, '#1c1f24');
  metalGrad.addColorStop(0.5, '#40464f');
  metalGrad.addColorStop(0.7, '#14161a');
  metalGrad.addColorStop(1, '#0c0e11');
  ctx.fillStyle = metalGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
  ctx.fill();

  // 3. Threaded Ring Texture
  ctx.strokeStyle = '#2b313a';
  ctx.lineWidth = 1.5;
  for (let rad = r - 32; rad > r - 55; rad -= 4) {
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 4. Matte Black Barrel
  ctx.fillStyle = '#080a0c';
  ctx.beginPath();
  ctx.arc(cx, cy, r - 58, 0, Math.PI * 2);
  ctx.fill();

  // 5. Cinema Lens Ring Lettering
  ctx.save();
  ctx.translate(cx, cy);
  const text = 'AAKU CINEMA PRIME  ·  50mm T1.5  ·  FULL FRAME  ·  Ø95mm  ·  ';
  ctx.font = 'bold 12px monospace';
  ctx.fillStyle = '#c5cdd8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const radius = r - 74;
  const step = (Math.PI * 2) / text.length;
  for (let i = 0; i < text.length; i++) {
    ctx.save();
    ctx.rotate(i * step);
    ctx.fillText(text[i], 0, -radius);
    ctx.restore();
  }
  ctx.restore();

  // 6. Deep Optical Glass Elements & Multi-Coating reflections
  const glassGrad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, r - 95);
  glassGrad.addColorStop(0, '#0a2324');
  glassGrad.addColorStop(0.35, '#09141f');
  glassGrad.addColorStop(0.7, '#070b12');
  glassGrad.addColorStop(1, '#020406');
  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 92, 0, Math.PI * 2);
  ctx.fill();

  // 7. AR Multicoating Concentric Sheens (Emerald, Magenta, Amber, Cyan)
  const coatings = [
    { rad: r - 105, color: 'rgba(16, 185, 129, 0.28)', width: 8 },
    { rad: r - 125, color: 'rgba(217, 70, 239, 0.24)', width: 6 },
    { rad: r - 145, color: 'rgba(245, 158, 11, 0.22)', width: 5 },
    { rad: r - 165, color: 'rgba(6, 182, 212, 0.25)', width: 7 },
  ];
  coatings.forEach((c) => {
    ctx.strokeStyle = c.color;
    ctx.lineWidth = c.width;
    ctx.beginPath();
    ctx.arc(cx, cy, c.rad, 0, Math.PI * 2);
    ctx.stroke();
  });

  // 8. 9 Aperture Blades in Central Pupil
  const pupilRadius = 75;
  const numBlades = 9;
  ctx.fillStyle = '#050709';
  ctx.beginPath();
  ctx.arc(cx, cy, pupilRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.2;
  for (let b = 0; b < numBlades; b++) {
    const angle = (b * Math.PI * 2) / numBlades;
    const x1 = cx + Math.cos(angle) * (pupilRadius + 15);
    const y1 = cy + Math.sin(angle) * (pupilRadius + 15);
    const x2 = cx + Math.cos(angle + 0.9) * (pupilRadius * 0.45);
    const y2 = cy + Math.sin(angle + 0.9) * (pupilRadius * 0.45);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // 9. Central Lens Curvature Highlight
  const highlightGrad = ctx.createRadialGradient(cx - 45, cy - 45, 2, cx - 35, cy - 35, 60);
  highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
  highlightGrad.addColorStop(0.3, 'rgba(16, 185, 129, 0.25)');
  highlightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = highlightGrad;
  ctx.beginPath();
  ctx.arc(cx - 35, cy - 35, 60, 0, Math.PI * 2);
  ctx.fill();

  cachedLensCanvas = canvas;
  return canvas;
}

export default function CameraCanvas3D({ onIntroComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      80
    );
    camera.position.set(0, 0, 7.5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.innerWidth > 768, // disable heavy MSAA on mobile for 60fps
        alpha: true,
        powerPreference: 'high-performance',
        precision: 'mediump',
      });
    } catch {
      if (onIntroComplete) onIntroComplete();
      return;
    }

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. High-Visibility Studio Lighting
    const keySpot = new THREE.SpotLight(0xffffff, 36);
    keySpot.position.set(4, 7, 7);
    keySpot.angle = 0.6;
    keySpot.penumbra = 0.5;
    scene.add(keySpot);

    const amberRimSpot = new THREE.SpotLight(0xff7722, 50);
    amberRimSpot.position.set(-6, -1, -2);
    amberRimSpot.angle = 0.9;
    amberRimSpot.penumbra = 0.6;
    scene.add(amberRimSpot);

    const frontFill = new THREE.DirectionalLight(0xffffff, 2.5);
    frontFill.position.set(0, 3, 6);
    scene.add(frontFill);

    const ambientLight = new THREE.AmbientLight(0x353535, 2.2);
    scene.add(ambientLight);

    // 3. Cinema Camera Rig
    const cinemaRig = new THREE.Group();

    // High-contrast Cinema Matte Titanium/Gunmetal Body
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x3a3f45,
      metalness: 0.75,
      roughness: 0.28,
    });

    // Polished Chrome/Silver Metal for mechanical rails, knobs & handles
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd8dde4,
      metalness: 0.95,
      roughness: 0.12,
    });

    // ARRI/RED Gold-Amber Anodized Focus Rings & Lens Accents
    const goldAnodizedMat = new THREE.MeshStandardMaterial({
      color: 0xff8c2a,
      emissive: 0xe5601a,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.2,
    });

    // Clean crystal optical lens element (Lightweight & zero lag)
    const lensGlassMat = new THREE.MeshStandardMaterial({
      color: 0x14181d,
      metalness: 0.85,
      roughness: 0.1,
    });

    // Red Tally Recording LED
    const tallyLedMat = new THREE.MeshBasicMaterial({
      color: 0xff1500,
    });

    // CAMERA BODY
    const bodyGeo = new THREE.BoxGeometry(2.3, 1.7, 2.8);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    cinemaRig.add(bodyMesh);

    // Side aluminum plates
    const sidePlateGeo = new THREE.BoxGeometry(0.12, 1.3, 2.2);
    const sidePlateL = new THREE.Mesh(sidePlateGeo, chromeMat);
    sidePlateL.position.set(-1.18, 0, 0);
    const sidePlateR = new THREE.Mesh(sidePlateGeo, chromeMat);
    sidePlateR.position.set(1.18, 0, 0);
    cinemaRig.add(sidePlateL);
    cinemaRig.add(sidePlateR);

    // Red Recording Button
    const tallyGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const tallyMesh = new THREE.Mesh(tallyGeo, tallyLedMat);
    tallyMesh.position.set(0.9, 0.65, 1.42);
    cinemaRig.add(tallyMesh);

    // CINEMA PRIME LENS (Optimized 20-segment geometry)
    const lensMountGeo = new THREE.CylinderGeometry(0.95, 1.05, 0.45, 20);
    const lensMount = new THREE.Mesh(lensMountGeo, chromeMat);
    lensMount.rotation.x = Math.PI / 2;
    lensMount.position.set(0, 0, 1.62);
    cinemaRig.add(lensMount);

    const lensBarrelGeo = new THREE.CylinderGeometry(0.88, 0.95, 0.6, 20);
    const lensBarrel = new THREE.Mesh(lensBarrelGeo, bodyMat);
    lensBarrel.rotation.x = Math.PI / 2;
    lensBarrel.position.set(0, 0, 2.05);
    cinemaRig.add(lensBarrel);

    const focusRingGeo = new THREE.CylinderGeometry(0.94, 0.94, 0.35, 20);
    const focusRing = new THREE.Mesh(focusRingGeo, goldAnodizedMat);
    focusRing.rotation.x = Math.PI / 2;
    focusRing.position.set(0, 0, 2.45);
    cinemaRig.add(focusRing);

    const irisRingGeo = new THREE.CylinderGeometry(0.96, 0.94, 0.25, 20);
    const irisRing = new THREE.Mesh(irisRingGeo, chromeMat);
    irisRing.rotation.x = Math.PI / 2;
    irisRing.position.set(0, 0, 2.75);
    cinemaRig.add(irisRing);

    const frontBarrelGeo = new THREE.CylinderGeometry(1.05, 0.96, 0.4, 20);
    const frontBarrel = new THREE.Mesh(frontBarrelGeo, chromeMat);
    frontBarrel.rotation.x = Math.PI / 2;
    frontBarrel.position.set(0, 0, 3.05);
    cinemaRig.add(frontBarrel);

    const glassGeo = new THREE.SphereGeometry(0.92, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const glassMesh = new THREE.Mesh(glassGeo, lensGlassMat);
    glassMesh.rotation.x = -Math.PI / 2;
    glassMesh.position.set(0, 0, 3.25);
    cinemaRig.add(glassMesh);

    // CINEMA LENS FRONT ELEMENT (Instant 0ms procedural texture + seamless high-res photo upgrade)
    const proceduralCanvas = getProceduralLensCanvas();
    const initialLensTex = new THREE.CanvasTexture(proceduralCanvas);
    initialLensTex.colorSpace = THREE.SRGBColorSpace;
    const lensFaceGeo = new THREE.CircleGeometry(0.98, 28);
    const lensFaceMat = new THREE.MeshBasicMaterial({
      map: initialLensTex,
    });
    const lensFaceMesh = new THREE.Mesh(lensFaceGeo, lensFaceMat);
    lensFaceMesh.position.set(0, 0, 3.84);
    cinemaRig.add(lensFaceMesh);

    // Asynchronously upgrade to high-res photo texture without frame drops
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/dslr-lens.jpg', (loadedTex) => {
      loadedTex.colorSpace = THREE.SRGBColorSpace;
      lensFaceMat.map = loadedTex;
      lensFaceMat.needsUpdate = true;
      initialLensTex.dispose();
    });


    // Matte Box
    const matteBoxGeo = new THREE.BoxGeometry(2.6, 2.0, 0.55);
    const matteBoxMat = new THREE.MeshStandardMaterial({
      color: 0x1f2327,
      metalness: 0.5,
      roughness: 0.4,
    });
    const matteBox = new THREE.Mesh(matteBoxGeo, matteBoxMat);
    matteBox.position.set(0, 0, 3.55);
    cinemaRig.add(matteBox);

    const topFlagGeo = new THREE.BoxGeometry(2.6, 0.08, 0.8);
    const topFlag = new THREE.Mesh(topFlagGeo, chromeMat);
    topFlag.position.set(0, 1.1, 3.75);
    topFlag.rotation.x = -0.2;
    cinemaRig.add(topFlag);

    // TOP CINE HANDLE
    const handleTopGeo = new THREE.BoxGeometry(0.32, 0.25, 2.6);
    const handleTop = new THREE.Mesh(handleTopGeo, chromeMat);
    handleTop.position.set(0, 1.45, -0.2);

    const handlePostGeo = new THREE.BoxGeometry(0.25, 0.65, 0.25);
    const handlePostF = new THREE.Mesh(handlePostGeo, chromeMat);
    handlePostF.position.set(0, 1.15, 0.7);
    const handlePostB = new THREE.Mesh(handlePostGeo, chromeMat);
    handlePostB.position.set(0, 1.15, -1.1);

    cinemaRig.add(handleTop);
    cinemaRig.add(handlePostF);
    cinemaRig.add(handlePostB);

    // V-MOUNT BATTERY
    const batteryGeo = new THREE.BoxGeometry(1.9, 1.45, 0.95);
    const batteryMesh = new THREE.Mesh(batteryGeo, bodyMat);
    batteryMesh.position.set(0, 0, -1.8);
    cinemaRig.add(batteryMesh);

    const batLockGeo = new THREE.BoxGeometry(0.3, 0.3, 0.15);
    const batLock = new THREE.Mesh(batLockGeo, goldAnodizedMat);
    batLock.position.set(0.7, 0.5, -1.3);
    cinemaRig.add(batLock);

    // 15MM BASE RAILS
    const rodGeo = new THREE.CylinderGeometry(0.09, 0.09, 4.8, 12);
    const rodL = new THREE.Mesh(rodGeo, chromeMat);
    rodL.rotation.x = Math.PI / 2;
    rodL.position.set(-0.65, -1.05, 0.8);
    const rodR = new THREE.Mesh(rodGeo, chromeMat);
    rodR.rotation.x = Math.PI / 2;
    rodR.position.set(0.65, -1.05, 0.8);
    cinemaRig.add(rodL);
    cinemaRig.add(rodR);

    // 4. CINEMATIC LENS PROJECTION BEAM
    const beamGeo = new THREE.ConeGeometry(3.6, 9.5, 20, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffaa44,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lightBeam = new THREE.Mesh(beamGeo, beamMat);
    lightBeam.rotation.x = -Math.PI / 2;
    lightBeam.position.set(0, 0, 8.2);
    cinemaRig.add(lightBeam);

    const flareRingGeo = new THREE.RingGeometry(0.1, 1.2, 20);
    const flareRingMat = new THREE.MeshBasicMaterial({
      color: 0xffe088,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flareRing = new THREE.Mesh(flareRingGeo, flareRingMat);
    flareRing.position.set(0, 0, 3.8);
    cinemaRig.add(flareRing);

    // Scaling optimized for mobile screens
    const baseScale = isMobile ? 0.54 : 0.95;
    cinemaRig.scale.set(baseScale, baseScale, baseScale);
    scene.add(cinemaRig);

    // Atmospheric Dust Particles (depthWrite disabled for zero stalls)
    const particleCount = 50;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 20;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff8c2a,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. High-Speed 60fps Animation Loop with Visibility & Intersection Optimization
    let animId;
    let isVisible = true;
    const startTimestamp = performance.now();
    const INTRO_DURATION_MS = 2200;
    let completedTriggered = false;

    const smoothEaseOut = (t) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      if (!isVisible) {
        // Paused while out of view or tab inactive — consumes 0% GPU
        animId = requestAnimationFrame(animate);
        return;
      }

      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const elapsed = (now - startTimestamp);
      const rawProgress = Math.min(elapsed / INTRO_DURATION_MS, 1);
      const timeSec = elapsed * 0.001;

      particleSystem.rotation.y = timeSec * 0.025;

      if (rawProgress < 1) {
        // Active rapid camera glide (2.2s)
        const t = smoothEaseOut(rawProgress);

        cinemaRig.position.x = THREE.MathUtils.lerp(-3.2, isMobile ? 0 : 0.4, t);
        cinemaRig.position.y = THREE.MathUtils.lerp(-0.8, isMobile ? 0.35 : 0, t);
        cinemaRig.position.z = THREE.MathUtils.lerp(-4.0, -0.3, t);

        cinemaRig.rotation.y = THREE.MathUtils.lerp(-1.3, 0.32, t);
        cinemaRig.rotation.x = THREE.MathUtils.lerp(0.25, 0.04, t);
        cinemaRig.rotation.z = THREE.MathUtils.lerp(-0.15, 0, t);

        camera.position.z = THREE.MathUtils.lerp(isMobile ? 9.5 : 8.5, isMobile ? 8.2 : 7.2, t);

        // Light Beam Projection
        if (rawProgress > 0.45 && rawProgress < 0.95) {
          const beamPhase = Math.sin(((rawProgress - 0.45) / 0.5) * Math.PI);
          beamMat.opacity = beamPhase * 0.38;
          flareRingMat.opacity = beamPhase * 0.85;
          flareRing.scale.setScalar(1 + beamPhase * 1.5);
        } else {
          beamMat.opacity = 0;
          flareRingMat.opacity = 0;
        }
      } else {
        beamMat.opacity = 0;
        flareRingMat.opacity = 0;

        if (!completedTriggered) {
          completedTriggered = true;
          if (onIntroComplete) onIntroComplete();
        }

        // Lightweight idle breathing on hero (adjusted for mobile)
        const idleTime = (now - (startTimestamp + INTRO_DURATION_MS)) * 0.001;
        cinemaRig.position.y = (isMobile ? 0.35 : 0) + Math.sin(idleTime * 1.3) * 0.05;
        cinemaRig.rotation.y = 0.32 + Math.sin(idleTime * 0.6) * 0.035;
        cinemaRig.rotation.x = 0.04 + Math.cos(idleTime * 0.9) * 0.015;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 6. Intersection Observer: Stop WebGL loop when user scrolls away from hero!
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting && document.visibilityState !== 'hidden';
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Page Visibility API: Pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState !== 'hidden';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 8. Throttled Resize Handling
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        const mobile = w < 768;
        const scale = mobile ? 0.54 : 0.95;
        cinemaRig.scale.set(scale, scale, scale);
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup & WebGL VRAM de-allocation
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);

      // Dispose all scene geometries and materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transform-gpu"
      aria-hidden="true"
    />
  );
}
