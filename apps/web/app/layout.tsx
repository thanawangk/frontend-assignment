import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PromotionBanner } from "@/components/layout/PromotionBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageContainer } from "@/components/layout/PageContainer";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SHOP.CO",
  description: "Clothing storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <PromotionBanner />
          <SiteHeader />
          <main>
            <PageContainer>{children}</PageContainer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
