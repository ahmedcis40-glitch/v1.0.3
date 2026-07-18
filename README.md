# 🐘 Éléphant Bourse — v1.0.3

> Plateforme d'investissement boursier dédiée au marché BRVM (Côte d'Ivoire)

## 📁 Structure du projet

```
v1.0.3/
├── 📱 Application Mobile (HTML/CSS/Tailwind)
│   ├── login.html          — Page de connexion
│   ├── index.html          — Accueil / Dashboard client
│   ├── market.html         — Marché & Achat d'actions
│   ├── portfolio.html      — Mon Portefeuille
│   └── profile.html        — Profil utilisateur
│
├── 🖥️  admin/               — Site Web Admin
│   ├── index.html          — Tableau de bord admin
│   ├── transactions.html   — Liste des transactions
│   ├── transaction-detail.html — Validation d'une transaction
│   ├── users.html          — Gestion des utilisateurs / KYC
│   └── market.html         — Surveillance du marché BRVM
│
└── ⚙️  backend/              — API REST (Node.js / Express)
    ├── server.js           — Point d'entrée
    ├── package.json
    ├── data/
    │   └── store.js        — Données en mémoire (pas de DB)
    └── routes/
        ├── auth.js         — Authentification
        ├── stocks.js       — Cours BRVM
        ├── transactions.js — Gestion des ordres
        ├── users.js        — Gestion clients (admin)
        └── portfolio.js    — Portefeuille utilisateur
```

## 🚀 Démarrage rapide

### 1. Lancer le backend
```bash
cd backend
npm install
npm start
# API disponible sur http://localhost:3001
```

### 2. Lancer le frontend
```bash
# À la racine du projet
npx serve . -p 3000
# App mobile : http://localhost:3000/login.html
# Admin      : http://localhost:3000/admin/index.html
```

## 🔌 API Endpoints

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Connexion |
| `GET` | `/api/stocks` | Cours BRVM |
| `GET` | `/api/stocks/:ticker` | Détail action |
| `GET` | `/api/portfolio` | Portefeuille |
| `GET` | `/api/transactions` | Mes transactions |
| `POST` | `/api/transactions` | Passer un ordre |
| `PATCH` | `/api/transactions/:id/validate` | Admin: valider |
| `PATCH` | `/api/transactions/:id/reject` | Admin: rejeter |
| `GET` | `/api/admin/users` | Admin: clients |
| `PATCH` | `/api/admin/users/:id/kyc` | Admin: KYC |

## 🔑 Comptes de test

| Rôle | Email | Mot de passe |
|---|---|---|
| Client Premium | `mamadou.konate@email.ci` | `password123` |
| Client Standard | `a.diop@email.sn` | `password123` |
| Admin Level 4 | `admin@elephantbourse.ci` | `admin2024` |

## 🎨 Stack technique

- **Frontend** : HTML5 + TailwindCSS + Material Symbols
- **Backend** : Node.js + Express.js
- **Données** : In-memory (arrays JS, pas de DB)
- **Marché** : BRVM (Bourse Régionale des Valeurs Mobilières)

## 🇨🇮 À propos

Éléphant Bourse est une application fictive de démonstration pour le marché financier ivoirien. Elle permet aux investisseurs particuliers d'acheter des actions cotées sur la BRVM depuis leur mobile.

---
© 2024 Éléphant Bourse — Côte d'Ivoire · Agréé CREPMF
