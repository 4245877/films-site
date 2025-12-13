import Link from "next/link";
import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "@/styles/Page.module.css";

export const dynamicParams = false;

export default async function Contacts({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  const href = (path: string) => `/${safeLocale}${path}`;

  return (
    <>
      <h1 className={page.h1}>{t(safeLocale, "contacts")}</h1>
      <p className={page.muted}>
        Ми зробили цю сторінку максимально зручною: швидкий зв’язок, відповіді на часті питання,
        та підказки, якщо щось не працює.
      </p>

      {/* QUICK CONTACT */}
      <section className={`card ${page.section}`}>
        <h2 className={page.h2}>Швидкий зв’язок</h2>

        <div className={page.contactGrid}>
          <div className={page.contactCard}>
            <div className={page.contactTitle}>Email підтримки</div>
            <div className={page.muted}>
              Для проблем з акаунтом, доступом, пропозицій та партнерств.
            </div>
            <div className={page.contactRow}>
              <a className={page.linkAccent} href="mailto:support@films.example">
                support@films.example
              </a>
              <span className={page.badge}>відповідь 24–72 год</span>
            </div>
          </div>

          <div className={page.contactCard}>
            <div className={page.contactTitle}>Telegram</div>
            <div className={page.muted}>
              Для швидких уточнень і коротких питань.
            </div>
            <div className={page.contactRow}>
              <a className={page.linkAccent} href="https://t.me/films_example">
                @films_example
              </a>
              <span className={page.badge}>онлайн в робочий час</span>
            </div>
          </div>

          <div className={page.contactCard}>
            <div className={page.contactTitle}>Форма звернення</div>
            <div className={page.muted}>
              Якщо не хочеш писати вручну — залиш заявку в 1 хвилину.
            </div>
            <div className={page.actions}>
              <Link className={`${page.button} ${page.primary}`} href={href("/support")}>
                Відкрити форму
              </Link>
              <Link className={page.button} href={href("/faq")}>
                Часті питання
              </Link>
            </div>
          </div>
        </div>

        <p className={page.note}>
          Поки це демо-контакти. Коли підключиш бекенд — підставиш реальні адреси й SLA.
        </p>
      </section>

      {/* FAQ SHORT */}
      <section className={`card ${page.section}`}>
        <h2 className={page.h2}>Найчастіші питання</h2>

        <div className={page.faqList}>
          <details className={page.faq}>
            <summary className={page.faqSummary}>
              Я не можу знайти фільм/аніме. Як краще шукати?
            </summary>
            <div className={page.faqBody}>
              Спробуй: назву українською/англійською, альтернативну назву, рік або жанр.
              Добре працюють запити на кшталт: <b>“трилер 2019”</b>, <b>“аніме кіберпанк”</b>, <b>“детектив серіал”</b>.
              Якщо не трудно — напиши нам назву, додамо ключові синоніми в каталог.
            </div>
          </details>

          <details className={page.faq}>
            <summary className={page.faqSummary}>
              У мене не відкривається відео / помилка відтворення
            </summary>
            <div className={page.faqBody}>
              Найчастіше допомагає: оновити сторінку, спробувати інший браузер,
              вимкнути блокувальники, перевірити інтернет. Якщо помилка повторюється —
              надішли <b>скрін</b> і <b>час</b> помилки на email.
            </div>
          </details>

          <details className={page.faq}>
            <summary className={page.faqSummary}>
              Як запропонувати тайтл для додавання (1 000 000+ — це багато)?
            </summary>
            <div className={page.faqBody}>
              Так, каталог великий. Ми додаємо тайтли пакетами й потім “дочищаємо” метадані.
              Надішли назву, рік і посилання на сторінку (IMDb/MAL/кіно-базу) — ми підтягнемо дані.
            </div>
          </details>

          <details className={page.faq}>
            <summary className={page.faqSummary}>
              У мене є ідея або партнерська пропозиція
            </summary>
            <div className={page.faqBody}>
              Пиши на <a className={page.linkAccent} href="mailto:partners@films.example">partners@films.example</a>.
              Коротко: хто ти, що пропонуєш, які вигоди для користувачів і як це вплине на зручність.
            </div>
          </details>
        </div>
      </section>

      {/* STATUS + PRIORITY */}
      <section className={`card ${page.section}`}>
        <h2 className={page.h2}>Щоб ми відповіли швидше</h2>

        <div className={page.grid2}>
          <div className={page.miniCard}>
            <div className={page.miniTitle}>Додай в лист</div>
            <ul className={page.list}>
              <li>посилання на сторінку</li>
              <li>що саме не працює (1–2 речення)</li>
              <li>скрін/текст помилки</li>
              <li>браузер і пристрій</li>
            </ul>
          </div>

          <div className={page.miniCard}>
            <div className={page.miniTitle}>Термінові випадки</div>
            <div className={page.muted}>
              Якщо це “не можу увійти” або “зник профіль” — в темі листа вкажи:{" "}
              <b>[ACCOUNT]</b>. Якщо проблема з оплатою/підпискою — <b>[BILLING]</b>.
            </div>
            <div className={page.muted} style={{ marginTop: 8 }}>
              Ми не просимо паролі. Ніколи.
            </div>
          </div>
        </div>
      </section>

      {/* NAV */}
      <section className={page.section}>
        <p className={page.muted}>
          Можеш також перейти до{" "}
          <Link className={page.linkAccent} href={href("/faq")}>
            FAQ
          </Link>{" "}
          або{" "}
          <Link className={page.linkAccent} href={href("/search")}>
            пошуку
          </Link>
          , якщо просто хочеш швидко знайти тайтл.
        </p>
      </section>
    </>
  );
}
