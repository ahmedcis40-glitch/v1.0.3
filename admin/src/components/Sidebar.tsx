import React from 'react';
import { Page } from '../types';
import { 
  Landmark, 
  LayoutDashboard, 
  ArrowLeftRight, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout?: () => void;
  adminProfile?: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  onLogout = () => {},
  adminProfile = {
    name: 'M. Cissé',
    role: 'Admin Level 4',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  }
}) => {
  const menuItems = [
    { id: Page.Dashboard, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: Page.Transactions, label: 'Transactions', icon: ArrowLeftRight },
    { id: Page.UserManagement, label: 'Clients', icon: Users },
    { id: Page.Settings, label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 bg-white border-r border-[#dec1af]/30 flex flex-col py-6 z-50">
      {/* Brand Logo Header */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <img 
          src="/baou_logo.jpg" 
          alt="BAOU Logo" 
          className="w-11 h-11 rounded-xl object-cover border border-[#dec1af]/30 shadow-md" 
        />
        <div>
          <h1 className="font-sans font-bold text-[20px] text-[#0b1c30] leading-none tracking-tight">
            BAOU Finance
          </h1>
          <p className="font-sans text-[10px] text-[#ff8200] font-bold mt-1 tracking-wider uppercase">
            Portail Admin
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 px-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg text-left font-sans font-medium text-[14px] transition-all duration-200 ${
                isActive
                  ? 'border-l-4 border-[#ff8200] bg-[#ffdcc6]/20 text-[#954a00]'
                  : 'text-[#574235]/80 hover:text-[#954a00] hover:bg-[#eff4ff]'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#ff8200]' : 'text-[#574235]/60'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile & Utilities */}
      <div className="px-2 mt-auto pt-4 border-t border-[#dec1af]/20 flex flex-col gap-1">
        <button
          onClick={() => setCurrentPage(Page.Support)}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg text-left font-sans font-medium text-[14px] transition-all duration-200 ${
            currentPage === Page.Support
              ? 'border-l-4 border-[#ff8200] bg-[#ffdcc6]/20 text-[#954a00]'
              : 'text-[#574235]/80 hover:text-[#954a00] hover:bg-[#eff4ff]'
          }`}
        >
          <HelpCircle className="w-5 h-5 text-[#574235]/60" />
          <span>Support</span>
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-4 px-4 py-3 rounded-lg text-left font-sans font-medium text-[14px] text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span>Logout</span>
        </button>

        {/* Small Profile Info */}
        <div className="mt-4 p-3 bg-[#f8f9ff] rounded-xl border border-[#dec1af]/20 flex items-center gap-3">
          <img
            src={adminProfile.avatar}
            alt={adminProfile.name}
            className="w-10 h-10 rounded-full object-cover border border-[#dec1af]/30 ring-2 ring-[#ff8200]/10"
          />
          <div className="overflow-hidden">
            <p className="text-[13px] font-bold text-[#0b1c30] truncate">{adminProfile.name}</p>
            <p className="text-[11px] text-[#574235]/70 truncate font-medium">{adminProfile.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
