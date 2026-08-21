import React from 'react';
import { Calendar, MapPin, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const VenueCalendar = () => {
  const { akad, resepsi, calendar } = weddingConfig.event;
  const { venueName, address, googleMapsUrl, mapsEmbedUrl } = weddingConfig.location;

  // Construct pre-filled Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    calendar.title
  )}&dates=${calendar.startUTC}/${calendar.endUTC}&details=${encodeURIComponent(
    calendar.details
  )}&location=${encodeURIComponent(calendar.location)}`;

  return (
    <section className="py-20 px-4 bg-slate-900/40 relative border-y border-slate-800/80">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
            Waktu & Lokasi Acara
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-100">
            Agenda Pernikahan
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        {/* Schedule Grid: Akad & Resepsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Akad Card */}
          <div className="glass-card p-8 rounded-3xl border border-amber-500/20 space-y-4 hover:border-amber-400/40 transition-all text-center">
            <div className="w-12 h-12 rounded-2xl glass-card text-amber-400 flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-200">{akad.title}</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center justify-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{akad.time}</span>
              </div>
              <p className="text-xs text-slate-400">{weddingConfig.event.dateDisplay}</p>
            </div>
            <div className="pt-2 border-t border-slate-700/50">
              <p className="font-semibold text-slate-200 text-sm">{akad.venue}</p>
              <p className="text-xs text-slate-400 mt-1">{akad.address}</p>
            </div>
          </div>

          {/* Resepsi Card */}
          <div className="glass-card p-8 rounded-3xl border border-amber-500/20 space-y-4 hover:border-amber-400/40 transition-all text-center">
            <div className="w-12 h-12 rounded-2xl glass-card text-amber-400 flex items-center justify-center mx-auto shadow-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-200">{resepsi.title}</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center justify-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{resepsi.time}</span>
              </div>
              <p className="text-xs text-slate-400">{weddingConfig.event.dateDisplay}</p>
            </div>
            <div className="pt-2 border-t border-slate-700/50">
              <p className="font-semibold text-slate-200 text-sm">{resepsi.venue}</p>
              <p className="text-xs text-slate-400 mt-1">{resepsi.address}</p>
            </div>
          </div>

        </div>

        {/* Save The Date Button (Google Calendar Integration) */}
        <div className="text-center pt-2">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-800 border border-amber-400/40 text-amber-300 font-semibold text-sm shadow-xl hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 group cursor-pointer"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Simpan ke Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Venue Location & Google Maps Card */}
        <div className="glass-card-gold p-8 rounded-3xl space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Lokasi Pernikahan</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-amber-100">{venueName}</h3>
              
              {/* Clickable Venue Address */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 hover:text-amber-300 underline underline-offset-4 transition-colors block max-w-xl"
              >
                {address}
              </a>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-slate-950 font-semibold text-sm shadow-lg hover:bg-amber-400 hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Buka Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-700/60 relative">
            <iframe
              title="Aroem Resto Bekasi Google Maps Location"
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};
