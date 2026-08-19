"use client";

import { useEffect, useState } from "react";
import { Logo, WaIcon, waLink } from "./ui";

const links = [
  { href: "#servicios", label: "Qué hacemos" },
  { href: "#demo", label: "🤖 Pruébalo" },
  { href: "#sectores", label: "Para quién" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-white/80 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="YM Solutions — inicio">
          <Logo size={30} />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            YM <em className="gradient-text not-italic">SOLUTIONS</em>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink("Hola, quiero cotizar un proyecto 🚀")}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-2 rounded-full bg-brand-wa px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <WaIcon size={16} />
            Escríbenos
          </a>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-line bg-white lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className={`h-0.5 w-5 rounded bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 rounded bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 rounded bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-cloud hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
