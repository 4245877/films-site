"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { t, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import page from "./SearchPage.module.css";

export const dynamicParams = false;

// ---------- helpers ----------
function firstString(v: unknown): string | "" {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  return "";
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

// База для API (чтобы работало и на :3000, и на :8080)
function apiBase(): string {
  // Если сайт открыт через nginx (:8080) — удобно оставить пусто (same-origin),
  // но если сайт открыт на :3000 — нужен явный base.
  const envBase = process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") {
    // в браузере: если открыто на 8080, можно дергать относительные /api/...
    // но оставим приоритет env, чтобы одинаково работало везде
    return envBase || "http://localhost:8080";
  }
  return envBase || "http://localhost:8080";
}

function resolveAssetUrl(u?: string | null): string | "" {
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  // Strapi обычно отдаёт /uploads/...
  // Если мы сейчас на :3000, то /uploads не там — поэтому префиксуем base.
  const base = apiBase();
  try {
    return new URL(u, base).toString();
  } catch {
    return u;
  }
}

function pickMediaUrl(obj: any): string | "" {
  // Поддержка разных форм Strapi (v4/v5/flatten)
  const url =
    obj?.url ??
    obj?.data?.attributes?.url ??
    obj?.data?.url ??
    obj?.attributes?.url ??
    obj?.formats?.small?.url ??
    obj?.formats?.thumbnail?.url ??
    "";

  return resolveAssetUrl(url);
}

type SortMode = "newest" | "oldest" | "az" | "za";

type Ui = {
  statsTotal: string;
  statsShown: string;

  searchLabel: string;
  searchPlaceholder: string;

  yearFrom: string;
  yearTo: string;

  sortLabel: string;
  sortNewest: string;
  sortOldest: string;
  sortAZ: string;
  sortZA: string;

  hint: string;
  noResults: string;

  jumpRandom: string;
  toTop: string;

  loadMore: string;
  loading: string;

  forbidden: string;
};

const ui: Record<Locale, Ui> = {
  uk: {
    statsTotal: "усього",
    statsShown: "показано",

    searchLabel: "Пошук",
    searchPlaceholder: "Назва, slug, рік…",

    yearFrom: "Рік від",
    yearTo: "Рік до",

    sortLabel: "Сортування",
    sortNewest: "Найновіші",
    sortOldest: "Найстаріші",
    sortAZ: "Назва A→Z",
    sortZA: "Назва Z→A",

    hint: "Показуються лише фільми, які реально є в базі (Strapi).",
    noResults: "Нічого не знайдено",

    jumpRandom: "Випадковий",
    toTop: "Нагору",

    loadMore: "Показати ще",
    loading: "Завантаження…",

    forbidden:
      "Доступ заборонено (403). У Strapi увімкни Public → Films: find/findOne і Film Types: find/findOne."
  },
  en: {
    statsTotal: "total",
    statsShown: "shown",

    searchLabel: "Search",
    searchPlaceholder: "Title, slug, year…",

    yearFrom: "Year from",
    yearTo: "Year to",

    sortLabel: "Sort",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortAZ: "Title A→Z",
    sortZA: "Title Z→A",

    hint: "Only films that exist in the database (Strapi) are shown.",
    noResults: "No results",

    jumpRandom: "Random",
    toTop: "Top",

    loadMore: "Load more",
    loading: "Loading…",

    forbidden:
      "Forbidden (403). In Strapi enable Public permissions: Films find/findOne and Film Types find/findOne."
  }
};

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

type FilmItem = {
  key: string; // stable key
  slug: string;
  title: string;
  year?: number;
  posterUrl: string; // may be ""
};

type StrapiListResponse = {
  data: any[];
  meta?: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number };
  };
};

function normalizeFilm(raw: any): FilmItem | null {
  const a = raw?.attributes ?? raw;
  const id = raw?.id ?? a?.id ?? a?.documentId ?? "";
  const slug = String(a?.slug ?? "").trim();
  const title =
    String(a?.title ?? a?.titleUk ?? a?.titleEn ?? "").trim() || slug;

  if (!slug) return null;

  const yearRaw = a?.year;
  const yearNum =
    typeof yearRaw === "number" ? yearRaw : typeof yearRaw === "string" ? Number(yearRaw) : NaN;

  const posterObj = a?.poster ?? a?.cover ?? a?.image ?? a?.thumbnail ?? null;
  const posterUrl = posterObj ? pickMediaUrl(posterObj) : "";

  return {
    key: String(id || slug),
    slug,
    title,
    year: Number.isFinite(yearNum) ? yearNum : undefined,
    posterUrl
  };
}

function sortToStrapi(sort: SortMode): string {
  if (sort === "newest") return "year:desc";
  if (sort === "oldest") return "year:asc";
  if (sort === "az") return "title:asc";
  return "title:desc";
}

type VirtualListProps = {
  count: number;
  itemHeight: number;
  overscan: number;
  renderRow: (index: number) => React.ReactNode;
  onScrollTopChange?: (top: number) => void;
};

function VirtualList({ count, itemHeight, overscan, renderRow, onScrollTopChange }: VirtualListProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [viewportH, setViewportH] = React.useState(520);
  const [scrollTop, setScrollTop] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setViewportH(el.clientHeight || 520);
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const totalH = count * itemHeight;
  const start = clamp(Math.floor(scrollTop / itemHeight) - overscan, 0, Math.max(0, count - 1));
  const visible = Math.ceil(viewportH / itemHeight) + overscan * 2;
  const end = clamp(start + visible, 0, count);

  const offsetY = start * itemHeight;

  return (
    <div
      ref={ref}
      className={page.viewport}
      onScroll={(e) => {
        const top = (e.currentTarget as HTMLDivElement).scrollTop;
        setScrollTop(top);
        onScrollTopChange?.(top);
      }}
      role="list"
      aria-label="Films list"
    >
      <div className={page.spacer} style={{ height: totalH }}>
        <div className={page.window} style={{ transform: `translateY(${offsetY}px)` }}>
          {Array.from({ length: end - start }, (_, i) => renderRow(start + i))}
        </div>
      </div>
    </div>
  );
}

function SearchClient({ locale }: { locale: Locale }) {
  const c = ui[locale];

  const [q, setQ] = React.useState("");
  const [qDebounced, setQDebounced] = React.useState("");

  const [yearFrom, setYearFrom] = React.useState<number>(MIN_YEAR);
  const [yearTo, setYearTo] = React.useState<number>(MAX_YEAR);

  const [sort, setSort] = React.useState<SortMode>("newest");
  const [showTopBtn, setShowTopBtn] = React.useState(false);

  const [items, setItems] = React.useState<FilmItem[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [pageNum, setPageNum] = React.useState<number>(1);
  const pageSize = 50;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingMore, setLoadingMore] = React.useState<boolean>(false);
  const [errorText, setErrorText] = React.useState<string>("");

  const listApiRef = React.useRef<{ scrollToTop: () => void; scrollToIndex: (i: number) => void } | null>(null);

  React.useEffect(() => {
    const tt = window.setTimeout(() => setQDebounced(q.trim()), 220);
    return () => window.clearTimeout(tt);
  }, [q]);

  React.useEffect(() => {
    if (yearFrom > yearTo) setYearFrom(yearTo);
  }, [yearFrom, yearTo]);

  // Смена фильтров — сбрасываем страницу и список
  React.useEffect(() => {
    setItems([]);
    setTotal(0);
    setPageNum(1);
    setErrorText("");
  }, [qDebounced, yearFrom, yearTo, sort]);

  React.useEffect(() => {
    const controller = new AbortController();

    async function run() {
      const isFirstPage = pageNum === 1;
      setErrorText("");
      if (isFirstPage) setLoading(true);
      else setLoadingMore(true);

      try {
        const params = new URLSearchParams();

        params.set("pagination[page]", String(pageNum));
        params.set("pagination[pageSize]", String(pageSize));
        params.set("sort", sortToStrapi(sort));
        params.set("populate", "*");

        // фильтр по тексту (title/titleEn/slug)
        if (qDebounced) {
          params.set("filters[$or][0][title][$containsi]", qDebounced);
          params.set("filters[$or][1][titleEn][$containsi]", qDebounced);
          params.set("filters[$or][2][slug][$containsi]", qDebounced);
        }

        // фильтр по годам (если поле year в модели есть — работает; если нет — просто не ставь год)
        params.set("filters[year][$gte]", String(yearFrom));
        params.set("filters[year][$lte]", String(yearTo));

        const base = apiBase();
        const url = `${base}/api/films?${params.toString()}`;

        const res = await fetch(url, {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          cache: "force-cache"
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          if (res.status === 403) {
            setErrorText(c.forbidden);
            setItems([]);
            setTotal(0);
            return;
          }
          throw new Error(`API Error ${res.status}: ${text}`);
        }

        const json = (await res.json()) as StrapiListResponse;

        const normalized = (json.data || [])
          .map(normalizeFilm)
          .filter(Boolean) as FilmItem[];

        const newTotal = json.meta?.pagination?.total ?? normalized.length;

        setTotal(newTotal);

        setItems((prev) => {
          if (isFirstPage) return normalized;

          // аккуратно добавляем без дублей по slug
          const seen = new Set(prev.map((x) => x.slug));
          const merged = prev.slice();
          for (const it of normalized) {
            if (!seen.has(it.slug)) {
              seen.add(it.slug);
              merged.push(it);
            }
          }
          return merged;
        });
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setErrorText(String(e?.message || e));
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    run();
    return () => controller.abort();
  }, [pageNum, qDebounced, yearFrom, yearTo, sort, locale]);

  const scrollToTop = React.useCallback(() => {
    const el = document.querySelector(`.${page.viewport}`) as HTMLDivElement | null;
    if (el) el.scrollTop = 0;
  }, []);

  const scrollToIndex = React.useCallback((i: number) => {
    const el = document.querySelector(`.${page.viewport}`) as HTMLDivElement | null;
    if (!el) return;
    el.scrollTop = i * 96;
  }, []);

  React.useEffect(() => {
    listApiRef.current = { scrollToTop, scrollToIndex };
  }, [scrollToTop, scrollToIndex]);

  const itemHeight = 96;

  const renderRow = React.useCallback(
    (index: number) => {
      const film = items[index];
      if (!film) return null;

      const watchHref = `/${locale}/films/watch/${film.slug}/`;

      // если нет постера — покажем аккуратный плейсхолдер (как раньше)
      const hue = (index * 37) % 360;

      return (
        <Link key={`${film.key}-${index}`} className={page.row} href={watchHref} role="listitem">
          {film.posterUrl ? (
            <img className={page.posterImg as any} src={film.posterUrl} alt={film.title} />
          ) : (
            <div className={page.poster} style={{ ["--h" as any]: `${hue}deg` }}>
              <span className={page.posterText}>{film.title.slice(0, 2).toUpperCase()}</span>
            </div>
          )}

          <div className={page.rowBody}>
            <div className={page.rowTitle}>{film.title}</div>
            <div className={page.rowSub}>
              {typeof film.year === "number" ? (
                <>
                  <span className={page.badgeSoft}>{film.year}</span>
                  <span className={page.dot} aria-hidden="true">•</span>
                </>
              ) : null}
              <span className={page.mutedInline}>slug: {film.slug}</span>
            </div>
          </div>
        </Link>
      );
    },
    [items, locale]
  );

  const shown = items.length;
  const numberLocale = locale === "uk" ? "uk-UA" : "en-US";
  const totalLabel = `${total.toLocaleString(numberLocale)} ${c.statsTotal}`;
  const shownLabel = `${shown.toLocaleString(numberLocale)} ${c.statsShown}`;

  const canLoadMore = shown > 0 && shown < total && !loading && !loadingMore;

  return (
    <div className={page.shell}>
      <div className={page.toolbar}>
        <div className={page.field}>
          <label className={page.label} htmlFor="q">
            {c.searchLabel}
          </label>
          <input
            id="q"
            className={page.input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={c.searchPlaceholder}
            inputMode="search"
            autoComplete="off"
          />
          <div className={page.hint}>{c.hint}</div>
        </div>

        <div className={page.fieldRow}>
          <div className={page.field}>
            <label className={page.label} htmlFor="yf">
              {c.yearFrom}
            </label>
            <input
              id="yf"
              className={page.input}
              type="number"
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={yearFrom}
              onChange={(e) => setYearFrom(clamp(Number(e.target.value), MIN_YEAR, MAX_YEAR))}
            />
          </div>

          <div className={page.field}>
            <label className={page.label} htmlFor="yt">
              {c.yearTo}
            </label>
            <input
              id="yt"
              className={page.input}
              type="number"
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={yearTo}
              onChange={(e) => setYearTo(clamp(Number(e.target.value), MIN_YEAR, MAX_YEAR))}
            />
          </div>

          <div className={page.field}>
            <label className={page.label} htmlFor="sort">
              {c.sortLabel}
            </label>
            <select
              id="sort"
              className={page.select}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
            >
              <option value="newest">{c.sortNewest}</option>
              <option value="oldest">{c.sortOldest}</option>
              <option value="az">{c.sortAZ}</option>
              <option value="za">{c.sortZA}</option>
            </select>
          </div>

          <button
            type="button"
            className={page.btn}
            onClick={() => {
              if (items.length === 0) return;
              const i = Math.floor(Math.random() * items.length);
              listApiRef.current?.scrollToIndex(i);
            }}
            disabled={items.length === 0}
          >
            {c.jumpRandom}
          </button>
        </div>

        <div className={page.stats}>
          <span className={page.pill}>{totalLabel}</span>
          <span className={page.pill}>{shownLabel}</span>
        </div>

        {errorText ? (
          <div className={page.empty} style={{ marginTop: 10 }}>
            {errorText}
          </div>
        ) : null}
      </div>

      {loading ? (
        <div className={page.empty}>{c.loading}</div>
      ) : shown === 0 ? (
        <div className={page.empty}>{c.noResults}</div>
      ) : (
        <>
          <VirtualList
            count={shown}
            itemHeight={itemHeight}
            overscan={8}
            renderRow={renderRow}
            onScrollTopChange={(top) => setShowTopBtn(top > 600)}
          />

          <div style={{ display: "flex", gap: 12, paddingTop: 12 }}>
            {canLoadMore ? (
              <button type="button" className={page.btn} onClick={() => setPageNum((p) => p + 1)}>
                {c.loadMore}
              </button>
            ) : null}

            {loadingMore ? <div className={page.mutedInline}>{c.loading}</div> : null}
          </div>
        </>
      )}

      {showTopBtn ? (
        <button type="button" className={page.toTop} onClick={() => listApiRef.current?.scrollToTop()}>
          {c.toTop}
        </button>
      ) : null}
    </div>
  );
}

// ---------- Page (merged) ----------
export default function SearchPage() {
  const params = useParams<Record<string, string | string[]>>();
  const pathname = usePathname();

  const fromHook = firstString(params?.locale);
  const fromPath = firstString(pathname?.split("/")[1]);

  const localeRaw = fromHook || fromPath || "";
  const safeLocale: Locale = isLocale(localeRaw) ? (localeRaw as Locale) : defaultLocale;

  const title = t(safeLocale, "search") || (safeLocale === "uk" ? "Пошук" : "Search");

  return (
    <div className={page.page}>
      <header className={page.hero}>
        <h1 className={page.h1}>{title}</h1>
        <p className={page.muted}>
          {safeLocale === "uk"
            ? "Пошук по реальній базі фільмів (Strapi). Клік по фільму відкриває сторінку перегляду."
            : "Search through real films from the database (Strapi). Click a film to open its watch page."}
        </p>
      </header>

      <SearchClient locale={safeLocale} />
    </div>
  );
}
