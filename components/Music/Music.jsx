"use client";
import styles from "./Music.module.css";
import { useRef } from "react";
import YouTubeCarousel from "./YoutubeCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Music() {
  const sectionRef = useRef(null);

  return (
    <section
      className={`${styles.section} section`}
      id="music"
      ref={sectionRef}
    >
      <div className="titleDiv">
        {" "}
        <h1 className="sectionTitle grainy-text" id={styles.musicTitle}>
          Music
        </h1>
      </div>

      <div className={styles.container}>
        <iframe
          data-testid="embed-iframe"
          title="Spotify player embed"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO2RRKl5?utm_source=generator&theme=0"
          width="90%"
          height="500px"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
      <div className={styles.container}></div>
      <YouTubeCarousel />
    </section>
  );
}
