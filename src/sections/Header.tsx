"use client";

import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { useCallback, useEffect } from "react";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact", highlight: true },
];



export const Header = () => {
  const hidden = useHideOnScroll({ threshold: 6, showAt: 40 });

  // Measure the navbar height and add the 12px top gap from `top-3`
  const getOffset = useCallback(() => {
    const nav = document.getElementById("site-navbar");
    const navH = nav?.getBoundingClientRect().height ?? 0;
    const topGap = 12; // from class `top-3`
    return navH + topGap;
  }, []);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: "smooth" });

      // Update the URL hash without triggering the native jump
      history.replaceState(null, "", `#${id}`);
    },
    [getOffset]
  );

  // Handle deep links like /#projects on first load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // Run after layout settles
      setTimeout(() => scrollToId(id), 0);
    }
  }, [scrollToId]);

  return (
    <div
      className={[
        "fixed top-3 left-0 w-full flex justify-center items-center z-50",
        "motion-safe:transition-all motion-safe:duration-300",
        hidden ? "-translate-y-20 opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
      ].join(" ")}
    >
      <nav
        id="site-navbar"
        className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur"
      >
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`} // keeps accessibility & right-click copy
            onClick={(e) => {
              e.preventDefault();
              scrollToId(link.id);
            }}
            className={[
              "nav-item",
              link.highlight
                ? "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
                : "",
            ].join(" ")}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
};


