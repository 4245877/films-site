import Link from "next/link";
import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";
import styles from "./Page.module.css";

export const dynamicParams = false;

type NewsType = "анонси" | "релізи" | "трейлери" | "добірки" | "індустрія" | "події";

type NewsItem = {
  slug: string;
  type: NewsType;
  title: string;
  lead: string;
  date: string; // ISO: YYYY-MM-DD
  tags: string[];
  minutes?: number;
};

function formatUA(dateISO: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("uk-UA", { year: "numeric", month: "long", day: "numeric" });
}

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  const href = (path: string) => `/${safeLocale}${path}`;

  // Демо-стрічка (потім заміниш на дані з БД/CRM)
  const items: NewsItem[] = [
    {
      slug: "weekend-picks-quiet-night",
      type: "добірки",
      title: "На тихий вечір: 12 фільмів, які не втомлюють, а тримають",
      lead:
        "Драма без істерики, трилер без шуму, фантастика без зайвих пояснень — зручна добірка під настрій.",
      date: "2025-12-10",
      tags: ["вечір", "драма", "психологічне"]
    },
    {
      slug: "trailer-drop-winter-anime",
      type: "трейлери",
      title: "Зимовий сезон аніме: трейлери, які варто додати у «Список»",
      lead:
        "Коротко, по суті: що виходить, коли стартує, і чим це може зачепити саме тебе.",
      date: "2025-12-08",
      tags: ["аніме", "сезон", "трейлери"]
    },
    {
      slug: "release-calendar-update",
      type: "релізи",
      title: "Оновили календар релізів: тепер видно прем’єри, повернення та спецпокази",
      lead:
        "Додали фільтри за країною, форматом і типом (фільм/серіал/аніме). Пошук працює швидше.",
      date: "2025-12-06",
      tags: ["календар", "оновлення", "релізи"]
    },
    {
      slug: "announcements-top-lists",
      type: "анонси",
      title: "Скоро: персональні топи й розумні рекомендації без спойлерів",
      lead:
        "Ти позначаєш «подобається/не моє» — ми підлаштовуємо стрічку. Жодних зайвих підписок, тільки зручність.",
      date: "2025-12-04",
      tags: ["анонси", "рекомендації", "зручність"]
    },
    {
      slug: "industry-how-metadata-works",
      type: "індустрія",
      title: "Як ми тримаємо порядок у каталозі з 1 000 000+ тайтлів",
      lead:
        "Синоніми назв, альтернативні транслітерації, роки й жанри — пояснюємо просто, як це допомагає пошуку.",
      date: "2025-12-02",
      tags: ["каталог", "метадані", "пошук"],
      minutes: 4
    },
    {
      slug: "events-community-watch",
      type: "події",
      title: "Подія спільноти: онлайн-перегляд + обговорення без токсичності",
      lead:
        "Теплий формат: дивимось разом, а потім коротко ділимось враженнями. Без нав’язування смаків.",
      date: "2025-11-30",
      tags: ["події", "спільнота", "обговорення"]
    }
  ];

  const typeOrder: NewsType[] = ["анонси", "релізи", "трейлери", "добірки", "індустрія", "події"];

  return (
    <>
      <header className={styles.hero}>
        <h1 className={page.h1}>{t(safeLocale, "news")}</h1>
        <p className={page.muted}>
          Одна стрічка — і для фільмів, і для аніме. Швидко знайти важливе: анонси, релізи, трейлери,
          добірки та події. Без шуму, тільки корисне.
        </p>

        <div className={styles.tools}>
          <form className={styles.search} action={href("/news")} method="GET" role="search">
            <input
              className={styles.searchInput}
              name="q"
              placeholder="Пошук у новинах: «аніме», «календар», «трейлер»…"
              aria-label="Пошук у новинах"
            />
            <button className={styles.searchBtn} type="submit">
              Шукати
            </button>
          </form>

          <div className={styles.filters} aria-label="Фільтри">
            {typeOrder.map((tp) => (
              <Link key={tp} className={styles.chip} href={href(`/news?type=${encodeURIComponent(tp)}`)}>
                {tp}
              </Link>
            ))}
            <Link className={styles.chip} href={href("/news?type=всі")}>
              всі
            </Link>
          </div>
        </div>

        <div className={styles.quickLinks}>
          <Link className={styles.quickLink} href={href("/calendar/")}>
            Перейти до календаря →
          </Link>
          <Link className={styles.quickLink} href={href("/search/")}>
            Пошук тайтлів →
          </Link>
          <Link className={styles.quickLink} href={href("/films/")}>
            Каталог →
          </Link>
        </div>
      </header>

      {/* FEATURED */}
      <section className={`card ${page.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={page.h2}>Головне сьогодні</h2>
          <p className={page.muted}>
            Найцінніше — зверху. Решта нижче, у зручній стрічці.
          </p>
        </div>

        <Link className={styles.featured} href={href(`/news/${items[0].slug}`)}>
          <div className={styles.featuredTop}>
            <span className={styles.badgeType}>{items[0].type}</span>
            <span className={styles.date}>{formatUA(items[0].date)}</span>
          </div>
          <div className={styles.featuredTitle}>{items[0].title}</div>
          <div className={styles.featuredLead}>{items[0].lead}</div>
          <div className={styles.tags}>
            {items[0].tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </Link>
      </section>

      {/* FEED */}
      <section className={`card ${page.section}`}>
        <div className={styles.sectionHeaderRow}>
          <h2 className={page.h2}>Стрічка новин</h2>
          <div className={styles.hint}>
            Порада: натисни на тип або тег — і швидко звузиш стрічку.
          </div>
        </div>

        <div className={styles.feed}>
          {items.slice(1).map((n) => (
            <article key={n.slug} className={styles.item}>
              <div className={styles.itemTop}>
                <Link className={styles.typeLink} href={href(`/news?type=${encodeURIComponent(n.type)}`)}>
                  {n.type}
                </Link>
                <span className={styles.dot}>•</span>
                <time className={styles.date} dateTime={n.date}>
                  {formatUA(n.date)}
                </time>
                {typeof n.minutes === "number" ? (
                  <>
                    <span className={styles.dot}>•</span>
                    <span className={styles.read}>{n.minutes} хв читання</span>
                  </>
                ) : null}
              </div>

              <Link className={styles.itemTitle} href={href(`/news/${n.slug}`)}>
                {n.title}
              </Link>

              <p className={styles.itemLead}>{n.lead}</p>

              <div className={styles.tags}>
                {n.tags.map((tag) => (
                  <Link
                    key={tag}
                    className={styles.tagLink}
                    href={href(`/news?tag=${encodeURIComponent(tag)}`)}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.actions}>
          <Link className={styles.button} href={href("/news?page=2")}>
            Показати ще
          </Link>
          <Link className={`${styles.button} ${styles.primary}`} href={href("/search/")}>
            Знайти тайтл
          </Link>
        </div>
      </section>

      {/* SUBSCRIBE / CTA */}
      <section className={`card ${page.section}`}>
        <h2 className={page.h2}>Підписка на оновлення (демо)</h2>
        <p className={page.muted}>
          Один лист на тиждень. Без спаму. Лише: найкращі добірки, важливі релізи, корисні оновлення пошуку.
        </p>

        <form className={styles.subscribe} action={href("/news")} method="GET">
          <input
            className={styles.searchInput}
            name="email"
            placeholder="Email для підписки"
            aria-label="Email для підписки"
          />
          <button className={`${styles.searchBtn} ${styles.primaryBtn}`} type="submit">
            Підписатися
          </button>
        </form>

        <p className={styles.small}>
          Пізніше це підключиш до бекенду. А зараз — гарна заготовка під реальний сервіс.
        </p>
      </section>
    </>
  );
}
