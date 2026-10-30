/* Xthetics — Sage edition. Plain JS, no build step, no libraries. */
(() => {
'use strict';

const PHONE = 'tel:+12013385186';

/* Content from the live Xthetics site (data/services.js, data/reviews.js). */
const SERVICES = [
  { n: 'Botox', c: 'injectables', i: 'assets/services/botox.webp', d: 'Precisely placed neuromodulator injections that soften frown lines, forehead lines, and crow’s feet while keeping your expressions natural.' },
  { n: 'Chemical Peels', c: 'skin', i: 'assets/services/chemical-peels.webp', d: 'Medical-grade resurfacing peels that lift away dull, damaged surface layers to reveal brighter, clearer, smoother skin.' },
  { n: 'Dermal Fillers', c: 'injectables', i: 'assets/services/dermal-fillers.webp', d: 'Hyaluronic-acid fillers that restore lost volume, smooth folds, and artfully define lips, cheeks, chin, and jawline.' },
  { n: 'Aesthetics', c: 'skin', i: 'assets/services/aesthetics.webp', d: 'A fully personalized aesthetics program — professional skin analysis, advanced facials, and a treatment plan built around your skin.' },
  { n: 'Weight Loss Management', c: 'wellness', i: 'assets/services/weight-loss.webp', d: 'A medically supervised weight loss program with personalized planning, clinical support, and ongoing accountability — built for lasting results.' },
  { n: 'IV Therapy', c: 'wellness', i: 'assets/services/iv-therapy.webp', d: 'Vitamin and hydration infusions delivered directly to your bloodstream for fast, full absorption — energy, immunity, recovery, and glow.' },
  { n: 'PRP', c: 'wellness', i: 'assets/services/prp.webp', d: 'Platelet-rich plasma drawn from your own blood, concentrated, and reintroduced to regenerate skin and stimulate hair growth — 100% natural.' },
  { n: 'Microneedling', c: 'skin', i: 'assets/services/microneedling.webp', d: 'Collagen-induction therapy that uses micro-channels to trigger your skin’s own repair response — smoothing scars, pores, and fine lines.' },
  { n: 'Morpheus 8', c: 'skin', i: 'assets/services/morpheus-8.webp', d: 'Radiofrequency microneedling that remodels collagen deep beneath the surface — tightening skin and refining contours on face, neck, and body.' },
  { n: 'HydraFacial', c: 'skin', i: 'assets/services/hydrafacial.webp', d: 'The celebrity-loved 3-in-1 treatment that cleanses, painlessly extracts, and drenches skin in hydrating serums — instant glow, zero downtime.' },
  { n: 'Lumecca IPL', c: 'skin', i: 'assets/services/lumecca-ipl.webp', d: 'The industry’s most powerful IPL photofacial — clearing sun spots, redness, and visible vessels in as little as one to two sessions.' },
  { n: 'Diolaze Laser Hair Removal', c: 'skin', i: 'assets/services/diolaze.webp', d: 'High-speed diode laser hair removal with built-in cooling — smoother skin, larger areas treated faster, and real comfort.' },
  { n: 'Permanent Makeup', c: 'skin', i: 'assets/services/permanent-makeup.webp', d: 'Artist-crafted cosmetic tattooing — natural brows, soft eyeliner, and lip blush that let you wake up ready every day.' },
  { n: 'PDO Thread Lift', c: 'injectables', i: 'assets/services/pdo-thread-lift.webp', d: 'Dissolvable lifting threads that instantly reposition sagging tissue and build collagen — a visible lift without surgery.' },
  { n: 'Mesotherapy', c: 'skin', i: 'assets/services/mesotherapy.webp', d: 'Micro-injections of vitamins, hyaluronic acid, and skin nutrients delivered exactly where skin needs them — deep hydration and lit-from-within glow.' },
  { n: 'Density', c: 'skin', i: 'assets/services/density.webp', d: 'Non-invasive radiofrequency tightening that firms loose skin and smooths texture on the face and body — no needles, no downtime.' },
  { n: 'BioTE', c: 'wellness', i: 'assets/services/biote.jpeg', d: 'Bioidentical hormone pellet therapy that restores balance from within — steadier energy, better sleep, sharper focus, and renewed vitality.' },
  { n: 'Plexr', c: 'skin', i: 'assets/services/plexr.webp', d: 'Plasma “soft surgery” that lifts hooded eyelids, tightens crepey skin, and smooths wrinkles — no scalpel, no stitches.' },
  { n: 'PlaxPot', c: 'skin', i: 'assets/services/plaxpot.webp', d: 'Precision plasma-pen fibroblast therapy that tightens crepey skin, softens wrinkles, and refines delicate areas without surgery.' }
];
const REVIEWS = [
  { a: 'Ashley Marroquin', q: 'Dr. Leticia was absolutely amazing! She explained every step of the HydraFacial so clearly, which made the whole experience even better. …' },
  { a: 'Mambella', q: 'I had such a great experience at Xthetics Spa! I got a little lip filler and under-eye filler, and I’m honestly so happy with the results. Everything looks super natural—just more refreshed and smooth, not overdone at all. …' },
  { a: 'Marija Begonja', q: 'I went to Leticia for my first Botox treatment ever. She was beyond considerate throughout my entire time with her. I entered her offices nervous but was confident and comfortable during my time with her. …' },
  { a: 'Emily Santiago', q: 'I had the best injectable experience ever here. Leticia explained everything in detail. I felt well informed and comfortable. I 100% recommend her. She is professional, her attention to detail, and thoroughness is just amazing. …' },
  { a: 'Franchesca Carrasco', q: 'I just have to give a shout-out to Leticia because she’s honestly amazing. Every time I go in, she’s super friendly and makes the whole experience really comfortable. You can just tell she knows her stuff inside and out. …' },
  { a: 'Martina Marzano', q: 'I can’t say enough good things about Leticia — she has truly been incredible throughout my entire journey. …' }
];
const CATEGORY = { injectables: 'Injectables', skin: 'Skin & Laser', wellness: 'Wellness' };
const PREVIEW = 6; // cards shown before "View all"

document.documentElement.classList.add('js');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

/* ---- Header ------------------------------------------------------------- */
const header = $('.header');
const burger = $('.burger');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30), { passive: true });
burger.addEventListener('click', () => burger.setAttribute('aria-expanded', String(header.classList.toggle('open'))));
$$('.nav a').forEach(a => a.addEventListener('click', () => { header.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));

/* ---- Scroll entrances + counters ---------------------------------------- */
const revealer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('in');
  revealer.unobserve(entry.target);
}), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
function watchReveals(scope = document) {
  $$('[data-reveal]:not(.in)', scope).forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => c.hasAttribute('data-reveal'));
    el.style.transitionDelay = (Math.min(siblings.indexOf(el), 5) * .1) + 's';
    revealer.observe(el);
  });
}

const counter = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting || reduceMotion) return;
  counter.unobserve(entry.target);
  const el = entry.target, end = parseFloat(el.dataset.count), decimals = Number(el.dataset.decimals) || 0;
  const start = performance.now(), duration = 1400;
  (function step(now) {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
  })(start);
}), { threshold: .6 });
$$('[data-count]').forEach(el => counter.observe(el));

/* ---- Treatment grid: filter + "View all" -------------------------------- */
const grid = $('.grid');
const moreWrap = $('.more');
const moreBtn = $('.more-btn');
const filterBtns = $$('.filters button');
let activeFilter = 'all';
let expanded = false;

grid.innerHTML = SERVICES.map(s => `<article class="card" data-c="${s.c}" data-reveal><div class="card-img"><img src="${s.i}" alt="${esc(s.n)} at Xthetics Med Spa" width="600" height="600" loading="lazy"></div><div class="card-body"><span class="card-cat">${CATEGORY[s.c]}</span><h3>${esc(s.n)}</h3><p>${esc(s.d)}</p><a href="${PHONE}">Book ${esc(s.n)}</a></div></article>`).join('');
const cards = $$('.card', grid);

function renderGrid() {
  let shown = 0, total = 0;
  cards.forEach(card => {
    const match = activeFilter === 'all' || card.dataset.c === activeFilter;
    if (match) total++;
    const visible = match && (expanded || shown < PREVIEW);
    if (visible) shown++;
    card.classList.toggle('hidden', !visible);
  });
  moreWrap.hidden = total <= PREVIEW;
  moreBtn.setAttribute('aria-expanded', String(expanded));
  moreBtn.textContent = expanded ? 'Show fewer' : `View all ${total} treatments`;
}
function setFilter(f) {
  activeFilter = f;
  expanded = false;
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.f === f));
  renderGrid();
}
filterBtns.forEach(b => b.addEventListener('click', () => setFilter(b.dataset.f)));
moreBtn.addEventListener('click', () => {
  expanded = !expanded;
  renderGrid();
  if (!expanded) $('#treatments').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});
// Category cards jump to the grid with their filter applied.
$$('.cat[data-filter]').forEach(cat => cat.addEventListener('click', () => setFilter(cat.dataset.filter)));
renderGrid();

/* ---- Reviews slider ----------------------------------------------------- */
const track = $('.review-track');
track.innerHTML = REVIEWS.map(r => `<article class="review"><span class="stars" role="img" aria-label="5 out of 5 stars">★★★★★</span><blockquote>${esc(r.q)}</blockquote><p>${esc(r.a)} · Google review</p></article>`).join('');
const slide = dir => {
  const card = $('.review', track);
  const step = card ? card.getBoundingClientRect().width + 24 : 400;
  track.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' });
};
$('.arrow.prev').addEventListener('click', () => slide(-1));
$('.arrow.next').addEventListener('click', () => slide(1));

watchReveals();
})();
