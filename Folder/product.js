// Read product id from URL e.g. product.html?id=nolberto
const params = new URLSearchParams(window.location.search);
const id = params.get('id') || 'nolberto';
const p = PRODUCTS[id];

if (p) {
  // Main image
  document.getElementById('pdp-main-image').src = p.image;
  document.getElementById('pdp-main-image').alt = p.name;

  // Purchase block
  document.getElementById('pdp-name').textContent = p.name;
  document.getElementById('pdp-price').textContent = p.price;
  document.getElementById('pdp-flavours').innerHTML = p.flavours;

  // Sourcing / Process / Tasting
  document.getElementById('pdp-sourcing').innerHTML = p.sourcing;
  document.getElementById('pdp-process').textContent = p.process;
  document.getElementById('pdp-tasting').textContent = p.tasting;

  // About producer
  document.getElementById('pdp-about-heading').textContent = p.aboutHeading;
  document.getElementById('pdp-about-body').textContent = p.aboutBody;
  document.getElementById('pdp-about-photo').src = p.aboutPhoto;
  document.getElementById('pdp-about-photo').alt = p.aboutHeading;

  // Accordion
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
      <div class="product-card__image">
        <img src="${rec.image}" alt="${rec.name}" />
        <a href="product.html?id=${rec.id}" class="product-card__bag" aria-label="View ${rec.name}">
          <img src="quickAdd.svg" alt="" />
        </a>
      </div>
      <h2 class="product-card__name">${rec.name}</h2>
      <p class="product-card__price">from ${rec.price}</p>
    `;
    grid.appendChild(li);
  });
}

// Accordion
document.querySelectorAll('.pdp-accordion__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isOpen);
    body.classList.toggle('open', !isOpen);
  });
});