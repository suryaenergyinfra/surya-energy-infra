/**
 * Surya Energy Infra™ - Core Data & Solar Calculations
 * Client facts only: Residential Solar EPC (on-grid) in Andhra Pradesh.
 */

export const PRICE_PER_KW = 66000; // ₹66,000 per kW complete EPC
export const FLAT_SUBSIDY_3KW_PLUS = 78000; // ₹78,000 subsidy for 3 kW and above

export interface SolarPackage {
  kw: number;
  monthlyUnitsMin: number;
  monthlyUnitsMax: number;
  roofAreaSqFt: number;
  grossCost: number;
  subsidy: number;
  netCost: number;
  tenure10YrEmi: number; // Monthly EMI on 10-year loan tenure
}

// Client fact sizing table (3 kW to 10 kW) with 10-year loan tenure EMIs
export const SOLAR_PACKAGES: SolarPackage[] = [
  {
    kw: 3,
    monthlyUnitsMin: 300,
    monthlyUnitsMax: 405,
    roofAreaSqFt: 300,
    grossCost: 3 * PRICE_PER_KW, // ₹1,98,000
    subsidy: FLAT_SUBSIDY_3KW_PLUS, // ₹78,000
    netCost: 3 * PRICE_PER_KW - FLAT_SUBSIDY_3KW_PLUS, // ₹1,20,000
    tenure10YrEmi: 1317, // ₹1,317/mo @ 5.75% for 10 yrs
  },
  {
    kw: 4,
    monthlyUnitsMin: 480,
    monthlyUnitsMax: 540,
    roofAreaSqFt: 400,
    grossCost: 4 * PRICE_PER_KW, // ₹2,64,000
    subsidy: FLAT_SUBSIDY_3KW_PLUS,
    netCost: 4 * PRICE_PER_KW - FLAT_SUBSIDY_3KW_PLUS, // ₹1,86,000
    tenure10YrEmi: 2042, // ₹2,042/mo @ 5.75% for 10 yrs
  },
  {
    kw: 5,
    monthlyUnitsMin: 600,
    monthlyUnitsMax: 675,
    roofAreaSqFt: 500,
    grossCost: 5 * PRICE_PER_KW, // ₹3,30,000
    subsidy: FLAT_SUBSIDY_3KW_PLUS,
    netCost: 5 * PRICE_PER_KW - FLAT_SUBSIDY_3KW_PLUS, // ₹2,52,000
    tenure10YrEmi: 3057, // ₹3,057/mo for 10 yrs
  },
  {
    kw: 6,
    monthlyUnitsMin: 720,
    monthlyUnitsMax: 810,
    roofAreaSqFt: 600,
    grossCost: 6 * PRICE_PER_KW, // ₹3,96,000
    subsidy: FLAT_SUBSIDY_3KW_PLUS,
    netCost: 6 * PRICE_PER_KW - FLAT_SUBSIDY_3KW_PLUS, // ₹3,18,000
    tenure10YrEmi: 3858, // ₹3,858/mo for 10 yrs
  },
  {
    kw: 7,
    monthlyUnitsMin: 840,
    monthlyUnitsMax: 945,
    roofAreaSqFt: 700,
    grossCost: 7 * PRICE_PER_KW, // ₹4,62,000
    subsidy: FLAT_SUBSIDY_3KW_PLUS,
    netCost: 7 * PRICE_PER_KW - FLAT_SUBSIDY_3KW_PLUS, // ₹3,84,000
    tenure10YrEmi: 4659, // ₹4,659/mo for 10 yrs
  },
  {
    kw: 8,
    monthlyUnitsMin: 960,
    monthlyUnitsMax: 1080,
    roofAreaSqFt: 800,
    grossCost: 8 * PRICE_PER_KW, // ₹5,28,000
    subsidy: FLAT_SUBSIDY_3KW_PLUS,
    netCost: 8 * PRICE_PER_KW - FLAT_SUBSIDY_3KW_PLUS, // ₹4,50,000
    tenure10YrEmi: 5460, // ₹5,460/mo for 10 yrs
  },
  {
    kw: 9,
    monthlyUnitsMin: 1080,
    monthlyUnitsMax: 1215,
    roofAreaSqFt: 900,
    grossCost: 9 * PRICE_PER_KW, // ₹5,94,000
    subsidy: FLAT_SUBSIDY_3KW_PLUS,
    netCost: 9 * PRICE_PER_KW - FLAT_SUBSIDY_3KW_PLUS, // ₹5,16,000
    tenure10YrEmi: 6260, // ₹6,260/mo for 10 yrs
  },
  {
    kw: 10,
    monthlyUnitsMin: 1200,
    monthlyUnitsMax: 1350,
    roofAreaSqFt: 1000,
    grossCost: 10 * PRICE_PER_KW, // ₹6,60,000
    subsidy: FLAT_SUBSIDY_3KW_PLUS,
    netCost: 10 * PRICE_PER_KW - FLAT_SUBSIDY_3KW_PLUS, // ₹5,82,000
    tenure10YrEmi: 7061, // ₹7,061/mo for 10 yrs
  },
];

/**
 * Format currency with en-IN locale (e.g. ₹1,98,000)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Format numbers with Indian comma grouping (e.g. 1,98,000)
 */
export function formatNumberIN(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(num));
}

/**
 * Calculate recommended system size and costs from monthly units
 */
export function calculateFromUnits(units: number) {
  let targetKw = Math.round(units / 125);
  if (targetKw < 3) targetKw = 3;
  if (targetKw > 10) targetKw = 10;

  const pkg = SOLAR_PACKAGES.find((p) => p.kw === targetKw) || SOLAR_PACKAGES[0];
  const grossCost = targetKw * PRICE_PER_KW;
  const subsidy = targetKw >= 3 ? FLAT_SUBSIDY_3KW_PLUS : 0;
  const netCost = grossCost - subsidy;

  // Consistent generation calculation across toggles (Rule B.8)
  const dailyUnits = (targetKw * 4.2).toFixed(1);
  const monthlyUnits = Math.round(targetKw * 125);
  const annualUnits = Math.round(targetKw * 1500);

  return {
    kw: targetKw,
    roofAreaSqFt: targetKw * 100,
    grossCost,
    subsidy,
    netCost,
    dailyUnits,
    monthlyUnits,
    annualUnits,
    package: pkg,
  };
}

/**
 * Calculate Monthly EMI using standard amortization formula
 * P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(principal: number, annualInterestRate: number, tenureYears: number): number {
  if (principal <= 0 || annualInterestRate <= 0 || tenureYears <= 0) return 0;
  const monthlyRate = annualInterestRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  return Math.round(emi);
}

/**
 * Key Timeline stats for home page (01-04) - Client facts only (Rule B.1 & C.4)
 */
export const STAT_TIMELINE = [
  {
    numeral: "01",
    numericValue: 66000,
    prefix: "₹",
    suffix: "",
    label: "per kW, complete",
    subtext: "Complete engineering, procurement and commissioning under one roof.",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/hero-1.webp",
  },
  {
    numeral: "02",
    numericValue: 78000,
    prefix: "₹",
    suffix: "",
    label: "subsidy on 3 kW and above",
    subtext: "Fixed PM Surya Ghar central subsidy credited to your bank account.",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/hero-2.webp",
  },
  {
    numeral: "03",
    numericValue: 5.75,
    prefix: "",
    suffix: "% p.a.",
    label: "10-year bank loans from 5.75%",
    subtext: "Subsidised floating rate from major public sector banks for PM Surya Ghar with flexible tenures up to 10 years (120 months).",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/hero-3.webp",
  },
  {
    numeral: "04",
    numericValue: 6,
    prefix: "",
    suffix: " Days / Wk",
    label: "Open Monday to Saturday, 9 AM - 6 PM",
    subtext: "Kurichedu Road, Darsi, Prakasam District, Andhra Pradesh - 523247.",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/about-hero.webp",
  },
];

/**
 * Quality features: "Built with premium components" (Rule B.3)
 * 4 cards using only client facts: Topcon panels, inverters, structures, complete EPC.
 * No efficiency percentages, warranty years, wind ratings or galvanizing claims.
 */
export const QUALITY_COMPONENTS = [
  {
    title: "Premium Topcon Panels",
    description: "Next-generation Topcon solar panels delivering dependable residential electricity generation.",
    tag: "Topcon",
  },
  {
    title: "Premium Inverters",
    description: "Premium on-grid string inverters engineered for residential solar interconnections.",
    tag: "On-Grid",
  },
  {
    title: "Premium Mounting Structures",
    description: "Sturdy rooftop mounting structures designed for long-term residential installations.",
    tag: "Structures",
  },
  {
    title: "Complete EPC Under One Roof",
    description: "Turnkey engineering, procurement and commissioning for on-grid residential systems from 3 kW to 10 kW.",
    tag: "Turnkey EPC",
  },
];

/**
 * Installation process steps - generic captions with no certification/compliance claims (Rule B.7 & C.3)
 */
export const INSTALLATION_STEPS = [
  {
    step: "01",
    title: "Site Survey & Roof Assessment",
    summary: "Rooftop shadow assessment, available area measurement and electrical connection review.",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/process-survey.webp",
  },
  {
    step: "02",
    title: "System Design & Quotation",
    summary: "System sizing and layout design based on your roof space and monthly electricity consumption.",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/process-design.webp",
  },
  {
    step: "03",
    title: "Subsidy & Bank Loan Guidance", // TODO confirm with client
    summary: "Guidance on PM Surya Ghar portal submission and bank loan application paperwork.",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/process-paperwork.webp",
  },
  {
    step: "04",
    title: "Installation",
    summary: "Rooftop mounting of structures, Topcon solar panels, inverter and electrical wiring.",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/process-install.webp",
  },
  {
    step: "05",
    title: "Commissioning & Net-Metering",
    summary: "Utility net-meter installation, testing and activation of your on-grid solar system.",
    // PLACEHOLDER: replace with client's real photo
    image: "/images/process-metering.webp",
  },
];

/**
 * FAQs - Client facts only
 */
export const FAQ_ITEMS = [
  {
    question: "How much shadow-free roof area is required for rooftop solar?",
    answer:
      "As a standard guideline, each 1 kW of solar capacity requires approximately 100 square feet of shadow-free rooftop space. A 3 kW system requires ~300 sq ft, while a 5 kW system requires ~500 sq ft.",
  },
  {
    question: "How does the PM Surya Ghar ₹78,000 subsidy work?",
    answer:
      "Under the PM Surya Ghar: Muft Bijli Yojana, residential rooftop solar systems of 3 kW capacity and above receive a fixed central government subsidy of ₹78,000. Following system commissioning and net-meter installation, the subsidy is credited directly to your bank account.",
  },
  {
    question: "What does an 'On-Grid' solar system mean?",
    answer:
      "An on-grid solar system connects to the local electricity utility grid through a bi-directional net meter. When your panels generate electricity during the day, power is supplied directly to your home, and any excess electricity is sent to the grid.",
  },
  {
    question: "Do on-grid solar systems work during a power outage?",
    answer:
      "No. For safety reasons, on-grid inverters automatically shut down during a utility power outage to prevent electricity from feeding into the grid while utility crews may be working.",
  },
  {
    question: "What bank loan interest rates and tenures are available?",
    answer:
      "Most major public sector banks (SBI, Canara Bank, Union Bank, Bank of Baroda, PNB) offer a subsidised floating rate of 5.75% p.a. for PM Surya Ghar loans up to ₹2 lakh, with flexible repayment tenures up to 10 years (120 months). For larger systems where the loan exceeds ₹2 lakh, the rate is 7.25%–9.50% depending on the bank and customer CIBIL score. Collateral-free financing is available for residential rooftop solar.",
  },
  {
    question: "Will my monthly power bill savings cover my 10-year bank loan EMI?",
    answer:
      "Yes! Because tenures extend up to 10 years (120 months), the monthly EMI for a 3 kW system is only ~₹1,317/month, while generating ~375–400 units of electricity worth ₹2,800–₹3,200 every month. That means your monthly power bill savings exceed the bank loan EMI from Month 1, providing immediate positive cash flow.",
  },
  {
    question: "How does Net-Metering work with Andhra Pradesh DISCOMs (APCPDCL / APSPDCL)?",
    answer:
      "Surya Energy Infra handles 100% of the liaisoning with your local Andhra Pradesh DISCOM (CPDCL, SPDCL, or EPDCL). A bi-directional digital net meter is installed at your home. When your solar system generates more electricity than your home consumes during peak daylight hours, the excess units are exported to the grid and credited against your night-time consumption.",
  },
  {
    question: "What routine maintenance is required for residential rooftop solar?",
    answer:
      "On-grid solar systems have no moving mechanical parts. Periodically cleaning the glass surface of the Topcon panels with clean water to remove dust ensures consistent sunlight absorption.",
  },
];
