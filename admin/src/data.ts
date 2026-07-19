import { Transaction, User, SupportTicket, MarketQuote } from './types';

export const initialTransactions: Transaction[] = [];

export const initialUsers: User[] = [];

export const initialTickets: SupportTicket[] = [
  {
    id: '#T-9021',
    clientName: 'Koffi Drissa',
    clientId: 'EB-C-9021',
    subject: 'Problème dépôt mobile money',
    description: 'J\'ai effectué un dépôt via Orange Money de 150 000 FCFA il y a plus de 2 heures, mais mon solde n\'est toujours pas mis à jour.',
    priority: 'HAUTE',
    status: 'OUVERT',
    dateString: 'Aujourd\'hui',
    timeString: '09:45'
  },
  {
    id: '#T-1142',
    clientName: 'Awa Yao',
    clientId: 'EB-C-1142',
    subject: 'Question KYC',
    description: 'Mes justificatifs de domicile ont été rejetés deux fois de suite. Pouvez-vous m\'indiquer quels formats de documents sont acceptés ?',
    priority: 'MOYENNE',
    status: 'EN_COURS',
    dateString: 'Hier',
    timeString: '14:20'
  },
  {
    id: '#T-7742',
    clientName: 'Bakary Koné',
    clientId: 'EB-C-7742',
    subject: 'Bug technique interface',
    description: 'Une erreur de type 500 s\'affiche lorsque j\'essaie d\'accéder à l\'aperçu graphique de mon portefeuille sur le dashboard.',
    priority: 'HAUTE',
    status: 'OUVERT',
    dateString: 'Hier',
    timeString: '16:10'
  },
  {
    id: '#T-5521',
    clientName: 'Saliou Diallo',
    clientId: 'EB-C-5521',
    subject: 'Demande de relevé',
    description: 'J\'aurais besoin d\'un relevé officiel au format PDF cacheté de mes transactions de bourse sur les 6 derniers mois pour un dossier bancaire.',
    priority: 'BASSE',
    status: 'RESOLU',
    dateString: '12 oct. 2023',
    timeString: '10:05'
  },
  {
    id: '#T-2341',
    clientName: 'Jean Mensah',
    clientId: 'EB-C-2341',
    subject: 'Mot de passe oublié',
    description: 'Le lien de réinitialisation de mon mot de passe ne m\'arrive pas sur ma boîte de réception, même après avoir vérifié mon dossier spam.',
    priority: 'MOYENNE',
    status: 'OUVERT',
    dateString: '12 oct. 2023',
    timeString: '08:30'
  }
];

export const initialMarketQuotes: MarketQuote[] = [
  {
    ticker: 'SNTS',
    name: 'Sonatel CI',
    price: 16200,
    change: 1.2,
    volume: 124500000,
    high: 16400,
    low: 16100,
    sparkline: [16100, 16150, 16120, 16250, 16300, 16200, 16180, 16220, 16200]
  },
  {
    ticker: 'ONTBF',
    name: 'Onatel BF',
    price: 5000,
    change: -0.8,
    volume: 48200000,
    high: 5120,
    low: 4950,
    sparkline: [5120, 5080, 5050, 4980, 4950, 4990, 5000, 4980, 5000]
  },
  {
    ticker: 'CABC',
    name: 'SGB CI',
    price: 10000,
    change: 2.4,
    volume: 185000000,
    high: 10200,
    low: 9750,
    sparkline: [9750, 9800, 9900, 10000, 10100, 9950, 10050, 10150, 10000]
  },
  {
    ticker: 'BICI',
    name: 'BICICI',
    price: 7500,
    change: 0.5,
    volume: 32000000,
    high: 7600,
    low: 7450,
    sparkline: [7450, 7480, 7500, 7520, 7490, 7510, 7530, 7500, 7500]
  },
  {
    ticker: 'ETI',
    name: 'Ecobank TI',
    price: 200,
    change: -1.5,
    volume: 15400000,
    high: 210,
    low: 195,
    sparkline: [210, 205, 200, 198, 195, 198, 202, 201, 200]
  },
  {
    ticker: 'BOAS',
    name: 'Bank Of Africa SN',
    price: 3200,
    change: 3.1,
    volume: 59000000,
    high: 3250,
    low: 3100,
    sparkline: [3100, 3120, 3150, 3180, 3200, 3170, 3210, 3230, 3200]
  }
];
