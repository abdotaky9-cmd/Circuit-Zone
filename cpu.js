const cpuData = [
  { id: 'i3-12100f', name: 'Intel Core i3-12100F', brand: 'intel', tier: 'budget', cores: '4 Cores', threads: '8 Threads', clock: '3.3 GHz Base', gen: '12th Gen Alder Lake', desc: 'Efficient budget CPU for competitive 1080p gaming and smooth productivity.', gaming: 'Great 1080p and esports performance.', productivity: 'Fast enough for office, streaming, and light editing.', price: 11500, img: 'https://www.intel.com/content/dam/www/central-libraries/us/en/images/featured/hero/desktop-processors.png' },
  { id: 'ryzen-5-5600g', name: 'AMD Ryzen 5 5600G', brand: 'amd', tier: 'budget', cores: '6 Cores', threads: '12 Threads', clock: '3.9 GHz Boost', gen: 'Zen 3', desc: 'Modern APU with strong performance and built-in graphics.', gaming: 'Good esports and casual gaming without discrete GPU.', productivity: 'Great for streaming and multitasking.', price: 13200, img: 'https://www.amd.com/system/files/2023-12/hero-product-image-ryzen-7000.png' },
  { id: 'i5-12400f', name: 'Intel Core i5-12400F', brand: 'intel', tier: 'budget', cores: '6 Cores', threads: '12 Threads', clock: '2.5 GHz Base', gen: '12th Gen Alder Lake', desc: 'Balanced CPU with responsive gameplay and solid value.', gaming: 'Excellent 1080p and 1440p frame rates.', productivity: 'Ideal for editing and creator workflows on a budget.', price: 14600, img: 'https://www.intel.com/content/dam/www/central-libraries/us/en/images/featured/hero/desktop-processors.png' },
  { id: 'ryzen-7-5800x', name: 'AMD Ryzen 7 5800X', brand: 'amd', tier: 'mid', cores: '8 Cores', threads: '16 Threads', clock: '3.8 GHz Base', gen: 'Zen 3', desc: 'Powerful mid-tier CPU with excellent multitasking and gaming.', gaming: 'Strong 1440p performance with smooth pacing.', productivity: 'Fast rendering and editing for creators.', price: 20150, img: 'https://www.amd.com/system/files/2023-12/hero-product-image-ryzen-7000.png' },
  { id: 'i5-13600k', name: 'Intel Core i5-13600K', brand: 'intel', tier: 'mid', cores: '14 Cores', threads: '20 Threads', clock: '3.5 GHz Base', gen: '13th Gen Raptor Lake', desc: 'Hybrid CPU built for powerful gaming and creator workloads.', gaming: 'Excellent 1440p and high-refresh performance.', productivity: 'Great for streaming and video production.', price: 25500, img: 'https://www.intel.com/content/dam/www/central-libraries/us/en/images/featured/hero/desktop-processors.png' },
  { id: 'ryzen-7-7700x', name: 'AMD Ryzen 7 7700X', brand: 'amd', tier: 'mid', cores: '8 Cores', threads: '16 Threads', clock: '4.5 GHz Boost', gen: 'Zen 4', desc: 'Premium CPU with fast clocks and efficient power delivery.', gaming: 'Smooth high-refresh gaming and multitasking.', productivity: 'Fast creative workload performance.', price: 28800, img: 'https://www.amd.com/system/files/2023-12/hero-product-image-ryzen-7000.png' },
  { id: 'i7-13700k', name: 'Intel Core i7-13700K', brand: 'intel', tier: 'high', cores: '16 Cores', threads: '24 Threads', clock: '3.4 GHz Base', gen: '13th Gen Raptor Lake', desc: 'Enthusiast CPU with massive throughput and fast responsiveness.', gaming: 'Great for 4K and high-refresh gaming.', productivity: 'Perfect for heavy editing and multitasking.', price: 36200, img: 'https://www.intel.com/content/dam/www/central-libraries/us/en/images/featured/hero/desktop-processors.png' },
  { id: 'ryzen-9-7900x', name: 'AMD Ryzen 9 7900X', brand: 'amd', tier: 'high', cores: '12 Cores', threads: '24 Threads', clock: '4.7 GHz Boost', gen: 'Zen 4', desc: 'High-end CPU with excellent gaming and creative performance.', gaming: 'Solid 4K and productivity frame delivery.', productivity: 'Ideal for content creation and intense multitasking.', price: 45800, img: 'https://www.amd.com/system/files/2023-12/hero-product-image-ryzen-7000.png' },
  { id: 'i9-13900k', name: 'Intel Core i9-13900K', brand: 'intel', tier: 'high', cores: '24 Cores', threads: '32 Threads', clock: '3.0 GHz Base', gen: '13th Gen Raptor Lake', desc: 'Flagship processor for top-tier gaming and professional workloads.', gaming: 'Ultra-premium performance in demanding titles.', productivity: 'Unmatched speed for rendering and simulations.', price: 62000, img: 'https://www.intel.com/content/dam/www/central-libraries/us/en/images/featured/hero/desktop-processors.png' }
];

let activeFilter = 'all';

function findCPU(id) {
  return cpuData.find(item => item.id === id);
}

function buyNowCPU(id) {
  const cpu = findCPU(id);
  if (!cpu) return;
  quickBuy(cpu, 'CPU');
}

function handleAddToCartCPU(id) {
  const cpu = findCPU(id);
  if (!cpu) return;
  addToCart(cpu, 'CPU');
}

function createCard(cpu, index) {
  const points = calcPoints(cpu.price);
  const card = document.createElement('div');
  card.className = `gpu-card ${cpu.brand}-card`;
  card.style.animationDelay = `${index * 60}ms`;
  card.dataset.brand = cpu.brand;
  card.dataset.tier = cpu.tier;
  card.innerHTML = `
    <div class="card-img-wrap">
      <div class="card-img-bg"></div>
      <span class="brand-badge ${cpu.brand}">${cpu.brand.toUpperCase()}</span>
      <span class="tier-badge ${cpu.tier}">${cpu.tier}</span>
      <img class="gpu-img" src="${cpu.img}" alt="${cpu.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"280\" height=\"180\"><rect width=\"100%\" height=\"100%\" fill=\"rgba(255,255,255,0.06)\"/><text x=\"50%\" y=\"50%\" fill=\"rgba(255,255,255,0.4)\" font-family=\"Arial\" font-size=\"14\" text-anchor=\"middle\">CPU IMAGE</text></svg>'">
    </div>
    <div class="card-body">
      <div class="card-name">${cpu.name}</div>
      <div class="card-gen">${cpu.gen}</div>
      <div class="card-specs">
        <div class="spec-chip">${cpu.cores}</div>
        <div class="spec-chip">${cpu.threads}</div>
      </div>
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-label">Clock</div>
          <div class="stat-value">${cpu.clock}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Price</div>
          <div class="stat-value">${formatEGP(cpu.price)} EGP</div>
        </div>
      </div>
      <div class="card-desc">${cpu.desc}</div>
      <div class="card-performance">
        <span>Gaming: <small>${cpu.gaming}</small></span>
        <span>Productivity: <small>${cpu.productivity}</small></span>
      </div>
      <div class="card-price-row">
        <div class="card-pts-earn">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          +${points} pts
        </div>
      </div>
      <div class="card-btns">
        <button class="btn-buy" onclick="buyNowCPU('${cpu.id}')">BUY NOW</button>
        <button class="btn-cart" onclick="handleAddToCartCPU('${cpu.id}')">ADD CART</button>
      </div>
    </div>
  `;
  return card;
}

function renderProducts(filter = 'all') {
  const root = document.getElementById('products-root');
  root.innerHTML = '';
  const tiers = [
    { key: 'budget', label: 'Budget CPUs', badge: 'budget' },
    { key: 'mid', label: 'Mid-Range CPUs', badge: 'mid' },
    { key: 'high', label: 'High-End CPUs', badge: 'high' },
  ];
  let total = 0;
  tiers.forEach(tier => {
    let items = cpuData.filter(item => item.tier === tier.key);
    if (filter === 'intel') items = items.filter(item => item.brand === 'intel');
    else if (filter === 'amd') items = items.filter(item => item.brand === 'amd');
    else if (['budget','mid','high'].includes(filter) && filter !== tier.key) items = [];
    if (!items.length) return;
    total += items.length;
    const section = document.createElement('div');
    section.className = 'cat-section';
    section.innerHTML = `
      <div class="cat-header">
        <div class="cat-line"></div>
        <span class="cat-badge ${tier.badge}">${tier.label}</span>
        <span class="cat-count">${items.length} products</span>
        <div class="cat-line"></div>
      </div>
      <div class="gpu-grid"></div>
    `;
    root.appendChild(section);
    const grid = section.querySelector('.gpu-grid');
    items.forEach((cpu, index) => grid.appendChild(createCard(cpu, index)));
  });
  if (!total) root.innerHTML = `<div class="no-results">No CPUs found for this filter.</div>`;
}

function attachFilterEvents() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts(activeFilter);
    });
  });
}

window.addEventListener('load', () => {
  loadUserProfile();
  loadCart();
  updateTopbar();
  attachFilterEvents();
  renderProducts('all');
  checkReward();
});
