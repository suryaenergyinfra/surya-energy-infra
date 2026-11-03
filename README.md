# Surya Energy Infra™ — Residential Rooftop Solar Website

> **Client Project for StaffArc**  
> Premium, cinematic, mobile-first website for **Surya Energy Infra™**, an authorised Andhra Pradesh residential rooftop solar EPC vendor for the central government's **PM Surya Ghar: Muft Bijli Yojana**. Built with dark cinematic infrastructure aesthetics inspired by *faers.tech*, tailored to Surya Energy Infra's exact brand identity.

---

## ☀️ Live Overview & Core Goal

- **Business:** Surya Energy Infra™ (Tagline: *Powering a Sustainable Future*)
- **Service:** Residential Solar EPC (Engineering, Procurement, Commissioning) — On-Grid Only
- **Primary Goal:** WhatsApp Enquiries (`+91 94949 53848`) and Direct Phone Calls
- **Head Office:** Kurichedu Road, Darsi, Prakasam District, Andhra Pradesh - 523247
- **Official Hours:** Monday to Saturday, 9:00 AM – 6:00 PM (Sunday closed)

---

## 🛠️ Stack & Architecture

- **Framework:** Next.js (App Router, Turbopack) + TypeScript + Tailwind CSS
- **Animation:** Motion for React (`motion/react`) for Ken Burns hero slideshow, scroll reveals, count-ups, preloader, and page transitions. Full compliance with `prefers-reduced-motion`.
- **Components:** 21st.dev style cards, interactive range sliders, accessible accordion, carousels, tabs, and `lucide-react` icons.
- **Typography:** `next/font/google` with **Space Grotesk** (headings) and **Inter** (body).
- **SEO & Performance:** Full Open Graph metadata, Twitter cards, XML sitemap (`/sitemap.xml`), robots (`/robots.txt`), and Google `LocalBusiness` JSON-LD schema with geo-coordinates.
- **Frontend-Only:** Zero backend or database dependencies. Interactive forms and estimators format and launch pre-filled WhatsApp chats (`https://wa.me/919494953848?text=...`).

---

## 🎨 Brand & Visual System Tokens

All styling strictly adheres to the logo extracted colour tokens:

| Token | Hex / Value | Usage |
|---|---|---|
| `forest-950` | `#04140C` | Primary dark canvas |
| `forest-900` | `#072A19` | Cards, surfaces, and dark elevated containers |
| `brand-deep` | `#0B4A2B` | Wordmark green: headings on light sections, hover states |
| `leaf` | `#3F8F3A` | Mid logo-leaf green: icons, badges, large highlights |
| `leaf-light` | `#8CC63F` | Light logo-leaf green: primary CTAs, key metrics, focus rings |
| `mint` | `#F1F8EC` | Light contrast sections (text: `#06180F`) |
| `border-dark` | `rgba(255,255,255,0.14)` | Subtle dark surface outlines |
| `border-light` | `#D5E6CC` | Mint section borders |
| **Signature Gradient** | `linear-gradient(135deg, #3F8F3A 0%, #8CC63F 100%)` | Preloader fill, glows, hover borders |

---

## 📁 Project Structure

```text
├── public/
│   ├── logo.jpeg             # Original brand logo (white background, dark wordmark)
│   ├── logo-white.svg        # Crisp vector white logo for dark surfaces
│   ├── leaf-mark.png         # Circular leaf emblem
│   ├── favicon.ico           # Multi-resolution favicon (16/32/48px)
│   ├── favicon.png           # 512x512 icon
│   ├── apple-touch-icon.png  # Apple touch icon
│   └── images/               # High-res local photographic & solar texture slots
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with fonts, JSON-LD, Preloader, Navbar, Footer
│   │   ├── page.tsx          # Home page (all 14 sections in sequence)
│   │   ├── calculator/       # Full Energy Savings & EMI Estimator
│   │   ├── packages/         # 3 kW to 10 kW packages & comparison matrix
│   │   ├── subsidy-finance/  # PM Surya Ghar guide, bank rates & EMI tool
│   │   ├── about/            # Company history, EPC standards, and office info
│   │   ├── contact/          # Interactive survey form & Google Maps
│   │   ├── privacy-policy/   # Privacy policy
│   │   ├── terms/            # Terms of service
│   │   ├── sitemap.ts        # Dynamic XML sitemap
│   │   └── robots.ts         # Robots.txt
│   ├── components/
│   │   ├── home/             # Hero, Statement, Stat Timeline, Features, Process, FAQ, etc.
│   │   ├── calculator/       # Embedded & Full interactive calculators
│   │   ├── layout/           # Navbar, Footer, Sticky Mobile Bar
│   │   └── ui/               # Button, Logo, Preloader, InstagramIcon
│   └── lib/
│       ├── site.ts           # Site contact details, phone, hours, and feature flags
│       ├── data.ts           # Pricing (₹66k/kW), packages (3-10 kW), timeline stats, calculations
│       └── utils.ts          # Class merging helper (clsx + tailwind-merge)
```

---

## ⚙️ How to Edit Data and Flags

All business logic, pricing, telephone numbers, and feature toggles are centralized:

### 1. Contact Details & Toggles (`src/lib/site.ts`)
```ts
export const siteConfig = {
  contact: {
    phone: "9494953848",
    whatsapp: "919494953848",
    email: "suryaenergyinfra@gmail.com",
    address: {
      full: "Surya Energy Infra Head Office, Kurichedu Road, Darsi, Prakasam District, Andhra Pradesh - 523247",
    },
    hours: "9:00 AM – 6:00 PM, Monday to Saturday (Sunday closed)",
  },
  flags: {
    showGallery: false,      // Set to true once real project installation photos are added
    showTestimonials: false, // Set to true once verified customer reviews arrive
    showPartners: false,     // Set to true once partner logos arrive
    hasBrochurePdf: false,   // Set to true once PDF brochure is added to /public/brochure.pdf
    brochurePdfUrl: "/brochure.pdf",
  },
  finance: {
    subsidizedRateUpTo2Lakh: 5.75, // 5.75% p.a.
    standardRateAbove2LakhDefault: 8.0, // 7.25% - 9.50% range, default 8.0%
  }
}
```

### 2. Pricing & Sizing Packages (`src/lib/data.ts`)
- Turnkey rate: `PRICE_PER_KW = 66000` (₹66,000/kW)
- Subsidy: `FLAT_SUBSIDY_3KW_PLUS = 78000` (₹78,000 for 3 kW+)
- Packages: Edit `SOLAR_PACKAGES` array for 3 kW through 10 kW specifications, roof area, and expected unit output.

---

## 📸 Client Photo Requirements & Asset Slots

All images currently in `/public/images/` are AI-generated temporary placeholders. Every component contains a `// PLACEHOLDER: replace with client's real photo` comment. The client must supply real, high-resolution photographs to replace these files before official launch:

| Category | File Path | Description | Recommended Dimensions |
|---|---|---|---|
| **Hero Slideshow** | `/public/images/hero-1.webp` | Real rooftop solar installation on an Andhra Pradesh home | 1920 × 1080 |
| **Hero Slideshow** | `/public/images/hero-2.webp` | Topcon solar panels on residential terrace at sunrise | 1920 × 1080 |
| **Hero Slideshow** | `/public/images/hero-3.webp` | Finished modern home with clean on-grid solar array | 1920 × 1080 |
| **Stat Timeline** | `/public/images/hero-1.webp` to `hero-3.webp`, `about-hero.webp` | Rotating background imagery behind the 01–04 timeline | 1920 × 1080 |
| **Component Features** | `/public/images/feature-topcon.webp` | Closeup of actual Topcon solar panels | 1200 × 800 |
| **Component Features** | `/public/images/feature-inverter.webp` | On-grid solar inverter and electrical switchgear | 1200 × 800 |
| **Component Features** | `/public/images/feature-structure.webp` | Heavy-duty elevated solar mounting structure | 1200 × 800 |
| **Installation Step 1** | `/public/images/process-survey.webp` | Physical site & shadow analysis on customer terrace | 1000 × 700 |
| **Installation Step 2** | `/public/images/process-design.webp` | Structural layout & electrical engineering diagram | 1000 × 700 |
| **Installation Step 3** | `/public/images/process-paperwork.webp` | PM Surya Ghar application & loan guidance | 1000 × 700 |
| **Installation Step 4** | `/public/images/process-install.webp` | Technician crew mounting panels and structures | 1000 × 700 |
| **Installation Step 5** | `/public/images/process-metering.webp` | Bi-directional net meter installation & grid sync | 1000 × 700 |
| **About Page** | `/public/images/about-hero.webp` | Surya Energy Infra office or team photo in Darsi | 1600 × 900 |
| **Future Project Gallery** | `/public/images/projects/project-1.webp` to `project-6.webp` | 4–6 real client installations across Andhra Pradesh (activate by setting `flags.showGallery: true` in `src/lib/site.ts`) | 1200 × 800 |
| **Brochure** | `/public/brochure.pdf` | Optional product brochure (activates PDF download button) | PDF |

---

## 🚀 Running the Project

### Prerequisites
- Node.js `v18.18+` or `v20+` or `v22+` / `v24+`
- npm `v9+` or `v10+`

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Export Verification
```bash
npm run build
npm run start
```

### 4. Code Quality & Linting
```bash
npm run lint
```

---

## 📱 Viewport Quality & Testing
- **375px (Mobile):** Tested with sticky bottom Call & WhatsApp actions, collapsed hamburger drawer, touch-friendly range sliders, and horizontal swipe packages.
- **768px (Tablet):** Balanced dual-column layouts, touch-accessible cards, and responsive font scaling.
- **1440px (Desktop):** Expansive cinematic canvas, Ken Burns hero motion, multi-column comparison matrix, and full desktop navigation.

---

## ⚖️ Credits & Copyright

- **Client:** Surya Energy Infra™ (Darsi, Prakasam District, Andhra Pradesh)
- **Developer Credit:** Website by StaffArc (`https://staffarc.com`)
