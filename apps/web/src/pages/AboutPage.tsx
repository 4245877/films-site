import Link from "next/link";
import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
// Исправляем импорт: так как файл в той же папке, используем ./
import page from "./Page.module.css";

export const dynamicParams = false;

export default async function About({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return (
    <>
      {/* HEADER */}
      <h1 className={page.h1}>{t(safeLocale, "about")}</h1>
      <p className={page.muted}>
        Ми створюємо сучасний простір для любителів кіно та аніме. 
        Цей проект — поєднання зручного дизайну, швидких технологій та любові до контенту.
      </p>

      {/* MISSION CARD */}
      <section className={`card ${page.section}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className={page.h2}>Наша мета</h2>
          <span className={page.badge}>v1.0.0 Public Beta</span>
        </div>
        
        <p className={page.muted} style={{ marginBottom: '1.5rem' }}>
          Мета сайту — у зручній формі поширювати навчально-довідкову інформацію про новинки кіноіндустрії
          та надихати студентів на створення власних веб-продуктів.
        </p>

        <ul className={page.list}>
          <li>
            <b>Без зайвого шуму.</b> Мінімум реклами, максимум корисної інформації про тайтли.
          </li>
          <li>
            <b>Технологічність.</b> Використання Next.js 14 для миттєвого завантаження сторінок.
          </li>
          <li>
            <b>Спільнота.</b> Можливість пропонувати свої фільми та впливати на розвиток платформи.
          </li>
        </ul>
      </section>

      {/* TECH STACK (Grid Layout) */}
      <section className={page.section}>
        <h2 className={page.h2}>Як це працює</h2>
        <div className={page.grid2}>
          <div className={page.miniCard}>
            <div className={page.miniTitle}>Frontend</div>
            <div className={page.muted}>
              Побудовано на сучасному стеку React Server Components.
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <span className={page.badge}>Next.js</span>
              <span className={page.badge}>TypeScript</span>
              <span className={page.badge}>CSS Modules</span>
            </div>
          </div>

          <div className={page.miniCard}>
            <div className={page.miniTitle}>Дані та API</div>
            <div className={page.muted}>
              Оптимізована робота з великими обсягами даних про фільми.
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <span className={page.badge}>PostgreSQL</span>
              <span className={page.badge}>Prisma</span>
              <span className={page.badge}>Vercel Edge</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className={`card ${page.section}`}>
        <h2 className={page.h2}>Плани на майбутнє</h2>
        <p className={page.muted}>
          Ми постійно працюємо над покращенням. Ось що з’явиться зовсім скоро:
        </p>
        
        <div className={page.grid2} style={{ marginTop: '1.5rem' }}>
          <div>
            <div className={page.contactTitle}>Q3 2025</div>
            <ul className={page.list}>
              <li>Особистий кабінет користувача</li>
              <li>Списки "Переглянути пізніше"</li>
              <li>Історія переглядів</li>
            </ul>
          </div>
          <div>
            <div className={page.contactTitle}>Q4 2025</div>
            <ul className={page.list}>
              <li>Система рецензій та оцінок</li>
              <li>Темна/світла тема (в налаштуваннях)</li>
              <li>AI-рекомендації на основі вподобань</li>
            </ul>
          </div>
        </div>

        <div className={page.actions} style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
           <Link className={`${page.button} ${page.primary}`} href={`/${safeLocale}/catalog`}> 
             Перейти до каталогу
           </Link>
           <Link className={page.button} href={`/${safeLocale}/contacts`}>
             Написати нам
           </Link>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className={page.section}>
        <p className={page.muted}>
          Розроблено з любов'ю до коду та кіно. Автор проекту:{" "}
          <a 
            className={page.linkAccent} 
            href="https://github.com/your-username" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Головач Михайло
          </a>
        </p>
      </section>
    </>
  );
}