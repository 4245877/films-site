// apps/web/src/app/[locale]/layout.tsx

import type { ReactNode } from "react";
import { locales, isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

// Обязательно для output: "export"
export function generateStaticParams(): Array<{ locale: Locale }> {
  // ВАЖНО: используем тот же список, что и isLocale()
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Не роняем весь сайт в 404 из-за рассинхрона.
  // dynamicParams=false и generateStaticParams всё равно не дадут “лишние” локали в экспорт.
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  void safeLocale;

  return <>{children}</>;
}
