# API contract (public)

Base URL:
- Public: /api
- CMS internal (docker): http://cms:1337/api

## Articles
GET /api/articles
Query:
- filters[kind][$eq]=news|tech|...
- filters[category][slug][$eq]=...
- sort=publishedAt:desc
- pagination[page]=1&pagination[pageSize]=12
- populate=cover,author,category

GET /api/articles/:id
GET /api/articles?filters[slug][$eq]=...

## Films
GET /api/films
Query:
- filters[year][$eq]=2024
- filters[categories][slug][$eq]=drama
- sort=year:desc
- pagination...
- populate=cover,categories

GET /api/films?filters[slug][$eq]=...

## Events (calendar)
GET /api/events
Query:
- filters[startAt][$gte]=2025-01-01T00:00:00.000Z
- filters[startAt][$lte]=2025-12-31T23:59:59.999Z
- sort=startAt:asc
- pagination...
- populate=*

## Resources (learning)
GET /api/resources
Query:
- filters[type][$eq]=video|manual
- populate=file

## Globals/About (singletons)
GET /api/global
GET /api/about

## Draft submission (optional, if users add content from site)
POST /api/public/news-submissions
Body:
- title, excerpt, content
Auth:
- Bearer (Keycloak) или session
Result:
- creates Article in draft / moderation queue
