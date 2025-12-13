import { withBasePath } from "@/lib/basePath";

export default function Head() {
  return (
    <>
      {/* Основной favicon для всех */}
      <link rel="icon" href={withBasePath("/favicon.ico")} sizes="any" />

      {/* SVG favicon (если поддерживается браузером) */}
      <link rel="icon" href={withBasePath("/brand/logo.svg")} type="image/svg+xml" />

      {/* Опционально, если добавишь файл */}
      <link rel="apple-touch-icon" href={withBasePath("/apple-touch-icon.png")} />

      {/* Опционально, если добавишь файл */}
      <link rel="manifest" href={withBasePath("/site.webmanifest")} />

      <meta name="theme-color" content="#0b0f14" />
    </>
  );
}
