"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { CompanyDropdown } from "@/components/navigation/CompanyDropdown";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { Logo } from "@/components/ui/Logo";
import { primaryCta, primaryNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

/* Scroll distance before the bar contracts into its floating state. */
const SOLID_THRESHOLD = 40;
/* Downward travel from the last direction change before hiding. Guards
   against flicker on small scroll jitters. */
const HIDE_THRESHOLD = 140;
/* Below this the bar is always visible, regardless of scroll direction. */
const ALWAYS_VISIBLE_ZONE = 240;

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const [isSolid, setIsSolid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* Refs, not state: these update every scroll frame and must not trigger a
     re-render. Only the two booleans do, and only when they actually flip. */
  const lastY = useRef(0);
  const directionAnchor = useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastY.current;
    lastY.current = current;

    const nextSolid = current > SOLID_THRESHOLD;
    if (nextSolid !== isSolid) setIsSolid(nextSolid);

    if (current < ALWAYS_VISIBLE_ZONE) {
      if (isHidden) setIsHidden(false);
      directionAnchor.current = current;
      return;
    }

    const goingDown = current > previous;

    /* Anchor resets on direction reversal, so the threshold measures from
       the turning point rather than from the top of the page. */
    if (goingDown && current < directionAnchor.current) {
      directionAnchor.current = current;
    }
    if (!goingDown && current > directionAnchor.current) {
      directionAnchor.current = current;
    }

    if (goingDown && current - directionAnchor.current > HIDE_THRESHOLD) {
      if (!isHidden) setIsHidden(true);
    } else if (!goingDown && directionAnchor.current - current > 40) {
      /* Returns on a shorter threshold — reaching for the nav is deliberate,
         so it should feel eager to come back. */
      if (isHidden) setIsHidden(false);
    }
  });

  const isTransparent = !isSolid;

  /* One shared curve for every animated property. Using the same easing
     throughout is what makes the contraction read as a single gesture
     rather than several things animating at once.

     900ms is deliberately slow for UI. The bar is not responding to a click,
     it is responding to scroll — so it should feel like it is settling into
     place rather than reacting. */
  const surfaceTransition =
    "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <>
      <motion.header
        /* Stays put while the mobile menu is open, otherwise the toggle
           could scroll away from under the user's thumb. */
        animate={{ y: isHidden && !isMobileOpen ? "-130%" : "0%" }}
        transition={{ duration: 0.42, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Outer inset. Animates from flush to a small gap, detaching the bar
            from the screen edges as it contracts. */}
        <div
          className={cn(
            surfaceTransition,
            isSolid && !isMobileOpen ? "px-3 pt-3 md:px-6 md:pt-4" : "px-0 pt-0",
          )}
        >
          {/* The island.

              Rounded, blurred and bordered in BOTH states. Only three things
              actually change: background opacity, max-width and height.

              This matters. A blur filter switching on mid-animation cannot be
              interpolated by the browser and reads as a snap; the same is true
              of a border materialising from transparent. Keeping them constant
              is what makes the transition smooth.

              While the mobile menu is open the bar drops its surface entirely
              and sits flush on the panel — a floating island over a
              full-screen overlay reads as a stray element. */}
          <div
            className={cn(
              "mx-auto rounded-2xl border backdrop-blur-xl",
              surfaceTransition,
              isMobileOpen
                ? "max-w-full border-transparent bg-transparent shadow-none"
                : isSolid
                  ? [
                      "max-w-[84rem] border-ink-200/70",
                      "bg-ink-000/85",
                      "shadow-[0_8px_40px_-12px_rgb(8_9_10/0.22)]",
                    ]
                  : [
                      /* Not fully transparent. A faint dark tint keeps the
                         links readable once a real hero photograph sits behind
                         them, and means the scroll transition animates between
                         two real surfaces rather than materialising one. */
                      "max-w-[96rem] border-ink-000/10",
                      "bg-ink-950/25",
                      "shadow-[0_2px_24px_-8px_rgb(8_9_10/0.35)]",
                    ],
            )}
          >
            {/* Inner padding. The top state carries real horizontal breathing
                room so the logo and CTA are never flush against the edge. */}
            <div
              className={cn(
                "flex items-center justify-between",
                surfaceTransition,
                isSolid && !isMobileOpen
                  ? "h-[4.25rem] px-5 md:px-7"
                  : "h-[6.5rem] px-6 md:px-10 xl:px-14",
              )}
            >
              <Link
                href="/"
                aria-label="Alpha Automation & Controls — home"
                className="flex items-center"
              >
                <Logo
                  /* Light wordmark whenever the surface behind is dark —
                     which includes the open mobile panel. */
                  variant={isTransparent || isMobileOpen ? "light" : "dark"}
                  height={isSolid && !isMobileOpen ? 30 : 38}
                  priority
                />
              </Link>

              {/* Desktop navigation */}
              <nav
                aria-label="Primary"
                className={cn(
                  "hidden items-center lg:flex",
                  surfaceTransition,
                  isSolid ? "gap-7" : "gap-9",
                )}
              >
                {primaryNavigation.map((item) => {
                  if (item.children?.length) {
                    return (
                      <CompanyDropdown
                        key={item.label}
                        item={item}
                        isTransparent={isTransparent}
                      />
                    );
                  }

                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group relative py-2 text-[0.8125rem] font-medium tracking-[0.01em]",
                        "transition-colors duration-[--duration-micro]",
                        isTransparent
                          ? "text-ink-200 hover:text-ink-000"
                          : "text-ink-600 hover:text-ink-900",
                        isActive &&
                          (isTransparent ? "text-ink-000" : "text-ink-900"),
                      )}
                    >
                      {item.label}
                      {/* Accent rule grows from the left on hover, stays for
                          the active route. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-1 left-0 h-px w-full origin-left rounded-full bg-accent-500",
                          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive ? "scale-x-100" : "scale-x-0",
                          "group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-4">
                {/* Primary CTA. Radius one step tighter than the island —
                    matching exactly would make it look glued to the bar,
                    tighter reads as nested. The only filled element here, so
                    it carries the emphasis without needing extra size. */}
                <Link
                  href={primaryCta.href}
                  className={cn(
                    "group hidden items-center gap-2 rounded-lg lg:flex",
                    "text-[0.8125rem] font-semibold tracking-[0.01em]",
                    "bg-accent-500 text-ink-000",
                    "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "hover:bg-accent-600 hover:shadow-[0_6px_20px_-6px_rgb(63_163_91/0.55)]",
                    isSolid ? "px-5 py-2.5" : "px-6 py-3",
                  )}
                >
                  {primaryCta.label}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                {/* Mobile trigger. Toggles rather than only opening — this bar
                    sits above the panel at z-50, so it stays reachable and
                    pressing it again is the obvious way out.

                    Forced to light styling while open, since the panel behind
                    it is dark regardless of scroll position. */}
                <button
                  type="button"
                  onClick={() => setIsMobileOpen((previous) => !previous)}
                  aria-expanded={isMobileOpen}
                  aria-label={
                    isMobileOpen
                      ? "Close navigation menu"
                      : "Open navigation menu"
                  }
                  className={cn(
                    "flex items-center gap-2 py-2 transition-colors duration-[--duration-micro] lg:hidden",
                    isMobileOpen || isTransparent
                      ? "text-ink-200 hover:text-ink-000"
                      : "text-ink-600 hover:text-ink-900",
                  )}
                >
                  <span className="eyebrow">
                    {isMobileOpen ? "Close" : "Menu"}
                  </span>
                  {/* Both icons render and cross-fade. Swapping the element
                      would pop; rotating opacity does not. */}
                  <span className="relative block h-5 w-5">
                    <Menu
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isMobileOpen
                          ? "rotate-90 opacity-0"
                          : "rotate-0 opacity-100",
                      )}
                    />
                    <X
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isMobileOpen
                          ? "rotate-0 opacity-100"
                          : "-rotate-90 opacity-0",
                      )}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}