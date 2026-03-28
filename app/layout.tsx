import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Roberta Meggs — Your Houston Area Realtor | Fort Bend County, Katy & Houston",
    template: "%s | Roberta Meggs — Houston Area Realtor",
  },
  description:
    "Roberta Meggs helps Fort Bend County, Houston and Katy area families buy and sell homes. CNE & PSA certified. Keller Williams Southwest. Call (281) 512-2551.",
  keywords: [
    "Houston realtor",
    "Fort Bend County real estate",
    "Katy TX homes",
    "Sugar Land realtor",
    "Keller Williams Southwest",
    "buy home Houston",
    "sell home Fort Bend",
    "Roberta Meggs",
  ],
  openGraph: {
    title: "Roberta Meggs — Your Houston Area Realtor",
    description:
      "Helping Fort Bend County, Houston and Katy area families buy and sell homes. Stop waiting for someday.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-body">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
