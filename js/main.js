'use strict';

/* ==============================
   HERO SLIDER
============================== */
(function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');
  let current = 0;
  let autoTimer;

  if (!slides.length) return;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  }

  document.getElementById('sliderPrev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('sliderNext')?.addEventListener('click', () => goTo(current + 1));

  resetTimer();
})();

/* ==============================
   STEPS CAROUSEL
============================== */
(function initSteps() {
  const track = document.getElementById('stepsTrack');
  if (!track) return;

  const items = track.querySelectorAll('.step-item');
  let current = 0;

  function goTo(index) {
    current = Math.max(0, Math.min(index, items.length - 1));
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  document.getElementById('stepsPrev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('stepsNext')?.addEventListener('click', () => goTo(current + 1));
})();

/* ==============================
   FAQ ACCORDION
============================== */
(function initFaq() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ==============================
   ABOUT TABS
============================== */
(function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(`tab-${tabId}`)?.classList.add('active');
    });
  });
})();

/* ==============================
   HAMBURGER MENU
============================== */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ==============================
   BACK TO TOP
============================== */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ==============================
   STICKY HEADER SHADOW
============================== */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.15)'
      : '0 2px 12px rgba(0,0,0,0.10)';
  }, { passive: true });
})();

/* ==============================
   FOOTER YEAR
============================== */
(function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ==============================
   HERO VIDEO — loop primeros 3 segundos
============================== */
(function initHeroVideo() {
  const video = document.querySelector('.hero-video-bg');
  if (!video) return;

  const CLIP_END = 3; // segundos

  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= CLIP_END) {
      video.currentTime = 0;
    }
  });
})();

/* ==============================
   VIDEO PLACEHOLDERS
   Replace # with real video URLs when ready
============================== */
(function initVideoPlaceholders() {
  const videoUrl = '#'; // Replace with actual YouTube/Vimeo URL

  document.getElementById('compareVideo')?.addEventListener('click', () => {
    if (videoUrl !== '#') window.open(videoUrl, '_blank');
  });

  document.getElementById('servicesVideo')?.addEventListener('click', () => {
    if (videoUrl !== '#') window.open(videoUrl, '_blank');
  });
})();
