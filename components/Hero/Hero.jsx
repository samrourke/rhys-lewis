"use client";

import styles from "./Hero.module.css";
import SVG from "./SVG";
import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import handsMask from "../SVG/masks/hands";
import Image from "next/image";
import Animations from "../Animations/Animations";

export default function Hero() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const logoRef = useRef(null);

  // Optional: warm + ensure the chosen source is properly loaded
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.load();
    v.play()
      .then(() => v.pause())
      .catch(() => {});
  }, []);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    const logo = logoRef.current;
    if (!video || !wrapper) return;

    const init = () => {
      // Pause & reset
      try {
        video.pause();
        video.currentTime = 0;
      } catch {}

      // kill any prior triggers tied to this wrapper
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill();
      });

      // safety check for SVG
      const svgEl = wrapper.querySelector("svg");
      if (!svgEl) return;

      // Initial opacity states: SVG visible, video hidden
      gsap.set(video, { opacity: 0, willChange: "opacity" });
      gsap.set(svgEl, { opacity: 1, willChange: "opacity" });

      // Length of the pinned section
      const PIN_LEN = 1500;

      // Crossfade right as scrolling begins (first 100px of scroll)
      const crossfade = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top", // as soon as user starts scrolling
          end: "+=120",
          scrub: true,
          // markers: true,
        },
      });
      crossfade
        .to(svgEl, { opacity: 0, ease: "none" }, 0)
        .to(video, { opacity: 1, ease: "none" }, 0);

      // Scrub video currentTime across the full pin length
      const tween = gsap.to(video, {
        currentTime: () => video.duration || 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: `+=${PIN_LEN}`,
          scrub: true,
          markers: false,
        },
      });

      const tl = gsap.to(logo, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          // Tie directly to page scroll
          trigger: document.documentElement,
          start: "top top",
          end: "+=40", // fully visible by ~1800px
          markers: false,
          scrub: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        crossfade?.scrollTrigger?.kill();
        crossfade?.kill();
        tween?.scrollTrigger?.kill();
        tween?.kill();
        tl?.kill();
      };
    };

    if (video.readyState >= 1) {
      init();
    } else {
      const onMeta = () => init();
      video.addEventListener("loadedmetadata", onMeta, { once: true });
      return () => video.removeEventListener("loadedmetadata", onMeta);
    }
  }, [reducedMotion]);

  // Pin the whole hero for slightly less than scroll length
  // for smooth tranisition to next section
  useEffect(() => {
    if (reducedMotion) return;

    const PIN_LEN = 1000;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${PIN_LEN}`,
      pin: true,
      pinSpacing: false,
      scrub: true,
      // markers: true,
    });
    return () => st.kill();
  }, [reducedMotion]);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.container} ref={wrapperRef}>
        <Animations
          webMSrc="/video/handsDesktop.webm"
          mp4Src="/video/handsDesktop.mp4"
          mobWebMSrc="/video/handsMobile.webm"
          mobMp4Src="/video/handsMobile.mp4"
          style={`${styles.heroVideo}`}
          poster="/video/handsFirstFrame.webp"
          ref={videoRef}
        />

        <SVG
          mask={handsMask}
          firstFrame="/video/handsFirstFrame.webp"
          viewport="0 0 1920 1080"
        />
      </div>
      <Image
        className={styles.logo}
        src={"/Rhys/logo.png"}
        width={1906}
        height={330}
        alt="Rhys Lewis Logo"
        priority
        ref={logoRef}
      />
    </section>
  );
}
