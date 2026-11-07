// Core behaviour. Works on its own; when motion.js is running it exposes
// window.__motion, and these handlers hand their changes to it to animate.

// Tool tile lists register their layout here so other toggles can re-run it.
var tileLayouts = [];
function relayoutTiles() { tileLayouts.forEach(function (fn) { fn(); }); }

// Loader: counts the first-screen images and the fonts in, then leaves. When
// motion.js is running it takes the exit (landing spot, lift, hero); otherwise
// the loader simply goes. Lazy images further down are not waited for.
(function () {
  var root = document.documentElement;
  var el = document.querySelector('.loader');
  if (!el || !root.classList.contains('loading')) return;
  var num = el.querySelector('.ld-num');
  var bar = el.querySelector('.ld-bar span');
  var rows = el.querySelectorAll('.ld-row'); // the monogram fills in row by row
  var imgs = Array.prototype.filter.call(document.images, function (i) { return i.loading !== 'lazy'; });
  var total = imgs.length + 2, have = 0; // + fonts + the load event
  function tick() { have++; }
  imgs.forEach(function (i) {
    if (i.complete) tick(); else { i.addEventListener('load', tick, { once: true }); i.addEventListener('error', tick, { once: true }); }
  });
  var ready = false;
  var fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  var loaded = new Promise(function (r) {
    if (document.readyState === 'complete') r(); else addEventListener('load', r, { once: true });
  });
  fonts.then(tick); loaded.then(tick);
  Promise.race([Promise.all([fonts, loaded]), new Promise(function (r) { setTimeout(r, 6000); })])
    .then(function () { ready = true; });

  function finish() { root.classList.remove('loading'); el.classList.remove('lifting'); }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    rows.forEach(function (r) { r.classList.add('on'); });
    // No counting animation: go as soon as everything is in.
    Promise.race([Promise.all([fonts, loaded]), new Promise(function (r) { setTimeout(r, 6000); })]).then(finish);
    return;
  }
  var shown = 0;
  (function frame() {
    var target = ready ? 100 : Math.min(90, have / total * 100);
    shown += (target - shown) * .12;
    if (ready && shown > 99.5) shown = 100;
    num.textContent = Math.round(shown);
    bar.style.setProperty('--p', shown / 100);
    rows.forEach(function (r, i) { r.classList.toggle('on', shown >= (i + 1) / rows.length * 100); });
    if (shown < 100) { requestAnimationFrame(frame); return; }
    if (window.__motion) window.__motion.enter(el, finish); else finish();
  })();
})();

// Show more / Show less on the LTIMindtree role and the extra projects.
document.querySelectorAll('.more-btn').forEach(function (btn) {
  var list = document.getElementById(btn.getAttribute('aria-controls'));
  var lbl = btn.querySelector('.lbl');
  var count = btn.querySelector('.mono');
  var n = list.children.length;
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    var m = window.__motion;
    btn.setAttribute('aria-expanded', String(!open));
    lbl.textContent = open ? 'Show more' : 'Show less';
    if (count) count.textContent = (open ? '+' : '−') + n;
    if (open && m) {
      m.conceal(list, function () { list.classList.remove('open'); });
      return;
    }
    list.classList.toggle('open', !open);
    relayoutTiles(); // tool tiles that just appeared can now be measured
    if (!open && m) m.reveal(list);
  });
});

// Light / dark. Follows the system until the visitor picks one; the pick is remembered.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var mq = matchMedia('(prefers-color-scheme: dark)');
  function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    // Every toggle (the page's and the peek bar's copy) shows the same state.
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.setAttribute('aria-pressed', String(theme === 'dark'));
      b.querySelector('.tt-text').textContent = theme === 'dark' ? 'Light' : 'Dark'; // the theme a click gives
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0F1417' : '#E2DED5');
  }
  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  function toggle(from) {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch (e) {}
    // A circular wipe from the toggle where the browser supports view transitions.
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply(next);
      return;
    }
    var r = from.getBoundingClientRect(); // the wipe starts from whichever toggle was pressed
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(function () { apply(next); }).ready.then(function () {
      root.animate(
        { clipPath: ['circle(0 at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 650, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  }
  btn.addEventListener('click', function () { toggle(btn); });
  window.__themeToggle = toggle;
  mq.addEventListener('change', function (e) {
    if (stored() !== 'light' && stored() !== 'dark') apply(e.matches ? 'dark' : 'light');
  });
})();

// Tool tiles: a list longer than two rows keeps its first two rows, with the
// last slot of row two turned into a "+N" tile that shows the rest.
document.querySelectorAll('.tiles').forEach(function (list) {
  var items = Array.prototype.slice.call(list.querySelectorAll('li.tile'));
  if (items.length < 3) return;
  var slot = document.createElement('li');
  slot.className = 'tile tile-more';
  var btn = document.createElement('button');
  btn.type = 'button';
  slot.appendChild(btn);
  var open = false;

  function perRow() {
    var top = items[0].offsetTop, n = 0;
    while (n < items.length && items[n].offsetTop === top) n++;
    return n;
  }
  function layout() {
    items.forEach(function (li) { li.hidden = false; });
    if (slot.parentNode) list.removeChild(slot);
    var row = perRow();
    if (items.length <= row * 2) return;
    if (open) {
      btn.textContent = '−';
      btn.setAttribute('aria-label', 'Show fewer tools');
    } else {
      var keep = row * 2 - 1;
      items.slice(keep).forEach(function (li) { li.hidden = true; });
      btn.textContent = '+' + (items.length - keep);
      btn.setAttribute('aria-label', 'Show ' + (items.length - keep) + ' more tools');
    }
    btn.setAttribute('aria-expanded', String(open));
    list.appendChild(slot);
  }
  btn.addEventListener('click', function () {
    var m = window.__motion;
    function change() { open = !open; layout(); }
    if (m) m.flip(list, change); else change();
    btn.focus();
  });
  tileLayouts.push(layout);
  var t;
  window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(layout, 120); });
  layout();
});

// Peek nav: once past the hero, bringing the pointer to the top edge slides in
// a slim copy of the masthead. Mouse and trackpad only; phones are unchanged.
(function () {
  var masthead = document.querySelector('.masthead');
  var hero = document.querySelector('.sp-hero');
  if (!masthead || !hero || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var bar = masthead.cloneNode(true);
  bar.className = 'peek';
  bar.querySelector('nav').setAttribute('aria-label', 'Sections (quick access)');
  bar.inert = true; // out of the tab order and accessibility tree while hidden
  // The theme toggle comes along, so the theme can be switched without going back to the top.
  var tt = document.querySelector('.theme-toggle');
  if (tt && window.__themeToggle) {
    var copy = tt.cloneNode(true);
    copy.addEventListener('click', function () { window.__themeToggle(copy); });
    bar.appendChild(copy);
  }
  document.body.appendChild(bar);

  var shown = false;
  function set(v) {
    if (v === shown) return;
    shown = v;
    bar.classList.toggle('show', v);
    bar.inert = !v;
  }
  function pastHero() { return window.scrollY > hero.offsetHeight * 0.8; }
  document.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    if (e.clientY <= 64 && pastHero()) set(true);
    else if (e.clientY > bar.offsetHeight + 48) set(false);
  });
  window.addEventListener('scroll', function () { if (!pastHero()) set(false); }, { passive: true });
  bar.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });

  // Underline the section currently in view.
  var links = bar.querySelectorAll('nav a');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      links.forEach(function (a) {
        if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
})();
