// apps/web/src/components/SiteFooter.tsx
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import { defaultLocale, type Locale } from "@/lib/i18n";
import styles from "./SiteFooter.module.css";

type Props = { locale?: Locale };

export function SiteFooter({ locale }: Props) {
  const safeLocale: Locale = locale ?? defaultLocale;
  const year = new Date().getFullYear();

  const isUk = safeLocale === "uk";

  const txt = {
    brandNote: isUk
      ? "Навчальний демо-проєкт: сторінки фільмів, підбірки та швидкий пошук."
      : "Educational demo: movie pages, collections, and fast search.",
    sections: isUk
      ? {
          nav: "Навігація",
          discover: "Досліджуй",
          project: "Про проєкт"
        }
      : {
          nav: "Navigation",
          discover: "Discover",
          project: "About"
        },
    bottom: isUk
      ? {
          built: "Minimal demo build for GitHub Pages",
          top: "Нагору",
          feedback: "Зворотний звʼязок"
        }
      : {
          built: "Minimal demo build for GitHub Pages",
          top: "Back to top",
          feedback: "Feedback"
        }
  };

  const href = (path: string) => withBasePath(`/${safeLocale}${path}`);

  const navLinks = [
    { label: isUk ? "Головна" : "Home", href: href("") },
    { label: isUk ? "Новини" : "News", href: href("/news") },
    // TODO: коли додаси сторінки — просто заміни "#" на реальні маршрути
    { label: isUk ? "Каталог" : "Catalog", href: "#", disabled: true },
    { label: isUk ? "Підбірки" : "Collections", href: "#", disabled: true }
  ];

  const discoverLinks = [
    { label: isUk ? "Топ дня" : "Trending", href: "#", disabled: true },
    { label: isUk ? "Новинки" : "New releases", href: "#", disabled: true },
    { label: isUk ? "Жанри" : "Genres", href: "#", disabled: true },
    { label: isUk ? "FAQ" : "FAQ", href: "#", disabled: true }
  ];

  const projectLinks = [
    { label: isUk ? "Про сайт" : "About the site", href: "#", disabled: true },
    { label: isUk ? "Політика конфіденційності" : "Privacy", href: "#", disabled: true },
    { label: isUk ? "Умови використання" : "Terms", href: "#", disabled: true }
  ];

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href={href("")} className={styles.logo} aria-label="Films home">
              <span className={styles.logoMark} aria-hidden="true">
                F
              </span>
              <span className={styles.logoText}>Films</span>
            </Link>

            <p className={styles.tagline}>{txt.brandNote}</p>

            <div className={styles.pills} aria-label="Project info">
              <span className={styles.pill}>Next.js</span>
              <span className={styles.pill}>App Router</span>
              <span className={styles.pill}>CSS Modules</span>
            </div>

            <div className={styles.contactRow}>
              <a className={styles.mutedLink} href="mailto:hello@example.com">
                {txt.bottom.feedback}
              </a>
              <span className={styles.dot} aria-hidden="true">
                •
              </span>
              <a
                className={styles.mutedLink}
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          <nav className={styles.columns} aria-label="Footer navigation">
            <div className={styles.col}>
              <h3 className={styles.h}>{txt.sections.nav}</h3>
              <ul className={styles.list}>
                {navLinks.map((x) => (
                  <li key={x.label}>
                    <Link
                      href={x.href}
                      className={styles.link}
                      aria-disabled={x.disabled ? "true" : undefined}
                      tabIndex={x.disabled ? -1 : 0}
                      data-disabled={x.disabled ? "true" : undefined}
                      prefetch={false}
                    >
                      {x.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <h3 className={styles.h}>{txt.sections.discover}</h3>
              <ul className={styles.list}>
                {discoverLinks.map((x) => (
                  <li key={x.label}>
                    <Link
                      href={x.href}
                      className={styles.link}
                      aria-disabled={x.disabled ? "true" : undefined}
                      tabIndex={x.disabled ? -1 : 0}
                      data-disabled={x.disabled ? "true" : undefined}
                      prefetch={false}
                    >
                      {x.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <h3 className={styles.h}>{txt.sections.project}</h3>
              <ul className={styles.list}>
                {projectLinks.map((x) => (
                  <li key={x.label}>
                    <Link
                      href={x.href}
                      className={styles.link}
                      aria-disabled={x.disabled ? "true" : undefined}
                      tabIndex={x.disabled ? -1 : 0}
                      data-disabled={x.disabled ? "true" : undefined}
                      prefetch={false}
                    >
                      {x.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom} aria-label="Footer bottom">
          <div className={styles.copy}>
            © {year} <span className={styles.sep}>•</span> Films{" "}
            <span className={styles.sep}>•</span> {txt.bottom.built}
          </div>

          <a className={styles.toTop} href="#top">
            {txt.bottom.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
