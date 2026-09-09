import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Avpolarisera.se",
  description: "Faktadriven svensk politik med voteringsdata, målkonflikter och mindre dramatik.",
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
