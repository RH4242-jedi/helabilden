import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "helabilden.se",
  description:
    "Faktadriven svensk politik med voteringsdata, målkonflikter, källor och mindre dramatik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
