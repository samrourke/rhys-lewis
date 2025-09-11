"use client";
import { useState, useEffect } from "react";

export default function IsDesktop() {
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    const device = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    setIsDesktop(device);
  }, []);

  return isDesktop;
}
