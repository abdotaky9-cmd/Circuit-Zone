const motherboardData = [
  {
    id: 'asus-tuf-b660',
    name: 'ASUS TUF Gaming B660',
    brand: 'asus',
    tier: 'budget',
    chipset: 'B660',
    socket: 'LGA1700',
    factor: 'ATX',
    desc: 'Affordable gaming motherboard with solid power delivery and PCIe 4.0 support.',
    compatibility: 'Intel 12th / 13th Gen CPUs',
    extra: 'Dual M.2, DDR5 Ready',
    price: 9900,
    img: 'https://dlcdnwebimgs.asus.com/gain/747A2B5D-F711-4C64-A90C-924F5D3D4F98/w1000/h732',
  },
  {
    id: 'msi-b650m-pro',
    name: 'MSI PRO B650M',
    brand: 'msi',
    tier: 'budget',
    chipset: 'B650',
    socket: 'AM5',
    factor: 'mATX',
    desc: 'Reliable budget board with modern connectivity and stable memory support.',
    compatibility: 'AMD Ryzen 7000 Series',
    extra: 'PCIe 4.0, USB-C',
    price: 10500,
    img: 'https://asset.msi.com/resize/image/global/product/product_4_20211222164633_61b6b2c1aa83f.png62405f0c786c1f0f/600.png',
  },
  {
    id: 'gigabyte-b660-aorus',
    name: 'Gigabyte B660 Aorus',
    brand: 'gigabyte',
    tier: 'budget',
    chipset: 'B660',
    socket: 'LGA1700',
    factor: 'ATX',
    desc: 'Entry-level Aorus motherboard with RGB headers and enhanced audio.',
    compatibility: 'Intel 12th / 13th Gen',
    extra: '2.5G LAN, M.2 Shield',
    price: 11200,
    img: 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/862/images/b660-aorus-master-1.png',
  },
  {
    id: 'asus-rog-strix-x670e',
    name: 'ASUS ROG Strix X670E',
    brand: 'asus',
    tier: 'mid',
    chipset: 'X670E',
    socket: 'AM5',
    factor: 'ATX',
    desc: 'Premium mid-range board built for high-end Ryzen gaming and overclocking.',
    compatibility: 'AMD Ryzen 7000',
    extra: 'PCIe 5.0, Wi-Fi 6E',
    price: 23500,
    img: 'https://dlcdnwebimgs.asus.com/gain/47F2ECFB-6BA8-483A-8235-F69FDADB55F7/w1000/h732',
  },
  {
    id: 'msi-mag-b660',
    name: 'MSI MAG B660 Tomahawk',
    brand: 'msi',
    tier: 'mid',
    chipset: 'B660',
    socket: 'LGA1700',
    factor: 'ATX',
    desc: 'Balanced board that blends premium thermal design with fast connectivity.',
    compatibility: 'Intel 12th / 13th Gen',
    extra: 'DDR5 Ready, 2.5G LAN',
    price: 18900,
    img: 'https://asset.msi.com/resize/image/global/product/product_1648707116a1d5ed35f50b0f9f197a0fc5635e6bc8.png62405f0c786c1f0f/600.png',
  },
  {
    id: 'gigabyte-x670-aurous',
    name: 'Gigabyte X670 Aorus Elite',
    brand: 'gigabyte',
    tier: 'mid',
    chipset: 'X670',
    socket: 'AM5',
    factor: 'ATX',
    desc: 'Strong feature set for creators with dual M.2 and solid VRM performance.',
    compatibility: 'AMD Ryzen 7000',
    extra: 'PCIe 5.0, Smart Fan',
    price: 22100,
    img: 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/860/images/x670-aorus-elite-hero.png',
  },
  {
    id: 'asus-rog-crosshair-x670e',
    name: 'ASUS ROG Crosshair X670E',
    brand: 'asus',
    tier: 'high',
    chipset: 'X670E',
    socket: 'AM5',
    factor: 'ATX',
    desc: 'Elite flagship board with premium power stages and extreme tuning controls.',
    compatibility: 'AMD Ryzen 7000',
    extra: 'PCIe 5.0, DDR5, Wi-Fi 6E',
    price: 38500,
    img: 'https://dlcdnwebimgs.asus.com/gain/70A0B5D7-8DB0-4740-BDA6-0AF93A422F13/w1000/h732',
  },
  {
    id: 'msi-meg-z790',
    name: 'MSI MEG Z790 Ace',
    brand: 'msi',
    tier: 'high',
    chipset: 'Z790',
    socket: 'LGA1700',
    factor: 'E-ATX',
    desc: 'Top-tier Intel flagship board for maximum I/O and cooling performance.',
    compatibility: 'Intel 13th Gen',
    extra: 'Thunderbolt 4, PCIe 5.0',
    price: 41200,
    img: 'https://asset.msi.com/resize/image/global/product/product_1680124321118eb49b8d1a64f24b930c6522fcfd5.png62405f0c786c1f0f/600.png',
  },
  {
    id: 'gigabyte-z790-aorus',
    name: 'Gigabyte Z790 Aorus Master',
    brand: 'gigabyte',
    tier: 'high',
    chipset: 'Z790',
    socket: 'LGA1700',
    factor: 'ATX',
    desc: 'Flagship motherboard with a premium audio system and robust power delivery.',
    compatibility: 'Intel 13th Gen',
    extra: 'PCIe 5.0, 10GbE LAN',
    price: 44500,
    img: 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/857/images/z790-aorus-master.png',
  },
];

let activeFilter = 'all';

function createBoardCard(board, index) {
  const points = calcPoints(board.price);
  const card = document.createElement('div');
  card.className = `gpu-card ${board.brand}-card`;
  card.style.animationDelay = `${index * 60}ms`;
  card.dataset.brand = board.brand;
  card.dataset.tier = board.tier;

  card.innerHTML = `
    <div class="card-img-wrap">
      <div class="card-img-bg"></div>
      <span class="brand-badge ${board.brand}">${board.brand.toUpperCase()}</span>
      <span class="tier-badge ${board.tier}">${board.tier}</span>
      <img class="gpu-img" src="${board.img}" alt="${board.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"280\" height=\"180\"><rect width=\"100%\" height=\"100%\" fill=\"rgba(255,255,255,0.06)\"/><text x=\"50%\" y=\"50%\" fill=\"rgba(255,255,255,0.4)\" font-family=\"Arial\" font-size=\"14\" text-anchor=\"middle\">BOARD IMAGE</text></svg>'">
    </div>
    <div class="card-body">
      <div class="card-name">${board.name}</div>
      <div class="card-gen">${board.chipset} • ${board.socket}</div>
      <div class="card-specs">
        <div class="spec-chip">${board.factor}</div>
        <div class="spec-chip">${board.extra}</div>
      </div>
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-label">Compatibility</div>
          <div class="stat-value">${board.compatibility}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Price</div>
          <div class="stat-value">${formatEGP(board.price)} EGP</div>
        </div>
      </div>
      <div class="card-desc">${board.desc}</div>
      <div class="card-price-row">
        <div class="card-pts-earn">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          +${points} pts
        </div>
      </div>
      <div class="card-btns">
        <button class="btn-buy" onclick="quickBuy(${JSON.stringify(board)}, 'Motherboard')">BUY NOW</button>
        <button class="btn-cart" onclick="addToCart(${JSON.stringify(board)}, 'Motherboard')">ADD CART</button>
      </div>
    </div>
  `;
  return card;
}

function renderMotherboards(filter = 'all') {
  const root = document.getElementById('products-root');
  root.innerHTML = '';

  const tiers = [
    { key: 'budget', label: 'Budget Boards', badge: 'budget' },
    { key: 'mid', label: 'Mid-Range Boards', badge: 'mid' },
    { key: 'high', label: 'High-End Boards', badge: 'high' },
  ];
  let total = 0;

  tiers.forEach(tier => {
    let items = motherboardData.filter(board => board.tier === tier.key);
    if (filter === 'asus' || filter === 'msi' || filter === 'gigabyte') {
      items = items.filter(board => board.brand === filter);
    } else if (['budget','mid','high'].includes(filter) && filter !== tier.key) {
      items = [];
    }

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
    items.forEach((board, index) => grid.appendChild(createBoardCard(board, index)));
  });

  if (!total) root.innerHTML = `<div class="no-results">No motherboards found for this filter.</div>`;
}

function attachFilterEvents() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderMotherboards(activeFilter);
    });
  });
}

window.addEventListener('load', () => {
  loadUserProfile();
  loadCart();
  updateTopbar();
  attachFilterEvents();
  renderMotherboards('all');
});
