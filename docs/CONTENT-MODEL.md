# Content model (CMS / Strapi)

## Общие принципы
- Все публичные страницы читают данные только из CMS.
- Публикация = запись имеет статус Published (draft не виден публично).
- Локализация: если включена i18n, контент хранится по локалям (uk/en/…).

## Global (singleton)
Назначение: общие настройки сайта.
Поля:
- siteName: string
- logo: media
- contacts: component (email, phone, address, socials)
- seoDefault: component seo

## About (singleton)
Поля:
- title: string
- content: rich text
- seo: component seo

## Author
Поля:
- name: string
- bio: rich text (опц.)
- avatar: media (опц.)

## Category
Поля:
- title: string
- slug: uid
- description: text (опц.)

## Article
Назначение: новости + технологии + практики + програми/конкурси/ініціативи (одна сущность, разные типы).
Поля:
- title: string
- slug: uid
- excerpt: text
- content: rich text
- cover: media (опц.)
- kind: enum [news, tech, best_practice, program, contest, initiative]
- category: relation -> Category (many-to-one)
- author: relation -> Author (many-to-one)
- publishedAt: datetime (управляется Strapi)

Индексы:
- (kind, publishedAt)
- slug unique

## Film
Поля:
- title: string
- originalTitle: string (опц.)
- slug: uid
- year: integer
- country: string (опц.)
- durationMin: integer (опц.)
- description: rich text
- cover: media
- gallery: media (multiple, опц.)
- categories/genres: relation -> Category (many-to-many) либо отдельная Genre
- seo: component seo

## Event
Поля:
- title: string
- slug: uid
- type: enum [seminar, training, tour, internship, other]
- startAt: datetime
- endAt: datetime (опц.)
- location: string (опц.)
- onlineUrl: string (опц.)
- registrationUrl: string (опц.)
- description: rich text

## Resource (learning)
Поля:
- type: enum [video, manual]
- title: string
- slug: uid
- description: rich text
- videoUrl: string (для video)
- file: media (для manual)
- category: relation -> Category (опц.)
