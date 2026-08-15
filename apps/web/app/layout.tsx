import { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
