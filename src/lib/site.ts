/**
 * Surya Energy Infra™ - Site Configuration & Feature Flags
 * All client facts: Residential On-grid Solar EPC in Andhra Pradesh
 */

export const siteConfig = {
  name: "Surya Energy Infra™",
  legalName: "Surya Energy Infra",
  shortName: "Surya Energy",
  tagline: "Powering a Sustainable Future",
  description:
    "Authorised Andhra Pradesh vendor for PM Surya Ghar Rooftop Solar scheme. Residential On-Grid Solar EPC with premium Topcon panels, inverters & structures.",
  url: "https://suryaenergyinfra.in",
  ogImage: "/images/og-image.jpg",

  // Contact Details (client-provided facts only)
  contact: {
    phone: "9494953848",
    displayPhone: "+91 94949 53848",
    phoneTel: "tel:+919494953848",
    whatsapp: "919494953848",
    email: "suryaenergyinfra@gmail.com",
    address: {
      street: "Kurichedu Road",
      locality: "Darsi",
      district: "Prakasam District",
      state: "Andhra Pradesh",
      postalCode: "523247",
      country: "India",
      full: "Surya Energy Infra Head Office, Kurichedu Road, Darsi, Prakasam District, Andhra Pradesh - 523247",
    },
    hours: "9:00 AM – 6:00 PM, Monday to Saturday (Sunday closed)",
    workingDays: "Monday to Saturday",
    workingHoursTime: "9:00 AM – 6:00 PM",
    googleMapsUrl: "https://maps.google.com/?q=Kurichedu+Road,+Darsi,+Prakasam+District,+Andhra+Pradesh+523247",
  },

  // Social Links (Only Instagram provided per client facts - Facebook/LinkedIn/YouTube are omitted)
  social: {
    instagram: "https://www.instagram.com/suryaenergyinfra?srtk=MTZobDVhMHE2NThlaQ==",
  },

  // Feature Flags
  flags: {
    showTestimonials: false, // Behind flag until client supplies authentic reviews
    showPartners: false, // Mention "Topcon" as text only until logos are supplied
    hasBrochurePdf: false, // Set to true when PDF brochure is uploaded to /public/brochure.pdf
    brochurePdfUrl: "/brochure.pdf",
    showGallery: false, // Set to true when client supplies real completed project photos (Rule B.5)
  },

  // Banking & Subsidy Defaults (Client-provided facts only)
  finance: {
    subsidizedRateUpTo2Lakh: 5.75, // 5.75% p.a. floating for loans up to ₹2 Lakh
    standardRateAbove2LakhMin: 7.25, // 7.25% p.a.
    standardRateAbove2LakhMax: 9.5, // 9.50% p.a. (depends on bank and CIBIL score)
    standardRateAbove2LakhDefault: 8.0, // Default 8.0% per Rule C.9
    maxSubsidizedLoanAmount: 200000,
  },

  // Credits
  developerCredit: {
    name: "StaffArc",
    url: "https://staffarc.com",
  },
} as const;

/**
 * Builds a direct prefilled WhatsApp URL with encoded message
 */
export function getWhatsAppUrl(message: string): string {
  const cleanPhone = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
