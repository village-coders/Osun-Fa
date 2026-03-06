import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Osun State Football Association | OSFA",
    template: "%s | Osun State FA",
  },
  description: "Official website of the Osun State Football Association (OSFA). Discover the latest news, grassroots programs, state leagues, referee training, and elite football developments in Osun State, Nigeria.",
  keywords: ["Osun State", "Football", "OSFA", "Nigeria Football", "Grassroots Football", "Osun FA Cup", "Osun State League", "Soccer"],
  authors: [{ name: "Osun State Football Association" }],
  creator: "OSFA",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://osunstatefa.org.ng",
    siteName: "Osun State Football Association",
    title: "Osun State Football Association | Official Website",
    description: "Welcome to the home of football in Osun State. Follow state leagues, youth developments, referee clinics, and official competitions.",
    images: [
      {
        url: "/osun-fa-logo.png",
        width: 800,
        height: 600,
        alt: "Osun State FA Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osun State Football Association | Official Website",
    description: "Welcome to the home of football in Osun State. Follow state leagues, youth developments, referee clinics, and official competitions.",
    images: ["/osun-fa-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
