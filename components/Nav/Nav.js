"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Nav.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navRefs = useRef([]);

  const [active, setActive] = useState(null);

  console.log(active);

  /*Fade in the Navbar on Scroll */
  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const nav = navRef.current;
    if (!nav) return;

    if (reduce || active === "blog" || active === "blogPage") {
      // Respect reduced motion: just show it
      gsap.set(nav, { opacity: 1 });
      nav.style.pointerEvents = "auto";
      return;
    }

    // Start fully transparent + non-interactive
    gsap.set(nav, { opacity: 0 });
    nav.style.pointerEvents = "none";

    const tween = gsap.to(nav, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        // Tie directly to page scroll
        trigger: document.documentElement,
        start: "+=800",
        end: "+=300", // fully visible by ~1800px
        markers: false,
        scrub: true,
        onUpdate: (self) => {
          // enable clicks once mostly visible
          nav.style.pointerEvents = self.progress >= 0.85 ? "auto" : "none";
        },
      },
    });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [active]);

  /*Intersection Observer for active Nav underline */

  useEffect(() => {
    // 1) Find the sections to observe
    const sectionEls = Array.from(document.querySelectorAll(".section"));
    //if no sections, esacape
    if (!sectionEls.length) return;

    //observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    // 4) Observe each element
    sectionEls.forEach((el) => observer.observe(el));

    //disconnect observer
    return () => observer.disconnect();
  }, []);

  function handleLinkClick(link) {
    setActive(link);
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }

  function handleToggle() {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return newState;
    });
  }

  return (
    <nav ref={navRef} className={styles.navbar}>
      <button
        className={`${styles.toggleButton} ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Link href="/" onClick={() => handleLinkClick("")}>
        <Image
          className={styles.logo}
          src={"/Rhys/logo.png"}
          width={1906}
          height={330}
          alt="Rhys Lewis Logo"
          priority
          style={{ display: isOpen ? "none" : "block" }}
        />
      </Link>

      <ul className={`${styles.navList} ${isOpen ? styles.active : ""}`}>
        <li className={active === "live" ? styles.active : null}>
          <Link href="/#live-top" onClick={() => handleLinkClick("live")}>
            <Image className={styles.navImg} src="/Rhys/live.png" alt="Live" />
          </Link>
        </li>
        <li className={active === "music" ? styles.active : null}>
          <Link href="/#music" onClick={() => handleLinkClick("music")}>
            <Image
              className={styles.navImg}
              src="/Rhys/music.png"
              alt="Music"
            />
          </Link>
        </li>
        <li className={active === "blog" ? styles.active : null}>
          <Link href="/blog" onClick={() => handleLinkClick("blog")}>
            <Image className={styles.navImg} src="/Rhys/blog.png" alt="Music" />
          </Link>
        </li>
        <li>
          <Link
            href="https://shop.rhyslewisofficial.com"
            target="#blank"
            onClick={() => handleLinkClick("live")}
          >
            <Image
              className={styles.navImg}
              src="/Rhys/merch.png"
              alt="Merch"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
