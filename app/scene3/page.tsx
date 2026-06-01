"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

const MEMORIES = [
  { src: "/images/bongda.jpg", caption: "Soccer" },
  { src: "/images/keoco.jpg", caption: "Tug of War" },
  { src: "/images/vovinam.jpeg", caption: "Vovinam" },
  { src: "/images/shuttlecock.png", caption: "Shuttlecock" },
];

export default function Scene3() {
  const router = useRouter();
  const sceneRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<HTMLDivElement>(null);
  const memoriesRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);

  const blastFire = useCallback((tx: number, ty: number, delay: number) => {
    setTimeout(() => {
      const mouth = mouthRef.current;
      const scene = sceneRef.current;
      if (!mouth || !scene) return;

      const mRect = mouth.getBoundingClientRect();
      const sRect = scene.getBoundingClientRect();
      const ox = mRect.left - sRect.left + mRect.width / 2;
      const oy = mRect.top - sRect.top + mRect.height / 2;

      for (let i = 0; i < 16; i++) {
        const dx = tx - ox + (Math.random() * 70 - 35);
        const dy = ty - oy + (Math.random() * 70 - 35);

        const types = ["fireGlow", "fireCore", "fireEmber"] as const;
        types.forEach((cls) => {
          const el = document.createElement("div");
          el.className = styles[cls];
          el.style.left = ox + "px";
          el.style.top = oy + "px";
          el.style.setProperty("--dx", dx + "px");
          el.style.setProperty("--dy", dy + "px");
          scene.appendChild(el);
          setTimeout(() => { if (el.isConnected) el.remove(); }, 1800);
        });
      }
    }, delay);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const w = scene.clientWidth;
    const h = scene.clientHeight;

    [-260, -90, 90, 260].forEach((offset, i) => {
      blastFire(w / 2 + offset, h * 0.42, i * 260);
    });

    const t1 = setTimeout(() => {
      memoriesRef.current?.classList.add(styles.show);
    }, 2000);

    const t2 = setTimeout(() => {
      speechRef.current?.classList.add(styles.show);
    }, 8000);

    const t3 = setTimeout(() => {
      blastFire(w * 0.6, h * 0.45, 0);
    }, 12000);

    const t4 = setTimeout(() => {
      router.push("/scene4");
    }, 22000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [router, blastFire]);

  return (
    <div className={styles.scene} ref={sceneRef}>
      <div className={styles.dragon}>
        <div className={styles.head}>
          <div className={`${styles.horn} ${styles.left}`} />
          <div className={`${styles.horn} ${styles.right}`} />
          <div className={`${styles.eye} ${styles.left}`} />
          <div className={`${styles.eye} ${styles.right}`} />
          <div className={styles.snout} />
          <div className={`${styles.nostril} ${styles.left}`} />
          <div className={`${styles.nostril} ${styles.right}`} />
          <div className={styles.mouth} ref={mouthRef} />
        </div>
      </div>

      <div className={styles.memories} ref={memoriesRef}>
        {MEMORIES.map((m) => (
          <div className={styles.memory} key={m.caption}>
            <Image
              src={m.src}
              alt={m.caption}
              width={150}
              height={110}
              className={styles.memoryImg}
            />
            <p className={styles.caption}>{m.caption}</p>
          </div>
        ))}
      </div>

      <div className={styles.speech} ref={speechRef}>
        <p className={styles.speechTitle}>These are the games of our school years.</p>
        <p>
          Soccer, Tug of War, Vovinam, Shuttlecock — sports that fill dusty
          schoolyards and echo with cheers.
        </p>
        <p>
          <em>
            This is what childhood looks like.
            <br />
            Fire, laughter, and fearless nights.
            <br />
            Wanna know more? Let the VIBE continue...
          </em>
        </p>
      </div>
    </div>
  );
}
