import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FZA Gold | Toptan Kuyumcu - Fatih, Ä°stanbul",
  description: "1980'den bu yana Ä°stanbul Fatih'te toptan kuyumculuk. 14K, 18K, 22K altÄ±n takÄ± Ã¼retimi ve satÄ±ÅŸÄ±.",
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
