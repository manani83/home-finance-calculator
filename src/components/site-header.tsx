"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/#calculators", label: "계산기", activePath: "/calculators" },
  { href: "/guides", label: "금융 가이드", activePath: "/guides" },
  { href: "/about", label: "사이트 소개", activePath: "/about" },
];

function isActive(currentPath: string, activePath: string) {
  if (activePath === "/calculators") return currentPath.startsWith("/calculators");
  return currentPath === activePath || currentPath.startsWith(`${activePath}/`);
}

export function SiteHeader({ currentPath }: { currentPath?: string }) {
  const [observedPath, setObservedPath] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );
  const resolvedPath = currentPath ?? observedPath;
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    if (currentPath !== undefined) return undefined;

    const handlePathChange = () => {
      setObservedPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePathChange);
    return () => window.removeEventListener("popstate", handlePathChange);
  }, [currentPath]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      setHasShadow(nextScrollY > lastScrollY && nextScrollY > 0);
      lastScrollY = nextScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLinks = () =>
    navItems.map((item) => {
      const active = isActive(resolvedPath, item.activePath);
      return <Link key={item.href} className={active ? "active" : undefined} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
    });

  return (
    <header className={`site-header${hasShadow ? " is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link className="brand" href="/">주거금융계산기</Link>
        <nav aria-label="주요 메뉴">{renderLinks()}</nav>
        <button className="menu-toggle" type="button" aria-label="메뉴 열기" onClick={() => setIsOpen(true)}>☰</button>
      </div>
      {isOpen ? (
        <div className="mobile-drawer" role="dialog" aria-label="모바일 메뉴" aria-modal="true">
          <button className="mobile-drawer-overlay" type="button" aria-label="메뉴 배경 닫기" onClick={() => setIsOpen(false)} />
          <div className="mobile-drawer-panel">
            <div className="mobile-drawer-header">
              <Link className="brand" href="/" onClick={() => setIsOpen(false)}>주거금융계산기</Link>
              <button type="button" aria-label="메뉴 닫기" onClick={() => setIsOpen(false)}>×</button>
            </div>
            <nav aria-label="모바일 주요 메뉴" onClick={() => setIsOpen(false)}>{renderLinks()}</nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
