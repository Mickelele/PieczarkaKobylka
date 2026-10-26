/* Pieczarka Kobyłka: shared header, footer, menu data and small interactions */

const BIZ = {
  name: 'Pieczarka',
  phone: '+48533429152',
  phoneLabel: '533 429 152',
  street: 'Zagańczyka 10',
  city: '05-230 Kobyłka',
  facebook: 'https://www.facebook.com/PieczarkaKobylka',
  maps: 'https://www.google.com/maps/search/?api=1&query=Zaga%C5%84czyka%2010%2C%2005-230%20Koby%C5%82ka',
  open: [11, 0], close: [21, 30] // codziennie, poniedziałek do niedzieli
};

// Ceny z aktualnej tablicy menu (post na Facebooku, październik 2026)
const MENU = [
  { no: 1, name: 'Klasyczna', desc: 'pieczarki, ser', s: 19, l: 23, cat: 'klasyki', tag: 'bez mięsa' },
  { no: 2, name: 'Szynka', desc: 'szynka, pieczarki, ser', s: 22, l: 25, cat: 'klasyki' },
  { no: 3, name: 'Salami', desc: 'salami, pieczarki, ser', s: 22, l: 25, cat: 'klasyki' },
  { no: 4, name: 'Chłopska', desc: 'boczek, pieczarki, ser', s: 22, l: 25, cat: 'miesne' },
  { no: 5, name: 'Z kiełbasą', desc: 'kiełbasa, pieczarki, ser', s: 22, l: 25, cat: 'miesne' },
  { no: 6, name: 'Hawajska', desc: 'szynka, ananas, pieczarki, ser', s: 24, l: 27, cat: 'ananas' },
  { no: 7, name: 'Wiejska', desc: 'boczek, kiełbasa, pieczarki, ser', s: 24, l: 27, cat: 'miesne' },
  { no: 8, name: 'Z kurczakiem', desc: 'kurczak, pieczarki, ser', s: 24, l: 27, cat: 'kurczak' },
  { no: 9, name: 'Mięsna', desc: 'szynka, salami, boczek, pieczarki, ser', s: 24, l: 27, cat: 'miesne', tag: 'dla głodnych' },
  { no: 10, name: 'Tropikana', desc: 'kurczak, ananas, pieczarki, ser', s: 26, l: 29, cat: 'ananas' }
];

const ICON = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.6V1.6L14 1.5c-4 0-4.9 3-4.9 4.9v2.1H6.8v4h2.3V22.5H14V12.5h3.3l.4-4z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
};

const NAV = [
  ['index', 'index.html', 'Start'],
  ['menu', 'menu.html', 'Menu'],
  ['galeria', 'galeria.html', 'Galeria'],
  ['kontakt', 'kontakt.html', 'Kontakt']
];

const page = document.body.dataset.page;

function header() {
  const links = NAV.map(([id, href, label]) =>
    `<a href="${href}"${id === page ? ' class="active" aria-current="page"' : ''}>${label}</a>`).join('');
  const el = document.createElement('header');
  el.className = 'site-header' + (page === 'index' ? '' : ' solid');
  el.innerHTML = `
    <div class="wrap">
      <a class="brand" href="index.html" aria-label="Pieczarka, strona główna">
        <img src="img/logo.png" alt="" width="62" height="47"><span>Pieczarka</span>
      </a>
      <nav class="nav" id="nav">${links}</nav>
      <a class="header-phone" href="tel:${BIZ.phone}">${ICON.phone}${BIZ.phoneLabel}</a>
      <a class="btn btn-primary header-cta" href="tel:${BIZ.phone}">Zadzwoń i zamów</a>
      <button class="burger" aria-label="Otwórz menu" aria-expanded="false">${ICON.menu}</button>
    </div>`;
  document.body.prepend(el);

  const burger = el.querySelector('.burger');
  const nav = el.querySelector('.nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.innerHTML = open ? ICON.close : ICON.menu;
    el.classList.add('scrolled');
  });

  const onScroll = () => el.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function footer() {
  const el = document.createElement('footer');
  el.className = 'site-footer';
  el.innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <img src="img/logo.png" alt="Pieczarka" width="110" height="84">
          <p>Wypasione zapiekanki XXL prosto z pieca, lody naturalne, świeże gofry i aromatyczna kawa. W Kobyłce.</p>
          <div class="social"><a href="${BIZ.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a></div>
        </div>
        <div>
          <h4>Strona</h4>
          <ul>${NAV.map(([, href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4>Kontakt</h4>
          <ul>
            <li><a href="tel:${BIZ.phone}">${BIZ.phoneLabel}</a></li>
            <li><a href="${BIZ.maps}" target="_blank" rel="noopener">${BIZ.street}<br>${BIZ.city}</a></li>
          </ul>
        </div>
        <div>
          <h4>Otwarte</h4>
          <ul><li>Poniedziałek do niedzieli</li><li><a href="kontakt.html">11:00 do 21:30</a></li></ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} Pieczarka Kobyłka</span>
        <span>Ogródek · Na wynos · Gotówka i karta</span>
      </div>
    </div>`;
  document.body.append(el);

  const fab = document.createElement('div');
  fab.className = 'fab';
  fab.innerHTML = `
    <a class="fb" href="${BIZ.facebook}" target="_blank" rel="noopener" aria-label="Napisz na Facebooku">${ICON.fb}</a>
    <a class="call" href="tel:${BIZ.phone}" aria-label="Zadzwoń">${ICON.phone}</a>`;
  document.body.append(fab);
}

// Czas w Polsce, niezależnie od strefy odwiedzającego
function warsawNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false
  }).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  const days = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return { min: +get('hour') % 24 * 60 + +get('minute'), day: days[get('weekday')] };
}

function openStatus() {
  const { min, day } = warsawNow();
  const o = BIZ.open[0] * 60 + BIZ.open[1];
  const c = BIZ.close[0] * 60 + BIZ.close[1];
  document.querySelectorAll('[data-status]').forEach(el => {
    let text;
    if (min >= o && min < c) {
      const left = c - min;
      text = left <= 60 ? `Otwarte jeszcze ${left} min` : 'Otwarte teraz, do 21:30';
      el.classList.add('open');
    } else {
      text = min < o ? 'Zamknięte, otwieramy o 11:00' : 'Zamknięte, jutro od 11:00';
      el.classList.add('closed');
    }
    el.innerHTML = `<i></i>${text}`;
  });
  document.querySelectorAll('.hours tr').forEach((tr, i) => tr.classList.toggle('today', i === day));
}

function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));
}

function counters() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, dec = +(el.dataset.dec || 0);
    const fmt = v => v.toFixed(dec).replace('.', ',');
    if (reduce) { el.textContent = fmt(end); return; }
    const t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

function heroWords() {
  document.querySelectorAll('.hero h1 .w').forEach((w, i) => { w.style.animationDelay = (0.12 + i * 0.12) + 's'; });
}

// Linijka 30 / 50 cm na stronie głównej
function ruler() {
  const box = document.querySelector('[data-ruler]');
  if (!box) return;
  const r = box.querySelector('.ruler');
  const big = box.querySelector('[data-r-size]');
  const price = box.querySelector('[data-r-price]');
  const txt = box.querySelector('[data-r-text]');
  const bag = box.querySelector('.baguette');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = ['#e8b66a', '#d99a45', '#f3d6a0', '#e2412b', '#5c9a3f'];

  // Okruszki w miejscu ugryzienia (x w % szerokości zapiekanki)
  const crumbs = x => {
    bag.classList.remove('chomp'); void bag.offsetWidth; bag.classList.add('chomp');
    for (let i = 0; i < 12; i++) {
      const c = document.createElement('span');
      c.className = 'crumb';
      const s = 4 + Math.random() * 7;
      c.style.cssText = `left:calc(${x}% - ${s / 2}px);top:${15 + Math.random() * 70}%;--s:${s}px;` +
        `--c:${colors[i % colors.length]};--dx:${20 + Math.random() * 60}px;` +
        `--dy:${(Math.random() - .3) * 80}px;--r:${Math.random() * 360}deg`;
      bag.append(c);
      c.addEventListener('animationend', () => c.remove());
    }
  };

  let timers = [];
  const set = size => {
    if (size === r.dataset.size) return;
    timers.forEach(clearTimeout); timers = [];
    // trzy kęsy zgrane z transition: steps(3) w CSS (106% -> 60%)
    if (size === '30' && !reduce) [300, 600, 900].forEach((t, i) =>
      timers.push(setTimeout(() => crumbs(106 - 46 * (i + 1) / 3), t)));
    r.dataset.size = size;
    box.querySelectorAll('.size-switch button').forEach(b => b.classList.toggle('on', b.dataset.size === size));
    big.textContent = size + ' cm';
    price.textContent = size === '30' ? 'od 19 zł' : 'od 23 zł';
    txt.textContent = size === '30'
      ? 'Mała, a i tak konkretna. Idealna na szybki obiad albo dla dziecka.'
      : 'Pół metra zapiekanki. Dla prawdziwie głodnych albo do podziału na dwie osoby.';
  };
  box.querySelectorAll('.size-switch button').forEach(b => b.addEventListener('click', () => set(b.dataset.size)));
}

// Menu: filtry i przełącznik rozmiaru
function menuPage() {
  const list = document.querySelector('[data-menu]');
  if (!list) return;
  let size = 'l';
  list.innerHTML = MENU.map(m => `
    <article class="menu-item reveal" data-cat="${m.cat}">
      <span class="no">${m.no}</span>
      <div><h3>${m.name}${m.tag ? `<span class="tag">${m.tag}</span>` : ''}</h3><p>${m.desc}</p></div>
      <span class="pr" data-s="${m.s}" data-l="${m.l}">${m.l}<small>zł</small></span>
    </article>`).join('');

  document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.filter;
    list.querySelectorAll('.menu-item').forEach(it => it.classList.toggle('hide', f !== 'all' && it.dataset.cat !== f));
  }));

  document.querySelectorAll('.menu-tools .size-switch button').forEach(b => b.addEventListener('click', () => {
    size = b.dataset.size === '30' ? 's' : 'l';
    document.querySelectorAll('.menu-tools .size-switch button').forEach(x => x.classList.toggle('on', x === b));
    list.querySelectorAll('.pr').forEach(p => {
      p.innerHTML = `${p.dataset[size]}<small>zł</small>`;
      p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump');
    });
  }));
}

function lightbox() {
  const triggers = document.querySelectorAll('[data-lightbox]');
  if (!triggers.length) return;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<img alt=""><button aria-label="Zamknij">×</button>';
  document.body.append(lb);
  const img = lb.querySelector('img');
  const close = () => lb.classList.remove('on');
  triggers.forEach(t => t.addEventListener('click', () => {
    const src = t.querySelector('img');
    img.src = src.currentSrc || src.src; img.alt = src.alt;
    lb.classList.add('on');
  }));
  lb.addEventListener('click', e => { if (e.target !== img) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function demoForm() {
  document.querySelectorAll('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.querySelector('.form-ok').classList.add('on');
    f.reset();
  }));
}

header();
footer();
openStatus();
heroWords();
ruler();
menuPage();
lightbox();
demoForm();
reveal();
counters();
