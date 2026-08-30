"use client";

import { Reveal, Titulo, waLink } from "./ui";
import {
  IconSitio, IconChat, IconEnlace, IconEngranes, IconCarrito, IconChispa,
  IconPulso, IconTijera, IconPlato, IconBalanza, IconCamion, IconTienda,
  IconFlecha, IconMas, Marca,
} from "./Icons";

/* ============ MARQUESINA ============ */
const capacidades = [
  "Páginas web", "Chatbots de WhatsApp", "Interfaces con ERP",
  "Automatización", "Tiendas en línea", "Apps a la medida",
];

export function Marquee() {
  const fila = [...capacidades, ...capacidades];
  return (
    <div className="marquee-zone overflow-hidden border-y border-rule bg-sunk py-3.5" aria-hidden>
      <div className="animate-marquee flex w-max items-center">
        {fila.map((t, i) => (
          <span key={i} className="tag flex items-center whitespace-nowrap text-ink-2">
            {t}
            <span className="mx-7 h-3 w-px bg-rule-strong" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============ SERVICIOS — hoja de especificaciones ============ */
const servicios = [
  {
    Icono: IconSitio,
    nombre: "Página web",
    linea: "Para que te encuentren y te escriban sin salir de WhatsApp.",
    detalle: "Diseño propio · Rápida en celular · Aparece en Google",
    wa: "Hola, quiero una página web para mi negocio",
  },
  {
    Icono: IconChat,
    nombre: "WhatsApp que contesta solo",
    linea: "Responde lo de siempre, agenda citas y toma pedidos a las 11 de la noche.",
    detalle: "Respuestas a tu giro · Agenda · Recordatorios",
    wa: "Hola, quiero un chatbot de WhatsApp",
  },
  {
    Icono: IconEnlace,
    nombre: "Interfaz con tu ERP",
    linea: "Si ya tienes un sistema, lo enlazo con tu web para no capturar dos veces.",
    detalle: "SAP · Sistemas propios · APIs",
    wa: "Hola, quiero conectar mi sistema con mi página",
  },
  {
    Icono: IconEngranes,
    nombre: "Automatización",
    linea: "El reporte de cada lunes, los datos que copias a mano, el aviso que se te olvida.",
    detalle: "Reportes · Correos · Cargas de datos",
    wa: "Hola, quiero automatizar tareas de mi negocio",
  },
  {
    Icono: IconCarrito,
    nombre: "Tienda en línea",
    linea: "Catálogo con carrito y pagos, y cada pedido confirmado por WhatsApp.",
    detalle: "Mercado Pago · Stripe · Panel propio",
    wa: "Hola, quiero vender en línea",
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="mx-auto max-w-[1180px] scroll-mt-24 px-6 py-24 sm:py-32">
      <Titulo nota="Cinco formas de quitarle trabajo manual a tu negocio. Si lo tuyo no está aquí, pregúntame: casi siempre se puede.">
        Qué construyo
      </Titulo>

      <div className="mt-14 border-t border-rule">
        {servicios.map((s, i) => (
          <Reveal key={s.nombre} delay={i * 0.05}>
            <a
              href={waLink(s.wa)}
              target="_blank"
              rel="noopener"
              className="spec-row group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-b border-rule px-3 py-7 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-8 sm:px-5"
            >
              <span className="spec-index tag tabular pt-1.5 text-ink-3 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className="flex items-center gap-3">
                  <s.Icono size={21} className="shrink-0 text-accent" />
                  <span className="display text-[1.75rem] leading-none text-ink sm:text-[2.125rem]">
                    {s.nombre}
                  </span>
                </span>
                <span className="mt-2.5 block max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-2">
                  {s.linea}
                </span>
                <span className="tag mt-2.5 block text-ink-3">{s.detalle}</span>
              </span>

              <IconFlecha size={22} className="spec-arrow col-start-2 text-accent sm:col-start-3 sm:self-center" />
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <a
          href={waLink("Hola, tengo una idea que quiero platicarte")}
          target="_blank"
          rel="noopener"
          className="spec-row group flex items-center gap-5 px-3 py-7 sm:px-5"
        >
          <IconChispa size={21} className="shrink-0 text-signal" />
          <span className="min-w-0 flex-1">
            <span className="display text-[1.5rem] leading-tight text-ink sm:text-[1.875rem]">
              ¿Y si lo tuyo no está en la lista?
            </span>
            <span className="mt-1.5 block max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-2">
              Pasa seguido. Cuéntame qué te quita tiempo y te digo con honestidad si se
              puede, cuánto cuesta y cuánto tarda. Si no es para mí, también te lo digo.
            </span>
          </span>
          <IconFlecha size={22} className="spec-arrow hidden text-signal sm:block" />
        </a>
      </Reveal>
    </section>
  );
}

/* ============ SECTORES ============ */
const sectores = [
  { Icono: IconPulso, nombre: "Consultorios", dolor: "El paciente escribe a las 9 pm, nadie contesta y se va con otro.", arreglo: "Agenda por WhatsApp: la cita queda hecha esa misma noche.", wa: "Hola, tengo un consultorio y quiero que mis pacientes agenden por WhatsApp" },
  { Icono: IconTijera, nombre: "Barberías y estéticas", dolor: "Llamadas a media hora pico y una libreta que se pierde.", arreglo: "Citas solas, recordatorio el día anterior, menos sillas vacías.", wa: "Hola, tengo una barbería y me interesan las citas automáticas" },
  { Icono: IconPlato, nombre: "Restaurantes", dolor: "Viernes a tope: el teléfono no para y los pedidos se enciman.", arreglo: "Pedidos por WhatsApp, confirmados solos y ordenados a cocina.", wa: "Hola, tengo un restaurante y quiero recibir pedidos por WhatsApp" },
  { Icono: IconBalanza, nombre: "Despachos", dolor: "En asuntos urgentes gana quien contesta primero.", arreglo: "Tu despacho responde y agenda aunque estés en audiencia.", wa: "Hola, tengo un despacho y quiero automatizar mis consultas" },
  { Icono: IconCamion, nombre: "Transportes", dolor: "Cotizar un flete te lleva dos horas de ida y vuelta.", arreglo: "Cotización en un minuto. El flete es de quien responde primero.", wa: "Hola, tengo una transportista y quiero cotizar automático" },
  { Icono: IconTienda, nombre: "Comercios", dolor: "Vives pegado al teléfono mandando fotos y precios.", arreglo: "Catálogo en línea, pedidos por WhatsApp y pagos sin ti.", wa: "Hola, tengo una tienda y quiero vender por WhatsApp" },
];

export function Sectores() {
  return (
    <section id="sectores" className="relative scroll-mt-24 overflow-hidden border-y border-rule bg-sunk/60 py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <Titulo nota="Cada giro pierde clientes de una forma distinta. Estos son los que mejor conozco.">
          Con quién trabajo
        </Titulo>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectores.map((s, i) => (
            <Reveal key={s.nombre} delay={i * 0.04}>
              <div className="glass card-glass flex h-full flex-col gap-4 rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <s.Icono size={20} className="text-accent" />
                  <h3 className="display text-[1.5rem] leading-none text-ink">{s.nombre}</h3>
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-ink-3">{s.dolor}</p>
                <div className="rule-tick" />
                <p className="text-[0.9375rem] leading-relaxed text-ink">{s.arreglo}</p>
                <a
                  href={waLink(s.wa)}
                  target="_blank"
                  rel="noopener"
                  className="link-draw mt-auto w-fit pt-2 text-[0.875rem] font-medium text-accent"
                >
                  Este soy yo
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="text-[0.9375rem] text-ink-2">¿No ves tu giro? Casi siempre aplica igual.</p>
          <a
            href={waLink("Hola, tengo un negocio y quiero saber cómo me puedes ayudar")}
            target="_blank"
            rel="noopener"
            className="group inline-flex cursor-pointer items-center gap-2 text-[0.9375rem] font-semibold text-accent"
          >
            <span className="link-draw">Pregúntame por el tuyo</span>
            <IconFlecha size={17} className="text-accent transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ PROCESO — línea de tiempo real ============ */
const pasos = [
  { t: "Nos sentamos 20 minutos", d: "Por WhatsApp o llamada, como te acomode. Me cuentas cómo funciona tu negocio y qué te cuesta trabajo. A veces necesitas menos de lo que creías.", plazo: "día 0" },
  { t: "Te cotizo por escrito", d: "Un PDF con lo que incluye, cuánto cuesta y cuándo está. Si algo no se entiende, preguntas y te lo explico sin palabras raras.", plazo: "día 1" },
  { t: "Lo construyo y lo ves crecer", d: "Te mando un enlace privado para que lo pruebes desde tu celular antes de pagar el resto. Dos rondas de ajustes incluidas.", plazo: "días 2–6" },
  { t: "Lo publico y sigo aquí", d: "Dominio, hosting y certificado incluidos el primer año. Si algo falla o quieres cambiar un precio, me escribes y ya.", plazo: "día 7" },
];

export function Proceso() {
  return (
    <section id="proceso" className="mx-auto max-w-[1180px] scroll-mt-24 px-6 py-24 sm:py-32">
      <Titulo nota="Sin juntas eternas ni palabras raras. Una semana, de la idea al sitio en línea.">
        Cómo trabajo
      </Titulo>

      <ol className="mt-14 grid gap-5 md:grid-cols-2">
        {pasos.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.06}>
            <li className="glass card-glass flex h-full flex-col gap-3 rounded-2xl p-8">
              <span className="tag tabular text-accent">{p.plazo}</span>
              <h3 className="display text-[1.75rem] leading-tight text-ink">{p.t}</h3>
              <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-2">{p.d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ============ COMPROMISOS ============ */
const promesas = [
  ["Te contesto rápido", "Escribes hoy, tienes respuesta antes de mañana. Nada de dejarte en visto."],
  ["Te hablo claro", "Nada de “endpoints” ni “APIs”. Si necesitas un glosario, lo estoy haciendo mal."],
  ["El precio es el precio", "Lo que dice la cotización es lo que pagas. Punto."],
  ["Hablas con quien lo hace", "Aquí no hay vendedor de por medio: tratas directo con quien construye."],
];

export function Compromisos() {
  return (
    <section className="border-y border-rule bg-sunk py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <Titulo>Lo que sí te puedo prometer</Titulo>
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {promesas.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="flex gap-5">
                <span aria-hidden className="mt-2.5 h-px w-9 shrink-0 bg-accent" />
                <div>
                  <h3 className="display text-[1.625rem] leading-tight text-ink">{t}</h3>
                  <p className="mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-2">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ NOTA DEL FUNDADOR ============ */
export function Fundador() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-24 sm:py-32">
      <Reveal>
        <figure className="mx-auto max-w-[62ch]">
          <blockquote className="display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.18] text-ink">
            Empecé YM Solutions porque veía negocios buenísimos —el taller que sí resuelve, el
            consultorio donde sí te explican— perdiendo clientes nada más por no estar bien en
            internet. No me parece justo que la tecnología sea un lujo. Así que la hago simple,
            a la medida y sin cobrarte de más. <em>Escríbeme, y sí: el que contesta soy yo.</em>
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4">
            <Marca size={26} className="text-accent" />
            <div className="flex flex-col">
              <span className="text-[0.9375rem] font-medium text-ink">Yadiel Montoya</span>
              <span className="tag mt-0.5">Fundador · YM Solutions</span>
            </div>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ============ FAQ ============ */
const faqs = [
  ["¿Cuánto me va a costar?", "Depende de lo que necesites: no es lo mismo una página para que te encuentren que una tienda en línea completa. La primera plática no cuesta nada — me cuentas qué buscas y te doy el precio exacto por escrito. Si te parece caro, me lo dices y vemos qué sí entra en tu presupuesto."],
  ["¿Cuánto se tarda?", "Una página normalmente una semana, contada desde que me pasas tus textos y fotos. Si es algo más grande —una tienda, conectar tu sistema— te doy la fecha desde el principio, antes de que pagues nada."],
  ["No le entiendo nada a la tecnología", "Perfecto, para eso estoy. De lo técnico me encargo yo: el dominio, el hosting, los correos, publicarla. Tú cuéntame de tu negocio, que de eso sabes más que nadie."],
  ["¿Y luego me dejas solo?", "No. El primer año de dominio y hosting va incluido. Después hay un plan mensual opcional para cambios continuos y soporte — y si no lo contratas, no pasa nada: la página es tuya y sigue funcionando."],
  ["Estoy fuera de México, ¿me puedes atender?", "Sí. Trabajo a distancia con clientes en Estados Unidos y otros países. Todo por WhatsApp y videollamada, igual de cerca que si estuviera a la vuelta."],
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[1180px] scroll-mt-24 px-6 pb-24 sm:pb-32">
      <Titulo>Lo que todos me preguntan</Titulo>
      <div className="mt-14 border-t border-rule">
        {faqs.map(([q, a], i) => (
          <Reveal key={q} delay={i * 0.04}>
            <details className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="display text-[1.375rem] leading-tight text-ink sm:text-[1.625rem]">
                  {q}
                </span>
                <IconMas
                  size={20}
                  className="shrink-0 text-accent transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[64ch] pb-7 text-[0.9375rem] leading-relaxed text-ink-2">{a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
