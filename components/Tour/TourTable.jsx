import tourData from "../../tourData";
import styles from "./TourTable.module.css";

export default function TourTable() {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th>Date</th>
          <th>City</th>
          <th>Venue</th>
        </tr>
      </thead>
      <tbody>
        {tourData.map((show, i) => (
          <tr key={i} className={styles.tr}>
            <td
              className={`${styles.td} ${styles.date}`}
              data-label={show.date}
            >
              {show.date}
            </td>
            <td className={styles.td} data-label={show.city}>
              {show.city}
            </td>
            <td className={styles.td} data-label={show.venue}>
              {show.venue || "TBA"}
            </td>
            <td className={styles.td}>
              <button className={`${styles.btn}`}>
                <span className={styles.button} target="#blank">
                  Tickets
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
