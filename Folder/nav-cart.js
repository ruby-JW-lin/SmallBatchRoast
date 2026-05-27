(function () {
  function updateBadge() {
    const count = CartStore.count();
    let badge = document.getElementById('nav-bag-count');

    if (!badge) {
      const bagBtn = document.querySelector('[aria-label="Shopping bag"]');
      if (!bagBtn) return;

      // Wrap button so badge can be positioned relative to it
      const wrapper = document.createElement('span');
      wrapper.className = 'nav-bag-wrapper';
      bagBtn.parentNode.insertBefore(wrapper, bagBtn);
      wrapper.appendChild(bagBtn);

      // Make the button a link to cart
      bagBtn.addEventListener('click', () => {
        window.location.href = 'cart.html';
      });

      badge = document.createElement('span');
      badge.id = 'nav-bag-count';
      badge.className = 'nav-bag-count';
      wrapper.appendChild(badge);
    }

    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  // Run on load and whenever cart changes
  document.addEventListener('DOMContentLoaded', updateBadge);
  window.addEventListener('cart:updated', updateBadge);
})();