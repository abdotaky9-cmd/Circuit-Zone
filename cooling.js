const coolingData = [
  {
    id: 'asus-rog-ryuo-240',
    name: 'ASUS ROG Ryuo 240',
    brand: 'asus',
    type: 'Liquid',
    performance: '240mm AIO',
    desc: 'ARGB liquid cooling with ceramic bearings and integrated OLED display for elite builds.',
    price: 9800,
    img: 'https://dlcdnwebimgs.asus.com/gain/ACDD18D6-A4B8-4E5D-8B6E-041372816C8E/w1000/h732',
  },
  {
    id: 'corsair-h150i',
    name: 'Corsair iCUE H150i Elite',
    brand: 'corsair',
    type: 'Liquid',
    performance: '360mm AIO',
    desc: 'Premium 360mm radiator with RGB pump head and ultra-quiet magnetic levitation fans.',
    price: 12800,
    img: 'https://www.corsair.com/corsairmedia/sys_master/productcontent/blogcontent_aco/6f3/9584629619774/-H150i-Elite-1.jpg',
  },
  {
    id: 'noctua-d15',
    name: 'Noctua NH-D15',
    brand: 'noctua',
    type: 'Air',
    performance: 'Dual-tower',
    desc: 'Legendary dual-tower cooler with premium fans and extreme heat dissipation.',
    price: 4600,
    img: 'https://assets.noctua.at/goods/images/it/NH-D15.png',
  },
  {
    id: 'be-quiet-dark-rock-pro-4',
    name: 'be quiet! Dark Rock Pro 4',
    brand: 'bequiet',
    type: 'Air',
    performance: 'Dual tower',
    desc: 'Ultra-silent high-performance cooler with advanced airflow and premium build.',
    price: 5100,
    img: 'https://www.bequiet.com/fileadmin/_processed_/0/7/csm_dark_rock_pro_4_6965fca70d.png',
  },
  {
    id: 'nzxt-kraken-x63',
    name: 'NZXT Kraken X63',
    brand: 'nzxt',
    type: 'Liquid',
    performance: '280mm AIO',
    desc: 'Stylish AIO with RGB infinity mirror pump and efficient cooling for compact high-end builds.',
    price: 10400,
    img: 'https://nzxt.com/assets/cms/production/kraken-x63.png',
  },
  {
    id: 'gigabyte-aorus-liquid',
    name: 'Gigabyte Aorus Liquid Cooler',
    brand: 'gigabyte',
    type: 'Liquid',
    performance: '240mm AIO',
    desc: 'High-flow radiator and ARGB fans tuned for performance gaming rigs.',
    price: 7600,
    img: 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/860/images/cooler.png',
  },
  {
    id: 'arctic-liquid-freezer-ii-360',
    name: 'ARCTIC Liquid Freezer II 360',
    brand: 'arctic',
    type: 'Liquid',
    performance: '360mm AIO',
    desc: 'Efficient all-in-one liquid cooler with integrated VRM fan and high-pressure pump.',
    price: 9200,
    img: 'https://www.arctic.ac/media/catalog/product/cache/9b0ab9069ad483742d2476462e7e4541/l/i/liquid_freezer_ii_360_1.png',
  },
  {
    id: 'cooler-master-masterair-ma620m',
    name: 'Cooler Master MA620M',
    brand: 'coolermaster',
    type: 'Hybrid',
    performance: 'Dual tower',
    desc: 'Hybrid air cooler with dual fans and ARGB lighting for premium thermal and style.',
    price: 6800,
    img: 'https://static.coolermaster.com/media/catalog/product/cache/1/image/420x420/9df78eab33525d08d6e5fb8d27136e95/2/4/247ae9119efba69b53abb77183714955.png',
  },
];

let activeFilter = 'all';

function findCooler(id) {
  return coolingData.find(item => item.id === id);
}

function buyNowCooling(id) {
  const cooler = findCooler(id);
  if (!cooler) return;
  quickBuy(cooler, 'Cooling');
}

function handleAddToCartCooling(id) {
  const cooler = findCooler(id);
  if (!cooler) return;
  addToCart(cooler, 'Cooling');
}

function createCoolerCard(cooler, index) {
  const points = calcPoints(cooler.price);
  const card = document.createElement('div');
  card.className = `gpu-card ${cooler.brand}-card`;
  card.style.animationDelay = `${index * 60}ms`;
  card.dataset.brand = cooler.brand;
  card.dataset.tier = cooler.type.toLowerCase();
  card.innerHTML = `
    <div class="card-img-wrap">
      <div class="card-img-bg"></div>
      <span class="brand-badge ${cooler.brand}">${cooler.brand.toUpperCase()}</span>
      <span class="tier-badge ${cooler.type.toLowerCase()}">${cooler.type}</span>
      <img class="gpu-img" src="${cooler.img}" alt="${cooler.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"280\" height=\"180\"><rect width=\"100%\" height=\"100%\" fill=\"rgba(255,255,255,0.06)\"/><text x=\"50%\" y=\"50%\" fill=\"rgba(255,255,255,0.4)\" font-family=\"Arial\" font-size=\"14\" text-anchor=\"middle\">COOLER IMAGE</text></svg>'">
    </div>
    <div class="card-body">
      <div class="card-name">${cooler.name}</div>
      <div class="card-gen">${cooler.performance}</div>
      <div class="card-specs">
        <div class="spec-chip">${cooler.type}</div>
        <div class="spec-chip">${formatEGP(cooler.price)} EGP</div>
      </div>
      <div class="card-desc">${cooler.desc}</div>
      <div class="card-price-row">
        <div class="card-pts-earn">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          +${points} pts
        </div>
      </div>
      <div class="card-btns">
        <button class="btn-buy" onclick="buyNowCooling('${cooler.id}')">BUY NOW</button>
        <button class="btn-cart" onclick="handleAddToCartCooling('${cooler.id}')">ADD CART</button>
      </div>
    </div>
  `;
  return card;
}

function renderCoolers(filter = 'all') {
  const root = document.getElementById('products-root');
  root.innerHTML = '';
  const types = ['Air','Liquid','Hybrid'];
  let items = coolingData;
  if (filter !== 'all') items = coolingData.filter(item => item.type === filter);
  if (!items.length) {
    root.innerHTML = '<div class="no-results">No cooling products found for this filter.</div>';
    return;
  }
  const section = document.createElement('div');
  section.className = 'cat-section';
  section.innerHTML = `
    <div class="cat-header">
      <div class="cat-line"></div>
      <span class="cat-badge high">Cooling</span>
      <span class="cat-count">${items.length} products</span>
      <div class="cat-line"></div>
    </div>
    <div class="gpu-grid"></div>
  `;
  root.appendChild(section);
  const grid = section.querySelector('.gpu-grid');
  items.forEach((cooler, index) => grid.appendChild(createCoolerCard(cooler, index)));
}

function attachFilterEvents() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderCoolers(activeFilter);
    });
  });
}

window.addEventListener('load', () => {
  loadUserProfile();
  loadCart();
  updateTopbar();
  attachFilterEvents();
  renderCoolers('all');
  checkReward();
});
