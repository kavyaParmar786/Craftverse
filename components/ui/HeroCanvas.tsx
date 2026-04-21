"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Scene setup ──────────────────────────────────────────
    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 30);

    // ── Mouse tracking ───────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    // ── Colour palette (warm craft) ───────────────────────────
    const palette = [
      0xC97B63, // terracotta
      0xE8A87C, // sand
      0xA85C45, // dark terra
      0xEDD9C5, // warm beige
      0xD4906E, // mid terra
      0xF0C9A0, // light peach
      0x8B6F5E, // taupe
      0xFAF3E8, // cream
    ];

    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    // ── 1. FLOATING PAPER SQUARES ─────────────────────────────
    const paperGroup = new THREE.Group();
    scene.add(paperGroup);

    interface PaperMesh extends THREE.Mesh {
      userData: {
        vx: number; vy: number; vz: number;
        rx: number; ry: number; rz: number;
        t: number;
        floatAmp: number; floatSpeed: number;
      };
    }

    const papers: PaperMesh[] = [];
    for (let i = 0; i < 55; i++) {
      const s  = 0.3 + Math.random() * 1.4;
      const geo = Math.random() > 0.5
        ? new THREE.PlaneGeometry(s, s * (0.7 + Math.random() * 0.6))
        : new THREE.PlaneGeometry(s * 0.6, s);

      const mat = new THREE.MeshBasicMaterial({
        color: pick(),
        transparent: true,
        opacity: 0.08 + Math.random() * 0.18,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat) as PaperMesh;
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 5,
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      mesh.userData = {
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
        vz: 0,
        rx: (Math.random() - 0.5) * 0.006,
        ry: (Math.random() - 0.5) * 0.006,
        rz: (Math.random() - 0.5) * 0.004,
        t: Math.random() * Math.PI * 2,
        floatAmp: 0.04 + Math.random() * 0.12,
        floatSpeed: 0.004 + Math.random() * 0.006,
      };
      paperGroup.add(mesh);
      papers.push(mesh);
    }

    // ── 2. ORBITING RINGS ────────────────────────────────────
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const rings: { mesh: THREE.Mesh; speed: number; axis: THREE.Vector3 }[] = [];
    for (let i = 0; i < 6; i++) {
      const r   = 4 + i * 3.2;
      const geo = new THREE.TorusGeometry(r, 0.04 + Math.random() * 0.06, 8, 80);
      const mat = new THREE.MeshBasicMaterial({
        color: palette[i % palette.length],
        transparent: true,
        opacity: 0.12 + i * 0.025,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      ringGroup.add(mesh);
      rings.push({
        mesh,
        speed: (0.0006 + Math.random() * 0.001) * (Math.random() > 0.5 ? 1 : -1),
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).normalize(),
      });
    }

    // ── 3. PARTICLE FIELD ────────────────────────────────────
    const particleCount = 280;
    const positions  = new Float32Array(particleCount * 3);
    const pColors    = new Float32Array(particleCount * 3);
    const pSizes     = new Float32Array(particleCount);
    const pVelocities: { vx: number; vy: number; t: number }[] = [];

    const tempColor = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 8;
      pSizes[i] = 1.5 + Math.random() * 3.5;

      tempColor.setHex(pick());
      pColors[i * 3]     = tempColor.r;
      pColors[i * 3 + 1] = tempColor.g;
      pColors[i * 3 + 2] = tempColor.b;

      pVelocities.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        t: Math.random() * Math.PI * 2,
      });
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(pColors, 3));
    pGeo.setAttribute("size",     new THREE.BufferAttribute(pSizes, 1));

    const pMat = new THREE.PointsMaterial({
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── 4. WAVE MESH (ink wash) ───────────────────────────────
    const waveGeo = new THREE.PlaneGeometry(80, 60, 60, 40);
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0xC97B63,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.position.z = -15;
    scene.add(wave);

    // ── 5. FLOATING CRAFT SYMBOLS (text sprites) ──────────────
    const symbols = ["✦", "◈", "◎", "❋", "✿", "◇", "✎", "◉", "❖", "✤"];
    const spriteGroup = new THREE.Group();
    scene.add(spriteGroup);

    const spriteData: { sprite: THREE.Sprite; vx: number; vy: number; t: number }[] = [];

    symbols.forEach((sym, i) => {
      const canvas2d = document.createElement("canvas");
      canvas2d.width  = 128;
      canvas2d.height = 128;
      const ctx = canvas2d.getContext("2d")!;
      ctx.clearRect(0, 0, 128, 128);
      ctx.fillStyle = `rgba(201,123,99,${0.25 + Math.random() * 0.35})`;
      ctx.font = `bold ${48 + Math.random() * 32}px serif`;
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sym, 64, 64);

      const tex = new THREE.CanvasTexture(canvas2d);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      const sc = 1.5 + Math.random() * 2;
      sprite.scale.set(sc, sc, 1);
      sprite.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 10 - 2,
      );
      spriteGroup.add(sprite);
      spriteData.push({
        sprite,
        vx: (Math.random() - 0.5) * 0.003,
        vy: 0.001 + Math.random() * 0.003,
        t: i * 0.8,
      });
    });

    // ── Animation loop ───────────────────────────────────────
    let frame = 0;
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // Camera parallax
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Paper squares
      papers.forEach(p => {
        const d = p.userData;
        d.t += d.floatSpeed;
        p.position.x += d.vx + Math.sin(d.t * 0.7) * 0.003;
        p.position.y += d.vy + Math.cos(d.t) * d.floatAmp * 0.02;
        p.rotation.x += d.rx;
        p.rotation.y += d.ry;
        p.rotation.z += d.rz;
        // Wrap
        if (p.position.x >  32) p.position.x = -32;
        if (p.position.x < -32) p.position.x =  32;
        if (p.position.y >  22) p.position.y = -22;
        if (p.position.y < -22) p.position.y =  22;
      });

      // Rings orbit
      rings.forEach(r => {
        r.mesh.rotateOnAxis(r.axis, r.speed);
      });
      // Gentle group breathe
      ringGroup.scale.setScalar(1 + Math.sin(elapsed * 0.4) * 0.015);

      // Particles drift
      const pos = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const d = pVelocities[i];
        d.t += 0.008;
        pos[i * 3]     += d.vx + Math.sin(d.t + i) * 0.001;
        pos[i * 3 + 1] += d.vy + Math.cos(d.t * 0.7 + i) * 0.001;
        if (pos[i * 3]     >  37) pos[i * 3]     = -37;
        if (pos[i * 3]     < -37) pos[i * 3]     =  37;
        if (pos[i * 3 + 1] >  27) pos[i * 3 + 1] = -27;
        if (pos[i * 3 + 1] < -27) pos[i * 3 + 1] =  27;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Wave deformation
      const wpos = waveGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < wpos.length; i += 3) {
        const ox = wpos[i];
        const oy = wpos[i + 1];
        wpos[i + 2] = Math.sin(ox * 0.15 + elapsed * 0.5) * 1.2
                    + Math.cos(oy * 0.12 + elapsed * 0.4) * 0.9
                    + Math.sin((ox + oy) * 0.08 + elapsed * 0.3) * 0.6;
      }
      waveGeo.attributes.position.needsUpdate = true;
      waveGeo.computeVertexNormals();

      // Sprites float up + wrap
      spriteData.forEach(s => {
        s.t += 0.012;
        s.sprite.position.x += s.vx + Math.sin(s.t * 0.5) * 0.004;
        s.sprite.position.y += s.vy;
        if (s.sprite.position.y > 20)  s.sprite.position.y = -20;
        if (s.sprite.position.x > 28)  s.sprite.position.x = -28;
        if (s.sprite.position.x < -28) s.sprite.position.x =  28;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}
