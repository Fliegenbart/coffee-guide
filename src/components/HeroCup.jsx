import React from 'react';
import { ingredients, ingredientLabels } from '../data/ingredients';

export default function HeroCup({ coffee, lang, t }) {
  if (!coffee) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-400">
        <div className="w-32 h-40 border-4 border-dashed border-stone-300 rounded-b-3xl flex items-center justify-center">
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
    <div className="flex flex-col items-center animate-fadeIn">
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
              <span className="text-xs text-stone-500 font-mono">{layer.ratio}%</span>
              <div
                className="w-3 h-3 rounded-full border border-stone-300"
                style={{ backgroundColor: ingredients[layer.type]?.color }}
              />
            </div>
          ))}
        </div>

        {/* The Cup */}
        <div className="relative">
          <div className="w-32 h-48 rounded-b-3xl overflow-hidden bg-white shadow-xl border-2 border-stone-200">
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
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-12 border-4 border-stone-300 rounded-r-full bg-transparent" />
        </div>

        {/* Ingredient labels - right side */}
        <div className="flex flex-col-reverse justify-end h-48 w-28">
          {coffee.layers.map((layer, i) => (
            <div
              key={i}
              className="flex items-center gap-2 transition-all duration-500"
              style={{ height: `${layer.ratio}%`, minHeight: '20px' }}
            >
              <span className="text-xs text-stone-600 truncate">
                {ingredientLabels[lang][layer.type]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Coffee name and badge */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold text-stone-800 flex items-center justify-center gap-2">
          {coffee.name[lang]}
          {coffee.note && (
            <span className="text-sm bg-stone-700 text-white px-2 py-0.5 rounded-full">
              {coffee.note}
            </span>
          )}
        </h2>
        <p className="text-stone-500 mt-2 max-w-xs">{coffee.description[lang]}</p>
      </div>

      {/* Caffeine meter */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-stone-500 uppercase tracking-wide">{t.caffeine}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <span
              key={level}
              className={`text-lg transition-all ${
                level <= caffeineLevel ? 'text-yellow-500' : 'text-stone-300'
              }`}
            >
              ⚡
            </span>
          ))}
        </div>
        <span className="text-xs text-stone-400">
          {t.caffeineLevel[caffeineLevel]}
        </span>
      </div>
    </div>
  );
}
