import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "./SearchPage.module.css";

export const dynamicParams = false;

export default async function SearchPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <h1 className={page.h1}>{t(safeLocale, "search")}</h1>
      <p className={page.muted}>
        Заготовка. Тут буде пошук по всьому сайту (без форуму).
      </p>
    </>
  );
}
