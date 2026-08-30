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

export default function Hero() {
  const { hora, activo } = useEstado();

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden className="mesh" />
      <div aria-hidden className="grid-tech absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-6 pt-36 pb-16 sm:pt-40 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="tag rise flex items-center gap-2.5" style={{ animationDelay: "60ms" }}>
            <span className={`breathe h-1.5 w-1.5 rounded-full ${activo ? "bg-live" : "bg-ink-3"}`} />
            Desarrollo de software · Naucalpan, MX
          </p>

          <h1 className="display rise mt-6 text-[clamp(2.4rem,5.6vw,4.1rem)] text-ink" style={{ animationDelay: "140ms" }}>
            Software a la medida
            <br />
            de tu <Giro />
          </h1>

          <p className="rise mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2" style={{ animationDelay: "240ms" }}>
            Tus clientes ya te buscan en internet. Me encargo de que te encuentren, te
            escriban por WhatsApp y agenden solos —{" "}
            <span className="font-medium text-ink">mientras tú te dedicas a lo tuyo.</span>
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "340ms" }}>
            <a
              href={waLink("Hola, quiero platicar un proyecto")}
              target="_blank"
              rel="noopener"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(37,99,235,0.55)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(37,99,235,0.65)]"
            >
              <IconWhatsApp size={17} />
              Platícame tu idea
              <IconFlecha size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#demo" className="link-draw cursor-pointer text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-ink">
              Prueba el chatbot
            </a>
          </div>

          <dl className="rise mt-12 flex flex-wrap gap-x-10 gap-y-4" style={{ animationDelay: "440ms" }}>
            {[
              ["24 h", "y ya tienes respuesta"],
              ["1 sem", "y tu sitio está en línea"],
              ["1", "persona: la que construye"],
            ].map(([n, t]) => (
              <div key={t}>
                <dt className="display tabular text-[1.75rem] text-ink">{n}</dt>
                <dd className="mt-1 text-[0.8125rem] text-ink-3">{t}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise hidden justify-self-end lg:block" style={{ animationDelay: "300ms" }} aria-hidden>
          <Terminal hora={hora} activo={activo} />
        </div>
      </div>
    </section>
  );
}
