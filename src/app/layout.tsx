import { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import { Newsreader, Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "News From Space",
  description: "Spaceflight related news from around the world",
};

const serif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${grotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <AppNavbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
