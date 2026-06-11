import type { Metadata, Viewport } from "next"; // Added Viewport import
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// 1. Move viewport and themeColor here
export const viewport: Viewport = {
  themeColor: "#0b6e4f",
  width: "device-width",
  initialScale: 1,
};

// 2. Metadata remains here, but without themeColor and viewport
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng"),
  title: {
    default: "Osun State Football Association",
    template: "%s | Osun FA",
  },
  description: "Official website of the Osun State Football Association (Osun FA).",
  keywords: ["Osun State", "Football", "Osun FA", "Nigeria Football", "Grassroots Football", "Osun FA Cup", "Osun State League", "Soccer", "African Football", "Osun State FA"],
  authors: [{ name: "Osun State Football Association" }],
  creator: "Osun FA Web Team",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Osun State Football Association",
    title: "Osun State Football Association | Official Website",
    description: "Welcome to the home of football in Osun State.",
    images: [{ url: "/osun-fa-logo.png", width: 1200, height: 630, alt: "Osun State FA Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osun State Football Association | Official Website",
    description: "Welcome to the home of football in Osun State.",
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
    google: "google-site-verification-id",
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
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng"}/osun-fa-logo.png`,
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
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://osunstatefa.org.ng"}/contact`
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
