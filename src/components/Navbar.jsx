import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Bot, Settings, Sparkles, Bell, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { activeTab, setActiveTab, botConfig } = useFinance();

  return (
    <header className="sticky top-0 z-40 bg-[#061224]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Livin Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ffc709] to-[#e5b200] flex items-center justify-center shadow-lg shadow-amber-500/20 font-black text-[#061224] text-xl tracking-tighter">
            L
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                Livin' <span className="text-[#ffc709]">Finance</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffc709]/20 text-[#ffc709] border border-[#ffc709]/40 uppercase">
                Bank Style
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${botConfig.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-[#ffc709]'}`}></span>
              {botConfig.isConnected ? 'Terhubung Telegram Bot' : 'Livin Bot Simulator'}
            </p>
          </div>
        </div>

        {/* View Switches & Actions */}
        <div className="flex items-center gap-2">
          {/* Bot Chat Switcher */}
          <button
            onClick={() => setActiveTab(activeTab === 'chat' ? 'dashboard' : 'chat')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-[#ffc709] text-[#061224] shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">Bot Telegram</span>
            {activeTab !== 'chat' && (
              <span className="w-2 h-2 rounded-full bg-[#ffc709] animate-ping"></span>
            )}
          </button>

          {/* Bot Setup Modal Trigger */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-2xl text-slate-300 hover:text-white transition-all ${
              activeTab === 'settings' ? 'bg-[#ffc709]/20 text-[#ffc709] border border-[#ffc709]/30' : 'bg-white/5 hover:bg-white/10'
            }`}
            title="Pengaturan Bot Telegram"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
