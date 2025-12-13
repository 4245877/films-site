import Link from "next/link";
import styles from "./LandingHeader.module.css";

export function LandingHeader() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.brand}>Films / Фільми</div>
          <div className={styles.lang}>
            <Link href="/uk/">UK</Link>
            <Link href="/en/">EN</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
