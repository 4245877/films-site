import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/basePath";
import styles from "./SiteHeader.module.css";

type Props = { locale: Locale };

export function SiteHeader({ locale }: Props) {
  const searchPlaceholder =
    locale === "uk"
      ? "Пошук: назва, жанр, рік…"
      : "Search: title, genre, year…";

  const menuLabel = locale === "uk" ? "Меню" : "Menu";
  const searchLabel = locale === "uk" ? "Шукати" : "Search";

  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#content">
        Skip to content
      </a>

      <div className="container">
        <div className={styles.row}>
          <Link href={`/${locale}/`} className={styles.brandLink} aria-label="Home">
            <img
              className={styles.logo}
              src={withBasePath("/brand/logo.svg")}
              alt="Films"
            />
            <div className={styles.brand}>
              <div className={styles.title}>{t(locale, "siteTitle")}</div>
              <div className={styles.sub}>{t(locale, "projectSubtitle")}</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Primary">
            <Link href={`/${locale}/`}>{t(locale, "home")}</Link>
            <Link href={`/${locale}/films/`}>{t(locale, "films")}</Link>
            <Link href={`/${locale}/news/`}>{t(locale, "news")}</Link>
            <Link href={`/${locale}/documents/`}>{t(locale, "documents")}</Link>
            <Link href={`/${locale}/calendar/`}>{t(locale, "calendar")}</Link>
            <Link href={`/${locale}/about/`}>{t(locale, "about")}</Link>
            <Link href={`/${locale}/contacts/`}>{t(locale, "contacts")}</Link>
            <Link href={`/${locale}/forum/`}>{t(locale, "forum")}</Link>
          </nav>

          <div className={styles.right}>
            {/* Search (GET /search?q=...) */}
            <form
              className={styles.search}
              action={`/${locale}/search/`}
              method="GET"
              role="search"
            >
              <input
                className={styles.searchInput}
                type="search"
                name="q"
                placeholder={searchPlaceholder}
                aria-label={searchLabel}
              />
              <button className={styles.searchBtn} type="submit">
                {searchLabel}
              </button>
            </form>

            <div className={styles.lang} aria-label="Language">
              <Link
                className={locale === "uk" ? styles.activeLang : styles.langLink}
                href={`/uk/`}
              >
                UK
              </Link>
              <Link
                className={locale === "en" ? styles.activeLang : styles.langLink}
                href={`/en/`}
              >
                EN
              </Link>
            </div>

            {/* Mobile menu (no JS) */}
            <details className={styles.menu}>
              <summary className={styles.menuBtn}>{menuLabel}</summary>
              <nav className={styles.menuPanel} aria-label="Mobile">
                <Link href={`/${locale}/`}>{t(locale, "home")}</Link>
                <Link href={`/${locale}/films/`}>{t(locale, "films")}</Link>
                <Link href={`/${locale}/news/`}>{t(locale, "news")}</Link>
                <Link href={`/${locale}/documents/`}>{t(locale, "documents")}</Link>
                <Link href={`/${locale}/calendar/`}>{t(locale, "calendar")}</Link>
                <Link href={`/${locale}/about/`}>{t(locale, "about")}</Link>
                <Link href={`/${locale}/contacts/`}>{t(locale, "contacts")}</Link>
                <Link href={`/${locale}/search/`}>{t(locale, "search")}</Link>
                <Link href={`/${locale}/forum/`}>{t(locale, "forum")}</Link>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
