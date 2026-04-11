/* ══════════════════════════════════════
   ROBERTA MEGGS — MAIN JS
══════════════════════════════════════ */

(function () {
  'use strict';

  // ── Sticky nav scroll awareness ──────────
  const nav = document.getElementById('site-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ── Mobile hamburger menu ─────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && mobileMenu.classList.contains('is-open')) {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ── Subtle hero parallax ─────────────────
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      const heroHeight = heroBg.parentElement.offsetHeight;
      if (scrolled < heroHeight) {
        heroBg.style.transform = 'scale(1.03) translateY(' + (scrolled * 0.25) + 'px)';
      }
    }, { passive: true });
  }

  // ── Scroll-fade-in for sections ───────────
  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll(
      '.values__tile, .diff-tile, .testimonial-card, .blog-card, .services__card, .process__step'
    );

    fadeEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  }

  // ── Active nav link highlighting ──────────
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
              link.style.color = 'var(--color-gold)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  // ── Lead magnet form (placeholder) ───────
  const leadForm = document.querySelector('.lead-magnet__form');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = leadForm.querySelector('.lead-magnet__submit');
      btn.textContent = 'Sent! Check your inbox.';
      btn.disabled = true;
      btn.style.background = 'var(--color-gold-dark)';
    });
  }

})();
