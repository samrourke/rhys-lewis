import Navbar from "../../components/Nav/Nav";
import Head from "./head";
import { Fraunces, Roboto, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fraunces",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-work-sans",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${roboto.variable} ${work_sans.variable}`}
    >
      <Head />
      <body>
        <svg
          width="0"
          height="0"
          style={{ position: "absolute", visibility: "hidden" }}
        >
          <defs>
            <filter id="nnnoise-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix type="saturate" values="0" />{" "}
              {/* make noise grayscale */}
              <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
            </filter>
          </defs>
        </svg>

        <Navbar />
        {children}
      </body>
    </html>
  );
}
