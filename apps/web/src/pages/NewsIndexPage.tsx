import Link from "next/link";
import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";
import styles from "./NewsIndexPage.module.css";
import { apiGet } from "@/lib/api";

export const dynamicParams = false;

// --- TYPES ---

type NewsType = "анонси" | "релізи" | "трейлери" | "добірки" | "індустрія" | "події" | string;

// Внутренний тип для UI
type NewsItem = {
  slug: string;
  type: NewsType;
  title: string;
  lead: string;
  date: string; // ISO: YYYY-MM-DD
  tags: string[];
  minutes?: number;
};

// Типы ответа от API (Strapi V5)
interface StrapiArticleV5 {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  slug: string;
  publishedAt?: string;
}

interface ApiResponse {
  data: StrapiArticleV5[];
  meta: any;
}

// --- HELPERS ---

function formatUA(dateISO: string) {
  if (!dateISO) return "";
  const [y, m, d] = dateISO.split("-").map(Number);
  if (!y || !m || !d) return dateISO;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("uk-UA", { year: "numeric", month: "long", day: "numeric" });
}

// --- MOCK DATA (Fallback) ---
const MOCK_ITEMS: NewsItem[] = [
  {
    slug: "weekend-picks-quiet-night",
    type: "добірки",
    title: "На тихий вечір: 12 фільмів, які не втомлюють, а тримають",
    lead: "Драма без істерики, трилер без шуму, фантастика без зайвих пояснень — зручна добірка під настрій.",
    date: "2025-12-10",
    tags: ["вечір", "драма", "психологічне"]
  },
  {
    slug: "trailer-drop-winter-anime",
    type: "трейлери",
    title: "Зимовий сезон аніме: трейлери, які варто додати у «Список»",
    lead: "Коротко, по суті: що виходить, коли стартує, і чим це може зачепити саме тебе.",
    date: "2025-12-08",
    tags: ["аніме", "сезон", "трейлери"]
  },
  {
    slug: "release-calendar-update",
    type: "релізи",
    title: "Оновили календар релізів: тепер видно прем’єри, повернення та спецпокази",
    lead: "Додали фільтри за країною, форматом і типом (фільм/серіал/аніме). Пошук працює швидше.",
    date: "2025-12-06",
    tags: ["календар", "оновлення", "релізи"]
  },
  {
    slug: "industry-how-metadata-works",
    type: "індустрія",
    title: "Як ми тримаємо порядок у каталозі з 1 000 000+ тайтлів",
    lead: "Синоніми назв, альтернативні транслітерації, роки й жанри — пояснюємо просто, як це допомагає пошуку.",
    date: "2025-12-02",
    tags: ["каталог", "метадані", "пошук"],
    minutes: 4
  }
];

// --- COMPONENT ---

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  const href = (path: string) => `/${safeLocale}${path}`;
  const typeOrder: NewsType[] = ["анонси", "релізи", "трейлери", "добірки", "індустрія", "події"];

  // 1. Запрос к API
  let items: NewsItem[] = [];

  try {
    const response = await apiGet<ApiResponse>(
      "/api/articles?sort=publishedAt:desc"
    );

    // 2. Маппинг данных (Strapi V5 Flat Response)
    if (response?.data && Array.isArray(response.data)) {
      items = response.data.map((a) => {
        const words = a.description ? a.description.split(/\s+/).length : 0;
        const minutes = words > 0 ? Math.ceil(words / 200) : undefined;

        return {
          slug: a.slug,
          type: "новини",               // пока фиксировано, позже привяжем category/kind
          title: a.title,
          lead: a.description || "",    // поле называется description
          date: a.publishedAt ? a.publishedAt.split("T")[0] : "",
          tags: [],                     // пока пустой массив
          minutes
        };
      });
    }
  } catch (error) {
    console.error("NewsPage API Error:", error);
    // Игнорируем ошибку, сработает fallback на MOCK_ITEMS ниже
  }

  // 3. Fallback: Если API вернул пустоту (или лежит), показываем демо-данные
  if (items.length === 0) {
    items = MOCK_ITEMS;
  }

  // Разделение на Featured и Feed
  const featured = items[0];
  const feed = items.slice(1);

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
      {featured && (
        <section className={`card ${page.section}`}>
          <div className={styles.sectionHeader}>
            <h2 className={page.h2}>Головне сьогодні</h2>
            <p className={page.muted}>
              Найцінніше — зверху. Решта нижче, у зручній стрічці.
            </p>
          </div>

          <Link className={styles.featured} href={href(`/news/${featured.slug}`)}>
            <div className={styles.featuredTop}>
              <span className={styles.badgeType}>{featured.type}</span>
              <span className={styles.date}>{formatUA(featured.date)}</span>
            </div>
            <div className={styles.featuredTitle}>{featured.title}</div>
            <div className={styles.featuredLead}>{featured.lead}</div>
            <div className={styles.tags}>
              {featured.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </section>
      )}

      {/* FEED */}
      <section className={`card ${page.section}`}>
        <div className={styles.sectionHeaderRow}>
          <h2 className={page.h2}>Стрічка новин</h2>
          <div className={styles.hint}>
            Порада: натисни на тип або тег — і швидко звузиш стрічку.
          </div>
        </div>

        <div className={styles.feed}>
          {feed.length > 0 ? (
            feed.map((n) => (
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
            ))
          ) : (
            <div className={page.muted} style={{ padding: "20px 0" }}>
              Новин поки що немає. Заходьте пізніше!
            </div>
          )}
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