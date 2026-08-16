"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryCta, primaryNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile navigation.
 *
 * There is no close button in here. The navbar sits at z-50, above this
 * panel's z-40, so its trigger stays visible and becomes a toggle. Two close
 * controls stacked in the same corner would be worse than one.
 *
 * Accessibility obligations handled here rather than assumed:
 *
 *   1. Background scroll is locked while open.
 *   2. Focus is trapped — Tab cycles inside the panel and cannot reach the
 *      page behind, which is invisible to sighted users but still reachable
 *      by keyboard without this.
 *   3. Escape closes, and there is a text close control at the end of the
 *      list so keyboard users have an exit inside the trap.
 *
 * Company becomes an accordion rather than a hover panel, since hover does
 * not exist on touch.
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  /* Scroll lock. The attribute is set on <body>, matching the CSS rule in
     globals.css, so the styling stays in the stylesheet. */
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("data-scroll-locked", "true");
    } else {
      document.body.removeAttribute("data-scroll-locked");
    }
    return () => document.body.removeAttribute("data-scroll-locked");
  }, [isOpen]);

  /* Close on navigation — otherwise the panel covers the page just opened.
     Depends on pathname alone: adding onClose would re-run this whenever the
     parent re-renders and close the menu the instant it opens. */
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Collapse any open accordion when the panel closes, so reopening starts
     from a clean state rather than mid-expansion. */
  useEffect(() => {
    if (!isOpen) setExpandedSection(null);
  }, [isOpen]);

  /* Move focus into the panel on open so keyboard and screen reader users
     start inside it rather than back at the top of the document. */
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => firstLinkRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* Escape to close, and Tab cycling confined to the panel. */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      /* Wrap in both directions so focus never escapes the panel. */
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const duration = prefersReducedMotion ? 0 : 0.32;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-40 flex flex-col bg-ink-950 lg:hidden"
        >
          {/* Top padding clears the navbar, which floats above this panel. */}
          <nav className="flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-[6.5rem] md:px-10">
            <ul className="border-t border-ink-800">
              {primaryNavigation.map((item, index) => {
                const hasChildren = Boolean(item.children?.length);
                const isExpanded = expandedSection === item.label;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      /* Items cascade in behind the panel itself. */
                      delay: prefersReducedMotion ? 0 : 0.08 + index * 0.04,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="border-b border-ink-800"
                  >
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpandedSection(isExpanded ? null : item.label)
                          }
                          className="flex w-full items-center justify-between py-5 text-left"
                        >
                          <span
                            className={cn(
                              "text-2xl font-medium tracking-tight",
                              isActive ? "text-ink-000" : "text-ink-200",
                            )}
                          >
                            {item.label}
                          </span>
                          <ChevronDown
                            aria-hidden="true"
                            className={cn(
                              "h-5 w-5 text-ink-500 transition-transform duration-[--duration-ui] ease-[--ease-out-quart]",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: prefersReducedMotion ? 0 : 0.28,
                                ease: [0.25, 1, 0.5, 1],
                              }}
                              className="overflow-hidden"
                            >
                              {item.children?.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    className="flex flex-col gap-0.5 border-l border-ink-800 py-3 pl-4 transition-colors duration-[--duration-micro] hover:border-accent-500"
                                  >
                                    <span className="text-base text-ink-200">
                                      {child.label}
                                    </span>
                                    {child.description && (
                                      <span className="text-xs text-ink-500">
                                        {child.description}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                              <li aria-hidden="true" className="h-2" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between py-5 text-2xl font-medium tracking-tight transition-colors duration-[--duration-micro]",
                          isActive
                            ? "text-ink-000"
                            : "text-ink-200 hover:text-ink-000",
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-accent-500"
                          />
                        )}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            {/* CTA sits low, thumb-reachable one-handed. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
                delay: prefersReducedMotion ? 0 : 0.4,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="mt-8 space-y-4"
            >
              <Link
                href={primaryCta.href}
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-4 text-sm font-semibold text-ink-000 transition-colors duration-[--duration-micro] hover:bg-accent-600"
              >
                {primaryCta.label}
                <span aria-hidden="true">→</span>
              </Link>

              {/* Last element in the focus trap, so Tab always reaches an
                  exit without needing to know about Escape. */}
              <button
                type="button"
                onClick={onClose}
                className="eyebrow w-full py-3 text-center text-ink-500 transition-colors duration-[--duration-micro] hover:text-ink-200"
              >
                Close menu
              </button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}