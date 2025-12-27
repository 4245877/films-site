export async function apiGet<T>(path: string): Promise<T> {
  const isServer = typeof window === "undefined";
  const base = isServer ? (process.env.API_INTERNAL_URL || "http://cms:1337") : "";

  const url = base ? `${base}${path}` : path;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API Error ${res.status} at ${path}: ${text}`);
  }
  return res.json() as Promise<T>;
}
