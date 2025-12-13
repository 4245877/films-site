import Link from "next/link";
import { LandingHeader } from "@/components/LandingHeader";
import page from "@/styles/Page.module.css";

export default function Landing() {
  return (
    <>
      <LandingHeader />
      <main className="container">
        <h1 className={page.h1}>Films / Фільми</h1>
        <p className={page.muted}>Choose language / Обери мову</p>

        <div className={page.actions}>
          <Link className={page.button} href="/uk/">
            Перейти українською
          </Link>
          <Link className={page.button} href="/en/">
            Go to English
          </Link>
        </div>
      </main>
    </>
  );
}
