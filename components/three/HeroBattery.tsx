'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Renders the floating, slowly-rotating tubular battery centerpiece in the
 * hero. Plain three.js (no React Three Fiber) so the whole scene is a single
 * disposable effect — cheap to mount/unmount and easy to reason about.
 */
export default function HeroBattery({ sectionId }: { sectionId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    gsap.registerPlugin(ScrollTrigger);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.045);

    const camera = new THREE.PerspectiveCamera(
      38,
      wrap.clientWidth / wrap.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);

    // ---------- battery geometry ----------
    const batteryGroup = new THREE.Group();
    scene.add(batteryGroup);

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0c0d,
      metalness: 0.85,
      roughness: 0.28,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
      reflectivity: 0.6,
    });
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a24b,
      metalness: 1.0,
      roughness: 0.22,
      emissive: 0x3a2a0c,
      emissiveIntensity: 0.4,
    });
    const darkMat = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      metalness: 0.6,
      roughness: 0.5,
    });

    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 3.0, 64), bodyMat);
    batteryGroup.add(body);

    const ringTop = new THREE.Mesh(new THREE.TorusGeometry(1.06, 0.035, 24, 90), goldMat);
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = 1.42;
    batteryGroup.add(ringTop);

    const ringBottom = ringTop.clone();
    ringBottom.position.y = -1.42;
    batteryGroup.add(ringBottom);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.32, 48), darkMat);
    cap.position.y = 1.62;
    batteryGroup.add(cap);

    const terminal = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.28, 32), goldMat);
    terminal.position.y = 1.9;
    batteryGroup.add(terminal);

    for (let i = -1; i <= 1; i++) {
      const groove = new THREE.Mesh(new THREE.TorusGeometry(1.052, 0.008, 8, 90), goldMat);
      groove.rotation.x = Math.PI / 2;
      groove.position.y = i * 0.7;
      batteryGroup.add(groove);
    }

    batteryGroup.rotation.z = 0.06;

    // ---------- lights ----------
    scene.add(new THREE.AmbientLight(0x1a1712, 1.2));

    const rimLight = new THREE.PointLight(0xf2d38a, 26, 20, 2);
    rimLight.position.set(-3.2, 2.4, 3.5);
    scene.add(rimLight);

    const fill = new THREE.PointLight(0x4b4a55, 6, 20, 2);
    fill.position.set(3.5, -1.5, 2.5);
    scene.add(fill);

    const top = new THREE.SpotLight(0xffe9bd, 20, 15, 0.6, 0.6, 1.5);
    top.position.set(0, 6, 2);
    scene.add(top);

    // ---------- ambient particles ----------
    const pCount = 220;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xc9a24b, size: 0.02, transparent: true, opacity: 0.55 })
    );
    scene.add(particles);

    // ---------- scroll-linked progress ----------
    let scrollProgress = 0;
    const scrollTrigger = ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    // ---------- render loop ----------
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      batteryGroup.rotation.y = t * 0.22 + scrollProgress * 2.4;
      batteryGroup.position.y = -0.3 + Math.sin(t * 0.4) * 0.05;
      const s = 1 + scrollProgress * 0.55;
      batteryGroup.scale.set(s, s, s);
      camera.position.x = Math.sin(t * 0.15) * 0.3;

      particles.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // ---------- resize ----------
    const onResize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ---------- cleanup ----------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      scrollTrigger.kill();
      renderer.dispose();
      pGeo.dispose();
      bodyMat.dispose();
      goldMat.dispose();
      darkMat.dispose();
      if (renderer.domElement.parentElement === wrap) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, [sectionId]);

  return <div ref={wrapRef} className="absolute inset-0 z-[1] [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" />;
}
