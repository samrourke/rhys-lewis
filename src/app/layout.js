import Navbar from "../../components/Nav/Nav";
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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
