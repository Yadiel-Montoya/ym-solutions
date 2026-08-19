"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, useMotionValue, useScroll, useSpring } from "framer-motion";

/* ============ Barra de progreso de scroll ============ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-cyan"
      aria-hidden
    />
  );
}

/* ============ Halo de luz que sigue el cursor ============ */
export function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 140, damping: 22 });
  const sy = useSpring(y, { stiffness: 140, damping: 22 });
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setActivo(true);
      x.set(e.clientX - 260);
      y.set(e.clientY - 260);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className={`pointer-events-none fixed left-0 top-0 z-[5] h-[520px] w-[520px] rounded-full transition-opacity duration-500 ${
        activo ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.10)_0%,rgba(124,58,237,0.07)_38%,transparent_68%)]" />
    </motion.div>
  );
}

/* ============ Botón magnético ============ */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ============ Tarjeta 3D con luz que sigue el cursor ============ */
export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`spot-card tilt ${className}`}
      onMouseMove={(e) => {
        const el = ref.current!;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 7}deg) translateY(-3px)`;
      }}
      onMouseLeave={() => {
        ref.current!.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

/* ============ Título que se revela palabra por palabra ============ */
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055 } } }}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.21, 0.6, 0.35, 1] } },
            }}
          >
            {w}
          </motion.span>
          {i < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

/* ============ Contador animado ============ */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ============ Máquina de escribir ============ */
export function Typewriter({ palabras }: { palabras: string[] }) {
  const [texto, setTexto] = useState("");
  const [i, setI] = useState(0);
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const actual = palabras[i % palabras.length];
    let t: ReturnType<typeof setTimeout>;

    if (!borrando && texto.length < actual.length) {
      t = setTimeout(() => setTexto(actual.slice(0, texto.length + 1)), 75);
    } else if (!borrando && texto.length === actual.length) {
      t = setTimeout(() => setBorrando(true), 1700);
    } else if (borrando && texto.length > 0) {
      t = setTimeout(() => setTexto(texto.slice(0, -1)), 38);
    } else {
      t = setTimeout(() => {
        setBorrando(false);
        setI((v) => v + 1);
      }, 220);
    }
    return () => clearTimeout(t);
  }, [texto, borrando, i, palabras]);

  return (
    <span className="inline-block border-b-4 border-brand-violet/40">
      {texto}
      <span className="caret gradient-text font-normal">|</span>
    </span>
  );
}
