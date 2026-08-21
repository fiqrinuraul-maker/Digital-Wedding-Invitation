import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatShortIDR } from '../utils/formatters';
import { BarChart3 } from 'lucide-react';

export const TrendChart = () => {
  const { transactions } = useFinance();

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const dailyData = last7Days.map(dateStr => {
    const dayIncome = transactions
      .filter(t => t.date === dateStr && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const dayExpense = transactions
      .filter(t => t.date === dateStr && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const dateObj = new Date(dateStr);
    const dayLabel = new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(dateObj);
    const dateNum = dateObj.getDate();

    return {
      dateStr,
      label: `${dayLabel} ${dateNum}`,
      income: dayIncome,
      expense: dayExpense
    };
  });

  const maxVal = Math.max(...dailyData.map(d => Math.max(d.income, d.expense)), 100000);

  return (
    <div className="livin-card p-5">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#ffc709]" />
          Grafik Cashflow 7 Hari Terakhir
        </h3>
        <div className="flex items-center gap-3 text-[11px] font-bold">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Masuk (CR)
          </span>
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Keluar (DB)
          </span>
        </div>
      </div>

      <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-1 border-b border-white/10">
        {dailyData.map((d, idx) => {
          const incomeHeight = Math.max(Math.round((d.income / maxVal) * 100), d.income > 0 ? 8 : 0);
          const expenseHeight = Math.max(Math.round((d.expense / maxVal) * 100), d.expense > 0 ? 8 : 0);

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
              
              <div className="absolute -top-12 bg-slate-900 text-white text-[10px] p-2 rounded-xl border border-[#ffc709]/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-xl">
                <p className="font-bold border-b border-white/10 pb-0.5">{d.label}</p>
                <p className="text-emerald-400">Masuk: {formatShortIDR(d.income)}</p>
                <p className="text-rose-400">Keluar: {formatShortIDR(d.expense)}</p>
              </div>

              <div className="w-full flex items-end justify-center gap-1 h-full">
                <div
                  className="w-1.5 sm:w-2.5 rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-500 shadow-md shadow-emerald-500/20"
                  style={{ height: `${incomeHeight}%` }}
                ></div>
                <div
                  className="w-1.5 sm:w-2.5 rounded-t-md bg-gradient-to-t from-rose-600 to-rose-400 transition-all duration-500 shadow-md shadow-rose-500/20"
                  style={{ height: `${expenseHeight}%` }}
                ></div>
              </div>

              <span className="text-[10px] text-slate-400 font-bold tracking-tighter truncate max-w-full">
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
