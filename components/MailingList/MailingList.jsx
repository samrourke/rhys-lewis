import styles from "./MailingList.module.css";

export default function MailingList() {
  return (
    <section className={`${styles.section}`}>
      <p>Join The Mailing List For Exclusive Something Something </p>
      <button className={`${styles.btn}`}>
        <span className={styles.button} target="#blank">
          Join The Mailing List
        </span>
      </button>
    </section>
  );
}
