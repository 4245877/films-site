import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getFilmTypes, getFilmsByType } from "@/lib/content/mock";
import styles from "@/components/Cards.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  const types = getFilmTypes();
  const locales: Locale[] = ["uk", "en"];
  return locales.flatMap((locale) => types.map((t) => ({ locale, typeSlug: t.slug })));
}

export default function FilmsByType({
  params
}: {
  params: { locale: Locale; typeSlug: string };
}) {
  const { locale, typeSlug } = params;
  const films = getFilmsByType(typeSlug);
  const type = getFilmTypes().find((x) => x.slug === typeSlug);

  return (
    <>
      <h1 style={{ marginTop: 14 }}>{type ? type.title[locale] : "Films"}</h1>

      <div className={styles.grid}>
        {films.map((f) => (
          <Link
            key={f.slug}
            href={`/${locale}/films/${typeSlug}/${f.slug}/`}
            className={styles.card}
          >
            <div className={styles.cardTitle}>{f.title[locale]}</div>
            <div className={styles.cardText}>{f.summary[locale]}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
