import { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import { Newsreader, Space_Grotesk } from "next/font/google";
import { siteURL } from "@/lib/variables";

export const metadata: Metadata = {
  metadataBase: new URL(siteURL),
  title: {
    default: "News From Space",
    template: "%s · News From Space",
  },
  description: "Spaceflight related news from around the world",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "News From Space",
    title: "News From Space",
    description:
      "A front page for spaceflight, science, and the industry of leaving Earth.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "News From Space",
    description:
      "A front page for spaceflight, science, and the industry of leaving Earth.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-icon.png",
  },
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
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Providers>
          <AppNavbar />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
