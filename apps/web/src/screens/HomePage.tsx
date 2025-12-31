import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";

export const dynamicParams = false;

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <div className={page.container} data-locale={safeLocale}>
      {/* Hero Section */}
      <header className={page.hero}>
        <h1 className={page.h1}>Затишок у кожному кадрі</h1>
        <p className={page.lead}>
          Ласкаво просимо до нашої колекції. Тут ми збираємо фільми не за
          рейтингами, а за емоціями. Історії, що зігрівають, як горнятко кави в
          дощовий день.
        </p>
      </header>

      {/* Featured Movie Section */}
      <section className={page.featuredSection}>
        <div className={page.sectionHeader}>
          <h2 className={page.h2}>Вибір вечора</h2>
        </div>

        <div className={page.featuredContent}>
          <div className={page.posterWrapper}>
            <div className={page.poster}>
              {/* Photo source (direct): https://upload.wikimedia.org/wikipedia/commons/2/2b/Grandhotel_Pupp.JPG */}
              <img
                src="https://upload.wikimedia.org/wikipedia/uk/b/bd/Hotel_Grand_Budapesht.jpg"
                alt="Фото Grandhotel Pupp у Карлових Варах — настрій «Гранд-готелю «Будапешт»»"
                loading="eager"
                decoding="async"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>

          <div className={page.movieInfo}>
            <h3 className={page.h3}>Гранд-готель «Будапешт»</h3>

            <p className={page.description}>
              Неймовірна симетрія, пастельні кольори та тонка іронія. Ідеальний
              вибір для знайомства з нашою естетикою.
            </p>

            <ul className={page.metaList}>
              <li className={page.metaItem}>
                <span className={page.metaLabel}>Рік:</span>
                <span className={page.metaValue}>2014</span>
              </li>
              <li className={page.metaItem}>
                <span className={page.metaLabel}>Жанр:</span>
                <span className={page.metaValue}>Трагікомедія</span>
              </li>
              <li className={page.metaItem}>
                <span className={page.metaLabel}>Режисер:</span>
                <span className={page.metaValue}>Вес Андерсон</span>
              </li>
            </ul>

            <div className={page.actions}>
              <Link href="#" className={page.buttonPrimary}>
                Дивитись трейлер
              </Link>
              <Link href="#" className={page.buttonSecondary}>
                Додати в обране
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mood Categories Section */}
      <section className={page.moodSection}>
        <div className={page.sectionHeader}>
          <h2 className={page.h2}>Під настрій</h2>
        </div>

        <div className={page.cardGrid}>
          <article className={page.moodCard}>
            <h3 className={page.cardTitle}>Осіння меланхолія</h3>
            <p className={page.cardDescription}>
              Фільми, коли хочеться загорнутися у плед. Дощ за вікном вітається.
            </p>
            <Link href="#" className={page.cardLink}>
              Переглянути добірку
              <span className={page.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </article>

          <article className={page.moodCard}>
            <h3 className={page.cardTitle}>Архітектура мрій</h3>
            <p className={page.cardDescription}>
              Кіно, де міста та будинки грають головні ролі. Естетичне
              задоволення.
            </p>
            <Link href="#" className={page.cardLink}>
              Переглянути добірку
              <span className={page.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </article>
        </div>
      </section>

      {/* Quote Footer */}
      <footer className={page.quoteSection}>
        <blockquote className={page.quote}>
          <p className={page.quoteText}>
            «Кіно — це життя, з якого вирізали все нудне.»
          </p>
          <cite className={page.quoteAuthor}>— Альфред Гічкок</cite>
        </blockquote>
      </footer>
    </div>
  );
}
