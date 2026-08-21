import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES } from '../utils/botParser';
import { formatIDR, getCurrentMonthNameIndo } from '../utils/formatters';
import { Target, AlertTriangle, CheckCircle, AlertCircle, Edit2, Check, Sparkles } from 'lucide-react';

export const BudgetManager = () => {
  const { transactions, budgets, updateBudget } = useFinance();
  const [editingCatId, setEditingCatId] = useState(null);
  const [tempBudget, setTempBudget] = useState('');

  const expenses = transactions.filter(t => t.type === 'expense');

  const startEdit = (catId, currentVal) => {
    setEditingCatId(catId);
    setTempBudget(currentVal ? currentVal.toString() : '0');
  };

  const saveEdit = (catId) => {
    updateBudget(catId, Number(tempBudget) || 0);
    setEditingCatId(null);
  };

  let totalOverallBudget = 0;
  let totalOverallSpent = 0;

  const budgetItems = Object.values(CATEGORIES)
    .filter(cat => cat.id !== 'income')
    .map(cat => {
      const budgetLimit = budgets[cat.id] || 0;
      const spent = expenses
        .filter(t => t.category === cat.name)
        .reduce((sum, t) => sum + t.amount, 0);

      totalOverallBudget += budgetLimit;
      totalOverallSpent += spent;

      const percentage = budgetLimit > 0 ? Math.min(Math.round((spent / budgetLimit) * 100), 999) : 0;

      let status = 'normal';
      if (percentage >= 100) status = 'exceeded';
      else if (percentage >= 80) status = 'warning';

      return {
        ...cat,
        budgetLimit,
        spent,
        percentage,
        status
      };
    });

  const overallPercent = totalOverallBudget > 0 ? Math.min(Math.round((totalOverallSpent / totalOverallBudget) * 100), 999) : 0;

  return (
    <div className="livin-card p-5 space-y-5">
      
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="font-extrabold text-white text-base flex items-center gap-2">
            <Target className="w-5 h-5 text-[#ffc709]" />
            Livin' Financial Planner ({getCurrentMonthNameIndo()})
          </h3>
          <p className="text-xs text-slate-400">Rencanakan alokasi anggaran bulanan agar arus kas tetap sehat</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#0d2244] to-[#17366b] border border-[#ffc709]/30 p-4 rounded-2xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-[#ffc709]">Total Rencana Anggaran Bulanan</span>
          <span className="text-xs font-black text-white">
            {formatIDR(totalOverallSpent)} / {formatIDR(totalOverallBudget)} ({overallPercent}%)
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-[#061224] overflow-hidden p-0.5 border border-white/10">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              overallPercent >= 100
                ? 'bg-rose-500 shadow-rose-500/50'
                : overallPercent >= 80
                ? 'bg-[#ffc709] shadow-amber-500/50'
                : 'bg-gradient-to-r from-cyan-400 to-[#ffc709]'
            }`}
            style={{ width: `${Math.min(overallPercent, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {budgetItems.map((item) => {
          const isEditing = editingCatId === item.id;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                item.status === 'exceeded'
                  ? 'bg-rose-500/10 border-rose-500/40'
                  : item.status === 'warning'
                  ? 'bg-[#ffc709]/10 border-[#ffc709]/40'
                  : 'bg-white/5 border-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-white text-xs sm:text-sm">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      Terpakai: <span className="font-bold text-slate-200">{formatIDR(item.spent)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={tempBudget}
                        onChange={(e) => setTempBudget(e.target.value)}
                        className="livin-input text-xs py-1 px-2.5 w-28 text-right font-bold"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(item.id)}
                        className="p-1.5 rounded-xl bg-[#ffc709] hover:bg-amber-400 text-[#061224] font-bold"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#ffc709]">
                        {item.budgetLimit > 0 ? formatIDR(item.budgetLimit) : 'Belum Set'}
                      </span>
                      <button
                        onClick={() => startEdit(item.id, item.budgetLimit)}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                        title="Ubah Anggaran"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.status === 'exceeded'
                        ? 'bg-rose-500'
                        : item.status === 'warning'
                        ? 'bg-[#ffc709]'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-mono">{item.percentage}% dari batas</span>
                  {item.status === 'exceeded' && (
                    <span className="text-rose-400 font-extrabold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Exceeded!
                    </span>
                  )}
                  {item.status === 'warning' && (
                    <span className="text-[#ffc709] font-extrabold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Peringatan (&gt;80%)
                    </span>
                  )}
                  {item.status === 'normal' && (
                    <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Aman
                    </span>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
