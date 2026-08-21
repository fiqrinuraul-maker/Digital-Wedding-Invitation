import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Home, Receipt, MessageSquareCode, Target, Settings2 } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useFinance();

  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'transactions', label: 'Mutasi', icon: Receipt },
    { id: 'chat', label: 'Livin Bot', icon: MessageSquareCode, highlight: true },
    { id: 'budget', label: 'Planner', icon: Target },
    { id: 'settings', label: 'Pengaturan', icon: Settings2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#061224]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-[#ffc709] font-extrabold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#ffc709]' : 'text-slate-400'}`} />
                {item.highlight && activeTab !== 'chat' && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ffc709] border-2 border-[#061224]"></span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-5 h-1 rounded-full bg-[#ffc709] shadow-sm shadow-amber-500/50"></span>
              )}
            </button>
          );
        })}

      </div>
    </nav>
  );
};
