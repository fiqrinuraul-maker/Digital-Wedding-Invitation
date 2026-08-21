import React from 'react';
import { Heart, Info } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
  </svg>
);

export const FooterSection = () => {
  return (
    <footer className="py-16 px-4 bg-slate-950 relative text-center space-y-10">
      
      {/* Thank You Note */}
      <div className="max-w-xl mx-auto space-y-4">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
          Terima Kasih
        </p>
        <p className="font-serif text-2xl md:text-3xl text-slate-200 font-light leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <div className="pt-4">
          <p className="text-xs text-slate-400 uppercase tracking-widest">Kami yang berbahagia,</p>
          <h3 className="font-serif text-3xl font-bold text-gradient-gold my-2">
            Nadya & Fiqri
          </h3>
          <p className="text-xs text-amber-400/80 font-medium">{weddingConfig.couple.hashtag}</p>
        </div>
      </div>

      {/* Audio Setup Instructions Callout for Maintenance */}
      <div className="max-w-md mx-auto p-4 rounded-2xl glass-card text-left border border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-semibold">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Panduan Musik Latar (Background Music)</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Letakkan file musik pernikahan berformat <strong>.mp3</strong> Anda di folder:
        </p>
        <code className="block p-2 rounded-lg bg-slate-900 text-amber-300 font-mono text-[11px] overflow-x-auto">
          public/audio/wedding-bgm.mp3
        </code>
        <p className="text-[11px] text-slate-400">
          *Atau ubah path <code className="text-amber-300">audio.src</code> di <code className="text-amber-300">src/config/weddingConfig.js</code>.
        </p>
      </div>

      {/* Copyright & Repo Link */}
      <div className="pt-8 border-t border-slate-800/80 flex flex-col items-center justify-center gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>for Nadya & Fiqri Wedding</span>
        </div>

        {weddingConfig.githubRepo && (
          <a
            href={weddingConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors"
          >
            <GithubIcon />
            <span>fiqrinuraul-maker/Digital-Wedding-Invitation</span>
          </a>
        )}
      </div>

    </footer>
  );
};
