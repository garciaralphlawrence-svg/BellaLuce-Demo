/* BellaLucè — motion layer (GSAP + ScrollTrigger + SplitText + Lenis) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body, loader = $('#loader');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const done = () => { body.classList.remove('is-loading'); if (loader) loader.remove(); };
  if (reduce || !window.gsap || !window.ScrollTrigger) { done(); return; }

  try {
    document.documentElement.classList.add('js');
    gsap.registerPlugin(ScrollTrigger, ...(window.SplitText ? [SplitText] : []));
    const E = 'power4.out', E2 = 'expo.out';

    /* smooth scroll */
    let lenis = null;
    if (window.Lenis) {
      lenis = new Lenis({ duration: 1.2, smoothWheel: true, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
      $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
        const id = a.getAttribute('href'); if (id.length < 2) return;
        const t = $(id); if (!t) return; e.preventDefault(); lenis.scrollTo(t, { offset: id === '#top' ? 0 : -70, duration: 1.4 });
      }));
    }

    /* nav hides on scroll down */
    const nav = $('#nav'); let lastY = 0;
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { const y = s.scroll(); nav.classList.toggle('hide', y > 300 && y > lastY && !$('#links').classList.contains('open')); lastY = y; } });


    /* hero intro (plays as the loader lifts) */
    $$('#heroTitle .ln').forEach(l => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.innerHTML = l.innerHTML; l.innerHTML = ''; l.appendChild(s); });
    const intro = gsap.timeline({ paused: true })
      .from('#heroArch', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)', duration: 1.6, ease: 'expo.inOut' }, 0)
      .from('#heroArch img', { scale: 1.3, duration: 2.2, ease: E2 }, 0)
      .from($$('#heroTitle .ln > span'), { yPercent: 112, duration: 1.4, stagger: .12, ease: E2 }, .45)
      .from('.eyebrow span', { y: 16, opacity: 0, duration: 1, stagger: .08, ease: E2 }, .7)
      .from('.hero-lede, .hero-cta > *, .arch-cap', { y: 24, opacity: 0, duration: 1.1, stagger: .08, ease: E2 }, .9)
      .from('.hero-col', { y: 80, opacity: 0, duration: 2, ease: E2 }, .6)
      .from('.hero-bar', { opacity: 0, y: 14, duration: 1, ease: E2 }, 1.1)
      .from('.nav > *', { y: -20, opacity: 0, duration: 1, stagger: .05, ease: E2 }, 1)
      .add(() => { lenis && lenis.start(); ScrollTrigger.refresh(); }, 1.2);

    /* preloader: column rises, wordmark fades, counter, curtain lift */
    const cnt = { v: 0 }, countEl = $('#loadCount');
    const pre = gsap.timeline({ onComplete: () => { done(); if (intro.progress() === 0) intro.play(); } })
      .from('.l-col img', { yPercent: 105, duration: 1.2, ease: E2 })
      .from('.l-word', { opacity: 0, y: 14, filter: 'blur(6px)', duration: 1, ease: E }, '-=.5')
      .to(cnt, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => { countEl.textContent = Math.round(cnt.v); } }, 0)
      .to('.loader-mark', { y: -30, opacity: 0, duration: .6, ease: 'power3.in' }, '+=.15')
      .to('.loader-count', { opacity: 0, duration: .4 }, '<')
      .to('#loader', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=.15')
      .add(() => intro.play(), '<.35');
    setTimeout(() => { if (document.body.contains(loader)) pre.progress(1); }, 6000);

    /* hero subtle parallax out */
    gsap.to('#heroArch img', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-col', { yPercent: -30, rotate: -4, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });

    /* headings, labels, fades */
    const splitHeads = () => $$('h2.split').forEach(h => SplitText.create(h, { type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: self => gsap.from(self.lines, { yPercent: 105, duration: 1.3, stagger: .1, ease: E2, scrollTrigger: { trigger: h, start: 'top 85%' } }) }));
    (document.fonts ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2500))]) : Promise.resolve()).then(() => { splitHeads(); ScrollTrigger.refresh(); });
    $$('.label').forEach(l => gsap.from(l, { opacity: 0, x: -16, duration: 1, ease: E, scrollTrigger: { trigger: l, start: 'top 90%' } }));
    $$('.fade-up').forEach(el => gsap.from(el, { y: 36, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: el, start: 'top 90%' } }));

    /* statement words fill + pillars */
    const bq = $('#bigQuote');
    if (bq) gsap.to(new SplitText(bq, { type: 'words', wordsClass: 'w' }).words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: bq, start: 'top 78%', end: 'bottom 45%', scrub: true } });
    gsap.from('.pillars li', { y: 40, opacity: 0, duration: 1.2, stagger: .1, ease: E, scrollTrigger: { trigger: '.pillars', start: 'top 85%' } });

    /* treatments: pinned horizontal (desktop) */
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1025px)', () => {
      const track = $('#treatTrack');
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#treatPin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
      $$('.t-panel').forEach(p => {
        gsap.fromTo(p.querySelector('.t-img img'), { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        gsap.from(p.querySelectorAll('.t-body > *, .t-body li'), { y: 30, opacity: 0, duration: 1, stagger: .05, ease: E, scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 75%' } });
      });
    });
    mm.add('(max-width: 1024px)', () => {
      $$('.t-panel').forEach(p => gsap.from(p, { y: 60, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: p, start: 'top 88%' } }));
    });

    /* arch reveals (their reception arch motif) */
    $$('.reveal-arch').forEach(a => {
      const img = a.querySelector('img');
      gsap.timeline({ scrollTrigger: { trigger: a, start: 'top 80%' } })
        .from(a, { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)', duration: 1.6, ease: 'expo.inOut' })
        .from(img, { scale: 1.3, duration: 2.2, ease: E2 }, 0);
      gsap.to(img, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: a, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.to('.hifu-col', { yPercent: 40, rotate: 6, ease: 'none', scrollTrigger: { trigger: '.hifu', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.price', { opacity: 0, y: 30, duration: 1.2, ease: E, scrollTrigger: { trigger: '.price', start: 'top 90%' } });

    /* hair masks */
    $$('.mask').forEach((m, i) => {
      const img = m.querySelector('img');
      gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 85%' } })
        .from(m, { clipPath: i ? 'inset(0% 0% 0% 100%)' : 'inset(0% 0% 100% 0%)', duration: 1.4, ease: 'expo.inOut', delay: i * .2 })
        .to(img, { scale: 1, duration: 2, ease: E2 }, 0);
    });

    /* band: auto + scroll velocity */
    const band = $('#band');
    if (band) {
      const loop = gsap.to(band, { xPercent: -33.333, duration: 30, ease: 'none', repeat: -1 });
      ScrollTrigger.create({ trigger: '.band', start: 'top bottom', end: 'bottom top', onUpdate: s => {
        const v = Math.min(Math.abs(s.getVelocity()) / 300, 5);
        gsap.to(loop, { timeScale: (s.direction < 0 ? -1 : 1) * (1 + v), duration: .3, overwrite: true });
        gsap.to(loop, { timeScale: s.direction < 0 ? -1 : 1, duration: 1.2, delay: .3 });
      } });
    }

    /* results polaroids drop in */
    gsap.from('.pol', { y: 120, rotate: i => [-12, 9, -7, 10][i] || 0, opacity: 0, duration: 1.6, stagger: .12, ease: E2, scrollTrigger: { trigger: '.pols', start: 'top 82%' } });

    /* celebrate silk drift */
    gsap.fromTo('.silk img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.celebrate', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* finder */
    gsap.from('.concern', { y: 16, opacity: 0, duration: .7, stagger: .03, ease: E, scrollTrigger: { trigger: '.concerns', start: 'top 88%' } });
    gsap.from('.finder-out', { y: 50, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: '.finder-out', start: 'top 88%' } });

    /* map arch + cta column */
    gsap.from('.map', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '.map', start: 'top 85%' } });
    gsap.from('.cta-col', { y: 60, opacity: 0, duration: 1.6, ease: E2, scrollTrigger: { trigger: '.cta-col', start: 'top 90%' } });
    gsap.from('.foot-logo', { y: 30, opacity: 0, duration: 1.4, ease: E2, scrollTrigger: { trigger: '.foot', start: 'top 90%' } });

    /* magnetic buttons */
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      $$('.magnetic').forEach(b => {
        const xTo = gsap.quickTo(b, 'x', { duration: .6, ease: 'elastic.out(1,.4)' }), yTo = gsap.quickTo(b, 'y', { duration: .6, ease: 'elastic.out(1,.4)' });
        b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .3); yTo((e.clientY - r.top - r.height / 2) * .4); });
        b.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
      });
    }

    /* pause smooth scroll while the booking modal is open */
    new MutationObserver(() => { if (!lenis) return; !$('#book').hidden ? lenis.stop() : (!$('#links').classList.contains('open') && lenis.start()); })
      .observe($('#book'), { attributes: true, attributeFilter: ['hidden'] });

    addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  } catch (err) {
    console.error(err); document.documentElement.classList.remove('js'); done();
  }
})();
