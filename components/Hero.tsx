"use client";

import { useEffect, useState } from "react";
import { IconFlecha, IconWhatsApp } from "./Icons";
import { waLink } from "./ui";

const giros = ["negocio", "consultorio", "restaurante", "taller", "tienda", "despacho"];

/* Reloj real de Naucalpan: dato vivo, no adorno */
function useEstado() {
  const [hora, setHora] = useState("");
  const [activo, setActivo] = useState(true);
  useEffect(() => {
    const tick = () => {
      const ahora = new Date();
      setActivo(ahora.getHours() >= 8 && ahora.getHours() < 22);
      setHora(ahora.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return { hora, activo };
}

function Giro() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % giros.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-grid align-baseline">
      {giros.map((g, k) => (
        <span
          key={g}
          aria-hidden={k !== i}
          className="brand-grad col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: k === i ? 1 : 0, transform: k === i ? "none" : "translateY(0.2em)" }}
        >
          {g}
        </span>
      ))}
      <span className="invisible col-start-1 row-start-1">consultorio</span>
    </span>
  );
}

/* Terminal de vidrio: el sistema del negocio, corriendo */
function Terminal({ hora, activo }: { hora: string; activo: boolean }) {
  const lineas: [string, string, number][] = [
    ["$", "ym deploy tu-negocio.mx", 600],
    ["✓", "Página en línea — carga en 0.8 s", 1400],
    ["✓", "WhatsApp conectado — contesta solo", 2100],
    ["✓", "Agenda activa — 3 citas hoy", 2800],
    ["✓", "Recordatorios programados", 3500],
    ["●", "Sistema vendiendo 24/7 …", 4300],
  ];
  return (
    <div className="glass-deep w-full max-w-[480px] rounded-2xl">
      <div className="flex items-center gap-2 border-b border-rule/70 px-5 py-3">
        <i className="h-3 w-3 rounded-full bg-[#f87171]" />
        <i className="h-3 w-3 rounded-full bg-[#fbbf24]" />
        <i className="h-3 w-3 rounded-full bg-[#34d399]" />
        <span className="tag ml-3">ym-solutions · sistema</span>
        <span className="tabular ml-auto font-mono text-[0.6875rem] text-ink-3">{hora}</span>
      </div>
      <div className="space-y-2.5 px-6 py-5 font-mono text-[0.8125rem] leading-relaxed">
        {lineas.map(([pre, txt, delay], i) => (
          <div key={i} className="term-line flex gap-2.5" style={{ animationDelay: `${delay}ms` }}>
            <span className={pre === "✓" ? "text-live" : pre === "●" ? "breathe text-accent" : "text-ink-3"}>
              {pre}
            </span>
            <span className={pre === "$" ? "text-ink" : "text-ink-2"}>{txt}</span>
            {i === lineas.length - 1 && <span className="caret -ml-1 text-accent">▌</span>}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 border-t border-rule/70 px-6 py-3.5">
        <span className={`breathe h-2 w-2 rounded-full ${activo ? "bg-live" : "bg-ink-3"}`} />
        <span className="text-[0.8125rem] text-ink-2">
          {activo ? "Yadiel está contestando ahora" : "Escríbeme, te leo por la mañana"}
        </span>
      </div>
    </div>
  );
}

export default function SistemaVivo() {
  const { hora, activo } = useEstado();

  return (
    <section id="sistema" className="relative scroll-mt-24 overflow-hidden border-b border-rule">
      <div aria-hidden className="mesh" />
      <div aria-hidden className="grid-tech absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-6 py-24 sm:py-32 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] text-ink">
            Esto es lo que instalo<br />en tu negocio
          </h2>
          <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-2">
            No es solo una página: es un sistema que recibe al cliente, contesta,
            agenda y te avisa. Así se ve corriendo — con la hora real de ahorita.
          </p>
          <a href="#servicios" className="link-draw mt-7 inline-block cursor-pointer text-[0.9375rem] font-semibold text-accent">
            Ver qué construyo
          </a>
        </div>
        <div className="justify-self-center lg:justify-self-end" aria-hidden>
          <Terminal hora={hora} activo={activo} />
        </div>
      </div>
    </section>
  );
}
