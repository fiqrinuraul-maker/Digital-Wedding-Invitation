import React, { useState, useEffect } from 'react';
import { Clock, CalendarCheck } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const EventCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.event.weddingDateISO).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase font-semibold">
            <Clock className="w-4 h-4" />
            <span>Hitung Mundur Hari Bahagia</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-100">
            Menuju Hari Pernikahan
          </h2>
          <p className="text-sm text-slate-400 font-light">
            {weddingConfig.event.dateDisplay}
          </p>
        </div>

        {/* Countdown Timer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto px-2">
          
          <div className="glass-card-gold p-5 rounded-2xl text-center space-y-1 transform hover:-translate-y-1 transition-transform">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold block">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-xs text-amber-200/80 font-medium uppercase tracking-wider block">
              Hari
            </span>
          </div>

          <div className="glass-card-gold p-5 rounded-2xl text-center space-y-1 transform hover:-translate-y-1 transition-transform">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold block">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-xs text-amber-200/80 font-medium uppercase tracking-wider block">
              Jam
            </span>
          </div>

          <div className="glass-card-gold p-5 rounded-2xl text-center space-y-1 transform hover:-translate-y-1 transition-transform">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold block">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs text-amber-200/80 font-medium uppercase tracking-wider block">
              Menit
            </span>
          </div>

          <div className="glass-card-gold p-5 rounded-2xl text-center space-y-1 transform hover:-translate-y-1 transition-transform">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold block">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs text-amber-200/80 font-medium uppercase tracking-wider block">
              Detik
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
