export const locales = ["uk", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

type Dict = Record<string, string>;

const uk: Dict = {
  siteTitle: "Фільми",
  projectSubtitle: "Навчально-довідковий сайт про типи фільмів",
  home: "Головна",
  films: "Типи фільмів",
  news: "Новини",
  documents: "Документи/матеріали",
  calendar: "Календар подій",
  about: "Про проєкт",
  contacts: "Контакти",
  forum: "Форум",
  search: "Пошук",
  chooseLanguage: "Обери мову",
  goToUkrainian: "Перейти українською",
  goToEnglish: "Go to English",
  bannersTitle: "Партнери",
  addNews: "Додати новину",
  filter: "Фільтрація",
  from: "Від",
  to: "До",
  newsType: "Тип новини",
  all: "Усі",
  notFound: "Нічого не знайдено"
};

const en: Dict = {
  siteTitle: "Films",
  projectSubtitle: "Educational reference site about film types",
  home: "Home",
  films: "Film types",
  news: "News",
  documents: "Documents/Materials",
  calendar: "Event calendar",
  about: "About",
  contacts: "Contacts",
  forum: "Forum",
  search: "Search",
  chooseLanguage: "Choose a language",
  goToUkrainian: "Go Ukrainian",
  goToEnglish: "Go to English",
  bannersTitle: "Partners",
  addNews: "Add news",
  filter: "Filters",
  from: "From",
  to: "To",
  newsType: "News type",
  all: "All",
  notFound: "Nothing found"
};

export const dict: Record<Locale, Dict> = { uk, en };

export function t(locale: Locale, key: keyof typeof uk): string {
  return dict[locale][key] ?? String(key);
}
