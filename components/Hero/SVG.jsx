"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./Hero.module.css";
import gsap from "gsap";

export default function CloudMaskReveal({ mask, firstFrame, viewport }) {
  const maskId = `reveal-${useId()}`; // unique mask id
  const pathRef = useRef(null); // pointer to <path>
  const played = useRef(false); // has it already animated?
  const imageRef = useRef(null);

  useEffect(() => {
    if (played.current) return; // don’t run twice
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength(); // true path length
    path.setAttribute("stroke-dasharray", len);
    path.setAttribute("stroke-dashoffset", len);
    3;
    const anim = path.animate(
      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration: 1600, delay: 500, easing: "linear", fill: "forwards" }
    );

    anim.onfinish = () => {
      path.setAttribute("stroke-dashoffset", "0"); // freeze final state
      played.current = true;
    };
  }, []);

  return (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewport}
    >
      <defs>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="black" />
          <path
            ref={pathRef}
            d={mask}
            fill="none"
            stroke="white"
            strokeWidth="60"
            strokeLinecap="round"
            strokeDasharray={10000}
            strokeDashoffset={10000}
          />
        </mask>
      </defs>

      <image
        href={firstFrame}
        className={styles.image}
        ref={imageRef}
        width="1920"
        height="1080"
        mask={`url(#${maskId})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
