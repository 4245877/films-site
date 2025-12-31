import type { ReactNode } from "react";

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

  // в CI обычно нет Strapi на localhost — не пытаемся
  if (!base || base.includes("localhost") || base.includes("127.0.0.1")) return [];

  try {
    // важно для static export: без no-store / revalidate: 0
    const res = await fetch(
      `${base}/api/films?fields[0]=slug&pagination[pageSize]=500`,
      { cache: "force-cache" }
      // можно и проще: fetch(url)
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
  Array<{ locale: string; slug: string }>
> {
  // 1) приоритет: явный список для статического экспорта
  const envSlugs = readListEnv("FILM_SLUGS");

  // 2) fallback: пробуем CMS (если задан URL и это не localhost)
  const cmsSlugs = envSlugs.length ? [] : await tryFetchFilmSlugs();

  const slugs = envSlugs.length ? envSlugs : cmsSlugs;

  // чтобы export не “провалился” без единого пути
  const safeSlugs = slugs.length ? Array.from(new Set(slugs)) : ["__placeholder__"];

  // пожалуйста, поставь здесь свои локали
  const locales = ["uk", "en"];

  return locales.flatMap((locale) =>
    safeSlugs.map((slug) => ({ locale, slug }))
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
