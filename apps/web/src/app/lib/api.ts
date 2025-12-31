// apps/web/src/app/lib/api.ts

export type StrapiLike<T = unknown> = { data?: T; meta?: unknown };

function getBaseUrl(): string {
  return (
    process.env.STRAPI_INTERNAL_URL ||
    process.env.API_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  );
}

function isDockerOnlyHost(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === "cms";
  } catch {
    return false;
  }
}

function emptyStrapiResponse<T>(): T {
  return ({ data: [], meta: {} } as unknown) as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const base = getBaseUrl();

  // если base не задан — отдаём пустой ответ (чтобы build/static export не падал)
  if (!base) {
    return emptyStrapiResponse<T>();
  }

  const url = new URL(path, base).toString();

  // если адрес типа http://cms:1337 — на Windows/CI вне docker это не резолвится
  if (isDockerOnlyHost(url)) {
    return emptyStrapiResponse<T>();
  }

  try {
    const res = await fetch(url, { cache: "force-cache" });

    if (!res.ok) {
      return emptyStrapiResponse<T>();
    }

    return (await res.json()) as T;
  } catch {
    // ключевое: не роняем пререндер/сборку
    return emptyStrapiResponse<T>();
  }
}
