// ── Cart Store ─────────────────────────────────────────────────────────────
// Persists cart to localStorage so it survives page navigation.
// Shape: [{ id, size, qty }]

const CartStore = {
  _key: 'sbrc_cart',

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this._key)) || [];
    } catch { return []; }
  },

  save(items) {
    localStorage.setItem(this._key, JSON.stringify(items));
    this._notify();
  },

  add(id, size, qty = 1) {
    const items = this.getAll();
    const existing = items.find(i => i.id === id && i.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id, size, qty });
    }
    this.save(items);
  },

  update(id, size, newQty) {
    const items = this.getAll();
    const item = items.find(i => i.id === id && i.size === size);
    if (item) item.qty = newQty;
    this.save(items);
  },

  updateSize(id, oldSize, newSize) {
    const items = this.getAll();
    const item = items.find(i => i.id === id && i.size === oldSize);
    if (!item) return;
    // If same product already exists at new size, merge
    const conflict = items.find(i => i.id === id && i.size === newSize);
    if (conflict) {
      conflict.qty += item.qty;
      items.splice(items.indexOf(item), 1);
    } else {
      item.size = newSize;
    }
    this.save(items);
  },

  remove(id, size) {
    const items = this.getAll().filter(i => !(i.id === id && i.size === size));
    this.save(items);
  },

  count() {
    return this.getAll().reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal(products) {
    return this.getAll().reduce((sum, item) => {
      const p = products[item.id];
      if (!p) return sum;
      return sum + parseFloat(p.price.replace('$', '')) * item.qty;
    }, 0);
  },

  // Fires a custom event so any open page can react (e.g. update bag count)
  _notify() {
    window.dispatchEvent(new CustomEvent('cart:updated'));
  }
};