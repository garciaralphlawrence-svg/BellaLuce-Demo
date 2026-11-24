(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MSGR = 'https://m.me/61592434042538';
  const PHONE = '09151205837', PHONE_D = '0915 120 5837', EMAIL = 'bellaluceantipolo@gmail.com';
  const ADDR = 'Unit A, 2nd Floor, Suburbia Building, Sumulong Highway, Brgy. Sta. Cruz, Antipolo City';

  /* ===== Menu (from BellaLucè's own "Menu: Skin Treatments" posters) ===== */
  const CATS = [
    { id: 'facials', tab: 'Facials', img: 't-facial', cap: 'Cleanse, refresh, glow.', items: [
      ['Hydra Oxy Facial', 'Deeply cleanses, moisturizes and revitalizes dull-looking skin for a fresh, radiant glow.'],
      ['JetCare Facial', 'A gentle treatment that helps remove impurities and replenish hydration.'],
      ['Diamond Glow', 'Gently exfoliates dead skin cells, unclogs pores and boosts radiance.'],
      ['Acne Facial', 'For acne-prone skin: helps cleanse pores, reduce buildup and calm breakouts.'],
      ['Basic Facial', 'Non-invasive treatment that cleanses, exfoliates and moisturizes the face.']] },
    { id: 'doctor', tab: 'Doctor’s procedures', img: 't-botox', cap: 'Doctor-led, after consultation.', items: [
      ['Botox', 'Helps soften the appearance of fine lines and wrinkles.'],
      ['Subcision', 'Releases fibrous bands beneath depressed acne scars to help smooth texture.'],
      ['TCA Cross', 'A targeted chemical treatment for deep, narrow acne scars.'],
      ['Skin Boosters', 'Injectables that improve hydration and texture for a plumper, radiant look.']] },
    { id: 'laser', tab: 'Laser treatments', img: 't-laser', cap: 'Clearer, brighter, smoother.', items: [
      ['CO2 Fractional Laser', 'Helps improve acne scars, enlarged pores, fine lines and uneven texture.'],
      ['Pico Laser', 'Targets unwanted pigmentation, dark spots and uneven skin tone.'],
      ['Carbon Laser', 'Deep-cleanses pores, reduces excess oil and refines texture.'],
      ['Diode Hair Removal', 'Targets hair follicles to reduce unwanted hair over multiple sessions.']] },
    { id: 'sculpt', tab: 'Face & body sculpt', img: 't-face', cap: 'Lift, firm, contour.', items: [
      ['Bella-V HIFU MAX', 'Lifting, firming and facial contouring.'],
      ['Ultra RF Exilift', 'Skin tightening and improved skin elasticity.'],
      ['EMS Ultra Sculpt', 'Muscle tightening, toning and definition.'],
      ['Signature Meso Body', 'Injectable treatment for localized fat deposits.'],
      ['Lemon Bottle Meso', 'Targeted fat reduction and body contouring.']] },
    { id: 'other', tab: 'Glow, drips & hair', img: 't-drip', cap: 'Wellness from within.', items: [
      ['Bella Pink Glow', 'For dull skin: a more radiant complexion and a fresh look.'],
      ['Lucé Drip', 'Beauty drip with nutrients and vitamins to support overall wellness.'],
      ['Brightening Chemical Peel', 'Removes dead skin cells and improves the look of acne marks.'],
      ['PRP Microneedling', 'Skin rejuvenation and collagen stimulation.'],
      ['Korean Haircial', 'Deep scalp cleansing and hair nourishment.'],
      ['Exosome Hair Growth', 'Supports scalp health for thinning hair or hair loss.'],
      ['Warts Removal', 'Removes unwanted warts and improves the look of affected skin.']] }
  ];
  const ALL = CATS.flatMap(c => c.items.map(([n, d]) => ({ n, d, cat: c.tab })));
  ALL.push({ n: 'Skin Assessment', d: 'Personalized recommendations for your skin', cat: 'Start here' }, { n: 'Underarm Whitening Combo', d: 'Carbon Laser + Pico Laser for even-toned underarms', cat: 'Laser treatments' }, { n: 'Dark Marks Revision', d: 'Fades stubborn dark marks and hyperpigmentation', cat: 'Laser treatments' }, { n: 'Body Contour Package', d: 'EMSlim, Ultra Body RF and Mesolipo', cat: 'Face & body sculpt' });

  $('#treatTrack').innerHTML = `<div class="t-intro"><p>Five chapters of care, from your first facial to doctor-led procedures.</p><span class="t-hint">Keep scrolling <i>→</i></span></div>` +
    CATS.map((c, i) => `<article class="t-panel"><div class="t-img"><img src="assets/img/${c.img}.webp" alt="${esc(c.tab)} at BellaLucè" loading="lazy"></div><div class="t-body"><p class="t-num">${['I', 'II', 'III', 'IV', 'V'][i]} — ${esc(c.tab)}</p><h3>${esc(c.cap)}</h3><ul>${c.items.map(([n, d]) => `<li><button data-book="${esc(n)}"><b>${esc(n)}</b><span>${esc(d)}</span><i aria-hidden="true">↗</i></button></li>`).join('')}</ul></div></article>`).join('');

  const mq = ['Glow beyond skin deep', 'Hydra Oxy', 'Pico Laser', 'Bella-V HIFU MAX', 'Korean Haircial', 'Bella Pink Glow'];
  $('#band').innerHTML = [...mq, ...mq, ...mq].map(t => `<span>${esc(t)}</span>`).join('');

  /* ===== Results (their own before/after posts) ===== */
  const RES = [['r1', 'Leg dark marks', 'Bella-Pico whitening laser'], ['r2', 'Acne protocol', 'Acne, texture & dark marks'], ['r3', 'Bella-V HIFU MAX', 'After the 1st session'], ['r4', 'Exosome hair growth', 'Fuller-looking scalp']];
  $('#pols').innerHTML = RES.map(([f, k, t], i) => `<figure class="pol p${i}"><img src="assets/img/${f}.webp" alt="${esc(k)} before and after, as posted on BellaLucè's Facebook page" loading="lazy" width="1200" height="1500"><figcaption><small>${esc(k)}</small>${esc(t)}</figcaption></figure>`).join('');

  /* ===== Finder ===== */
  const CON = [
    ['Acne & breakouts', 'Calm breakouts and clear congestion.', ['Acne Facial', 'Carbon Laser', 'Brightening Chemical Peel']],
    ['Acne scars', 'Smoother-looking texture over time.', ['CO2 Fractional Laser', 'Subcision', 'TCA Cross']],
    ['Dark spots & marks', 'Brighter, more even-looking skin.', ['Pico Laser', 'Dark Marks Revision']],
    ['Dark underarms', 'Even tone and smoother texture.', ['Underarm Whitening Combo', 'Diode Hair Removal']],
    ['Unwanted hair', 'Less shaving, smoother skin.', ['Diode Hair Removal']],
    ['Dull, tired skin', 'A fresh, radiant reset.', ['Hydra Oxy Facial', 'Bella Pink Glow', 'Lucé Drip']],
    ['Fine lines', 'Softer-looking lines and wrinkles.', ['Botox', 'Skin Boosters']],
    ['Sagging, double chin', 'Lift, firm and define.', ['Bella-V HIFU MAX', 'Ultra RF Exilift']],
    ['Stubborn fat', 'Tone and contour your curves.', ['Body Contour Package', 'Lemon Bottle Meso', 'EMS Ultra Sculpt']],
    ['Thinning hair', 'Care for your scalp and hair.', ['Korean Haircial', 'Exosome Hair Growth']],
    ['Not sure yet', 'Start with a skin assessment.', ['Skin Assessment']]
  ];
  const out = $('#finderOut');
  const empty = () => { out.innerHTML = `<div class="empty"><div><img src="assets/img/column-ivory.png" alt="" width="64" height="62"><span>Your matches</span>Choose a concern<br>to begin.</div></div>`; };
  $('#concerns').innerHTML = CON.map((c, i) => `<button class="concern" aria-pressed="false" data-c="${i}">${esc(c[0])}</button>`).join('');
  $('#concerns').addEventListener('click', e => {
    const b = e.target.closest('[data-c]'); if (!b) return;
    const was = b.getAttribute('aria-pressed') === 'true';
    $$('.concern').forEach(x => x.setAttribute('aria-pressed', 'false'));
    if (was) return empty();
    b.setAttribute('aria-pressed', 'true');
    const [t, why, refs] = CON[+b.dataset.c];
    out.innerHTML = `<h3>${esc(t)}</h3><p class="why">${esc(why)}</p>` + refs.map(n => ALL.find(x => x.n === n)).map((it, i) =>
      `<div class="pick" style="animation-delay:${i * 70}ms"><div><b>${esc(it.n)}</b><small>${esc(it.d)}</small></div><button data-book="${esc(it.n)}">Book</button></div>`).join('') +
      `<p class="note-s">Suggestions only. Your BellaLucè team confirms the right treatment after assessment.</p>`;
  });
  empty();

  /* ===== FAQ ===== */
  const FAQ = [
    ['What are your clinic hours?', 'Monday to Sunday, 11AM to 8PM. We are closed every Wednesday. Last call is 6PM for multiple treatments and 7PM for a single treatment.'],
    ['Do you accept walk-ins?', 'Yes, walk-ins are welcome subject to availability. Booking ahead secures your preferred time.'],
    ['Who performs Botox and doctor’s procedures?', 'Botox is administered by a licensed dermatologist. Suitability, dosage and injection sites are determined by the attending dermatologist after consultation.'],
    ['How much are your treatments?', 'Rates depend on your treatment plan, and we regularly post packages and promos on our page. Message us on Facebook or call 0915 120 5837 for current rates.'],
    ['Can I book the clinic for a bridal shower?', 'Yes. Our bridal party package includes 2 hours exclusive use of the clinic, 3 hours al fresco use, and photo or video teams are welcome.'],
    ['Where exactly are you?', 'Unit A, 2nd Floor, Suburbia Building, Sumulong Highway, Brgy. Sta. Cruz, Antipolo City, near Starbucks.']
  ];
  $('#faqList').innerHTML = FAQ.map(([q, a], i) => `<details class="fade-up"${i === 0 ? ' open' : ''}><summary>${esc(q)}<i aria-hidden="true"></i></summary><p>${esc(a)}</p></details>`).join('');

  /* ===== Open now (11AM–8PM, closed Wed, Manila) ===== */
  const setOpen = () => {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date());
    const day = p.find(x => x.type === 'weekday').value, hr = +p.find(x => x.type === 'hour').value % 24, el = $('#openNow');
    const open = day !== 'Wed' && hr >= 11 && hr < 20;
    el.classList.toggle('on', open);
    el.textContent = day === 'Wed' ? 'Closed today (Wednesday) · open Thu 11AM' : open ? 'Open now · until 8PM' : hr < 11 ? 'Opens today at 11AM' : 'Closed now · opens 11AM';
  };
  setOpen(); setInterval(setOpen, 60000);

  /* ===== Nav ===== */
  const nav = $('#nav'), burger = $('#burger'), links = $('#links');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const closeNav = () => { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; window.__lenis?.start(); };
  burger.addEventListener('click', () => { const o = !links.classList.contains('open'); links.classList.toggle('open', o); burger.setAttribute('aria-expanded', String(o)); document.body.style.overflow = o ? 'hidden' : ''; o ? window.__lenis?.stop() : window.__lenis?.start(); });
  $$('a, button', links).forEach(a => a.addEventListener('click', closeNav));

  /* ===== Booking ===== */
  const modal = $('#book'), svc = $('#bkSvc');
  svc.innerHTML = '<option value="">Choose a treatment…</option><option>Skin Assessment (not sure yet)</option>' + CATS.map(c => `<optgroup label="${esc(c.tab)}">` + c.items.map(([n]) => `<option>${esc(n)}</option>`).join('') + '</optgroup>').join('') + '<optgroup label="Packages"><option>Underarm Whitening Combo</option><option>Body Contour Package</option><option>Bridal party package</option></optgroup>';
  let cur = 0, date = null, time = null, viewM = new Date(); viewM.setDate(1);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxD = new Date(today); maxD.setDate(maxD.getDate() + 60);
  const SLOTS = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
  const fmtD = d => d.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const renderCal = () => {
    const y = viewM.getFullYear(), m = viewM.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    const prevOk = new Date(y, m, 1) > today, nextOk = new Date(y, m + 1, 1) <= maxD;
    let h = `<div class="cal-h"><button data-m="-1" ${prevOk ? '' : 'disabled'} aria-label="Previous month">‹</button>${viewM.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}<button data-m="1" ${nextOk ? '' : 'disabled'} aria-label="Next month">›</button></div><div class="cal-g">`;
    h += ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<span>${d}</span>`).join('') + '<i></i>'.repeat(first);
    for (let d = 1; d <= days; d++) { const dt = new Date(y, m, d), off = dt < today || dt > maxD || dt.getDay() === 3; h += `<button data-d="${d}" ${off ? 'disabled' : ''} class="${date && +dt === +date ? 'sel' : ''}" aria-label="${fmtD(dt)}${dt.getDay() === 3 ? ' (closed)' : ''}">${d}</button>`; }
    $('#cal').innerHTML = h + '</div>';
  };
  $('#cal').addEventListener('click', e => {
    const m = e.target.closest('[data-m]'); if (m && !m.disabled) { viewM.setMonth(viewM.getMonth() + +m.dataset.m); renderCal(); return; }
    const d = e.target.closest('[data-d]'); if (d && !d.disabled) { date = new Date(viewM.getFullYear(), viewM.getMonth(), +d.dataset.d); renderCal(); clearErr(); }
  });
  $('#slots').innerHTML = SLOTS.map(s => `<button data-s="${s}">${s}</button>`).join('');
  $('#slots').addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (!b) return; time = b.dataset.s; $$('#slots button').forEach(x => x.classList.toggle('sel', x === b)); clearErr(); });
  const clearErr = () => $$('.err', modal).forEach(x => x.remove());
  const err = (el, t) => { clearErr(); const p = document.createElement('p'); p.className = 'err'; p.textContent = t; el.after(p); };
  const msgText = () => {
    const l = ['Hi BellaLucè! I’d like to book an appointment.', '', 'Treatment: ' + svc.value];
    if (date) l.push('Preferred date: ' + fmtD(date)); if (time) l.push('Preferred time: ' + time);
    l.push('Name: ' + $('#bkName').value.trim(), 'Mobile: ' + $('#bkPhone').value.trim());
    const n = $('#bkNote').value.trim(); if (n) l.push('My goals: ' + n);
    l.push('', 'May I also ask for your current rates? Thank you!'); return l.join('\n');
  };
  const show = i => {
    cur = i; $$('.step', modal).forEach(s => s.hidden = +s.dataset.step !== i); $$('#dots li').forEach((l, k) => l.classList.toggle('on', k <= i));
    $('#bkBack').style.visibility = i ? 'visible' : 'hidden'; $('#bkNext').style.display = i === 3 ? 'none' : ''; $('#bkNext span').textContent = i === 2 ? 'Review' : 'Next';
    if (i === 1) renderCal();
    if (i === 3) { const t = msgText(); $('#bkMsg').textContent = t; $('#sendSms').href = 'sms:' + PHONE + '?&body=' + encodeURIComponent(t); $('#sendMail').href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Appointment request – ' + svc.value) + '&body=' + encodeURIComponent(t); $('#copied').textContent = ''; }
  };
  $('#bkNext').addEventListener('click', () => {
    if (cur === 0 && !svc.value) return err(svc.parentElement, 'Please choose a treatment (or “Skin Assessment”).');
    if (cur === 1 && (!date || !time)) return err($('#slots'), 'Please pick a date and a time.');
    if (cur === 2) { if ($('#bkName').value.trim().length < 2) return err($('#bkName').parentElement, 'Please enter your name.'); if (!/^[0-9+()\s-]{7,20}$/.test($('#bkPhone').value.trim())) return err($('#bkPhone').parentElement, 'Please enter a valid mobile number.'); }
    clearErr(); show(cur + 1);
  });
  $('#bkBack').addEventListener('click', () => { clearErr(); show(Math.max(0, cur - 1)); });
  $('#sendMsgr').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(msgText()); $('#copied').textContent = 'Copied! Paste it in the Messenger chat that just opened.'; } catch { $('#copied').textContent = 'Opening Messenger. Copy the message above and paste it there.'; }
    window.open(MSGR, '_blank', 'noopener');
  });
  $('#sendIcs').addEventListener('click', () => {
    if (!date || !time) return;
    const [hm, ap] = time.split(' '); let [hh] = hm.split(':').map(Number); if (ap === 'PM' && hh !== 12) hh += 12;
    const p = n => String(n).padStart(2, '0'), d = `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BellaLuce//Booking//EN', 'BEGIN:VEVENT', 'UID:' + Date.now() + '@bellaluce', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
      `DTSTART;TZID=Asia/Manila:${d}T${p(hh)}0000`, `DTEND;TZID=Asia/Manila:${d}T${p(hh + 1)}0000`, 'SUMMARY:BellaLucè – ' + svc.value.replace(/[,;]/g, ' '),
      'LOCATION:' + ADDR.replace(/,/g, '\\,'), 'DESCRIPTION:Requested schedule – wait for BellaLucè to confirm. ' + PHONE_D, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'bellaluce-visit.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  let lastFocus = null;
  const openBook = pre => {
    lastFocus = document.activeElement; closeChat();
    if (pre) { const o = [...svc.options].find(o => o.value === pre) || [...svc.options].find(o => o.value && o.value.toLowerCase().includes(pre.toLowerCase().split(' ')[0])); if (o) svc.value = o.value; }
    modal.hidden = false; document.body.style.overflow = 'hidden'; show(0); svc.focus();
  };
  const closeBook = () => { modal.hidden = true; document.body.style.overflow = ''; lastFocus?.focus?.(); };
  document.addEventListener('click', e => { const b = e.target.closest('[data-book]'); if (b) { e.preventDefault(); openBook(b.dataset.book); } });
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) closeBook(); });

  /* ===== Ask BellaLucè (keyword assistant) ===== */
  const chat = $('#chat'), log = $('#chatLog');
  const say = (h, who = 'bot') => { const d = document.createElement('div'); d.className = 'bub ' + who; if (who === 'me') d.textContent = h; else d.innerHTML = h; log.appendChild(d); log.scrollTop = log.scrollHeight; };
  const BOOK = ` <a href="#" data-book>Book an appointment</a> or message us on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>.`;
  const KB = [
    [/hour|open|close|wednesday|time|bukas|sarado|oras|walk|last call/, () => `We're open <b>Monday to Sunday, 11AM to 8PM</b>, and <b>closed every Wednesday</b>. Last call is 6PM for multiple treatments, 7PM for a single treatment. Walk-ins welcome, subject to availability.`],
    [/where|address|location|saan|map|direction|antipolo|sumulong|suburbia|park/, () => `We're at <b>Unit A, 2nd Floor, Suburbia Building, Sumulong Highway, Brgy. Sta. Cruz, Antipolo City</b>, near Starbucks. <a href="#visit">See the map</a>.`],
    [/price|how much|magkano|cost|rate|promo|package|discount/, () => `Rates depend on your treatment plan, and we post packages and promos on our page. Message us on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a> or call <a href="tel:+639151205837">0915 120 5837</a> for current rates.`],
    [/contact|phone|number|call|\btext\b|email|instagram|\big\b|tiktok|messenger/, () => `Call or text <a href="tel:+639151205837">0915 120 5837</a>, email <a href="mailto:${EMAIL}">${EMAIL}</a>, or find us on Instagram <b>@bellaluce_antipolo</b> and TikTok <b>@bellaluce2026_</b>.`],
    [/book|appoint|reserve|sched|pa-book/, () => `Easy: choose a treatment, pick a time, and we confirm by message.` + BOOK],
    [/hifu|lift|sag|jaw|double chin|firm/, () => `<b>Bella-V HIFU MAX</b> is our non-invasive facelift treatment for lifting, firming and facial contouring of the face, neck and jawline.` + BOOK],
    [/botox|wrinkle|fine line|doctor|derma/, () => `Botox and doctor’s procedures are performed by a <b>licensed dermatologist</b> after consultation. We also offer Subcision, TCA Cross and Skin Boosters.`],
    [/pico|dark|spot|pigment|underarm|kili|whiten/, () => `For dark spots and marks we use <b>Pico Laser</b>, and for underarms our <b>Underarm Whitening Combo</b> (Carbon + Pico Laser).` + BOOK],
    [/hair remov|diode|shav|brazilian|wax/, () => `<b>Diode Hair Removal</b> targets hair follicles to reduce unwanted hair over multiple sessions, including underarm and Brazilian.`],
    [/acne|pimple|scar|tigyawat|pores/, () => `For acne we have the <b>Acne Facial</b> and <b>Carbon Laser</b>; for scars, <b>CO2 Fractional Laser</b>, <b>Subcision</b> and <b>TCA Cross</b>.`],
    [/facial|hydra|glow|dull|diamond|jetcare/, () => `Our facials: <b>Hydra Oxy</b>, <b>JetCare</b>, <b>Diamond Glow</b>, <b>Acne Facial</b> and <b>Basic Facial</b>, plus the <b>Bella Pink Glow</b> for dull skin.`],
    [/hair|scalp|thin|haircial|prp|exosome/, () => `For hair and scalp: <b>Scalp Analysis</b>, <b>Korean Haircial</b>, the <b>PRP Hair Growth Program</b> and <b>Exosome Hair Growth</b>.`],
    [/fat|slim|body|sculpt|contour|tummy|lemon/, () => `For body: <b>EMS Ultra Sculpt</b>, <b>Ultra RF</b>, <b>Signature Meso Body</b> and <b>Lemon Bottle Meso</b>, also as a Body Contour Package.`],
    [/drip|gluta|iv\b|vitamin/, () => `Our <b>Lucé Drip</b> is a beauty drip with nutrients and vitamins to support overall wellness.`],
    [/bridal|wedding|bride|shower|party|celebrat/, () => `Yes! Bridal party packages include exclusive use of the clinic and our al fresco area. <a href="#celebrate">See celebrations</a>.`],
    [/hi|hello|good|kumusta|hey/, () => `Hi! ✨ Ask me about treatments, hours, location or booking.`]
  ];
  const QUICK = ['Hours', 'Location', 'Prices', 'HIFU', 'Dark spots', 'Hair removal', 'Book'];
  $('#chatQuick').innerHTML = QUICK.map(t => `<button data-q="${t}">${t}</button>`).join('');
  const answer = t => { say(t, 'me'); const hit = KB.find(([re]) => re.test(t.toLowerCase())); setTimeout(() => say(hit ? hit[1]() : `I'm not sure about that one. Our team can answer on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a> or at <a href="tel:+639151205837">0915 120 5837</a>.`), 350); };
  let greeted = false;
  const openChat = () => { chat.hidden = false; if (!greeted) { greeted = true; say('Hi, welcome to BellaLucè! ✨ I can help with treatments, hours and booking.'); } $('#chatIn').focus(); };
  function closeChat() { chat.hidden = true; }
  document.addEventListener('click', e => { if (e.target.closest('[data-chat]')) { e.preventDefault(); openChat(); } });
  chat.addEventListener('click', e => { if (e.target.closest('.x')) closeChat(); const b = e.target.closest('[data-q]'); if (b) answer(b.dataset.q); });
  $('#chatForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (!v) return; $('#chatIn').value = ''; answer(v); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { if (!modal.hidden) closeBook(); else if (!chat.hidden) closeChat(); else closeNav(); } });
})();
