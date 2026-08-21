import React, { useState, useEffect } from 'react';
import { CoverHero } from './components/CoverHero';
import { MusicPlayer } from './components/MusicPlayer';
import { CoupleSection } from './components/CoupleSection';
import { EventCountdown } from './components/EventCountdown';
import { VenueCalendar } from './components/VenueCalendar';
import { RsvpWishes } from './components/RsvpWishes';
import { GiftSection } from './components/GiftSection';
import { GallerySection } from './components/GallerySection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [guestName, setGuestName] = useState('');

  // Extract ?to=Guest+Name query parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }
  }, []);

  // Lock background body scroll when invitation cover is active
  useEffect(() => {
    if (!isCoverOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCoverOpen]);

  const handleOpenInvitation = () => {
    setIsCoverOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative">
      
      {/* Decorative Floating Petals Background Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <div className="petal-particle w-3 h-3 left-[10%] animation-delay-0"></div>
        <div className="petal-particle w-4 h-4 left-[25%] animation-delay-2000"></div>
        <div className="petal-particle w-2 h-2 left-[50%] animation-delay-4000"></div>
        <div className="petal-particle w-4 h-4 left-[75%] animation-delay-6000"></div>
        <div className="petal-particle w-3 h-3 left-[90%] animation-delay-8000"></div>
      </div>

      {/* Opening Cover Screen Modal */}
      <CoverHero
        guestName={guestName}
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Floating Audio Control Player */}
      <MusicPlayer isCoverOpen={isCoverOpen} />

      {/* Main Invitation Web Page Sections */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isCoverOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Bride & Groom Couple Profiles */}
        <CoupleSection />

        {/* Live Countdown Timer */}
        <EventCountdown />

        {/* Venue Schedule, Google Maps & Save to Google Calendar */}
        <VenueCalendar />

        {/* RSVP Form & Live Guest Wishes Feed */}
        <RsvpWishes defaultGuestName={guestName} />

        {/* Digital Gift Box ("Wanna give us some gifts?") with Bank & Barcode QR */}
        <GiftSection />

        {/* Pre-wedding Photo Gallery */}
        <GallerySection />

        {/* Footer & Closing Thank-You Note */}
        <FooterSection />
      </main>

    </div>
  );
}
