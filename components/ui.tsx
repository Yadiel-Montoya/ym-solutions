"use client";

import { motion } from "framer-motion";

export const WA = "https://wa.me/5215565595788";
export const waLink = (texto: string) => `${WA}?text=${encodeURIComponent(texto)}`;

/* Entrada al hacer scroll: sutil, desde un estado ya legible */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Encabezado de sección: el título carga solo, sin etiqueta encima */
export function Titulo({
  children,
  nota,
  className = "",
}: {
  children: React.ReactNode;
  nota?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
        <h2 className="display max-w-[15ch] text-[clamp(2.25rem,5.2vw,4rem)] text-ink">
          {children}
        </h2>
        {nota && <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-3">{nota}</p>}
      </div>
    </Reveal>
  );
}
