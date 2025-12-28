import FilmWatchPage from "@/pages/FilmWatchPage";
import type { Locale } from "@/lib/i18n";

export default FilmWatchPage;

// Для output: "export" нельзя оставлять dynamicParams=true (оно true по умолчанию)
export const dynamicParams = false;

function readListEnv(name: string): string[] {
  const raw = process.env[name];
  if (!raw) return [];
  return raw
    .split(/[\s,]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

type Film = { slug?: string | null };
type ApiResp<T> = { data?: T[] };

async function tryFetchFilmSlugs(): Promise<string[]> {
  const base =
    process.env.STRAPI_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "";

  // В CI обычно нет Strapi на localhost — не пытаемся ходить туда
  if (!base || base.includes("localhost") || base.includes("127.0.0.1")) return [];

  try {
    const res = await fetch(
      `${base}/api/films?fields[0]=slug&pagination[pageSize]=500`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResp<Film>;
    return (json.data ?? [])
      .map((x) => x.slug ?? "")
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function generateStaticParams(): Promise<
  Array<{ locale: Locale; slug: string }>
> {
  // 1) приоритет: явный список для статического экспорта
  const envSlugs = readListEnv("FILM_SLUGS");

  // 2) если задан внешний API (и не localhost) — пробуем подтянуть с CMS
  const slugs = envSlugs.length ? envSlugs : await tryFetchFilmSlugs();

  const locales: Locale[] = ["uk", "en"];
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of locales) {
    for (const slug of slugs) params.push({ locale, slug });
  }

  return params;
}
