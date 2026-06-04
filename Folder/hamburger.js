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

// Submenu
document.querySelectorAll('[data-submenu]').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    var target = this.getAttribute('data-submenu');
    document.getElementById('nav-drawer-sub-' + target).classList.add('is-active');
  });
});

document.getElementById('nav-drawer-back').addEventListener('click', function() {
  document.querySelectorAll('.nav-drawer__sub-panel').forEach(function(p) {
    p.classList.remove('is-active');
  });
});