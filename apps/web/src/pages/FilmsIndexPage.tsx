// FilmsIndexPage.tsx
import Link from "next/link";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import styles from "./FilmsIndexPage.module.css";
import { apiGet } from "@/lib/api";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "uk" }, { locale: "en" }];
}

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

    allFilmsTitle: string;
    allFilmsIntro: string;
    filmMeta: (year?: number) => string;
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
    note: "Дані на цій сторінці беруться з CMS (Strapi).",
    empty: "Нічого не знайдено",

    allFilmsTitle: "Усі фільми",
    allFilmsIntro: "Нижче — повний список фільмів, доступних у базі (Strapi).",
    filmMeta: (year) => (typeof year === "number" ? `Рік: ${year}` : "Рік: —"),
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
    note: "This page pulls data from CMS (Strapi).",
    empty: "Nothing found",

    allFilmsTitle: "All films",
    allFilmsIntro:
      "Below is the full list of films available in the database (Strapi).",
    filmMeta: (year) => (typeof year === "number" ? `Year: ${year}` : "Year: —"),
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

// Strapi v5 response (в реальности поля лежат прямо в объекте)
type FilmTypeApi = {
  id: number;
  documentId?: string;
  slug: string;

  titleUk?: string;
  titleEn?: string;
  descriptionUk?: string;
  descriptionEn?: string;
  order?: number;

  films?: any;
};

type FilmApi = {
  id: number;
  documentId?: string;

  slug?: string;

  titleUk?: string;
  titleEn?: string;
  title?: string;
  name?: string;

  year?: number | string;
  releaseYear?: number | string;
  release_year?: number | string;

  [key: string]: any;
};

type ApiResponse<T> = {
  data: T[];
  meta: any;
};

function extractFilmsCount(ft: any): number {
  const films = ft?.films;

  // Strapi shape A: films: { data: [...] }
  const a = films?.data;
  if (Array.isArray(a)) return a.length;

  // Shape B: films: [...]
  if (Array.isArray(films)) return films.length;

  // Shape C: no populate
  return 0;
}

function pickFirstString(...vals: unknown[]): string | undefined {
  for (const v of vals) {
    if (typeof v === "string") {
      const s = v.trim();
      if (s) return s;
    }
  }
  return undefined;
}

function toNumberOrUndef(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function filmTitleByLocale(f: FilmApi, locale: Locale): string {
  const uk = pickFirstString(f.titleUk, f.title);
  const en = pickFirstString(f.titleEn, f.title);

  const fallback = pickFirstString(f.name) || "(no title)";

  return locale === "uk" ? uk || en || fallback : en || uk || fallback;
}

function filmYear(f: FilmApi): number | undefined {
  return (
    toNumberOrUndef(f.year) ??
    toNumberOrUndef(f.releaseYear) ??
    toNumberOrUndef(f.release_year)
  );
}

function filmKey(f: FilmApi): string {
  const k = pickFirstString(f.slug, f.documentId, String(f.id));
  return k || String(f.id);
}

/**
 * ====== Covers / posters ======
 * Strapi медиа бывает разной формы (v4/v5, data/attributes, массивы и т.д.)
 * Здесь — максимально терпимая раскрутка до URL.
 */
type MediaInfo = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

function strapiBaseUrl(): string {
  // Подстройка под разные названия env, чтобы не зависеть от конкретной конфигурации
  const base = pickFirstString(
    process.env.NEXT_PUBLIC_STRAPI_URL,
    process.env.NEXT_PUBLIC_STRAPI_API_URL,
    process.env.NEXT_PUBLIC_API_URL,
    process.env.STRAPI_URL
  );
  return (base || "").replace(/\/+$/, "");
}

function toAbsoluteUrl(u: string): string {
  if (!u) return u;
  if (/^https?:\/\//i.test(u)) return u;

  const base = strapiBaseUrl();
  if (!base) return u; // если у тебя есть rewrite на /uploads — это тоже сработает

  if (u.startsWith("/")) return `${base}${u}`;
  return `${base}/${u}`;
}

function unwrapStrapiMedia(input: any): any {
  if (!input) return undefined;

  // Strapi: { data: ... }
  if (input?.data) {
    const d = input.data;
    if (Array.isArray(d)) return d[0];
    return d;
  }

  // Массив медиа
  if (Array.isArray(input)) return input[0];

  return input;
}

function extractMediaInfo(media: any): MediaInfo | undefined {
  const m0 = unwrapStrapiMedia(media);
  if (!m0) return undefined;

  // v4: { attributes: { ... } } или v5: { ... }
  const m = m0.attributes ?? m0;

  const formats = m?.formats;
  const url = pickFirstString(
    formats?.small?.url,
    formats?.medium?.url,
    formats?.thumbnail?.url,
    m?.url,
    m?.src
  );
  if (!url) return undefined;

  const alt = pickFirstString(
    m?.alternativeText,
    m?.alt,
    m?.caption,
    m?.name,
    m0?.alternativeText,
    m0?.name
  );

  const width =
    toNumberOrUndef(formats?.small?.width) ??
    toNumberOrUndef(formats?.medium?.width) ??
    toNumberOrUndef(m?.width);
  const height =
    toNumberOrUndef(formats?.small?.height) ??
    toNumberOrUndef(formats?.medium?.height) ??
    toNumberOrUndef(m?.height);

  return { url: toAbsoluteUrl(url), alt, width, height };
}

function filmCoverInfo(f: FilmApi): MediaInfo | undefined {
  // Пожалуйста, если у тебя поле в Strapi называется иначе — просто добавь ключ сюда.
  const candidates = [
    f.cover,
    f.poster,
    f.posterImage,
    f.coverImage,
    f.image,
    f.mainImage,
    f.heroImage,
    f.thumbnail,
    f.preview,
    f.images,
    f.gallery,
  ];

  for (const c of candidates) {
    const info = extractMediaInfo(c);
    if (info?.url) return info;
  }

  // Иногда медиа лежит глубже
  const nested = [
    f.media?.cover,
    f.media?.poster,
    f.media?.image,
    f.media?.thumbnail,
  ];
  for (const c of nested) {
    const info = extractMediaInfo(c);
    if (info?.url) return info;
  }

  return undefined;
}

function initials(title: string): string {
  const s = (title || "").trim();
  if (!s) return "•";
  const parts = s.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? s[0];
  const b = parts.length > 1 ? parts[1]?.[0] : "";
  return (a + b).toUpperCase();
}

async function fetchAllFilms(): Promise<FilmApi[]> {
  // Для обложек нужен populate.
  // Самый “безопасный” вариант при неизвестных именах медиа-полей — populate=*
  const pageSize = 100;
  const out: FilmApi[] = [];

  for (let page = 1; page <= 50; page++) {
    const resp = await apiGet<ApiResponse<FilmApi>>(
      `/api/films?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
    );

    const batch = resp.data || [];
    out.push(...batch);

    const pageCount: number | undefined = resp.meta?.pagination?.pageCount;
    if (!pageCount) break;
    if (page >= pageCount) break;
  }

  const seen = new Set<string>();
  return out.filter((f) => {
    const k = filmKey(f);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export default async function FilmTypesPage({ params }: Props) {
  const resolvedParams = await params;

  const safeLocale: Locale = isLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const heading = t(safeLocale, "films");
  if (!heading) {
    throw new Error(
      `[films] t(locale,"films") is undefined for locale=${safeLocale}`
    );
  }

  const c = copy[safeLocale];
  const emptyMessage = t(safeLocale, "notFound") || c.empty;

  // Типы фильмов (для карточек)
  const respTypes = await apiGet<ApiResponse<FilmTypeApi>>(
    "/api/film-types?sort=order:asc&populate[films][fields][0]=id"
  );

  const types = (respTypes.data || []).map((ft) => {
    const title =
      safeLocale === "uk"
        ? ft.titleUk || "(no titleUk)"
        : ft.titleEn || ft.titleUk || "(no titleEn)";

    const description =
      safeLocale === "uk"
        ? ft.descriptionUk || ""
        : ft.descriptionEn || ft.descriptionUk || "";

    const filmsInType = extractFilmsCount(ft);

    return {
      slug: ft.slug,
      title,
      description,
      filmsInType,
    };
  });

  // Все фильмы (для секции "Усі фільми")
  const filmsRaw = await fetchAllFilms();

  const films = filmsRaw
    .map((f) => {
      const title = filmTitleByLocale(f, safeLocale);
      const year = filmYear(f);
      const key = filmKey(f);

      const cover = filmCoverInfo(f);

      return {
        key,
        title,
        year,
        coverUrl: cover?.url,
        coverAlt: cover?.alt,
      };
    })
    .sort((a, b) => {
      const ay = a.year ?? -Infinity;
      const by = b.year ?? -Infinity;
      if (by !== ay) return by - ay;

      return a.title.localeCompare(
        b.title,
        safeLocale === "uk" ? "uk" : "en",
        { sensitivity: "base" }
      );
    });

  const typeCount = types.length;
  const totalFilms = films.length;

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
        {types.map((ft) => (
          <Link
            key={ft.slug}
            href={`/${safeLocale}/films/${ft.slug}/`}
            className={styles.card}
            aria-label={`${ft.title} — ${c.filmsInSection(ft.filmsInType)}`}
          >
            <div className={styles.cardTitle}>{ft.title}</div>
            <div className={styles.cardText}>{ft.description}</div>

            <div className={styles.cardMetaRow}>
              <span className={styles.pill}>
                {c.filmsInSection(ft.filmsInType)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <section className={styles.section} aria-label={c.allFilmsTitle}>
        <h2 className={styles.sectionTitle}>{c.allFilmsTitle}</h2>
        <p className={styles.note}>{c.allFilmsIntro}</p>

        <div className={styles.grid} data-empty-message={emptyMessage}>
          {films.map((f) => (
            <article
              key={f.key}
              className={`${styles.card} ${styles.filmCard}`}
              aria-label={`${f.title}. ${c.filmMeta(f.year)}`}
            >
              <div className={styles.filmPosterWrap} aria-hidden="true">
                {f.coverUrl ? (
                  <img
                    className={styles.filmPoster}
                    src={f.coverUrl}
                    alt={f.coverAlt || f.title}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className={styles.filmPosterFallback}>
                    <span className={styles.filmPosterFallbackText}>
                      {initials(f.title)}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.filmBody}>
                <div className={styles.filmTitle}>{f.title}</div>
                <div className={styles.filmSub}>{c.filmMeta(f.year)}</div>

                <div className={styles.filmMetaRow}>
                  <span className={styles.pill}>
                    {typeof f.year === "number" ? String(f.year) : "—"}
                  </span>
                  {f.coverUrl ? (
                    <span className={styles.pillSoft}>cover</span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

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
