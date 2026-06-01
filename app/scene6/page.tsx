"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Scene6() {
  const router = useRouter();
  const speechRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => {
      speechRef.current?.classList.add(styles.show);
    }, 3200);

    const t2 = setTimeout(() => {
      if (sceneRef.current) {
        sceneRef.current.style.filter = "blur(3px) brightness(0.85)";
      }
      flightRef.current?.classList.add(styles.active);
    }, 13000);

    const t3 = setTimeout(() => {
      router.push("/ending");
    }, 14200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [router]);

  return (
    <div className={styles.scene} ref={sceneRef}>
      <div className={styles.sky} />
      <div className={styles.water} />

      <div className={styles.islands}>
        <div className={`${styles.island} ${styles.island1}`} />
        <div className={`${styles.island} ${styles.island2}`} />
        <div className={`${styles.island} ${styles.island3}`} />
      </div>

      <div className={styles.boat}>
        <div className={styles.dragonWrapper}>
          <div className={styles.dragon}>
            <div className={styles.head}>
              <div className={`${styles.horn} ${styles.left}`} />
              <div className={`${styles.horn} ${styles.right}`} />
              <div className={`${styles.eye} ${styles.left}`} />
              <div className={`${styles.eye} ${styles.right}`} />
            </div>
            <div className={styles.body} />
            <div className={styles.arm} />
          </div>
        </div>
        <div className={styles.oar} />
        <div className={styles.boatHull} />
      </div>

      <div className={styles.speech} ref={speechRef}>
        <p className={styles.speechTitle}>Welcome to Hạ Long Bay, Vietnam</p>
        <ol className={styles.facts}>
          <li>The bay is home to more than 1,600 limestone islands.</li>
          <li>Boats are the main way to get around; many trips move slowly through the bay.</li>
          <li>Many of these islands have caves people can explore by boat or kayak.</li>
          <li>Some families live in floating villages and fish in the bay every day.</li>
          <li>Hạ Long Bay is protected as a UNESCO World Heritage Site.</li>
        </ol>
        <p className={styles.invite}>
          Ever wondered what Vietnamese New Year looks like? 🌸
          <br />
          Come say hi, learn something new, and have fun with us on{" "}
          <strong>14th February 2026</strong>! ^^
        </p>
      </div>

      <div className={styles.flightTransition} ref={flightRef}>
        <div className={styles.globe} />
        <div className={styles.plane} />
      </div>
    </div>
  );
}
