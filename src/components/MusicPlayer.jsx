import React, { useState, useEffect, useRef } from 'react';
import { Music, Disc, Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const MusicPlayer = ({ isCoverOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);

  // Auto play audio when invitation cover is opened
  useEffect(() => {
    if (isCoverOpen && !hasStarted) {
      playAudio();
    }
  }, [isCoverOpen]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.warn("Autoplay audio blocked or source missing:", err);
          setIsPlaying(false);
        });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };

  return (
    <>
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={weddingConfig.audio.src}
        loop
        preload="auto"
      />

      {/* Floating Control Button */}
      {isCoverOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={toggleMusic}
            aria-label="Toggle Background Music"
            className={`group relative flex items-center justify-center w-12 h-12 rounded-full glass-card border border-amber-400/40 text-amber-300 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
              isPlaying ? 'gold-glow' : 'opacity-80'
            }`}
          >
            {isPlaying ? (
              <>
                <Disc className="w-6 h-6 animate-spin-slow text-amber-400" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              </>
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>
      )}
    </>
  );
};
