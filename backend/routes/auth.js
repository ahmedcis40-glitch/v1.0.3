const express = require('express');
const router = express.Router();
const { users } = require('../data/store');

// Simple token store (en mémoire, pas JWT)
const sessions = {};

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { email, password, firstName } = req.body;

  if (!email || !password || !firstName) {
    return res.status(400).json({ error: 'Prénom, email et mot de passe requis.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Cet e-mail est déjà utilisé.' });
  }

  const newUser = {
    id: `EB-CI-${Math.floor(10000 + Math.random() * 90000)}`,
    name: firstName,
    email: email,
    password: password,
    role: 'client',
    type: 'Standard',
    kyc: 'pending', // Pending admin verification
    balance: 0.0, // Newly registered user balance must be 0
    joinedAt: new Date().toISOString().split('T')[0],
    avatar: firstName.substring(0, 2).toUpperCase()
  };

  users.push(newUser);
  const { saveUserToSupabase } = require('../data/store');
  saveUserToSupabase(newUser);

  res.status(201).json({
    success: true,
    message: 'Inscription réussie.',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, kyc: newUser.kyc, balance: newUser.balance }
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  let user = users.find(u => u.email === email);

  if (!user) {
    // Si l'utilisateur n'existe pas, on refuse l'accès pour forcer l'inscription
    return res.status(404).json({ error: 'Utilisateur introuvable. Veuillez créer un compte.' });
  } else if (user.password !== password) {
    return res.status(401).json({ error: 'Identifiants incorrects.' });
  }

  // Générer un token simple
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

  const { firstName, lastName, kycStatus, whatsapp } = req.body;
  if (firstName && lastName) {
    user.name = `${firstName} ${lastName}`;
  }
  if (kycStatus) {
    user.kyc = kycStatus;
  }
  if (whatsapp) {
    user.whatsapp = whatsapp;
  }

  const { saveUserToSupabase } = require('../data/store');
  saveUserToSupabase(user);

  res.json({ success: true, user });
});

// POST /api/auth/support — Envoyer un message de support à l'admin
router.post('/support', (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  const session = sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Session expirée ou invalide.' });
  }

  const user = users.find(u => u.id === session.userId);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

  const { subject, message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Le contenu du message est requis.' });
  }

  const { tickets } = require('../data/store');
  const newTicket = {
    id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
    clientName: user.name,
    clientId: user.email,
    subject: subject || 'Message de support',
    message: message,
    status: 'OUVERT',
    dateString: 'Aujourd\'hui, ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  };

  tickets.unshift(newTicket);

  res.status(201).json({ success: true, ticket: newTicket });
});

// GET /api/auth/support — Lister les tickets du client
router.get('/support', (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  const session = sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Session expirée ou invalide.' });
  }

  const user = users.find(u => u.id === session.userId);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

  const { tickets } = require('../data/store');
  const userTickets = tickets.filter(t => t.clientId === user.email);

  res.json({ success: true, data: userTickets });
});

module.exports = { router, sessions };
