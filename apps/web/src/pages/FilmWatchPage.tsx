import Link from "next/link";
import { apiGet } from "@/lib/api";
import { isLocale, defaultLocale, type Locale, t } from "@/lib/i18n";
// Импортируем локальные стили как объект styles
import styles from "./FilmWatchPage.module.css";

export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

type ApiResp = { data: any[] };

function pickMediaUrl(f: any): string | undefined {
  // Strapi v5/v4 формы
  return (
    f?.video?.url ??
    f?.video?.data?.attributes?.url ??
    f?.cover?.url ??
    f?.cover?.data?.attributes?.url ??
    undefined
  );
}

function toPublicUrl(u?: string): string | undefined {
  if (!u) return undefined;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  // /uploads/... -> отдаётся через nginx с того же домена
  return u;
}

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export default async function FilmWatchPage({ params }: Props) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  const href = (p: string) => `/${safeLocale}${p}`;

  const res = await apiGet<ApiResp>(
    `/api/films?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );

  const film = res.data?.[0];
  
  if (!film) {
    return (
      <>
        <h1 className={styles.title}>Не знайдено</h1>
        <Link href={href("/films/")} className={styles.backLink}>
          ← {t(safeLocale, "films")}
        </Link>
      </>
    );
  }

  const title = film.title ?? "(без назви)";
  const year = film.year;
  const watchUrl = film.watchUrl || film.trailerUrl;
  const videoUrl = toPublicUrl(pickMediaUrl(film));
  const embed = typeof watchUrl === "string" ? youtubeEmbed(watchUrl) : null;

  return (
    <>
      <Link href={href("/films/")} className={styles.backLink}>
        ← {t(safeLocale, "films")}
      </Link>

      <h1 className={styles.title}>{title}</h1>
      
      {typeof year === "number" ? (
        <div className={styles.year}>{year}</div>
      ) : null}

      <div className={styles.videoWrapper}>
        {embed ? (
          <iframe
            src={embed}
            title={title}
            // Комбинируем классы или используем конкретный
            className={`${styles.mediaFrame} ${styles.iframe}`} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : videoUrl ? (
          <video
            controls
            src={videoUrl}
            className={styles.mediaFrame}
          />
        ) : typeof watchUrl === "string" && watchUrl ? (
          <a 
            href={watchUrl} 
            target="_blank" 
            rel="noreferrer" 
            className={styles.externalLink}
          >
            Відкрити перегляд →
          </a>
        ) : (
          <div className={styles.noVideo}>
            Для цього фільму ще не задано video/watchUrl у CMS.
          </div>
        )}
      </div>

      {film.description ? (
        <div className={styles.description}>
          {film.description}
        </div>
      ) : null}
    </>
  );
}