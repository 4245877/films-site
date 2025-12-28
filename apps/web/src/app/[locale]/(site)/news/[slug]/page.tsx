// apps/web/src/app/[locale]/(site)/news/[slug]/page.tsx

import type { Locale } from "@/lib/i18n";
import NewsSlugPage from "@/pages/NewsIndexPage"; // если вдруг логика там


export default NewsSlugPage;

// Для output: "export" параметры должны быть только из generateStaticParams
export const dynamicParams = false;

function readListEnv(name: string): string[] {
  const raw = process.env[name];
  if (!raw) return [];
  return raw
    .split(/[\s,]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function generateStaticParams(): Array<{ locale: Locale; slug: string }> {
  // Задай в Actions: NEWS_SLUGS="slug-1,slug-2,slug-3"
  const slugs = readListEnv("NEWS_SLUGS");

  const locales: Locale[] = ["uk", "en"];
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of locales) {
    for (const slug of slugs) params.push({ locale, slug });
  }

  return params;
}
