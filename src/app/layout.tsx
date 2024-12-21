import { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AppNavbar from "./AppNavbar";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  title: "News From Space",
  description: "Spaceflight related news from around the world",
};

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <AppNavbar />
          <div className="mx-auto px-2 2xl:px-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
