import Link from "next/link";
import { LandingHeader } from "@/components/LandingHeader";
import styles from "./StartPage.module.css";

export default function Landing() {
  return (
    <>
      <LandingHeader />
      <main className="container">
        <h1 className={styles.h1}>Films / Фільми</h1>
        <p className={styles.muted}>Choose language / Обери мову</p>

        <div className={styles.actions}>
          <Link className={styles.button} href="/uk/">
            Перейти українською
          </Link>
          <Link className={styles.button} href="/en/">
            Go to English
          </Link>
        </div>
      </main>
    </>
  );
}
