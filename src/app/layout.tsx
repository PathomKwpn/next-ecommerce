import type { Metadata } from "next";

import { MobileNavigation, SiteFooter, SiteHeader } from "@/components/layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "PATH | Premium Sneaker Store",
  description: "A modern premium sneaker ecommerce experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <div className="flex min-h-svh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <MobileNavigation />
        </div>
      </body>
    </html>
  );
}
