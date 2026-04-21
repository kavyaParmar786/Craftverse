"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas({ fullPage = false }: { fullPage?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 32);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const palette = [
      0xC97B63, 0xE8A87C, 0xA85C45,
      0xEDD9C5, 0xD4906E, 0xF0C9A0,
      0x8B6F5E, 0xFAF3E8, 0xC4875A, 0xB8725C,
    ];
    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    // ── 1. FLOATING PAPER SQUARES ─────────────────────────────
    interface PaperData {
      vx: number; vy: number;
      rx: number; ry: number; rz: number;
      t: number; amp: number; spd: number;
    }
    const papers: { mesh: THREE.Mesh; d: PaperData }[] = [];
    for (let i = 0; i < 70; i++) {
      const s = 0.25 + Math.random() * 1.8;
      const geo = new THREE.PlaneGeometry(s, s * (0.6 + Math.random() * 0.8));
      const mat = new THREE.MeshBasicMaterial({
        color: pick(), transparent: true,
        opacity: 0.06 + Math.random() * 0.16,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 22 - 5,
      );
      mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
      const d: PaperData = {
        vx: (Math.random()-0.5)*0.005,
        vy: (Math.random()-0.5)*0.005,
        rx: (Math.random()-0.5)*0.007,
        ry: (Math.random()-0.5)*0.007,
        rz: (Math.random()-0.5)*0.005,
        t:  Math.random()*Math.PI*2,
        amp: 0.05 + Math.random()*0.14,
        spd: 0.004 + Math.random()*0.007,
      };
      scene.add(mesh);
      papers.push({ mesh, d });
    }

    // ── 2. ORBITING RINGS ────────────────────────────────────
    const rings: { mesh: THREE.Mesh; spd: number; axis: THREE.Vector3 }[] = [];
    for (let i = 0; i < 7; i++) {
      const geo = new THREE.TorusGeometry(3.5 + i * 3, 0.03 + Math.random()*0.07, 8, 100);
      const mat = new THREE.MeshBasicMaterial({
        color: palette[i % palette.length], transparent: true,
        opacity: 0.1 + i * 0.022,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
      scene.add(mesh);
      rings.push({
        mesh, spd: (0.0005+Math.random()*0.001)*(Math.random()>0.5?1:-1),
        axis: new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize(),
      });
    }

    // ── 3. PARTICLES ─────────────────────────────────────────
    const N = 350;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const sz  = new Float32Array(N);
    const pv: { vx: number; vy: number; t: number }[] = [];
    const tc = new THREE.Color();
    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random()-0.5)*80;
      pos[i*3+1] = (Math.random()-0.5)*60;
      pos[i*3+2] = (Math.random()-0.5)*30 - 10;
      sz[i] = 1.5 + Math.random()*4;
      tc.setHex(pick());
      col[i*3]=tc.r; col[i*3+1]=tc.g; col[i*3+2]=tc.b;
      pv.push({ vx:(Math.random()-0.5)*0.003, vy:(Math.random()-0.5)*0.003, t:Math.random()*Math.PI*2 });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    pGeo.setAttribute("size",     new THREE.BufferAttribute(sz,  1));
    const pMat = new THREE.PointsMaterial({ vertexColors:true, sizeAttenuation:true, transparent:true, opacity:0.6 });
    scene.add(new THREE.Points(pGeo, pMat));

    // ── 4. WAVE MESH ─────────────────────────────────────────
    const wGeo = new THREE.PlaneGeometry(90, 70, 70, 50);
    const wMat = new THREE.MeshBasicMaterial({ color:0xC97B63, wireframe:true, transparent:true, opacity:0.035 });
    const wave = new THREE.Mesh(wGeo, wMat);
    wave.position.z = -18;
    scene.add(wave);

    // ── 5. CRAFT SYMBOL SPRITES ───────────────────────────────
    const syms = ["✦","◈","◎","❋","✿","◇","✎","◉","❖","✤","⟡","◌"];
    const sData: { sp: THREE.Sprite; vx: number; vy: number; t: number }[] = [];
    syms.forEach((sym, i) => {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 128;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0,0,128,128);
      ctx.fillStyle = `rgba(201,123,99,${0.2+Math.random()*0.4})`;
      ctx.font = `bold ${44+Math.random()*36}px serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(sym, 64, 64);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map:new THREE.CanvasTexture(cv), transparent:true }));
      const sc = 1.4+Math.random()*2.2;
      sp.scale.set(sc, sc, 1);
      sp.position.set((Math.random()-0.5)*55,(Math.random()-0.5)*40,(Math.random()-0.5)*12-3);
      scene.add(sp);
      sData.push({ sp, vx:(Math.random()-0.5)*0.003, vy:0.0008+Math.random()*0.003, t:i*0.9 });
    });

    // ── Animate ──────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const loop = () => {
      animId = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;
      camera.position.x += (mouse.x * 3.5 - camera.position.x) * 0.018;
      camera.position.y += (-mouse.y * 2.5 - camera.position.y) * 0.018;
      camera.lookAt(scene.position);

      // Papers
      papers.forEach(({ mesh, d }) => {
        d.t += d.spd;
        mesh.position.x += d.vx + Math.sin(d.t*0.6)*0.003;
        mesh.position.y += d.vy + Math.cos(d.t)*d.amp*0.018;
        mesh.rotation.x += d.rx; mesh.rotation.y += d.ry; mesh.rotation.z += d.rz;
        if (mesh.position.x >  38) mesh.position.x = -38;
        if (mesh.position.x < -38) mesh.position.x =  38;
        if (mesh.position.y >  28) mesh.position.y = -28;
        if (mesh.position.y < -28) mesh.position.y =  28;
      });

      // Rings
      rings.forEach(r => { r.mesh.rotateOnAxis(r.axis, r.spd); });

      // Particles
      const pa = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < N; i++) {
        pv[i].t += 0.007;
        pa[i*3]   += pv[i].vx + Math.sin(pv[i].t+i)*0.001;
        pa[i*3+1] += pv[i].vy + Math.cos(pv[i].t*0.7+i)*0.001;
        if (pa[i*3]   >  42) pa[i*3]   = -42;
        if (pa[i*3]   < -42) pa[i*3]   =  42;
        if (pa[i*3+1] >  32) pa[i*3+1] = -32;
        if (pa[i*3+1] < -32) pa[i*3+1] =  32;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Wave
      const wp = wGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < wp.length; i += 3) {
        wp[i+2] = Math.sin(wp[i]*0.14+t*0.5)*1.4
                + Math.cos(wp[i+1]*0.11+t*0.38)*1.0
                + Math.sin((wp[i]+wp[i+1])*0.07+t*0.28)*0.7;
      }
      wGeo.attributes.position.needsUpdate = true;

      // Sprites
      sData.forEach(s => {
        s.t += 0.01;
        s.sp.position.x += s.vx + Math.sin(s.t*0.5)*0.004;
        s.sp.position.y += s.vy;
        if (s.sp.position.y >  22) s.sp.position.y = -22;
        if (s.sp.position.x >  30) s.sp.position.x = -30;
        if (s.sp.position.x < -30) s.sp.position.x =  30;
      });

      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w/h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
    }} />
  );
}
