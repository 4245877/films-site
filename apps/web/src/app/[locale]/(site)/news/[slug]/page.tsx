// apps/web/src/app/[locale]/(site)/news/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { locales, isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

// --- TYPES (Strapi V5 Flat Response) ---
interface StrapiArticleV5 {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  slug: string;
  publishedAt?: string;
}

interface ApiResponse {
  data: StrapiArticleV5[];
  meta: any;
}

// --- FALLBACK SLUGS (чтобы export не был пустым) ---
const FALLBACK_SLUGS = [
  "weekend-picks-quiet-night",
  "trailer-drop-winter-anime",
  "release-calendar-update",
  "industry-how-metadata-works"
];

function readListEnv(name: string): string[] {
  const raw = process.env[name];
  if (!raw) return [];
  return raw
    .split(/[\s,]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatUA(dateISO: string) {
  if (!dateISO) return "";
  const base = dateISO.includes("T") ? dateISO.split("T")[0] : dateISO;
  const [y, m, d] = base.split("-").map(Number);
  if (!y || !m || !d) return base;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("uk-UA", { year: "numeric", month: "long", day: "numeric" });
}

async function fetchAllSlugsFromApi(): Promise<string[]> {
  const res = await apiGet<ApiResponse>(
    "/api/articles?fields[0]=slug&sort=publishedAt:desc&pagination[pageSize]=1000"
  );
  return (res?.data ?? []).map((a) => a.slug).filter(Boolean);
}

async function fetchArticleBySlug(slug: string): Promise<StrapiArticleV5 | null> {
  const res = await apiGet<ApiResponse>(
    `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  return res?.data?.[0] ?? null;
}

// Для output:"export" нужно вернуть ПОЛНЫЕ params: locale + slug
export async function generateStaticParams(): Promise<Array<{ locale: Locale; slug: string }>> {
  // 1) Если задано в CI/ENV — используем это
  let slugs = readListEnv("NEWS_SLUGS");

  // 2) Иначе пробуем API (на билде)
  if (slugs.length === 0) {
    try {
      slugs = await fetchAllSlugsFromApi();
    } catch {
      slugs = [];
    }
  }

  // 3) Иначе fallback, чтобы страницы точно были
  if (slugs.length === 0) slugs = FALLBACK_SLUGS;

  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of locales) {
    for (const slug of slugs) params.push({ locale, slug });
  }
  return params;
}

export default async function NewsSlugPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  const href = (path: string) => `/${safeLocale}${path}`;

  // Если slug не попал в generateStaticParams — Next всё равно отдаст 404 при export.
  // Тут notFound — на случай ручного открытия неправильного адреса.
  let article: StrapiArticleV5 | null = null;
  try {
    article = await fetchArticleBySlug(slug);
  } catch {
    article = null;
  }

  if (!article) {
    // Если хочешь вместо 404 показывать демо — можешь тут отрисовать заглушку.
    notFound();
  }

  const date = article.publishedAt ? article.publishedAt.split("T")[0] : "";

  return (
    <article className="card" style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Link href={href("/news")} style={{ textDecoration: "underline" }}>
          ← Назад до новин
        </Link>
        {date ? <span style={{ opacity: 0.7 }}>{formatUA(date)}</span> : null}
      </div>

      <h1 style={{ marginTop: 16, marginBottom: 8 }}>{article.title}</h1>

      {article.description ? (
        <p style={{ opacity: 0.85, lineHeight: 1.6 }}>{article.description}</p>
      ) : null}
    </article>
  );
}
