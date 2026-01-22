import React from 'react';
import { ingredients, ingredientLabels } from '../data/ingredients';
import BeanRecommendation from './shop/BeanRecommendation';

export default function HeroCup({ coffee, lang, t }) {
  if (!coffee) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <div className="w-32 h-40 border-2 border-dashed border-dark-border rounded-b-3xl flex items-center justify-center">
          <span className="text-4xl">☕</span>
        </div>
        <p className="mt-4 text-lg">{t.heroEmpty}</p>
      </div>
    );
  }

  const totalCaffeine = coffee.layers.reduce((sum, layer) => {
    return sum + (ingredients[layer.type]?.caffeine || 0) * (layer.ratio / 100);
  }, 0);
  const caffeineLevel = Math.min(5, Math.round(totalCaffeine));

  return (
    <div className="flex flex-col items-center animate-fadeIn w-full max-w-md">
      {/* Steam Animation */}
      <div className="relative h-8 w-24 mb-2">
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
      </div>

      {/* Large Cup with percentage labels */}
      <div className="relative flex items-center gap-4">
        {/* Percentage labels - left side */}
        <div className="flex flex-col-reverse justify-end h-48 w-20 text-right">
          {coffee.layers.map((layer, i) => (
            <div
              key={i}
              className="flex items-center justify-end gap-2 transition-all duration-500"
              style={{ height: `${layer.ratio}%`, minHeight: '20px' }}
            >
              <span className="text-xs text-gray-500 font-mono">{layer.ratio}%</span>
              <div
                className="w-3 h-3 rounded-full border border-dark-border shadow-sm"
                style={{ backgroundColor: ingredients[layer.type]?.color }}
              />
            </div>
          ))}
        </div>

        {/* The Cup */}
        <div className="relative">
          <div className="w-32 h-48 rounded-b-3xl overflow-hidden bg-dark-elevated shadow-card cup-glow border border-dark-border">
            <div className="h-full flex flex-col-reverse">
              {coffee.layers.map((layer, i) => (
                <div
                  key={i}
                  className="w-full layer-fill"
                  style={{
                    backgroundColor: ingredients[layer.type]?.color || '#ccc',
                    height: `${layer.ratio}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Handle */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-12 border-4 border-dark-border rounded-r-full bg-transparent" />
        </div>

        {/* Ingredient labels - right side */}
        <div className="flex flex-col-reverse justify-end h-48 w-28">
          {coffee.layers.map((layer, i) => (
            <div
              key={i}
              className="flex items-center gap-2 transition-all duration-500"
              style={{ height: `${layer.ratio}%`, minHeight: '20px' }}
            >
              <span className="text-xs text-gray-400 truncate">
                {ingredientLabels[lang][layer.type]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Coffee name and badge */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-display font-semibold text-white flex items-center justify-center gap-2">
          {coffee.name[lang]}
          {coffee.note && (
            <span className="text-sm bg-gold text-dark-primary px-2 py-0.5 rounded-full font-sans">
              {coffee.note}
            </span>
          )}
        </h2>
        <p className="text-gray-400 mt-2 max-w-xs text-sm">{coffee.description[lang]}</p>
      </div>

      {/* Caffeine meter */}
      <div className="mt-4 flex items-center gap-2 bg-dark-card px-4 py-2 rounded-full">
        <span className="text-xs text-gray-500 uppercase tracking-wide">{t.caffeine}</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <span
              key={level}
              className={`text-base transition-all ${
                level <= caffeineLevel ? 'text-gold drop-shadow-[0_0_4px_rgba(201,162,39,0.5)]' : 'text-dark-border'
              }`}
            >
              ⚡
            </span>
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {t.caffeineLevel[caffeineLevel]}
        </span>
      </div>

      {/* Bean Recommendations */}
      <BeanRecommendation coffeeId={coffee.id} lang={lang} t={t} />
    </div>
  );
}
