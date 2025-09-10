import Image from "next/image";
import styles from "./page.module.css";
import Hero from "../../components/Hero/Hero";
import Tour from "../../components/Tour/Tour";
import AnimatedSpacer from "../../components/AnimatedSpacer/AnimatedSpacer";
import Music from "../../components/Music/Music";
import MailingList from "../../components/MailingList/MailingList";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <section className={styles.spacer}></section>

      <Tour />
      <AnimatedSpacer />
      <Music />
      <MailingList />
      <Footer />
    </div>
  );
}
