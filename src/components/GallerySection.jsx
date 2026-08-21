import React, { useState } from 'react';
import { Camera, X, ZoomIn } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const GallerySection = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="py-20 px-4 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full glass-card text-amber-400 mx-auto">
            <Camera className="w-5 h-5" />
          </div>
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
            Galeri Pre-Wedding
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-100">
            Momen Kebahagiaan
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weddingConfig.gallery.map((photo, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(photo)}
              className="group relative h-64 rounded-2xl overflow-hidden glass-card cursor-pointer border border-slate-700/60 hover:border-amber-400/60 transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="flex items-center justify-between w-full text-left">
                  <span className="text-xs font-serif text-amber-200 font-semibold">{photo.caption}</span>
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-3xl w-full space-y-3 text-center">
            <img
              src={activeImage.url}
              alt={activeImage.caption}
              className="max-h-[80vh] w-auto mx-auto rounded-2xl shadow-2xl border border-amber-500/20 object-contain"
            />
            <p className="font-serif text-amber-200 text-sm md:text-base">{activeImage.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
};
