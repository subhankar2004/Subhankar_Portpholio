import { useEffect, useRef, useState } from "react";

type Options = {
  /** How many px of movement counts as “real” scroll (ignore micro scroll). */
  threshold?: number;
  /** Always show the navbar until this Y position is passed. */
  showAt?: number;
};

export function useHideOnScroll({ threshold = 6, showAt = 40 }: Options = {}) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (rafId.current) return;
      rafId.current = window.requestAnimationFrame(() => {
        const delta = currentY - lastY.current;
        const down = delta > threshold;
        const up = delta < -threshold;

        if (currentY <= showAt) {
          // Near the top — keep it visible
          setHidden(false);
        } else if (down) {
          setHidden(true);  // scrolling down → hide
        } else if (up) {
          setHidden(false); // scrolling up → show
        }

        lastY.current = currentY;
        if (rafId.current) {
          window.cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [threshold, showAt]);

  return hidden;
}
