"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionHead, waLink } from "./ui";

/* ============================================================
   DEMO INTERACTIVO: un chatbot de WhatsApp que el visitante
   puede probar en vivo — el mejor vendedor del servicio.
   ============================================================ */

type Msg = { de: "bot" | "user"; texto: string };
type Nodo = { respuesta: string; opciones: { label: string; siguiente: string }[] };

const flujo: Record<string, Nodo> = {
  inicio: {
    respuesta: "¡Hola! 👋 Soy el asistente de Estética Luna (un negocio de ejemplo). Contesto yo solito, las 24 horas. ¿En qué te ayudo?",
    opciones: [
      { label: "💇 Agendar una cita", siguiente: "agendar" },
      { label: "💰 Ver precios", siguiente: "precios" },
      { label: "🕐 Horarios", siguiente: "horarios" },
    ],
  },
  agendar: {
    respuesta: "¡Claro que sí! ✨ Para mañana tengo estos espacios disponibles:",
    opciones: [
      { label: "10:00 am", siguiente: "confirmada" },
      { label: "1:30 pm", siguiente: "confirmada" },
      { label: "6:00 pm", siguiente: "confirmada" },
    ],
  },
  confirmada: {
    respuesta: "✅ ¡Listo! Tu cita quedó confirmada. Un día antes te mando un recordatorio para que no se te pase. 😉\n\n(Así de fácil sería para TUS clientes)",
    opciones: [
      { label: "🚀 Quiero esto en mi negocio", siguiente: "cta" },
      { label: "🔄 Probar otra vez", siguiente: "inicio" },
    ],
  },
  precios: {
    respuesta: "Con gusto 💅 Corte $180 · Tinte desde $650 · Uñas $250 · Peinado $300. ¿Te aparto un lugar?",
    opciones: [
      { label: "💇 Sí, agendar", siguiente: "agendar" },
      { label: "🔄 Probar otra vez", siguiente: "inicio" },
    ],
  },
  horarios: {
    respuesta: "Abrimos de lunes a sábado, de 10 am a 8 pm 🕐 ¿Quieres que te aparte un lugar antes de que se llene?",
    opciones: [
      { label: "💇 Sí, agendar", siguiente: "agendar" },
      { label: "🔄 Probar otra vez", siguiente: "inicio" },
    ],
  },
};

function Typing() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex w-fit items-end gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm"
    >
      <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
      <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
      <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
    </motion.div>
  );
}

export default function DemoBot() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [nodo, setNodo] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const [interacciones, setInteracciones] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const irA = (destino: string, labelUsuario?: string) => {
    if (destino === "inicio" && labelUsuario) {
      setMsgs([]);
      setNodo(null);
      setTimeout(() => arrancar(), 300);
      return;
    }
    if (labelUsuario) {
      setMsgs((m) => [...m, { de: "user", texto: labelUsuario }]);
      setInteracciones((v) => v + 1);
    }
    setNodo(null);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { de: "bot", texto: flujo[destino].respuesta }]);
      setNodo(destino);
    }, 1100);
  };

  const arrancar = () => irA("inicio");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, nodo]);

  const opciones = nodo ? flujo[nodo].opciones : [];

  return (
    <section id="demo" className="relative scroll-mt-20 overflow-hidden border-y border-line bg-cloud py-24">
      <div aria-hidden className="absolute inset-0">
        <div className="blob mesh-a left-[-10%] bottom-[-20%] h-[400px] w-[400px] bg-violet-100" />
        <div className="blob mesh-b right-[-10%] top-[-15%] h-[400px] w-[400px] bg-cyan-100" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <SectionHead
            kicker="Pruébalo tú mismo"
            title="Chatea con un bot de verdad, ahorita"
            sub="Esto no es un video ni una imagen: es un chatbot funcionando. Tócale y mira cómo agendaría una cita por ti — aunque sean las 3 de la mañana."
            align="left"
          />
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3">
              {[
                ["🌙", "Contesta cuando tú ya cerraste"],
                ["📅", "Agenda citas sin que levantes un dedo"],
                ["🔔", "Manda recordatorios solo — adiós citas olvidadas"],
                ["🧠", "Se personaliza con los precios y horarios de TU negocio"],
              ].map(([e, t]) => (
                <li key={t} className="flex items-center gap-3 text-[15px] text-ink-soft">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-lg shadow-sm">
                    {e}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <a
              href={waLink("Hola, probé el chatbot demo de su página y quiero uno para mi negocio 🤖")}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet px-7 py-3.5 font-semibold text-white shadow-xl shadow-violet-500/25 transition-transform hover:scale-[1.03]"
            >
              Quiero uno así para mi negocio →
            </a>
          </Reveal>
        </div>

        {/* Teléfono con el bot vivo */}
        <Reveal delay={0.1} className="flex justify-center">
          <div className="ring-pulse w-full max-w-[370px] rounded-[2.4rem] border border-line bg-white p-3 shadow-2xl shadow-slate-300/70">
            <div className="overflow-hidden rounded-[1.9rem] border border-line">
              {/* Header WhatsApp */}
              <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg">
                  💇
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#075e54] bg-green-400" />
                </div>
                <div className="leading-tight">
                  <b className="block text-[15px] text-white">Estética Luna</b>
                  <span className="text-xs text-green-200">{typing ? "escribiendo…" : "en línea"}</span>
                </div>
                <span className="ml-auto rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                  DEMO EN VIVO
                </span>
              </div>

              {/* Conversación */}
              <div ref={scrollRef} className="chat-wallpaper flex h-[350px] flex-col gap-2 overflow-y-auto p-3">
                {msgs.length === 0 && !typing && (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <motion.button
                      onClick={arrancar}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet px-7 py-3.5 font-semibold text-white shadow-xl shadow-violet-500/30"
                    >
                      ▶ Iniciar conversación
                    </motion.button>
                    <p className="text-xs text-ink-soft">Toca para ver al bot en acción</p>
                  </div>
                )}
                <AnimatePresence mode="popLayout">
                  {msgs.map((m, i) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: 14, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 320, damping: 24 }}
                      className={`w-fit max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-[13.5px] leading-snug shadow-sm ${
                        m.de === "bot"
                          ? "self-start rounded-bl-sm bg-white text-ink"
                          : "self-end rounded-br-sm bg-[#d9fdd3] text-ink"
                      }`}
                    >
                      {m.texto}
                    </motion.div>
                  ))}
                  {typing && <Typing key="typing" />}
                </AnimatePresence>
              </div>

              {/* Opciones de respuesta rápida */}
              <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-2 border-t border-line bg-white px-3 py-3">
                <AnimatePresence>
                  {opciones.map((o) =>
                    o.siguiente === "cta" ? (
                      <motion.a
                        key={o.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        href={waLink("Hola, probé el chatbot demo de su página y quiero uno para mi negocio 🤖")}
                        target="_blank"
                        rel="noopener"
                        className="rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet px-4 py-2 text-[13px] font-semibold text-white shadow-md"
                      >
                        {o.label}
                      </motion.a>
                    ) : (
                      <motion.button
                        key={o.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => irA(o.siguiente, o.label)}
                        className="rounded-full border border-brand-cyan/40 bg-cyan-50/60 px-4 py-2 text-[13px] font-semibold text-cyan-800 transition-colors hover:bg-cyan-100"
                      >
                        {o.label}
                      </motion.button>
                    )
                  )}
                </AnimatePresence>
                {!nodo && !typing && msgs.length > 0 && <span className="text-xs text-ink-soft">…</span>}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {interacciones >= 3 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-10 text-center text-sm font-medium text-ink-soft"
        >
          ¿Ya viste qué fácil? 👀 Imagínalo con los datos de <strong className="gradient-text">tu negocio</strong>.
        </motion.p>
      )}
    </section>
  );
}
