import type { Locale } from "@/lib/i18n";

// если у тебя уже есть export const dynamicParams = false; — не дублируй
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
  // Для статического экспорта перечисли slug'и новостей явно:
  // NEWS_SLUGS="slug-1,slug-2,slug-3"
  const slugs = readListEnv("NEWS_SLUGS");

  const locales: Locale[] = ["uk", "en"];
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of locales) {
    for (const slug of slugs) params.push({ locale, slug });
  }

  return params;
}
