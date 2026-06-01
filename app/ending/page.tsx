"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";

const VN = { lat: 14.06, lon: 108.28 };
const CHI = { lat: 41.88, lon: -87.63 };
const TOTAL_MS = 9200;
const ROTATE_PHASE = 0.35;

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function llToVec(latDeg: number, lonDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return {
    x: Math.cos(lat) * Math.cos(lon),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.sin(lon),
  };
}

function rotate(v: Vec3, yaw: number, pitch: number): Vec3 {
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const x = v.x * cy + v.z * sy;
  const z = -v.x * sy + v.z * cy;
  const y = v.y;
  const cx = Math.cos(pitch), sx = Math.sin(pitch);
  return { x, y: y * cx - z * sx, z: y * sx + z * cx };
}

function project(v: Vec3, cx: number, cy: number, r: number) {
  const depth = 2.6;
  const s = r / (depth - v.z);
  return { x: cx + v.x * s, y: cy - v.y * s, s };
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return { x: a.x, y: a.y, z: a.z };
  const so = Math.sin(omega);
  const s1 = Math.sin((1 - t) * omega) / so;
  const s2 = Math.sin(t * omega) / so;
  return { x: a.x * s1 + b.x * s2, y: a.y * s1 + b.y * s2, z: a.z * s1 + b.z * s2 };
}

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const easeInOut = (t: number) => {
  t = clamp01(t);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const vVN = llToVec(VN.lat, VN.lon);
const vCHI = llToVec(CHI.lat, CHI.lon);

export default function Ending() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vnLabelRef = useRef<HTMLDivElement>(null);
  const chiLabelRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const t0Ref = useRef<number | null>(null);

  const draw = useCallback((ts: number) => {
    if (!t0Ref.current) t0Ref.current = ts;
    const raw = (ts - t0Ref.current) / TOTAL_MS;
    const t = Math.min(1, raw);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const cx = w * 0.52;
    const cy = h * 0.5;
    const r = Math.min(w, h) * 0.28;

    ctx.clearRect(0, 0, w, h);

    const a = clamp01(t / ROTATE_PHASE);
    const b = t < ROTATE_PHASE ? 0 : clamp01((t - ROTATE_PHASE) / (1 - ROTATE_PHASE));
    const aE = easeInOut(a);
    const bE = easeInOut(b);

    const yawVN = -(VN.lon * Math.PI) / 180;
    const yawCHI = -(CHI.lon * Math.PI) / 180;
    const yaw = yawVN * aE + yawCHI * 0.35 * bE;
    const pitch = -0.18;

    // Draw sphere
    const g = ctx.createRadialGradient(cx - r * 0.38, cy - r * 0.38, r * 0.22, cx, cy, r);
    g.addColorStop(0, "rgba(255,255,255,0.26)");
    g.addColorStop(0.45, "rgba(120,145,255,0.10)");
    g.addColorStop(1, "rgba(0,0,0,0.62)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "rgba(110,140,255,0.10)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Draw graticule
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    ctx.strokeStyle = "rgba(255,255,255,0.10)";
    ctx.lineWidth = 1;
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let started = false;
      for (let lon = -180; lon <= 180; lon += 6) {
        const v = rotate(llToVec(lat, lon), yaw, pitch);
        if (v.z > -0.35) {
          const p = project(v, cx, cy, r);
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    for (let lon = -150; lon <= 150; lon += 30) {
      ctx.beginPath();
      let started = false;
      for (let lat = -85; lat <= 85; lat += 5) {
        const v = rotate(llToVec(lat, lon), yaw, pitch);
        if (v.z > -0.35) {
          const p = project(v, cx, cy, r);
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
    }
    ctx.restore();

    // Flight path
    if (b > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();

      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const u = (i / 100) * b;
        const vv = slerp(vVN, vCHI, u);
        const vr = rotate(vv, yaw, pitch);
        const p = project(vr, cx, cy, r);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(255,210,74,0.90)";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      const vv = slerp(vVN, vCHI, bE);
      const vr = rotate(vv, yaw, pitch);
      const pp = project(vr, cx, cy, r);

      const planeEl = planeRef.current;
      if (planeEl) {
        planeEl.style.opacity = vr.z > 0.02 ? "1" : "0.10";
        planeEl.style.left = pp.x + "px";
        planeEl.style.top = pp.y + "px";

        const vv2 = slerp(vVN, vCHI, Math.min(1, bE + 0.01));
        const vr2 = rotate(vv2, yaw, pitch);
        const pp2 = project(vr2, cx, cy, r);
        const ang = (Math.atan2(pp2.y - pp.y, pp2.x - pp.x) * 180) / Math.PI;
        planeEl.style.transform = `translate(-50%,-50%) rotate(${ang}deg)`;
      }
    } else {
      const vnRot = rotate(vVN, yaw, pitch);
      const vnP = project(vnRot, cx, cy, r);
      const planeEl = planeRef.current;
      if (planeEl) {
        planeEl.style.left = vnP.x + 14 + "px";
        planeEl.style.top = vnP.y + 10 + "px";
        planeEl.style.opacity = "0";
      }
    }

    // Labels
    const placeLabel = (el: HTMLDivElement | null, vec: Vec3) => {
      const v = rotate(vec, yaw, pitch);
      const p = project(v, cx, cy, r);
      if (el) {
        el.style.opacity = v.z > 0.05 ? "1" : "0.18";
        el.style.left = p.x + "px";
        el.style.top = p.y + "px";
      }
    };
    placeLabel(vnLabelRef.current, vVN);
    placeLabel(chiLabelRef.current, vCHI);

    if (t > 0.92) bubbleRef.current?.classList.add(styles.show);
    else bubbleRef.current?.classList.remove(styles.show);

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  const restart = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    t0Ref.current = null;
    bubbleRef.current?.classList.remove(styles.show);
    const planeEl = planeRef.current;
    if (planeEl) planeEl.style.opacity = "0";
    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    restart();

    const handleResize = () => { resize(); restart(); };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("click", restart, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", restart);
    };
  }, [restart]);

  return (
    <div className={styles.scene}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div ref={vnLabelRef} className={styles.label}>Vietnam</div>
      <div ref={chiLabelRef} className={`${styles.label} ${styles.dest}`}>
        Galesburg, USA
      </div>
      <div ref={planeRef} className={styles.plane}>✈︎</div>

      <div ref={bubbleRef} className={styles.bubble}>
        <h1 className={styles.bubbleTitle}>
          This is your IFAIR 2026 — Vietnamese Club
        </h1>

        <p className={styles.bubbleText}>
          Built with passion by <strong>Kacy &apos;29</strong> for the
          Vietnamese Club 2025–2026.
          <br />
          Every line of code carries the spirit of our culture, our people, and
          our stories.
        </p>

        <p className={styles.bubbleText}>
          Heartfelt thanks to <strong>Lam Giang &apos;29 (Jane)</strong> and{" "}
          <strong>Tra &apos;29</strong> for capturing Vietnam through their
          beautiful photos.
        </p>

        <p className={styles.bubbleText}>
          Special thanks to <strong>ICLUB EXEC 2025–2026</strong> for making
          this event possible.
        </p>

        <a
          href="https://www.instagram.com/vietnameseclub_knoxcollege/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          onClick={(e) => e.stopPropagation()}
        >
          🌏 Continue the Journey with Vietnamese Club...
        </a>
      </div>

      <div className={styles.hint}>Click anywhere to replay</div>
    </div>
  );
}
