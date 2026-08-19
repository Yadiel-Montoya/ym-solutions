"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { waLink } from "./ui";
import { Counter, Magnetic, Typewriter } from "./Efectos";

const palabras = ["negocio", "consultorio", "restaurante", "tienda", "taller", "gimnasio"];

/* ---------- Conversación de WhatsApp que se escribe sola, en loop ---------- */
type Paso =
  | { t: "in"; texto: string }
  | { t: "out"; texto: string }
  | { t: "typing" }
  | { t: "badge"; texto: string };

const guion: Paso[] = [
  { t: "in", texto: "Hola, ¿tienen lugar mañana? 💇" },
  { t: "typing" },
  { t: "out", texto: "¡Claro! Tengo 11:00, 1:30 o 5:00 ✨" },
  { t: "in", texto: "La de 11 porfa 🙌" },
  { t: "typing" },
  { t: "out", texto: "✅ Listo, cita confirmada. ¡Te esperamos!" },
  { t: "badge", texto: "⚡ Agendado en automático · 11:47 PM" },
];

const tiempos: Record<Paso["t"], number> = { in: 1500, typing: 1300, out: 1700, badge: 3200 };

function ChatVivo() {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= guion.length) {
      const t = setTimeout(() => setN(0), 3600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN(n + 1), tiempos[guion[n].t]);
    return () => clearTimeout(t);
  }, [n]);

  const visibles = guion.slice(0, n + 1).filter((p, i) => !(p.t === "typing" && i < n));

  return (
    <div className="animate-float-b w-[300px] rounded-3xl border border-line bg-white p-4 shadow-2xl shadow-slate-300/60">
      <div className="mb-3 flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-violet-100 text-lg">
          💇
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-brand-wa" />
        </div>
        <div className="leading-tight">
          <b className="block text-sm text-ink">Estética Luna</b>
          <span className="text-xs text-brand-wa">respondiendo en automático</span>
        </div>
      </div>

      <div className="chat-wallpaper flex min-h-[240px] flex-col justify-end gap-2 rounded-2xl p-3">
        <AnimatePresence mode="popLayout">
          {visibles.map((p, i) =>
            p.t === "typing" ? (
              <motion.div
                key={`ty-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex w-fit items-end gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm"
              >
                <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
                <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
                <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
              </motion.div>
            ) : p.t === "badge" ? (
              <motion.div
                key={`b-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto mt-1 rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet px-4 py-1.5 text-[11.5px] font-semibold text-white shadow-md"
              >
                {p.texto}
              </motion.div>
            ) : (
              <motion.div
                key={`m-${i}`}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className={`w-fit max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm ${
                  p.t === "in"
                    ? "self-start rounded-bl-sm bg-white text-ink"
                    : "self-end rounded-br-sm bg-[#d9fdd3] text-ink"
                }`}
              >
                {p.texto}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Código que se "despliega" línea por línea ---------- */
const lineasCode = [
  <span key={0}>
    <span className="text-violet-600">const</span> <span className="text-ink">tuNegocio</span> ={" "}
    <span className="text-violet-600">await</span> <span className="text-cyan-700">ym</span>.
    <span className="text-cyan-700">construir</span>({"{"}
  </span>,
  <span key={1}>
    {"  "}web: <span className="text-emerald-600">&apos;moderna y rápida&apos;</span>,
  </span>,
  <span key={2}>
    {"  "}whatsapp: <span className="text-amber-600">true</span>,
  </span>,
  <span key={3}>
    {"  "}erp: <span className="text-emerald-600">&apos;conectado&apos;</span>,
  </span>,
  <span key={4}>
    {"  "}ventas: <span className="text-emerald-600">&apos;en automático&apos;</span>{" "}
    <span className="text-slate-400">{"// 24/7"}</span>
  </span>,
  <span key={5}>{"});"}</span>,
  <span key={6} className="text-brand-wa">
    ✓ Desplegado — tu negocio ya vende solo
  </span>,
];

function CodeVivo() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setN((v) => (v >= lineasCode.length ? 0 : v + 1)), n >= lineasCode.length ? 3800 : 520);
    return () => clearTimeout(t);
  }, [n]);

  return (
    <div className="animate-float-a rounded-2xl border border-line bg-white p-1.5 shadow-2xl shadow-slate-300/60">
      <div className="flex items-center gap-1.5 rounded-t-xl bg-cloud px-4 py-2.5">
        <i className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <i className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <i className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-xs font-medium text-ink-soft">ym-solutions.dev</span>
      </div>
      <div className="min-h-[196px] rounded-b-xl bg-white px-5 py-4 font-mono text-[13.5px] leading-relaxed">
        {lineasCode.slice(0, n).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
            {l}
          </motion.div>
        ))}
        <span className="caret inline-block h-4 w-[7px] translate-y-0.5 bg-brand-violet/70" />
      </div>
    </div>
  );
}

/* ============ HERO ============ */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.6, 0.35, 1] as const } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <motion.div aria-hidden style={{ y: yBlob }} className="absolute inset-0 bg-gradient-to-b from-cloud via-white to-white">
        <div className="blob mesh-a left-[-10%] top-[-15%] h-[460px] w-[460px] bg-cyan-200/70" />
        <div className="blob mesh-b right-[-8%] top-[5%] h-[420px] w-[420px] bg-violet-200/70" />
        <div className="blob mesh-c bottom-[-30%] left-[35%] h-[380px] w-[380px] bg-emerald-100/80" />
        <div className="grid-soft absolute inset-0" />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-4 py-2 text-[13px] font-medium text-ink-soft shadow-sm backdrop-blur"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-brand-wa" />
            Desarrollo de software · Naucalpan, México
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-[3.4rem]"
          >
            Software <span className="gradient-text">a la medida</span>
            <br />
            de tu <Typewriter palabras={palabras} />
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Tus clientes ya te buscan en internet. Nosotros nos encargamos de que te encuentren,
            te escriban por WhatsApp y agenden solos —{" "}
            <strong className="text-ink">mientras tú te dedicas a lo tuyo.</strong>
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={waLink("Hola, quiero cotizar un proyecto 🚀")}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet px-7 py-3.5 text-[15px] font-semibold text-white shadow-xl shadow-violet-500/25"
              >
                Platícanos tu idea
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-[15px] font-semibold text-ink shadow-sm transition-colors hover:border-slate-300 hover:bg-cloud"
              >
                🤖 Prueba el chatbot
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <li>
              <strong className="font-display block text-2xl font-bold text-ink">
                <Counter to={24} suffix=" h" />
              </strong>
              <span className="text-sm text-ink-soft">y ya tienes respuesta</span>
            </li>
            <li>
              <strong className="font-display block text-2xl font-bold text-ink">0</strong>
              <span className="text-sm text-ink-soft">letras chiquitas</span>
            </li>
            <li>
              <strong className="font-display block text-2xl font-bold text-ink">1</strong>
              <span className="text-sm text-ink-soft">persona que te contesta siempre</span>
            </li>
          </motion.ul>
        </motion.div>

        {/* Visual vivo: código desplegándose + chat que se contesta solo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ y: yVisual }}
          className="relative hidden select-none lg:block"
          aria-hidden
        >
          <CodeVivo />
          <div className="absolute -bottom-16 -left-10">
            <ChatVivo />
          </div>
          <div className="animate-float-a absolute -top-5 right-8 rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink shadow-lg">
            🔗 ERP sincronizado
          </div>
          <div className="animate-float-b absolute -right-4 top-[38%] rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink shadow-lg">
            ⚙️ Automatización activa
          </div>
        </motion.div>
      </div>
    </section>
  );
}
