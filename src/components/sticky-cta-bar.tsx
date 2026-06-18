"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyCtaBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero || typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      className={`sticky-cta-bar${isVisible ? " is-visible" : ""}`}
      href="/#calculators"
      aria-hidden={isVisible ? "false" : "true"}
      tabIndex={isVisible ? 0 : -1}
    >
      지금 계산하기
    </Link>
  );
}
