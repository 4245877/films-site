import type { Locale } from "@/lib/i18n";
import { getFilmTypes, getFilmsByType, getFilm } from "@/lib/content/mock";
import { withBasePath } from "@/lib/basePath";

export const dynamicParams = false;

export function generateStaticParams() {
  const types = getFilmTypes();
  const locales: Locale[] = ["uk", "en"];

  return locales.flatMap((locale) =>
    types.flatMap((t) => getFilmsByType(t.slug).map((f) => ({
      locale,
      typeSlug: t.slug,
      filmSlug: f.slug
    })))
  );
}

export default function FilmCard({
  params
}: {
  params: { locale: Locale; typeSlug: string; filmSlug: string };
}) {
  const { locale, typeSlug, filmSlug } = params;
  const film = getFilm(typeSlug, filmSlug);

  if (!film) return <div>Not found</div>;

  return (
    <>
      <h1 style={{ marginTop: 14 }}>{film.title[locale]}</h1>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
        <img
          src={withBasePath(film.posterPath)}
          alt={film.title[locale]}
          style={{ width: 260, borderRadius: 14, border: "1px solid var(--border)" }}
        />

        <div style={{ flex: "1 1 320px" }}>
          <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{film.summary[locale]}</p>

          <ul style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            <li>Year: {film.year}</li>
            <li>Country: {film.country}</li>
            <li>Duration: {film.durationMin} min</li>
            <li>Director: {film.director}</li>
          </ul>

          {film.trailerUrl ? (
            <p>
              <a href={film.trailerUrl} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>
                Trailer / Official source
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
