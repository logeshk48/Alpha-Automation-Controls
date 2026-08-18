"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

/* --------------------------------------------------------------------------
   BACK TO TOP

   Appears once the reader is a viewport or so down the page, and returns
   them to the top.

   Threshold is deliberately generous — a button that appears after a few
   pixels of scroll is clutter. It only earns its place once returning to the
   top is a genuine chore.

   Positioned bottom-right with enough inset to clear a mobile browser's
   bottom chrome, and low enough in the stack that it never covers the
   navigation.
   -------------------------------------------------------------------------- */

const SHOW_AFTER = 900;

export function BackToTop() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const next = current > SHOW_AFTER;
    /* Guarded: this fires on every scroll frame, and setting identical state
       would re-render continuously. */
    setIsVisible((previous) => (previous === next ? previous : next));
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-accent-500/40 bg-ink-900/80 shadow-[0_8px_28px_-8px_rgba(8,9,10,0.6)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent-500 hover:bg-accent-500 hover:shadow-[0_10px_32px_-8px_rgba(63,163,91,0.6)] md:bottom-8 md:right-8"
        >
          <ArrowUp
            aria-hidden="true"
            className="h-5 w-5 text-accent-400 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:text-ink-000"
            strokeWidth={2}
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}