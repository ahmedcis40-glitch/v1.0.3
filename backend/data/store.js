// ============================================================
//  Éléphant Bourse — Données en mémoire (pas de base de données)
//  Reset à chaque redémarrage du serveur.
// ============================================================

const { v4: uuidv4 } = require('uuid');
const { getTickerData } = require('../utils/brvmDataReader');

// ─── UTILISATEURS ─────────────────────────────────────────
const users = [
  // Admin uniquement
  {
    id: 'ADMIN-001',
    name: 'M. Kouassi',
    email: 'admin@elephantbourse.ci',
    password: 'admin2024',
    role: 'admin',
    level: 4,
    avatar: 'MK',
  },
];

// ─── ACTIONS BRVM ─────────────────────────────────────────
let stocks = [
  { ticker: 'SNTS', company: 'Sonatel CI', sector: 'Télécoms', price: 16450, prevClose: 16246, change: 1.25, volume: 124200, marketCap: '985 Mrd', high52: 18500, low52: 14200, pe: 12.4, dividend: 850, yield: 5.17 },
  { ticker: 'BOAB', company: 'BOA Bénin', sector: 'Banque', price: 5900, prevClose: 5927, change: -0.45, volume: 58400, marketCap: '142 Mrd', high52: 6800, low52: 5200, pe: 8.2, dividend: 200, yield: 3.39 },
  { ticker: 'ORAC', company: 'Orange CI', sector: 'Télécoms', price: 8600, prevClose: 8401, change: 2.38, volume: 98700, marketCap: '512 Mrd', high52: 9200, low52: 7100, pe: 15.1, dividend: 380, yield: 4.42 },
  { ticker: 'ETI', company: 'Ecobank TI', sector: 'Banque', price: 15800, prevClose: 15674, change: 0.80, volume: 284100, marketCap: '1.2 Trd', high52: 18000, low52: 13500, pe: 10.5, dividend: 600, yield: 3.80 },
  { ticker: 'SGBC', company: 'SGB CI', sector: 'Banque', price: 12100, prevClose: 12740, change: -5.12, volume: 412000, marketCap: '284 Mrd', high52: 14500, low52: 10200, pe: 9.8, dividend: 450, yield: 3.72 },
  { ticker: 'ONTBF', company: 'Onatel BF', sector: 'Télécoms', price: 4250, prevClose: 4240, change: 0.24, volume: 32100, marketCap: '98 Mrd', high52: 5100, low52: 3800, pe: 11.2, dividend: 120, yield: 2.82 },
  { ticker: 'SEIB', company: 'SEIB', sector: 'Assurance', price: 2450, prevClose: 2430, change: 0.82, volume: 21500, marketCap: '45 Mrd', high52: 2900, low52: 1900, pe: 7.6, dividend: 80, yield: 3.27 },
  { ticker: 'CABC', company: 'SGB CI', sector: 'Banque', price: 6200, prevClose: 6150, change: 0.81, volume: 18700, marketCap: '88 Mrd', high52: 7200, low52: 5400, pe: 9.1, dividend: 220, yield: 3.55 },
  { ticker: 'BICI', company: 'BICICI', sector: 'Banque', price: 7800, prevClose: 7720, change: 1.04, volume: 45300, marketCap: '165 Mrd', high52: 8900, low52: 6800, pe: 13.2, dividend: 310, yield: 3.97 },
];

// Charger dynamiquement les données réelles de la BRVM si disponibles en local
stocks = stocks.map(stock => {
  const realData = getTickerData(stock.ticker);
  if (realData) {
    console.log(`[BRVM Data] Chargé ${stock.ticker}: ${realData.price} FCFA (${realData.change > 0 ? '+' : ''}${realData.change}%)`);
    return {
      ...stock,
      price: realData.price,
      prevClose: realData.prevClose,
      change: realData.change,
      volume: realData.volume
    };
  }
  return stock;
});

// ─── TRANSACTIONS ──────────────────────────────────────────
let transactions = [
  {
    id: 'SN-8291',
    userId: 'EB-CI-09221',
    userName: 'Mamadou Konaté',
    ticker: 'SNTS',
    company: 'Sonatel CI',
    type: 'BUY',
    quantity: 12,
    price: 16200,
    total: 194400,
    fees: 972,
    tva: 174.96,
    grandTotal: 195546.96,
    status: 'pending', // pending | validated | rejected
    paymentRef: 'OM-X-992-KLA-29',
    paymentMethod: 'Orange Money',
    rejectionReason: null,
    submittedAt: '2024-10-14T10:45:00Z',
    processedAt: null,
    processedBy: null,
  },
  {
    id: 'SN-8290',
    userId: 'EB-9021',
    userName: 'Amadou Diop',
    ticker: 'SNTS',
    company: 'Sonatel CI',
    type: 'BUY',
    quantity: 768,
    price: 16210,
    total: 12449280,
    fees: 62246.4,
    tva: 11204.35,
    grandTotal: 12522730.75,
    status: 'pending',
    paymentRef: 'WAVE-882-XY-21',
    paymentMethod: 'Wave',
    rejectionReason: null,
    submittedAt: '2024-10-14T09:42:00Z',
    processedAt: null,
    processedBy: null,
  },
  {
    id: 'SN-8289',
    userId: 'EB-4412',
    userName: 'Yasmine Koné',
    ticker: 'ONTBF',
    company: 'Onatel BF',
    type: 'SELL',
    quantity: 1930,
    price: 4249,
    total: 8200570,
    fees: 41002.85,
    tva: 7380.51,
    grandTotal: 8248953.36,
    status: 'pending',
    paymentRef: 'MTN-441-KJ-99',
    paymentMethod: 'MTN Money',
    rejectionReason: null,
    submittedAt: '2024-10-14T10:15:00Z',
    processedAt: null,
    processedBy: null,
  },
  {
    id: 'SN-8285',
    userId: 'EB-1002',
    userName: 'Jean-Marc Soro',
    ticker: 'CABC',
    company: 'SGB CI',
    type: 'BUY',
    quantity: 7258,
    price: 6200,
    total: 44999600,
    fees: 224998,
    tva: 40499.64,
    grandTotal: 45265097.64,
    status: 'validated',
    paymentRef: 'WIRE-CI-9009-JM',
    paymentMethod: 'Virement bancaire',
    rejectionReason: null,
    submittedAt: '2024-10-13T14:22:00Z',
    processedAt: '2024-10-13T15:10:00Z',
    processedBy: 'ADMIN-001',
  },
  {
    id: 'SN-8280',
    userId: 'EB-3392',
    userName: 'Fatou Traoré',
    ticker: 'BICI',
    company: 'BICICI',
    type: 'BUY',
    quantity: 480,
    price: 7800,
    total: 3744000,
    fees: 18720,
    tva: 3369.6,
    grandTotal: 3766089.6,
    status: 'rejected',
    paymentRef: 'OM-FT-771-XX',
    paymentMethod: 'Orange Money',
    rejectionReason: 'Preuve de paiement invalide',
    submittedAt: '2024-10-12T11:30:00Z',
    processedAt: '2024-10-12T14:00:00Z',
    processedBy: 'ADMIN-001',
  },
];

// ─── PORTEFEUILLES ─────────────────────────────────────────
const portfolios = {
  'EB-CI-09221': {
    userId: 'EB-CI-09221',
    totalValue: 1450000,
    invested: 1200000,
    gainLoss: 250000,
    gainLossPct: 20.83,
    dailyChange: 36250,
    dailyChangePct: 2.56,
    dividendsReceived: 45800,
    holdings: [
      { ticker: 'SNTS', company: 'Sonatel CI', quantity: 40, avgBuy: 15000, currentPrice: 16450, value: 658000, gainLoss: 58000, gainLossPct: 9.67 },
      { ticker: 'BOAB', company: 'BOA Bénin', quantity: 60, avgBuy: 6250, currentPrice: 5900, value: 354000, gainLoss: -21000, gainLossPct: -5.60 },
      { ticker: 'ORAC', company: 'Orange CI', quantity: 50, avgBuy: 7000, currentPrice: 8600, value: 430000, gainLoss: 80000, gainLossPct: 22.86 },
      { ticker: 'SGBC', company: 'SGB CI', quantity: 8, avgBuy: 12500, currentPrice: 12100, value: 96800, gainLoss: -3200, gainLossPct: -3.20 },
      { ticker: 'SEIB', company: 'SEIB', quantity: 38, avgBuy: 2000, currentPrice: 2450, value: 93100, gainLoss: 17100, gainLossPct: 22.50 },
    ],
  },
};

// ─── KPI ADMIN ─────────────────────────────────────────────
const adminStats = {
  totalUsers: 8432,
  kycVerified: 7814,
  kycPending: 42,
  kycUrgent: 5,
  suspended: 12,
  marketStatus: 'OPEN',
  marketCloseIn: '3h 15m',
  brvm: {
    composite: 214.68,
    composite_change: 0.85,
    brvm10: 312.45,
    brvm10_change: 1.23,
    volume: 482300000,
    volume_change: -3.2,
  },
};

// ─── SYNCHRONISATION SUPABASE ──────────────────────────────
const { supabase } = require('../utils/supabaseClient');

// Charger les données depuis Supabase
async function syncFromSupabase() {
  console.log('[Supabase] Synchronisation initiale des données...');
  try {
    // 1. Charger les utilisateurs
    const { data: dbUsers, error: uErr } = await supabase.from('users').select('*');
    if (!uErr && dbUsers && dbUsers.length > 0) {
      users.length = 0;
      dbUsers.forEach(u => {
        users.push({
          id: u.id,
          name: u.name,
          email: u.email,
          password: u.password,
          role: u.role,
          type: u.type,
          kyc: u.kyc,
          balance: parseFloat(u.balance || 0),
          joinedAt: u.joined_at ? u.joined_at.split('T')[0] : '2024-01-01',
          avatar: u.avatar || 'MK'
        });
      });
      console.log(`[Supabase] ${dbUsers.length} utilisateurs synchronisés.`);
    }

    // 2. Charger les transactions
    const { data: dbTx, error: tErr } = await supabase.from('transactions').select('*').order('submitted_at', { ascending: false });
    if (!tErr && dbTx) {
      transactions.length = 0;
      dbTx.forEach(t => {
        transactions.push({
          id: t.id,
          userId: t.user_id,
          userName: t.user_name,
          ticker: t.ticker,
          company: t.company,
          type: t.type,
          quantity: t.quantity,
          price: parseFloat(t.price || 0),
          total: parseFloat(t.total || 0),
          fees: parseFloat(t.fees || 0),
          tva: parseFloat(t.tva || 0),
          grandTotal: parseFloat(t.grand_total || 0),
          status: t.status,
          paymentRef: t.payment_ref,
          paymentMethod: t.payment_method,
          rejectionReason: t.rejection_reason,
          submittedAt: t.submitted_at,
          processedAt: t.processed_at,
          processedBy: t.processed_by
        });
      });
      console.log(`[Supabase] ${dbTx.length} transactions synchronisées.`);
    }

    // 3. Charger les holdings
    const { data: dbHoldings, error: hErr } = await supabase.from('holdings').select('*');
    if (!hErr && dbHoldings) {
      for (let key in portfolios) delete portfolios[key];
      dbHoldings.forEach(h => {
        if (!portfolios[h.user_id]) {
          portfolios[h.user_id] = {
            userId: h.user_id,
            totalValue: 0,
            invested: 0,
            gainLoss: 0,
            gainLossPct: 0,
            dailyChange: 0,
            dailyChangePct: 0,
            dividendsReceived: 0,
            holdings: []
          };
        }
        portfolios[h.user_id].holdings.push({
          ticker: h.ticker,
          company: h.company_name,
          quantity: h.shares_count,
          avgBuy: parseFloat(h.average_price || 0),
          currentPrice: parseFloat(h.current_price || 0),
          value: h.shares_count * parseFloat(h.current_price || 0),
          gainLoss: h.shares_count * (parseFloat(h.current_price || 0) - parseFloat(h.average_price || 0)),
          gainLossPct: parseFloat((((parseFloat(h.current_price || 0) - parseFloat(h.average_price || 0)) / parseFloat(h.average_price || 0)) * 100).toFixed(2))
        });
      });

      for (const userId in portfolios) {
        const p = portfolios[userId];
        p.totalValue = p.holdings.reduce((sum, h) => sum + h.value, 0);
        p.invested = p.holdings.reduce((sum, h) => sum + h.quantity * h.avgBuy, 0);
        p.gainLoss = p.totalValue - p.invested;
        p.gainLossPct = p.invested ? parseFloat(((p.gainLoss / p.invested) * 100).toFixed(2)) : 0.0;
      }
      console.log(`[Supabase] Positions de portefeuilles synchronisées.`);
    }
  } catch (err) {
    console.error('[Supabase] Erreur lors de la synchronisation initiale:', err);
  }
}

// Lancer la synchronisation initiale
setTimeout(syncFromSupabase, 500);

// Utilitaires de modification et sauvegarde Supabase
async function saveUserToSupabase(user) {
  try {
    const { error } = await supabase.from('users').upsert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      type: user.type,
      kyc: user.kyc,
      balance: user.balance,
      avatar: user.avatar
    });
    if (error) console.error('[Supabase] Erreur de sauvegarde utilisateur:', error.message);
  } catch (e) {
    console.error('[Supabase] Exception sauvegarde utilisateur:', e);
  }
}

async function saveTransactionToSupabase(tx) {
  try {
    const { error } = await supabase.from('transactions').upsert({
      id: tx.id,
      user_id: tx.userId,
      user_name: tx.userName,
      ticker: tx.ticker,
      company: tx.company,
      type: tx.type,
      quantity: tx.quantity,
      price: tx.price,
      total: tx.total,
      fees: tx.fees,
      tva: tx.tva,
      grand_total: tx.grandTotal,
      status: tx.status,
      payment_ref: tx.paymentRef,
      payment_method: tx.paymentMethod,
      rejection_reason: tx.rejectionReason,
      submitted_at: tx.submittedAt || new Date().toISOString(),
      processed_at: tx.processedAt,
      processed_by: tx.processedBy
    });
    if (error) console.error('[Supabase] Erreur de sauvegarde transaction:', error.message);
  } catch (e) {
    console.error('[Supabase] Exception sauvegarde transaction:', e);
  }
}

async function saveHoldingToSupabase(userId, holding) {
  try {
    const { error } = await supabase.from('holdings').upsert({
      user_id: userId,
      ticker: holding.ticker,
      company_name: holding.company,
      shares_count: holding.quantity,
      average_price: holding.avgBuy,
      current_price: holding.currentPrice,
      change_percent: holding.gainLossPct,
      sector: 'Bourse'
    }, { onConflict: 'user_id,ticker' });
    if (error) console.error('[Supabase] Erreur de sauvegarde position:', error.message);
  } catch (e) {
    console.error('[Supabase] Exception sauvegarde position:', e);
  }
}

async function removeHoldingFromSupabase(userId, ticker) {
  try {
    const { error } = await supabase.from('holdings').delete().match({ user_id: userId, ticker: ticker });
    if (error) console.error('[Supabase] Erreur de suppression position:', error.message);
  } catch (e) {
    console.error('[Supabase] Exception suppression position:', e);
  }
}

module.exports = { 
  users, 
  stocks, 
  transactions, 
  portfolios, 
  adminStats,
  saveUserToSupabase,
  saveTransactionToSupabase,
  saveHoldingToSupabase,
  removeHoldingFromSupabase
};
