const express = require('express');
const router = express.Router();
const { users } = require('../data/store');

// Simple token store (en mémoire, pas JWT)
const sessions = {};

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Identifiants incorrects.' });
  }

  // Générer un token simple (en prod: JWT)
  const token = `eb_${user.id}_${Date.now()}`;
  sessions[token] = { userId: user.id, role: user.role, expiresAt: Date.now() + 86400000 };

  // Ne pas renvoyer le mot de passe
  const { password: _, ...userSafe } = user;

  res.json({
    success: true,
    token,
    user: userSafe,
    message: `Bienvenue, ${user.name} !`,
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (token && sessions[token]) {
    delete sessions[token];
  }
  res.json({ success: true, message: 'Déconnexion réussie.' });
});

// GET /api/auth/me — Vérifier le token courant
router.get('/me', (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  const session = sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Session expirée ou invalide.' });
  }

  const user = users.find(u => u.id === session.userId);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

  const { password: _, ...userSafe } = user;
  res.json({ success: true, user: userSafe });
});

module.exports = { router, sessions };
