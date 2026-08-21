import React from 'react';
import { Mail, Calendar, MapPin, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const CoverHero = ({ guestName, isOpen, onOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 transition-all duration-1000 bg-slate-950 ${
        isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.95)), url('${weddingConfig.gallery[0].url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Top Floral Accent / Subtitle */}
      <div className="text-center pt-8 animate-fade-in">
        <p className="text-amber-300 font-medium tracking-widest text-xs uppercase mb-2">
          The Wedding Invitation
        </p>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
      </div>

      {/* Main Couple Names & Cover Info */}
      <div className="text-center my-auto space-y-4 max-w-lg px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-amber-300 text-xs tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
          <span>WEDDING CELEBRATION</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold text-gradient-gold drop-shadow-md tracking-wide">
          {weddingConfig.couple.groom.shortName} <span className="font-cursive text-amber-300 font-normal text-4xl md:text-6xl">&</span> {weddingConfig.couple.bride.shortName}
        </h1>

        <p className="text-slate-300 font-light text-sm md:text-base tracking-wide max-w-xs mx-auto">
          Kami mengundang Anda untuk berbagi kebahagiaan di hari pernikahan kami.
        </p>

        {/* Guest Personalization Card */}
        <div className="mt-8 p-5 rounded-2xl glass-card border border-amber-500/20 shadow-2xl max-w-sm mx-auto">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <h2 className="text-xl md:text-2xl font-semibold text-amber-200 capitalize font-serif my-1">
            {guestName || "Tamu Undangan"}
          </h2>
          <p className="text-xs text-slate-400 italic">Di Tempat</p>
        </div>

        {/* Date & Location Pill */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 pt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{weddingConfig.event.dateDisplay}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{weddingConfig.location.venueName}</span>
          </div>
        </div>
      </div>

      {/* Bottom Open Button */}
      <div className="pb-8 w-full max-w-xs text-center">
        <button
          onClick={onOpen}
          className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-semibold text-sm shadow-xl shadow-amber-900/40 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 animate-shimmer"></div>
          <Mail className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
          <span>Buka Undangan</span>
        </button>
        <p className="text-[10px] text-slate-400 mt-2">
          *Klik tombol untuk membuka undangan & memutar musik
        </p>
      </div>
    </div>
  );
};
