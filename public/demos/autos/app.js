/* ============ AUTONOVA — lógica de la demo ============ */

const WA = 'https://wa.me/5215565595788';
const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US');

/* ---------- Inventario (datos, no HTML a mano) ---------- */
const inventario = [
  { nombre: 'Mustang GT 2018', tipo: 'deportivo', precio: 549900, km: '42,000 km', motor: 'V8 5.0L', trans: 'Manual', foto: 'img/deportivo-rojo.jpg', badge: 'Destacado' },
  { nombre: 'Mazda CX-30 2020', tipo: 'suv', precio: 359900, km: '38,500 km', motor: '2.5L', trans: 'Automática', foto: 'img/suv-negra.jpg', badge: 'Recién llegado' },
  { nombre: 'X-Trail 2019', tipo: 'suv', precio: 319900, km: '55,200 km', motor: '2.5L', trans: 'CVT', foto: 'img/suv-familiar.jpg', badge: '7 pasajeros' },
  { nombre: 'Hilux 2020', tipo: 'pickup', precio: 459900, km: '61,000 km', motor: '2.4L Diésel', trans: 'Manual', foto: 'img/pickup.jpg', badge: 'Doble cabina' },
  { nombre: 'Jetta Clásico 2015', tipo: 'sedan', precio: 169900, km: '78,400 km', motor: '2.0L', trans: 'Manual', foto: 'img/sedan-blanco.jpg', badge: 'Único dueño' },
];

const contAutos = document.getElementById('autos');

function pintarAutos(tipo = 'todos') {
  contAutos.innerHTML = '';
  inventario
    .filter((a) => tipo === 'todos' || a.tipo === tipo)
    .forEach((a, i) => {
      const el = document.createElement('article');
      el.className = 'auto';
      el.style.animationDelay = `${i * 0.08}s`;
      el.innerHTML = `
        <div class="auto__foto">
          <img src="${a.foto}" alt="${a.nombre}" loading="lazy">
          <span class="auto__badge">${a.badge}</span>
        </div>
        <div class="auto__cuerpo">
          <h3>${a.nombre}</h3>
          <div class="auto__specs">
            <span>📍 ${a.km}</span><span>⚙️ ${a.motor}</span><span>🕹️ ${a.trans}</span>
          </div>
          <div class="auto__pie">
            <div class="auto__precio">${fmt(a.precio)}<small>o desde ${fmt(mensualidad(a.precio, 0.2, 48))}/mes</small></div>
            <a class="auto__wa" target="_blank" rel="noopener"
               href="${WA}?text=${encodeURIComponent(`Hola, me interesa el ${a.nombre} de ${fmt(a.precio)} 🚗 ¿Sigue disponible?`)}">
               Me interesa
            </a>
          </div>
        </div>`;
      contAutos.appendChild(el);
    });
}

document.getElementById('filtros').addEventListener('click', (e) => {
  const btn = e.target.closest('.filtro');
  if (!btn) return;
  document.querySelectorAll('.filtro').forEach((f) => f.classList.remove('activo'));
  btn.classList.add('activo');
  pintarAutos(btn.dataset.tipo);
});

/* ---------- Calculadora de financiamiento ---------- */
const TASA_ANUAL = 0.139;

function mensualidad(precio, enganchePct, meses) {
  const monto = precio * (1 - enganchePct);
  const r = TASA_ANUAL / 12;
  return (monto * r) / (1 - Math.pow(1 + r, -meses));
}

const selAuto = document.getElementById('calcAuto');
const slider = document.getElementById('calcEnganche');
const engancheTxt = document.getElementById('engancheTxt');
const plazos = document.getElementById('plazos');
const resultado = document.getElementById('mensualidad');
const detalle = document.getElementById('calcDetalle');
const calcWa = document.getElementById('calcWa');

inventario.forEach((a, i) => {
  const op = document.createElement('option');
  op.value = i;
  op.textContent = `${a.nombre} — ${fmt(a.precio)}`;
  selAuto.appendChild(op);
});

let plazoActual = 36;

function calcular() {
  const auto = inventario[+selAuto.value];
  const pct = +slider.value / 100;
  const m = mensualidad(auto.precio, pct, plazoActual);
  engancheTxt.textContent = `${slider.value}% (${fmt(auto.precio * pct)})`;
  resultado.textContent = fmt(m);
  detalle.textContent = `${auto.nombre} · enganche ${fmt(auto.precio * pct)} · ${plazoActual} meses`;
  calcWa.href = `${WA}?text=${encodeURIComponent(
    `Hola, calculé un plan en su página 🚗\n\nAuto: ${auto.nombre}\nEnganche: ${fmt(auto.precio * pct)} (${slider.value}%)\nPlazo: ${plazoActual} meses\nMensualidad estimada: ${fmt(m)}\n\n¿Me ayudan a arrancar el trámite?`
  )}`;

  resultado.animate(
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

/* ---------- Arranque ---------- */
pintarAutos();
calcular();
AOS.init({ duration: 700, once: true, offset: 80 });

new Swiper('.hero-swiper', {
  loop: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: { delay: 4800, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
});
