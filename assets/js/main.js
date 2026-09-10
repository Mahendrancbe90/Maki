/* =====================================================================
   MAHENDRAN — MAIN
   Navigation, loader, mobile menu, work-list interactions,
   project archive filtering, case-study population, contact form.
===================================================================== */

(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Loader ---- */
  function initLoader(){
    const loader = document.querySelector('.loader');
    if (!loader) return;
    if (reduceMotion){ loader.classList.add('hidden'); return; }
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 900);
    });
    // safety fallback in case load event is delayed
    setTimeout(() => loader.classList.add('hidden'), 3000);
  }

  /* ---- Nav scroll state + mobile menu ---- */
  function initNav(){
    const nav = document.getElementById('siteNav');
    const toggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (nav){
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive:true });
    }

    let lockedScrollY = 0;
    function lockBodyScroll(){
      lockedScrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    }
    function unlockBodyScroll(){
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, lockedScrollY);
    }

    if (toggle && mobileMenu){
      toggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) lockBodyScroll(); else unlockBodyScroll();
      });
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          unlockBodyScroll();
        });
      });
      // close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')){
          mobileMenu.classList.remove('open');
          toggle.classList.remove('open');
          unlockBodyScroll();
          toggle.focus();
        }
      });
    }
  }

  /* ---- Footer year ---- */
  function initFooterYear(){
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---- Back to top ---- */
  function initBackToTop(){
    document.querySelectorAll('.back-to-top').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---- Latest Work: asymmetric grid, filters, hover view — home page ---- */
  function renderLatestWorkCards(projects){
    return projects.map((p, i) => `
      <article class="lw-card reveal" data-categories="${p.categories.join(' ')}" data-slug="${p.slug}">
        <a class="lw-thumb" href="${p.href}" aria-label="View ${p.title} case study">
          <img src="${p.image}" alt="${p.title} — project preview" loading="lazy" decoding="async" width="1600" height="1100">
          <div class="lw-thumb-overlay"></div>
          <span class="lw-view" aria-hidden="true">View<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg></span>
        </a>
        <div class="lw-meta">
          <div class="lw-cat">${p.category}</div>
          <a class="lw-title" href="${p.href}">${p.title}</a>
          <p class="lw-desc">${p.shortDesc}</p>
          <div class="lw-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        </div>
      </article>
    `).join('');
  }

  function initLatestWork(){
    const grid = document.getElementById('lwGrid');
    const filterBar = document.getElementById('lwFilters');
    if (!grid || typeof PROJECTS === 'undefined') return;

    const projectList = grid.dataset.featuredOnly === 'true'
      ? PROJECTS.filter(p => p.featured !== false)
      : PROJECTS;

    grid.innerHTML = renderLatestWorkCards(projectList);
    if (window.MahendranAnimations) window.MahendranAnimations.initReveal();

    const countEl = document.getElementById('archiveCount');
    if (countEl) countEl.textContent = projectList.length;

    const cards = grid.querySelectorAll('.lw-card');
    const FILTERS = [
      { key: 'all', label: 'All Work' },
      { key: 'web-app', label: 'Web Apps' },
      { key: 'mobile-app', label: 'Mobile Applications' },
      { key: 'website', label: 'Websites' }
    ];

    filterBar.innerHTML = FILTERS.map((f, i) =>
      `<button class="lw-filter ${i === 0 ? 'active' : ''}" data-filter="${f.key}" aria-pressed="${i === 0}">${f.label}</button>`
    ).join('');

    let emptyState = document.getElementById('lwEmpty');
    if (!emptyState){
      emptyState = document.createElement('p');
      emptyState.id = 'lwEmpty';
      emptyState.className = 'case-placeholder';
      emptyState.style.marginTop = '8px';
      emptyState.style.display = 'none';
      grid.after(emptyState);
    }

    const filterButtons = Array.from(filterBar.querySelectorAll('.lw-filter'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.lw-filter');
      if (!btn) return;
      filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      const willShow = [], willHide = [];
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.categories.split(' ').includes(filter);
        (match ? willShow : willHide).push(card);
      });

      emptyState.style.display = willShow.length === 0 ? 'block' : 'none';
      emptyState.textContent = willShow.length === 0
        ? `No ${btn.textContent} projects published yet — check back soon.`
        : '';

      if (reduceMotion){
        willHide.forEach(c => c.classList.add('lw-hidden'));
        willShow.forEach(c => c.classList.remove('lw-hidden'));
        return;
      }
      cards.forEach(c => c.classList.add('lw-fading'));
      setTimeout(() => {
        willHide.forEach(c => c.classList.add('lw-hidden'));
        willShow.forEach(c => c.classList.remove('lw-hidden'));
        void grid.offsetWidth;
        cards.forEach(c => c.classList.remove('lw-fading'));
      }, 260);
    });

    // keyboard: arrow keys move focus between filter pills
    filterBar.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const i = filterButtons.indexOf(document.activeElement);
      if (i === -1) return;
      e.preventDefault();
      const next = e.key === 'ArrowRight' ? (i + 1) % filterButtons.length : (i - 1 + filterButtons.length) % filterButtons.length;
      filterButtons[next].focus();
    });
  }

  /* ---- Contact form: validation + mailto fallback (no backend) ---- */
  function initContactForm(){
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('contactSubmit');
    const submitLabel = submitBtn ? submitBtn.textContent : 'Send Message';
    let isSubmitting = false;

    function setInvalid(group, message){
      group.classList.add('invalid');
      const err = group.querySelector('.form-error');
      if (err) err.textContent = message;
    }
    function clearInvalid(group){
      group.classList.remove('invalid');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isSubmitting) return; // prevent duplicate submissions

      let valid = true;

      const name = form.querySelector('#fieldName');
      const email = form.querySelector('#fieldEmail');
      const projectType = form.querySelector('#fieldProjectType');
      const message = form.querySelector('#fieldMessage');

      [name, email, projectType, message].forEach(f => f && clearInvalid(f.closest('.form-group')));

      if (!name.value.trim() || name.value.trim().length < 2){
        setInvalid(name.closest('.form-group'), 'Please enter your name (2+ characters).');
        valid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())){
        setInvalid(email.closest('.form-group'), 'Please enter a valid email address.');
        valid = false;
      }
      if (!projectType.value){
        setInvalid(projectType.closest('.form-group'), 'Please select a project type.');
        valid = false;
      }
      if (!message.value.trim() || message.value.trim().length < 10){
        setInvalid(message.closest('.form-group'), 'Please add a short project description (10+ characters).');
        valid = false;
      }

      if (!valid){
        if (status){ status.textContent = 'Please fix the highlighted fields.'; status.className = 'form-status error'; }
        return;
      }

      const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        company: form.querySelector('#fieldCompany')?.value.trim() || '',
        projectType: projectType.value,
        budget: form.querySelector('#fieldBudget')?.value || '',
        message: message.value.trim(),
        website: form.querySelector('#fieldWebsite')?.value || ''
      };

      isSubmitting = true;
      if (submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      if (status){ status.textContent = ''; status.className = 'form-status'; }

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Request failed');

        if (status){
          status.textContent = 'Thank you! Your enquiry has been submitted successfully.';
          status.className = 'form-status success';
        }
        form.reset(); // only clear on confirmed success — entered data is preserved on any error
      } catch (err) {
        if (status){
          status.textContent = 'Something went wrong. Please try again.';
          status.className = 'form-status error';
        }
      } finally {
        isSubmitting = false;
        if (submitBtn){ submitBtn.disabled = false; submitBtn.textContent = submitLabel; }
      }
    });
  }

  /* ---- Hero video: custom minimal play/pause control ----
     Video autoplays muted/looped by default with no visible control,
     matching a clean full-bleed background treatment. The small custom
     button only appears if playback is actually paused — either because
     prefers-reduced-motion is on, or because the browser blocked
     autoplay — so we never fall back to the browser's oversized native
     video controls. */
  function initHeroVideo(){
    const video = document.querySelector('.hero-video');
    const toggle = document.getElementById('heroVideoToggle');
    if (!video || !toggle) return;

    function showToggle(){ toggle.classList.add('is-visible'); }
    function syncState(){
      const playing = !video.paused;
      toggle.classList.toggle('is-playing', playing);
      toggle.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
    }

    if (reduceMotion){
      video.removeAttribute('autoplay');
      video.removeAttribute('loop');
      video.pause();
      showToggle();
    } else {
      // If autoplay is blocked by the browser, fall back to showing our own control.
      const playPromise = video.play();
      if (playPromise !== undefined){
        playPromise.catch(() => { showToggle(); syncState(); });
      }
    }

    video.addEventListener('pause', () => { showToggle(); syncState(); });
    video.addEventListener('play', syncState);

    toggle.addEventListener('click', () => {
      if (video.paused) video.play(); else video.pause();
    });

    syncState();
  }

  /* ---- Process cascade: smooth drag-to-scroll + vertical-wheel-to-horizontal ---- */
  function initProcessCascade(){
    const track = document.getElementById('processCascade');
    if (!track) return;

    // let a vertical mouse-wheel gesture scroll this horizontal track smoothly
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      track.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }, { passive: false });

    // click-and-drag scrolling for mouse users
    let isDown = false, startX = 0, startScroll = 0;
    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX;
      startScroll = track.scrollLeft;
    });
    window.addEventListener('mouseup', () => { isDown = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      track.scrollLeft = startScroll - (e.pageX - startX);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNav();
    initFooterYear();
    initBackToTop();
    initHeroVideo();
    initLatestWork();
    initProcessCascade();
    initContactForm();
  });
})();
