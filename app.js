/* =============================================
   FINANCEX - App JavaScript
   ============================================= */

'use strict';

// ===================== DATA =====================

const COLORS = {
  accent: '#6366f1',
  green: '#22c55e',
  red: '#ef4444',
  yellow: '#f59e0b',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  orange: '#f97316',
  pink: '#ec4899',
};

const CATEGORIES = {
  'Alimentation':  { emoji: '🛒', color: '#22c55e' },
  'Transport':     { emoji: '🚗', color: '#3b82f6' },
  'Loisirs':       { emoji: '🎮', color: '#8b5cf6' },
  'Salaire':       { emoji: '💼', color: '#6366f1' },
  'Santé':         { emoji: '🏥', color: '#ef4444' },
  'Logement':      { emoji: '🏠', color: '#f59e0b' },
  'Shopping':      { emoji: '🛍️', color: '#ec4899' },
  'Abonnements':   { emoji: '📱', color: '#06b6d4' },
  'Restaurant':    { emoji: '🍽️', color: '#f97316' },
  'Freelance':     { emoji: '💻', color: '#10b981' },
  'Dividendes':    { emoji: '📈', color: '#6366f1' },
  'Autre':         { emoji: '📦', color: '#64748b' },
};

let allTransactions = [
  { id: 1, desc: 'Salaire Mensuel', category: 'Salaire', date: '2026-07-01', amount: 5500, type: 'income', account: 'Compte Courant (•••• 4521)' },
  { id: 2, desc: 'Loyer Juillet', category: 'Logement', date: '2026-07-02', amount: -1250, type: 'expense', account: 'Compte Courant (•••• 4521)' },
  { id: 3, desc: 'Courses Carrefour', category: 'Alimentation', date: '2026-07-03', amount: -87.50, type: 'expense', account: 'Carte Visa Premium' },
  { id: 4, desc: 'Netflix', category: 'Abonnements', date: '2026-07-04', amount: -17.99, type: 'expense', account: 'Carte Visa Premium' },
  { id: 5, desc: 'Mission Freelance', category: 'Freelance', date: '2026-07-05', amount: 1800, type: 'income', account: 'Compte Courant (•••• 4521)' },
  { id: 6, desc: 'Plein d\'essence', category: 'Transport', date: '2026-07-06', amount: -68.20, type: 'expense', account: 'Carte Visa Premium' },
  { id: 7, desc: 'Restaurant Le Bistrot', category: 'Restaurant', date: '2026-07-07', amount: -56.40, type: 'expense', account: 'Carte Visa Premium' },
  { id: 8, desc: 'Amazon Prime', category: 'Abonnements', date: '2026-07-08', amount: -6.99, type: 'expense', account: 'Carte Visa Premium' },
  { id: 9, desc: 'Spotify', category: 'Abonnements', date: '2026-07-09', amount: -9.99, type: 'expense', account: 'Carte Visa Premium' },
  { id: 10, desc: 'Pharmacie', category: 'Santé', date: '2026-07-10', amount: -34.80, type: 'expense', account: 'Carte Visa Premium' },
  { id: 11, desc: 'Dividendes ETF', category: 'Dividendes', date: '2026-07-11', amount: 340, type: 'income', account: 'Livret A' },
  { id: 12, desc: 'Courses Bio Market', category: 'Alimentation', date: '2026-07-12', amount: -124.30, type: 'expense', account: 'Carte Visa Premium' },
  { id: 13, desc: 'Séance Cinéma', category: 'Loisirs', date: '2026-07-13', amount: -22.00, type: 'expense', account: 'Carte Visa Premium' },
  { id: 14, desc: 'Remboursement Sécu', category: 'Santé', date: '2026-07-14', amount: 180, type: 'income', account: 'Compte Courant (•••• 4521)' },
  { id: 15, desc: 'Abonnement Sport', category: 'Loisirs', date: '2026-07-15', amount: -45, type: 'expense', account: 'Compte Courant (•••• 4521)' },
  { id: 16, desc: 'H&M Shopping', category: 'Shopping', date: '2026-07-16', amount: -143.50, type: 'expense', account: 'Carte Visa Premium' },
  { id: 17, desc: 'RATP Navigo', category: 'Transport', date: '2026-07-16', amount: -90, type: 'expense', account: 'Compte Courant (•••• 4521)' },
  { id: 18, desc: 'Bonus Performance', category: 'Salaire', date: '2026-07-17', amount: 820, type: 'income', account: 'Compte Courant (•••• 4521)' },
];

const GOALS = [
  { label: 'Vacances Été', emoji: '✈️', current: 2400, target: 3500, color: COLORS.cyan },
  { label: 'Fonds Urgence', emoji: '🛡️', current: 8000, target: 10000, color: COLORS.green },
  { label: 'Nouvelle Voiture', emoji: '🚗', current: 5200, target: 18000, color: COLORS.blue },
  { label: 'Retraite', emoji: '🏖️', current: 12000, target: 200000, color: COLORS.purple },
];

const PORTFOLIO = [
  { name: 'MSCI World ETF', symbol: 'IWDA', value: 9800, gain: +18.4, alloc: 39, icon: '🌍', color: '#3b82f6' },
  { name: 'S&P 500 ETF', symbol: 'CSPX', value: 6200, gain: +22.1, alloc: 25, icon: '🇺🇸', color: '#22c55e' },
  { name: 'Bitcoin', symbol: 'BTC', value: 3400, gain: -5.2, alloc: 14, icon: '₿', color: '#f59e0b' },
  { name: 'Apple Inc.', symbol: 'AAPL', value: 2100, gain: +8.7, alloc: 8, icon: '🍎', color: '#6366f1' },
  { name: 'Ethereum', symbol: 'ETH', value: 1850, gain: +12.3, alloc: 7, icon: 'Ξ', color: '#8b5cf6' },
  { name: 'Or (Gold)', symbol: 'XAU', value: 900, gain: +3.1, alloc: 4, icon: '🥇', color: '#f97316' },
  { name: 'Obligations', symbol: 'BND', value: 600, gain: +1.2, alloc: 3, icon: '📄', color: '#64748b' },
];

const BUDGETS = [
  { label: 'Alimentation', emoji: '🛒', spent: 748, total: 800, color: COLORS.green },
  { label: 'Transport', emoji: '🚗', spent: 312, total: 300, color: COLORS.red },
  { label: 'Loisirs', emoji: '🎮', spent: 167, total: 250, color: COLORS.purple },
  { label: 'Restaurant', emoji: '🍽️', spent: 245, total: 300, color: COLORS.orange },
  { label: 'Shopping', emoji: '🛍️', spent: 643, total: 500, color: COLORS.red },
  { label: 'Santé', emoji: '🏥', spent: 215, total: 350, color: COLORS.blue },
  { label: 'Abonnements', emoji: '📱', spent: 87, total: 100, color: COLORS.cyan },
  { label: 'Logement', emoji: '🏠', spent: 1250, total: 1250, color: COLORS.yellow },
];

const CARDS_DATA = [
  {
    number: '•••• •••• •••• 4521',
    name: 'Alexandre Martin',
    expire: '09/28',
    balance: 12430.50,
    type: 'Visa',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #4f46e5 100%)',
  },
  {
    number: '•••• •••• •••• 8834',
    name: 'Alexandre Martin',
    expire: '03/27',
    balance: 3200.00,
    type: 'Mastercard',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0369a1 100%)',
  },
  {
    number: '•••• •••• •••• 2291',
    name: 'Alexandre Martin',
    expire: '12/26',
    balance: 18750.00,
    type: 'Amex',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)',
  },
];

// ===================== CHARTS =====================

let cashflowChart, donutChart, balanceChart, barChartInstance, comparisonChart, budgetDonutChart;

function initCharts() {
  Chart.defaults.color = '#64748b';
  Chart.defaults.font.family = 'Inter';
  const gridColor = 'rgba(255,255,255,0.05)';

  // Cashflow Chart
  const cashflowCtx = document.getElementById('cashflowChart');
  if (cashflowCtx) {
    const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul'];
    const incomeData = [6200, 7100, 6800, 7400, 7800, 8200, 8640];
    const expenseData = [2900, 3200, 2800, 3100, 3050, 3300, 3218];

    cashflowChart = new Chart(cashflowCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Revenus',
            data: incomeData,
            borderColor: COLORS.green,
            backgroundColor: 'rgba(34,197,94,0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: COLORS.green,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
          {
            label: 'Dépenses',
            data: expenseData,
            borderColor: COLORS.red,
            backgroundColor: 'rgba(239,68,68,0.08)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: COLORS.red,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a2035',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: €${ctx.raw.toLocaleString('fr-FR')}`
            }
          }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { font: { size: 11 } } },
          y: {
            grid: { color: gridColor },
            ticks: { font: { size: 11 }, callback: v => `€${(v/1000).toFixed(0)}k` }
          },
        },
      },
    });
  }

  // Donut Chart
  const donutCtx = document.getElementById('donutChart');
  if (donutCtx) {
    const categories = ['Alimentation', 'Transport', 'Logement', 'Loisirs', 'Shopping', 'Santé', 'Autre'];
    const amounts = [748, 312, 1250, 167, 643, 215, 87];
    const total = amounts.reduce((a, b) => a + b, 0);
    const colors = [COLORS.green, COLORS.blue, COLORS.yellow, COLORS.purple, COLORS.pink, COLORS.red, '#64748b'];

    donutChart = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          data: amounts,
          backgroundColor: colors,
          borderColor: '#1a2035',
          borderWidth: 3,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a2035',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            callbacks: {
              label: ctx => ` ${ctx.label}: €${ctx.raw} (${((ctx.raw/total)*100).toFixed(1)}%)`
            }
          }
        }
      }
    });

    // Build custom legend
    const legendEl = document.getElementById('donutLegend');
    if (legendEl) {
      legendEl.innerHTML = categories.map((cat, i) => `
        <div class="donut-legend-item">
          <div class="donut-legend-left">
            <div class="donut-legend-dot" style="background:${colors[i]}"></div>
            <span class="donut-legend-label">${cat}</span>
          </div>
          <div style="display:flex;gap:12px;align-items:center">
            <span class="donut-legend-pct" style="color:${colors[i]}">${((amounts[i]/total)*100).toFixed(0)}%</span>
            <span class="donut-legend-val">€${amounts[i]}</span>
          </div>
        </div>
      `).join('');
    }
  }

  // Balance Chart (Analytics)
  const balanceCtx = document.getElementById('balanceChart');
  if (balanceCtx) {
    const months = ['Août', 'Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul'];
    const balances = [32000, 33500, 34200, 36000, 37800, 38200, 39500, 40100, 42300, 44000, 45800, 47284];

    balanceChart = new Chart(balanceCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Solde (€)',
          data: balances,
          borderColor: COLORS.accent,
          backgroundColor: 'rgba(99,102,241,0.15)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: COLORS.accent,
          pointRadius: 4,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a2035', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
            callbacks: { label: ctx => ` Solde: €${ctx.raw.toLocaleString('fr-FR')}` }
          }
        },
        scales: {
          x: { grid: { color: gridColor } },
          y: { grid: { color: gridColor }, ticks: { callback: v => `€${(v/1000).toFixed(0)}k` } }
        }
      }
    });
  }

  // Bar Chart (Analytics)
  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    const labels = ['Alim.', 'Transport', 'Logement', 'Loisirs', 'Shopping', 'Santé', 'Autre'];
    const data = [748, 312, 1250, 167, 643, 215, 87];
    const colors2 = [COLORS.green, COLORS.blue, COLORS.yellow, COLORS.purple, COLORS.pink, COLORS.red, '#64748b'];

    barChartInstance = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Dépenses',
          data,
          backgroundColor: colors2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a2035', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
            callbacks: { label: ctx => ` €${ctx.raw}` }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: gridColor }, ticks: { callback: v => `€${v}` } }
        }
      }
    });
  }

  // Comparison Chart (Analytics)
  const compCtx = document.getElementById('comparisonChart');
  if (compCtx) {
    const months6 = ['Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul'];
    comparisonChart = new Chart(compCtx, {
      type: 'bar',
      data: {
        labels: months6,
        datasets: [
          {
            label: 'Revenus',
            data: [7100, 6800, 7400, 7800, 8200, 8640],
            backgroundColor: 'rgba(34,197,94,0.8)',
            borderRadius: 6,
          },
          {
            label: 'Dépenses',
            data: [3200, 2800, 3100, 3050, 3300, 3218],
            backgroundColor: 'rgba(239,68,68,0.8)',
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8', boxWidth: 12, padding: 16 } },
          tooltip: {
            backgroundColor: '#1a2035', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
            callbacks: { label: ctx => ` ${ctx.dataset.label}: €${ctx.raw.toLocaleString('fr-FR')}` }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: gridColor }, ticks: { callback: v => `€${(v/1000).toFixed(0)}k` } }
        }
      }
    });
  }

  // Budget Donut
  const budgetCtx = document.getElementById('budgetDonut');
  if (budgetCtx) {
    budgetDonutChart = new Chart(budgetCtx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [63, 37],
          backgroundColor: [COLORS.accent, 'rgba(255,255,255,0.06)'],
          borderColor: '#1a2035',
          borderWidth: 4,
        }]
      },
      options: {
        responsive: false,
        cutout: '80%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { animateRotate: true, duration: 1000 }
      }
    });
  }
}

// ===================== RENDER FUNCTIONS =====================

function renderRecentTransactions() {
  const el = document.getElementById('recentTransactions');
  if (!el) return;
  const recent = [...allTransactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  el.innerHTML = recent.map(tx => {
    const cat = CATEGORIES[tx.category] || CATEGORIES['Autre'];
    const isIncome = tx.amount > 0;
    const formatted = `${isIncome ? '+' : ''}€${Math.abs(tx.amount).toFixed(2)}`;
    const dateStr = new Date(tx.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

    return `
      <div class="transaction-item">
        <div class="tx-icon" style="background: ${cat.color}22; font-size: 20px;">${cat.emoji}</div>
        <div class="tx-info">
          <div class="tx-desc">${tx.desc}</div>
          <div class="tx-meta">${tx.category} · ${dateStr}</div>
        </div>
        <div class="tx-amount ${isIncome ? 'positive' : 'negative'}">${formatted}</div>
      </div>
    `;
  }).join('');
}

function renderTransactionsTable(filter = 'all', category = 'all', search = '') {
  const tbody = document.getElementById('transactionsTableBody');
  if (!tbody) return;

  let txs = [...allTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (filter === 'income') txs = txs.filter(t => t.amount > 0);
  if (filter === 'expense') txs = txs.filter(t => t.amount < 0);
  if (category !== 'all') txs = txs.filter(t => t.category === category);
  if (search) txs = txs.filter(t => t.desc.toLowerCase().includes(search.toLowerCase()));

  tbody.innerHTML = txs.map(tx => {
    const cat = CATEGORIES[tx.category] || CATEGORIES['Autre'];
    const isIncome = tx.amount > 0;
    const formatted = `${isIncome ? '+' : ''}€${Math.abs(tx.amount).toFixed(2)}`;
    const dateStr = new Date(tx.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

    return `
      <tr>
        <td>
          <div class="table-tx-icon">
            <div class="tx-icon" style="background: ${cat.color}22; font-size: 18px; width: 36px; height: 36px; border-radius: 10px;">${cat.emoji}</div>
            <div>
              <div style="font-weight: 600; font-size: 13px;">${tx.desc}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${tx.account}</div>
            </div>
          </div>
        </td>
        <td><span class="cat-badge">${tx.category}</span></td>
        <td style="color: var(--text-muted);">${dateStr}</td>
        <td style="color: var(--text-muted); font-size: 12px;">${tx.account.split(' ')[0]}</td>
        <td class="text-right ${isIncome ? 'amount-positive' : 'amount-negative'}">${formatted}</td>
        <td>
          <button class="action-btn" onclick="deleteTransaction(${tx.id})" title="Supprimer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
        </td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="6" style="text-align:center; color: var(--text-muted); padding: 40px;">Aucune transaction trouvée</td></tr>`;
}

function renderGoals() {
  const el = document.getElementById('goalsList');
  if (!el) return;
  el.innerHTML = GOALS.map(g => {
    const pct = Math.min((g.current / g.target) * 100, 100);
    return `
      <div class="goal-item">
        <div class="goal-header">
          <span class="goal-label">
            <span class="goal-emoji">${g.emoji}</span>
            ${g.label}
          </span>
          <span class="goal-amounts">€${g.current.toLocaleString('fr-FR')} / €${g.target.toLocaleString('fr-FR')}</span>
        </div>
        <div class="goal-bar">
          <div class="goal-fill" style="width: ${pct}%; background: ${g.color};"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderPortfolio() {
  const el = document.getElementById('portfolioList');
  if (!el) return;
  el.innerHTML = PORTFOLIO.map(a => {
    const gainColor = a.gain >= 0 ? COLORS.green : COLORS.red;
    const gainSign = a.gain >= 0 ? '+' : '';
    return `
      <div class="portfolio-item">
        <div class="asset-icon" style="background: ${a.color}22; color: ${a.color}; font-size: 20px;">${a.icon}</div>
        <div>
          <div class="asset-name">${a.name}</div>
          <div class="asset-symbol" style="color: var(--text-muted);">${a.symbol}</div>
        </div>
        <div>
          <div class="asset-value">€${a.value.toLocaleString('fr-FR')}</div>
        </div>
        <div>
          <div class="asset-gain" style="color: ${gainColor}">${gainSign}${a.gain}%</div>
        </div>
        <div>
          <div class="asset-alloc">${a.alloc}%</div>
          <div style="height: 4px; width: 60px; background: rgba(255,255,255,0.07); border-radius: 99px; margin-top: 4px;">
            <div style="height: 100%; width: ${a.alloc}%; background: ${a.color}; border-radius: 99px;"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderBudgets() {
  const el = document.getElementById('budgetList');
  if (!el) return;
  el.innerHTML = BUDGETS.map(b => {
    const pct = Math.min((b.spent / b.total) * 100, 100);
    const over = b.spent > b.total;
    return `
      <div class="budget-cat-item">
        <div class="budget-cat-header">
          <div class="budget-cat-left">
            <span class="budget-cat-emoji">${b.emoji}</span>
            <span>${b.label}</span>
            ${over ? '<span style="font-size:10px;color:var(--red);background:var(--red-light);padding:2px 8px;border-radius:99px;">Dépassé</span>' : ''}
          </div>
          <span class="budget-cat-amounts">€${b.spent} / €${b.total}</span>
        </div>
        <div class="budget-bar">
          <div class="budget-fill ${over ? 'budget-over' : ''}" style="width: ${pct}%; background: ${over ? COLORS.red : b.color};"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCards() {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;
  const typeIcons = { Visa: '💳', Mastercard: '🔴', Amex: '💎' };

  grid.innerHTML = CARDS_DATA.map((c, i) => `
    <div class="bank-card" style="background: ${c.gradient}; color: #fff;">
      <div class="card-chip">💳</div>
      <div class="card-number">${c.number}</div>
      <div class="card-footer">
        <div>
          <div class="card-holder">Titulaire</div>
          <div class="card-name">${c.name}</div>
        </div>
        <div>
          <div class="card-expire">Expire</div>
          <div class="card-date">${c.expire}</div>
        </div>
        <div>
          <div class="card-balance-label">Solde</div>
          <div class="card-balance">€${c.balance.toLocaleString('fr-FR', {minimumFractionDigits: 2})}</div>
        </div>
      </div>
      <div class="card-type-logo">${typeIcons[c.type] || '💳'}</div>
    </div>
  `).join('');

  // Card transactions
  const txEl = document.getElementById('cardTransactions');
  if (txEl) {
    const cardTxs = allTransactions.filter(t => t.account.includes('Visa')).slice(0, 5);
    txEl.innerHTML = cardTxs.map(tx => {
      const cat = CATEGORIES[tx.category] || CATEGORIES['Autre'];
      const isIncome = tx.amount > 0;
      const dateStr = new Date(tx.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
      return `
        <div class="transaction-item">
          <div class="tx-icon" style="background: ${cat.color}22; font-size: 20px;">${cat.emoji}</div>
          <div class="tx-info">
            <div class="tx-desc">${tx.desc}</div>
            <div class="tx-meta">${tx.category} · ${dateStr}</div>
          </div>
          <div class="tx-amount ${isIncome ? 'positive' : 'negative'}">€${Math.abs(tx.amount).toFixed(2)}</div>
        </div>
      `;
    }).join('');
  }
}

// ===================== NAVIGATION =====================

let currentPage = 'dashboard';
let currentFilter = 'all';

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
  document.getElementById('pageTitle').textContent =
    page.charAt(0).toUpperCase() + page.slice(1).replace('transactions', 'Transactions')
      .replace('analytics', 'Analytiques').replace('portfolio', 'Portfolio')
      .replace('budget', 'Budget').replace('cards', 'Cartes').replace('settings', 'Paramètres');
  currentPage = page;

  // Lazy render
  if (page === 'transactions') renderTransactionsTable();
  if (page === 'portfolio') renderPortfolio();
  if (page === 'budget') renderBudgets();
  if (page === 'cards') renderCards();

  // Close sidebar on mobile
  if (window.innerWidth < 900) {
    document.getElementById('sidebar').classList.remove('open');
  }

  return false;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ===================== FILTERS =====================

function filterTrans(btn, type) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = type;
  renderTransactionsTable(type);
}

function filterByCategory(cat) {
  renderTransactionsTable(currentFilter, cat);
}

function searchTransactions(q) {
  renderTransactionsTable(currentFilter, 'all', q);
}

function setPeriod(btn, period) {
  document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Could update chart data based on period
  updateChartPeriod(period);
}

function updateChartPeriod(period) {
  const configs = {
    week: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      income: [1200, 0, 800, 0, 5500, 0, 340],
      expense: [120, 68, 56, 90, 88, 143, 34],
    },
    month: {
      labels: ['S1', 'S2', 'S3', 'S4'],
      income: [1800, 2100, 5500, 1240],
      expense: [820, 760, 910, 728],
    },
    year: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      income: [6200, 7100, 6800, 7400, 7800, 8200, 8640, 0, 0, 0, 0, 0],
      expense: [2900, 3200, 2800, 3100, 3050, 3300, 3218, 0, 0, 0, 0, 0],
    }
  };
  const c = configs[period];
  if (cashflowChart && c) {
    cashflowChart.data.labels = c.labels;
    cashflowChart.data.datasets[0].data = c.income;
    cashflowChart.data.datasets[1].data = c.expense;
    cashflowChart.update('active');
  }
}

// ===================== TRANSACTIONS CRUD =====================

function showNewTransactionModal() {
  const modal = document.getElementById('transactionModal');
  modal.classList.add('open');
  document.getElementById('txDate').value = new Date().toISOString().split('T')[0];
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function setModalType(btn, type) {
  document.querySelectorAll('.modal-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function addTransaction() {
  const amount = parseFloat(document.getElementById('txAmount').value);
  const desc = document.getElementById('txDesc').value;
  const category = document.getElementById('txCategory').value;
  const date = document.getElementById('txDate').value;
  const account = document.getElementById('txAccount').value;
  const activeTab = document.querySelector('.modal-tab.active')?.textContent;

  if (!amount || !desc || !date) {
    showToast('⚠️ Veuillez remplir tous les champs', 'warning');
    return;
  }

  const finalAmount = activeTab === 'Dépense' ? -Math.abs(amount) : Math.abs(amount);
  const newTx = {
    id: Date.now(),
    desc, category, date, account,
    amount: finalAmount,
    type: finalAmount > 0 ? 'income' : 'expense',
  };

  allTransactions.unshift(newTx);
  closeModal('transactionModal');
  renderRecentTransactions();
  if (currentPage === 'transactions') renderTransactionsTable();
  showToast('✅ Transaction ajoutée avec succès !');

  // Reset form
  document.getElementById('txAmount').value = '';
  document.getElementById('txDesc').value = '';
}

function deleteTransaction(id) {
  allTransactions = allTransactions.filter(t => t.id !== id);
  renderTransactionsTable(currentFilter);
  renderRecentTransactions();
  showToast('🗑️ Transaction supprimée');
}

// ===================== TOAST =====================

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.borderColor = type === 'warning' ? COLORS.yellow : COLORS.green;
  toast.style.color = type === 'warning' ? COLORS.yellow : COLORS.green;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===================== INIT =====================

document.addEventListener('DOMContentLoaded', () => {
  // Set current month
  const now = new Date();
  const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const el = document.getElementById('currentMonth');
  if (el) el.textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

  // Animate KPI values
  animateKPI('kpiBalance', 47284.50, '€ ');
  animateKPI('kpiIncome', 8640.00, '€ ');
  animateKPI('kpiExpenses', 3218.75, '€ ');
  animateKPI('kpiSavings', 5421.25, '€ ');

  // Init components
  initCharts();
  renderRecentTransactions();
  renderGoals();

  // Close modal on overlay click
  document.getElementById('transactionModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal('transactionModal');
  });

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', e => {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth < 900 && !sidebar.contains(e.target) && !e.target.closest('.hamburger')) {
      sidebar.classList.remove('open');
    }
  });
});

function animateKPI(id, target, prefix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  const duration = 1200;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = `${prefix}${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
