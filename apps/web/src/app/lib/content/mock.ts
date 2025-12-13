import type { Locale } from "@/lib/i18n";

export type FilmType = {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export type Film = {
  typeSlug: string;
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  year: number;
  country: string;
  durationMin: number;
  director: string;
  posterPath: string;
  trailerUrl?: string;
};

export type NewsType = {
  slug: string;
  title: Record<Locale, string>;
};

export type NewsItem = {
  id: string;
  typeSlug: string;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  publishedAt: string; // YYYY-MM-DD
  eventFrom?: string;  // YYYY-MM-DD
  eventTo?: string;    // YYYY-MM-DD
};

export type DocItem = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  kind: "file" | "link";
  url: string;
};

export type EventItem = {
  id: string;
  date: string; // YYYY-MM-DD
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export type Banner = {
  id: string;
  title: Record<Locale, string>;
  url: string;
  imagePath: string;
};

const filmTypes: FilmType[] = [
  {
    slug: "feature",
    title: { uk: "Художні фільми", en: "Feature films" },
    description: {
      uk: "Історії з акторами та постановкою, створені для художнього враження.",
      en: "Story-driven films with actors and staged production."
    }
  },
  {
    slug: "documentary",
    title: { uk: "Документальні", en: "Documentary" },
    description: {
      uk: "Фільми про реальні події та людей, з фокусом на фактах.",
      en: "Films about real events and people, focused on facts."
    }
  },
  {
    slug: "animation",
    title: { uk: "Мультиплікаційні", en: "Animation" },
    description: {
      uk: "Історії, створені анімацією: 2D, 3D або змішаними техніками.",
      en: "Stories created via animation: 2D, 3D, or mixed techniques."
    }
  }
];

const films: Film[] = [
  {
    typeSlug: "feature",
    slug: "inception",
    title: { uk: "Початок", en: "Inception" },
    summary: {
      uk: "Науково-фантастичний трилер про проникнення у сни та ідеї.",
      en: "A sci-fi thriller about entering dreams and planting ideas."
    },
    year: 2010,
    country: "USA/UK",
    durationMin: 148,
    director: "Christopher Nolan",
    posterPath: "/posters/feature.svg",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    typeSlug: "documentary",
    slug: "planet-earth",
    title: { uk: "Планета Земля", en: "Planet Earth" },
    summary: {
      uk: "Документальний серіал про природу та різноманіття екосистем.",
      en: "A documentary series about nature and ecosystems."
    },
    year: 2006,
    country: "UK",
    durationMin: 50,
    director: "Alastair Fothergill",
    posterPath: "/posters/documentary.svg"
  },
  {
    typeSlug: "animation",
    slug: "spirited-away",
    title: { uk: "Віднесені привидами", en: "Spirited Away" },
    summary: {
      uk: "Анімаційна пригода про дівчинку у світі духів.",
      en: "An animated adventure about a girl in a spirit world."
    },
    year: 2001,
    country: "Japan",
    durationMin: 125,
    director: "Hayao Miyazaki",
    posterPath: "/posters/animation.svg"
  }
];

const newsTypes: NewsType[] = [
  { slug: "announcement", title: { uk: "Оголошення", en: "Announcement" } },
  { slug: "event", title: { uk: "Подія", en: "Event" } },
  { slug: "update", title: { uk: "Оновлення", en: "Update" } }
];

const news: NewsItem[] = [
  {
    id: "n1",
    typeSlug: "announcement",
    title: { uk: "Запуск сайту", en: "Website launch" },
    body: {
      uk: "Ми опублікували першу версію навчального сайту «Фільми».",
      en: "We published the first version of the educational website."
    },
    publishedAt: "2025-12-01"
  },
  {
    id: "n2",
    typeSlug: "event",
    title: { uk: "Кінолекторій", en: "Film lecture" },
    body: {
      uk: "Подія для студентів: обговорюємо документальне кіно.",
      en: "Student event: discussing documentary cinema."
    },
    publishedAt: "2025-12-05",
    eventFrom: "2025-12-15",
    eventTo: "2025-12-15"
  },
  {
    id: "n3",
    typeSlug: "update",
    title: { uk: "Додано новий розділ", en: "New section added" },
    body: {
      uk: "З’явився розділ «Документи/матеріали».",
      en: "The “Documents/Materials” section is now available."
    },
    publishedAt: "2025-12-07"
  }
];

const documents: DocItem[] = [
  {
    id: "d1",
    title: { uk: "Методичка (PDF)", en: "Guidelines (PDF)" },
    description: { uk: "Короткі матеріали для студентів.", en: "Short student materials." },
    kind: "link",
    url: "https://example.com"
  },
  {
    id: "d2",
    title: { uk: "Посилання на відео", en: "Video link" },
    description: { uk: "Добірка трейлерів.", en: "Trailer collection." },
    kind: "link",
    url: "https://www.youtube.com"
  }
];

const events: EventItem[] = [
  {
    id: "e1",
    date: "2025-12-15",
    title: { uk: "Кінолекторій", en: "Film lecture" },
    description: { uk: "Зустріч та обговорення.", en: "Meetup and discussion." }
  }
];

const banners: Banner[] = [
  {
    id: "b1",
    title: { uk: "Партнер 1", en: "Partner 1" },
    url: "https://example.com",
    imagePath: "/banners/partner1.svg"
  },
  {
    id: "b2",
    title: { uk: "Партнер 2", en: "Partner 2" },
    url: "https://example.org",
    imagePath: "/banners/partner2.svg"
  }
];

export function getFilmTypes(): FilmType[] {
  return filmTypes;
}

export function getFilmsByType(typeSlug: string): Film[] {
  return films.filter(f => f.typeSlug === typeSlug);
}

export function getFilm(typeSlug: string, filmSlug: string): Film | undefined {
  return films.find(f => f.typeSlug === typeSlug && f.slug === filmSlug);
}

export function getNewsTypes(): NewsType[] {
  return newsTypes;
}

export function getNews(): NewsItem[] {
  return news.slice().sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getDocuments(): DocItem[] {
  return documents;
}

export function getEvents(): EventItem[] {
  return events;
}

export function getBanners(): Banner[] {
  return banners;
}
