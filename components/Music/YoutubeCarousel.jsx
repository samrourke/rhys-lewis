"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./YoutubeCarousel.module.css";

export default function YouTubeCarousel({ videos = VIDEOS, initialIndex = 0 }) {
  const [index, setIndex] = useState(initialIndex);
  const trackRef = useRef(null);

  const clampIndex = useCallback(
    (i) => (i + videos.length) % videos.length,
    [videos.length]
  );

  const goNext = useCallback(
    () => setIndex((i) => clampIndex(i + 1)),
    [clampIndex]
  );
  const goPrev = useCallback(
    () => setIndex((i) => clampIndex(i - 1)),
    [clampIndex]
  );
  const goTo = useCallback((i) => setIndex(clampIndex(i)), [clampIndex]);

  // Keyboard navigation when carousel is focused
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Optional: basic swipe (pointer) support
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0,
      dx = 0,
      active = false;

    const down = (e) => {
      active = true;
      startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      dx = 0;
    };
    const move = (e) => {
      if (!active) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      dx = x - startX;
    };
    const up = () => {
      if (!active) return;
      active = false;
      if (dx < -50) goNext();
      else if (dx > 50) goPrev();
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    // touch fallback (Safari)
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("touchend", up);

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", up);
    };
  }, [goNext, goPrev]);

  const active = videos[index];

  return (
    <div className={styles.carousel} aria-label="YouTube video carousel">
      <button
        type="button"
        className={`${styles.nav} ${styles.prev}`}
        aria-label="Previous video"
        onClick={goPrev}
      >
        ‹‹
      </button>

      <div
        ref={trackRef}
        className={styles.stage}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={active?.title ?? "Active video"}
      >
        {/* Active Slide */}
        <Slide video={active} />

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Select video">
          {videos.map((v, i) => (
            <button
              key={v.id + "-dot"}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${v.title}`}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.nav} ${styles.next}`}
        aria-label="Next video"
        onClick={goNext}
      >
        ››
      </button>
    </div>
  );
}

/** Single active slide (mounts only when active) */
function Slide({ video }) {
  if (!video) return null;
  const { id, title } = video;

  // Build a safe embed URL (autoplay allowed only with mute)
  const src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <figure className={styles.slide}>
      <div className={styles.playerWrap}>
        <iframe
          key={id} // ensures reload when slide changes
          className={styles.player}
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </figure>
  );
}

// --- Dummy data (replace with your own) ---
const VIDEOS = [
  {
    id: "ltLRZ_TDsqY?si=7vP_uIn5Xbb-c1AL",
    title: "I Forgot Where We Were (Acoustic)",
  },
  { id: "GTP1HkobD8s?si=5-luB_KcpBlPgwuI", title: "Stranger" },
  { id: "mLZJ42Dp8F0?si=U0BF7YVS_Z-VaKYO", title: "Love In A Modern Age" },
  { id: "alFm-5Nz2qY?si=89IMnlB2N7s_Hf6g", title: "So Long Ago" },
];
