import { locales, isLocale, defaultLocale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : defaultLocale;

  // locale-layout только фиксирует сегмент; основной каркас ниже
  void safeLocale;
  return <>{children}</>;
}
