"use client";
import styles from "./Tour.module.css";
import TourTable from "./TourTable";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Tour() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const tableRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    const table = tableRef.current;
    if (!section || !inner || !table) return;

    const ctx = gsap.context(() => {
      const getOverflow = () => {
        const padTop = parseFloat(getComputedStyle(inner).paddingTop) || 0;
        console.log(padTop);
        const visible = window.innerHeight - padTop; // what you actually see
        const extra = Math.max(table.scrollHeight - visible, 0); // table beyond viewport
        return extra;
      };

      // reset on refresh so measurements stay correct
      ScrollTrigger.addEventListener("refreshInit", () =>
        gsap.set(table, { y: 0 })
      );

      gsap.to(table, {
        y: () => -getOverflow(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getOverflow()}`, // release when table bottom reaches viewport bottom
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div id="live-top" aria-hidden="true" />
      <section
        className={`${styles.section} section`}
        ref={sectionRef}
        id="live"
      >
        <div className={styles.tourContainer} ref={innerRef}>
          <div className={styles.tableContainer} ref={tableRef}>
            <div className={`${styles.titleDiv} titleDiv`}>
              <h1 className="sectionTitle grain">Live</h1>
            </div>
            <TourTable />
          </div>
        </div>
      </section>
    </>
  );
}
