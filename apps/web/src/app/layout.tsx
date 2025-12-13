import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Films",
  description: "Educational reference site about film types"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
