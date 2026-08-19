"use client";

import { useState } from "react";
import { Reveal, WA, WaIcon, waLink } from "./ui";

const intereses = [
  ["🌐", "Página web"],
  ["💬", "Chatbot de WhatsApp"],
  ["🔗", "Interfaz con ERP"],
  ["⚙️", "Automatización"],
  ["🛒", "Tienda en línea"],
];

function saludo() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function Contacto() {
  const [sel, setSel] = useState<string[]>([]);

  const toggle = (v: string) =>
    setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nombre = fd.get("nombre");
    const negocio = fd.get("negocio");
    const mensaje = fd.get("mensaje");
    const lineas = [
      `${saludo()} 👋 Soy ${nombre}, de ${negocio}.`,
      sel.length ? `Me interesa: ${sel.join(", ")}.` : "",
      `${mensaje}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    window.open(waLink(lineas), "_blank", "noopener");
  };

  return (
    <section id="contacto" className="relative scroll-mt-20 overflow-hidden border-t border-line py-24">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white to-cloud">
        <div className="blob left-[-8%] bottom-[-25%] h-[380px] w-[380px] bg-cyan-100" />
        <div className="blob right-[-8%] top-[-20%] h-[380px] w-[380px] bg-violet-100" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.15]">
            Cuéntanos qué traes
            <br />
            <span className="gradient-text">en la cabeza</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            No necesitas tenerlo todo claro ni saber cómo se llama lo que quieres. Escríbenos con tus
            palabras y entre los dos lo aterrizamos. Contestamos rápido — casi siempre el mismo día. 😉
          </p>
          <a
            href={waLink("Hola, quiero cotizar un proyecto 🚀")}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand-wa px-7 py-3.5 font-semibold text-white shadow-xl shadow-green-600/25 transition-transform hover:scale-[1.03]"
          >
            <WaIcon size={20} />
            Escríbenos por WhatsApp
          </a>
          <p className="mt-6 max-w-md text-sm text-ink-soft">
            ¿Te da flojera escribir todo? Llena esto y{" "}
            <strong className="text-ink">se convierte solo en un mensaje de WhatsApp</strong>.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={enviar}
            className="rounded-3xl border border-line bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9"
          >
            <label className="block text-sm font-semibold text-ink">
              Tu nombre
              <input
                type="text"
                name="nombre"
                required
                placeholder="Ej. María López"
                className="mt-2 w-full rounded-xl border border-line bg-cloud px-4 py-3 text-[15px] font-normal text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-cyan focus:bg-white"
              />
            </label>
            <label className="mt-5 block text-sm font-semibold text-ink">
              Tu negocio
              <input
                type="text"
                name="negocio"
                required
                placeholder="Ej. Estética María / Taller / Consultorio…"
                className="mt-2 w-full rounded-xl border border-line bg-cloud px-4 py-3 text-[15px] font-normal text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-cyan focus:bg-white"
              />
            </label>

            <fieldset className="mt-5">
              <legend className="text-sm font-semibold text-ink">
                ¿Qué te late? <small className="font-normal text-ink-soft">(marca lo que quieras)</small>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {intereses.map(([emoji, v]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => toggle(v)}
                    className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-all ${
                      sel.includes(v)
                        ? "border-transparent bg-gradient-to-r from-brand-cyan to-brand-violet text-white shadow-md shadow-violet-500/25"
                        : "border-line bg-cloud text-ink-soft hover:border-slate-300"
                    }`}
                  >
                    {emoji} {v}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 block text-sm font-semibold text-ink">
              Cuéntanos un poco
              <textarea
                name="mensaje"
                rows={4}
                required
                placeholder="Ej. Tengo un consultorio y quiero que mis pacientes agenden por WhatsApp sin que yo conteste…"
                className="mt-2 w-full resize-y rounded-xl border border-line bg-cloud px-4 py-3 text-[15px] font-normal text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-cyan focus:bg-white"
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet py-4 font-semibold text-white shadow-xl shadow-violet-500/25 transition-transform hover:scale-[1.02]"
            >
              Enviar por WhatsApp →
            </button>
            <p className="mt-4 text-center text-xs text-ink-soft">
              Se abre WhatsApp con tu mensaje ya escrito. No guardamos nada ni te mandamos spam.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Botón flotante de WhatsApp ---------- */
export function WaFloat() {
  return (
    <a
      href={`${WA}?text=${encodeURIComponent("Hola, quiero informes 👋")}`}
      target="_blank"
      rel="noopener"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-wa text-white shadow-2xl shadow-green-600/40 transition-transform hover:scale-110"
    >
      <WaIcon size={26} />
    </a>
  );
}
