export async function apiGet<T>(path: string): Promise<T> {
  // NEXT_PUBLIC_API_URL должен быть в .env, иначе fallback на localhost
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const url = `${baseUrl}${path}`;

  const res = await fetch(url, {
    cache: "no-store", // для dev-режима (SSR каждый раз)
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API Error ${res.status} at ${path}: ${text}`);
  }

  return res.json() as Promise<T>;
}