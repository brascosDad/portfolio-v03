import type { Metadata } from "next";
import { Hanken_Grotesk, Roboto, Alfa_Slab_One, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const alfaSlabOne = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alpha-slab",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ernest Son — UX/Product Designer",
  description:
    "Portfolio of Ernest Son, a UX/Product Designer crafting thoughtful digital experiences.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${roboto.variable} ${alfaSlabOne.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
