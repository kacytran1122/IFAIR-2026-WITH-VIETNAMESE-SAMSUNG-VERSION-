"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const FAN_ROWS = 5;
const FANS_PER_ROW = 30;

export default function Scene2() {
  const router = useRouter();
  const standsRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const stands = standsRef.current;
    if (stands) {
      for (let r = 0; r < FAN_ROWS; r++) {
        const row = document.createElement("div");
        row.className = styles.row;
        for (let i = 0; i < FANS_PER_ROW; i++) {
          const fan = document.createElement("div");
          fan.className = styles.fan;
          fan.innerHTML = `<div class="${styles.fanHead}"></div><div class="${styles.fanBody}"></div>`;
          row.appendChild(fan);
        }
        stands.appendChild(row);
      }
    }

    const timer = setTimeout(() => {
      const ball = ballRef.current;
      const goal = goalRef.current;
      if (ball && goal) {
        const goalRect = goal.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();
        const dx = goalRect.left - ballRect.left + 40;
        ball.style.transform = `translate(-50%, -50%) translateX(${dx}px)`;

        const fans = standsRef.current?.querySelectorAll<HTMLElement>(`.${styles.fan}`) ?? [];
        fans.forEach((f) => {
          if (Math.random() < 0.65) {
            f.classList.add(styles.cheer);
            setTimeout(() => f.classList.remove(styles.cheer), 700);
          }
        });
      }
    }, 1200);

    const storyTimer = setTimeout(() => {
      storyRef.current?.classList.add(styles.show);
    }, 2400);

    const transTimer = setTimeout(() => {
      transitionRef.current?.classList.add(styles.active);
    }, 8000);

    const navTimer = setTimeout(() => {
      router.push("/scene3");
    }, 9200);

    return () => {
      clearTimeout(timer);
      clearTimeout(storyTimer);
      clearTimeout(transTimer);
      clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <div className={styles.scene}>
      <div className={styles.stands} ref={standsRef} />

      <div className={styles.pitch}>
        <div className={styles.centerLine} />
        <div className={styles.centerCircle} />

        <div className={styles.goal} ref={goalRef}>
          <div className={styles.net} />
        </div>

        <div className={`${styles.player} ${styles.dragonPlayer}`}>
          <div className={`${styles.face} ${styles.dragonFace}`}>
            <div className={`${styles.eye} ${styles.left}`} />
            <div className={`${styles.eye} ${styles.right}`} />
            <div className={styles.snout} />
          </div>
          <div className={styles.leg} />
        </div>

        <div className={`${styles.player} ${styles.pandaPlayer}`}>
          <div className={`${styles.face} ${styles.pandaFace}`}>
            <div className={`${styles.patch} ${styles.left}`} />
            <div className={`${styles.patch} ${styles.right}`} />
          </div>
          <div className={styles.leg} />
        </div>

        <div className={styles.ball} ref={ballRef} />
      </div>

      <div className={styles.story} ref={storyRef}>
        <p className={styles.storyTitle}>Soccer is more than a sport here.</p>
        <p>
          When Vietnam wins, the streets turn into rivers of celebration. People
          ride through the night, flags flying — YAY!!
        </p>
        <p>
          In 2018, when Vietnam became runner-up at the U23 Asian Cup, the roads
          were not just crowded — they were filled with <strong>pride</strong>.
        </p>
        <button
          className={styles.cta}
          onClick={() => router.push("/scene3")}
        >
          WELCOME TO VIETNAMESE SPORTS →
        </button>
      </div>

      <div className={styles.ballTransition} ref={transitionRef} />
    </div>
  );
}
