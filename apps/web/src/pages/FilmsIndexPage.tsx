import Link from "next/link";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getFilmTypes, getFilmsByType } from "@/lib/content/mock";
import styles from "./FilmsIndexPage.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "uk" }, { locale: "en" }];
}

// Локальная защита, чтобы не зависеть от runtime-экспортов из i18n.
const defaultLocale: Locale = "uk" as Locale;
function isLocale(value: string): value is Locale {
  return value === "uk" || value === "en";
}

function ukFilmsWord(n: number): string {
  const mod100 = n % 100;
  const mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 14) return "фільмів";
  if (mod10 === 1) return "фільм";
  if (mod10 >= 2 && mod10 <= 4) return "фільми";
  return "фільмів";
}

const copy: Record<
  Locale,
  {
    intro: string;
    howToTitle: string;
    howTo: string[];
    statTypes: string;
    statFilms: string;
    filmsInSection: (n: number) => string;
    note: string;
    empty: string;
  }
> = {
  uk: {
    intro:
      "Тут зібрані основні типи кіно. Натисни на картку — і перейдеш до добірки фільмів цього типу.",
    howToTitle: "Як користуватися",
    howTo: [
      "Обери тип фільмів, який тобі цікавий.",
      "Прочитай короткий опис — він підкаже, на що звернути увагу.",
      "Відкрий добірку та подивись приклади.",
    ],
    statTypes: "типи",
    statFilms: "фільми",
    filmsInSection: (n) => `${n} ${ukFilmsWord(n)}`,
    note: "Дані на цій сторінці навчальні (mock).",
    empty: "Нічого не знайдено",
  },
  en: {
    intro:
      "Here are the main film types. Click a card to open a curated list of films for that type.",
    howToTitle: "How to use",
    howTo: [
      "Choose a film type you’re interested in.",
      "Read the short description to understand the focus.",
      "Open the list and explore examples.",
    ],
    statTypes: "types",
    statFilms: "films",
    filmsInSection: (n) => `${n} ${n === 1 ? "film" : "films"}`,
    note: "This page uses educational mock data.",
    empty: "Nothing found",
  },
};

// Next.js 15: params теперь Promise
type Props = {
  params: Promise<{ locale: string }>;
};

export default async function FilmTypesPage({ params }: Props) {
  const resolvedParams = await params;

  const safeLocale: Locale = isLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const heading = t(safeLocale, "films");
  if (!heading) {
    throw new Error(`[films] t(locale,"films") is undefined for locale=${safeLocale}`);
  }

  const types = getFilmTypes();
  if (!types) {
    throw new Error(`[films] getFilmTypes() is undefined for locale=${safeLocale}`);
  }

  const typeCount = types.length;
  const totalFilms = types.reduce((sum, ft) => sum + getFilmsByType(ft.slug).length, 0);
  const c = copy[safeLocale];
  const emptyMessage = t(safeLocale, "notFound") || c.empty;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.h1}>{heading}</h1>
        <p className={styles.heroText}>{c.intro}</p>

        <div className={styles.stats} aria-label="Stats">
          <div className={styles.stat}>
            <span className={styles.statValue}>{typeCount}</span>
            <span className={styles.statLabel}>{c.statTypes}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalFilms}</span>
            <span className={styles.statLabel}>{c.statFilms}</span>
          </div>
        </div>
      </header>

      <div className={styles.grid} data-empty-message={emptyMessage}>
        {types.map((ft) => {
          const title = ft?.title?.[safeLocale];
          if (!title) {
            throw new Error(
              `[films] ft.title[locale] is undefined for locale=${safeLocale}, slug=${ft?.slug}`
            );
          }

          const description = ft?.description?.[safeLocale];
          if (description == null) {
            throw new Error(
              `[films] ft.description[locale] is undefined for locale=${safeLocale}, slug=${ft?.slug}`
            );
          }

          const filmsInType = getFilmsByType(ft.slug).length;

          return (
            <Link
              key={ft.slug}
              href={`/${safeLocale}/films/${ft.slug}/`}
              className={styles.card}
              aria-label={`${title} — ${c.filmsInSection(filmsInType)}`}
            >
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.cardText}>{description}</div>

              <div className={styles.cardMetaRow}>
                <span className={styles.pill}>{c.filmsInSection(filmsInType)}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.howToTitle}</h2>
        <ul className={styles.list}>
          {c.howTo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.note}>{c.note}</p>
      </section>
    </div>
  );
}
