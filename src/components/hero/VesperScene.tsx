import { useEffect, useRef } from "react";
import * as THREE from "three";

// Cheap value-noise used for surface irregularities + undulation
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
  const t = THREE.MathUtils.clamp((x - y) / (2 * extent) + 0.5, 0, 1);
  return out.copy(CYAN).lerp(PURPLE, t);
}

function resolveCount() {
  if (typeof window === "undefined") return 20000;
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency ?? 4;
  const small = w < 1024 || cores <= 4;
  return small ? 6000 : 20000;
}

export default function VesperScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isSmall = window.innerWidth < 1024;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ---------- Phase 2 target: procedural wireframe surface ---------- */
    const wGeo = new THREE.IcosahedronGeometry(3.0, isSmall ? 6 : 10);
    const wPosAttr = wGeo.getAttribute("position") as THREE.BufferAttribute;
    const wCount = wPosAttr.count;
    const wBase = new Float32Array(wPosAttr.array);
    const wPos = wPosAttr.array as Float32Array;
    const wCol = new Float32Array(wCount * 3);
    const tmp = new THREE.Color();
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
    group.add(wire);

    /* ---------- Phase 1: dense particle shell ---------- */
    const COUNT = resolveCount();
    const orbPos = new Float32Array(COUNT * 3); // undisplaced shell point
    const orbNrm = new Float32Array(COUNT * 3); // outward normal
    const pPos = new Float32Array(COUNT * 3);
    const pCol = new Float32Array(COUNT * 3);
    const stagger = new Float32Array(COUNT);
    const jitter = new Float32Array(COUNT);
    const targetIdx = new Uint32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // uniform point on sphere -> hollow shell, denser silhouette by projection
      const z = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - z * z);
      const nx = s * Math.cos(a),
        ny = s * Math.sin(a),
        nz = z;

      // layered noise: big lobes + fine ripple
      const lobes = noise3(nx * 1.35 + 8, ny * 1.35 + 3, nz * 1.35 + 5) - 0.5;
      const ripple = noise3(nx * 4.2, ny * 4.2, nz * 4.2) - 0.5;
      const R = 1.85 + lobes * 1.15 + ripple * 0.22;

      const x = nx * R,
        y = ny * R * 0.94,
        zz = nz * R;
      orbPos[i * 3] = x;
      orbPos[i * 3 + 1] = y;
      orbPos[i * 3 + 2] = zz;
      orbNrm[i * 3] = nx;
      orbNrm[i * 3 + 1] = ny;
      orbNrm[i * 3 + 2] = nz;
      pPos[i * 3] = x;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = zz;

      stagger[i] = Math.random() * 0.35;
      jitter[i] = Math.random();
      targetIdx[i] = i % wCount;

      gradientColor(x, y, 2.6, tmp);
      tmp.multiplyScalar(0.42);
      pCol[i * 3] = tmp.r;
      pCol[i * 3 + 1] = tmp.g;
      pCol[i * 3 + 2] = tmp.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: isSmall ? 0.042 : 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const baseSize = pMat.size;
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    /* ---------- interaction ---------- */
    const pointer = new THREE.Vector2(999, 999);
    const pointer3 = new THREE.Vector3(999, 999, 0);
    let dragging = false;
    let lastPx = 0;
    let spin = 0;
    let parX = 0,
      parY = 0;
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (dragging) {
        spin += (e.clientX - lastPx) * 0.0009;
        lastPx = e.clientX;
      }
    };
    const onLeave = () => pointer.set(999, 999);
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastPx = e.clientX;
    };
    const onUp = () => (dragging = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    mount.addEventListener("pointerleave", onLeave);

    // re-triggerable explosion
    const HOLD = 4.2; // seconds of unstable orb
    const BURST = 2.6; // seconds of flight
    let startedAt = 0;
    const onClick = () => {
      startedAt = clock.getElapsedTime();
    };
    window.addEventListener("click", onClick);

    const onResize = () => {
      if (!mount.clientWidth) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ---------- loop ---------- */
    const clock = new THREE.Clock();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const local = new THREE.Vector3();
    const inv = new THREE.Matrix4();
    let raf = 0;
    let rot = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // global phase: 0 = orb, 1 = wireframe
      const elapsed = t - startedAt;
      const phase = reduced
        ? 1
        : THREE.MathUtils.clamp((elapsed - HOLD) / BURST, 0, 1);

      spin *= 0.94;
      rot += 0.13 / 60 + spin;
      group.rotation.y = rot;
      group.rotation.x = Math.sin(t * 0.11) * 0.16;

      // pointer parallax
      const tpx = pointer.x > 900 ? 0 : pointer.x * 0.12;
      const tpy = pointer.y > 900 ? 0 : pointer.y * 0.1;
      parX += (tpy - parX) * 0.05;
      parY += (tpx - parY) * 0.05;
      group.rotation.x += parX;
      group.rotation.y += parY;

      // pointer in object space
      pointer3.set(pointer.x, pointer.y, 0.5).unproject(camera);
      const dir = pointer3.sub(camera.position).normalize();
      const hit = camera.position
        .clone()
        .add(dir.multiplyScalar(camera.position.z / -dir.z));
      inv.copy(group.matrixWorld).invert();
      hit.applyMatrix4(inv);
      const near = hit.length() < 30;

      /* wireframe surface (targets live here even while invisible) */
      for (let i = 0; i < wCount; i++) {
        const i3 = i * 3;
        const x = wBase[i3]!,
          y = wBase[i3 + 1]!,
          z = wBase[i3 + 2]!;
        const n = noise3(x * 0.55 + t * 0.25, y * 0.55 - t * 0.18, z * 0.55) - 0.5;
        const n2 = noise3(x * 1.5, y * 1.5 + t * 0.4, z * 1.5) - 0.5;
        const spike = Math.pow(Math.abs(n) * 2, 2.2) * 0.9;
        const sc = 1 + n * 0.75 + n2 * 0.3 + spike;
        let px = x * sc,
          py = y * sc,
          pz = z * sc;

        if (near && phase > 0.5) {
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
        wPos[i3] = wPos[i3]! + (px - wPos[i3]!) * 0.12;
        wPos[i3 + 1] = wPos[i3 + 1]! + (py - wPos[i3 + 1]!) * 0.12;
        wPos[i3 + 2] = wPos[i3 + 2]! + (pz - wPos[i3 + 2]!) * 0.12;
      }
      wPosAttr.needsUpdate = true;
      // lines swell in as debris travels, then fade back so the vertices read
      const fadeIn = THREE.MathUtils.smoothstep(phase, 0.3, 0.72);
      const fadeBack = THREE.MathUtils.smoothstep(phase, 0.8, 1);
      wMat.opacity = Math.max(0, fadeIn * 0.55 - fadeBack * 0.36);
      pMat.size = baseSize * (1 - THREE.MathUtils.smoothstep(phase, 0.6, 1) * 0.3);

      /* particles: unstable orb -> burst -> wireframe */
      const tension = THREE.MathUtils.clamp(elapsed / HOLD, 0, 1);
      const breathe = 1 + Math.sin(t * 1.15) * (0.012 + tension * 0.045);
      const hotAmp = 0.12 + tension * tension * 0.75;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const ox = orbPos[i3]!,
          oy = orbPos[i3 + 1]!,
          oz = orbPos[i3 + 2]!;
        const nx = orbNrm[i3]!,
          ny = orbNrm[i3 + 1]!,
          nz = orbNrm[i3 + 2]!;

        // pre-explosion hot spots: localized swelling that quickens
        const hot =
          noise3(nx * 1.9 + t * 0.5, ny * 1.9 - t * 0.32, nz * 1.9 + t * 0.22) - 0.5;
        const swell = 1 + hot * hotAmp;
        const jx = (jitter[i]! - 0.5) * tension * tension * 0.06;

        let x = (ox * swell + nx * jx) * breathe;
        let y = (oy * swell + ny * jx) * breathe;
        let z = (oz * swell + nz * jx) * breathe;

        // phase 1: pointer dents / repels the shell
        if (near && phase < 0.6) {
          const dx = x - hit.x,
            dy = y - hit.y,
            dz = z - hit.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const radius = 1.6;
          if (d < radius) {
            const push = (1 - d / radius) ** 2 * 0.85 * (1 - phase);
            const shimmer = Math.sin(t * 9 + jitter[i]! * 20) * 0.05 * push;
            x += (dx / (d + 0.001)) * push + shimmer;
            y += (dy / (d + 0.001)) * push + shimmer;
            z += (dz / (d + 0.001)) * push;
          }
        }

        if (phase > 0) {
          // staggered per-particle progress
          const st = stagger[i]!;
          const q = THREE.MathUtils.clamp((phase - st) / (1 - st), 0, 1);
          const k = easeOut(q);
          const ti = targetIdx[i]! * 3;
          const tx = wPos[ti]!,
            ty = wPos[ti + 1]!,
            tz = wPos[ti + 2]!;
          // mid-flight outward bulge along the particle's own normal
          const arc = Math.sin(Math.PI * q) * (1.6 + jitter[i]! * 1.4);
          x = x + (tx - x) * k + nx * arc;
          y = y + (ty - y) * k + ny * arc;
          z = z + (tz - z) * k + nz * arc;
        }

        pPos[i3] = x;
        pPos[i3 + 1] = y;
        pPos[i3 + 2] = z;
      }
      pGeo.getAttribute("position").needsUpdate = true;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
      mount.removeEventListener("pointerleave", onLeave);
      renderer.dispose();
      pGeo.dispose();
      wGeo.dispose();
      wMat.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
