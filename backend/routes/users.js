const express = require('express');
const router = express.Router();
const { users, adminStats, saveUserToSupabase } = require('../data/store');
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

function requireAdmin(req, res, next) {
  if (req.session?.role !== 'admin') {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs.' });
  }
  next();
}

// GET /api/admin/stats — KPIs du tableau de bord
router.get('/stats', requireAuth, requireAdmin, (req, res) => {
  const clients = users.filter(u => u.role === 'client');
  res.json({
    success: true,
    data: {
      ...adminStats,
      totalUsers: clients.length,
      kycVerified: clients.filter(u => u.kyc === 'verified').length,
      kycPending: clients.filter(u => u.kyc === 'pending').length,
      suspended: clients.filter(u => u.kyc === 'suspended').length,
    },
  });
});

// GET /api/admin/users — Liste de tous les clients
router.get('/users', requireAuth, requireAdmin, (req, res) => {
  const { kyc, search } = req.query;
  let clients = users.filter(u => u.role === 'client');

  if (kyc) clients = clients.filter(u => u.kyc === kyc);
  if (search) {
    const s = search.toLowerCase();
    clients = clients.filter(u =>
      u.name.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.id.toLowerCase().includes(s)
    );
  }

  // Masquer les mots de passe
  const safe = clients.map(({ password: _, ...u }) => u);
  res.json({ success: true, count: safe.length, data: safe });
});

// GET /api/admin/users/:id — Profil d'un client
router.get('/users/:id', requireAuth, requireAdmin, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });
  const { password: _, ...safe } = user;
  res.json({ success: true, data: safe });
});

// PATCH /api/admin/users/:id/kyc — Mettre à jour le statut KYC
router.patch('/users/:id/kyc', requireAuth, requireAdmin, (req, res) => {
  const { status } = req.body;
  if (!['verified', 'pending', 'rejected', 'suspended'].includes(status)) {
    return res.status(400).json({ error: 'Statut KYC invalide. Valeurs: verified, pending, rejected, suspended' });
  }

  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });
  if (user.role === 'admin') return res.status(400).json({ error: 'Impossible de modifier un admin.' });

  const prevStatus = user.kyc;
  user.kyc = status;
  saveUserToSupabase(user);

  res.json({
    success: true,
    message: `KYC de ${user.name} mis à jour: ${prevStatus} → ${status}`,
    data: { id: user.id, name: user.name, kyc: user.kyc },
  });
});

// PATCH /api/admin/users/:id/suspend — Suspendre / réactiver
router.patch('/users/:id/suspend', requireAuth, requireAdmin, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

  user.kyc = user.kyc === 'suspended' ? 'verified' : 'suspended';
  const action = user.kyc === 'suspended' ? 'suspendu' : 'réactivé';
  saveUserToSupabase(user);

  res.json({
    success: true,
    message: `Compte de ${user.name} ${action}.`,
    data: { id: user.id, name: user.name, kyc: user.kyc },
  });
});

// GET /api/admin/support — Admin: lister tous les tickets de support
router.get('/support', requireAuth, requireAdmin, (req, res) => {
  const { tickets } = require('../data/store');
  res.json({ success: true, count: tickets.length, data: tickets });
});

// PATCH /api/admin/support/:id/status — Admin: mettre à jour le statut d'un ticket (résolu, etc.)
router.patch('/support/:id/status', requireAuth, requireAdmin, (req, res) => {
  const { status } = req.body;
  const { tickets } = require('../data/store');
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Ticket introuvable.' });

  ticket.status = status;
  res.json({ success: true, message: `Ticket ${ticket.id} mis à jour: ${status}`, data: ticket });
});

// GET /api/admin/chat/:userId — Admin: Récupérer l'historique de tchat d'un client
router.get('/chat/:userId', requireAuth, requireAdmin, (req, res) => {
  const { chatMessages } = require('../data/store');
  const messages = chatMessages[req.params.userId] || [];
  res.json({ success: true, data: messages });
});

// POST /api/admin/chat/:userId — Admin: Envoyer un message de réponse au client
router.post('/chat/:userId', requireAuth, requireAdmin, (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Message vide.' });

  const { chatMessages, users } = require('../data/store');
  const userId = req.params.userId;
  const user = users.find(u => u.id === userId);

  const msg = {
    id: `MSG-${Date.now()}`,
    userId: userId,
    userName: user?.name || 'Client',
    sender: 'ADMIN',
    text: text,
    timestamp: new Date().toISOString(),
    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  };

  if (!chatMessages[userId]) chatMessages[userId] = [];
  chatMessages[userId].push(msg);

  res.status(201).json({ success: true, data: msg });
});

module.exports = router;
