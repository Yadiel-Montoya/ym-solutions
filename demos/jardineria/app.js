/* Raíz Verde — demo por YM Solutions */

// Sombra del nav al hacer scroll
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('baja', scrollY > 10), { passive: true });

// Menú móvil
const burger = document.getElementById('navBurger');
const links = document.getElementById('navLinks');
burger.addEventListener('click', () => links.classList.toggle('abierto'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('abierto')));

// Aparición al hacer scroll
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visto'); obs.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Formulario → mensaje de WhatsApp
const WHATS = '5215565595788';
document.getElementById('formJardin').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';
  const detalle = d.get('detalle') ? `\nDetalle: ${d.get('detalle')}` : '';
  const texto = `${saludo}, soy ${d.get('nombre')} 🌿\nMe interesa: ${d.get('servicio')}${detalle}\n¿Me pueden dar un presupuesto?`;
  open(`https://wa.me/${WHATS}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
});
