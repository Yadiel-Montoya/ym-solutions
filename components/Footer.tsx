"use client";

import { Marca } from "./Icons";
import { WA } from "./ui";

const columnas = [
  {
    titulo: "Qué construyo",
    links: [
      ["#servicios", "Páginas web"],
      ["#servicios", "Chatbots de WhatsApp"],
      ["#servicios", "Interfaces con ERP"],
      ["#servicios", "Automatización"],
    ],
  },
  {
    titulo: "Explora",
    links: [
      ["#sectores", "Con quién trabajo"],
      ["#proceso", "Cómo trabajo"],
      ["#faq", "Preguntas frecuentes"],
      ["#contacto", "Contacto"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#inicio" className="flex items-center gap-2.5 text-ink">
              <Marca size={22} className="text-accent" />
              <span className="text-[0.9375rem] font-medium tracking-tight">YM Solutions</span>
            </a>
            <p className="display mt-5 max-w-[18ch] text-[1.75rem] leading-tight text-ink-2">
              Software a la medida de tu negocio.
            </p>
          </div>

          {columnas.map((c) => (
            <nav key={c.titulo} aria-label={c.titulo}>
              <h3 className="tag">{c.titulo}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([href, t]) => (
                  <li key={t}>
                    <a href={href} className="link-draw text-[0.875rem] text-ink-2 transition-colors hover:text-ink">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="rule-tick mt-14" />

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 pt-7">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <a href={WA} target="_blank" rel="noopener" className="link-draw tabular text-[0.875rem] text-ink transition-colors hover:text-accent">
              55 6559 5788
            </a>
            <a href="mailto:ymontoya.ymsolutions@gmail.com" className="link-draw text-[0.875rem] text-ink-2 transition-colors hover:text-ink">
              ymontoya.ymsolutions@gmail.com
            </a>
            <a href="https://www.instagram.com/ym__solutions/" target="_blank" rel="noopener" className="link-draw text-[0.875rem] text-ink-2 transition-colors hover:text-ink">
              Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61593035162983" target="_blank" rel="noopener" className="link-draw text-[0.875rem] text-ink-2 transition-colors hover:text-ink">
              Facebook
            </a>
          </div>
          <p className="tag">© 2026 · Naucalpan, Edo. Méx.</p>
        </div>
      </div>
    </footer>
  );
}
