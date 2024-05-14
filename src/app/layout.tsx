import { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AppNavbar from "./components/AppNavbar";
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
  bookmarksModal,
  children,
}: {
  bookmarksModal: never; //?????
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body>
        <Providers>
          <AppNavbar />
          <div className="mx-auto w-11/12">
            {bookmarksModal}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
