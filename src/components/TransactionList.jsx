import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES } from '../utils/botParser';
import { formatIDR, formatDateIndo } from '../utils/formatters';
import { Search, Filter, Trash2, Bot, Globe, Plus, Receipt, ShieldCheck } from 'lucide-react';

export const TransactionList = ({ onOpenAddModal }) => {
  const { transactions, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || t.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="livin-card p-5 space-y-4">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="font-extrabold text-white text-base flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#ffc709]" />
            Mutasi Rekening Keuangan
          </h3>
          <p className="text-xs text-slate-400">Menampilkan {filteredTransactions.length} riwayat transaksi</p>
        </div>

        <button
          onClick={() => onOpenAddModal('expense')}
          className="livin-btn-primary px-4 py-2 text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          Catat Manual
        </button>
      </div>

      {/* Search & Filter Pills */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari mutasi (contoh: Kopi, Nasi, Gaji)..."
            className="livin-input pl-10 py-2.5 text-xs"
          />
        </div>

        {/* Filter Type Pills */}
        <div className="flex items-center bg-[#061224] p-1 rounded-xl border border-white/10 w-full sm:w-auto justify-center">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-[#ffc709] text-[#061224]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilterType('expense')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'expense' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            Keluar (DB)
          </button>
          <button
            onClick={() => setFilterType('income')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'income' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            Masuk (CR)
          </button>
        </div>
      </div>

      {/* Transaction Item List */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-xs border border-dashed border-white/10 rounded-2xl">
          Tidak ada riwayat mutasi transaksi yang cocok.
        </div>
      ) : (
        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {filteredTransactions.map((tx) => {
            const catObj = Object.values(CATEGORIES).find(c => c.name === tx.category) || CATEGORIES.OTHER;
            const isIncome = tx.type === 'income';

            return (
              <div
                key={tx.id}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#ffc709]/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {/* Category Badge Icon */}
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: `${catObj.color}25`, border: `1px solid ${catObj.color}40` }}
                  >
                    {catObj.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-white text-xs sm:text-sm">{tx.description}</h4>
                      {/* Source badge */}
                      {tx.source === 'telegram' ? (
                        <span className="text-[9px] font-bold bg-[#ffc709]/20 text-[#ffc709] px-1.5 py-0.5 rounded-md flex items-center gap-0.5 border border-[#ffc709]/30">
                          <Bot className="w-3 h-3" /> Bot
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 border border-indigo-500/30">
                          <Globe className="w-3 h-3" /> App
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {tx.category} • {formatDateIndo(tx.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`font-black text-xs sm:text-sm ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isIncome ? '+ CR ' : '- DB '}{formatIDR(tx.amount)}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-60 group-hover:opacity-100 transition-all"
                    title="Hapus transaksi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
