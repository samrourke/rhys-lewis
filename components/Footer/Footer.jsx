"use client";
import styles from "./Footer.module.css";

import { useState } from "react";

export default function Footer() {
  const socials = [
    {
      platform: "Instagram",
      link: "https://www.instagram.com/rhyslewismusic/?hl=en",
      image: "/Socials/insta-cropped.svg",
    },

    {
      platform: "Spotify",
      link: "https://open.spotify.com/artist/4T2k9bgIoC8bbqjqiEl9vZ?si=yIdPNfZMRnOp-Dlg5LswkA",
      image: "/Socials/spotify-cropped.svg",
    },

    {
      platform: "Facebook",
      link: "https://www.facebook.com/rhyslewismusic/?locale=en_GB",
      image: "/Socials/facebook-cropped.svg",
    },
    {
      platform: "X",
      link: "https://x.com/rhyslewismusic?lang=en",
      image: "/Socials/x-cropped.svg",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenModal() {
    setIsOpen(true);
    window.dispatchEvent(new Event("lenis:pause"));
    document.body.style.overflow = "hidden";
  }
  function handleCloseModal() {
    setIsOpen(false);
    window.dispatchEvent(new Event("lenis:resume")); // ✅ resume Lenis
    document.body.style.overflow = "";
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socials}>
          {socials.map((s, i) => {
            return (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={s.platform}
              >
                <img src={s.image} alt={s.platform} className={styles.icon} />
              </a>
            );
          })}
        </div>
        <p>&copy; {new Date().getFullYear()} Rhys Lewis</p>

        <h3>
          Website Designed By{" "}
          <a
            className={styles.link}
            href="http://www.deadculture.co.uk"
            target="_blank"
          >
            Dead Culture
          </a>
        </h3>
      </div>
    </footer>
  );
}
