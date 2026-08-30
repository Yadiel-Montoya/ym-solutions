"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IconFlecha, IconWhatsApp } from "./Icons";
import { waLink } from "./ui";

/* ============================================================
   Capa cinemática: video full-bleed + tipografía en parallax.
   Cada línea viaja a velocidad distinta — el texto se "desfasa"
   sobre el video, como en los sitios de estudio de alto nivel.
   ============================================================ */

function Video({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const quieto = useReducedMotion();

  /* El atributo autoPlay no puede depender de useReducedMotion (difiere
     entre servidor y cliente y rompe la hidratación): se pausa por efecto. */
  useEffect(() => {
    if (quieto) ref.current?.pause();
  }, [quieto]);

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}

/* ---------- HERO CINEMÁTICO ---------- */
export function VideoHero() {
  const ref = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* Tres velocidades: el desfase */
  const y1 = useTransform(scrollYProgress, [0, 1], [0, quieto ? 0 : -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, quieto ? 0 : -140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, quieto ? 0 : -240]);
  const escala = useTransform(scrollYProgress, [0, 1], [1, quieto ? 1 : 1.12]);
  const velo = useTransform(scrollYProgress, [0, 0.85], [0, 0.55]);

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#05070d]">
      <motion.div style={{ scale: escala }} className="absolute inset-0">
        <Video src="/media/v-43527.mp4" />
      </motion.div>

      {/* Legibilidad: viñeta direccional, no una capa plana */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.55)_0%,rgba(5,7,13,0.15)_45%,rgba(5,7,13,0.78)_100%)]" />
      <motion.div aria-hidden style={{ opacity: velo }} className="absolute inset-0 bg-[#05070d]" />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-end px-6 pb-16 pt-36 sm:pb-20">
        <p className="tag rise !text-white/70" style={{ animationDelay: "150ms" }}>
          <span className="breathe mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-[#4ade80] align-middle" />
          Estudio de desarrollo · Naucalpan, MX
        </p>

        <h1 className="display mt-6 text-white">
          <motion.span style={{ y: y1 }} className="rise block text-[clamp(3rem,10vw,7.75rem)] leading-[0.94]" >
            Software
          </motion.span>
          <motion.span
            style={{ y: y2 }}
            className="rise block text-[clamp(3rem,10vw,7.75rem)] leading-[0.94] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)] sm:ml-[8vw]"
          >
            a la medida
          </motion.span>
          <motion.span style={{ y: y3 }} className="rise block text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium text-white/85 sm:ml-[16vw]">
            de tu negocio — no una plantilla.
          </motion.span>
        </h1>

        <motion.div style={{ y: y3 }} className="rise mt-10 flex flex-wrap items-center gap-5 sm:ml-[16vw]" >
          <a
            href={waLink("Hola, quiero platicar un proyecto")}
            target="_blank"
            rel="noopener"
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[#0f1a2e] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <IconWhatsApp size={17} />
            Platícame tu idea
            <IconFlecha size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="#demo" className="link-draw cursor-pointer text-[0.9375rem] font-medium text-white/85">
            Prueba el chatbot
          </a>
        </motion.div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-6">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["24 h", "y ya tienes respuesta"],
              ["1 sem", "y tu sitio está en línea"],
              ["1", "persona: la que construye"],
            ].map(([n, t]) => (
              <div key={t}>
                <dt className="display tabular text-[1.5rem] text-white">{n}</dt>
                <dd className="mt-0.5 text-[0.75rem] text-white/60">{t}</dd>
              </div>
            ))}
          </dl>
          <p className="tag hidden !text-white/50 sm:block">desliza ↓</p>
        </div>
      </div>
    </section>
  );
}

/* Una línea de la cita, con su propia velocidad de desfase */
function LineaParallax({
  children,
  progreso,
  indice,
  quieto,
}: {
  children: React.ReactNode;
  progreso: ReturnType<typeof useScroll>["scrollYProgress"];
  indice: number;
  quieto: boolean;
}) {
  const y = useTransform(progreso, [0, 1], [0, quieto ? 0 : -34 * (indice + 1)]);
  return (
    <motion.span
      style={{ y, marginLeft: `${indice * 6}vw` }}
      className="block text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.12]"
    >
      {children}
    </motion.span>
  );
}

/* ---------- BANDA DE VIDEO con texto desfasado ---------- */
export function BandaVideo({
  src,
  lineas,
  firma,
  cta,
}: {
  src: string;
  lineas: string[];
  firma?: string;
  cta?: { texto: string; wa: string };
}) {
  const ref = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  /* Arranca en 0 para que el HTML del servidor y del cliente coincidan */
  const yVideo = useTransform(scrollYProgress, [0, 1], [0, quieto ? 0 : 120]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#05070d] py-28 sm:py-40">
      <motion.div style={{ y: yVideo }} className="absolute -inset-y-32 inset-x-0">
        <Video src={src} />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[rgba(5,7,13,0.62)]" />

      <figure className="relative mx-auto max-w-[1180px] px-6">
        <blockquote className="display text-white">
          {lineas.map((l, i) => (
            <LineaParallax key={l} progreso={scrollYProgress} indice={i} quieto={!!quieto}>
              {l}
            </LineaParallax>
          ))}
        </blockquote>
        {firma && (
          <figcaption className="tag mt-8 !text-white/60" style={{ marginLeft: `${lineas.length * 6}vw` }}>
            {firma}
          </figcaption>
        )}
        {cta && (
          <div className="mt-10" style={{ marginLeft: `${lineas.length * 6}vw` }}>
            <a
              href={waLink(cta.wa)}
              target="_blank"
              rel="noopener"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[#0f1a2e] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <IconWhatsApp size={17} />
              {cta.texto}
              <IconFlecha size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </figure>
    </section>
  );
}
