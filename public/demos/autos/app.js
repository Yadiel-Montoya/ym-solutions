/* ============ AUTONOVA — lógica de la demo (v2) ============ */

const WA = 'https://wa.me/5215565595788';
const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US');
const TASA_ANUAL = 0.139;

/* ---------- Inventario ---------- */
const inventario = [
  { id: 1, nombre: 'Mustang GT', marca: 'Ford', anio: 2018, tipo: 'deportivo', precio: 549900, km: 42000, motor: 'V8 5.0L', trans: 'Manual', comb: 'Gasolina', foto: 'img/deportivo-rojo.jpg', badge: 'Destacado', destacado: 1,
    extras: ['Escape deportivo de fábrica', 'Rines 19" originales', 'Servicios en agencia', 'Un solo dueño'] },
  { id: 2, nombre: 'M4 Competition', marca: 'BMW', anio: 2021, tipo: 'deportivo', precio: 1290000, km: 28000, motor: '3.0L Biturbo', trans: 'Automática', comb: 'Gasolina', foto: 'img/bmw.jpg', badge: 'Premium', destacado: 2,
    extras: ['510 hp', 'Asientos M de piel', 'Head-up display', 'Garantía extendida disponible'] },
  { id: 3, nombre: 'Gladiator Mojave', marca: 'Jeep', anio: 2021, tipo: 'pickup', precio: 899000, km: 35500, motor: '3.6L V6', trans: 'Automática', comb: 'Gasolina', foto: 'img/jeep.jpg', badge: '4x4', destacado: 3,
    extras: ['Tracción 4x4 Rock-Trac', 'Suspensión Fox', 'Techo removible', 'Ganchos de arrastre'] },
  { id: 4, nombre: 'Macan', marca: 'Porsche', anio: 2019, tipo: 'suv', precio: 1090000, km: 46800, motor: '2.0L Turbo', trans: 'PDK', comb: 'Gasolina', foto: 'img/porsche.jpg', badge: 'Lujo', destacado: 4,
    extras: ['Paquete Sport Chrono', 'Interiores en piel', 'Quemacocos panorámico', 'Historial completo'] },
  { id: 5, nombre: 'Hilux Doble Cabina', marca: 'Toyota', anio: 2020, tipo: 'pickup', precio: 459900, km: 61000, motor: '2.4L Diésel', trans: 'Manual', comb: 'Diésel', foto: 'img/pickup.jpg', badge: 'Doble cabina', destacado: 5,
    extras: ['Capacidad de carga 1 ton', 'Batea con recubrimiento', 'Ideal para trabajo pesado', 'Sin adeudos'] },
  { id: 6, nombre: 'CX-30', marca: 'Mazda', anio: 2020, tipo: 'suv', precio: 359900, km: 38500, motor: '2.5L', trans: 'Automática', comb: 'Gasolina', foto: 'img/suv-negra.jpg', badge: 'Recién llegado', destacado: 6,
    extras: ['Pantalla táctil 8.8"', 'Cámara de reversa', 'Sensores de punto ciego', 'Bajo consumo'] },
  { id: 7, nombre: 'X-Trail', marca: 'Nissan', anio: 2019, tipo: 'suv', precio: 319900, km: 55200, motor: '2.5L', trans: 'CVT', comb: 'Gasolina', foto: 'img/suv-familiar.jpg', badge: '7 pasajeros', destacado: 7,
    extras: ['Tercera fila de asientos', 'Quemacocos', 'Ideal para familia grande', 'Servicios al día'] },
  { id: 8, nombre: 'Jetta Clásico', marca: 'Volkswagen', anio: 2015, tipo: 'sedan', precio: 169900, km: 78400, motor: '2.0L', trans: 'Manual', comb: 'Gasolina', foto: 'img/sedan-blanco.jpg', badge: 'Económico', destacado: 8,
    extras: ['El más rendidor del lote', 'Refacciones baratas', 'Único dueño', 'Perfecto primer auto'] },
];

function mensualidad(precio, enganchePct, meses) {
  const monto = precio * (1 - enganchePct);
  const r = TASA_ANUAL / 12;
  return (monto * r) / (1 - Math.pow(1 + r, -meses));
}

/* ---------- Estado ---------- */
let filtroTipo = 'todos';
let filtroMarca = '';
let filtroPrecio = 1400000;
let ordenActual = 'destacado';
const comparando = new Set();

const $ = (id) => document.getElementById(id);
const contAutos = $('autos');
const resultado = $('resultado');

/* ---------- Pintar inventario ---------- */
function visibles() {
  let lista = inventario.filter(
    (a) =>
      (filtroTipo === 'todos' || a.tipo === filtroTipo) &&
      (!filtroMarca || a.marca === filtroMarca) &&
      a.precio <= filtroPrecio
  );
  const ord = {
    destacado: (a, b) => a.destacado - b.destacado,
    'precio-asc': (a, b) => a.precio - b.precio,
    'precio-desc': (a, b) => b.precio - a.precio,
    km: (a, b) => a.km - b.km,
    anio: (a, b) => b.anio - a.anio,
  };
  return lista.sort(ord[ordenActual]);
}

function pintarAutos() {
  const lista = visibles();
  resultado.innerHTML = lista.length
    ? `<b>${lista.length}</b> ${lista.length === 1 ? 'unidad' : 'unidades'} encontradas`
    : 'No hay unidades con esos filtros. Prueba subir el presupuesto 👆';
  contAutos.innerHTML = '';
  lista.forEach((a, i) => {
    const el = document.createElement('article');
    el.className = 'auto';
    el.style.animationDelay = `${i * 0.07}s`;
    el.innerHTML = `
      <div class="auto__foto">
        <img src="${a.foto}" alt="${a.marca} ${a.nombre}" loading="lazy">
        <span class="auto__badge">${a.badge}</span>
        <span class="auto__mirando"><i></i>${2 + (a.id % 4)} personas viendo</span>
      </div>
      <div class="auto__cuerpo">
        <h3>${a.marca} ${a.nombre} ${a.anio}</h3>
        <div class="auto__specs">
          <span>📍 ${a.km.toLocaleString('en-US')} km</span><span>⚙️ ${a.motor}</span><span>🕹️ ${a.trans}</span>
        </div>
        <div class="auto__pie">
          <div class="auto__precio">${fmt(a.precio)}<small>o desde ${fmt(mensualidad(a.precio, 0.2, 48))}/mes</small></div>
          <a class="auto__wa" target="_blank" rel="noopener"
             href="${WA}?text=${encodeURIComponent(`Hola, me interesa el ${a.marca} ${a.nombre} ${a.anio} de ${fmt(a.precio)} 🚗 ¿Sigue disponible?`)}">Me interesa</a>
        </div>
        <div class="auto__acciones">
          <button class="auto__ver" data-ver="${a.id}">👁️ Ver detalle</button>
          <button class="auto__comp ${comparando.has(a.id) ? 'on' : ''}" data-comp="${a.id}">⚖️ Comparar</button>
        </div>
      </div>`;
    contAutos.appendChild(el);
  });
}

/* ---------- Filtros y orden ---------- */
$('filtros').addEventListener('click', (e) => {
  const btn = e.target.closest('.filtro');
  if (!btn) return;
  document.querySelectorAll('.filtro').forEach((f) => f.classList.remove('activo'));
  btn.classList.add('activo');
  filtroTipo = btn.dataset.tipo;
  pintarAutos();
});

$('orden').addEventListener('change', (e) => {
  ordenActual = e.target.value;
  pintarAutos();
});

/* ---------- Buscador del hero ---------- */
const marcas = [...new Set(inventario.map((a) => a.marca))].sort();
marcas.forEach((m) => {
  const op = document.createElement('option');
  op.value = m;
  op.textContent = m;
  $('bMarca').appendChild(op);
});

$('bPrecio').addEventListener('input', (e) => {
  $('bPrecioTxt').textContent = fmt(+e.target.value);
});

$('bBuscar').addEventListener('click', () => {
  filtroMarca = $('bMarca').value;
  filtroTipo = $('bTipo').value || 'todos';
  filtroPrecio = +$('bPrecio').value;
  document.querySelectorAll('.filtro').forEach((f) => f.classList.toggle('activo', f.dataset.tipo === filtroTipo));
  pintarAutos();
  $('inventario').scrollIntoView({ behavior: 'smooth' });
});

/* ---------- Modal de detalle ---------- */
const modal = $('modal');
const modalCuerpo = $('modalCuerpo');

function abrirModal(id) {
  const a = inventario.find((x) => x.id === id);
  modalCuerpo.innerHTML = `
    <img class="modal__foto" src="${a.foto}" alt="${a.marca} ${a.nombre}">
    <div class="modal__in">
      <h3>${a.marca} ${a.nombre} ${a.anio}</h3>
      <div class="modal__precio">${fmt(a.precio)}</div>
      <div class="ficha">
        <div><span>Kilometraje</span><b>${a.km.toLocaleString('en-US')} km</b></div>
        <div><span>Motor</span><b>${a.motor}</b></div>
        <div><span>Transmisión</span><b>${a.trans}</b></div>
        <div><span>Combustible</span><b>${a.comb}</b></div>
        <div><span>Mensualidad*</span><b>${fmt(mensualidad(a.precio, 0.2, 48))}</b></div>
        <div><span>Garantía</span><b>12 meses</b></div>
      </div>
      <ul class="modal__extras">${a.extras.map((x) => `<li>✓ ${x}</li>`).join('')}</ul>
      <div class="modal__cta">
        <a class="btn btn--rojo" target="_blank" rel="noopener"
           href="${WA}?text=${encodeURIComponent(`Hola, quiero apartar el ${a.marca} ${a.nombre} ${a.anio} (${fmt(a.precio)}) 🚗`)}">Apartar por WhatsApp</a>
        <a class="btn btn--ghost" target="_blank" rel="noopener"
           href="${WA}?text=${encodeURIComponent(`Hola, quiero agendar una prueba de manejo del ${a.marca} ${a.nombre} ${a.anio} 🔑`)}">Agendar prueba de manejo</a>
      </div>
      <p class="calc__nota">*Con 20% de enganche a 48 meses. Estimación informativa.</p>
    </div>`;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-cerrar')) cerrarModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) cerrarModal();
});

/* ---------- Comparador ---------- */
const compCont = $('comp');
const navComparar = $('navComparar');

function pintarComparador() {
  navComparar.hidden = comparando.size === 0;
  $('navComparaN').textContent = comparando.size;

  if (comparando.size < 2) {
    compCont.innerHTML = `<p class="comp__vacio">Selecciona al menos <b>2 unidades</b> en el inventario para compararlas aquí ⬆️${
      comparando.size === 1 ? '<br><small>Ya llevas 1 — elige otra 😉</small>' : ''
    }</p>`;
    return;
  }

  const autos = inventario.filter((a) => comparando.has(a.id));
  const minPrecio = Math.min(...autos.map((a) => a.precio));
  const minKm = Math.min(...autos.map((a) => a.km));
  const maxAnio = Math.max(...autos.map((a) => a.anio));
  const mens = autos.map((a) => mensualidad(a.precio, 0.2, 48));
  const minMens = Math.min(...mens);

  const filas = [
    ['Precio', autos.map((a) => [fmt(a.precio), a.precio === minPrecio])],
    ['Año', autos.map((a) => [a.anio, a.anio === maxAnio])],
    ['Kilometraje', autos.map((a) => [`${a.km.toLocaleString('en-US')} km`, a.km === minKm])],
    ['Motor', autos.map((a) => [a.motor, false])],
    ['Transmisión', autos.map((a) => [a.trans, false])],
    ['Mensualidad (20% / 48m)', autos.map((a) => [fmt(mensualidad(a.precio, 0.2, 48)), Math.abs(mensualidad(a.precio, 0.2, 48) - minMens) < 1])],
  ];

  compCont.innerHTML = `
    <table>
      <thead><tr><th></th>${autos
        .map(
          (a) => `<th>
            <img class="comp__foto" src="${a.foto}" alt="${a.nombre}">
            ${a.marca} ${a.nombre}<br>
            <button class="comp__quitar" data-quitar="${a.id}">quitar</button>
          </th>`
        )
        .join('')}</tr></thead>
      <tbody>
        ${filas
          .map(
            ([label, celdas]) =>
              `<tr><th>${label}</th>${celdas.map(([v, mejor]) => `<td class="${mejor ? 'mejor' : ''}">${v}</td>`).join('')}</tr>`
          )
          .join('')}
        <tr><th>Apartar</th>${autos
          .map(
            (a) =>
              `<td><a class="auto__wa" target="_blank" rel="noopener" href="${WA}?text=${encodeURIComponent(
                `Hola, comparé unidades en su página y me interesa el ${a.marca} ${a.nombre} ${a.anio} 🚗`
              )}">Me interesa</a></td>`
          )
          .join('')}</tr>
      </tbody>
    </table>`;
}

document.addEventListener('click', (e) => {
  const ver = e.target.closest('[data-ver]');
  if (ver) return abrirModal(+ver.dataset.ver);

  const comp = e.target.closest('[data-comp]');
  if (comp) {
    const id = +comp.dataset.comp;
    if (comparando.has(id)) comparando.delete(id);
    else if (comparando.size >= 3) {
      comp.textContent = 'Máximo 3 ⚖️';
      setTimeout(() => (comp.textContent = '⚖️ Comparar'), 1400);
      return;
    } else comparando.add(id);
    comp.classList.toggle('on', comparando.has(id));
    pintarComparador();
    return;
  }

  const quitar = e.target.closest('[data-quitar]');
  if (quitar) {
    comparando.delete(+quitar.dataset.quitar);
    pintarAutos();
    pintarComparador();
  }
});

navComparar.addEventListener('click', () => $('comparador').scrollIntoView({ behavior: 'smooth' }));

/* ---------- Calculadora ---------- */
const selAuto = $('calcAuto');
const slider = $('calcEnganche');
const plazos = $('plazos');
let plazoActual = 36;

inventario.forEach((a, i) => {
  const op = document.createElement('option');
  op.value = i;
  op.textContent = `${a.marca} ${a.nombre} ${a.anio} — ${fmt(a.precio)}`;
  selAuto.appendChild(op);
});

function calcular() {
  const auto = inventario[+selAuto.value];
  const pct = +slider.value / 100;
  const m = mensualidad(auto.precio, pct, plazoActual);
  const enganche = auto.precio * pct;
  const totalPagado = enganche + m * plazoActual;

  $('engancheTxt').textContent = `${slider.value}% (${fmt(enganche)})`;
  $('mensualidad').textContent = fmt(m);
  $('calcDetalle').textContent = `${auto.marca} ${auto.nombre} · enganche ${fmt(enganche)} · ${plazoActual} meses`;
  $('desglose').innerHTML = `
    <div><span>Precio de la unidad</span><b>${fmt(auto.precio)}</b></div>
    <div><span>Enganche (${slider.value}%)</span><b>${fmt(enganche)}</b></div>
    <div><span>A financiar</span><b>${fmt(auto.precio - enganche)}</b></div>
    <div><span>Total a pagar en ${plazoActual} meses</span><b>${fmt(totalPagado)}</b></div>`;

  $('calcWa').href = `${WA}?text=${encodeURIComponent(
    `Hola, calculé un plan en su página 🚗\n\nAuto: ${auto.marca} ${auto.nombre} ${auto.anio}\nEnganche: ${fmt(enganche)} (${slider.value}%)\nPlazo: ${plazoActual} meses\nMensualidad estimada: ${fmt(m)}\n\n¿Me ayudan a arrancar el trámite?`
  )}`;

  $('mensualidad').animate(
    [{ transform: 'scale(1.12)', color: '#ef233c' }, { transform: 'scale(1)', color: '#fff' }],
    { duration: 260, easing: 'ease-out' }
  );
}

selAuto.addEventListener('change', calcular);
slider.addEventListener('input', calcular);
plazos.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  plazos.querySelectorAll('button').forEach((b) => b.classList.remove('activo'));
  btn.classList.add('activo');
  plazoActual = +btn.dataset.m;
  calcular();
});

/* ---------- Contadores animados ---------- */
const animarCuenta = (el) => {
  const hasta = +el.dataset.hasta;
  const suf = el.dataset.suf || '';
  const t0 = performance.now();
  const paso = (t) => {
    const p = Math.min((t - t0) / 1400, 1);
    el.textContent = Math.round(hasta * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US') + suf;
    if (p < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
};

const obs = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) {
        animarCuenta(en.target);
        obs.unobserve(en.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.cuenta').forEach((el) => obs.observe(el));

/* ---------- Preloader con velocímetro ---------- */
(function preloader() {
  const arco = $('veloArco');
  const aguja = $('veloAguja');
  const pct = $('cargandoPct');
  const cargando = $('cargando');
  const t0 = performance.now();
  const DUR = 1500;

  const paso = (t) => {
    const p = Math.min((t - t0) / DUR, 1);
    const e = 1 - Math.pow(1 - p, 3);
    arco.style.strokeDashoffset = String(251 * (1 - e));
    const ang = Math.PI * (1 - e);
    aguja.setAttribute('x2', String(100 - Math.cos(ang) * 70));
    aguja.setAttribute('y2', String(100 - Math.sin(ang) * 70));
    pct.textContent = `${Math.round(e * 100)}%`;
    if (p < 1) requestAnimationFrame(paso);
    else setTimeout(() => cargando.classList.add('fuera'), 220);
  };
  requestAnimationFrame(paso);
})();

/* ---------- Arranque ---------- */
pintarAutos();
pintarComparador();
calcular();
AOS.init({ duration: 700, once: true, offset: 80 });

new Swiper('.hero-swiper', {
  loop: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: { delay: 4800, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
});
