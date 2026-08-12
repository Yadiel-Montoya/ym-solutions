/* ============================================================
   YM SOLUTIONS — main.js
   ============================================================ */

// ---------- Navbar: fondo al hacer scroll ----------
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Menú móvil ----------
const burger = document.getElementById('navBurger');
const links = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// ---------- Modo captura: ?static muestra todo sin animaciones ----------
if (location.search.includes('static')) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      setTimeout(() => window.scrollTo(0, target.offsetTop - 80), 400);
    }
  }
}

// ---------- Animación de aparición ----------
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---------- Brillo que sigue al mouse en las tarjetas bento ----------
document.querySelectorAll('.bento__card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// ---------- Formulario → mensaje de WhatsApp ----------
const WHATSAPP = '5215565595788';
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const intereses = data.getAll('interes');
  const lineaInteres = intereses.length ? `Me interesa: ${intereses.join(', ')}\n` : '';
  const texto =
    `Hola, soy ${data.get('nombre')} 👋\n` +
    `Mi negocio: ${data.get('negocio')}\n` +
    lineaInteres +
    `\nLo que necesito: ${data.get('mensaje')}`;
  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`,
    '_blank',
    'noopener'
  );
});

// ---------- Barra de progreso de scroll ----------
const bar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  bar.style.width = pct + '%';
}, { passive: true });

// ---------- Scrollspy: sección activa en el menú ----------
const spyLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')];
const spyTargets = spyLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      spyLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
spyTargets.forEach(t => spy.observe(t));

// ---------- Contadores animados ----------
const counters = document.querySelectorAll('.count');
const countObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    countObs.unobserve(en.target);
    const el = en.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.6 });
counters.forEach(c => countObs.observe(c));

// ---------- Palabra rotatoria con efecto de escritura ----------
const rotator = document.getElementById('rotator');
if (rotator) {
  const words = rotator.dataset.words.split(',');
  let wi = 0;
  const type = (word, i, dir) => {
    rotator.textContent = word.slice(0, i);
    if (dir > 0 && i <= word.length) {
      setTimeout(() => type(word, i + 1, 1), 80);
    } else if (dir > 0) {
      setTimeout(() => type(word, word.length, -1), 2200);
    } else if (i >= 0) {
      setTimeout(() => type(word, i - 1, -1), 40);
    } else {
      wi = (wi + 1) % words.length;
      type(words[wi], 0, 1);
    }
  };
  setTimeout(() => type(words[0], words[0].length, -1), 2600);
}

// ---------- Botones magnéticos ----------
const magnetic = document.querySelectorAll('.btn--primary, .btn--wa');
magnetic.forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ---------- Spotlight del hero ----------
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', e => {
  const r = hero.getBoundingClientRect();
  hero.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`);
  hero.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`);
});

// ---------- Tooltip del botón flotante (aparece a los 6s, se oculta a los 12s) ----------
const waFloat = document.querySelector('.wa-float');
setTimeout(() => {
  waFloat.classList.add('show-tip');
  setTimeout(() => waFloat.classList.remove('show-tip'), 6000);
}, 6000);

// ---------- Tilt 3D en tarjetas de portafolio ----------
document.querySelectorAll('.folio__card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
