import React, { useState } from 'react';
import { ingredients, ingredientLabels } from '../data/ingredients';
import BeanRecommendation from './shop/BeanRecommendation';
import CoffeeGraphic from './CoffeeGraphic';

export default function HeroCup({ coffee, lang, t, isCustom = false, onShare }) {
  const [showLabels, setShowLabels] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!coffee) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-400">
        <div className="w-24 h-36 border border-dashed border-stone-300 rounded-b-[2.5rem] flex items-center justify-center opacity-50">
          <span className="text-3xl">☕</span>
        </div>
        <p className="mt-6 text-sm tracking-wide">{t.heroEmpty}</p>
      </div>
    );
  }

  const totalCaffeine = coffee.layers.reduce((sum, layer) => {
    return sum + (ingredients[layer.type]?.caffeine || 0) * (layer.ratio / 100);
  }, 0);
  const caffeineLevel = Math.min(5, Math.round(totalCaffeine));

  const handleShare = () => {
    if (onShare) {
      onShare();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center animate-fadeIn w-full max-w-sm">
      {/* Animated Graphic for special/custom coffees */}
      {(isCustom || coffee.graphic) && (
        <div className="mb-4 h-24">
          <CoffeeGraphic type={coffee.graphic || 'robot'} />
        </div>
      )}

      {/* Custom Coffee Badge */}
      {isCustom && (
        <div className="mb-3 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg tracking-wide">
          KI-Kreation
        </div>
      )}

      {/* Steam Animation */}
      <div className="relative h-6 w-20 mb-1">
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
      </div>

      {/* Apple-style Cup */}
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setShowLabels(true)}
        onMouseLeave={() => setShowLabels(false)}
      >
        {/* The Cup */}
        <div className="relative">
          {/* Cup container */}
          <div className={`
            cup-apple w-24 h-36 overflow-hidden relative
            ${isCustom ? 'ring-2 ring-amber-400/50' : ''}
          `}>
            {/* Glass highlight overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />

            {/* Layers */}
            <div className="h-full flex flex-col-reverse relative">
              {coffee.layers.map((layer, i) => {
                const color = ingredients[layer.type]?.color || '#ccc';
                return (
                  <div
                    key={i}
                    className="w-full layer-apple layer-fill"
                    style={{
                      '--layer-color': color,
                      backgroundColor: color,
                      height: `${layer.ratio}%`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Elegant Handle */}
          <div className={`
            handle-apple absolute -right-3 top-1/2 -translate-y-1/2
            ${isCustom ? 'border-amber-400/50' : ''}
          `} />
        </div>

        {/* Hover Labels - Left (percentages) */}
        <div className={`
          absolute -left-16 top-0 h-36 flex flex-col-reverse justify-end
          transition-all duration-300
          ${showLabels ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
        `}>
          {coffee.layers.map((layer, i) => (
            <div
              key={i}
              className="flex items-center justify-end gap-2 pr-2"
              style={{ height: `${layer.ratio}%`, minHeight: '16px' }}
            >
              <span className="text-[10px] text-stone-400 font-mono tabular-nums">
                {layer.ratio}%
              </span>
            </div>
          ))}
        </div>

        {/* Hover Labels - Right (ingredients) */}
        <div className={`
          absolute -right-20 top-0 h-36 flex flex-col-reverse justify-end
          transition-all duration-300
          ${showLabels ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
        `}>
          {coffee.layers.map((layer, i) => (
            <div
              key={i}
              className="flex items-center gap-2 pl-4"
              style={{ height: `${layer.ratio}%`, minHeight: '16px' }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: ingredients[layer.type]?.color }}
              />
              <span className="text-[10px] text-stone-500 whitespace-nowrap">
                {ingredientLabels[lang][layer.type]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Coffee name and description */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-display font-semibold text-stone-800 tracking-tight">
          {coffee.name[lang]}
        </h2>
        <p className="text-stone-500 mt-2 max-w-xs text-sm leading-relaxed">
          {coffee.description[lang]}
        </p>
      </div>

      {/* Caffeine meter - minimal */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-1.5 h-4 rounded-full transition-all ${
                level <= caffeineLevel
                  ? 'bg-amber-500'
                  : 'bg-stone-200'
              }`}
              style={{
                height: `${8 + level * 3}px`
              }}
            />
          ))}
        </div>
        <span className="text-xs text-stone-400">
          {t.caffeineLevel[caffeineLevel]}
        </span>
      </div>

      {/* Share button */}
      {onShare && (
        <button
          onClick={handleShare}
          className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-all"
        >
          {copied ? (
            <>
              <span className="text-green-600">✓</span>
              <span className="text-green-600">{t.shareCopied || 'Kopiert!'}</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{t.share || 'Teilen'}</span>
            </>
          )}
        </button>
      )}

      {/* Bean Recommendations - only for non-custom coffees */}
      {!isCustom && <BeanRecommendation coffeeId={coffee.id} lang={lang} t={t} />}

      {/* Custom coffee recommended bean */}
      {isCustom && coffee.recommendedBean && (
        <div className="mt-5 p-4 bg-stone-50 border border-stone-200 rounded-2xl w-full">
          <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Empfohlene Bohne</p>
          <p className="text-sm text-stone-700">{coffee.recommendedBean}</p>
        </div>
      )}
    </div>
  );
}
