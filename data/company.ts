/**
 * Single source of truth for company information.
 *
 * CONTENT INTEGRITY RULE
 * Nothing here is invented. Every field is one of:
 *   - a plain fact (the company name)
 *   - wording taken from the brief but NOT yet confirmed  -> "unverified"
 *   - outstanding, awaiting the company                   -> "placeholder"
 *
 * Only `verified` content may render as a factual claim in production.
 */

export type ContentStatus = "verified" | "unverified" | "placeholder";

/** Wraps a value with its provenance so the UI can gate on it. */
export interface Verifiable<T> {
  value: T;
  status: ContentStatus;
  /** Note for whoever chases the content. */
  note?: string;
}

export interface PostalAddress {
  doorNo?: string;
  surveyNo?: string;
  street?: string;
  locality: string;
  area: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export const company = {
  legalName: "Alpha Automation & Controls",
  shortName: "Alpha Automation",

  positioning: {
    value: "Industrial Automation & Control Solutions",
    status: "unverified",
    note: "Confirm exact positioning wording with Alpha.",
  } as Verifiable<string>,

  tagline: {
    value: "Engineering Reliable Industrial Automation Solutions",
    status: "unverified",
    note: "Proposed tagline. Awaiting approval.",
  } as Verifiable<string>,

  /**
   * Address as supplied in the brief. NOT confirmed as final — do not emit in
   * LocalBusiness structured data until Alpha signs it off.
   */
  address: {
    value: {
      doorNo: "1/12-10",
      surveyNo: "54/2A",
      street: "Poothotam East",
      locality: "Keeranatham Village",
      area: "Saravanampatty",
      city: "Coimbatore",
      state: "Tamil Nadu",
      postalCode: "641035",
      country: "India",
    },
    status: "unverified",
    note: "Supplied in brief. Confirm before publishing or using in schema.",
  } as Verifiable<PostalAddress>,

  /** No phone, email or WhatsApp number has been supplied yet. */
  contact: {
    phone: {
      value: null,
      status: "placeholder",
      note: "[Company to provide primary phone number]",
    } as Verifiable<string | null>,
    email: {
      value: null,
      status: "placeholder",
      note: "[Company to provide enquiry email address]",
    } as Verifiable<string | null>,
    whatsapp: {
      value: null,
      status: "placeholder",
      note: "[Company to provide WhatsApp business number]",
    } as Verifiable<string | null>,
  },

  businessHours: {
    value: null,
    status: "placeholder",
    note: "[Company to provide working days and hours]",
  } as Verifiable<string | null>,

  /**
   * Statistics are the highest-risk area for fabrication. All empty by design.
   * Until Alpha supplies verified figures, the homepage shows capability
   * statements instead of numbers.
   */
  statistics: {
    yearsOfExperience: { value: null, status: "placeholder" },
    projectsDelivered: { value: null, status: "placeholder" },
    customersServed: { value: null, status: "placeholder" },
    countriesServed: { value: null, status: "placeholder" },
    employees: { value: null, status: "placeholder" },
  } as Record<string, Verifiable<number | null>>,

  /**
   * Capability statements — descriptions of what Alpha does, carrying no
   * numeric claim. Safe fallback for the indicator strip.
   */
  capabilities: [
    "Industrial Automation",
    "Custom Control Panels",
    "Engineering & Commissioning",
    "After-Sales Support",
  ] as readonly string[],

  /** Registration identifiers. Publish only once confirmed. */
  registration: {
    gstin: { value: null, status: "placeholder" },
    cin: { value: null, status: "placeholder" },
  } as Record<string, Verifiable<string | null>>,
} as const;

/** Formats an address for multi-line display. */
export function formatAddress(address: PostalAddress): string[] {
  return [
    address.doorNo ? `Door No ${address.doorNo},` : null,
    address.surveyNo ? `S.F No ${address.surveyNo},` : null,
    address.street ? `${address.street},` : null,
    `${address.locality},`,
    `${address.area},`,
    `${address.city} – ${address.postalCode},`,
    `${address.state}, ${address.country}`,
  ].filter((line): line is string => line !== null);
}