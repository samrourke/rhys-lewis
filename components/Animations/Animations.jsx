import { useEffect, useState, forwardRef } from "react";
import IsDesktop from "../IsDesktop/IsDesktop";

const HeroVideo = forwardRef(function HeroVideo(
  { style, webMSrc, mp4Src, mobWebMSrc, mobMp4Src },
  ref
) {
  const [browser, setBrowser] = useState(null);

  //IsDestop function returns true for desktop and false for mobile/ipad
  const device = IsDesktop();

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
  }, []);

  const getVideoSource = () => {
    if (device === null) return;
    if (device) {
      return browser === null ? null : browser === "firefox" ? (
        <source src={webMSrc} type='video/webm; codecs="vp9"' />
      ) : (
        <source src={mp4Src} type="video/mp4" />
      );
    } else if (!device) {
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
      autoPlay
      preload="auto"
      ref={ref}
    >
      {getVideoSource()}
    </video>
  );
});
export default HeroVideo;
