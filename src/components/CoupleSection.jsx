import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"></rect>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round"></line>
  </svg>
);

export const CoupleSection = () => {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-slate-900/60 border-b border-slate-800/80">
      {/* Decorative Shimmer Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        
        {/* Qur'an Quote Header */}
        <div className="space-y-4 max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full glass-card text-amber-400 mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="font-serif italic text-amber-200 text-lg md:text-xl leading-relaxed">
            "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya..."
          </p>
          <p className="text-xs text-amber-400 font-medium uppercase tracking-widest">
            (QS. Ar-Rum: 21)
          </p>
        </div>

        {/* Section Heading */}
        <div className="space-y-2">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
            Mempelai Pria & Wanita
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-100">
            Pasangan Bahagia
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"></div>
        </div>

        {/* Groom & Bride Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center pt-6">
          
          {/* Groom Card */}
          <div className="glass-card p-8 rounded-3xl space-y-5 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 group">
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 blur-md opacity-40 group-hover:opacity-80 transition-opacity"></div>
              <img
                src={groom.avatar}
                alt={groom.fullName}
                className="relative w-40 h-40 rounded-full object-cover border-2 border-amber-400 shadow-xl"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-amber-200">
                {groom.fullName}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {groom.parents}
              </p>
            </div>

            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 transition-colors"
              >
                <InstagramIcon />
                <span>{groom.instagram}</span>
              </a>
            )}
          </div>

          {/* Heart Divider */}
          <div className="hidden md:flex flex-col items-center justify-center -mx-6">
            <div className="w-12 h-12 rounded-full glass-card border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-xl animate-pulse">
              <Heart className="w-6 h-6 fill-amber-400" />
            </div>
          </div>

          {/* Bride Card */}
          <div className="glass-card p-8 rounded-3xl space-y-5 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 group">
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-amber-200 blur-md opacity-40 group-hover:opacity-80 transition-opacity"></div>
              <img
                src={bride.avatar}
                alt={bride.fullName}
                className="relative w-40 h-40 rounded-full object-cover border-2 border-amber-400 shadow-xl"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-amber-200">
                {bride.fullName}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {bride.parents}
              </p>
            </div>

            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 transition-colors"
              >
                <InstagramIcon />
                <span>{bride.instagram}</span>
              </a>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
