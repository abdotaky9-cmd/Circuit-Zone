const STORAGE_PROFILE = 'cz_cpu_profile';
const STORAGE_CART = 'cz_cpu_cart';
const POINTS_PER_EGP = 30 / 10000;
const REWARD_THRESHOLD = 170;

const userProfile = {
  name: 'Guest',
  email: '',
  wallet: 0,
  points: 0,
  rewards: [],
  purchases: [],
};

let cart = [];

function fmt(value) { return value.toLocaleString('en-EG'); }
function calcPoints(price) { return Math.floor(price * POINTS_PER_EGP); }

function loadProfile() {
  const stored = localStorage.getItem(STORAGE_PROFILE);
  if (stored) Object.assign(userProfile, JSON.parse(stored));
}

function saveProfile() { localStorage.setItem(STORAGE_PROFILE, JSON.stringify(userProfile)); }

function loadCart() {
  const stored = localStorage.getItem(STORAGE_CART);
  cart = stored ? JSON.parse(stored) : [];
}

function saveCart() { localStorage.setItem(STORAGE_CART, JSON.stringify(cart)); }

function refreshPointsUI() {
  const value = document.getElementById('pts-val');
  if (value) value.textContent = userProfile.points;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function updateSummary() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const price = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const points = cart.reduce((sum, item) => sum + calcPoints(item.price) * item.qty, 0);
  document.getElementById('summary-count').textContent = total;
  document.getElementById('summary-total').textContent = `${fmt(price)} EGP`;
  document.getElementById('summary-points').textContent = points;
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  showToast('Item removed from cart');
}

function changeQty(id, delta) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
}

function checkout() {
  if (!cart.length) return;
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const earned = cart.reduce((sum, item) => sum + calcPoints(item.price) * item.qty, 0);

  userProfile.points += earned;
  userProfile.purchases.push({ items: [...cart], total, date: new Date().toISOString() });
  saveProfile();

  cart = [];
  saveCart();
  renderCart();
  refreshPointsUI();
  showToast(`Checkout complete. +${earned} pts earned`);
  if (userProfile.points >= REWARD_THRESHOLD && !userProfile.rewardNotified) {
    userProfile.rewardNotified = true;
    saveProfile();
    setTimeout(() => alert('Reward unlocked! You can redeem discounts or free hardware soon.'), 300);
  }
}

function renderCart() {
  const root = document.getElementById('cart-items-root');
  if (!root) return;
  if (!cart.length) {
    root.innerHTML = `<div class="empty-state">Your cart is empty. Return to the CPU collection to add premium products.</div>`;
    updateSummary();
    return;
  }

  root.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"220\" height=\"140\"><rect width=\"100%\" height=\"100%\" fill=\"rgba(255,255,255,0.06)\"/><text x=\"50%\" y=\"50%\" fill=\"rgba(255,255,255,0.4)\" font-family=\"Arial\" font-size=\"12\" text-anchor=\"middle\">CPU IMAGE</text></svg>'"></div>
      <div class="cart-item-body">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">
            <span class="meta-chip">${item.cores}</span>
            <span class="meta-chip">${item.threads}</span>
            <span class="meta-chip">${item.clock}</span>
          </div>
        </div>
        <div class="cart-actions">
          <div class="qty-group">
            <button class="qty-button" onclick="changeQty('${item.id}', -1)">-</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-button" onclick="changeQty('${item.id}', 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${fmt(item.price * item.qty)} EGP</div>
    </div>
  `).join('');

  updateSummary();
}

window.addEventListener('load', () => {
  loadProfile();
  loadCart();
  refreshPointsUI();
  renderCart();
});
