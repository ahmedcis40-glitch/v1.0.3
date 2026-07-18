// ============================================================
//  🐘 Éléphant Bourse — Backend API
//  Port: 3001
//  Données: In-memory (pas de base de données)
// ============================================================

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Logger simple ────────────────────────────────────────
app.use((req, res, next) => {
  const ts = new Date().toLocaleTimeString('fr-FR');
  console.log(`[${ts}] ${req.method} ${req.path}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────
const { router: authRouter } = require('./routes/auth');
const stocksRouter     = require('./routes/stocks');
const transactionsRouter = require('./routes/transactions');
const portfolioRouter  = require('./routes/portfolio');
const usersRouter      = require('./routes/users');

app.use('/api/auth',         authRouter);
app.use('/api/stocks',       stocksRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/portfolio',    portfolioRouter);
app.use('/api/admin',        usersRouter);

// ─── Route racine ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: '🐘 Éléphant Bourse API',
    version: '1.0.3',
    status: 'running',
    market: 'BRVM — Côte d\'Ivoire',
    endpoints: {
      auth:         '/api/auth/login',
      stocks:       '/api/stocks',
      brvm_indices: '/api/stocks/brvm/indices',
      transactions: '/api/transactions',
      portfolio:    '/api/portfolio',
      admin_users:  '/api/admin/users',
      admin_stats:  '/api/admin/stats',
    },
    docs: 'Voir README.md pour la documentation complète',
  });
});

// ─── Route 404 ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route "${req.method} ${req.path}" introuvable.` });
});

// ─── Démarrage ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  🐘 ═══════════════════════════════════════════');
  console.log('       Éléphant Bourse API — v1.0.3');
  console.log('  ═══════════════════════════════════════════════');
  console.log(`  ✅  Backend:    http://localhost:${PORT}`);
  console.log(`  📱  Mobile:     http://localhost:3000/login.html`);
  console.log(`  🖥️   Admin:      http://localhost:3000/admin/index.html`);
  console.log('  ───────────────────────────────────────────────');
  console.log('  🔑  Admin:      admin@elephantbourse.ci / admin2024');
  console.log('  👤  Client:     mamadou.konate@email.ci / password123');
  console.log('  ═══════════════════════════════════════════════');
  console.log('');
});

module.exports = app;
