FROM node:20-bookworm-slim

WORKDIR /srv/app
RUN corepack enable

EXPOSE 1337

# Код будет примонтирован volume'ом из compose, поэтому тут ничего не COPY
CMD ["sh", "-lc", "pnpm install && pnpm dev"]
