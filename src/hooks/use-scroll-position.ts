"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether scroll has passed a threshold.
 * Only updates React state when the boolean flips (avoids per-frame re-renders).
 */
export function useScrollPosition(threshold = 24) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const next = window.scrollY > threshold;
      setPassed((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return { passed };
}
