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

  let user = users.find(u => u.email === email);

  if (!user) {
    // Inscription automatique (Provisioning JIT) pour les nouveaux comptes
    const namePart = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
    const formattedName = namePart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    user = {
      id: `EB-CI-${Math.floor(10000 + Math.random() * 90000)}`,
      name: formattedName || 'Nouvel Utilisateur',
      email: email,
      password: password,
      role: 'client',
      type: 'Standard',
      kyc: 'pending',
      balance: 125000.0,
      joinedAt: new Date().toISOString().split('T')[0],
      avatar: email.substring(0, 2).toUpperCase()
    };
    
    users.push(user);
    const { saveUserToSupabase } = require('../data/store');
    saveUserToSupabase(user);
  } else if (user.password !== password) {
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

// POST /api/auth/update-profile — Mettre à jour les informations du client connecté
router.post('/update-profile', (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  const session = sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Session expirée ou invalide.' });
  }

  const user = users.find(u => u.id === session.userId);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

  const { firstName, lastName, kycStatus } = req.body;
  if (firstName && lastName) {
    user.name = `${firstName} ${lastName}`;
  }
  if (kycStatus) {
    user.kyc = kycStatus;
  }

  const { saveUserToSupabase } = require('../data/store');
  saveUserToSupabase(user);

  res.json({ success: true, user });
});

module.exports = { router, sessions };
