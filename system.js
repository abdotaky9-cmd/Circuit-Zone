const STORAGE_USER_PROFILE = 'cz_user_profile';
const STORAGE_GLOBAL_CART = 'cz_global_cart';
const POINTS_PER_EGP = 30 / 10000;
const REWARD_THRESHOLD = 170;

const userProfile = {
  username: 'Guest',
  avatar: '',
  wallet: 0,
  points: 0,
  rewards: [],
  purchases: [],
  activity: [],
};

let cart = [];

function formatEGP(value) { return Number(value).toLocaleString('en-EG'); }
function formatDate(timestamp) { return new Date(timestamp).toLocaleString('en-EG', { hour12:false, month:'short', day:'numeric', year:'numeric' }); }
function calcPoints(price) { return Math.floor(price * POINTS_PER_EGP); }
function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

function loadUserProfile() {
  const stored = localStorage.getItem(STORAGE_USER_PROFILE);
  if (stored) {
    Object.assign(userProfile, JSON.parse(stored));
  } else {
    const username = localStorage.getItem('userId');
    if (username) {
      userProfile.username = username;
      saveUserProfile();
    }
  }
}

function saveUserProfile() {
  localStorage.setItem(STORAGE_USER_PROFILE, JSON.stringify(userProfile));
}

function loadCart() {
  const stored = localStorage.getItem(STORAGE_GLOBAL_CART);
  cart = stored ? JSON.parse(stored) : [];
}

function saveCart() {
  localStorage.setItem(STORAGE_GLOBAL_CART, JSON.stringify(cart));
  updateTopbar();
}

function updateTopbar() {
  const pointsEl = document.getElementById('pts-val');
  const countEl = document.getElementById('cart-count');
  if (pointsEl) pointsEl.textContent = userProfile.points;
  if (countEl) {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = total;
    total > 0 ? countEl.classList.add('show') : countEl.classList.remove('show');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function addActivity(action, category, details) {
  userProfile.activity.unshift({ action, category, details, date: new Date().toISOString() });
  if (userProfile.activity.length > 50) userProfile.activity.pop();
  saveUserProfile();
}

function addToCart(product, category, qty = 1) {
  const existing = cart.find(item => item.id === product.id && item.category === category);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, category, qty });
  }
  saveCart();
  addActivity('Add to Cart', category, `${product.name} x${qty}`);
  showToast(`Added ${product.name} to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  addActivity('Remove from Cart', 'Cart', id);
  renderCartPage?.();
}

function updateCartQty(id, delta) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.qty = clamp(item.qty + delta, 1, 99);
  saveCart();
  renderCartPage?.();
}

function getCartTotals() {
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const points = cart.reduce((sum, item) => sum + calcPoints(item.price) * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  return { total, points, count };
}

function checkReward() {
  if (userProfile.points >= REWARD_THRESHOLD && !userProfile.rewardNotified) {
    userProfile.rewardNotified = true;
    saveUserProfile();
    const modal = document.querySelector('.reward-modal');
    if (modal) modal.style.display = 'flex';
  }
}

function closeReward() {
  const modal = document.querySelector('.reward-modal');
  if (modal) modal.style.display = 'none';
}

function checkoutCart(itemId = null) {
  if (!cart.length) return null;
  let purchaseItems;
  if (itemId) {
    const item = cart.find(entry => entry.id === itemId);
    if (!item) return null;
    purchaseItems = [{ ...item }];
    cart = cart.filter(entry => entry.id !== itemId);
  } else {
    purchaseItems = cart.map(entry => ({ ...entry }));
    cart = [];
  }

  const total = purchaseItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const points = purchaseItems.reduce((sum, item) => sum + calcPoints(item.price) * item.qty, 0);
  const count = purchaseItems.reduce((sum, item) => sum + item.qty, 0);

  userProfile.points += points;
  userProfile.purchases.unshift({ items: purchaseItems, total, date: new Date().toISOString() });
  addActivity('Checkout', 'Cart', `Purchased ${count} item${count === 1 ? '' : 's'} for ${formatEGP(total)} EGP`);
  saveUserProfile();
  saveCart();
  updateTopbar();
  checkReward();
  return { total, points, count };
}

function quickBuy(product, category, qty = 1) {
  addToCart(product, category, qty);
  const totals = checkoutCart(product.id);
  if (!totals) return;
  showToast(`Purchased ${product.name} • +${totals.points} pts`);
}

function goToCart() { window.location.href = 'cart.html'; }
function goToProfile() { window.location.href = 'profile.html'; }

window.addEventListener('load', () => {
  loadUserProfile();
  loadCart();
  updateTopbar();
});
