"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Hero.module.css";
import IsDesktop from "../IsDesktop/IsDesktop";

export default function CloudMaskReveal({
  mask,
  mobileMask,
  firstFrame,
  mobileFirstFrame,
  view,
  mobileView,
}) {
  const maskId = `reveal-${useId()}`;
  const pathRef = useRef(null);
  const played = useRef(false);
  const imageRef = useRef(null);

  const isDesktop = IsDesktop();

  const image = isDesktop ? firstFrame : mobileFirstFrame;
  const viewport = isDesktop ? view : mobileView;
  const svgMask = isDesktop ? mask : mobileMask;
  const imageWidth = isDesktop ? "1920" : "640";
  const imageHeight = isDesktop ? "1080" : "854";

  useEffect(() => {
    if (played.current) return;
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    // path.setAttribute("stroke-dasharray", len);
    // path.setAttribute("stroke-dashoffset", len);

    const anim = path.animate(
      [{ strokeDashoffset: 10000 }, { strokeDashoffset: 0 }],
      { duration: 1600, delay: 500, easing: "linear", fill: "forwards" }
    );

    anim.onfinish = () => {
      path.setAttribute("stroke-dashoffset", "0");
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
            d={svgMask}
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
        href={image}
        loading="eager"
        className={styles.image}
        ref={imageRef}
        width={imageWidth}
        height={imageHeight}
        mask={`url(#${maskId})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
