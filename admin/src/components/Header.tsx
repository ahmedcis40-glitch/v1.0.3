import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholderText?: string;
  adminProfile?: {
    name: string;
    role: string;
    avatar: string;
  };
  pendingTransactionsCount?: number;
  pendingKycCount?: number;
  openTicketsCount?: number;
  onSupportClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  placeholderText = 'Rechercher une transaction, un client...',
  adminProfile = {
    name: 'M. Cissé',
    role: 'Admin Level 4',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  pendingTransactionsCount = 0,
  pendingKycCount = 0,
  openTicketsCount = 0,
  onSupportClick = () => {}
}) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const totalNotifications = pendingTransactionsCount + pendingKycCount + openTicketsCount;

  return (
    <header className="h-16 fixed top-0 right-0 left-[280px] z-40 bg-white border-b border-[#dec1af]/30 flex justify-between items-center px-6">
      {/* Search Input Box */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full focus-within:ring-2 focus-within:ring-[#ff8200]/20 rounded-full transition-all">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#574235]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#eff4ff]/60 hover:bg-[#eff4ff]/90 border-none rounded-full pl-12 pr-4 py-2 text-[14px] font-sans text-[#0b1c30] placeholder-[#574235]/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#ff8200]"
            placeholder={placeholderText}
          />
        </div>
      </div>

      {/* Action Icons & User Metadata */}
      <div className="flex items-center gap-4">
        {/* Quick action triggers */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="hover:bg-[#eff4ff] rounded-full p-2 text-[#574235]/80 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {totalNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ff8200] rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-[#dec1af]/30 rounded-2xl shadow-xl p-4 z-50 animate-slide-in">
              <div className="flex justify-between items-center pb-2 border-b border-[#dec1af]/20">
                <h4 className="font-bold text-[14px] text-[#0b1c30]">Notifications</h4>
                <span className="text-[11px] font-bold text-white bg-[#ff8200] px-2 py-0.5 rounded-full">
                  {totalNotifications}
                </span>
              </div>
              <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
                {totalNotifications === 0 ? (
                  <p className="text-xs text-[#574235]/60 text-center py-4">Aucune nouvelle notification</p>
                ) : (
                  <>
                    {pendingTransactionsCount > 0 && (
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#f8f9ff] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#ff8200] mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-[13px] font-bold text-[#0b1c30]">Transactions en attente</p>
                          <p className="text-[11px] text-[#574235]/80 mt-0.5">
                            Il y a {pendingTransactionsCount} transaction(s) à valider.
                          </p>
                        </div>
                      </div>
                    )}
                    {pendingKycCount > 0 && (
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#f8f9ff] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#ff8200] mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-[13px] font-bold text-[#0b1c30]">Dossiers KYC</p>
                          <p className="text-[11px] text-[#574235]/80 mt-0.5">
                            Il y a {pendingKycCount} demande(s) KYC à vérifier.
                          </p>
                        </div>
                      </div>
                    )}
                    {openTicketsCount > 0 && (
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#f8f9ff] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#ff8200] mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-[13px] font-bold text-[#0b1c30]">Support Client</p>
                          <p className="text-[11px] text-[#574235]/80 mt-0.5">
                            Il y a {openTicketsCount} ticket(s) ouvert(s) à traiter.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={onSupportClick}
          className="hover:bg-[#eff4ff] rounded-full p-2 text-[#574235]/80 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="h-8 w-[1px] bg-[#dec1af]/30 mx-1"></div>

        {/* Administrator profile badge */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right">
            <p className="font-sans font-bold text-[14px] text-[#0b1c30] group-hover:text-[#954a00] transition-colors leading-none">
              {adminProfile.name}
            </p>
            <p className="font-sans text-[11px] font-medium text-[#574235]/70 leading-tight mt-0.5">
              {adminProfile.role}
            </p>
          </div>
          <img
            src={adminProfile.avatar}
            alt={adminProfile.name}
            className="w-10 h-10 rounded-full object-cover border border-[#dec1af]/40 ring-2 ring-[#ff8200]/15"
          />
        </div>
      </div>
    </header>
  );
};
