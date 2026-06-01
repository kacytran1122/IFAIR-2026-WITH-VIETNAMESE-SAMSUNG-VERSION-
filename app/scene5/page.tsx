"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

const TREE_LINES = [
  { text: "        |", color: "y" },
  { text: "       -+-", color: "y" },
  { text: "        A", color: "y" },
  { text: "       /=\\", color: "g" },
  { text: "      /O/*\\O", color: "mixed1" },
  { text: "     /=====\\\\", color: "g" },
  { text: "    /  O   \\", color: "g" },
  { text: "   / O O* O \\", color: "g" },
  { text: "  /============\\\\", color: "g" },
  { text: " /   *     *   \\", color: "g" },
  { text: "/ O  *  O  *  \\", color: "g" },
  { text: "/=================\\\\", color: "g" },
  { text: "       ||", color: "o" },
  { text: "      _||_", color: "o" },
];

const FOOD_ITEMS = [
  { src: "/images/xiumai.jpg", alt: "Siu Mai" },
  { src: "/images/banhtrang.jpg", alt: "Bánh Tráng" },
  { src: "/images/bun.jpg", alt: "Bún" },
  { src: "/images/banhcuon.jpg", alt: "Bánh Cuốn" },
];

const LINE_DELAY = 0.14;
const LINE_DRAW = 0.9;

export default function Scene5() {
  const router = useRouter();
  const treeRef = useRef<HTMLPreElement>(null);
  const fireRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const inkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalTreeTime = TREE_LINES.length * LINE_DELAY + LINE_DRAW;

    const t1 = setTimeout(() => {
      fireRef.current?.classList.add(styles.active);
    }, 600);

    const t2 = setTimeout(() => {
      treeRef.current?.classList.add(styles.play);
    }, 1800);

    const t3 = setTimeout(() => {
      rowRefs.current.forEach((row, i) => {
        setTimeout(() => row?.classList.add(styles.show), i * 250);
      });
    }, 1800 + totalTreeTime * 1000);

    const t4 = setTimeout(() => {
      bubbleRef.current?.classList.add(styles.show);
    }, 2200 + totalTreeTime * 1000);

    const t5 = setTimeout(() => {
      inkRef.current?.classList.add(styles.active);
    }, 8800 + totalTreeTime * 1000);

    const t6 = setTimeout(() => {
      router.push("/scene6");
    }, 10500 + totalTreeTime * 1000);

    return () => {
      [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
    };
  }, [router]);

  return (
    <div className={styles.scene}>
      <h1 className={styles.title}>
        Things We Cook
        <br />
        in Winter
      </h1>

      <div className={styles.dragonCenter}>
        <div className={styles.dragon}>
          <div className={styles.head}>
            <div className={`${styles.horn} ${styles.left}`} />
            <div className={`${styles.horn} ${styles.right}`} />
            <div className={`${styles.eye} ${styles.left}`} />
            <div className={`${styles.eye} ${styles.right}`} />
            <div className={styles.snout} />
          </div>
          <div className={styles.fire} ref={fireRef} />
        </div>

        <div className={styles.bubble} ref={bubbleRef}>
          What did you do during winter break?
          <br />
          <br />
          Vietnamese groups usually cook together DAILY — warm food, shared
          effort, and lots of memories.
          <br />
          <br />
          Now — Ready to fall in love with Vietnam? Let the golden dragon guide
          you to &quot;Hạ Long Bay&quot;...
        </div>
      </div>

      <div className={styles.container}>
        <pre className={`${styles.tree} ${styles.pause}`} ref={treeRef}>
          {TREE_LINES.map((line, i) => (
            <span
              key={i}
              className={styles.line}
              style={
                {
                  "--i": i,
                  animationDelay: `calc(${i} * ${LINE_DELAY}s)`,
                } as React.CSSProperties
              }
            >
              <TreeLine text={line.text} color={line.color} />
            </span>
          ))}
        </pre>

        <div className={styles.right}>
          {FOOD_ITEMS.map((item, i) => (
            <div
              key={item.alt}
              className={styles.foodRow}
              ref={(el) => {
                if (el) rowRefs.current[i] = el;
              }}
            >
              <span className={styles.arrow}>⟶</span>
              <Image
                src={item.src}
                alt={item.alt}
                width={160}
                height={100}
                className={styles.foodImg}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inkBloom} ref={inkRef} />
    </div>
  );
}

function TreeLine({ text, color }: { text: string; color: string }) {
  if (color === "mixed1") {
    return (
      <>
        <span className={styles.g}>{"      /O/*\\"}</span>
        <span className={styles.r}>O</span>
      </>
    );
  }
  const cls = styles[color as keyof typeof styles] || "";
  return <span className={cls}>{text}</span>;
}
