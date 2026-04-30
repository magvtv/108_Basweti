import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { LanguageProvider } from "@/components/ui/LanguageSwitcher";
import StickyNav from "@/components/ui/StickyNav";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Peris Basweti — In Loving Memory",
  description:
    "A living memorial archive celebrating the life, faith, and legacy of Peris Basweti, beloved mother, grandmother, and great-grandmother.",
  openGraph: {
    title: "Peris Basweti — In Loving Memory",
    description: "A living memorial archive celebrating the life and legacy of Peris Basweti.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-full antialiased">
        <LanguageProvider>
          <StickyNav />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
