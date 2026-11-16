/* ==========================================
   DE OLHO NO BUEIRO – app.js
   Navigation + Leaflet map + Data
   ========================================== */

/* ---- PAGE NAVIGATION ---- */
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageName).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageName);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Initialize map on first visit
  if (pageName === 'mapa' && !mapInitialized) {
    setTimeout(initMap, 100);
  }
}

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- SEWER DATA (Bueiros de Porto Velho – simulado) ---- */
const sewers = [
  {
    id: 1,
    name: 'Bueiro B-001',
    address: 'Av. Lauro Sodré, 142 – Centro',
    lat: -8.7607, lng: -63.9008,
    level: 12,
    status: 'ok',
    lastRead: 'Hoje, 11:48',
    sensorId: 'SIG-C-001',
    ticket: 'Nenhum',
    history: [
      { time: '08:00', level: 10, status: 'ok' },
      { time: '09:00', level: 11, status: 'ok' },
      { time: '10:00', level: 12, status: 'ok' },
    ]
  },
  {
    id: 2,
    name: 'Bueiro B-002',
    address: 'R. José Camacho, 89 – Arigolândia',
    lat: -8.7625, lng: -63.8975,
    level: 68,
    status: 'warning',
    lastRead: 'Hoje, 11:51',
    sensorId: 'SIG-C-002',
    ticket: 'Nenhum',
    history: [
      { time: '08:00', level: 42, status: 'ok' },
      { time: '09:00', level: 55, status: 'warning' },
      { time: '10:00', level: 68, status: 'warning' },
    ]
  },
  {
    id: 3,
    name: 'Bueiro B-003',
    address: 'Av. Carlos Gomes, 311 – Nossa Sra. das Graças',
    lat: -8.7580, lng: -63.9050,
    level: 94,
    status: 'critical',
    lastRead: 'Hoje, 11:49',
    sensorId: 'SIG-C-003',
    ticket: '#PVH-2026-0841 — Aberto',
    history: [
      { time: '08:00', level: 60, status: 'warning' },
      { time: '09:00', level: 78, status: 'warning' },
      { time: '10:00', level: 94, status: 'critical' },
    ]
  },
  {
    id: 4,
    name: 'Bueiro B-004',
    address: 'Rua Rui Barbosa, 55 – Centro',
    lat: -8.7598, lng: -63.9020,
    level: 25,
    status: 'ok',
    lastRead: 'Hoje, 11:47',
    sensorId: 'SIG-C-004',
    ticket: 'Nenhum',
    history: [
      { time: '08:00', level: 20, status: 'ok' },
      { time: '09:00', level: 22, status: 'ok' },
      { time: '10:00', level: 25, status: 'ok' },
    ]
  },
  {
    id: 5,
    name: 'Bueiro B-005',
    address: 'Av. Amazonas, 500 – Liberdade',
    lat: -8.7645, lng: -63.9100,
    level: 55,
    status: 'warning',
    lastRead: 'Hoje, 11:50',
    sensorId: 'SIG-C-005',
    ticket: 'Nenhum',
    history: [
      { time: '08:00', level: 30, status: 'ok' },
      { time: '09:00', level: 44, status: 'ok' },
      { time: '10:00', level: 55, status: 'warning' },
    ]
  },
  {
    id: 6,
    name: 'Bueiro B-006',
    address: 'R. Dom Pedro II, 210 – Centro',
    lat: -8.7615, lng: -63.9035,
    level: 8,
    status: 'ok',
    lastRead: 'Hoje, 11:46',
    sensorId: 'SIG-C-006',
    ticket: 'Nenhum',
    history: [
      { time: '08:00', level: 7, status: 'ok' },
      { time: '09:00', level: 8, status: 'ok' },
      { time: '10:00', level: 8, status: 'ok' },
    ]
  },
  {
    id: 7,
    name: 'Bueiro B-007',
    address: 'Av. Marechal Deodoro, 78 – Olaria',
    lat: -8.7560, lng: -63.9065,
    level: 83,
    status: 'critical',
    lastRead: 'Hoje, 11:52',
    sensorId: 'SIG-C-007',
    ticket: '#PVH-2026-0839 — Em análise',
    history: [
      { time: '08:00', level: 65, status: 'warning' },
      { time: '09:00', level: 76, status: 'warning' },
      { time: '10:00', level: 83, status: 'critical' },
    ]
  },
  {
    id: 8,
    name: 'Bueiro B-008',
    address: 'R. Pinheiro Machado, 190 – Caiari',
    lat: -8.7635, lng: -63.9085,
    level: 38,
    status: 'ok',
    lastRead: 'Hoje, 11:45',
    sensorId: 'SIG-C-008',
    ticket: 'Nenhum',
    history: [
      { time: '08:00', level: 30, status: 'ok' },
      { time: '09:00', level: 35, status: 'ok' },
      { time: '10:00', level: 38, status: 'ok' },
    ]
  },
  {
    id: 9,
    name: 'Bueiro B-009',
    address: 'Av. Jorge Teixeira, 455 – Aponiã',
    lat: -8.7550, lng: -63.9010,
    level: 72,
    status: 'warning',
    lastRead: 'Hoje, 11:53',
    sensorId: 'SIG-C-009',
    ticket: 'Nenhum',
    history: [
      { time: '08:00', level: 50, status: 'warning' },
      { time: '09:00', level: 62, status: 'warning' },
      { time: '10:00', level: 72, status: 'warning' },
    ]
  },
  {
    id: 10,
    name: 'Bueiro B-010',
    address: 'R. Almirante Barroso, 300 – Centro',
    lat: -8.7590, lng: -63.9000,
    level: 15,
    status: 'ok',
    lastRead: 'Hoje, 11:44',
    sensorId: 'SIG-C-010',
    ticket: 'Nenhum',
    history: [
      { time: '08:00', level: 12, status: 'ok' },
      { time: '09:00', level: 14, status: 'ok' },
      { time: '10:00', level: 15, status: 'ok' },
    ]
  },
];

/* ---- STATUS HELPERS ---- */
function getColor(status) {
  if (status === 'ok')       return '#4caf50';
  if (status === 'warning')  return '#ffc107';
  if (status === 'critical') return '#f44336';
  return '#888';
}
function getLabel(status) {
  if (status === 'ok')       return 'Normal';
  if (status === 'warning')  return 'Atenção';
  if (status === 'critical') return 'Crítico';
  return '—';
}
function getBadgeStyle(status) {
  if (status === 'ok')       return 'background:#e8f5e9;color:#2e7d32;';
  if (status === 'warning')  return 'background:#fff9c4;color:#f57f17;';
  if (status === 'critical') return 'background:#ffebee;color:#c62828;';
  return '';
}

/* ---- MAP ---- */
let mapInitialized = false;
let leafletMap;

function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  leafletMap = L.map('map').setView([-8.7612, -63.9020], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(leafletMap);

  // Add markers
  sewers.forEach(sewer => {
    const colorClass = sewer.status === 'ok' ? 'green' :
                       sewer.status === 'warning' ? 'yellow' : 'red';

    const icon = L.divIcon({
      className: '',
      html: `<div class="custom-marker ${colorClass}" title="${sewer.name}">
               ${sewer.level}%
             </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const marker = L.marker([sewer.lat, sewer.lng], { icon }).addTo(leafletMap);
    marker.on('click', () => showSewerDetail(sewer));
  });

  // Update summary
  updateSummary();

  // Fix map size
  setTimeout(() => leafletMap.invalidateSize(), 200);
}

function updateSummary() {
  const normal   = sewers.filter(s => s.status === 'ok').length;
  const warning  = sewers.filter(s => s.status === 'warning').length;
  const critical = sewers.filter(s => s.status === 'critical').length;
  const total    = sewers.length;

  document.getElementById('countNormal').textContent   = normal;
  document.getElementById('countWarning').textContent  = warning;
  document.getElementById('countCritical').textContent = critical;
  document.getElementById('countTotal').textContent    = total;
}

function showSewerDetail(sewer) {
  document.getElementById('sidebarPlaceholder').style.display = 'none';
  const detail = document.getElementById('sidebarDetail');
  detail.style.display = 'block';

  // Badge
  const badge = document.getElementById('detailBadge');
  badge.textContent = getLabel(sewer.status);
  badge.setAttribute('style', getBadgeStyle(sewer.status) + 'display:inline-block;padding:4px 12px;border-radius:50px;font-size:12px;font-weight:700;');

  document.getElementById('detailName').textContent    = sewer.name;
  document.getElementById('detailAddress').textContent = sewer.address;

  // Gauge
  const bar = document.getElementById('gaugeBar');
  bar.style.width = sewer.level + '%';
  bar.style.background = getColor(sewer.status);
  document.getElementById('gaugeLabel').textContent = `${sewer.level}% de capacidade`;

  document.getElementById('detailLastRead').textContent = sewer.lastRead;
  document.getElementById('detailLevel').textContent    = sewer.level + '%';
  document.getElementById('detailTicket').textContent   = sewer.ticket;
  document.getElementById('detailSensor').textContent   = sewer.sensorId;

  // History
  const histDiv = document.getElementById('detailHistory');
  let html = '<strong>Histórico de hoje</strong>';
  sewer.history.forEach(h => {
    const cls = h.status === 'ok' ? 'ok' : h.status === 'warning' ? 'warn' : 'crit';
    const icon = h.status === 'ok' ? '✅' : h.status === 'warning' ? '⚠️' : '🚨';
    html += `<div class="history-item ${cls}">${icon} ${h.time} — ${h.level}% — ${getLabel(h.status)}</div>`;
  });
  histDiv.innerHTML = html;

  // Pan map to sewer
  if (leafletMap) {
    leafletMap.setView([sewer.lat, sewer.lng], 16, { animate: true });
  }
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});
