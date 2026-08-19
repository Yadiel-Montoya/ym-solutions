"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { waLink } from "./ui";

const palabras = ["negocio", "consultorio", "restaurante", "tienda", "taller", "gimnasio"];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % palabras.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block align-baseline">
      <motion.span
        key={palabras[i]}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="inline-block border-b-4 border-brand-violet/40"
      >
        {palabras[i]}
      </motion.span>
    </span>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.6, 0.35, 1] as const } },
};

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Fondo claro con blobs de color */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-cloud via-white to-white">
        <div className="blob left-[-10%] top-[-15%] h-[420px] w-[420px] bg-cyan-200/70" />
        <div className="blob right-[-8%] top-[5%] h-[380px] w-[380px] bg-violet-200/70" />
        <div className="blob bottom-[-30%] left-[35%] h-[360px] w-[360px] bg-emerald-100/80" />
        <div className="grid-soft absolute inset-0" />
      </div>

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
            de tu <Rotator />
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Tus clientes ya te buscan en internet. Nosotros nos encargamos de que te encuentren,
            te escriban por WhatsApp y agenden solos —{" "}
            <strong className="text-ink">mientras tú te dedicas a lo tuyo.</strong>
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={waLink("Hola, quiero cotizar un proyecto 🚀")}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet px-7 py-3.5 text-[15px] font-semibold text-white shadow-xl shadow-violet-500/25 transition-transform hover:scale-[1.03]"
            >
              Platícanos tu idea
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center rounded-full border border-line bg-white px-7 py-3.5 text-[15px] font-semibold text-ink shadow-sm transition-colors hover:border-slate-300 hover:bg-cloud"
            >
              Ver qué hacemos
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["24 h", "y ya tienes respuesta"],
              ["0", "letras chiquitas"],
              ["1", "persona que te contesta siempre"],
            ].map(([n, t]) => (
              <li key={t}>
                <strong className="font-display block text-2xl font-bold text-ink">{n}</strong>
                <span className="text-sm text-ink-soft">{t}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual: tarjeta de código + WhatsApp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative hidden select-none lg:block"
          aria-hidden
        >
          <div className="animate-float-a rounded-2xl border border-line bg-white p-1.5 shadow-2xl shadow-slate-300/60">
            <div className="flex items-center gap-1.5 rounded-t-xl bg-cloud px-4 py-2.5">
              <i className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <i className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <i className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-medium text-ink-soft">ym-solutions.dev</span>
            </div>
            <pre className="overflow-x-auto rounded-b-xl bg-white px-5 py-4 font-mono text-[13.5px] leading-relaxed">
              <code>
                <span className="text-violet-600">const</span>{" "}
                <span className="text-ink">tuNegocio</span> ={" "}
                <span className="text-violet-600">await</span>{" "}
                <span className="text-cyan-700">ym</span>.
                <span className="text-cyan-700">construir</span>({"{"}
                {"\n"}  web: <span className="text-emerald-600">&apos;moderna y rápida&apos;</span>,
                {"\n"}  whatsapp: <span className="text-amber-600">true</span>,
                {"\n"}  erp: <span className="text-emerald-600">&apos;conectado&apos;</span>,
                {"\n"}  ventas: <span className="text-emerald-600">&apos;en automático&apos;</span>{" "}
                <span className="text-slate-400">{"// 24/7"}</span>
                {"\n"}
                {"}"});
              </code>
            </pre>
          </div>

          <div className="animate-float-b absolute -bottom-10 -left-8 w-72 rounded-2xl border border-line bg-white p-4 shadow-2xl shadow-slate-300/60">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-violet-100 text-lg">
                🛍️
              </div>
              <div className="leading-tight">
                <b className="block text-sm text-ink">Tu página web</b>
                <span className="text-xs text-brand-wa">en línea</span>
              </div>
            </div>
            <div className="mb-2 w-fit rounded-xl rounded-tl-sm bg-cloud px-3.5 py-2 text-[13px] text-ink">
              ¡Nuevo pedido recibido! 🎉
              <br />
              <small className="text-ink-soft">Ana · 2 artículos · $850</small>
            </div>
            <div className="ml-auto w-fit rounded-xl rounded-tr-sm bg-green-100 px-3.5 py-2 text-[13px] text-green-900">
              Confirmado ✓ Se entrega hoy
            </div>
          </div>

          <div className="animate-float-b absolute -right-3 top-[46%] rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink shadow-lg">
            ⚙️ Automatización activa
          </div>
          <div className="animate-float-a absolute -top-5 right-10 rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink shadow-lg">
            🔗 ERP sincronizado
          </div>
        </motion.div>
      </div>
    </section>
  );
}
