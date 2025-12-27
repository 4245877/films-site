import FilmWatchPage from "@/pages/FilmWatchPage";
export default FilmWatchPage;

type ApiResp<T> = { data: T[] };

async function fetchFilmSlugs(): Promise<string[]> {
  const base =
    process.env.STRAPI_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:1337";

  const res = await fetch(
    `${base}/api/films?fields[0]=slug&pagination[pageSize]=500`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  const json = (await res.json()) as ApiResp<{ slug?: string }>;
  return (json.data || []).map((x) => x.slug).filter(Boolean) as string[];
}

export async function generateStaticParams() {
  const slugs = await fetchFilmSlugs();
  const locales = ["uk", "en"];

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}
