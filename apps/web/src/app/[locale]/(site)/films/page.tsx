import Link from "next/link";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getFilmTypes } from "@/lib/content/mock";
import styles from "@/components/Cards.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "uk" }, { locale: "en" }];
}

// Локальная защита, чтобы не зависеть от runtime-экспортов из i18n.
const defaultLocale: Locale = "uk" as Locale;
function isLocale(value: string): value is Locale {
  return value === "uk" || value === "en";
}

export default function FilmTypesPage({ params }: { params: { locale: string } }) {
  const safeLocale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;

  // Временная диагностика: быстро поймём, что именно стало undefined.
  const heading = t(safeLocale, "films");
  if (!heading) {
    throw new Error(`[films] t(locale,"films") is undefined for locale=${safeLocale}`);
  }

  const types = getFilmTypes();
  if (!types) {
    throw new Error(`[films] getFilmTypes() is undefined for locale=${safeLocale}`);
  }

  return (
    <>
      <h1 style={{ marginTop: 14 }}>{heading}</h1>

      <div className={styles.grid}>
        {types.map((ft) => {
          const title = ft?.title?.[safeLocale];
          if (!title) {
            throw new Error(`[films] ft.title[locale] is undefined for locale=${safeLocale}, slug=${ft?.slug}`);
          }

          const description = ft?.description?.[safeLocale];
          if (description == null) {
            throw new Error(`[films] ft.description[locale] is undefined for locale=${safeLocale}, slug=${ft?.slug}`);
          }

          return (
            <Link key={ft.slug} href={`/${safeLocale}/films/${ft.slug}/`} className={styles.card}>
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.cardText}>{description}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
