/**
 * common.js — 酒処あかり 共通スクリプト
 * ヘッダー・フッターのfetch挿入、ドロワー、ページトップ、スクロール表示
 */

(function () {
  'use strict';

  const currentPage = document.body.dataset.page || 'home';

  function getRootPath() {
    const scripts = document.querySelectorAll('script[src]');
    for (const s of scripts) {
      const src = s.getAttribute('src');
      if (src && src.includes('common.js')) {
        const ups = (src.match(/\.\.\//g) || []).length;
        return '../'.repeat(ups);
      }
    }
    return './';
  }

  const ROOT = getRootPath();

  /* -------------------------------------------------------
   * ページローダー
   * ------------------------------------------------------- */
  function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 500);
    });
    // fallback
    setTimeout(() => loader && loader.classList.add('is-hidden'), 2200);
  }

  /* -------------------------------------------------------
   * ヘッダー読み込み
   * ------------------------------------------------------- */
  function loadHeader() {
    const mount = document.getElementById('shared-header');
    if (!mount) return;

    fetch(ROOT + 'partials/header.html')
      .then(r => r.text())
      .then(html => {
        html = html.replace(/href="\.\//g, `href="${ROOT}`);
        mount.outerHTML = html;
        initNav();
        initDrawer();
        initHeaderScroll();
      })
      .catch(() => {});
  }

  /* -------------------------------------------------------
   * ナビ：aria-current
   * ------------------------------------------------------- */
  function initNav() {
    document.querySelectorAll('[data-nav]').forEach(a => {
      if (a.dataset.nav === currentPage) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* -------------------------------------------------------
   * ヘッダー: スクロールで背景を変化
   * ------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    function toggle() {
      header.classList.toggle('is-scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

  /* -------------------------------------------------------
   * ドロワー（スマホメニュー）
   * ------------------------------------------------------- */
  function initDrawer() {
    const btn     = document.querySelector('.nav-toggle');
    const drawer  = document.getElementById('drawerMenu');
    const overlay = document.getElementById('drawerOverlay');
    if (!btn || !drawer || !overlay) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      btn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }

    btn.addEventListener('click', () =>
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer()
    );

    document.querySelectorAll('[data-close="drawer"]').forEach(el =>
      el.addEventListener('click', closeDrawer)
    );

    drawer.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', closeDrawer)
    );

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* -------------------------------------------------------
   * フッター読み込み
   * ------------------------------------------------------- */
  function loadBottom() {
    const mount = document.getElementById('shared-bottom');
    if (!mount) return;

    fetch(ROOT + 'partials/bottom.html')
      .then(r => r.text())
      .then(html => {
        mount.innerHTML = html;
        mount.querySelectorAll('.section').forEach(sec => sec.classList.add('is-inview'));

        if (currentPage === 'home') {
          mount.querySelectorAll('.js-hide-on-home').forEach(el => el.style.display = 'none');
        }

        const hash = location.hash;
        if (hash) {
          setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 400);
        }
      })
      .catch(() => {});
  }

  /* -------------------------------------------------------
   * ページトップボタン
   * ------------------------------------------------------- */
  function initPageTop() {
    const pageTop = document.querySelector('.page-top');
    if (!pageTop) return;

    function toggle() {
      pageTop.classList.toggle('is-show', window.scrollY > 480);
    }

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

  /* -------------------------------------------------------
   * セクション スクロール表示
   * ------------------------------------------------------- */
  function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -8% 0px'
    });

    sections.forEach(sec => io.observe(sec));
  }

  /* -------------------------------------------------------
   * 数字カウンターアニメーション (.js-counter)
   * ------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll('.js-counter');
    if (!counters.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target || el.textContent, 10);
        if (isNaN(target)) return;
        io.unobserve(el);

        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
          el.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => io.observe(el));
  }

  /* -------------------------------------------------------
   * 初期化
   * ------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    loadHeader();
    loadBottom();
    initPageTop();
    initScrollReveal();
    initCounters();
  });

})();
