"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "motion/react";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;
const DESKTOP_QUERY = "(min-width: 64rem)";
/** Routes whose first section is a full-bleed image the header can sit over. */
const OVERLAY_ROUTES = new Set(["/"]);

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Menu state is tied to the route it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const menuOpen = openOn === pathname;

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const overlay = OVERLAY_ROUTES.has(pathname) && !scrolled && !menuOpen;

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpenOn(null);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // While the menu is open: lock page scroll, hide the page from assistive
  // tech and keyboard focus, move focus into the panel and listen for Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const covered = document.querySelectorAll<HTMLElement>("[data-page-content]");
    covered.forEach((element) => element.setAttribute("inert", ""));

    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      root.style.overflow = previousOverflow;
      covered.forEach((element) => element.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500",
        overlay
          ? "border-transparent bg-transparent text-ivory"
          : "border-line bg-ivory text-ink",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/"
          className={cn(
            "text-[0.8125rem] font-medium tracking-[0.32em] whitespace-nowrap uppercase",
            overlay && "focus-light",
          )}
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "py-2 text-[0.875rem] tracking-[0.02em] transition-opacity duration-300",
                      active ? "link-underline-static" : "link-underline opacity-85 hover:opacity-100",
                      overlay && "focus-light",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              "hidden min-h-11 items-center border px-5 text-[0.75rem] font-medium tracking-[0.14em] uppercase transition-colors duration-500 sm:inline-flex",
              overlay
                ? "focus-light border-ivory/60 hover:bg-ivory hover:text-ink"
                : "border-ink/70 hover:bg-ink hover:text-ivory",
            )}
          >
            {site.consultationLabel}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center gap-3 px-2 lg:hidden",
              overlay && "focus-light",
            )}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => (menuOpen ? closeMenu(false) : setOpenOn(pathname))}
          >
            <span className="label">{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 h-px w-6 bg-current transition-transform duration-500 ease-quiet",
                  menuOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-6 bg-current transition-transform duration-500 ease-quiet",
                  menuOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            ref={panelRef}
            id={menuId}
            key="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain bg-ivory text-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pt-10 pb-10">
              <ul className="border-t border-line">
                {navigation.map((item, index) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <m.li
                      key={item.href}
                      className="border-b border-line"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease, delay: 0.05 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline justify-between py-5 font-serif text-[2.25rem] leading-none font-light"
                      >
                        {item.label}
                        <span aria-hidden="true" className="label text-stone">
                          0{index + 1}
                        </span>
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center bg-ink px-6 text-[0.75rem] font-medium tracking-[0.14em] text-ivory uppercase"
                >
                  {site.consultationLabel}
                </Link>
              </div>
              <p className="mt-auto pt-12 text-[0.8125rem] leading-relaxed text-stone">
                {site.disclaimer}
              </p>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
