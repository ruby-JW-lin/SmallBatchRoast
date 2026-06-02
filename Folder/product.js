// ── Product Detail Page ────────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
const id = params.get('id') || 'nolberto';
const p = PRODUCTS[id];
SearchModal.recordView(id); 

if (p) {
  document.getElementById('pdp-main-image').src = p.image;
  document.getElementById('pdp-main-image').alt = p.name;
  document.getElementById('pdp-name').textContent = p.name;
  document.getElementById('pdp-price').textContent = p.price;
  document.getElementById('pdp-flavours').innerHTML = p.flavours;
  document.getElementById('pdp-sourcing').innerHTML = p.sourcing;
  document.getElementById('pdp-process').textContent = p.process;
  document.getElementById('pdp-tasting').textContent = p.tasting;
  document.getElementById('pdp-about-heading').textContent = p.aboutHeading;
  document.getElementById('pdp-about-body').textContent = p.aboutBody;
  document.getElementById('pdp-about-photo').src = p.aboutPhoto;
  document.getElementById('pdp-about-photo').alt = p.aboutHeading;
  document.getElementById('pdp-transparency').textContent = p.transparency;
  document.getElementById('pdp-more-about').textContent = p.moreAbout;

  // Recommended grid
  const grid = document.getElementById('pdp-recommended-grid');
  p.recommended.forEach(recId => {
    const rec = PRODUCTS[recId];
    if (!rec) return;
    const li = document.createElement('li');
    li.className = 'product-card';
    li.innerHTML = `
      <a href="product.html?id=${rec.id}">
        <div class="product-card__image">
          <img src="${rec.image}" alt="${rec.name}" />
          <button class="product-card__bag quick-add-btn" data-id="${rec.id}" aria-label="Add ${rec.name} to cart">
            <img src="quickAdd.svg" alt="" />
          </button>
        </div>
      </a>
      <h2 class="product-card__name">${rec.name}</h2>
      <p class="product-card__price">from ${rec.price}</p>
    `;
    grid.appendChild(li);
  });
}

// ── Size selector ──────────────────────────────────────────────────────────
const sizeValue = document.getElementById('pdp-size-value');
const sizes = ['250g', '500g', '1kg'];
let sizeIndex = 0;

document.querySelector('.pdp-size-selector')?.addEventListener('click', () => {
  sizeIndex = (sizeIndex + 1) % sizes.length;
  sizeValue.textContent = sizes[sizeIndex];
});

// ── Quantity selector ──────────────────────────────────────────────────────
const qtyEl = document.getElementById('pdp-qty');
const qtys = [1,2,3,4,5,6,7,8,9,10];
let qtyIndex = 0;

document.querySelector('.pdp-qty-selector')?.addEventListener('click', () => {
  qtyIndex = (qtyIndex + 1) % qtys.length;
  qtyEl.textContent = qtys[qtyIndex];
});

// ── Add to Cart ────────────────────────────────────────────────────────────
document.querySelector('.pdp-atc-btn')?.addEventListener('click', () => {
  const size = sizeValue?.textContent || '250g';
  const qty = parseInt(qtyEl?.textContent) || 1;
  CartStore.add(id, size, qty);
  showATCFeedback();
});

function showATCFeedback() {
  const btn = document.querySelector('.pdp-atc-btn');
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = 'ADDED';
  btn.style.background = '#717a3f';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 1500);
}

// ── Quick-add buttons (recommended grid) ──────────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.quick-add-btn');
  if (!btn) return;
  e.preventDefault();
  CartStore.add(btn.dataset.id, '250g', 1);
  const img = btn.querySelector('img');
  const original = img.src;
  img.src = 'ok.svg';
  setTimeout(() => { img.src = original; }, 1200);
});

// ── Accordion ─────────────────────────────────────────────────────────────
document.querySelectorAll('.pdp-accordion__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isOpen);
    body.classList.toggle('open', !isOpen);
  });
});