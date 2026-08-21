import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES } from '../utils/botParser';
import { formatIDR } from '../utils/formatters';
import { PieChart, Info } from 'lucide-react';

export const CategoryChart = () => {
  const { transactions } = useFinance();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals = {};
  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const categoryList = Object.entries(categoryTotals)
    .map(([categoryName, amount]) => {
      const catObj = Object.values(CATEGORIES).find(c => c.name === categoryName) || CATEGORIES.OTHER;
      const percentage = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(1) : 0;
      return {
        name: categoryName,
        amount,
        percentage: Number(percentage),
        color: catObj.color,
        icon: catObj.icon
      };
    })
    .sort((a, b) => b.amount - a.amount);

  let cumulativePercent = 0;
  const donutSlices = categoryList.map(item => {
    const startPercent = cumulativePercent;
    cumulativePercent += item.percentage;
    return {
      ...item,
      startPercent,
      endPercent: cumulativePercent
    };
  });

  return (
    <div className="livin-card p-5">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <PieChart className="w-4 h-4 text-[#ffc709]" />
          Alokasi Pengeluaran Livin
        </h3>
        <span className="text-xs font-bold text-slate-400">{categoryList.length} Kategori</span>
      </div>

      {totalExpense === 0 ? (
        <div className="text-center py-8 text-slate-400 text-xs flex flex-col items-center gap-2">
          <Info className="w-8 h-8 text-slate-600" />
          <span>Belum ada transaksi pengeluaran bulan ini</span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          
          <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {donutSlices.map((slice, idx) => {
                const strokeDasharray = `${slice.percentage * 2.827} 282.7`;
                const strokeDashoffset = `-${slice.startPercent * 2.827}`;
                const isHovered = hoveredCategory === slice.name;

                return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth={isHovered ? 14 : 10}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredCategory(slice.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Total Outflow</span>
              <span className="text-sm font-black text-white leading-tight">
                {formatIDR(totalExpense)}
              </span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-2.5">
            {categoryList.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCategory(item.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
                  hoveredCategory === item.name
                    ? 'bg-white/10 border-[#ffc709]/40 scale-[1.02]'
                    : 'bg-white/5 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white">{item.name}</p>
                    <div className="w-24 h-1.5 rounded-full bg-slate-900 overflow-hidden mt-1">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-extrabold text-slate-200">{formatIDR(item.amount)}</p>
                  <p className="text-[10px] font-bold text-slate-400">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};
