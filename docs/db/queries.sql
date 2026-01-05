-- =========================================================
-- queries.sql — вибірка/агрегації для БД Films (PostgreSQL)
-- Таблиці: films, film_types, films_film_type_lnk,
--          articles, authors, categories,
--          articles_author_lnk, articles_category_lnk,
--          i18n_locale
-- =========================================================

-- ---------------------------------------------------------
-- Strapi: для публічного сайту працюємо тільки з опублікованими
-- (published_at IS NOT NULL). Робимо TEMP VIEW для всіх запитів нижче.
-- ---------------------------------------------------------

DROP VIEW IF EXISTS films_pub;
DROP VIEW IF EXISTS film_types_pub;
DROP VIEW IF EXISTS articles_pub;

CREATE TEMP VIEW films_pub AS
SELECT * FROM films WHERE published_at IS NOT NULL;

CREATE TEMP VIEW film_types_pub AS
SELECT * FROM film_types WHERE published_at IS NOT NULL;

CREATE TEMP VIEW articles_pub AS
SELECT * FROM articles WHERE published_at IS NOT NULL;

-- Q01. Усі типи фільмів + скільки фільмів у кожному (LEFT JOIN, GROUP BY)
SELECT
  ft.id,
  ft.slug,
  ft.title_uk,
  ft.title_en,
  COUNT(DISTINCT f.id) AS films_count
FROM film_types_pub ft
LEFT JOIN films_film_type_lnk l ON l.film_type_id = ft.id
LEFT JOIN films_pub f ON f.id = l.film_id
GROUP BY ft.id, ft.slug, ft.title_uk, ft.title_en
ORDER BY ft."order" NULLS LAST, ft.slug;

-- Q02. Список фільмів з їх типами (string_agg)
SELECT
  f.id,
  f.title,
  f.year,
  f.slug,
  COALESCE(STRING_AGG(DISTINCT ft.slug, ', ' ORDER BY ft.slug), '(no type)') AS film_types
FROM films_pub f
LEFT JOIN films_film_type_lnk l ON l.film_id = f.id
LEFT JOIN film_types_pub ft ON ft.id = l.film_type_id
GROUP BY f.id, f.title, f.year, f.slug
ORDER BY f.year DESC NULLS LAST, f.title;

-- Q03. Фільми за роком у діапазоні (BETWEEN + агрегація)
SELECT
  f.year,
  COUNT(*) AS films_count
FROM films_pub f
WHERE f.year BETWEEN 1900 AND 2100
GROUP BY f.year
ORDER BY f.year DESC NULLS LAST;

-- Q04. Скільки фільмів по локалях (JOIN з i18n_locale по code) — щоб не було “порожньо”
SELECT
  COALESCE(f.locale, '(default)') AS locale,
  COALESCE(il.name, '(not in i18n_locale)') AS locale_name,
  COUNT(*) AS films_count
FROM films_pub f
LEFT JOIN i18n_locale il ON il.code = f.locale
GROUP BY COALESCE(f.locale, '(default)'), COALESCE(il.name, '(not in i18n_locale)')
ORDER BY films_count DESC, locale;

-- Q05. Фільми, що мають тип (IN + ORDER BY + LIMIT)
SELECT
  id, title, slug, year, locale, published_at
FROM films_pub
WHERE id IN (SELECT film_id FROM films_film_type_lnk)
ORDER BY published_at DESC NULLS LAST, year DESC NULLS LAST
LIMIT 20;

-- Q06. Останні опубліковані статті (ORDER BY published_at)
SELECT
  id, title, slug, locale, published_at
FROM articles_pub
ORDER BY published_at DESC
LIMIT 20;

-- Q07. Статті + автори (M:N через articles_author_lnk, JOIN + string_agg)
SELECT
  a.id,
  a.title,
  a.slug,
  a.locale,
  COALESCE(STRING_AGG(DISTINCT au.name, ', ' ORDER BY au.name), '(no author)') AS authors
FROM articles_pub a
LEFT JOIN articles_author_lnk al ON al.article_id = a.id
LEFT JOIN authors au ON au.id = al.author_id
GROUP BY a.id, a.title, a.slug, a.locale
ORDER BY a.published_at DESC NULLS LAST, a.created_at DESC;

-- Q08. Статті + категорії (M:N через articles_category_lnk, JOIN + string_agg)
SELECT
  a.id,
  a.title,
  a.slug,
  a.locale,
  COALESCE(STRING_AGG(DISTINCT c.name, ', ' ORDER BY c.name), '(no category)') AS categories
FROM articles_pub a
LEFT JOIN articles_category_lnk cl ON cl.article_id = a.id
LEFT JOIN categories c ON c.id = cl.category_id
GROUP BY a.id, a.title, a.slug, a.locale
ORDER BY a.published_at DESC NULLS LAST, a.created_at DESC;

-- Q09. Статті з авторами і категоріями разом (два M:N)
-- Використовуємо підзапити, щоб уникнути “перемноження” рядків
SELECT
  a.id,
  a.title,
  a.slug,
  a.locale,
  COALESCE(auth.authors, '(no author)') AS authors,
  COALESCE(cat.categories, '(no category)') AS categories
FROM articles_pub a
LEFT JOIN (
  SELECT
    al.article_id,
    STRING_AGG(DISTINCT au.name, ', ' ORDER BY au.name) AS authors
  FROM articles_author_lnk al
  JOIN articles_pub ap ON ap.id = al.article_id
  JOIN authors au ON au.id = al.author_id
  GROUP BY al.article_id
) auth ON auth.article_id = a.id
LEFT JOIN (
  SELECT
    cl.article_id,
    STRING_AGG(DISTINCT c.name, ', ' ORDER BY c.name) AS categories
  FROM articles_category_lnk cl
  JOIN articles_pub ap ON ap.id = cl.article_id
  JOIN categories c ON c.id = cl.category_id
  GROUP BY cl.article_id
) cat ON cat.article_id = a.id
ORDER BY a.published_at DESC NULLS LAST, a.created_at DESC;

-- Q10. Скільки статей у кожній категорії (GROUP BY)
SELECT
  c.id,
  c.name,
  c.slug,
  COUNT(DISTINCT a.id) AS articles_count
FROM categories c
LEFT JOIN articles_category_lnk cl ON cl.category_id = c.id
LEFT JOIN articles_pub a ON a.id = cl.article_id
GROUP BY c.id, c.name, c.slug
ORDER BY articles_count DESC, c.name;

-- Q11. Топ авторів за кількістю статей (GROUP BY + HAVING)
SELECT
  au.id,
  au.name,
  COUNT(DISTINCT a.id) AS articles_count
FROM authors au
JOIN articles_author_lnk al ON al.author_id = au.id
JOIN articles_pub a ON a.id = al.article_id
GROUP BY au.id, au.name
HAVING COUNT(DISTINCT a.id) >= 2
ORDER BY articles_count DESC, au.name;

-- Q12. Пошук фільмів за назвою/описом/slug (ILIKE)
-- Замінюй 'dune' на свій фрагмент
SELECT id, title, year, slug, locale
FROM films_pub
WHERE title ILIKE '%dune%'
   OR description ILIKE '%dune%'
   OR slug ILIKE '%dune%'
ORDER BY year DESC NULLS LAST, title;

-- Q13. Пошук статей за назвою/описом/slug (ILIKE)
-- Замінюй 'прем''єр' на свій фрагмент
SELECT id, title, slug, locale, published_at
FROM articles_pub
WHERE title ILIKE '%прем''єр%'
   OR description ILIKE '%прем''єр%'
   OR slug ILIKE '%прем%'
ORDER BY published_at DESC NULLS LAST, created_at DESC;

-- Q14. Фільми без типу (перевірка цілісності, LEFT JOIN + IS NULL)
SELECT
  f.id, f.title, f.slug, f.year, f.locale
FROM films_pub f
LEFT JOIN films_film_type_lnk l ON l.film_id = f.id
WHERE l.film_id IS NULL
ORDER BY f.year DESC NULLS LAST, f.title;

-- Q15. Перевірка унікальності slug (дублікати) — лише published
SELECT 'films' AS table_name, slug, COUNT(*) AS cnt
FROM films
WHERE published_at IS NOT NULL
GROUP BY slug
HAVING COUNT(*) > 1
UNION ALL
SELECT 'articles' AS table_name, slug, COUNT(*) AS cnt
FROM articles
WHERE published_at IS NOT NULL
GROUP BY slug
HAVING COUNT(*) > 1
ORDER BY table_name, cnt DESC, slug;
