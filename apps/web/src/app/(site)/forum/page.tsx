import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";

export const dynamicParams = false;

export default async function ForumPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <h1 className={page.h1}>{t(safeLocale, "forum")}</h1>
      <p className={page.muted}>
        Заготовка. Тут можна зробити посилання або вбудований iframe на /forum (коли буде піднято).
      </p>
    </>
  );
}
