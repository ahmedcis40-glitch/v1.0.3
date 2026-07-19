import React, { useState } from 'react';
import { User } from '../types';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Search, 
  SlidersHorizontal, 
  RefreshCw, 
  ShieldCheck, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  X,
  MoreVertical,
  TrendingUp
} from 'lucide-react';

interface UserManagementViewProps {
  users: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  users,
  onAddUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState('');
  const [accountFilter, setAccountFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new user
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserAccountType, setNewUserAccountType] = useState<'Standard' | 'Premium'>('Standard');
  const [newUserKyc, setNewUserKyc] = useState<'VERIFIED' | 'PENDING' | 'REJECTED'>('PENDING');

  // Filter clients
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesKyc = kycFilter === '' ? true : u.kycStatus === kycFilter;
    const matchesAccount = accountFilter === '' ? true : u.accountType === accountFilter;

    return matchesSearch && matchesKyc && matchesAccount;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    // Trigger parent add callback
    onAddUser({
      name: newUserName,
      email: newUserEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', // Default gorgeous avatar
      accountType: newUserAccountType,
      kycStatus: newUserKyc,
      lastActivityDate: 'À l\'instant',
      lastActivityPlatform: 'Plateforme Web'
    });

    // Reset and close modal
    setNewUserName('');
    setNewUserEmail('');
    setNewUserAccountType('Standard');
    setNewUserKyc('PENDING');
    setShowAddModal(false);
  };

  const getKycBadge = (status: User['kycStatus']) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-sans font-bold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Vérifié
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-sans font-bold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            En attente
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 font-sans font-bold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            Rejeté
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Create User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0b1c30]/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#dec1af]/30 overflow-hidden transform transition-all">
            <div className="p-6 border-b border-[#dec1af]/25 flex justify-between items-center bg-[#f8f9ff]">
              <h3 className="font-sans font-bold text-[18px] text-[#0b1c30] flex items-center gap-2">
                <UserPlus className="text-[#ff8200] w-5 h-5" />
                Créer un Nouveau Compte Client
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#574235] hover:bg-gray-100 rounded-full p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4 font-sans text-[14px]">
              <div className="space-y-1.5">
                <label className="block font-bold text-[11px] text-[#574235] uppercase">Nom complet du client</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Ex: Koffi Kouamé Arnaud"
                  className="w-full border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-[11px] text-[#574235] uppercase">Adresse Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="Ex: arnaud.koffi@finance.ci"
                  className="w-full border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-[11px] text-[#574235] uppercase">Type de Compte</label>
                  <select
                    value={newUserAccountType}
                    onChange={(e) => setNewUserAccountType(e.target.value as any)}
                    className="w-full bg-white border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block font-bold text-[11px] text-[#574235] uppercase">Statut KYC</label>
                  <select
                    value={newUserKyc}
                    onChange={(e) => setNewUserKyc(e.target.value as any)}
                    className="w-full bg-white border border-[#dec1af]/45 rounded-lg px-3 py-2 text-[#0b1c30] focus:ring-1 focus:ring-[#ff8200] outline-none"
                  >
                    <option value="PENDING">En attente</option>
                    <option value="VERIFIED">Vérifié</option>
                    <option value="REJECTED">Rejeté</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#dec1af]/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-[#574235] hover:bg-gray-100 rounded-lg font-semibold text-[13px]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#ff8200] text-white rounded-lg font-bold text-[13px] hover:opacity-90 active:scale-95 transition-all shadow-sm"
                >
                  Ajouter le client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-sans font-extrabold text-[24px] text-[#0b1c30] tracking-tight">
            Gestion des Utilisateurs
          </h2>
          <p className="font-sans text-[14px] text-[#574235]/80 mt-0.5">
            Gérez les comptes clients, vérifiez les statuts KYC et surveillez l'activité.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#ff8200] text-white px-6 py-2.5 rounded-lg font-sans font-bold text-[13px] flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Nouveau Client
        </button>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#dec1af]/30 flex justify-between items-center group hover:border-[#ff8200] transition-colors duration-200">
          <div>
            <p className="font-sans font-bold text-[11px] text-[#574235]/70 uppercase tracking-wider mb-2">Total Utilisateurs</p>
            <h3 className="font-sans font-black text-[26px] text-[#0b1c30]">{users.length + 12837}</h3>
            <p className="text-[#006d31] font-sans font-semibold text-[11px] mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12% ce mois
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#f8f9ff] flex items-center justify-center text-[#ff8200] group-hover:bg-[#ffdcc6]/30 transition-colors">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#dec1af]/30 flex justify-between items-center group hover:border-[#ff8200] transition-colors duration-200">
          <div>
            <p className="font-sans font-bold text-[11px] text-[#574235]/70 uppercase tracking-wider mb-2">Attente Vérification</p>
            <h3 className="font-sans font-black text-[26px] text-[#ff8200]">
              {users.filter(u => u.kycStatus === 'PENDING').length}
            </h3>
            <p className="text-[#574235]/70 font-sans font-medium text-[11px] mt-1">42 dossiers prioritaires</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#ffdcc6]/20 flex items-center justify-center text-[#ff8200] group-hover:bg-[#ff8200] group-hover:text-white transition-all duration-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#dec1af]/30 flex justify-between items-center group hover:border-[#ff8200] transition-colors duration-200">
          <div>
            <p className="font-sans font-bold text-[11px] text-[#574235]/70 uppercase tracking-wider mb-2">Nouveaux ce mois</p>
            <h3 className="font-sans font-black text-[26px] text-[#0b1c30]">892</h3>
            <p className="text-[#005db6] font-sans font-semibold text-[11px] mt-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Objectif à 94%
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#f8f9ff] flex items-center justify-center text-[#005db6] group-hover:bg-[#d6e3ff] transition-all">
            <UserPlus className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-[#dec1af]/30 rounded-t-xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[280px] relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#574235]/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-[#dec1af]/40 rounded-lg text-[13px] font-sans text-[#0b1c30] focus:border-[#ff8200] focus:ring-1 focus:ring-[#ff8200] outline-none bg-white transition-all"
            placeholder="Rechercher par nom, ID ou email..."
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={kycFilter}
            onChange={(e) => setKycFilter(e.target.value)}
            className="px-4 py-2 border border-[#dec1af]/40 rounded-lg text-[13px] font-sans text-[#0b1c30] bg-white focus:ring-1 focus:ring-[#ff8200] outline-none min-w-[160px]"
          >
            <option value="">Statut KYC</option>
            <option value="VERIFIED">Vérifié</option>
            <option value="PENDING">En attente</option>
            <option value="REJECTED">Rejeté</option>
          </select>

          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="px-4 py-2 border border-[#dec1af]/40 rounded-lg text-[13px] font-sans text-[#0b1c30] bg-white focus:ring-1 focus:ring-[#ff8200] outline-none min-w-[160px]"
          >
            <option value="">Type de Compte</option>
            <option value="Premium">Premium</option>
            <option value="Standard">Standard</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 text-[#574235]/80 hover:text-[#ff8200] transition-colors font-sans font-bold text-[13px] border border-[#dec1af]/40 rounded-lg hover:bg-[#f8f9ff]">
            <SlidersHorizontal className="w-4 h-4" />
            Filtres Avancés
          </button>

          <button 
            onClick={() => { setSearchTerm(''); setKycFilter(''); setAccountFilter(''); }}
            className="p-2 text-[#574235]/60 hover:bg-[#f8f9ff] rounded-lg transition-colors border border-transparent hover:border-[#dec1af]/30"
            title="Rafraîchir"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Client Grid / Data Table */}
      <div className="bg-white border-x border-b border-[#dec1af]/30 rounded-b-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-16 text-center text-[#574235]/60 font-sans">
              <Users className="w-12 h-12 text-[#ff8200]/50 mx-auto mb-3" />
              <p className="font-bold">Aucun client trouvé</p>
              <p className="text-[12px] mt-1">Ajustez vos filtres ou ajoutez un nouveau client.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9ff] text-[#574235] font-sans font-bold text-[11px] uppercase tracking-wider border-b border-[#dec1af]/25">
                  <th className="px-6 py-3.5">Client & ID</th>
                  <th className="px-6 py-3.5">Type de Compte</th>
                  <th className="px-6 py-3.5">Statut KYC</th>
                  <th className="px-6 py-3.5">Dernière Activité</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dec1af]/20">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#f8f9ff]/50 transition-colors group">
                    {/* Name/Avatar Cell */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#dec1af]/30"
                        />
                        <div>
                          <p className="font-sans font-bold text-[14px] text-[#0b1c30] group-hover:text-[#954a00] transition-colors leading-tight">
                            {user.name}
                          </p>
                          <p className="font-sans text-[11px] text-[#574235]/65 mt-0.5">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Account Type with gold star/standard icon */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.accountType === 'Premium' ? (
                          <div className="flex items-center gap-1.5 text-[#954a00]">
                            <Award className="w-4 h-4 text-[#ff8200]" />
                            <span className="font-sans font-bold text-[13px]">Premium</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[#574235]/80">
                            <Users className="w-4 h-4 text-[#574235]/60" />
                            <span className="font-sans font-semibold text-[13px]">Standard</span>
                          </div>
                        )}
                      </div>
                    </td>
                    {/* KYC Badge Column */}
                    <td className="px-6 py-4">
                      {getKycBadge(user.kycStatus)}
                    </td>
                    {/* Last Activity metadata */}
                    <td className="px-6 py-4">
                      <p className="font-sans text-[13px] text-[#0b1c30] font-medium">
                        {user.lastActivityDate}
                      </p>
                      <p className="font-sans text-[11px] text-[#574235]/70 mt-0.5">
                        {user.lastActivityPlatform}
                      </p>
                    </td>
                    {/* Action trigger button */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <button className="px-3 py-1 bg-[#eff4ff] hover:bg-[#ffdcc6]/40 text-[#954a00] font-sans font-bold text-[12px] rounded-lg transition-all active:scale-95 shadow-xs">
                          Détails
                        </button>
                        <button className="p-1.5 text-[#574235]/60 hover:text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#f8f9ff] p-4 flex flex-col sm:flex-row justify-between items-center text-[12px] text-[#574235]/80 font-sans font-medium border-t border-[#dec1af]/20 gap-4">
          <p>
            Affichage de 1 à {filteredUsers.length} sur {filteredUsers.length + 12837} utilisateurs
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-[#dec1af]/30 rounded-lg hover:bg-white text-[#574235]/60 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#ff8200] text-white font-sans font-bold text-[12px]">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-white text-[#0b1c30] border border-[#dec1af]/15 font-sans font-bold text-[12px]">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-white text-[#0b1c30] border border-[#dec1af]/15 font-sans font-bold text-[12px]">3</button>
            <span className="px-1 text-[#574235]/60 font-sans font-bold text-[12px]">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-white text-[#0b1c30] border border-[#dec1af]/15 font-sans font-bold text-[12px]">128</button>
            <button className="p-2 border border-[#dec1af]/30 rounded-lg hover:bg-white text-[#574235]/60">
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
