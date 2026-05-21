/* =================================================================
   B'MY WEBSITE — main.js v3
   Brand DNA edition · Multi-page support
   ================================================================= */

(function () {
  'use strict';

  // -----------------------------------------------------------------
  // LANGUAGE SWITCHER
  // -----------------------------------------------------------------
  const LANG_KEY = 'bmy_lang';
  const supportedLangs = ['es', 'en', 'vi'];

  function applyLang(lang) {
    if (!supportedLangs.includes(lang)) lang = 'es';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-es]').forEach(el => {
      const v = el.dataset[lang === 'es' ? 'es' : lang === 'en' ? 'en' : 'vi'];
      if (v) el.textContent = v;
    });
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function initLang() {
    let saved = 'es';
    try { saved = localStorage.getItem(LANG_KEY) || 'es'; } catch (e) {}
    applyLang(saved);
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  }

  // -----------------------------------------------------------------
  // NAV MOBILE TOGGLE
  // -----------------------------------------------------------------
  function initNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.textContent = menu.classList.contains('open') ? '✕' : '☰';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // -----------------------------------------------------------------
  // HERO CAROUSEL
  // -----------------------------------------------------------------
  function initHero() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    const dotsWrap = document.getElementById('heroDots');
    const prev = document.getElementById('heroPrev');
    const next = document.getElementById('heroNext');
    let idx = 0, timer = null;
    const AUTO_MS = 6500;

    // Build dots
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Slide ' + (i + 1));
        if (i === 0) b.classList.add('is-active');
        b.addEventListener('click', () => go(i));
        dotsWrap.appendChild(b);
      });
    }

    function go(i) {
      slides[idx].classList.remove('is-active');
      if (dotsWrap) dotsWrap.children[idx]?.classList.remove('is-active');
      idx = (i + slides.length) % slides.length;
      slides[idx].classList.add('is-active');
      if (dotsWrap) dotsWrap.children[idx]?.classList.add('is-active');
      restart();
    }
    function nxt() { go(idx + 1); }
    function prv() { go(idx - 1); }
    function restart() { clearInterval(timer); timer = setInterval(nxt, AUTO_MS); }

    next?.addEventListener('click', nxt);
    prev?.addEventListener('click', prv);
    restart();

    // Pause on hover
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mouseenter', () => clearInterval(timer));
      hero.addEventListener('mouseleave', restart);
    }
  }

  // -----------------------------------------------------------------
  // COUNTDOWN
  // -----------------------------------------------------------------
  const LAUNCH = new Date('2026-05-26T11:00:00+02:00').getTime();

  function initCountdown() {
    const d = document.getElementById('cd-days');
    const h = document.getElementById('cd-hours');
    const m = document.getElementById('cd-mins');
    const s = document.getElementById('cd-secs');
    if (!d) return;

    function tick() {
      const dist = LAUNCH - Date.now();
      if (dist < 0) {
        const strip = document.getElementById('countdownStrip');
        if (strip) {
          strip.innerHTML = '<div class="container inner"><span class="label" style="color:var(--yellow)">¡B\'my está abierto! Visítanos en C/ Fernández de los Ríos, 106 · Chamberí</span></div>';
        }
        return;
      }
      const dd = Math.floor(dist / 86400000);
      const hh = Math.floor((dist % 86400000) / 3600000);
      const mm = Math.floor((dist % 3600000) / 60000);
      const ss = Math.floor((dist % 60000) / 1000);
      d.textContent = String(dd).padStart(2, '0');
      h.textContent = String(hh).padStart(2, '0');
      m.textContent = String(mm).padStart(2, '0');
      s.textContent = String(ss).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  }

  // -----------------------------------------------------------------
  // REVEAL ON SCROLL
  // -----------------------------------------------------------------
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach(e => e.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
  }

  // -----------------------------------------------------------------
  // MENU TABS (used on menu.html)
  // -----------------------------------------------------------------
  function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    if (tabs.length === 0) return;
    const groups = document.querySelectorAll('[data-menu-group]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.target;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        groups.forEach(g => g.style.display = (g.dataset.menuGroup === key || key === 'all') ? '' : 'none');
      });
    });
  }

  // -----------------------------------------------------------------
  // NEWSLETTER (placeholder — wires to LP1 form later)
  // -----------------------------------------------------------------
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input?.value.trim();
      if (!email) return;
      // Redirect to bmy.life landing with email pre-filled
      window.open('https://www.bmy.life?email=' + encodeURIComponent(email), '_blank');
      input.value = '';
    });
  }

  // -----------------------------------------------------------------
  // COOKIE BANNER (GDPR/LSSI-CE compliant)
  // -----------------------------------------------------------------
  const COOKIE_KEY = 'bmy_cookie_consent';
  function getConsent() { try { return localStorage.getItem(COOKIE_KEY); } catch(e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(COOKIE_KEY, v); } catch(e) {} }

  function loadGA4() {
    if (window._ga4Loaded) return;
    window._ga4Loaded = true;
    const s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=G-F2EVGFPTL9';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', 'G-F2EVGFPTL9', { anonymize_ip: true });
  }

  function initCookieBanner() {
    const consent = getConsent();
    if (consent === 'accepted') { loadGA4(); return; }
    if (consent === 'rejected') return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-banner-inner">
        <p data-es="Usamos cookies para analizar el tráfico (Google Analytics) y mejorar tu experiencia. Lee nuestra <a href='cookies.html'>política de cookies</a> y <a href='privacy.html'>privacidad</a>."
           data-en="We use cookies to analyze traffic (Google Analytics) and improve your experience. Read our <a href='cookies.html'>cookie policy</a> and <a href='privacy.html'>privacy policy</a>."
           data-vi="Chúng tôi dùng cookies để phân tích truy cập (Google Analytics) và cải thiện trải nghiệm. Đọc <a href='cookies.html'>chính sách cookies</a> và <a href='privacy.html'>bảo mật</a>.">
          Usamos cookies para analizar el tráfico (Google Analytics) y mejorar tu experiencia. Lee nuestra <a href="cookies.html">política de cookies</a> y <a href="privacy.html">privacidad</a>.
        </p>
        <div class="actions">
          <button class="btn btn-outline" id="cookie-reject" data-es="Rechazar" data-en="Reject" data-vi="Từ chối">Rechazar</button>
          <button class="btn btn-primary" id="cookie-accept" data-es="Aceptar" data-en="Accept" data-vi="Đồng ý">Aceptar</button>
        </div>
      </div>`;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('is-visible'));
    // Re-apply current lang to banner
    const curLang = (function(){ try { return localStorage.getItem(LANG_KEY) || 'es'; } catch(e) { return 'es'; } })();
    banner.querySelectorAll('[data-es]').forEach(el => {
      const v = el.dataset[curLang === 'es' ? 'es' : curLang === 'en' ? 'en' : 'vi'];
      if (v) el.innerHTML = v;
    });

    document.getElementById('cookie-accept').addEventListener('click', () => {
      setConsent('accepted'); loadGA4();
      banner.classList.remove('is-visible'); setTimeout(() => banner.remove(), 400);
    });
    document.getElementById('cookie-reject').addEventListener('click', () => {
      setConsent('rejected');
      banner.classList.remove('is-visible'); setTimeout(() => banner.remove(), 400);
    });
  }

  // -----------------------------------------------------------------
  // WHATSAPP I18N — đổi prefilled text theo ngôn ngữ
  // -----------------------------------------------------------------
  const WA_MESSAGES = {
    es: "Hola B'my 👋 quiero saber más sobre vuestro menú",
    en: "Hi B'my 👋 I'd love to know more about your menu",
    vi: "Chào B'my 👋 mình muốn biết thêm về menu"
  };
  function updateWhatsAppLinks() {
    const lang = (function(){ try { return localStorage.getItem(LANG_KEY) || 'es'; } catch(e){ return 'es'; } })();
    const text = encodeURIComponent(WA_MESSAGES[lang] || WA_MESSAGES.es);
    document.querySelectorAll('a[href*="wa.me/34604110755"]').forEach(a => {
      const base = a.getAttribute('href').split('?')[0];
      a.setAttribute('href', `${base}?text=${text}`);
    });
  }

  // -----------------------------------------------------------------
  // RESERVATION FORM → WhatsApp
  // -----------------------------------------------------------------
  function initReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form || !form.querySelector('[name="nombre"]')) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const get = n => (form.querySelector(`[name="${n}"]`) || {}).value || '';
      const lang = (function(){ try { return localStorage.getItem(LANG_KEY) || 'es'; } catch(e){ return 'es'; } })();
      const L = {
        es: { t: 'NUEVA RESERVA · B\'my', name: 'Nombre', email: 'Email', tel: 'Teléfono', ppl: 'Personas', date: 'Fecha', time: 'Hora', msg: 'Mensaje' },
        en: { t: 'NEW RESERVATION · B\'my', name: 'Name', email: 'Email', tel: 'Phone', ppl: 'Guests', date: 'Date', time: 'Time', msg: 'Message' },
        vi: { t: 'ĐẶT BÀN MỚI · B\'my', name: 'Tên', email: 'Email', tel: 'ĐT', ppl: 'Số người', date: 'Ngày', time: 'Giờ', msg: 'Ghi chú' }
      }[lang] || {};
      let msg = `*${L.t}*\n\n`;
      msg += `${L.name}: ${get('nombre')}\n`;
      msg += `${L.email}: ${get('email')}\n`;
      msg += `${L.tel}: ${get('telefono')}\n`;
      msg += `${L.ppl}: ${get('personas')}\n`;
      msg += `${L.date}: ${get('fecha')}\n`;
      msg += `${L.time}: ${get('hora')}\n`;
      const extra = get('mensaje');
      if (extra) msg += `${L.msg}: ${extra}\n`;
      window.open(`https://wa.me/34604110755?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // -----------------------------------------------------------------
  // INIT
  // -----------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initNav();
    initHero();
    initCountdown();
    initReveal();
    initMenuTabs();
    initNewsletter();
    initReservationForm();
    initCookieBanner();
    updateWhatsAppLinks();
    // Refresh WA links when language changes
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.addEventListener('click', () => setTimeout(updateWhatsAppLinks, 50));
    });
    console.log("B'My Website Loaded — Opening 26 May 2026");
  });
})();
