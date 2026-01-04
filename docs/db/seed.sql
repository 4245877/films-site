--
-- PostgreSQL database dump
--

\restrict b2jwhz0KfN3LdXHV3qWUIJRQJxbMumK3BicFvkV6FApUdSoQJglHjLJ7mLnLwhf

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.articles (id, document_id, title, description, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (4, 'jnioy6jr7qqyjpphsdlvg0se', '╨Я╤А╨╡╨╝тАЩ╤Ф╤А╨╕ ╤В╨╕╨╢╨╜╤П: ╤Й╨╛ ╨┐╨╛╨┤╨╕╨▓╨╕╤В╨╕╤Б╤П ╨▓ ╨║╤Ц╨╜╨╛ ╤В╨░ ╨╛╨╜╨╗╨░╨╣╨╜', '╨Ю╨╜╨╛╨▓╨╕╨╗╨╕ ╨║╨░╨╗╨╡╨╜╨┤╨░╤А ╨┐╤А╨╡╨╝тАЩ╤Ф╤А ╤Ц ╨╖╤Ц╨▒╤А╨░╨╗╨╕ ╨╜╨░╨╣╤Ж╤Ц╨║╨░╨▓╤Ц╤И╤Ц ╤А╨╡╨╗╤Ц╨╖╨╕ ╤В╨╕╨╢╨╜╤П.', 'premiery-tyzhnia', '2025-12-27 11:32:19.99', '2025-12-28 21:08:23.871', NULL, 1, 1, NULL);
INSERT INTO public.articles (id, document_id, title, description, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (6, 'jnioy6jr7qqyjpphsdlvg0se', '╨Я╤А╨╡╨╝тАЩ╤Ф╤А╨╕ ╤В╨╕╨╢╨╜╤П: ╤Й╨╛ ╨┐╨╛╨┤╨╕╨▓╨╕╤В╨╕╤Б╤П ╨▓ ╨║╤Ц╨╜╨╛ ╤В╨░ ╨╛╨╜╨╗╨░╨╣╨╜', '╨Ю╨╜╨╛╨▓╨╕╨╗╨╕ ╨║╨░╨╗╨╡╨╜╨┤╨░╤А ╨┐╤А╨╡╨╝тАЩ╤Ф╤А ╤Ц ╨╖╤Ц╨▒╤А╨░╨╗╨╕ ╨╜╨░╨╣╤Ж╤Ц╨║╨░╨▓╤Ц╤И╤Ц ╤А╨╡╨╗╤Ц╨╖╨╕ ╤В╨╕╨╢╨╜╤П.', 'premiery-tyzhnia', '2025-12-27 11:32:19.99', '2025-12-28 21:08:23.871', '2025-12-28 21:08:23.894', 1, 1, NULL);
INSERT INTO public.articles (id, document_id, title, description, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'q8hxwxp3rfsftlxno68htovw', '╨в╨╡╨┐╨╡╤А ╨╜╨░ ╤Б╤В╨╛╤А╤Ц╨╜╨║╨░╤Е ╤Д╤Ц╨╗╤М╨╝╤Ц╨▓ ╤Ф ╤В╤А╨╡╨╣╨╗╨╡╤А╨╕, ╨║╨░╨┤╤А╨╕ ╤В╨░ ╤И╨▓╨╕╨┤╨║╤Ц ╨┐╨╛╤Б╨╕╨╗╨░╨╜╨╜╤П', '╨в╨╡╨┐╨╡╤А ╨╜╨░ ╤Б╤В╨╛╤А╤Ц╨╜╨║╨░╤Е ╤Д╤Ц╨╗╤М╨╝╤Ц╨▓ ╤Ф ╤В╤А╨╡╨╣╨╗╨╡╤А╨╕, ╨║╨░╨┤╤А╨╕ ╤В╨░ ╨╖╤А╤Г╤З╨╜╤Ц ╨┐╨╛╤Б╨╕╨╗╨░╨╜╨╜╤П.', 'treilery-kadry-posylannia', '2025-12-27 10:37:05.988', '2025-12-28 21:09:01.607', NULL, 1, 1, NULL);
INSERT INTO public.articles (id, document_id, title, description, slug, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (7, 'q8hxwxp3rfsftlxno68htovw', '╨в╨╡╨┐╨╡╤А ╨╜╨░ ╤Б╤В╨╛╤А╤Ц╨╜╨║╨░╤Е ╤Д╤Ц╨╗╤М╨╝╤Ц╨▓ ╤Ф ╤В╤А╨╡╨╣╨╗╨╡╤А╨╕, ╨║╨░╨┤╤А╨╕ ╤В╨░ ╤И╨▓╨╕╨┤╨║╤Ц ╨┐╨╛╤Б╨╕╨╗╨░╨╜╨╜╤П', '╨в╨╡╨┐╨╡╤А ╨╜╨░ ╤Б╤В╨╛╤А╤Ц╨╜╨║╨░╤Е ╤Д╤Ц╨╗╤М╨╝╤Ц╨▓ ╤Ф ╤В╤А╨╡╨╣╨╗╨╡╤А╨╕, ╨║╨░╨┤╤А╨╕ ╤В╨░ ╨╖╤А╤Г╤З╨╜╤Ц ╨┐╨╛╤Б╨╕╨╗╨░╨╜╨╜╤П.', 'treilery-kadry-posylannia', '2025-12-27 10:37:05.988', '2025-12-28 21:09:01.607', '2025-12-28 21:09:01.629', 1, 1, NULL);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.authors (id, document_id, name, email, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'brjmnb6a2gj4z806lehep67r', '╨а╨╡╨┤╨░╨║╤Ж╤Ц╤П', NULL, '2025-12-28 21:07:45.412', '2025-12-28 21:07:45.412', '2025-12-28 21:07:45.409', 1, 1, NULL);


--
-- Data for Name: articles_author_lnk; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.articles_author_lnk (id, article_id, author_id, article_ord) VALUES (1, 4, 1, 1);
INSERT INTO public.articles_author_lnk (id, article_id, author_id, article_ord) VALUES (2, 6, 1, 2);
INSERT INTO public.articles_author_lnk (id, article_id, author_id, article_ord) VALUES (3, 1, 1, 3);
INSERT INTO public.articles_author_lnk (id, article_id, author_id, article_ord) VALUES (4, 7, 1, 4);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.categories (id, document_id, name, slug, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'yo9qeqbmtz710gk1gvjswo8f', '123', '123', NULL, '2025-12-27 10:37:01.563', '2025-12-27 10:37:01.563', '2025-12-27 10:37:01.557', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, name, slug, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (2, 'zfx3zss2qt2b5j8ztenxlypq', '╨Э╨╛╨▓╨╕╨╜╨╕', NULL, NULL, '2025-12-28 21:07:36.876', '2025-12-28 21:07:36.876', '2025-12-28 21:07:36.873', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, name, slug, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (3, 'c7ytseu4gp2jihzvkiyugi12', '╨Ю╨╜╨╛╨▓╨╗╨╡╨╜╨╜╤П', NULL, NULL, '2025-12-28 21:08:49.739', '2025-12-28 21:08:49.739', '2025-12-28 21:08:49.737', 1, 1, NULL);


--
-- Data for Name: articles_category_lnk; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.articles_category_lnk (id, article_id, category_id, article_ord) VALUES (6, 4, 2, 1);
INSERT INTO public.articles_category_lnk (id, article_id, category_id, article_ord) VALUES (7, 6, 2, 2);
INSERT INTO public.articles_category_lnk (id, article_id, category_id, article_ord) VALUES (8, 1, 3, 1);
INSERT INTO public.articles_category_lnk (id, article_id, category_id, article_ord) VALUES (9, 7, 3, 2);


--
-- Data for Name: film_types; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.film_types (id, document_id, title_uk, title_en, slug, description_uk, description_en, "order", created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'wf00uyflqvm18fx85g2sbpf3', '╨Я╨╛╨▓╨╜╨╛╨╝╨╡╤В╤А╨░╨╢╨╜╨╕╨╣ ╤Д╤Ц╨╗╤М╨╝', 'Feature Film', 'feature-film', '╨Ю╤Б╨╜╨╛╨▓╨╜╨╕╨╣ ╤В╨╕╨┐ ╨║╤Ц╨╜╨╛╤Д╤Ц╨╗╤М╨╝╤Ц╨▓ ╤В╤А╨╕╨▓╨░╨╗╤Ц╤Б╤В╤О ╨┐╨╛╨╜╨░╨┤ 60 ╤Е╨▓╨╕╨╗╨╕╨╜.', 'A full-length film with a running time of more than 60 minutes.', 1, '2025-12-27 18:13:16.733', '2025-12-27 18:13:18.02', NULL, 1, 1, NULL);
INSERT INTO public.film_types (id, document_id, title_uk, title_en, slug, description_uk, description_en, "order", created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (2, 'wf00uyflqvm18fx85g2sbpf3', '╨Я╨╛╨▓╨╜╨╛╨╝╨╡╤В╤А╨░╨╢╨╜╨╕╨╣ ╤Д╤Ц╨╗╤М╨╝', 'Feature Film', 'feature-film', '╨Ю╤Б╨╜╨╛╨▓╨╜╨╕╨╣ ╤В╨╕╨┐ ╨║╤Ц╨╜╨╛╤Д╤Ц╨╗╤М╨╝╤Ц╨▓ ╤В╤А╨╕╨▓╨░╨╗╤Ц╤Б╤В╤О ╨┐╨╛╨╜╨░╨┤ 60 ╤Е╨▓╨╕╨╗╨╕╨╜.', 'A full-length film with a running time of more than 60 minutes.', 1, '2025-12-27 18:13:16.733', '2025-12-27 18:13:18.02', '2025-12-27 18:13:18.039', 1, 1, NULL);
INSERT INTO public.film_types (id, document_id, title_uk, title_en, slug, description_uk, description_en, "order", created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (3, 'mdhqfy4hrxh0wbjvztr1idrq', '╨б╨╡╤А╤Ц╨░╨╗', 'TV Series', 'tv-series', '╨С╨░╨│╨░╤В╨╛╤Б╨╡╤А╤Ц╨╣╨╜╤Ц ╤В╨╡╨╗╨╡╨▓╤Ц╨╖╤Ц╨╣╨╜╤Ц ╨░╨▒╨╛ ╨▓╨╡╨▒-╤И╨╛╤Г.', 'Multi-episode television or web shows.', 2, '2025-12-27 18:13:45.735', '2025-12-27 18:13:48.29', NULL, 1, 1, NULL);
INSERT INTO public.film_types (id, document_id, title_uk, title_en, slug, description_uk, description_en, "order", created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (4, 'mdhqfy4hrxh0wbjvztr1idrq', '╨б╨╡╤А╤Ц╨░╨╗', 'TV Series', 'tv-series', '╨С╨░╨│╨░╤В╨╛╤Б╨╡╤А╤Ц╨╣╨╜╤Ц ╤В╨╡╨╗╨╡╨▓╤Ц╨╖╤Ц╨╣╨╜╤Ц ╨░╨▒╨╛ ╨▓╨╡╨▒-╤И╨╛╤Г.', 'Multi-episode television or web shows.', 2, '2025-12-27 18:13:45.735', '2025-12-27 18:13:48.29', '2025-12-27 18:13:48.301', 1, 1, NULL);
INSERT INTO public.film_types (id, document_id, title_uk, title_en, slug, description_uk, description_en, "order", created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (5, 'aks588ynbnxk6y3k4kyiuirf', '╨Ъ╨╛╤А╨╛╤В╨║╨╛╨╝╨╡╤В╤А╨░╨╢╨╜╨╕╨╣ ╤Д╤Ц╨╗╤М╨╝', 'Short Film', 'short-film', '╨д╤Ц╨╗╤М╨╝╨╕ ╤В╤А╨╕╨▓╨░╨╗╤Ц╤Б╤В╤О ╨┤╨╛ 40-50 ╤Е╨▓╨╕╨╗╨╕╨╜.', 'A motion picture not long enough to be considered a feature film.', 3, '2025-12-27 18:14:17.828', '2025-12-27 18:14:18.621', NULL, 1, 1, NULL);
INSERT INTO public.film_types (id, document_id, title_uk, title_en, slug, description_uk, description_en, "order", created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (6, 'aks588ynbnxk6y3k4kyiuirf', '╨Ъ╨╛╤А╨╛╤В╨║╨╛╨╝╨╡╤В╤А╨░╨╢╨╜╨╕╨╣ ╤Д╤Ц╨╗╤М╨╝', 'Short Film', 'short-film', '╨д╤Ц╨╗╤М╨╝╨╕ ╤В╤А╨╕╨▓╨░╨╗╤Ц╤Б╤В╤О ╨┤╨╛ 40-50 ╤Е╨▓╨╕╨╗╨╕╨╜.', 'A motion picture not long enough to be considered a feature film.', 3, '2025-12-27 18:14:17.828', '2025-12-27 18:14:18.621', '2025-12-27 18:14:18.63', 1, 1, NULL);
INSERT INTO public.film_types (id, document_id, title_uk, title_en, slug, description_uk, description_en, "order", created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (7, 'w8q5kwyjmxmk7pntx84yej27', '╨Р╨╜╤Ц╨╝╨░╤Ж╤Ц╤П', 'Animation', 'animation', '╨Р╨╜╤Ц╨╝╨░╤Ж╤Ц╨╣╨╜╤Ц ╤Д╤Ц╨╗╤М╨╝╨╕ ╤В╨░ ╨╝╤Г╨╗╤М╤В╤Д╤Ц╨╗╤М╨╝╨╕.', 'Animated films and cartoons.', 4, '2025-12-27 18:14:45.531', '2025-12-27 18:14:46.286', NULL, 1, 1, NULL);
INSERT INTO public.film_types (id, document_id, title_uk, title_en, slug, description_uk, description_en, "order", created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (8, 'w8q5kwyjmxmk7pntx84yej27', '╨Р╨╜╤Ц╨╝╨░╤Ж╤Ц╤П', 'Animation', 'animation', '╨Р╨╜╤Ц╨╝╨░╤Ж╤Ц╨╣╨╜╤Ц ╤Д╤Ц╨╗╤М╨╝╨╕ ╤В╨░ ╨╝╤Г╨╗╤М╤В╤Д╤Ц╨╗╤М╨╝╨╕.', 'Animated films and cartoons.', 4, '2025-12-27 18:14:45.531', '2025-12-27 18:14:46.286', '2025-12-27 18:14:46.297', 1, 1, NULL);


--
-- Data for Name: films; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.films (id, document_id, title, slug, year, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'm65gondwj4s7vjl0amxytdtz', '╨Ф╤О╨╜╨░: ╨з╨░╤Б╤В╨╕╨╜╨░ ╨┤╤А╤Г╨│╨░', 'dune-part-two', 2024, '╨Я╨╛╨╗ ╨Р╤В╤А╤Ц╨┤ ╨╛╨▒тАЩ╤Ф╨┤╨╜╤Г╤Ф╤В╤М╤Б╤П ╨╖ ╨з╨░╨╜╤Ц ╤В╨░ ╤Д╤А╨╕╨╝╨╡╨╜╨░╨╝╨╕, ╤Й╨╛╨▒ ╨┐╨╛╨╝╤Б╤В╨╕╤В╨╕╤Б╤П ╨╖╨╝╨╛╨▓╨╜╨╕╨║╨░╨╝, ╤П╨║╤Ц ╨╖╨╜╨╕╤Й╨╕╨╗╨╕ ╨╣╨╛╨│╨╛ ╤А╨╛╨┤╨╕╨╜╤Г. ╨Я╨╡╤А╨╡╨┤ ╨╜╨╕╨╝ ╤Б╤В╨╛╤Ч╤В╤М ╨▓╨╕╨▒╤Ц╤А ╨╝╤Ц╨╢ ╨║╨╛╤Е╨░╨╜╨╜╤П╨╝ ╤Г╤Б╤М╨╛╨│╨╛ ╨╢╨╕╤В╤В╤П ╤В╨░ ╨┐╨╛╤А╤П╤В╤Г╨╜╨║╨╛╨╝ ╨▓╤Б╨╡╤Б╨▓╤Ц╤В╤Г.w', '2025-12-27 18:24:54.149', '2025-12-27 18:24:54.149', NULL, 1, 1, NULL);
INSERT INTO public.films (id, document_id, title, slug, year, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (2, 'm65gondwj4s7vjl0amxytdtz', '╨Ф╤О╨╜╨░: ╨з╨░╤Б╤В╨╕╨╜╨░ ╨┤╤А╤Г╨│╨░', 'dune-part-two', 2024, '╨Я╨╛╨╗ ╨Р╤В╤А╤Ц╨┤ ╨╛╨▒тАЩ╤Ф╨┤╨╜╤Г╤Ф╤В╤М╤Б╤П ╨╖ ╨з╨░╨╜╤Ц ╤В╨░ ╤Д╤А╨╕╨╝╨╡╨╜╨░╨╝╨╕, ╤Й╨╛╨▒ ╨┐╨╛╨╝╤Б╤В╨╕╤В╨╕╤Б╤П ╨╖╨╝╨╛╨▓╨╜╨╕╨║╨░╨╝, ╤П╨║╤Ц ╨╖╨╜╨╕╤Й╨╕╨╗╨╕ ╨╣╨╛╨│╨╛ ╤А╨╛╨┤╨╕╨╜╤Г. ╨Я╨╡╤А╨╡╨┤ ╨╜╨╕╨╝ ╤Б╤В╨╛╤Ч╤В╤М ╨▓╨╕╨▒╤Ц╤А ╨╝╤Ц╨╢ ╨║╨╛╤Е╨░╨╜╨╜╤П╨╝ ╤Г╤Б╤М╨╛╨│╨╛ ╨╢╨╕╤В╤В╤П ╤В╨░ ╨┐╨╛╤А╤П╤В╤Г╨╜╨║╨╛╨╝ ╨▓╤Б╨╡╤Б╨▓╤Ц╤В╤Г.w', '2025-12-27 18:24:54.149', '2025-12-27 18:24:54.149', '2025-12-27 18:24:54.177', 1, 1, NULL);
INSERT INTO public.films (id, document_id, title, slug, year, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (3, 'taklq9d7alqbswa98qhc8bgm', '╨Ы╤О╨┤╨╕╨╜╨░-╨▒╨╡╨╜╨╖╨╛╨┐╨╕╨╗╨░', 'chainsaw-man', 2025, '╨С╤Ц╨┤╨╜╨╕╨╣ ╨┐╤Ц╨┤╨╗╤Ц╤В╨╛╨║ ╨Ф╨╡╨╜╨┤╨╖╤Ц ╤Г╨║╨╗╨░╨┤╨░╤Ф ╨║╨╛╨╜╤В╤А╨░╨║╤В ╤Ц╨╖ ╨┤╨╡╨╝╨╛╨╜╨╛╨╝ ╤Ц ╤Б╤В╨░╤Ф ┬л╨Ы╤О╨┤╨╕╨╜╨╛╤О-╨▒╨╡╨╜╨╖╨╛╨┐╨╕╨╗╨╛╤О┬╗, ╨┐╤Ц╤Б╨╗╤П ╤З╨╛╨│╨╛ ╨┐╨╛╤В╤А╨░╨┐╨╗╤П╤Ф ╨┤╨╛ ╨╖╨░╨│╨╛╨╜╤Г ╨╝╨╕╤Б╨╗╨╕╨▓╤Ж╤Ц╨▓ ╨╜╨░ ╨┤╨╡╨╝╨╛╨╜╤Ц╨▓.', '2025-12-28 20:00:30.608', '2025-12-28 20:00:30.608', NULL, 1, 1, NULL);
INSERT INTO public.films (id, document_id, title, slug, year, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (4, 'taklq9d7alqbswa98qhc8bgm', '╨Ы╤О╨┤╨╕╨╜╨░-╨▒╨╡╨╜╨╖╨╛╨┐╨╕╨╗╨░', 'chainsaw-man', 2025, '╨С╤Ц╨┤╨╜╨╕╨╣ ╨┐╤Ц╨┤╨╗╤Ц╤В╨╛╨║ ╨Ф╨╡╨╜╨┤╨╖╤Ц ╤Г╨║╨╗╨░╨┤╨░╤Ф ╨║╨╛╨╜╤В╤А╨░╨║╤В ╤Ц╨╖ ╨┤╨╡╨╝╨╛╨╜╨╛╨╝ ╤Ц ╤Б╤В╨░╤Ф ┬л╨Ы╤О╨┤╨╕╨╜╨╛╤О-╨▒╨╡╨╜╨╖╨╛╨┐╨╕╨╗╨╛╤О┬╗, ╨┐╤Ц╤Б╨╗╤П ╤З╨╛╨│╨╛ ╨┐╨╛╤В╤А╨░╨┐╨╗╤П╤Ф ╨┤╨╛ ╨╖╨░╨│╨╛╨╜╤Г ╨╝╨╕╤Б╨╗╨╕╨▓╤Ж╤Ц╨▓ ╨╜╨░ ╨┤╨╡╨╝╨╛╨╜╤Ц╨▓.', '2025-12-28 20:00:30.608', '2025-12-28 20:00:30.608', '2025-12-28 20:00:30.627', 1, 1, NULL);
INSERT INTO public.films (id, document_id, title, slug, year, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (5, 'ef52r1zsu66t5f7qpmv6lap4', 'Spider-Man: Into the Spider-Verse', 'spider-man-into-the-spider-verse', 2018, '╨Ь╨░╨╣╨╗╨╖ ╨Ь╨╛╤А╨░╨╗╨╡╤Б ╤Б╤В╨░╤Ф ╨Ы╤О╨┤╨╕╨╜╨╛╤О-╨┐╨░╨▓╤Г╨║╨╛╨╝ ╤Ц ╨╖╤Г╤Б╤В╤А╤Ц╤З╨░╤Ф ╤Ц╨╜╤И╨╕╤Е ┬л╨┐╨░╨▓╤Г╨║╤Ц╨▓┬╗ ╤Ц╨╖ ╤А╤Ц╨╖╨╜╨╕╤Е ╨▓╤Б╨╡╤Б╨▓╤Ц╤В╤Ц╨▓.', '2025-12-28 20:03:27.167', '2025-12-28 20:03:27.167', NULL, 1, 1, NULL);
INSERT INTO public.films (id, document_id, title, slug, year, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (6, 'ef52r1zsu66t5f7qpmv6lap4', 'Spider-Man: Into the Spider-Verse', 'spider-man-into-the-spider-verse', 2018, '╨Ь╨░╨╣╨╗╨╖ ╨Ь╨╛╤А╨░╨╗╨╡╤Б ╤Б╤В╨░╤Ф ╨Ы╤О╨┤╨╕╨╜╨╛╤О-╨┐╨░╨▓╤Г╨║╨╛╨╝ ╤Ц ╨╖╤Г╤Б╤В╤А╤Ц╤З╨░╤Ф ╤Ц╨╜╤И╨╕╤Е ┬л╨┐╨░╨▓╤Г╨║╤Ц╨▓┬╗ ╤Ц╨╖ ╤А╤Ц╨╖╨╜╨╕╤Е ╨▓╤Б╨╡╤Б╨▓╤Ц╤В╤Ц╨▓.', '2025-12-28 20:03:27.167', '2025-12-28 20:03:27.167', '2025-12-28 20:03:27.182', 1, 1, NULL);


--
-- Data for Name: films_film_type_lnk; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.films_film_type_lnk (id, film_id, film_type_id, film_ord) VALUES (1, 1, 1, 1);
INSERT INTO public.films_film_type_lnk (id, film_id, film_type_id, film_ord) VALUES (2, 2, 2, 1);
INSERT INTO public.films_film_type_lnk (id, film_id, film_type_id, film_ord) VALUES (3, 3, 7, 1);
INSERT INTO public.films_film_type_lnk (id, film_id, film_type_id, film_ord) VALUES (4, 4, 8, 1);
INSERT INTO public.films_film_type_lnk (id, film_id, film_type_id, film_ord) VALUES (5, 5, 5, 1);
INSERT INTO public.films_film_type_lnk (id, film_id, film_type_id, film_ord) VALUES (6, 6, 6, 1);


--
-- Data for Name: i18n_locale; Type: TABLE DATA; Schema: public; Owner: films
--

INSERT INTO public.i18n_locale (id, document_id, name, code, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'w6cwockuipaqze5d6ipb63td', 'English (en)', 'en', '2025-12-26 18:11:15.523', '2025-12-26 18:11:15.523', '2025-12-26 18:11:15.523', NULL, NULL, NULL);


--
-- Name: articles_author_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.articles_author_lnk_id_seq', 4, true);


--
-- Name: articles_category_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.articles_category_lnk_id_seq', 9, true);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.articles_id_seq', 7, true);


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.authors_id_seq', 1, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- Name: film_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.film_types_id_seq', 8, true);


--
-- Name: films_film_type_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.films_film_type_lnk_id_seq', 6, true);


--
-- Name: films_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.films_id_seq', 6, true);


--
-- Name: i18n_locale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: films
--

SELECT pg_catalog.setval('public.i18n_locale_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict b2jwhz0KfN3LdXHV3qWUIJRQJxbMumK3BicFvkV6FApUdSoQJglHjLJ7mLnLwhf

