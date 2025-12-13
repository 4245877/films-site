import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export default async function SiteLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <SiteHeader locale={safeLocale} />
      <main className="container">{children}</main>
      <SiteFooter />
    </>
  );
}
