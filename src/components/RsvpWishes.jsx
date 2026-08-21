import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, UserCheck, UserX, MessageSquare, Sparkles, Loader2 } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const RsvpWishes = ({ defaultGuestName }) => {
  const [formData, setFormData] = useState({
    name: defaultGuestName || '',
    attendance: 'Hadir',
    guests: '1',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [wishesList, setWishesList] = useState([
    {
      name: "Ade Fitriyani",
      attendance: "Hadir",
      guests: "2",
      message: "Wishing you both a lifetime of happiness!",
      timestamp: "Baru saja"
    },
    {
      name: "Budi & Keluarga",
      attendance: "Hadir",
      guests: "3",
      message: "Selamat ya Fiqri & Nadya, semoga menjadi keluarga sakinah mawaddah warahmah! Aamiin.",
      timestamp: "1 jam yang lalu"
    },
    {
      name: "Rian Saputra",
      attendance: "Tidak Hadir",
      guests: "0",
      message: "Selamat untuk Nadya dan Fiqri! Maaf belum bisa hadir, titip doa terbaik untuk kalian berdua.",
      timestamp: "3 jam yang lalu"
    }
  ]);

  useEffect(() => {
    if (defaultGuestName) {
      setFormData((prev) => ({ ...prev, name: defaultGuestName }));
    }
  }, [defaultGuestName]);

  // Fetch real-time wishes from Google Apps Script Web App (if configured)
  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    if (!weddingConfig.google.webAppUrl || weddingConfig.google.webAppUrl.includes("PLACEHOLDER")) {
      return;
    }

    try {
      const res = await fetch(weddingConfig.google.webAppUrl);
      const data = await res.json();
      if (data && data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
        setWishesList(data.data);
      }
    } catch (err) {
      console.warn("Google Apps Script fetch wishes fallback:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Mohon isi Nama Lengkap dan Ucapan & Doa Anda.");
      return;
    }

    setIsSubmitting(true);

    const newWish = {
      name: formData.name.trim(),
      attendance: formData.attendance,
      guests: formData.attendance === 'Hadir' ? formData.guests : '0',
      message: formData.message.trim(),
      timestamp: "Baru saja"
    };

    // Optimistic UI update (Instant display on page)
    setWishesList((prev) => [newWish, ...prev]);

    // Send to Google Sheets via Apps Script Web App
    if (weddingConfig.google.webAppUrl && !weddingConfig.google.webAppUrl.includes("PLACEHOLDER")) {
      try {
        await fetch(weddingConfig.google.webAppUrl, {
          method: 'POST',
          mode: 'no-cors', // Google Apps Script Web App standard
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newWish)
        });
      } catch (err) {
        console.warn("RSVP fetch error:", err);
      }
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form message
    setFormData((prev) => ({ ...prev, message: '' }));

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <section className="py-20 px-4 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-3xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
            Konfirmasi Kehadiran & Doa Restu
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-100">
            RSVP & Ucapan Selamat
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        {/* RSVP Form Container */}
        <div className="glass-card-gold p-6 md:p-10 rounded-3xl space-y-6 shadow-2xl relative">
          
          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-100">Formulir RSVP</h3>
              <p className="text-xs text-slate-400">Mohon konfirmasi kehadiran Anda untuk membantu persiapan kami.</p>
            </div>
          </div>

          {submitSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3 animate-slide-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Terima kasih! RSVP & Ucapan Anda berhasil terkirim dan tersimpan di Google Sheets.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-amber-200/90 uppercase tracking-wider mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                placeholder="Masukkan nama Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Attendance & Guest Count Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-semibold text-amber-200/90 uppercase tracking-wider mb-2">
                  Konfirmasi Kehadiran *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'Hadir' })}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      formData.attendance === 'Hadir'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Hadir</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'Tidak Hadir' })}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      formData.attendance === 'Tidak Hadir'
                        ? 'bg-rose-500 text-slate-950 border-rose-400 font-bold shadow-lg'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <UserX className="w-4 h-4" />
                    <span>Tidak Hadir</span>
                  </button>
                </div>
              </div>

              {formData.attendance === 'Hadir' && (
                <div>
                  <label className="block text-xs font-semibold text-amber-200/90 uppercase tracking-wider mb-2">
                    Jumlah Tamu Attending
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                    <option value="5">5 Orang</option>
                  </select>
                </div>
              )}

            </div>

            {/* Wishes & Message */}
            <div>
              <label className="block text-xs font-semibold text-amber-200/90 uppercase tracking-wider mb-2">
                Pesan, Doa & Ucapan Selamat *
              </label>
              <textarea
                rows="4"
                required
                placeholder="Tuliskan ucapan & doa terbaik untuk Nadya & Fiqri..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold text-sm shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mengirim RSVP...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim RSVP & Ucapan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Wedding Wishes Display Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif text-xl font-bold text-slate-100">
                Ucapan Doa & Harapan ({wishesList.length})
              </h3>
            </div>
            <span className="text-xs text-amber-400 font-medium bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Live Real-Time
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {wishesList.map((wish, index) => (
              <div
                key={index}
                className="glass-card p-5 rounded-2xl border border-slate-700/60 space-y-2 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-200 text-sm font-serif">{wish.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        wish.attendance === 'Hadir'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {wish.attendance} {wish.attendance === 'Hadir' && wish.guests > 0 ? `(${wish.guests} Orang)` : ''}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">{wish.timestamp}</span>
                </div>

                <p className="text-xs md:text-sm text-slate-300 italic leading-relaxed font-light pl-2 border-l-2 border-amber-400/40">
                  "{wish.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
