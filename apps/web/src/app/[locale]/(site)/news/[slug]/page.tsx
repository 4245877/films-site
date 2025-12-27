import Link from "next/link";
import { apiGet } from "@/lib/api";
import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";

export const dynamicParams = false;

type ApiResp = { data: any[] };

export default async function NewsOnePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  const href = (p: string) => `/${safeLocale}${p}`;

  const res = await apiGet<ApiResp>(
    `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );

  const item = res.data?.[0];
  const a = item?.attributes ?? item;

  if (!a) {
    return (
      <>
        <h1 className={page.h1}>Не знайдено</h1>
        <Link href={href("/news/")}>← {t(safeLocale, "news")}</Link>
      </>
    );
  }

  const title = a.title ?? "(без назви)";
  const date = a.publishedAt ? String(a.publishedAt).split("T")[0] : "";
  const content = typeof a.content === "string" ? a.content : "";

  return (
    <>
      <Link href={href("/news/")} className={page.muted}>
        ← {t(safeLocale, "news")}
      </Link>

      <h1 className={page.h1} style={{ marginTop: 12 }}>{title}</h1>
      {date ? <div className={page.muted}>{date}</div> : null}

      <div style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>
        {content || a.lead || a.excerpt || ""}
      </div>
    </>
  );
}
