import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatIDR, getCurrentMonthNameIndo } from '../utils/formatters';
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight, Sparkles, MessageSquare, Plus, CreditCard, Send, Wallet, Download, Target, Receipt } from 'lucide-react';

export const BalanceCard = ({ onOpenAddModal }) => {
  const { transactions, setActiveTab } = useFinance();
  const [showBalance, setShowBalance] = useState(true);

  const incomeTotal = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = incomeTotal - expenseTotal;
  const spendingRatio = incomeTotal > 0 ? Math.min(Math.round((expenseTotal / incomeTotal) * 100), 100) : 0;

  return (
    <div className="space-y-4">
      
      {/* Livin' Saldo Utama Card */}
      <div className="livin-card-gold p-6 relative">
        
        {/* Top Header Card info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#ffc709] flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#ffc709]" />
              Saldo Rekening Utama
            </span>
            <span className="text-[10px] bg-white/10 text-slate-300 font-mono px-2 py-0.5 rounded-md border border-white/10">
              8892 • Tabungan Livin
            </span>
          </div>

          {/* Balance Visibility Toggle */}
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-black/20 hover:bg-black/30 px-2.5 py-1 rounded-full border border-white/10 transition-all"
          >
            {showBalance ? <EyeOff className="w-3.5 h-3.5 text-[#ffc709]" /> : <Eye className="w-3.5 h-3.5 text-[#ffc709]" />}
            <span>{showBalance ? 'Sembunyikan' : 'Tampilkan'}</span>
          </button>
        </div>

        {/* Main Balance Display */}
        <div className="mb-6">
          {showBalance ? (
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${balance >= 0 ? 'text-white' : 'text-rose-400'}`}>
              {formatIDR(balance)}
            </h2>
          ) : (
            <h2 className="text-3xl sm:text-4xl font-black tracking-widest text-[#ffc709]">
              ••••••••••••
            </h2>
          )}
        </div>

        {/* Income & Expense Split Bar */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Pemasukan</p>
              <p className="text-sm font-bold text-emerald-400">
                {showBalance ? formatIDR(incomeTotal) : '••••••'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <ArrowDownRight className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Pengeluaran</p>
              <p className="text-sm font-bold text-rose-400">
                {showBalance ? formatIDR(expenseTotal) : '••••••'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Livin' Quick Menu Icon Grid */}
      <div className="livin-card p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>Quick Menu Livin</span>
          <span className="text-[10px] text-[#ffc709]">6 Fitur Cepat</span>
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          
          {/* 1. Catat Keluar */}
          <button
            onClick={() => onOpenAddModal('expense')}
            className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white/5 hover:bg-[#ffc709]/10 border border-white/5 hover:border-[#ffc709]/30 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <ArrowDownRight className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#ffc709]">Catat Keluar</span>
          </button>

          {/* 2. Catat Masuk */}
          <button
            onClick={() => onOpenAddModal('income')}
            className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white/5 hover:bg-[#ffc709]/10 border border-white/5 hover:border-[#ffc709]/30 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#ffc709]">Catat Masuk</span>
          </button>

          {/* 3. Bot Telegram */}
          <button
            onClick={() => setActiveTab('chat')}
            className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white/5 hover:bg-[#ffc709]/10 border border-white/5 hover:border-[#ffc709]/30 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#ffc709]/20 text-[#ffc709] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#ffc709]">Bot Chat</span>
          </button>

          {/* 4. Budget Planner */}
          <button
            onClick={() => setActiveTab('budget')}
            className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white/5 hover:bg-[#ffc709]/10 border border-white/5 hover:border-[#ffc709]/30 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#ffc709]">Budgeting</span>
          </button>

          {/* 5. Mutasi Rekening */}
          <button
            onClick={() => setActiveTab('transactions')}
            className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white/5 hover:bg-[#ffc709]/10 border border-white/5 hover:border-[#ffc709]/30 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <Receipt className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#ffc709]">Mutasi</span>
          </button>

          {/* 6. Settings / Export */}
          <button
            onClick={() => setActiveTab('settings')}
            className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white/5 hover:bg-[#ffc709]/10 border border-white/5 hover:border-[#ffc709]/30 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <Download className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#ffc709]">Ekspor CSV</span>
          </button>

        </div>
      </div>

    </div>
  );
};
