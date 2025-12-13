import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";

export const dynamicParams = false;

export default async function DocumentsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <h1 className={page.h1}>{t(safeLocale, "documents")}</h1>
      <p className={page.muted}>
        Заготовка. Тут буде список файлів/посилань і кнопки скачування.
      </p>
    </>
  );
}
