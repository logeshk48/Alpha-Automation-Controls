"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface CompanyDropdownProps {
  item: NavItem;
  /** True while the navbar sits transparent over the hero. */
  isTransparent: boolean;
}

/**
 * Company dropdown.
 *
 * Opens on hover for pointer users and on Enter/Space for keyboard users,
 * because hover alone excludes anyone not using a mouse. A short close delay
 * stops the panel vanishing when the pointer crosses the gap between the
 * trigger and the panel.
 *
 * Escape closes and returns focus to the trigger. Route changes close it too,
 * otherwise the panel lingers over the page you just navigated to.
 */
export function CompanyDropdown({ item, isTransparent }: CompanyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const children = item.children ?? [];
  const isActive = children.some((child) => pathname.startsWith(child.href));

  /* Hover intent: opening is instant, closing waits. Without the delay the
     panel closes in the dead space between trigger and panel. */
  function open() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  /* Close on navigation. */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      /* Focus moving anywhere outside this subtree closes the panel — this
         is what makes Tab-away work correctly. */
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setIsOpen((previous) => !previous)}
        className={cn(
          "group relative flex items-center gap-1.5 py-2 text-sm font-medium transition-colors duration-[--duration-micro]",
          isTransparent
            ? "text-ink-100 hover:text-ink-000"
            : "text-ink-600 hover:text-ink-900",
          isActive && (isTransparent ? "text-ink-000" : "text-ink-900"),
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-[--duration-ui] ease-[--ease-out-quart]",
            isOpen && "rotate-180",
          )}
        />

        {/* Accent underline. Scales from the left on hover, and stays put
            while a Company route is active. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent-500 transition-transform duration-[--duration-micro] ease-[--ease-out-quart]",
            isActive || isOpen ? "scale-x-100" : "scale-x-0",
            "group-hover:scale-x-100",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.22, ease: [0.25, 1, 0.5, 1] }
            }
            /* Offset downward so the panel clears the trigger without a gap
               the pointer can fall through. */
            className="absolute right-0 top-full z-50 w-[22rem] pt-3"
          >
            <div className="border border-ink-200 bg-ink-000 shadow-[0_16px_48px_-12px_rgb(8_9_10/0.18)]">
              {/* Accent rule along the top edge — the same technical marker
                  used at the top of dark sections. */}
              <div aria-hidden="true" className="h-px w-full bg-accent-500" />

              <ul className="p-2">
                {children.map((child) => {
                  const childActive = pathname.startsWith(child.href);

                  return (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={cn(
                          "group/item flex flex-col gap-0.5 px-4 py-3 transition-colors duration-[--duration-micro]",
                          childActive ? "bg-ink-050" : "hover:bg-ink-050",
                        )}
                      >
                        <span className="flex items-center justify-between text-sm font-medium text-ink-900">
                          {child.label}
                          {/* Arrow nudges right on hover — a small
                              directional cue, not decoration. */}
                          <span
                            aria-hidden="true"
                            className="translate-x-0 text-accent-600 opacity-0 transition-all duration-[--duration-micro] ease-[--ease-out-quart] group-hover/item:translate-x-1 group-hover/item:opacity-100"
                          >
                            →
                          </span>
                        </span>
                        {child.description && (
                          <span className="text-xs leading-relaxed text-ink-500">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}