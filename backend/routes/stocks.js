const express = require('express');
const router = express.Router();
const { stocks } = require('../data/store');

// Simuler de légères fluctuations de prix en temps réel
function applyMicroFluctuation(stock) {
  const delta = (Math.random() - 0.5) * 0.3; // ±0.15%
  const newPrice = Math.round(stock.price * (1 + delta / 100));
  return { ...stock, price: newPrice, lastUpdated: new Date().toISOString() };
}

// GET /api/stocks — Tous les titres BRVM
router.get('/', (req, res) => {
  const liveStocks = stocks.map(applyMicroFluctuation);
  res.json({ success: true, count: liveStocks.length, data: liveStocks });
});

// GET /api/stocks/:ticker — Un titre spécifique
router.get('/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const stock = stocks.find(s => s.ticker === ticker);

  if (!stock) {
    return res.status(404).json({ error: `Titre "${ticker}" introuvable sur la BRVM.` });
  }

  res.json({ success: true, data: applyMicroFluctuation(stock) });
});

// GET /api/stocks/brvm/indices — Indices BRVM
router.get('/brvm/indices', (req, res) => {
  res.json({
    success: true,
    data: {
      composite: { value: 214.68 + (Math.random() - 0.5) * 2, change: 0.85 },
      brvm10: { value: 312.45 + (Math.random() - 0.5) * 3, change: 1.23 },
      volume: 482300000,
      status: 'OPEN',
      lastUpdated: new Date().toISOString(),
    },
  });
});

module.exports = router;
