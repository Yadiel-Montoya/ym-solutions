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

// ---------- Brillo que sigue al mouse en las tarjetas ----------
const conBrillo = document.querySelectorAll('.bento__card, .sector, .step, .promise');
conBrillo.forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mx', '-999px');
    card.style.setProperty('--my', '-999px');
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
  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';
  const texto =
    `${saludo}, soy ${data.get('nombre')} 👋\n` +
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

/* ============================================================
   v4 — Experiencia
   ============================================================ */

const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esTactil = window.matchMedia('(hover: none)').matches;

// ---------- Halo que sigue al cursor ----------
if (!menosMovimiento && !esTactil) {
  const halo = document.createElement('div');
  halo.className = 'cursor-glow';
  document.body.appendChild(halo);

  let objetivoX = innerWidth / 2, objetivoY = innerHeight / 2;
  let x = objetivoX, y = objetivoY;

  addEventListener('mousemove', e => {
    objetivoX = e.clientX;
    objetivoY = e.clientY;
    halo.classList.add('on');
  }, { passive: true });

  document.addEventListener('mouseleave', () => halo.classList.remove('on'));

  (function seguir() {
    x += (objetivoX - x) * 0.12;
    y += (objetivoY - y) * 0.12;
    halo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(seguir);
  })();
}

// ---------- Títulos que se arman palabra por palabra ----------
document.querySelectorAll('.hero__title, .section__title, .contact__info h2').forEach(titulo => {
  if (titulo.querySelector('.split-word')) return;

  const envolver = nodo => {
    [...nodo.childNodes].forEach(hijo => {
      if (hijo.nodeType === Node.TEXT_NODE) {
        const partes = hijo.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        partes.forEach(p => {
          if (!p.trim()) return frag.appendChild(document.createTextNode(p));
          const span = document.createElement('span');
          span.className = 'split-word';
          span.textContent = p;
          frag.appendChild(span);
        });
        hijo.replaceWith(frag);
      } else if (hijo.nodeType === Node.ELEMENT_NODE && !hijo.classList.contains('rotator')) {
        envolver(hijo);
      }
    });
  };
  envolver(titulo);

  const palabras = titulo.querySelectorAll('.split-word');
  palabras.forEach((p, i) => { p.style.transitionDelay = `${i * 45}ms`; });

  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (e.isIntersecting) {
        titulo.classList.add('split-ready');
        obs.unobserve(titulo);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(titulo);
});

// ---------- Parallax suave del hero ----------
if (!menosMovimiento) {
  const copy = document.querySelector('.hero__copy');
  const visual = document.querySelector('.hero__visual');
  const glowC = document.querySelector('.glow--cyan');
  const glowV = document.querySelector('.glow--violet');

  addEventListener('scroll', () => {
    const y = scrollY;
    if (y > innerHeight) return;
    if (copy) copy.style.transform = `translateY(${y * 0.12}px)`;
    if (visual) visual.style.transform = `translateY(${y * 0.05}px)`;
    if (glowC) glowC.style.transform = `translate(${y * 0.06}px, ${y * 0.1}px)`;
    if (glowV) glowV.style.transform = `translate(${-y * 0.05}px, ${y * 0.08}px)`;
  }, { passive: true });

  // el hero también reacciona al mouse
  const hero = document.querySelector('.hero');
  if (hero && !esTactil) {
    hero.addEventListener('mousemove', e => {
      const dx = (e.clientX / innerWidth - 0.5) * 2;
      const dy = (e.clientY / innerHeight - 0.5) * 2;
      if (visual) visual.style.transform = `translate(${dx * 14}px, ${dy * 10}px)`;
    });
  }
}

// ---------- Tilt 3D en tarjetas de sectores ----------
if (!esTactil) {
  document.querySelectorAll('.sector').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ---------- Solo una pregunta abierta a la vez ----------
const preguntas = document.querySelectorAll('.faq details');
preguntas.forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) preguntas.forEach(o => { if (o !== d) o.open = false; });
  });
});
