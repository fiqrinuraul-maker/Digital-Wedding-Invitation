import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard, QrCode, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const GiftSection = () => {
  const [copiedBankIndex, setCopiedBankIndex] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('transfer'); // 'transfer' or 'qrcode'

  const { title, subtitle, bankAccounts, physicalGift } = weddingConfig.gift;

  const copyToClipboard = (text, type, index = null) => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBankIndex(index);
      setTimeout(() => setCopiedBankIndex(null), 2500);
    } else if (type === 'address') {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  return (
    <section className="py-20 px-4 bg-slate-900/80 relative border-b border-slate-800/80">
      <div className="max-w-3xl mx-auto space-y-12 text-center">
        
        {/* Section Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl glass-card text-amber-400 mx-auto shadow-lg">
            <Gift className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gradient-gold">
            "{title}"
          </h2>
          <p className="text-xs md:text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        {/* Tab Selector: Transfer Direct / QR Code Barcode */}
        <div className="inline-flex p-1.5 rounded-2xl glass-pill max-w-md mx-auto gap-2">
          <button
            onClick={() => setActiveTab('transfer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'transfer'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Transfer Bank</span>
          </button>

          <button
            onClick={() => setActiveTab('qrcode')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'qrcode'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR Barcode</span>
          </button>
        </div>

        {/* Card Content Display */}
        <div className="max-w-md mx-auto">
          {activeTab === 'transfer' ? (
            <div className="space-y-4">
              {bankAccounts.map((account, index) => (
                <div
                  key={index}
                  className="glass-card-gold p-6 rounded-3xl space-y-5 text-left border border-amber-500/30 hover:border-amber-400 transition-all shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
                        {account.bankName}
                      </span>
                      <p className="text-xs text-slate-400">Atas Nama: {account.accountHolder}</p>
                    </div>
                    {account.logo && (
                      <div className="h-8 px-3 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center">
                        <span className="font-bold text-amber-300 text-xs">{account.bankName}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                    <span className="font-mono text-xl md:text-2xl font-bold tracking-wider text-amber-200">
                      {account.accountNumber}
                    </span>

                    <button
                      onClick={() => copyToClipboard(account.accountNumber, 'bank', index)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shrink-0"
                    >
                      {copiedBankIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Barcode / QR Code for guests who cannot attend but wish to send a gift */
            <div className="glass-card-gold p-8 rounded-3xl space-y-4 text-center border border-amber-500/30">
              <p className="text-xs text-amber-300 font-medium">
                Scan QR Barcode di bawah untuk transfer langsung via App Bank / E-Wallet:
              </p>
              
              <div className="w-48 h-48 mx-auto p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-amber-400">
                <img
                  src={bankAccounts[0].qrCodeUrl}
                  alt={`QR Code Barcode ${bankAccounts[0].bankName}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-amber-200 text-sm">{bankAccounts[0].bankName}</p>
                <p className="font-mono text-xs text-slate-300">{bankAccounts[0].accountNumber}</p>
                <p className="text-xs text-slate-400">a.n {bankAccounts[0].accountHolder}</p>
              </div>
            </div>
          )}
        </div>

        {/* Physical Gift Delivery Card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl max-w-md mx-auto text-left space-y-4 border border-slate-700">
          <div className="flex items-center gap-3 border-b border-slate-700/80 pb-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-slate-200 text-base">Kirim Hadiah Fisik</h4>
              <p className="text-xs text-slate-400">Alamat pengiriman kado atau kado fisik</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <p className="font-semibold text-amber-200">Penerima: {physicalGift.recipient}</p>
            <p className="leading-relaxed text-slate-400">{physicalGift.address}</p>
          </div>

          <button
            onClick={() => copyToClipboard(physicalGift.address, 'address')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-amber-400/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copiedAddress ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Alamat Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Alamat Kado</span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
