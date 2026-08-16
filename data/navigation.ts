/**
 * Navigation structure.
 *
 * Matches the approved structure exactly: eight primary items with Company
 * as a dropdown, plus the Get a Quote call to action. Solutions is
 * deliberately absent — it folds into Services.
 *
 * Routes are declared here and nowhere else. Renaming a page means editing
 * this file, not hunting through components.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Supporting line shown in the Company dropdown panel. */
  description?: string;
  children?: NavItem[];
}

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  {
    label: "Company",
    /* The parent is not itself a destination — it opens the panel. On
       mobile it becomes an accordion header. Infrastructure is used as the
       fallback target for keyboard users who activate it directly. */
    href: "/company/infrastructure",
    children: [
      {
        label: "Infrastructure",
        href: "/company/infrastructure",
        description: "Inside our manufacturing facility",
      },
      {
        label: "Certifications",
        href: "/company/certifications",
        description: "Quality standards and approvals",
      },
      {
        label: "Careers",
        href: "/company/careers",
        description: "Open roles and internships",
      },
      {
        label: "News & Updates",
        href: "/company/news",
        description: "Projects, exhibitions, milestones",
      },
      {
        label: "Download Centre",
        href: "/company/download-centre",
        description: "Profile, catalogues, certificates",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/**
 * Primary call to action. Repeated in the navbar, mobile menu, floating
 * actions and footer — defined once so the label and target never drift.
 */
export const primaryCta = {
  label: "Get a Quote",
  href: "/contact#quote",
} as const;

/** Hero secondary action. */
export const secondaryCta = {
  label: "Explore Solutions",
  href: "/services",
} as const;

/**
 * Footer link groups. Wider than the navbar because a footer is a directory
 * rather than a decision point — depth is useful here, clutter in the navbar.
 */
export const footerNavigation: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Infrastructure", href: "/company/infrastructure" },
      { label: "Certifications", href: "/company/certifications" },
      { label: "Careers", href: "/company/careers" },
      { label: "News & Updates", href: "/company/news" },
    ],
  },
  {
    title: "Capability",
    items: [
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Download Centre", href: "/company/download-centre" },
      { label: "Get a Quote", href: "/contact#quote" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/**
 * Legal links. Both pages are outstanding — see PROJECT.md. Listed here so
 * the footer layout is correct from the start rather than retrofitted.
 */
export const legalNavigation: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];