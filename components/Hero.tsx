"use client";

import { useEffect, useState } from "react";
import { IconFlecha, IconWhatsApp } from "./Icons";
import { waLink } from "./ui";

const giros = ["negocio", "consultorio", "restaurante", "taller", "tienda", "despacho"];

/* Reloj real: el sitio sabe si estás en horario de atención */
function useEstado() {
  const [txt, setTxt] = useState("Naucalpan, MX");
  const [activo, setActivo] = useState(true);
  useEffect(() => {
    const tick = () => {
      const ahora = new Date();
      const h = ahora.getHours();
      const abierto = h >= 8 && h < 22;
      setActivo(abierto);
      setTxt(
        `${ahora.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })} en Naucalpan · ${
          abierto ? "contestando" : "te leo por la mañana"
        }`
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return { txt, activo };
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
        <em
          key={g}
          aria-hidden={k !== i}
          className="col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: k === i ? 1 : 0,
            transform: k === i ? "none" : "translateY(0.22em)",
          }}
        >
          {g}
        </em>
      ))}
      <span className="invisible col-start-1 row-start-1">consultorio</span>
    </span>
  );
}

export default function Hero() {
  const { txt, activo } = useEstado();

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden className="blueprint absolute inset-0" />

      <div className="relative mx-auto max-w-[1180px] px-6 pt-36 pb-20 sm:pt-44 sm:pb-28">
        {/* Estado en vivo — dato real, no adorno */}
        <p className="tag rise flex items-center gap-2.5" style={{ animationDelay: "80ms" }}>
          <span
            className={`breathe h-1.5 w-1.5 rounded-full ${activo ? "bg-live" : "bg-ink-3"}`}
            style={{ animationPlayState: activo ? "running" : "paused" }}
          />
          {txt}
        </p>

        {/* Titular editorial */}
        <h1 className="display mt-8 text-[clamp(2.75rem,9.4vw,7.5rem)] text-ink">
          <span className="rise block" style={{ animationDelay: "160ms" }}>
            Software
          </span>
          <span className="rise flex items-baseline gap-[0.25em]" style={{ animationDelay: "260ms" }}>
            a la medida
            <span
              aria-hidden
              className="draw hidden h-px flex-1 translate-y-[-0.28em] bg-rule-strong sm:block"
              style={{ animationDelay: "900ms" }}
            />
          </span>
          <span className="rise block text-ink-2" style={{ animationDelay: "360ms" }}>
            de tu <Giro />
          </span>
        </h1>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <p
            className="rise max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2"
            style={{ animationDelay: "460ms" }}
          >
            Tus clientes ya te buscan en internet. Me encargo de que te encuentren, te
            escriban por WhatsApp y agenden solos —{" "}
            <span className="text-ink">mientras tú te dedicas a lo tuyo.</span>
          </p>

          <div className="rise flex flex-wrap items-center gap-3" style={{ animationDelay: "560ms" }}>
            <a
              href={waLink("Hola, quiero platicar un proyecto")}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-accent"
            >
              <IconWhatsApp size={17} />
              Platícame tu idea
              <IconFlecha
                size={17}
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              />
            </a>
            <a
              href="#servicios"
              className="link-draw text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              Ver qué hago
            </a>
          </div>
        </div>
      </div>

      {/* Cifras como pie de plano técnico, no como tarjetas */}
      <div className="relative mx-auto max-w-[1180px] px-6">
        <div className="rule-tick" />
        <dl className="grid grid-cols-2 gap-x-8 gap-y-7 py-7 sm:grid-cols-4">
          {[
            ["24 h", "y ya tienes respuesta"],
            ["1 sem", "y tu sitio está en línea"],
            ["0", "letras chiquitas"],
            ["1", "persona: la que construye"],
          ].map(([n, t], i) => (
            <div key={t} className="rise" style={{ animationDelay: `${700 + i * 70}ms` }}>
              <dt className="display tabular text-[2rem] leading-none text-ink">{n}</dt>
              <dd className="mt-2 text-[0.8125rem] leading-snug text-ink-3">{t}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
