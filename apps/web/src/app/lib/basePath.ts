export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(p: string): string {
  const path = p.startsWith("/") ? p : `/${p}`;
  return `${basePath}${path}`;
}
