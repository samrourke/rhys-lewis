import { useEffect, useState, forwardRef } from "react";

const HeroVideo = forwardRef(function HeroVideo(
  { style, webMSrc, mp4Src, mobWebMSrc, mobMp4Src, poster },
  ref
) {
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

  console.log(isDesktop);

  const getVideoSource = () => {
    if (isDesktop === null) return;
    if (isDesktop) {
      return browser === null ? null : browser === "firefox" ? (
        <source src={webMSrc} type='video/webm; codecs="vp9"' />
      ) : (
        <source src={mp4Src} type="video/mp4" />
      );
    } else if (!isDesktop) {
      return browser === null ? null : browser === "firefox" ? (
        <source src={mobWebMSrc} type='video/webm; codecs="vp9"' />
      ) : (
        <source src={mobMp4Src} type="video/mp4" />
      );
    }
  };

  return (
    <video
      muted
      className={style}
      playsInline
      preload="auto"
      ref={ref}
      poster={poster}
    >
      {getVideoSource()}
    </video>
  );
});
export default HeroVideo;
