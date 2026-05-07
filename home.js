/* ── SIDEBAR ─────────────────────────────────────────── */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menu-btn');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  menuBtn.classList.add('active');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  menuBtn.classList.remove('active');
}

function toggleSidebar() {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
});

/* ── SEARCH REDIRECT ─────────────────────────────────── */
const pages = {
  gpu:         'gpu.html',
  graphics:    'gpu.html',
  cpu:         'cpu.html',
  processor:   'cpu.html',
  ram:         'ram.html',
  memory:      'ram.html',
  motherboard: 'motherboard.html',
  mobo:        'motherboard.html',
  cooling:     'cooling.html',
  cooler:      'cooling.html',
  fan:         'cooling.html',
  aio:         'cooling.html',
  mouse:       'mouse.html',
  keyboard:    'keyboard.html',
  kb:          'keyboard.html',
  ssd:         'ssd.html',
  hdd:         'hdd.html',
  'hard drive':'hdd.html',
  harddrive:   'hdd.html',
  profile:     'profile.html',
};

function doSearch() {
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  if (!q) return;
  const match = Object.keys(pages).find(k => q.includes(k));
  if (match) {
    window.location.href = pages[match];
  } else {
    window.location.href = `search.html?q=${encodeURIComponent(q)}`;
  }
}

document.getElementById('search-submit').addEventListener('click', doSearch);
document.getElementById('search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

/* ── ANIMATED BACKGROUND LINES ───────────────────────── */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, lines = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Line {
  constructor() { this.reset(true); }

  reset(init = false) {
    this.x     = Math.random() * W;
    this.y     = init ? Math.random() * H : -10;
    this.len   = 60 + Math.random() * 120;
    this.speed = 0.18 + Math.random() * 0.32;
    this.alpha = 0.04 + Math.random() * 0.09;
    this.width = 0.4 + Math.random() * 0.8;
    this.angle = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
  }

  update() {
    this.y += this.speed;
    if (this.y - this.len > H) this.reset();
  }

  draw() {
    const dx   = Math.cos(this.angle) * this.len;
    const dy   = Math.sin(this.angle) * this.len;
    const grad = ctx.createLinearGradient(this.x, this.y, this.x + dx, this.y + dy);
    grad.addColorStop(0,   `rgba(255,255,255,0)`);
    grad.addColorStop(0.5, `rgba(255,255,255,${this.alpha})`);
    grad.addColorStop(1,   `rgba(255,255,255,0)`);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + dx, this.y + dy);
    ctx.strokeStyle = grad;
    ctx.lineWidth   = this.width;
    ctx.stroke();
  }
}

for (let i = 0; i < 55; i++) lines.push(new Line());

function loop() {
  ctx.clearRect(0, 0, W, H);
  lines.forEach(l => { l.update(); l.draw(); });
  requestAnimationFrame(loop);
}
loop();