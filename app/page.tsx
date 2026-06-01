"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Scene1() {
  const router = useRouter();
  const busyRef = useRef(false);

  const [lightOn, setLightOn] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [dragonOut, setDragonOut] = useState(false);
  const [lightOff, setLightOff] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  function handleCordClick() {
    if (busyRef.current) return;
    busyRef.current = true;

    setLightOn(false);
    setDoorOpen(false);
    setDragonOut(false);
    setLightOff(false);
    setTransitioning(false);

    setTimeout(() => setLightOn(true), 100);
    setTimeout(() => setDoorOpen(true), 900);
    setTimeout(() => setDragonOut(true), 1700);
    setTimeout(() => {
      setLightOn(false);
      setLightOff(true);
    }, 2800);
    setTimeout(() => setDragonOut(false), 6500);
    setTimeout(() => setDoorOpen(false), 7000);
    setTimeout(() => {
      setTransitioning(true);
      setTimeout(() => router.push("/scene2"), 1100);
    }, 7300);
  }

  const sceneClass = [
    styles.scene,
    lightOn ? styles.on : "",
    doorOpen ? styles.doorOpen : "",
    dragonOut ? styles.dragonOut : "",
    lightOff ? styles.lightOff : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={sceneClass}>
      <div className={styles.glow} />

      <div className={styles.hint}>
        <span className={styles.hintArrow}>↓</span>
        Pull the cord to begin
      </div>

      <div className={styles.lamp}>
        <div
          className={styles.cord}
          onClick={handleCordClick}
          role="button"
          tabIndex={0}
          aria-label="Pull lamp cord to start"
          onKeyDown={(e) => e.key === "Enter" && handleCordClick()}
        />
        <div className={styles.bulb} />
      </div>

      <div className={styles.wallSwitch} />

      <div className={styles.doorFrame}>
        <div className={styles.door}>
          <div className={styles.doorHandle} />
          <div className={styles.doorPanel} />
        </div>
      </div>

      <div className={styles.dragon}>
        <div className={styles.head}>
          <div className={`${styles.horn} ${styles.left}`} />
          <div className={`${styles.horn} ${styles.right}`} />
          <div className={`${styles.eye} ${styles.left}`} />
          <div className={`${styles.eye} ${styles.right}`} />
          <div className={styles.snout}>
            <div className={`${styles.nostril} ${styles.left}`} />
            <div className={`${styles.nostril} ${styles.right}`} />
          </div>
        </div>
      </div>

      <div className={styles.speech}>
        <p className={styles.speechTitle}>Hey! I&apos;m the Golden Dragon.</p>
        <p>
          A sacred symbol of Vietnam&apos;s origins, prosperity, and imperial
          strength. Born from legend, I carry the spirit of mountains and
          rivers.
        </p>
        <p>
          Come with me — I&apos;ll take you on a journey across Vietnam.{" "}
          <em>Let&apos;s begin.</em>
        </p>
      </div>

      {transitioning && (
        <div className={`${styles.transitionOverlay} ${styles.active}`}>
          <div className={styles.portal} />
        </div>
      )}
    </div>
  );
}
