import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";

export const dynamicParams = false;

export default async function AddNewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <h1 className={page.h1}>{t(safeLocale, "addNews")}</h1>
      <p className={page.muted}>
        Заготовка форми. Пізніше підв’яжемо авторизацію і модерацію.
      </p>
    </>
  );
}
