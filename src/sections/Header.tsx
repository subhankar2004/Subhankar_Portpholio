"use client";

import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { useCallback, useEffect, useState } from "react";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export const Header = () => {
  const hidden = useHideOnScroll({ threshold: 6, showAt: 40 });
  const [activeId, setActiveId] = useState("home");

  // Measure the navbar height and add the 12px top gap from `top-3`
  const getOffset = useCallback(() => {
    const nav = document.getElementById("site-navbar");
    const navH = nav?.getBoundingClientRect().height ?? 0;
    const topGap = 12; // from class `top-3`
    return navH + topGap + 50; // Added extra buffer for better detection
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = getOffset();
      const scrollPosition = window.scrollY + offset;
      
      let current = "home"; // default to home
      
      // Get all sections and sort them by their position
      const sections = Array.from(document.querySelectorAll("section[id]"))
        .map(section => {
          const element = section as HTMLElement;
          return {
            id: element.getAttribute("id")!,
            offsetTop: element.offsetTop,
            offsetBottom: element.offsetTop + element.offsetHeight
          };
        })
        .sort((a, b) => a.offsetTop - b.offsetTop);

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop) {
          current = section.id;
          break;
        }
      }

      // Special case for when we're near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          current = lastSection.id;
        }
      }

      setActiveId(current);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll(); // run initially
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [getOffset]);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      
      const offset = getOffset();
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

      // Update the URL hash without triggering the native jump
      history.replaceState(null, "", `#${id}`);
      
      // Immediately set the active ID to provide instant feedback
      setActiveId(id);
    },
    [getOffset]
  );

  // Handle deep links like /#projects on first load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // Wait a bit longer to ensure the page is fully loaded
      setTimeout(() => scrollToId(id), 100);
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
        {LINKS.map((link) => {
          const highlight = activeId === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(link.id);
              }}
              className={[
                "nav-item px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                highlight
                  ? "bg-white text-gray-900 hover:bg-white/90"
                  : "text-white/80 hover:text-white hover:bg-white/10",
              ].join(" ")}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
};



