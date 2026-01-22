import React, { useState } from 'react';
import { ingredients, ingredientLabels } from '../data/ingredients';

const mixableIngredients = [
  'espresso', 'decaf', 'coldbrew', 'steamed', 'oat', 'coconut', 'almond',
  'foam', 'cream', 'chocolate', 'whitechoc', 'caramel', 'vanilla', 'honey',
  'cinnamon', 'matcha', 'chai', 'lavender', 'mint', 'chili', 'ice'
];

export default function CoffeeMixer({ isOpen, onClose, lang, t }) {
  const [layers, setLayers] = useState([]);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  const addIngredient = (type) => {
    if (layers.length >= 5) return;
    const remaining = 100 - layers.reduce((sum, l) => sum + l.ratio, 0);
    if (remaining <= 0) return;

    const defaultRatio = Math.min(25, remaining);
    setLayers([...layers, { type, ratio: defaultRatio }]);
  };

  const updateRatio = (index, newRatio) => {
    const updated = [...layers];
    updated[index].ratio = Math.max(5, Math.min(100, newRatio));
    setLayers(updated);
  };

  const removeLayer = (index) => {
    setLayers(layers.filter((_, i) => i !== index));
  };

  const reset = () => {
    setLayers([]);
    setName('');
  };

  const share = () => {
    const data = {
      name: name || 'Meine Kreation',
      layers,
    };
    const encoded = btoa(JSON.stringify(data));
    const url = `${window.location.origin}?mix=${encoded}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalUsed = layers.reduce((sum, l) => sum + l.ratio, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <h2 className="text-xl font-semibold text-stone-800">{t.mixerTitle}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          {/* Name input */}
          <div className="mb-4">
            <label className="text-sm text-stone-600 block mb-1">{t.mixerName}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.mixerNamePlaceholder}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          {/* Preview cup */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-32 rounded-b-2xl overflow-hidden bg-white shadow-lg border-2 border-stone-200">
                <div className="h-full flex flex-col-reverse">
                  {layers.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-stone-300 text-xs text-center px-2">
                      {t.mixerEmpty}
                    </div>
                  ) : (
                    layers.map((layer, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: ingredients[layer.type]?.color || '#ccc',
                          height: `${layer.ratio}%`,
                        }}
                        className="w-full transition-all duration-300"
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-8 border-2 border-stone-300 rounded-r-full bg-transparent" />
            </div>
          </div>

          {/* Current layers */}
          {layers.length > 0 && (
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm text-stone-500">
                <span>{t.mixerIngredients}</span>
                <span>{totalUsed}% / 100%</span>
              </div>
              {layers.map((layer, i) => (
                <div key={i} className="flex items-center gap-2 bg-stone-50 rounded-lg p-2">
                  <div
                    className="w-4 h-4 rounded-full border border-stone-300"
                    style={{ backgroundColor: ingredients[layer.type]?.color }}
                  />
                  <span className="text-sm text-stone-700 flex-1">
                    {ingredientLabels[lang][layer.type]}
                  </span>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={layer.ratio}
                    onChange={(e) => updateRatio(i, parseInt(e.target.value))}
                    className="w-20 accent-stone-600"
                  />
                  <span className="text-xs text-stone-500 w-8">{layer.ratio}%</span>
                  <button
                    onClick={() => removeLayer(i)}
                    className="text-stone-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add ingredients */}
          {layers.length < 5 && (
            <div className="mb-4">
              <p className="text-sm text-stone-500 mb-2">
                {t.mixerAdd} ({t.mixerMax})
              </p>
              <div className="flex flex-wrap gap-2">
                {mixableIngredients.map((type) => (
                  <button
                    key={type}
                    onClick={() => addIngredient(type)}
                    disabled={layers.some((l) => l.type === type)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border transition-all ${
                      layers.some((l) => l.type === type)
                        ? 'bg-stone-100 text-stone-400 border-stone-200'
                        : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-stone-300"
                      style={{ backgroundColor: ingredients[type]?.color }}
                    />
                    {ingredientLabels[lang][type]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="flex-1 px-4 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors"
            >
              {t.mixerReset}
            </button>
            <button
              onClick={share}
              disabled={layers.length === 0}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                layers.length === 0
                  ? 'bg-stone-200 text-stone-400'
                  : 'bg-stone-800 text-white hover:bg-stone-700'
              }`}
            >
              {copied ? t.shareCopied : t.mixerShare}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
