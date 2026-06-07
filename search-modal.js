(function () {
 
  const RECENTLY_VIEWED_KEY = 'sbrc_recently_viewed';
  const DISCOVER_COUNT = 4;
 
  // ── Recently viewed helpers ──────────────────────────────────────────────
  function getRecentlyViewed() {
    try {
      return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY)) || [];
    } catch { return []; }
  }
 
  function recordView(id) {
    const list = getRecentlyViewed().filter(i => i !== id);
    list.unshift(id);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(list.slice(0, 6)));
  }
 
  // Call this on product pages — exposed globally
  window.SearchModal = { recordView };
 
  // ── Build a product card li ──────────────────────────────────────────────
  function buildCard(id) {
    const p = PRODUCTS[id];
    if (!p) return null;
    const li = document.createElement('li');
    li.className = 'search-product-card';
    li.innerHTML = `
      <div class="search-product-card__img-wrap">
        <a href="product.html?id=${p.id}" tabindex="-1" aria-hidden="true">
          <img src="${p.image}" alt="" />
        </a>
        <button
          class="search-product-card__quick-add"
          aria-label="Add ${p.name} to cart"
          data-id="${p.id}"
        >
          <img src="quickAdd.svg" alt="" aria-hidden="true" />
        </button>
      </div>
      <a class="search-product-card__name" href="product.html?id=${p.id}">${p.name}</a>
      <span class="search-product-card__price">from ${p.price}</span>
    `;
    return li;
  }
 
  // ── Populate Recently Viewed ─────────────────────────────────────────────
  function renderRecentlyViewed() {
    const list = document.getElementById('search-recent-list');
    const section = document.getElementById('search-recently-viewed');
    if (!list) return;
    const ids = getRecentlyViewed();
    list.innerHTML = '';
    if (ids.length === 0) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    ids.forEach(id => {
      const card = buildCard(id);
      if (card) list.appendChild(card);
    });
  }
 
  // ── Populate Discover ────────────────────────────────────────────────────
  function renderDiscover() {
    const list = document.getElementById('search-discover-list');
    if (!list) return;
    const allIds = Object.keys(PRODUCTS);
    // Shuffle and take first DISCOVER_COUNT
    const shuffled = allIds.sort(() => Math.random() - 0.5).slice(0, DISCOVER_COUNT);
    list.innerHTML = '';
    shuffled.forEach(id => {
      const card = buildCard(id);
      if (card) list.appendChild(card);
    });
  }
 
  // ── Live search ──────────────────────────────────────────────────────────
  function renderSearch(query) {
    const resultsSection = document.getElementById('search-results-section');
    const resultsList = document.getElementById('search-results-list');
    const noResults = document.getElementById('search-no-results');
    const recentSection = document.getElementById('search-recently-viewed');
    const discoverSection = document.getElementById('search-discover');
 
    if (!query.trim()) {
      resultsSection.hidden = true;
      recentSection.hidden = getRecentlyViewed().length === 0;
      discoverSection.hidden = false;
      return;
    }
 
    recentSection.hidden = true;
    discoverSection.hidden = true;
    resultsSection.hidden = false;
    resultsList.innerHTML = '';
 
    const q = query.toLowerCase();
    const matches = Object.keys(PRODUCTS).filter(id =>
      PRODUCTS[id].name.toLowerCase().includes(q)
    );
 
    if (matches.length === 0) {
      noResults.hidden = false;
    } else {
      noResults.hidden = true;
      matches.forEach(id => {
        const card = buildCard(id);
        if (card) resultsList.appendChild(card);
      });
    }
  }
 
  // ── Open / close ─────────────────────────────────────────────────────────
  function openModal() {
    const overlay = document.getElementById('search-overlay');
    if (!overlay) return;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    renderRecentlyViewed();
    renderDiscover();
    document.getElementById('search-input')?.focus();
  }
 
  function closeModal() {
    const overlay = document.getElementById('search-overlay');
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (document.getElementById('search-input'))
      document.getElementById('search-input').value = '';
    renderSearch('');
  }
 
  // ── Event listeners ──────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
 
    // Open on search button click
    const searchBtn = document.querySelector('.nav-icons [aria-label="Search"]');
searchBtn?.addEventListener('click', openModal);
 
    // Close button
    document.getElementById('search-close')?.addEventListener('click', closeModal);
 
    // Close on overlay backdrop click
    document.getElementById('search-overlay')?.addEventListener('click', e => {
      if (e.target === document.getElementById('search-overlay')) closeModal();
    });
 
    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
 
    // Live search
    document.getElementById('search-input')?.addEventListener('input', e => {
      renderSearch(e.target.value);
    });
 
    // Quick-add delegation
    document.getElementById('search-overlay')?.addEventListener('click', e => {
      const btn = e.target.closest('.search-product-card__quick-add');
      if (!btn) return;
      CartStore.add(btn.dataset.id, '250g', 1);
      const img = btn.querySelector('img');
      const orig = img.src;
      img.src = 'ok.svg';
      setTimeout(() => { img.src = orig; }, 1200);
    });
 
    // Close modal when navigating to a product
    document.getElementById('search-overlay')?.addEventListener('click', e => {
      if (e.target.closest('.search-product-card__name') ||
          e.target.closest('.search-product-card__img-wrap a')) {
        closeModal();
      }
    });
 
  });
 
})();