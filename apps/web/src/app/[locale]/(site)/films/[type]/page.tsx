import type { Locale } from "@/lib/i18n";
import FilmTypePage from "@/pages/FilmTypePage";

export default FilmTypePage;

// Важно: если generateStaticParams вернёт пусто (например, в CI),
// маршрут всё равно должен уметь рендериться по новым параметрам.
export const dynamicParams = true;

type FilmType = { slug: string };
type ApiResp<T> = { data: T[] };

async function fetchFilmTypeSlugs(): Promise<string[]> {
  const base =
    process.env.STRAPI_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:1337";

  try {
    const res = await fetch(
      `${base}/api/film-types?fields[0]=slug&pagination[pageSize]=200`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    const json = (await res.json()) as ApiResp<FilmType>;
    return (json.data || []).map((x) => x.slug).filter(Boolean);
  } catch (err) {
    // На CI/билде Strapi часто недоступен — не валим сборку
    console.warn("[generateStaticParams] film-types fetch failed:", err);
    return [];
  }
}

export async function generateStaticParams() {
  // В GitHub Actions/CI не требуем доступность CMS, иначе будет ECONNREFUSED
  if (process.env.GITHUB_ACTIONS === "true" || process.env.CI === "true") {
    return [];
  }

  const slugs = await fetchFilmTypeSlugs();
  if (!slugs.length) return [];

  const locales: Locale[] = ["uk", "en"];
  return locales.flatMap((locale) => slugs.map((type) => ({ locale, type })));
}
