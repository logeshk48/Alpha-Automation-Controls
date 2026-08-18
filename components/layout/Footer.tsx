"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { SVGProps } from "react";
import { Logo } from "@/components/ui/Logo";
import { company, formatAddress } from "@/data/company";
import { footerNavigation, primaryCta } from "@/data/navigation";

/* --------------------------------------------------------------------------
   FOOTER

   Four bands: brand, contact, navigation, legal.

   The social icons sit under the brand block rather than in the legal strip.
   Buried at the very bottom beside the copyright they read as an
   afterthought and are easy to miss entirely; grouped with the logo and the
   description they read as part of the company's identity.

   Contact details carry the most weight — iconed, hoverable, generously
   sized — because on an industrial site the footer is where buyers go to
   find a phone number, not to browse.

   BRAND ICONS are inline SVGs rather than library imports. lucide-react
   removed Instagram, LinkedIn and YouTube in v1 over trademark concerns, so
   importing them breaks the build.
   -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Brand marks                                                                */
/* -------------------------------------------------------------------------- */

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}

const socialIcons = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
} as const;

/* -------------------------------------------------------------------------- */

export function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const d = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const address = company.address.value;
  const email = company.contact.email.value;
  const phone = company.contact.phone.value;
  const gstin = company.registration.gstin.value;

  /* Only render social links that actually point somewhere — an entry left
     as "#" is hidden rather than rendered as a dead link. */
  const socials = company.social.value.filter(
    (item) => item.href && item.href !== "#",
  );

  const contactItems = [
    {
      icon: MapPin,
      label: "Factory",
      lines: formatAddress(address),
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${company.legalName}, ${address.area}, ${address.city}`,
      )}`,
      external: true,
    },
    phone && {
      icon: Phone,
      label: "Phone",
      lines: [company.phoneDisplay],
      href: `tel:${phone}`,
      external: false,
    },
    email && {
      icon: Mail,
      label: "Email",
      lines: [email],
      href: `mailto:${email}`,
      external: false,
    },
  ].filter(Boolean) as Array<{
    icon: typeof MapPin;
    label: string;
    lines: string[];
    href: string;
    external: boolean;
  }>;

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-000">
      {/* Accent rule drawing across the top edge as the footer arrives —
          a quiet full stop on the page rather than a hard border. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-accent-500 via-accent-500/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: d(1.2), ease: EASE }}
      />
      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-[0.12]"
      />

      <div className="shell relative">
        {/* ---- BRAND + CONTACT ---------------------------------------- */}
        <div className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Brand column */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: d(0.7), ease: EASE }}
          >
            <Link href="/" aria-label={`${company.legalName} — home`}>
              <Logo variant="light" height={40} />
            </Link>

            <p className="mt-7 max-w-xs text-sm leading-relaxed text-ink-400">
              Industrial control panels and turnkey automation, engineered and
              built in Coimbatore since {company.foundedYear}.
            </p>

            <Link
              href={primaryCta.href}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-lg bg-accent-500 px-6 py-3.5 text-sm font-semibold text-ink-000 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-600 hover:shadow-[0_8px_28px_-8px_rgb(63_163_91/0.6)]"
            >
              {primaryCta.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            {/* Social. Grouped with the brand rather than buried beside the
                copyright, where it reads as an afterthought. */}
            {socials.length > 0 ? (
              <div className="mt-10">
                <p className="eyebrow text-ink-600">Follow</p>
                <div className="mt-4 flex items-center gap-3">
                  {socials.map((social) => {
                    const Icon =
                      socialIcons[social.platform as keyof typeof socialIcons];
                    if (!Icon) return null;

                    return (
                      <Link
                        key={social.platform}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${company.shortName} on ${social.platform}`}
                        className="group inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent-500/50 hover:bg-accent-500/10 hover:shadow-[0_8px_24px_-8px_rgba(63,163,91,0.45)]"
                      >
                        <Icon className="h-[1.05rem] w-[1.05rem] text-ink-400 transition-colors duration-500 group-hover:text-accent-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </motion.div>

          {/* Contact column. Each item is a full hoverable block with an
              iconed plate — these are the actions a buyer came here for. */}
          <div className="grid gap-9 sm:grid-cols-3 lg:col-span-8 lg:pl-10">
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: d(0.7),
                    delay: d(0.1 + index * 0.08),
                    ease: EASE,
                  }}
                >
                  <Link
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group block"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-accent-500/50 group-hover:bg-accent-500/10 group-hover:shadow-[0_8px_24px_-8px_rgba(63,163,91,0.45)]">
                      <Icon
                        aria-hidden="true"
                        className="h-[1.15rem] w-[1.15rem] text-ink-400 transition-colors duration-500 group-hover:text-accent-400"
                        strokeWidth={1.5}
                      />
                    </span>

                    <span className="eyebrow mt-5 block text-ink-600 transition-colors duration-500 group-hover:text-accent-500">
                      {item.label}
                    </span>

                    <span className="mt-2.5 block space-y-0.5">
                      {item.lines.map((line) => (
                        <span
                          key={line}
                          className="block text-sm leading-relaxed text-ink-300 transition-colors duration-500 group-hover:text-ink-000"
                        >
                          {line}
                        </span>
                      ))}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ---- NAVIGATION --------------------------------------------- */}
        <div className="grid gap-10 border-t border-ink-800/70 py-14 sm:grid-cols-3">
          {footerNavigation.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: d(0.6),
                delay: d(groupIndex * 0.07),
                ease: EASE,
              }}
            >
              <h2 className="eyebrow text-ink-600">{group.title}</h2>

              <ul className="mt-6 space-y-3.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm text-ink-400 transition-colors duration-300 hover:text-ink-000"
                    >
                      {/* Rule growing from nothing on hover — lighter than an
                          underline appearing whole. */}
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-accent-500 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-4"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ---- LEGAL --------------------------------------------------- */}
        <div className="flex flex-col gap-3 border-t border-ink-800/70 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-600">
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          {gstin ? (
            <p className="font-mono text-xs tracking-[0.06em] text-ink-700">
              GSTIN {gstin}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}