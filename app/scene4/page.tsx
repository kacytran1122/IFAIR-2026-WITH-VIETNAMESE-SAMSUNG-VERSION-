"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Scene4() {
  const router = useRouter();
  const handRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hand = handRef.current;
    const door = doorRef.current;

    const t1 = setTimeout(() => {
      if (hand) hand.style.opacity = "1";
      hand?.classList.add(styles.knock);
    }, 500);

    const t2 = setTimeout(() => {
      hand?.classList.remove(styles.knock);
      if (hand) hand.style.opacity = "0";
    }, 2000);

    const t3 = setTimeout(() => {
      if (door) door.style.transform = "rotateY(-76deg)";
    }, 2400);

    const t4 = setTimeout(() => {
      insideRef.current?.classList.add(styles.show);
    }, 3200);

    const t5 = setTimeout(() => {
      speechRef.current?.classList.add(styles.show);
    }, 5000);

    const t6 = setTimeout(() => {
      steamRef.current?.classList.add(styles.active);
    }, 9800);

    const t7 = setTimeout(() => {
      router.push("/scene5");
    }, 11000);

    return () => {
      [t1, t2, t3, t4, t5, t6, t7].forEach(clearTimeout);
    };
  }, [router]);

  return (
    <div className={styles.scene}>
      <div className={styles.steam} ref={steamRef} />

      <div className={styles.doorFrame}>
        <div className={styles.inside} ref={insideRef}>
          <div className={styles.dragon}>
            <div className={styles.head}>
              <div className={`${styles.horn} ${styles.left}`} />
              <div className={`${styles.horn} ${styles.right}`} />
              <div className={`${styles.eye} ${styles.left}`} />
              <div className={`${styles.eye} ${styles.right}`} />
              <div className={styles.snout} />
            </div>
          </div>

          <div className={styles.table}>
            <div className={styles.bowl}>
              <div className={styles.noodles} />
              <div className={styles.meat} />
              <div className={styles.herb} />
            </div>
            <div className={styles.chopsticks}>
              <div className={styles.stick} />
              <div className={`${styles.stick} ${styles.right}`} />
            </div>
          </div>
        </div>

        <div className={styles.door} ref={doorRef}>
          <div className={styles.doorPanel} />
          <div className={styles.doorHandle} />
        </div>
      </div>

      <div className={styles.hand} ref={handRef}>
        <div className={styles.palm} />
        <div className={`${styles.finger} ${styles.f1}`} />
        <div className={`${styles.finger} ${styles.f2}`} />
        <div className={`${styles.finger} ${styles.f3}`} />
      </div>

      <div className={styles.speech} ref={speechRef}>
        <p>Stressed? Hungry? Emotionally attached to noodles?</p>
        <p>
          <strong>Bún thịt nướng</strong> has smoky pork, fresh herbs, and rice
          noodles that understand your feeling.
        </p>
        <p>
          <em>Catch it at IFair 2026 with the Vietnamese Club!!</em>
        </p>
      </div>
    </div>
  );
}
