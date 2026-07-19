const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { 
  transactions, 
  users, 
  stocks, 
  saveUserToSupabase, 
  saveTransactionToSupabase, 
  saveHoldingToSupabase, 
  removeHoldingFromSupabase 
} = require('../data/store');
const { sessions } = require('./auth');

// Middleware: vérifier token
function requireAuth(req, res, next) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  const session = sessions[token];
  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Non autorisé. Veuillez vous connecter.' });
  }
  req.session = session;
  next();
}

function requireAdmin(req, res, next) {
  if (req.session?.role !== 'admin') {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs.' });
  }
  next();
}

// GET /api/transactions — Transactions de l'utilisateur connecté
router.get('/', requireAuth, (req, res) => {
  const userTx = transactions.filter(t => t.userId === req.session.userId);
  res.json({ success: true, count: userTx.length, data: userTx });
});

// GET /api/transactions/all — Admin: toutes les transactions
router.get('/all', requireAuth, requireAdmin, (req, res) => {
  const { status, type, page = 1, limit = 20 } = req.query;
  let result = [...transactions];

  if (status) result = result.filter(t => t.status === status);
  if (type) result = result.filter(t => t.type === type.toUpperCase());

  const total = result.length;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + parseInt(limit));

  res.json({
    success: true,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated,
    summary: {
      pending: transactions.filter(t => t.status === 'pending').length,
      validated: transactions.filter(t => t.status === 'validated').length,
      rejected: transactions.filter(t => t.status === 'rejected').length,
      totalValue: transactions.reduce((sum, t) => sum + t.grandTotal, 0),
    },
  });
});

// GET /api/transactions/:id — Détail d'une transaction
router.get('/:id', requireAuth, (req, res) => {
  const tx = transactions.find(t => t.id === req.params.id);
  if (!tx) return res.status(404).json({ error: 'Transaction introuvable.' });

  // Client ne voit que ses propres transactions
  if (req.session.role !== 'admin' && tx.userId !== req.session.userId) {
    return res.status(403).json({ error: 'Accès refusé.' });
  }

  res.json({ success: true, data: tx });
});

// POST /api/transactions — Passer un ordre d'achat ou de vente
router.post('/', requireAuth, (req, res) => {
  const { ticker, type, quantity, price, paymentRef, paymentMethod } = req.body;

  if (!ticker || !type || !quantity || !price) {
    return res.status(400).json({ error: 'Ticker, type, quantité et prix sont requis.' });
  }

  if (!['BUY', 'SELL'].includes(type.toUpperCase())) {
    return res.status(400).json({ error: 'Type doit être BUY ou SELL.' });
  }

  const stock = stocks.find(s => s.ticker === ticker.toUpperCase());
  if (!stock) return res.status(404).json({ error: `Titre "${ticker}" introuvable.` });

  const user = users.find(u => u.id === req.session.userId);
  const total = quantity * price;
  const fees = total * 0.005; // 0.5%
  const tva = fees * 0.18;   // 18% TVA sur les frais
  const grandTotal = total + fees + tva;

  if (type.toUpperCase() === 'BUY' && user.balance < grandTotal) {
    return res.status(400).json({
      error: `Solde insuffisant. Requis: ${grandTotal.toFixed(0)} FCFA, Disponible: ${user.balance} FCFA`,
    });
  }

  const status = 'pending';

  const newTx = {
    id: `SN-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: req.session.userId,
    userName: user.name,
    ticker: ticker.toUpperCase(),
    company: stock.company,
    type: type.toUpperCase(),
    quantity: parseInt(quantity),
    price: parseFloat(price),
    total,
    fees: Math.round(fees * 100) / 100,
    tva: Math.round(tva * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
    status: status,
    paymentRef: paymentRef || `AUTO-${Date.now()}`,
    paymentMethod: paymentMethod || 'Non spécifié',
    rejectionReason: null,
    submittedAt: new Date().toISOString(),
    processedAt: null,
    processedBy: null,
  };

  transactions.unshift(newTx);
  saveTransactionToSupabase(newTx);

  res.status(201).json({
    success: true,
    message: 'Ordre soumis avec succès. En attente de validation admin.',
    data: newTx,
  });
});

// PATCH /api/transactions/:id/validate — Admin: valider
router.patch('/:id/validate', requireAuth, requireAdmin, (req, res) => {
  const tx = transactions.find(t => t.id === req.params.id);
  if (!tx) return res.status(404).json({ error: 'Transaction introuvable.' });
  if (tx.status !== 'pending') {
    return res.status(400).json({ error: `Transaction déjà "${tx.status}".` });
  }

  tx.status = 'validated';
  tx.processedAt = new Date().toISOString();
  tx.processedBy = req.session.userId;

  // Mettre à jour le solde du client
  const user = users.find(u => u.id === tx.userId);
  if (user) {
    if (tx.type === 'BUY') user.balance -= tx.grandTotal;
    else user.balance += tx.total;
    saveUserToSupabase(user);
  }

  // Mettre à jour les holdings locaux et Supabase
  const { portfolios } = require('../data/store');
  let userPortfolio = portfolios[tx.userId];
  if (!userPortfolio) {
    userPortfolio = {
      userId: tx.userId,
      totalValue: 0,
      invested: 0,
      gainLoss: 0,
      gainLossPct: 0,
      dailyChange: 0,
      dailyChangePct: 0,
      dividendsReceived: 0,
      holdings: []
    };
    portfolios[tx.userId] = userPortfolio;
  }

  if (tx.type === 'BUY') {
    let holding = userPortfolio.holdings.find(h => h.ticker === tx.ticker);
    if (holding) {
      const oldQty = holding.quantity;
      holding.quantity += tx.quantity;
      holding.avgBuy = ((oldQty * holding.avgBuy) + (tx.quantity * tx.price)) / holding.quantity;
      holding.value = holding.quantity * holding.currentPrice;
      saveHoldingToSupabase(tx.userId, holding);
    } else {
      holding = {
        ticker: tx.ticker,
        company: tx.company,
        quantity: tx.quantity,
        avgBuy: tx.price,
        currentPrice: tx.price,
        value: tx.quantity * tx.price,
        gainLoss: 0,
        gainLossPct: 0
      };
      userPortfolio.holdings.push(holding);
      saveHoldingToSupabase(tx.userId, holding);
    }
  } else if (tx.type === 'SELL') {
    let holding = userPortfolio.holdings.find(h => h.ticker === tx.ticker);
    if (holding) {
      holding.quantity -= tx.quantity;
      if (holding.quantity <= 0) {
        userPortfolio.holdings = userPortfolio.holdings.filter(h => h.ticker !== tx.ticker);
        removeHoldingFromSupabase(tx.userId, tx.ticker);
      } else {
        holding.value = holding.quantity * holding.currentPrice;
        saveHoldingToSupabase(tx.userId, holding);
      }
    }
  }

  saveTransactionToSupabase(tx);

  res.json({ success: true, message: `Transaction #${tx.id} validée.`, data: tx });
});

// PATCH /api/transactions/:id/reject — Admin: rejeter
router.patch('/:id/reject', requireAuth, requireAdmin, (req, res) => {
  const tx = transactions.find(t => t.id === req.params.id);
  if (!tx) return res.status(404).json({ error: 'Transaction introuvable.' });
  if (tx.status !== 'pending') {
    return res.status(400).json({ error: `Transaction déjà "${tx.status}".` });
  }

  const { reason } = req.body;
  tx.status = 'rejected';
  tx.rejectionReason = reason || 'Rejeté par l\'administrateur.';
  tx.processedAt = new Date().toISOString();
  tx.processedBy = req.session.userId;
  
  saveTransactionToSupabase(tx);

  res.json({ success: true, message: `Transaction #${tx.id} rejetée.`, data: tx });
});

module.exports = router;
