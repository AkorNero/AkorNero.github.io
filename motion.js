// Motion layer: smooth scrolling and scroll-linked animation (GSAP + Lenis).
// Optional by design: if the libraries fail to load, or the visitor prefers
// reduced motion, nothing here runs and the page stays complete and static.
(function () {
  var root = document.documentElement;
  function done() { root.classList.remove('motion-pending'); }

  // Where this visit should land: the saved spot on a reload or back/forward,
  // otherwise the #section in the address. The page itself restores it below.
  var KEY = 'scroll:' + location.pathname;
  var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  var saved = null;
  try { if (nav && nav.type !== 'navigate') saved = sessionStorage.getItem(KEY); } catch (e) {}
  addEventListener('pagehide', function () { try { sessionStorage.setItem(KEY, String(scrollY)); } catch (e) {} });
  function afterLoad(fn) {
    if (document.readyState === 'complete') fn(); else addEventListener('load', fn, { once: true });
  }

  if (!window.gsap || !window.ScrollTrigger || !window.SplitText || !window.Flip || !window.Lenis ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (saved !== null) afterLoad(function () { scrollTo({ top: +saved, behavior: 'instant' }); });
    done(); return;
  }

  // Creating one-time scroll triggers that the page has already scrolled past
  // breaks ScrollTrigger, and the browser restores the scroll before they exist.
  // So build everything from the top and return to the landing spot afterwards.
  var hashTarget = location.hash.length > 1 ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo({ top: 0, behavior: 'instant' });

  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
  root.classList.add('motion');

  // Headline: hidden until the loader lifts, then its lines rise into place.
  // Landing further down the page, it is simply shown.
  var title = document.getElementById('hero-title');
  gsap.set(title, { autoAlpha: 0 });
  function playHero(rise) {
    gsap.set(title, { autoAlpha: 1 });
    if (!rise) return;
    // aria: 'none' leaves the words as they are for screen readers; the default puts an
    // aria-label on the <p>, which ARIA does not allow on a paragraph.
    SplitText.create(title, {
      type: 'lines', mask: 'lines', autoSplit: true, aria: 'none', reduceWhiteSpace: false, // keeps the &nbsp; in "I build"
      onSplit: function (self) {
        return gsap.from(self.lines, { yPercent: 105, duration: .9, stagger: .09, ease: 'power3.out' });
      }
    });
  }

  // Smooth scroll, driven by GSAP's clock so scrolling and animation stay in step.
  var lenis = new Lenis({ autoRaf: false, lerp: .13 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // In-page links glide to their section instead of jumping.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    // A link to a control (a project's Repo link to the GitHub button) glides to the
    // control's whole section and focuses the control itself, ring showing.
    var control = target.matches('a[href], button');
    lenis.scrollTo(control ? (target.closest('section') || target) : target, { duration: 1.2 });
    history.pushState(null, '', '#' + id);
    // Keyboard and screen-reader users continue from the section they jumped to.
    if (!control && !target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (control && window.__markFocus) window.__markFocus(target);
  });

  // The axis grows with the reader: its tip tracks 60% down the viewport.
  gsap.fromTo('.spine', { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '.page.axis', start: 'top 60%', end: 'clamp(bottom 60%)', scrub: true }
  });

  // Each section and role node lights up as the axis reaches it.
  gsap.utils.toArray('.node, .rnode').forEach(function (node) {
    ScrollTrigger.create({
      trigger: node, start: 'top 60%',
      onEnter: function () { node.classList.add('lit'); },
      onLeaveBack: function () { node.classList.remove('lit'); }
    });
  });

  // ---------- Scroll reveals: heavier easing and longer travel ----------
  var HEAVY = 'expo.out';
  var CLEAR = 'transform,opacity';
  function once(trigger, start) { return { trigger: trigger, start: start || 'top 82%', once: true }; }
  function visibleTiles(scope) { return scope.querySelectorAll('.tiles > li:not([hidden])'); }

  // The hero scrolls with the page, one-to-one like every other section.

  // Section titles rise letter by letter; their small tags follow.
  document.fonts.ready.then(function () {
    gsap.utils.toArray('.sec h2').forEach(function (h) {
      SplitText.create(h, {
        type: 'lines,chars', mask: 'lines', autoSplit: true,
        onSplit: function (self) {
          return gsap.from(self.chars, { yPercent: 115, duration: 1.3, stagger: .025, ease: HEAVY, scrollTrigger: once(h, 'top 88%') });
        }
      });
    });
  });

  // About: the print drops onto the page, then the paragraphs settle in.
  var print = document.querySelector('#about .print');
  if (print) gsap.from(print, { y: 70, rotation: -7, opacity: 0, duration: 1.5, ease: HEAVY, clearProps: CLEAR, scrollTrigger: once(print) });
  gsap.from('#about .prose > p', { y: 34, opacity: 0, duration: 1.2, stagger: .12, ease: HEAVY, clearProps: CLEAR, scrollTrigger: once('#about .prose') });

  // Role and group separators draw outward from the axis.
  gsap.utils.toArray('.split').forEach(function (el) {
    if (el.closest('.more')) return;
    gsap.fromTo(el, { '--line': 0 }, { '--line': 1, duration: 1.4, ease: HEAVY, scrollTrigger: once(el, 'top 88%') });
  });

  // Experience: company, title, then bullets and tools cascade in.
  gsap.utils.toArray('.role').forEach(function (role) {
    var tl = gsap.timeline({ scrollTrigger: once(role, 'top 78%'), defaults: { ease: HEAVY, duration: 1.1, clearProps: CLEAR } });
    tl.from(role.querySelector('.side'), { y: 40, opacity: 0 })
      .from(role.querySelectorAll('.body > p'), { y: 30, opacity: 0, stagger: .08 }, '<0.1')
      .from(role.querySelectorAll('.bul:not(.more) > li, .body > .more-btn'), { y: 26, opacity: 0, stagger: .07 }, '<0.15')
      .from(visibleTiles(role), { scale: .8, opacity: 0, duration: .8, stagger: .03 }, '<0.25');
  });

  // Projects: the colour panel wipes open, then its story steps follow.
  function revealCase(c) {
    var strip = c.querySelector('.strip');
    var tl = gsap.timeline({ scrollTrigger: once(c, 'top 78%'), defaults: { ease: HEAVY, duration: 1.1, clearProps: CLEAR } });
    tl.from(strip, { clipPath: 'inset(0 100% 0 0)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' })
      .from(strip.querySelectorAll('h3, .card, .repo'), { y: 30, opacity: 0, stagger: .08 }, '-=0.55')
      .from(visibleTiles(strip), { scale: .8, opacity: 0, duration: .8, stagger: .03 }, '<0.15')
      .from(c.querySelectorAll('.steps > div'), { y: 30, opacity: 0, stagger: .1 }, 0.35)
      .from(c.querySelectorAll('.tbl caption, .tbl thead tr, .tbl tbody tr'), { y: 20, opacity: 0, stagger: .08 }, '<0.3');
  }
  gsap.utils.toArray('.case').forEach(function (c) { if (!c.closest('.more')) revealCase(c); });
  var group = document.querySelector('.group');
  if (group) gsap.from(group.querySelectorAll('.group-h, .more-btn'), { y: 24, opacity: 0, duration: 1, stagger: .1, ease: HEAVY, clearProps: CLEAR, scrollTrigger: once(group, 'top 88%') });

  // Education: table rows land in turn, then the award and community notes rise in.
  gsap.utils.toArray('#education .tbl').forEach(function (t) {
    gsap.from(t.querySelectorAll('thead tr, tbody tr'), { y: 24, opacity: 0, duration: 1, stagger: .09, ease: HEAVY, clearProps: CLEAR, scrollTrigger: once(t) });
  });
  gsap.from('#education .note', { y: 40, opacity: 0, duration: 1.2, stagger: .12, ease: HEAVY, clearProps: CLEAR, scrollTrigger: once('#education .notes') });

  // Contact: the closing sentence arrives word by word, then the actions.
  document.fonts.ready.then(function () {
    var close = document.querySelector('#contact .close');
    if (!close) return;
    SplitText.create(close, {
      type: 'lines,words', mask: 'lines', autoSplit: true, aria: 'none',
      onSplit: function (self) {
        return gsap.from(self.words, { yPercent: 110, duration: 1.1, stagger: .03, ease: HEAVY, scrollTrigger: once(close, 'top 88%') });
      }
    });
  });
  gsap.from('#contact .facts, #contact .cta > *', { y: 24, opacity: 0, duration: 1, stagger: .08, delay: .5, ease: HEAVY, clearProps: CLEAR, scrollTrigger: once('#contact .close', 'top 88%') });

  // LinkedIn and GitHub lean toward the pointer (mouse and trackpad only).
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    gsap.utils.toArray('.btn').forEach(function (b) {
      var xTo = gsap.quickTo(b, 'x', { duration: .6, ease: 'power3' });
      var yTo = gsap.quickTo(b, 'y', { duration: .6, ease: 'power3' });
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * .25);
        yTo((e.clientY - r.top - r.height / 2) * .35);
      });
      b.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  }

  // Reading progress: a thin accent bar across the top of the window.
  var bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: .3 } });

  // Metric cards count up once when they come into view. The real figure stays
  // in the page for screen readers; only a visual copy counts.
  var figures = gsap.utils.toArray('.sp-numbers dt');
  var counters = figures.map(function (dt) {
    var m = dt.textContent.match(/^(\D*)(\d+)(.*)$/);
    if (!m) return null;
    var vis = document.createElement('span');
    vis.setAttribute('aria-hidden', 'true');
    var sr = document.createElement('span');
    sr.className = 'vh';
    sr.textContent = dt.textContent;
    vis.textContent = m[1] + '0' + m[3];
    dt.textContent = '';
    dt.append(vis, sr);
    return { el: vis, pre: m[1], to: +m[2], post: m[3], n: 0 };
  }).filter(Boolean);
  var cards = gsap.utils.toArray('.sp-numbers dl > div');
  gsap.set(cards, { y: 60, opacity: 0 });
  ScrollTrigger.create({
    trigger: '.sp-numbers', start: 'top 85%', once: true,
    onEnter: function () {
      gsap.to(cards, { y: 0, opacity: 1, duration: 1.2, stagger: .1, ease: HEAVY, clearProps: 'transform,opacity' });
      counters.forEach(function (c, i) {
        gsap.to(c, {
          n: c.to, duration: 1.4, delay: i * 0.12, ease: 'power2.out',
          onUpdate: function () { c.el.textContent = c.pre + Math.round(c.n) + c.post; }
        });
      });
    }
  });

  // Hooks for script.js: re-measure after content opens or closes.
  function refresh() { ScrollTrigger.refresh(); }
  window.__motion = {
    refresh: refresh,
    // Show more: the list opens to its height and fades in; closing reverses it.
    reveal: function (el) {
      if (!el.dataset.revealed) {
        el.dataset.revealed = '1';
        el.querySelectorAll('.case').forEach(revealCase);
      }
      gsap.fromTo(el, { height: 0, opacity: 0, overflow: 'hidden' }, {
        height: 'auto', opacity: 1, duration: .5, ease: 'power2.out',
        clearProps: 'height,opacity,overflow', onComplete: refresh
      });
    },
    conceal: function (el, then) {
      gsap.to(el, {
        height: 0, opacity: 0, overflow: 'hidden', duration: .35, ease: 'power2.in',
        onComplete: function () { then(); gsap.set(el, { clearProps: 'height,opacity,overflow' }); refresh(); }
      });
    },
    // "+N" tiles: existing tiles glide to their new places, new ones fade in.
    flip: function (list, change) {
      var state = Flip.getState(list.children);
      change();
      Flip.from(state, {
        duration: .45, ease: 'power2.inOut',
        onEnter: function (els) {
          return gsap.fromTo(els, { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .35, stagger: .015, delay: .05 });
        },
        onComplete: refresh
      });
    }
  };

  // Called by script.js once the loader has counted the page in. Behind the
  // loader: settle the layout and go to the landing spot (the triggers passed
  // on the way play as normal). Then lift the loader and start the hero.
  var entered = false;
  window.__motion.enter = function (loader, finish) {
    if (entered) return;
    entered = true;
    ScrollTrigger.refresh();
    var target = saved !== null ? +saved : hashTarget;
    if (target !== null) lenis.scrollTo(target, { immediate: true, force: true });
    var atTop = scrollY < innerHeight * .5;
    lenis.start(); // the page is in place: scrolling works as soon as the panel starts to move
    loader.classList.add('lifting');
    root.classList.remove('loading'); // the hero's CSS entrance starts as the panel moves
    gsap.to(loader, {
      yPercent: -100, duration: .9, ease: 'expo.inOut',
      onComplete: function () { gsap.set(loader, { clearProps: 'transform' }); finish(); }
    });
    gsap.delayedCall(.45, playHero, [atTop]);
  };
  // Without a loader to hand over (script.js missing, or it never finishes),
  // land and show the hero anyway.
  function enterWithoutLoader() {
    if (entered) return;
    entered = true;
    ScrollTrigger.refresh();
    var target = saved !== null ? +saved : hashTarget;
    if (target !== null) lenis.scrollTo(target, { immediate: true, force: true });
    lenis.start();
    playHero(scrollY < innerHeight * .5);
  }
  if (root.classList.contains('loading')) {
    lenis.stop(); // no scrolling under the loader
    setTimeout(enterWithoutLoader, 8000);
  } else {
    afterLoad(enterWithoutLoader);
  }

  done();
})();
