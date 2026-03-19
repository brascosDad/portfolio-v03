import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
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
    <html lang="en" className={hankenGrotesk.variable}>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
