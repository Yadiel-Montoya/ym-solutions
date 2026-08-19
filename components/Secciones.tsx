"use client";

import { Logo, Reveal, SectionHead, waLink } from "./ui";

/* ============ MARQUEE ============ */
const items = ["Páginas Web", "Chatbots WhatsApp", "Interfaces con ERP", "Automatización", "E-commerce", "Apps a la medida"];

export function Marquee() {
  const fila = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-cloud py-4" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-8">
        {fila.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-sm font-semibold tracking-wide text-ink-soft">
            {t} <i className="not-italic text-brand-cyan">◆</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============ SERVICIOS (BENTO) ============ */
const servicios = [
  {
    icon: "🌐",
    titulo: "Tu página web",
    texto: (
      <>
        Para que cuando alguien te busque en Google, te encuentre — y pueda escribirte, cotizar o
        agendar <strong className="text-ink">sin salir de WhatsApp</strong>. Se ve bien en celular, carga
        rápido y no necesitas saber nada de tecnología.
      </>
    ),
    tags: ["Diseño propio", "Se ve bien en celular", "Aparece en Google"],
    xl: true,
  },
  { icon: "💬", titulo: "Un WhatsApp que contesta solo", texto: "Responde las preguntas de siempre, agenda citas y toma pedidos a las 11 de la noche, cuando tú ya cerraste." },
  { icon: "🔗", titulo: "Conectar tu sistema", texto: "¿Ya tienes un ERP o un sistema? Lo enlazamos con tu web para que no captures lo mismo dos veces." },
  { icon: "⚙️", titulo: "Automatizar lo repetitivo", texto: "Ese reporte que haces cada lunes, esos datos que copias a mano, ese aviso que siempre se te olvida. Eso." },
  { icon: "🛒", titulo: "Vender en línea", texto: "Tu catálogo con carrito y pagos, y cada pedido confirmado por WhatsApp sin que tú muevas un dedo." },
];

export function Servicios() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHead
        kicker="Qué hacemos"
        title={
          <>
            Cinco formas de quitarle
            <br />
            trabajo manual a tu negocio
          </>
        }
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((s, i) => (
          <Reveal key={s.titulo} delay={i * 0.06} className={s.xl ? "sm:col-span-2 lg:row-span-2" : ""}>
            <article className="card-glow flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-violet-50 text-2xl">
                {s.icon}
              </div>
              <h3 className="font-display mb-2 text-xl font-bold text-ink">{s.titulo}</h3>
              <p className="text-[15px] leading-relaxed text-ink-soft">{s.texto}</p>
              {s.tags && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line bg-cloud px-3 py-1 text-xs font-medium text-ink-soft">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.3} className="sm:col-span-2">
          <article className="card-glow flex h-full flex-col rounded-3xl border border-line bg-gradient-to-br from-cloud to-white p-7 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-violet-50 text-2xl">🚀</div>
            <h3 className="font-display mb-2 text-xl font-bold text-ink">¿Y si lo tuyo no está en la lista?</h3>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Pasa seguido. Cuéntanos qué te quita tiempo o qué te gustaría que hiciera tu negocio, y te
              decimos con honestidad si se puede, cuánto cuesta y cuánto tarda. Si no es para nosotros,
              también te lo decimos.
            </p>
            <a
              href={waLink("Hola, tengo una idea que quiero platicarles")}
              target="_blank"
              rel="noopener"
              className="mt-4 w-fit font-semibold text-brand-violet transition-colors hover:text-brand-cyan"
            >
              Cuéntanos tu caso →
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ SECTORES ============ */
const sectores = [
  { icon: "🩺", titulo: "Consultorios y clínicas", texto: "El paciente escribe a las 9 pm, nadie contesta y se va con otro. Con agenda por WhatsApp, la cita queda hecha esa misma noche.", wa: "Hola, tengo un consultorio y quiero que mis pacientes agenden por WhatsApp" },
  { icon: "💈", titulo: "Barberías y estéticas", texto: "Citas sin llamadas ni libreta, recordatorio automático el día anterior y menos sillas vacías.", wa: "Hola, tengo una barbería/estética y me interesan las citas automáticas" },
  { icon: "🌮", titulo: "Restaurantes y fondas", texto: "El viernes a tope: los pedidos entran por WhatsApp, se confirman solos y llegan ordenados a cocina.", wa: "Hola, tengo un restaurante y quiero recibir pedidos por WhatsApp" },
  { icon: "⚖️", titulo: "Despachos y consultorías", texto: "En asuntos urgentes gana quien contesta primero. Que tu despacho responda y agende aunque estés en audiencia.", wa: "Hola, tengo un despacho y quiero automatizar mis consultas" },
  { icon: "🚛", titulo: "Transportes y fletes", texto: "Cotizar en un minuto en lugar de en dos horas. Porque el flete es de quien responde primero.", wa: "Hola, tengo una transportista y quiero cotizar automático por WhatsApp" },
  { icon: "🏪", titulo: "Comercios y tiendas", texto: "Catálogo en línea, pedidos por WhatsApp y pagos sin que tengas que estar pegado al teléfono.", wa: "Hola, tengo una tienda y quiero vender por WhatsApp" },
];

export function Sectores() {
  return (
    <section id="sectores" className="scroll-mt-20 border-y border-line bg-cloud py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          kicker="Para quién trabajamos"
          title="Negocios como el tuyo"
          sub="Cada giro pierde clientes de una forma distinta. Estos son los que mejor conocemos — y lo que suele resolverles el problema."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectores.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 0.05}>
              <article className="card-glow flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-sm">
                <span className="mb-3 text-3xl">{s.icon}</span>
                <h3 className="font-display mb-2 text-lg font-bold text-ink">{s.titulo}</h3>
                <p className="flex-1 text-[15px] leading-relaxed text-ink-soft">{s.texto}</p>
                <a
                  href={waLink(s.wa)}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 w-fit text-[15px] font-semibold text-brand-violet transition-colors hover:text-brand-cyan"
                >
                  Este soy yo →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-ink-soft">¿No ves tu giro? Tranquilo, casi siempre aplica igual.</p>
          <a
            href={waLink("Hola, tengo un negocio y quiero saber cómo me pueden ayudar")}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet px-7 py-3.5 font-semibold text-white shadow-xl shadow-violet-500/25 transition-transform hover:scale-[1.03]"
          >
            Preguntar por mi negocio
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ PROCESO ============ */
const pasos = [
  { tiempo: "☕ una plática de 20 min", titulo: "Nos cuentas", texto: "Por WhatsApp o por llamada, como te acomode. Nos platicas cómo funciona tu negocio y qué te está costando trabajo. A veces necesitas menos de lo que creías." },
  { tiempo: "📄 en 1 día o menos", titulo: "Te cotizamos", texto: "Te llega un PDF con lo que incluye, cuánto cuesta y cuánto tarda. Si algo no se entiende, preguntas y te lo explicamos." },
  { tiempo: "🔨 2 a 3 semanas", titulo: "Lo construimos", texto: "Vas viendo cómo va cada semana. Y sí, puedes pedir cambios — están incluidas dos rondas de ajustes." },
  { tiempo: "🤝 para siempre", titulo: "Lo lanzamos… y seguimos ahí", texto: "No desaparecemos al entregar. Si algo falla o quieres cambiar un precio, un horario o una foto, nos escribes y listo." },
];

export function Proceso() {
  return (
    <section id="proceso" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHead kicker="Cómo trabajamos" title="Cuatro pasos y ya" sub="Sin juntas eternas ni palabras raras. Así de simple." />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pasos.map((p, i) => (
          <Reveal key={p.titulo} delay={i * 0.08}>
            <li className="card-glow h-full rounded-3xl border border-line bg-white p-7 shadow-sm">
              <span className="font-display gradient-text text-4xl font-bold">0{i + 1}</span>
              <span className="mt-3 block w-fit rounded-full bg-cloud px-3 py-1 text-xs font-medium text-ink-soft">{p.tiempo}</span>
              <h3 className="font-display mt-3 mb-2 text-lg font-bold text-ink">{p.titulo}</h3>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p.texto}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ============ COMPROMISOS ============ */
const promesas = [
  { icon: "⚡", titulo: "Te contestamos rápido", texto: "Escribes hoy, tienes respuesta antes de mañana. Nada de dejarte en visto." },
  { icon: "🗣️", titulo: "Te hablamos claro", texto: "Nada de “APIs”, “endpoints” ni palabras que solo entendemos nosotros." },
  { icon: "📄", titulo: "El precio es el precio", texto: "Lo que dice la cotización es lo que pagas. Punto." },
  { icon: "🤝", titulo: "Hablas con quien lo hace", texto: "Aquí no hay vendedor de por medio: tratas directo con quien construye tu proyecto." },
];

export function Compromisos() {
  return (
    <section className="border-y border-line bg-cloud py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead kicker="Nuestra palabra" title="Lo que sí te podemos prometer" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promesas.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 0.08}>
              <div className="card-glow h-full rounded-3xl border border-line bg-white p-7 text-center shadow-sm">
                <i className="mb-3 block text-3xl not-italic">{p.icon}</i>
                <h3 className="font-display mb-2 text-lg font-bold text-ink">{p.titulo}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{p.texto}</p>
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
    <section className="mx-auto max-w-3xl px-5 py-24">
      <Reveal>
        <figure className="relative rounded-3xl border border-line bg-gradient-to-br from-white to-cloud p-9 shadow-sm sm:p-12">
          <div className="gradient-text font-display absolute -top-2 left-8 text-7xl font-bold" aria-hidden>
            “
          </div>
          <blockquote className="pt-6 text-lg leading-relaxed text-ink">
            Empecé YM Solutions porque veía negocios buenísimos — el taller que sí resuelve, el
            consultorio donde sí te explican — perdiendo clientes nada más por no estar bien en
            internet. No me parece justo que la tecnología sea un lujo. Así que la hacemos simple, a
            la medida y sin cobrarte de más. Escríbeme, y sí:{" "}
            <strong>el que contesta soy yo.</strong>
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-4">
            <Logo size={40} />
            <div className="leading-tight">
              <strong className="block text-ink">Yadiel Montoya</strong>
              <span className="text-sm text-ink-soft">Fundador de YM Solutions</span>
            </div>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ============ FAQ ============ */
const faqs = [
  { q: "¿Cuánto me va a costar?", a: "Depende de lo que necesites: no es lo mismo una página para que te encuentren que una tienda en línea completa. Por eso la primera plática no cuesta nada — nos cuentas qué buscas y te decimos el precio exacto por escrito. Si te parece caro, nos lo dices y vemos qué sí entra en tu presupuesto." },
  { q: "¿Cuánto se tarda?", a: "Una página normalmente entre 2 y 3 semanas. Si es algo más grande —una tienda, conectar tu sistema— te decimos la fecha desde el principio, antes de que pagues nada." },
  { q: "No le entiendo nada a la tecnología 😅", a: "Perfecto, para eso estamos. De lo técnico nos encargamos nosotros (el dominio, el hosting, los correos, publicarla). Tú solo cuéntanos de tu negocio, que de eso sabes más que nadie." },
  { q: "¿Y luego me dejan solo?", a: "No. Tenemos un plan mensual accesible que cubre el hosting, el dominio, los cambios normales (cambiar precios, fotos, horarios) y soporte por WhatsApp. Si prefieres no contratarlo, también está bien: la página es tuya." },
  { q: "Estoy fuera de México, ¿me pueden atender?", a: "Sí. Trabajamos a distancia con clientes en Estados Unidos y otros países. Todo se lleva por WhatsApp y videollamada, igual de cerca que si estuviéramos a la vuelta." },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 pb-24">
      <SectionHead kicker="Preguntas frecuentes" title="Lo que todos nos preguntan" />
      <Reveal className="mt-10">
        <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
          {faqs.map((f) => (
            <details key={f.q} className="group px-7 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-xl text-brand-violet transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
