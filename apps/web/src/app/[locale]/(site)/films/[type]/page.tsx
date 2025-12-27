import FilmTypePage from "@/pages/FilmTypePage";
export default FilmTypePage;

import type { Locale } from "@/lib/i18n";

type FilmType = { slug: string };
type ApiResp<T> = { data: T[] };

async function fetchFilmTypeSlugs(): Promise<string[]> {
  // На билде (в docker/CI) лучше ходить напрямую к cms
  const base =
    process.env.STRAPI_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:1337";

  const res = await fetch(`${base}/api/film-types?fields[0]=slug&pagination[pageSize]=200`, {
    cache: "no-store"
  });

  if (!res.ok) return [];
  const json = (await res.json()) as ApiResp<FilmType>;
  return (json.data || []).map((x) => x.slug).filter(Boolean);
}

export async function generateStaticParams() {
  const slugs = await fetchFilmTypeSlugs();

  const locales: Locale[] = ["uk", "en"];
  const params: Array<{ locale: string; type: string }> = [];

  for (const locale of locales) {
    for (const type of slugs) {
      params.push({ locale, type });
    }
  }

  return params;
}
