import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyMobileBar } from "@/components/layout/sticky-mobile-bar";
import { WhatsAppModalProvider } from "@/components/ui/whatsapp-modal-context";
import { WhatsAppEnquiryModal } from "@/components/ui/whatsapp-enquiry-modal";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#04140C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Surya Energy Infra™ | Residential Rooftop Solar EPC Andhra Pradesh",
    template: "%s | Surya Energy Infra™",
  },
  description:
    "Authorised Andhra Pradesh vendor for PM Surya Ghar Rooftop Solar scheme. Residential On-Grid Solar EPC using premium Topcon panels, inverters & structures. Direct ₹78,000 subsidy & 5.75% bank loans.",
  keywords: [
    "Surya Energy Infra",
    "PM Surya Ghar Andhra Pradesh",
    "Rooftop Solar EPC Andhra Pradesh",
    "Residential Solar Darsi",
    "Topcon Solar Panels Prakasam",
    "PM Surya Ghar ₹78,000 Subsidy",
    "Residential On Grid Solar AP",
  ],
  authors: [{ name: "Surya Energy Infra™", url: siteConfig.url }],
  creator: "Surya Energy Infra™",
  publisher: "Surya Energy Infra™",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Surya Energy Infra™ | Powering a Sustainable Future",
    description:
      "Authorised PM Surya Ghar vendor in Andhra Pradesh. Turnkey residential on-grid solar systems with premium Topcon panels and direct ₹78,000 subsidy.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Surya Energy Infra™ Residential Rooftop Solar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surya Energy Infra™ | Rooftop Solar EPC Andhra Pradesh",
    description:
      "Cut your electricity bill with PM Surya Ghar authorised rooftop solar. Premium Topcon panels & complete EPC.",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: `+91${siteConfig.contact.phone}`,
  email: siteConfig.contact.email,
  image: `${siteConfig.url}/logo.jpeg`,
  logo: `${siteConfig.url}/logo.jpeg`,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.locality,
    addressRegion: siteConfig.contact.address.state,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "15.7725",
    longitude: "79.6781",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [siteConfig.social.instagram],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F1F8EC] text-[#06180F] selection:bg-[#8CC63F] selection:text-[#04140C]">
        <WhatsAppModalProvider>
          {/* Global Floating Pill Navbar */}
          <Navbar />

          {/* Main Content Area - padded at bottom on mobile to prevent sticky bar overlap */}
          <main className="flex-1 pb-20 md:pb-0">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Sticky Mobile Actions (Call & WhatsApp) */}
          <StickyMobileBar />

          {/* Desktop Floating WhatsApp Button */}
          <FloatingWhatsApp />

          {/* Global Interactive WhatsApp Enquiry Modal */}
          <WhatsAppEnquiryModal />
        </WhatsAppModalProvider>
      </body>
    </html>
  );
}
