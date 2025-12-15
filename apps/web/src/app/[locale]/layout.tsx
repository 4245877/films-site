import { locales, isLocale, defaultLocale } from "@/lib/i18n";

// Отключаем генерацию страниц для локалей, которых нет в списке ниже (вернет 404)
export const dynamicParams = false;

// Генерируем статические пути для сборки (обязательно для output: "export")
export function generateStaticParams() {
  return [{ locale: "uk" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Валидация не строго обязательна при dynamicParams = false, 
  // но полезна для внутренней логики если понадобится
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  void safeLocale; // заглушка для линтера, так как переменная пока не используется

  return <>{children}</>;
}