// apps/web/src/components/SiteHeader.tsx
import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/basePath";
import styles from "./SiteHeader.module.css";

type Props = { locale: Locale };

export function SiteHeader({ locale }: Props) {
  const searchPlaceholder =
    locale === "uk" ? "Пошук: назва, жанр, рік…" : "Search: title, genre, year…";

  const menuLabel = locale === "uk" ? "Меню" : "Menu";
  const searchLabel = locale === "uk" ? "Шукати" : "Search";
  const skipLabel = locale === "uk" ? "Перейти до вмісту" : "Skip to content";

  // Важно для GitHub Pages/basePath: все внутренние ссылки через withBasePath
  const href = (path: string) => withBasePath(`/${locale}${path}`);

  const navItems: Array<{ href: string; label: string }> = [
    { href: href("/films"), label: t(locale, "films") },
    { href: href("/news"), label: t(locale, "news") },
    { href: href("/about"), label: t(locale, "about") },
    { href: href("/contacts"), label: t(locale, "contacts") },
  ];

  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#content">
        {skipLabel}
      </a>

      <div className="container">
        <div className={styles.row}>
          <Link href={href("")} className={styles.brandLink} aria-label={t(locale, "home")}>
            <span className={styles.logoMark} aria-hidden="true">
              <img
                className={styles.logoImg}
                src={withBasePath("/logo.svg")}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                decoding="async"
              />
            </span>

            <div className={styles.brand}>
              <div className={styles.title}>{t(locale, "siteTitle")}</div>
              <div className={styles.sub}>{t(locale, "projectSubtitle")}</div>
            </div>
          </Link>

          {/* Desktop nav (becomes horizontal scroll on tight widths) */}
          <nav className={styles.nav} aria-label="Primary">
            {navItems.map((it) => (
              <Link key={it.href} href={it.href}>
                {it.label}
              </Link>
            ))}
          </nav>

          <div className={styles.right}>
            {/* Search (desktop) */}
            <form className={styles.search} action={href("/search")} method="GET" role="search">
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
                href={withBasePath("/uk")}
                aria-current={locale === "uk" ? "page" : undefined}
              >
                UK
              </Link>
              <Link
                className={locale === "en" ? styles.activeLang : styles.langLink}
                href={withBasePath("/en")}
                aria-current={locale === "en" ? "page" : undefined}
              >
                EN
              </Link>
            </div>

            {/* Mobile menu (no JS) */}
            <details className={styles.menu}>
              <summary className={styles.menuBtn} aria-label={menuLabel}>
                {menuLabel}
              </summary>

              <div className={styles.menuPanel} role="dialog" aria-label={menuLabel}>
                <nav className={styles.menuLinks} aria-label="Mobile">
                  <Link href={href("")}>{t(locale, "home")}</Link>
                  {navItems.map((it) => (
                    <Link key={it.href} href={it.href}>
                      {it.label}
                    </Link>
                  ))}
                </nav>

                <form className={styles.menuSearch} action={href("/search")} method="GET" role="search">
                  <input
                    className={styles.menuSearchInput}
                    type="search"
                    name="q"
                    placeholder={searchPlaceholder}
                    aria-label={searchLabel}
                  />
                  <button className={styles.menuSearchBtn} type="submit">
                    {searchLabel}
                  </button>
                </form>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
