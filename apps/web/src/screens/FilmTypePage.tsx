// apps/web/src/screens/FilmTypePage.tsx
import Link from "next/link";
import { apiGet } from "@/lib/api";
import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";

export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string; type: string }>;
};

type ApiResp<T> = { data?: T[]; meta?: any };

// Обновили функцию, чтобы искать поле 'cover' согласно схеме
function getCoverUrl(f: any): string | undefined {
  // Ищем поле cover (вместо poster)
  return (
    f?.cover?.url ??
    f?.cover?.data?.attributes?.url ??
    f?.cover?.data?.url ??
    undefined
  );
}

export default async function FilmTypePage({ params }: Props) {
  const { locale, type } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  const href = (p: string) => `/${safeLocale}${p}`;

  let films: any[] = [];
  let typeTitle = "";

  // Заголовок типа (фолбэк, не падаем при пустых данных/ошибке)
  try {
    const typeResp = await apiGet<ApiResp<any>>(
      `/api/film-types?filters[slug][$eq]=${encodeURIComponent(type)}`
    );

    if (Array.isArray(typeResp?.data) && typeResp.data.length > 0) {
      const ft = typeResp.data[0];
      typeTitle =
        (safeLocale === "uk" ? ft?.titleUk : ft?.titleEn) ||
        ft?.titleUk ||
        ft?.title ||
        "";
    }
  } catch {
    // ничего — важно не ронять build
  }

  if (!typeTitle) typeTitle = t(safeLocale, "films") || "Фільми";

  // Список фильмов по типу (тоже безопасно)
  try {
    const filmsResp = await apiGet<ApiResp<any>>(
      `/api/films?filters[film_type][slug][$eq]=${encodeURIComponent(
        type
      )}&sort=year:desc&populate=*`
    );

    if (Array.isArray(filmsResp?.data)) {
      films = filmsResp.data;
    }
  } catch {
    // ничего
  }

  return (
    <>
      <Link href={href("/films/")} className={page.muted}>
        ← {t(safeLocale, "films")}
      </Link>

      <h1 className={page.h1} style={{ marginTop: 12 }}>
        {typeTitle}
      </h1>

      {films.length === 0 ? (
        <p className={page.muted}>
          У цьому типі поки що немає фільмів. Додай Film у CMS, прив’яжи
          film_type и завантаж cover.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {films.map((f: any) => {
            const coverUrl = getCoverUrl(f);
            return (
              <article
                key={f.documentId ?? f.id ?? f.slug}
                className="card"
                style={{ padding: 14 }}
              >
                <div style={{ display: "flex", gap: 14 }}>
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={f.title ?? ""}
                      style={{
                        width: 90,
                        height: 130,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  ) : null}

                  <div style={{ flex: 1 }}>
                    <div className={page.muted}>
                      {typeof f.year === "number" ? f.year : null}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>
                      <Link href={href(`/films/watch/${f.slug}`)}>
                        {f.title}
                      </Link>
                    </div>
                    {f.description ? (
                      <p className={page.muted} style={{ marginTop: 8 }}>
                        {f.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
