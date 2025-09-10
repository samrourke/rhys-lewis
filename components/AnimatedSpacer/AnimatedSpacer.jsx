"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AnimatedSpacer.module.css";
import Animations from "../Animations/Animations";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedSpacer() {
  const womanVideoRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const video = womanVideoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // iOS/Chrome autoplay friendliness; we won't actually "play", just scrub time.
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.pause();

    // Scope everything so cleanup is automatic
    const ctx = gsap.context(() => {
      // kill any prior triggers tied to this section
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });

      const PIN_LEN = 1000; // px of scroll distance to scrub across

      const makeTween = () => {
        // Guard if metadata isn’t ready yet
        const duration = video.duration || 0;
        // If the browser hasn’t parsed metadata yet, bail and wait for it
        if (!duration || !isFinite(duration)) return null;

        const tween = gsap.to(video, {
          // scrub from 0 -> full duration
          currentTime: duration,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: `bottom top`,
            scrub: true,
          },
        });

        return tween;
      };

      // If metadata is ready, create tween immediately; otherwise wait for it
      let tween = makeTween();
      if (!tween) {
        const onMeta = () => {
          tween = makeTween();
          ScrollTrigger.refresh(); // recalc after we attach the tween
          video.removeEventListener("loadedmetadata", onMeta);
        };
        video.addEventListener("loadedmetadata", onMeta);
      }

      return () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
      };
    }, section); // limit selector lookups to this section

    return () => ctx.revert();
  }, []);

  return (
    <section id="animatedSpacer" className={styles.section} ref={sectionRef}>
      <div className={styles.animationWrapper}>
        {/* <video
          ref={videoRef}
          className="video womanVideo"
          preload="auto"
          // no autoplay; GSAP scrubs currentTime instead
        >
          <source src="/Rhys/womanCropped.mp4" type="video/mp4" />
        </video> */}
        <Animations
          webMSrc="/video/womanCropped.webm"
          mp4Src="/video/womanCroppedComp.mp4"
          mobWebMSwrc="/video/womanCropped.webm"
          mobMp4Src="/video/womanCroppedComp.mp4"
          style="video womanVideo"
          poster="/video/firstframe.png"
          ref={womanVideoRef}
        />
      </div>
    </section>
  );
}
