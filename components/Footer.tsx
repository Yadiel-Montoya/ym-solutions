"use client";

import { Logo, WA } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#inicio" className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              YM <em className="gradient-text not-italic">SOLUTIONS</em>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Software a la medida de tu negocio. Soluciones claras, sin complicaciones.
          </p>
        </div>
        <nav aria-label="Servicios" className="text-sm">
          <h4 className="font-display mb-3 font-bold text-ink">Servicios</h4>
          {["Páginas web", "Chatbots WhatsApp", "Interfaces con ERP", "Automatización"].map((t) => (
            <a key={t} href="#servicios" className="block py-1.5 text-ink-soft transition-colors hover:text-ink">
              {t}
            </a>
          ))}
        </nav>
        <nav aria-label="Explorar" className="text-sm">
          <h4 className="font-display mb-3 font-bold text-ink">Explora</h4>
          {[
            ["#sectores", "Para quién"],
            ["#proceso", "Cómo trabajamos"],
            ["#faq", "Preguntas frecuentes"],
            ["#contacto", "Contacto"],
          ].map(([href, t]) => (
            <a key={href} href={href} className="block py-1.5 text-ink-soft transition-colors hover:text-ink">
              {t}
            </a>
          ))}
        </nav>
        <div className="text-sm">
          <h4 className="font-display mb-3 font-bold text-ink">Hablemos</h4>
          <a href={WA} target="_blank" rel="noopener" className="block py-1.5 text-ink-soft transition-colors hover:text-ink">
            📲 55 6559 5788
          </a>
          <a href="mailto:ymontoya.ymsolutions@gmail.com" className="block py-1.5 text-ink-soft transition-colors hover:text-ink">
            ✉️ Escríbenos
          </a>
          <a href="https://www.facebook.com/profile.php?id=61593035162983" target="_blank" rel="noopener" className="block py-1.5 text-ink-soft transition-colors hover:text-ink">
            Facebook
          </a>
          <a href="https://www.instagram.com/ym__solutions/" target="_blank" rel="noopener" className="block py-1.5 text-ink-soft transition-colors hover:text-ink">
            Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-xs text-ink-soft">
          <p>© 2026 YM Solutions · Naucalpan, Estado de México</p>
          <p>Hecho con 💜 Next.js, React y mucho código</p>
        </div>
      </div>
    </footer>
  );
}
