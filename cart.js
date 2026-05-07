function renderCartPage() {
  const root = document.getElementById('cart-items-root');
  if (!root) return;

  if (!cart.length) {
    root.innerHTML = '<div class="empty-state">Your cart is empty. Explore GPUs, CPUs, and Motherboards to fill your build.</div>';
    updateSummaryCards();
    return;
  }

  root.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"220\" height=\"140\"><rect width=\"100%\" height=\"100%\" fill=\"rgba(255,255,255,0.06)\"/><text x=\"50%\" y=\"50%\" fill=\"rgba(255,255,255,0.4)\" font-family=\"Arial\" font-size=\"12\" text-anchor=\"middle\">IMAGE</text></svg>'"></div>
      <div class="cart-item-body">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">
            <span class="meta-chip">${item.category}</span>
            <span class="meta-chip">${item.qty}×</span>
            <span class="meta-chip">${item.price ? formatEGP(item.price) + ' EGP' : ''}</span>
          </div>
        </div>
        <div class="cart-actions">
          <div class="qty-group">
            <button class="qty-button" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-button" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${formatEGP(item.qty * item.price)} EGP</div>
    </div>
  `).join('');

  updateSummaryCards();
}

function updateSummaryCards() {
  const totals = getCartTotals();
  document.getElementById('summary-count').textContent = totals.count;
  document.getElementById('summary-total').textContent = `${formatEGP(totals.total)} EGP`;
  document.getElementById('summary-points').textContent = totals.points;
}

function checkout() {
  if (!cart.length) return;
  const totals = checkoutCart();
  if (!totals) return;
  renderCartPage();
  updateSummaryCards();
  updateTopbar();
  showToast(`Checkout complete. +${totals.points} pts earned`);
}

window.addEventListener('load', () => {
  loadUserProfile();
  loadCart();
  updateTopbar();
  renderCartPage();
});
