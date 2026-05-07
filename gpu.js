const gpuData = [
  { id: 'rx6600', name: 'Radeon RX 6600', brand: 'amd', tier: 'budget', vram: '8GB GDDR6', gen: 'RDNA 2', desc: 'Excellent entry-level GPU for 1080p gaming with low power consumption.', fps: '100–140 FPS @ 1080p Ultra', price: 18500, img: 'https://www.amd.com/system/files/2021-10/655432-amd-radeon-rx-6600-graphics-card-1260x709.png' },
  { id: 'rtx3060', name: 'GeForce RTX 3060', brand: 'nvidia', tier: 'budget', vram: '12GB GDDR6', gen: 'Ampere', desc: 'Versatile 1080p/1440p card with DLSS support and efficient cooling.', fps: '90–130 FPS @ 1080p High', price: 22000, img: 'https://assets.nvidia.partners/images/png/ASUS-RTX-3060-Phoenix-Fan-Ed-OC-V2.png' },
  { id: 'rtx4060', name: 'GeForce RTX 4060', brand: 'nvidia', tier: 'budget', vram: '8GB GDDR6', gen: 'Ada Lovelace', desc: 'Efficient next-gen 1080p GPU with DLSS 3 Frame Generation.', fps: '120–170 FPS @ 1080p Ultra', price: 25000, img: 'https://dlcdnwebimgs.asus.com/gain/EC3F0E69-A5A8-4B82-BD24-B83B2A6A1C8E/w1000/h732' },
  { id: 'rx6700xt', name: 'Radeon RX 6700 XT', brand: 'amd', tier: 'mid', vram: '12GB GDDR6', gen: 'RDNA 2', desc: 'Powerful 1440p performer with ample VRAM and high refresh rates.', fps: '90–130 FPS @ 1440p Ultra', price: 32000, img: 'https://www.amd.com/system/files/2021-03/655432-amd-radeon-rx-6700-xt-graphics-card-1260x709.png' },
  { id: 'rtx3070', name: 'GeForce RTX 3070', brand: 'nvidia', tier: 'mid', vram: '8GB GDDR6', gen: 'Ampere', desc: 'Legendary 1440p card with ray tracing and excellent value.', fps: '80–120 FPS @ 1440p High', price: 35000, img: 'https://assets.nvidia.partners/images/png/ASUS-RTX3070-TUF-GAMING-OC.png' },
  { id: 'rx7700xt', name: 'Radeon RX 7700 XT', brand: 'amd', tier: 'mid', vram: '12GB GDDR6', gen: 'RDNA 3', desc: 'Next-gen architecture with strong 1440p performance.', fps: '100–140 FPS @ 1440p Ultra', price: 38000, img: 'https://www.amd.com/system/files/2023-09/655432-radeon-rx-7700-xt-graphics-card-1260x709.png' },
  { id: 'rtx4060ti', name: 'GeForce RTX 4060 Ti', brand: 'nvidia', tier: 'mid', vram: '16GB GDDR6', gen: 'Ada Lovelace', desc: 'Great 1440p GPU with future-proof VRAM and DLSS 3.', fps: '110–160 FPS @ 1440p High', price: 42000, img: 'https://dlcdnwebimgs.asus.com/gain/63174CE1-BAF7-4E1A-8D5D-EE71A3C2EDB2/w1000/h732' },
  { id: 'rx7900gre', name: 'Radeon RX 7900 GRE', brand: 'amd', tier: 'high', vram: '16GB GDDR6', gen: 'RDNA 3', desc: 'High-end performer for 4K gaming and creative workloads.', fps: '80–120 FPS @ 4K Ultra', price: 58000, img: 'https://www.amd.com/system/files/2023-08/655432-radeon-rx-7900-gre-graphics-card-1260x709.png' },
  { id: 'rtx4070super', name: 'GeForce RTX 4070 Super', brand: 'nvidia', tier: 'high', vram: '12GB GDDR6X', gen: 'Ada Lovelace', desc: 'The sweet spot for 1440p / 4K gaming with DLSS 3.5.', fps: '100–150 FPS @ 1440p Ultra', price: 65000, img: 'https://assets.nvidia.partners/images/png/MSI-RTX-4070-SUPER-GAMING-X-SLIM.png' },
  { id: 'rx7900xtx', name: 'Radeon RX 7900 XTX', brand: 'amd', tier: 'high', vram: '24GB GDDR6', gen: 'RDNA 3', desc: "AMD's flagship 4K option with massive memory and performance.", fps: '90–140 FPS @ 4K Ultra', price: 82000, img: 'https://www.amd.com/system/files/2022-11/655432-radeon-rx-7900-xtx-graphics-card-1260x709.png' },
  { id: 'rtx4090', name: 'GeForce RTX 4090', brand: 'nvidia', tier: 'high', vram: '24GB GDDR6X', gen: 'Ada Lovelace', desc: 'The fastest consumer GPU, ideal for extreme 4K gaming and AI workloads.', fps: '120–180 FPS @ 4K Ultra', price: 145000, img: 'https://dlcdnwebimgs.asus.com/gain/d4e26ce2-4d8a-4d0f-9b56-5e2c48a5a1d1/w1000/h732' }
];

let activeFilter = 'all';

function findGPU(id) {
  return gpuData.find(item => item.id === id);
}

function buyNow(id) {
  const gpu = findGPU(id);
  if (!gpu) return;
  quickBuy(gpu, 'GPU');
}

function handleAddToCart(id) {
  const gpu = findGPU(id);
  if (!gpu) return;
  addToCart(gpu, 'GPU');
}

function createCard(gpu, index) {
  const points = calcPoints(gpu.price);
  const card = document.createElement('div');
  card.className = `gpu-card ${gpu.brand}-card`;
  card.style.animationDelay = `${index * 60}ms`;
  card.dataset.brand = gpu.brand;
  card.dataset.tier = gpu.tier;
  card.innerHTML = `
    <div class="card-img-wrap">
      <div class="card-img-bg"></div>
      <span class="brand-badge ${gpu.brand}">${gpu.brand.toUpperCase()}</span>
      <span class="tier-badge ${gpu.tier}">${gpu.tier}</span>
      <img class="gpu-img" src="${gpu.img}" alt="${gpu.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"280\" height=\"180\"><rect width=\"100%\" height=\"100%\" fill=\"rgba(255,255,255,0.06)\"/><text x=\"50%\" y=\"50%\" fill=\"rgba(255,255,255,0.4)\" font-family=\"Arial\" font-size=\"14\" text-anchor=\"middle\">GPU IMAGE</text></svg>'">
    </div>
    <div class="card-body">
      <div class="card-name">${gpu.name}</div>
      <div class="card-gen">${gpu.gen}</div>
      <div class="card-specs">
        <div class="spec-chip">${gpu.vram}</div>
        <div class="spec-chip">${gpu.fps}</div>
      </div>
      <div class="card-desc">${gpu.desc}</div>
      <div class="card-price-row">
        <div>
          <div class="card-price">${formatEGP(gpu.price)} <span class="card-price-egp">EGP</span></div>
        </div>
        <div class="card-pts-earn">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          +${points} pts
        </div>
      </div>
      <div class="card-btns">
        <button class="btn-buy" onclick="buyNow('${gpu.id}')">BUY NOW</button>
        <button class="btn-cart" onclick="handleAddToCart('${gpu.id}')">ADD CART</button>
      </div>
    </div>
  `;
  return card;
}

function renderProducts(filter = 'all') {
  const root = document.getElementById('products-root');
  root.innerHTML = '';
  const tiers = [
    { key: 'budget', label: 'Budget GPUs', badge: 'budget' },
    { key: 'mid', label: 'Mid-Range GPUs', badge: 'mid' },
    { key: 'high', label: 'High-End GPUs', badge: 'high' },
  ];
  let total = 0;
  tiers.forEach(tier => {
    let items = gpuData.filter(item => item.tier === tier.key);
    if (filter === 'nvidia') items = items.filter(item => item.brand === 'nvidia');
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
    items.forEach((gpu, index) => grid.appendChild(createCard(gpu, index)));
  });
  if (!total) root.innerHTML = `<div class="no-results">No GPUs found for this filter.</div>`;
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
