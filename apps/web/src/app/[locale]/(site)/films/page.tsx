import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { getFilmTypes } from "@/lib/content/mock";
import styles from "@/components/Cards.module.css";

export const dynamicParams = false;

export default function FilmTypesPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const types = getFilmTypes();

  return (
    <>
      <h1 style={{ marginTop: 14 }}>{t(locale, "films")}</h1>
      <div className={styles.grid}>
        {types.map((ft) => (
          <Link key={ft.slug} href={`/${locale}/films/${ft.slug}/`} className={styles.card}>
            <div className={styles.cardTitle}>{ft.title[locale]}</div>
            <div className={styles.cardText}>{ft.description[locale]}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
