import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";

export const dynamicParams = false;

export default async function About({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <h1 className={page.h1}>{t(safeLocale, "about")}</h1>
      <p className={page.muted}>
        Мета сайту — у зручній формі поширювати навчально-довідкову інформацію про типи фільмів
        і заохочувати студентів до розробки веб-застосунків.
      </p>
    </>
  );
}
