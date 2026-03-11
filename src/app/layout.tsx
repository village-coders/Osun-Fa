import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://osunstatefa.org.ng"),
  title: {
    default: "Osun State Football Association | OSFA",
    template: "%s | Osun State FA",
  },
  description: "Official website of the Osun State Football Association (OSFA). Discover the latest news, grassroots programs, state leagues, referee training, and elite football developments in Osun State, Nigeria.",
  keywords: ["Osun State", "Football", "OSFA", "Nigeria Football", "Grassroots Football", "Osun FA Cup", "Osun State League", "Soccer", "African Football", "Osun State FA"],
  authors: [{ name: "Osun State Football Association" }],
  creator: "OSFA",
  themeColor: "#0b6e4f",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://osunstatefa.org.ng",
  },
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
        width: 1200,
        height: 630,
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
  verification: {
    google: "google-site-verification-id", // User should replace this
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "name": "Osun State Football Association",
              "url": "https://osunstatefa.org.ng",
              "logo": "https://osunstatefa.org.ng/osun-fa-logo.png",
              "description": "The governing body for football in Osun State, Nigeria. Managing state leagues, grassroots development, and official competitions.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Osogbo City Stadium",
                "addressLocality": "Osogbo",
                "addressRegion": "Osun State",
                "addressCountry": "NG"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Secretariat",
                "email": "info@osunstatefa.org.ng",
                "url": "https://osunstatefa.org.ng/contact"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <main className="grow">
          <Toaster position="top-right" />
          {children}
        </main>
      </body>
    </html>
  );
}
