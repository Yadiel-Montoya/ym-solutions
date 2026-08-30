"use client";

import { useEffect, useState } from "react";
import { Marca, IconWhatsApp } from "./Icons";
import { waLink } from "./ui";

const links = [
  { href: "#servicios", label: "Qué construyo" },
  { href: "#demo", label: "Pruébalo" },
  { href: "#sectores", label: "Con quién trabajo" },
  { href: "#proceso", label: "Cómo trabajo" },
];

export default function Nav() {
  const [fijo, setFijo] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setFijo(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [abierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        fijo ? "glass border-b-0" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
        <a href="#inicio" className="flex items-center gap-2.5 text-ink" aria-label="YM Solutions, inicio">
          <Marca size={22} className="text-accent" />
          <span className="text-[0.9375rem] font-medium tracking-tight">
            YM Solutions
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-draw text-[0.875rem] text-ink-2 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={waLink("Hola, quiero platicar un proyecto")}
            target="_blank"
            rel="noopener"
            className="hidden cursor-pointer items-center gap-2 rounded-xl bg-accent px-5 py-2 text-[0.875rem] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(37,99,235,0.55)] transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            <IconWhatsApp size={15} />
            Escríbeme
          </a>
          <button
            onClick={() => setAbierto(!abierto)}
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={abierto}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`h-px w-5 bg-ink transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${abierto ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-ink transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${abierto ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {abierto && (
        <nav className="border-t border-rule bg-paper px-6 py-3 lg:hidden" aria-label="Menú móvil">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setAbierto(false)}
              className="display block border-b border-rule py-4 text-[1.5rem] text-ink last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
