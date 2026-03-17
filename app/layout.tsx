import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FZA Gold | Toptan Kuyumcu - Fatih, İstanbul",
  description: '1980\'den bu yana İstanbul Fatih\'te toptan altın takı üretimi ve satışı.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
