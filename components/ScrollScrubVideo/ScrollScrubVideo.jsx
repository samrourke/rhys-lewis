// components/ScrollScrubVideo.jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollScrubVideo({
  sections = 5, // how many 100vh screens to complete the scrub
  debug = true,
  className = "",
}) {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const init = () => {
      // Pause & reset
      video.pause();
      video.currentTime = 0;

      // kill any prior triggers tied to this wrapper (hot reload safety)
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill();
      });

      const endDistance = window.innerHeight * sections;

      const tween = gsap.to(video, {
        currentTime: () => video.duration || 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${endDistance}`,
          markers: debug,
          scrub: true,
        },
      });

      return () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
      };
    };

    if (video.readyState >= 1) return init();
    const onMeta = () => init();
    video.addEventListener("loadedmetadata", onMeta, { once: true });
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, [sections, debug]);

  return (
    <section ref={wrapperRef} style={{ height: "100vh" }}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position: "fixed", // anchor it inside the pinned section

          top: 0,
          right: 0,
          left: 0,
          height: "100dvh",
          width: "auto",

          objectFit: "cover", // or "contain" if you want letterboxing
          display: "block",
          backgroundColor: "black",
          margin: 0,
          padding: 0,
        }}
      >
        {/* <source src="/output_960p24_kf12_crf34.webm" type="video/webm" />
        <source src="/output_960p24_kf12_crf22.mp4" type="video/mp4" /> */}
        <source src="/handsLoopedEncoded.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
