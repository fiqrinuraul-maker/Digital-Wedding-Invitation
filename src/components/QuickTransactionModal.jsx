import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES, detectCategory } from '../utils/botParser';
import { getTodayIso } from '../utils/formatters';
import { X, Plus, Sparkles, Mic, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuickTransactionModal = ({ isOpen, onClose, initialType = 'expense' }) => {
  const { addTransaction } = useFinance();
  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES.FOOD.name);
  const [date, setDate] = useState(getTodayIso());
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const handleQuickAddAmount = (addValue) => {
    const current = Number(amount) || 0;
    setAmount((current + addValue).toString());
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setDescription(val);
    const detected = detectCategory(val, type);
    setCategory(detected.name);
  };

  const handleSimulateVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      const samples = [
        { desc: 'Kopi Kenangan 28rb', amt: 28000 },
        { desc: 'Makan Siang Nasi Padang 35rb', amt: 35000 },
        { desc: 'Bensin Pertamax 100rb', amt: 100000 },
        { desc: 'Bonus Freelance 500rb', amt: 500000, t: 'income' }
      ];
      const pick = samples[Math.floor(Math.random() * samples.length)];
      if (pick.t) setType(pick.t);
      setDescription(pick.desc);
      setAmount(pick.amt.toString());
      setCategory(detectCategory(pick.desc, pick.t || type).name);
      setIsListening(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    addTransaction({
      type,
      amount: Number(amount),
      category,
      description: description || (type === 'income' ? 'Pemasukan' : 'Pengeluaran'),
      date,
      source: 'web'
    });

    if (type === 'income') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }

    onClose();
  };

  return (
    <div className="telegram-modal-overlay animate-slide-up">
      <div className="livin-card w-full max-w-md p-5 bg-[#0c1d38] border border-[#ffc709]/30 rounded-3xl shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            </div>
            <h3 className="font-extrabold text-white text-base">
              {type === 'income' ? 'Catat Pemasukan (CR)' : 'Catat Pengeluaran (DB)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 bg-[#061224] p-1 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-2 rounded-xl text-xs font-black transition-all ${
                type === 'expense' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              💸 Pengeluaran (DB)
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-2 rounded-xl text-xs font-black transition-all ${
                type === 'income' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              💰 Pemasukan (CR)
            </button>
          </div>

          {/* Amount Field */}
          <div>
            <label className="text-xs text-slate-400 font-bold mb-1 block">Nominal Transaksi (IDR Rp)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              required
              min="1"
              className="livin-input text-2xl font-black text-[#ffc709] text-center tracking-tight"
            />

            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
              <button type="button" onClick={() => handleQuickAddAmount(10000)} className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-[#ffc709]/20 text-[11px] font-bold text-slate-200 border border-white/10">
                +10rb
              </button>
              <button type="button" onClick={() => handleQuickAddAmount(50000)} className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-[#ffc709]/20 text-[11px] font-bold text-slate-200 border border-white/10">
                +50rb
              </button>
              <button type="button" onClick={() => handleQuickAddAmount(100000)} className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-[#ffc709]/20 text-[11px] font-bold text-slate-200 border border-white/10">
                +100rb
              </button>
              <button type="button" onClick={() => handleQuickAddAmount(500000)} className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-[#ffc709]/20 text-[11px] font-bold text-slate-200 border border-white/10">
                +500rb
              </button>
              <button type="button" onClick={() => handleQuickAddAmount(1000000)} className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-[#ffc709]/20 text-[11px] font-bold text-slate-200 border border-white/10">
                +1jt
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-slate-400 font-bold">Keterangan Transaksi</label>
              <button
                type="button"
                onClick={handleSimulateVoice}
                className={`text-[11px] font-bold flex items-center gap-1 transition-all ${
                  isListening ? 'text-[#ffc709] animate-pulse' : 'text-[#ffc709] hover:underline'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                {isListening ? 'Mendengarkan...' : 'Voice Input'}
              </button>
            </div>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Contoh: Kopi Kenangan, Nasi Padang..."
              className="livin-input text-xs"
              required
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-bold mb-1 block">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="livin-input text-xs bg-[#0c1d38]"
            >
              {Object.values(CATEGORIES).map((cat) => (
                <option key={cat.id} value={cat.name} className="bg-[#0c1d38] text-white">
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-bold mb-1 block">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="livin-input text-xs"
            />
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 livin-btn-primary text-xs"
            >
              Simpan Mutasi
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
