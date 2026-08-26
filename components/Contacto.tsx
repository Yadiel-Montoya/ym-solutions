"use client";

import { useEffect, useState } from "react";
import { Reveal, WA, waLink } from "./ui";
import { IconWhatsApp, IconFlecha } from "./Icons";

const intereses = [
  "Página web",
  "Chatbot de WhatsApp",
  "Interfaz con ERP",
  "Automatización",
  "Tienda en línea",
];

function saludo() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function Contacto() {
  const [sel, setSel] = useState<string[]>([]);
  const [enviado, setEnviado] = useState(false);

  const toggle = (v: string) =>
    setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lineas = [
      `${saludo()}, soy ${fd.get("nombre")} de ${fd.get("negocio")}.`,
      sel.length ? `Me interesa: ${sel.join(", ")}.` : "",
      String(fd.get("mensaje") ?? ""),
    ].filter(Boolean);
    window.open(waLink(lineas.join("\n\n")), "_blank", "noopener");
    setEnviado(true);
  };

  const campo =
    "mt-2 w-full border-b border-rule-strong bg-transparent pb-2.5 text-[1.0625rem] text-ink outline-none transition-colors duration-300 focus:border-accent";

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-rule bg-sunk py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <h2 className="display text-[clamp(2.25rem,5.2vw,4rem)] leading-[0.98] text-ink">
            Cuéntame qué traes <em>en la cabeza</em>
          </h2>
          <p className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-ink-2">
            No necesitas tenerlo claro ni saber cómo se llama lo que quieres. Escríbeme
            con tus palabras y entre los dos lo aterrizamos.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={waLink("Hola, quiero platicar un proyecto")}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-accent"
            >
              <IconWhatsApp size={17} />
              55 6559 5788
              <IconFlecha size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="tag">Respondo el mismo día · Naucalpan, Edo. Méx.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={enviar} className="rounded-lg border border-rule bg-paper p-8 sm:p-10">
            <p className="tag">El formulario se convierte en tu mensaje de WhatsApp</p>

            <div className="mt-9 grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="text-[0.8125rem] font-medium text-ink-2">Tu nombre</span>
                <input type="text" name="nombre" required placeholder="María López" className={campo} />
              </label>
              <label className="block">
                <span className="text-[0.8125rem] font-medium text-ink-2">Tu negocio</span>
                <input type="text" name="negocio" required placeholder="Estética María" className={campo} />
              </label>
            </div>

            <fieldset className="mt-9">
              <legend className="text-[0.8125rem] font-medium text-ink-2">
                ¿Qué te late? <span className="text-ink-3">(marca lo que quieras)</span>
              </legend>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {intereses.map((v) => {
                  const on = sel.includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => toggle(v)}
                      aria-pressed={on}
                      className={`rounded-full border px-4 py-2 text-[0.8125rem] transition-colors duration-300 ${
                        on
                          ? "border-accent bg-accent-soft text-accent"
                          : "border-rule-strong text-ink-2 hover:border-ink-3 hover:text-ink"
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="mt-9 block">
              <span className="text-[0.8125rem] font-medium text-ink-2">Cuéntame un poco</span>
              <textarea
                name="mensaje"
                rows={3}
                required
                placeholder="Tengo un consultorio y quiero que mis pacientes agenden solos…"
                className={`${campo} resize-none`}
              />
            </label>

            <button
              type="submit"
              className="group mt-10 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink py-4 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-accent"
            >
              <IconWhatsApp size={17} />
              Enviar por WhatsApp
              <IconFlecha size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="mt-4 text-center text-[0.75rem] text-ink-3" role="status">
              {enviado
                ? "Se abrió WhatsApp con tu mensaje. Si no, escríbeme al 55 6559 5788."
                : "Se abre WhatsApp con tu mensaje ya escrito. No guardo nada ni te mando spam."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* Botón flotante: entra después del hero para no taparlo */
export function WaFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`${WA}?text=${encodeURIComponent("Hola, quiero informes")}`}
      target="_blank"
      rel="noopener"
      aria-label="Escribir por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper shadow-[0_6px_24px_-6px_rgba(18,18,15,0.45)] transition-[background-color,transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <IconWhatsApp size={21} />
    </a>
  );
}
