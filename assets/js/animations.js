/* =====================================================================
   MAHENDRAN — ANIMATIONS
   Scroll reveals, counters, marquee setup, magnetic buttons,
   scroll progress bar. Vanilla JS, no dependencies.
===================================================================== */

(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll reveal (generic + word-reveal headings) ---- */
  function initReveal(){
    const targets = document.querySelectorAll('.reveal, .word-reveal, .mask-reveal');
    if (!targets.length) return;
    if (reduceMotion){
      targets.forEach(t => t.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
    targets.forEach(t => io.observe(t));
  }

  /* ---- Wrap heading text into spans for word-by-word reveal ---- */
  function initWordReveal(){
    document.querySelectorAll('[data-word-reveal]').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((w, i) =>
        `<span class="word-reveal" style="transition-delay:${i * 0.05}s"><span>${w}</span></span>`
      ).join(' ');
    });
    // re-run reveal observer to catch new nodes
    document.querySelectorAll('[data-word-reveal] .word-reveal').forEach(el => {
      if (reduceMotion){ el.classList.add('is-visible'); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
        });
      }, { threshold:0.4 });
      io.observe(el);
    });
  }

  /* ---- Number counters ---- */
  function initCounters(){
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        if (reduceMotion){ el.textContent = target + suffix; io.unobserve(el); return; }
        const duration = 1200;
        const start = performance.now();
        function tick(now){
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold:0.5 });
    counters.forEach(el => io.observe(el));
  }

  /* ---- Marquee: duplicate content so the loop is seamless ---- */
  function initMarquee(){
    document.querySelectorAll('.marquee-track').forEach(track => {
      if (track.dataset.doubled) return;
      track.innerHTML += track.innerHTML;
      track.dataset.doubled = 'true';
    });
  }

  /* ---- Magnetic buttons (desktop only, disabled for reduced motion) ---- */
  function initMagnetic(){
    if (reduceMotion) return;
    const isFinePointer = window.matchMedia('(pointer:fine)').matches;
    if (!isFinePointer) return;
    document.querySelectorAll('.magnetic, .btn-primary, .btn-ghost, .btn-line').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.28}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---- Scroll progress bar ---- */
  function initScrollProgress(){
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = scrolled + '%';
    }, { passive:true });
  }

  /* ---- Hero subtle parallax on scroll ---- */
  function initHeroParallax(){
    const backdrop = document.querySelector('.hero-backdrop svg');
    if (!backdrop || reduceMotion) return;
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 400);
      backdrop.style.transform = `scale(${1 + (y / 400) * 0.04})`;
    }, { passive:true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initWordReveal();
    initReveal();
    initCounters();
    initMarquee();
    initMagnetic();
    initScrollProgress();
    initHeroParallax();
  });

  // expose for pages that inject content dynamically (case study, archive)
  window.MahendranAnimations = { initReveal, initCounters, initMarquee, initMagnetic };
})();
