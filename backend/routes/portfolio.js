const express = require('express');
const router = express.Router();
const { portfolios, stocks } = require('../data/store');
const { sessions } = require('./auth');

function requireAuth(req, res, next) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  const session = sessions[token];
  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Non autorisé.' });
  }
  req.session = session;
  next();
}

// GET /api/portfolio — Portefeuille de l'utilisateur connecté
router.get('/', requireAuth, (req, res) => {
  const portfolio = portfolios[req.session.userId];

  if (!portfolio) {
    return res.json({
      success: true,
      data: {
        userId: req.session.userId,
        totalValue: 0,
        invested: 0,
        gainLoss: 0,
        gainLossPct: 0,
        dailyChange: 0,
        dailyChangePct: 0,
        dividendsReceived: 0,
        holdings: [],
      },
    });
  }

  // Actualiser les prix des positions
  const updatedHoldings = portfolio.holdings.map(h => {
    const stock = stocks.find(s => s.ticker === h.ticker);
    const currentPrice = stock ? stock.price : h.currentPrice;
    const value = h.quantity * currentPrice;
    const gainLoss = value - h.quantity * h.avgBuy;
    const gainLossPct = ((gainLoss / (h.quantity * h.avgBuy)) * 100).toFixed(2);
    return { ...h, currentPrice, value, gainLoss, gainLossPct: parseFloat(gainLossPct) };
  });

  const totalValue = updatedHoldings.reduce((s, h) => s + h.value, 0);
  const invested = updatedHoldings.reduce((s, h) => s + h.quantity * h.avgBuy, 0);

  res.json({
    success: true,
    data: {
      ...portfolio,
      holdings: updatedHoldings,
      totalValue: Math.round(totalValue),
      invested: Math.round(invested),
      gainLoss: Math.round(totalValue - invested),
      gainLossPct: parseFloat(((totalValue - invested) / invested * 100).toFixed(2)),
    },
  });
});

module.exports = router;
