// ── Hamburger Nav ─────────────────────────────────────────────────────────
(function () {
  document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('nav-hamburger');
    const drawer = document.getElementById('nav-drawer');
    const drawerClose = document.getElementById('nav-drawer-close');

    if (!hamburger || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      hamburger.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', () => {
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });

    drawerClose?.addEventListener('click', closeDrawer);

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });

  });
})();