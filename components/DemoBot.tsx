"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Titulo, waLink } from "./ui";
import { IconFlecha, IconWhatsApp } from "./Icons";

/* ============================================================
   Demo real: un chatbot de WhatsApp que el visitante puede usar.
   No es un video ni una imagen — es la pieza funcionando.
   ============================================================ */

type Msg = { de: "bot" | "user"; texto: string };
type Nodo = { respuesta: string; opciones: { label: string; siguiente: string }[] };

const flujo: Record<string, Nodo> = {
  inicio: {
    respuesta:
      "¡Hola! Soy el asistente de Estética Luna, un negocio de ejemplo. Contesto yo solito, las 24 horas. ¿En qué te ayudo?",
    opciones: [
      { label: "Agendar una cita", siguiente: "agendar" },
      { label: "Ver precios", siguiente: "precios" },
      { label: "Horarios", siguiente: "horarios" },
    ],
  },
  agendar: {
    respuesta: "¡Claro que sí! Para mañana tengo estos espacios disponibles:",
    opciones: [
      { label: "10:00 am", siguiente: "confirmada" },
      { label: "1:30 pm", siguiente: "confirmada" },
      { label: "6:00 pm", siguiente: "confirmada" },
    ],
  },
  confirmada: {
    respuesta:
      "Listo, tu cita quedó confirmada. Un día antes te mando un recordatorio para que no se te pase.\n\nAsí de fácil sería para TUS clientes.",
    opciones: [
      { label: "Quiero esto en mi negocio", siguiente: "cta" },
      { label: "Probar otra vez", siguiente: "inicio" },
    ],
  },
  precios: {
    respuesta: "Con gusto: corte $180 · tinte desde $650 · uñas $250 · peinado $300. ¿Te aparto un lugar?",
    opciones: [
      { label: "Sí, agendar", siguiente: "agendar" },
      { label: "Probar otra vez", siguiente: "inicio" },
    ],
  },
  horarios: {
    respuesta: "Abrimos de lunes a sábado, de 10 am a 8 pm. ¿Quieres que te aparte un lugar antes de que se llene?",
    opciones: [
      { label: "Sí, agendar", siguiente: "agendar" },
      { label: "Probar otra vez", siguiente: "inicio" },
    ],
  },
};

function Escribiendo() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex w-fit items-end gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm"
      aria-label="Escribiendo"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-3"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

export default function DemoBot() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [nodo, setNodo] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const irA = (destino: string, labelUsuario?: string) => {
    if (destino === "inicio" && labelUsuario) {
      setMsgs([]);
      setNodo(null);
      setTimeout(arrancar, 280);
      return;
    }
    if (labelUsuario) setMsgs((m) => [...m, { de: "user", texto: labelUsuario }]);
    setNodo(null);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { de: "bot", texto: flujo[destino].respuesta }]);
      setNodo(destino);
    }, 1000);
  };

  const arrancar = () => irA("inicio");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, nodo]);

  const opciones = nodo ? flujo[nodo].opciones : [];

  return (
    <section id="demo" className="relative scroll-mt-24 overflow-hidden border-y border-rule bg-sunk/60 py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <Titulo nota="Esto no es un video ni una captura: es un chatbot funcionando dentro de esta página. Tócale y mira cómo agendaría una cita por ti.">
          Pruébalo tú mismo
        </Titulo>

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          <Reveal>
            <dl className="border-t border-rule">
              {[
                ["Contesta cuando tú ya cerraste", "A las 11 de la noche, en domingo, en tu día de descanso."],
                ["Agenda sin que levantes un dedo", "El cliente elige su horario y la cita queda hecha."],
                ["Manda el recordatorio solo", "Un día antes, para que nadie olvide su cita."],
                ["Habla como tu negocio", "Con tus precios, tus horarios y tu forma de decir las cosas."],
              ].map(([t, d]) => (
                <div key={t} className="border-b border-rule py-6">
                  <dt className="display text-[1.5rem] leading-tight text-ink">{t}</dt>
                  <dd className="mt-1.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-2">{d}</dd>
                </div>
              ))}
            </dl>

            <a
              href={waLink("Hola, probé el chatbot de tu página y quiero uno para mi negocio")}
              target="_blank"
              rel="noopener"
              className="group mt-9 inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(37,99,235,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <IconWhatsApp size={17} />
              Quiero uno para mi negocio
              <IconFlecha size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          {/* El teléfono */}
          <Reveal delay={0.08} className="mx-auto w-full max-w-[370px]">
            <div className="glass-deep overflow-hidden rounded-[1.75rem]">
              <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[0.8125rem] font-semibold text-[#075e54]">
                  EL
                </span>
                <span className="leading-tight">
                  <b className="block text-[0.9375rem] font-medium text-white">Estética Luna</b>
                  <span className="text-[0.75rem] text-green-200">{typing ? "escribiendo…" : "en línea"}</span>
                </span>
                <span className="tag ml-auto rounded-full bg-white/15 px-2.5 py-1 text-[0.625rem] text-white">
                  DEMO
                </span>
              </div>

              <div
                ref={scrollRef}
                className="flex h-[330px] flex-col gap-2 overflow-y-auto bg-[#eae6df] p-3.5"
                style={{
                  backgroundImage: "radial-gradient(rgba(18,18,15,0.05) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {msgs.length === 0 && !typing && (
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <button
                      onClick={arrancar}
                      className="cursor-pointer rounded-xl bg-accent px-6 py-3 text-[0.9375rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      Iniciar conversación
                    </button>
                    <p className="text-[0.75rem] text-ink-2">Toca para ver al bot en acción</p>
                  </div>
                )}
                <AnimatePresence mode="popLayout">
                  {msgs.map((m, i) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 340, damping: 26 }}
                      className={`w-fit max-w-[86%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-[0.8125rem] leading-snug text-ink shadow-sm ${
                        m.de === "bot" ? "self-start rounded-bl-sm bg-white" : "self-end rounded-br-sm bg-[#d9fdd3]"
                      }`}
                    >
                      {m.texto}
                    </motion.div>
                  ))}
                  {typing && <Escribiendo key="typing" />}
                </AnimatePresence>
              </div>

              <div className="flex min-h-[62px] flex-wrap items-center justify-center gap-2 border-t border-rule bg-paper p-3">
                <AnimatePresence>
                  {opciones.map((o) =>
                    o.siguiente === "cta" ? (
                      <motion.a
                        key={o.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        href={waLink("Hola, probé el chatbot de tu página y quiero uno para mi negocio")}
                        target="_blank"
                        rel="noopener"
                        className="rounded-xl bg-accent px-4 py-2 text-[0.8125rem] font-semibold text-white"
                      >
                        {o.label}
                      </motion.a>
                    ) : (
                      <motion.button
                        key={o.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        onClick={() => irA(o.siguiente, o.label)}
                        className="rounded-full border border-accent px-4 py-2 text-[0.8125rem] font-medium text-accent transition-colors duration-300 hover:bg-accent-soft"
                      >
                        {o.label}
                      </motion.button>
                    )
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
