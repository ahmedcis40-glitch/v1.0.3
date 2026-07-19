import React, { useState } from 'react';
import { Page, Transaction, User, SupportTicket } from './types';
import { initialTransactions, initialUsers, initialTickets } from './data';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { TransactionsView } from './components/TransactionsView';
import { UserManagementView } from './components/UserManagementView';
import { MarketMonitoringView } from './components/MarketMonitoringView';
import { SettingsView } from './components/SettingsView';
import { SupportView } from './components/SupportView';
import { 
  Bell, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  X, 
  Coins, 
  Landmark 
} from 'lucide-react';

export default function App() {
  // Navigation & States
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Central State stores
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  
  // Selection pointers
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Custom Toast System state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Dynamic Modals state
  const [showNewOpModal, setShowNewOpModal] = useState(false);

  // New Operation form fields
  const [opClientName, setOpClientName] = useState('');
  const [opClientId, setOpClientId] = useState('EB-CI-09221');
  const [opTicker, setOpTicker] = useState('SNTS');
  const [opQty, setOpQty] = useState('100');
  const [opUnitPrice, setOpUnitPrice] = useState('16200');
  const [opType, setOpType] = useState<'BUY' | 'SELL'>('BUY');
  const [opMethod, setOpMethod] = useState<'OM' | 'WV' | 'BANK'>('OM');

  // Triggering Toasts
  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // State transaction actions
  const handleApproveTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        triggerToast(`Transaction ${id} validée avec succès ! Fonds transférés.`, 'success');
        return { ...t, status: 'APPROVED' };
      }
      return t;
    }));
  };

  const handleRejectTransaction = (id: string, reason?: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        triggerToast(`Transaction ${id} rejetée : ${reason || 'Preuve non-conforme'}`, 'error');
        return { ...t, status: 'REJECTED', note: reason };
      }
      return t;
    }));
  };

  // New Client creation
  const handleAddUser = (user: Omit<User, 'id'>) => {
    const newId = `EB-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullUser: User = {
      ...user,
      id: newId
    };
    setUsers(prev => [fullUser, ...prev]);
    triggerToast(`Nouveau compte client ${user.name} créé avec l'identifiant ${newId}.`, 'success');
  };

  // Support ticket actions
  const handleUpdateTicketStatus = (id: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const typeToast = status === 'RESOLU' ? 'success' : 'info';
        const msg = status === 'RESOLU' 
          ? `Ticket d'assistance ${id} marqué comme RESOLU.` 
          : `Réponse envoyée. Statut du ticket mis à jour : EN COURS.`;
        triggerToast(msg, typeToast);
        return { ...t, status };
      }
      return t;
    }));
  };

  // Dynamic operation creator handler
  const handleCreateOperation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opClientName) return;

    const opId = `#ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const priceNum = parseFloat(opUnitPrice) || 1000;
    const qtyNum = parseFloat(opQty) || 10;
    const totalAmount = priceNum * qtyNum;

    // Retrieve selected client avatar if match or fallback
    const clientMatch = users.find(u => u.name.toLowerCase() === opClientName.toLowerCase());
    const clientAvatar = clientMatch?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    const clientEmail = clientMatch?.email || `${opClientName.toLowerCase().replace(/\s+/g, '.')}@email.ci`;

    const newTx: Transaction = {
      id: opId,
      clientName: opClientName,
      clientId: opClientId,
      clientEmail,
      clientAvatar,
      accountType: clientMatch?.accountType || 'Standard',
      balance: 1450200,
      ticker: opTicker,
      companyName: opTicker === 'SNTS' ? 'Sonatel CI' : opTicker === 'ONTBF' ? 'Onatel BF' : opTicker === 'CABC' ? 'SGB CI' : 'Bourse Asset',
      type: opType,
      quantity: qtyNum,
      unitPrice: priceNum,
      totalAmount,
      market: 'BRVM',
      dateString: 'Aujourd\'hui, ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'PENDING',
      paymentMethod: opMethod === 'OM' ? 'Orange Money' : opMethod === 'WV' ? 'Wave' : 'Virement Bancaire',
      paymentMethodCode: opMethod,
      reference: `${opMethod}-TX-${Math.floor(100000 + Math.random() * 900000)}`,
      proofFileName: `Proof_Recu_${opId.slice(1)}.pdf`,
      proofFileSize: '1.4 MB',
      proofUploadTime: 'A l\'instant'
    };

    setTransactions(prev => [newTx, ...prev]);
    setShowNewOpModal(false);
    triggerToast(`Ordre ${opId} soumis en attente de vérification !`, 'success');

    // Reset fields
    setOpClientName('');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased">
      
      {/* Active Top-Level Floating Toast Notifications */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] max-w-sm w-full bg-white border border-[#dec1af]/40 shadow-2xl rounded-2xl p-4 flex gap-3 animate-slide-in transform transition-all duration-300">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-6 h-6 text-[#006d31] shrink-0" />
          ) : toast.type === 'error' ? (
            <XCircle className="w-6 h-6 text-red-600 shrink-0" />
          ) : (
            <Bell className="w-6 h-6 text-[#ff8200] shrink-0" />
          )}
          <div className="flex-1">
            <h4 className="font-sans font-bold text-[14px] text-[#0b1c30]">Notification Système</h4>
            <p className="font-sans text-[12px] text-[#574235]/90 mt-1 leading-normal">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-[#574235]/40 hover:text-gray-900 shrink-0 self-start">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Dynamic Operation Modal */}
      {showNewOpModal && (
        <div className="fixed inset-0 bg-[#0b1c30]/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#dec1af]/30 overflow-hidden">
            <div className="p-6 border-b border-[#dec1af]/25 flex justify-between items-center bg-[#f8f9ff]">
              <h3 className="font-sans font-bold text-[18px] text-[#0b1c30] flex items-center gap-2">
                <Plus className="text-[#ff8200] w-5 h-5" />
                Soumettre un Nouvel Ordre
              </h3>
              <button 
                onClick={() => setShowNewOpModal(false)}
                className="text-[#574235] hover:bg-gray-100 rounded-full p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateOperation} className="p-6 space-y-4 font-sans text-[14px]">
              
              <div className="space-y-1.5">
                <label className="block font-bold text-[11px] text-[#574235] uppercase">Nom du client</label>
                <select
                  required
                  value={opClientName}
                  onChange={(e) => {
                    setOpClientName(e.target.value);
                    const selected = users.find(u => u.name === e.target.value);
                    if (selected) setOpClientId(selected.id);
                  }}
                  className="w-full bg-white border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                >
                  <option value="">Sélectionner un client...</option>
                  {users.map(u => (
                    <option key={u.id} value={u.name}>{u.name} ({u.id})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-[11px] text-[#574235] uppercase">Valeur Ticker</label>
                  <select
                    value={opTicker}
                    onChange={(e) => setOpTicker(e.target.value)}
                    className="w-full bg-white border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                  >
                    <option value="SNTS">SNTS (Sonatel CI)</option>
                    <option value="ONTBF">ONTBF (Onatel BF)</option>
                    <option value="CABC">CABC (SGB CI)</option>
                    <option value="BICI">BICI (BICICI)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block font-bold text-[11px] text-[#574235] uppercase">Type d'opération</label>
                  <select
                    value={opType}
                    onChange={(e) => setOpType(e.target.value as any)}
                    className="w-full bg-white border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                  >
                    <option value="BUY">Achat (BUY)</option>
                    <option value="SELL">Vente (SELL)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-[11px] text-[#574235] uppercase">Quantité d'actions</label>
                  <input
                    type="number"
                    required
                    value={opQty}
                    onChange={(e) => setOpQty(e.target.value)}
                    className="w-full border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-bold text-[11px] text-[#574235] uppercase">Prix Unitaire (FCFA)</label>
                  <input
                    type="number"
                    required
                    value={opUnitPrice}
                    onChange={(e) => setOpUnitPrice(e.target.value)}
                    className="w-full border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-[11px] text-[#574235] uppercase">Méthode de Paiement</label>
                <select
                  value={opMethod}
                  onChange={(e) => setOpMethod(e.target.value as any)}
                  className="w-full bg-white border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                >
                  <option value="OM">Orange Money Côte d'Ivoire</option>
                  <option value="WV">Wave</option>
                  <option value="BANK">Virement Bancaire (SGB)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#dec1af]/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewOpModal(false)}
                  className="px-4 py-2 text-[#574235] hover:bg-gray-100 rounded-lg font-semibold text-[13px]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#ff8200] text-white rounded-lg font-bold text-[13px] hover:opacity-90 active:scale-95 transition-all shadow-sm shadow-[#ff8200]/20"
                >
                  Créer l'Opération
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar Component */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          // Auto-reset single detail pointers upon shifting pages
          setSelectedTransaction(null);
        }}
        adminProfile={{
          name: 'M. Kouassi',
          role: 'Admin Level 4',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
        }}
      />

      {/* Header Bar */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholderText="Rechercher une transaction, un client..."
      />

      {/* Core Dynamic Content Container */}
      <main className="pl-[280px] pt-16 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          
          {currentPage === Page.Dashboard && (
            <DashboardView
              transactions={transactions}
              onSelectTransaction={(tx) => {
                setSelectedTransaction(tx);
                setCurrentPage(Page.Transactions);
              }}
              onApproveTransaction={handleApproveTransaction}
              onRejectTransaction={handleRejectTransaction}
              onNewTransactionClick={() => setShowNewOpModal(true)}
            />
          )}

          {currentPage === Page.Transactions && (
            <TransactionsView
              transactions={transactions}
              selectedTransaction={selectedTransaction}
              setSelectedTransaction={setSelectedTransaction}
              onApproveTransaction={handleApproveTransaction}
              onRejectTransaction={handleRejectTransaction}
              onNewTransactionClick={() => setShowNewOpModal(true)}
            />
          )}

          {currentPage === Page.UserManagement && (
            <UserManagementView
              users={users}
              onAddUser={handleAddUser}
            />
          )}

          {currentPage === Page.MarketMonitoring && (
            <MarketMonitoringView />
          )}

          {currentPage === Page.Settings && (
            <SettingsView
              onSave={() => triggerToast('Paramètres du système enregistrés avec succès !', 'success')}
            />
          )}

          {currentPage === Page.Support && (
            <SupportView
              tickets={tickets}
              onUpdateTicketStatus={handleUpdateTicketStatus}
            />
          )}

        </div>
      </main>

    </div>
  );
}
