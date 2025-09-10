import { useEffect, useState, forwardRef } from "react";
import styles from "./Hero.module.css";

const HeroVideo = forwardRef(function HeroVideo(props, ref) {
  //Must only set the video source once to avoid multiple sources being used
  //and hyrdration issues as the client side code won't match server side.

  //detect browser in a useEffect so that it is carried out after loading.
  //determine if the user is on a desktop to load larger image file.

  //Set video source ONCE and then render.

  const [browser, setBrowser] = useState(null);
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Firefox")) {
      setBrowser("firefox");
    } else if (userAgent.includes("Chrome") && !userAgent.includes("Edge")) {
      setBrowser("chrome");
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      setBrowser("safari");
    } else {
      setBrowser("other");
    }

    const device = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    setIsDesktop(device);
  }, []);

  const getVideoSource = () => {
    if (!isDesktop) {
      return browser === "firefox" ? (
        <source src="/video/handsMobile.webm" type='video/webm; codecs="vp9"' />
      ) : (
        <source src="/video/handsMobile.mp4" type="video/mp4" />
      );
    } else {
      return browser === "firefox" ? (
        <source
          src="/video/handsDesktop.webm"
          type='video/webm; codecs="vp9"'
        />
      ) : (
        <source src="/video/handsDesktop.mp4" type="video/mp4" />
      );
    }
  };

  return (
    <video
      muted
      className={styles.heroVideo}
      playsInline
      preload="auto"
      ref={ref} // forward ref to video element
      poster="/video/firstframe.png"
    >
      {getVideoSource()}
    </video>
  );
});

export default HeroVideo;
