import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { getBanners } from "@/lib/content/mock";
import { withBasePath } from "@/lib/basePath";
import styles from "./BannerBlock.module.css";

export function BannerBlock({ locale }: { locale: Locale }) {
  const banners = getBanners();
  return (
    <section className={styles.wrap}>
      <div><strong>{t(locale, "bannersTitle")}</strong></div>
      <div className={styles.row}>
        {banners.map(b => (
          <a className={styles.item} key={b.id} href={b.url} target="_blank" rel="noreferrer">
            <img src={withBasePath(b.imagePath)} alt={b.title[locale]} />
            <div>
              <div>{b.title[locale]}</div>
              <div className={styles.small}>{b.url}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
