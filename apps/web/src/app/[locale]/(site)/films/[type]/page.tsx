// apps/web/src/app/[locale]/(site)/films/[type]/page.tsx

import FilmTypePage from "@/pages/FilmTypePage";
import type { Locale } from "@/lib/i18n";

// Для output: "export" нельзя dynamicParams: true
export const dynamicParams = false;

// Минимальный безопасный фолбэк, чтобы build не падал из-за пустых params.
// (slug "feature-film" у тебя уже используется в запросах)
const FALLBACK_TYPE_SLUGS = ["feature-film"] as const;

function getFilmTypeSlugsForExport(): string[] {
  const raw =
    process.env.FILM_TYPE_SLUGS ||
    process.env.NEXT_PUBLIC_FILM_TYPE_SLUGS ||
    "";

  const slugs = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return slugs.length ? slugs : [...FALLBACK_TYPE_SLUGS];
}

export default FilmTypePage;

export function generateStaticParams(): Array<{ locale: Locale; type: string }> {
  const slugs = getFilmTypeSlugsForExport();
  const locales: Locale[] = ["uk", "en"];

  const params: Array<{ locale: Locale; type: string }> = [];
  for (const locale of locales) {
    for (const type of slugs) {
      params.push({ locale, type });
    }
  }
  return params;
}
