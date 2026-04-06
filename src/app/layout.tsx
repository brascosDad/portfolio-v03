import type { Metadata } from "next";
import { Hanken_Grotesk, Roboto } from "next/font/google";
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
    <html lang="en" className={`${hankenGrotesk.variable} ${roboto.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
