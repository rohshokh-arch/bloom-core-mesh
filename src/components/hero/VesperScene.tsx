import { useEffect, useRef } from "react";
import * as THREE from "three";

// Cheap value-noise (simplex-like feel) used for breathing + undulation
function hash(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  const xf = x - xi,
    yf = y - yi,
    zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const w = zf * zf * (3 - 2 * zf);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (i: number, j: number, k: number) => hash(xi + i, yi + j, zi + k);
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), u), lerp(c(0, 1, 0), c(1, 1, 0), u), v),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), u), lerp(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  );
}

const CYAN = new THREE.Color("#00ffff");
const PURPLE = new THREE.Color("#8800ff");

function gradientColor(x: number, y: number, extent: number, out: THREE.Color) {
  // diagonal mapping: top/left -> cyan, bottom/right -> purple
  const t = THREE.MathUtils.clamp((x - y) / (2 * extent) + 0.5, 0, 1);
  return out.copy(CYAN).lerp(PURPLE, t);
}

export default function VesperScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ---------- Phase 1: dense particle core (distorted torus) ---------- */
    const COUNT = 14000;
    const basePos = new Float32Array(COUNT * 3);
    const pPos = new Float32Array(COUNT * 3);
    const pCol = new Float32Array(COUNT * 3);
    const tmp = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const R = 1.15 + noise3(Math.cos(u) * 2, Math.sin(u) * 2, v) * 0.5;
      const r = 0.45 * Math.pow(Math.random(), 0.6);
      let x = (R + r * Math.cos(v)) * Math.cos(u);
      let y = (R + r * Math.cos(v)) * Math.sin(u) * 0.75;
      let z = r * Math.sin(v) + Math.sin(u * 3) * 0.35;
      // turbulence
      const n = noise3(x * 1.6, y * 1.6, z * 1.6);
      x += (n - 0.5) * 0.9;
      y += (noise3(y * 1.9, z * 1.9, x * 1.9) - 0.5) * 0.9;
      z += (noise3(z * 2.2, x * 2.2, y * 2.2) - 0.5) * 0.9;
      basePos[i * 3] = pPos[i * 3] = x;
      basePos[i * 3 + 1] = pPos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = pPos[i * 3 + 2] = z;
      gradientColor(x, y, 2.2, tmp);
      pCol[i * 3] = tmp.r;
      pCol[i * 3 + 1] = tmp.g;
      pCol[i * 3 + 2] = tmp.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.018,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.NormalBlending,
        sizeAttenuation: true,
      }),
    );
    group.add(points);

    /* ---------- Phase 2/3: exploded procedural wireframe surface ---------- */
    const wGeo = new THREE.IcosahedronGeometry(3.4, 12);
    const wPosAttr = wGeo.getAttribute("position") as THREE.BufferAttribute;
    const wCount = wPosAttr.count;
    const wBase = new Float32Array(wPosAttr.array);
    const wCol = new Float32Array(wCount * 3);
    for (let i = 0; i < wCount; i++) {
      gradientColor(wBase[i * 3]!, wBase[i * 3 + 1]!, 3.6, tmp);
      wCol[i * 3] = tmp.r;
      wCol[i * 3 + 1] = tmp.g;
      wCol[i * 3 + 2] = tmp.b;
    }
    wGeo.setAttribute("color", new THREE.BufferAttribute(wCol, 3));
    const wMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const wire = new THREE.Mesh(wGeo, wMat);
    wire.scale.setScalar(0.15);
    group.add(wire);

    /* ---------- interaction ---------- */
    const pointer = new THREE.Vector2(999, 999);
    const pointer3 = new THREE.Vector3(999, 999, 0);
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => pointer.set(999, 999);
    window.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerleave", onLeave);

    const onResize = () => {
      if (!mount.clientWidth) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ---------- loop ---------- */
    const clock = new THREE.Clock();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
    const wPos = wPosAttr.array as Float32Array;
    const local = new THREE.Vector3();
    let raf = 0;
    const inv = new THREE.Matrix4();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Phase 2 explosion timing
      const burst = THREE.MathUtils.clamp((t - 1.1) / 2.0, 0, 1);
      const e = easeOut(burst);
      wire.scale.setScalar(0.15 + e * 0.85);
      wMat.opacity = e * 0.55;

      // majestic rotation
      group.rotation.y = t * 0.13;
      group.rotation.x = Math.sin(t * 0.11) * 0.16;

      // pointer in object space
      pointer3.set(pointer.x, pointer.y, 0.5).unproject(camera);
      const dir = pointer3.sub(camera.position).normalize();
      const hit = camera.position.clone().add(dir.multiplyScalar(camera.position.z / -dir.z));
      inv.copy(group.matrixWorld).invert();
      hit.applyMatrix4(inv);

      // breathing core
      const bp = pPos;
      const shimmer = 0.06 + Math.sin(t * 0.8) * 0.02;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const x = basePos[i3]!,
          y = basePos[i3 + 1]!,
          z = basePos[i3 + 2]!;
        const n = noise3(x * 1.4 + t * 0.35, y * 1.4, z * 1.4 - t * 0.25) - 0.5;
        const sc = 1 + n * shimmer + e * 0.15;
        bp[i3] = x * sc;
        bp[i3 + 1] = y * sc;
        bp[i3 + 2] = z * sc;
      }
      pGeo.getAttribute("position").needsUpdate = true;

      // undulating wireframe + elastic pointer repulsion
      const near = hit.length() < 30;
      for (let i = 0; i < wCount; i++) {
        const i3 = i * 3;
        const x = wBase[i3]!,
          y = wBase[i3 + 1]!,
          z = wBase[i3 + 2]!;
        const n =
          noise3(x * 0.55 + t * 0.25, y * 0.55 - t * 0.18, z * 0.55) - 0.5;
        const n2 = noise3(x * 1.5, y * 1.5 + t * 0.4, z * 1.5) - 0.5;
        let sc = 1 + n * 0.55 + n2 * 0.18;
        let px = x * sc,
          py = y * sc,
          pz = z * sc;

        if (near) {
          local.set(px, py, pz);
          const d = local.distanceTo(hit);
          const radius = 2.2;
          if (d < radius) {
            const push = (1 - d / radius) ** 2 * 1.5;
            px += ((px - hit.x) / (d + 0.001)) * push;
            py += ((py - hit.y) / (d + 0.001)) * push;
            pz += ((pz - hit.z) / (d + 0.001)) * push;
          }
        }
        // elastic snap-back
        wPos[i3] = wPos[i3]! + (px - wPos[i3]!) * 0.12;
        wPos[i3 + 1] = wPos[i3 + 1]! + (py - wPos[i3 + 1]!) * 0.12;
        wPos[i3 + 2] = wPos[i3 + 2]! + (pz - wPos[i3 + 2]!) * 0.12;
      }
      wPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerleave", onLeave);
      renderer.dispose();
      pGeo.dispose();
      wGeo.dispose();
      wMat.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}