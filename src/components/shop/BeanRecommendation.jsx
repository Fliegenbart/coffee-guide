import React, { useState } from 'react';
import { beans, coffeeBeansMapping, roastLabels } from '../../data/beans';
import { sirups, accessories, coffeeSirupsMapping, coffeeAccessoriesMapping } from '../../data/accessories';
import { useCart } from '../../context/CartContext';

export default function BeanRecommendation({ coffeeId, lang, t }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('250g');
  const [addedItems, setAddedItems] = useState({});

  // Get recommended beans for this coffee
  const recommendedBeanIds = coffeeBeansMapping[coffeeId] || ['house-blend'];
  const recommendedBeans = recommendedBeanIds
    .map(id => beans.find(b => b.id === id))
    .filter(Boolean)
    .slice(0, 2);

  // Get recommended sirups
  const recommendedSirupIds = coffeeSirupsMapping[coffeeId] || [];
  const recommendedSirups = recommendedSirupIds
    .map(id => sirups.find(s => s.id === id))
    .filter(Boolean)
    .slice(0, 2);

  // Get recommended accessories
  const recommendedAccessoryIds = coffeeAccessoriesMapping[coffeeId] || [];
  const recommendedAccessories = recommendedAccessoryIds
    .map(id => accessories.find(a => a.id === id))
    .filter(Boolean)
    .slice(0, 2);

  const handleAddToCart = (item, type, variant = null) => {
    addItem(item, variant);
    const key = variant ? `${item.id}-${variant}` : item.id;
    setAddedItems(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  if (recommendedBeans.length === 0) return null;

  const labels = {
    de: {
      perfectWith: 'Perfekt mit',
      alsoGreat: 'Dazu passt',
      addToCart: 'In den Warenkorb',
      added: 'Hinzugefügt!',
      from: 'ab'
    },
    en: {
      perfectWith: 'Perfect with',
      alsoGreat: 'Also great',
      addToCart: 'Add to cart',
      added: 'Added!',
      from: 'from'
    }
  };

  const l = labels[lang];

  return (
    <div className="mt-6 space-y-4">
      {/* Recommended Beans */}
      <div>
        <h3 className="text-sm font-medium text-stone-500 mb-2">{l.perfectWith}:</h3>
        <div className="space-y-2">
          {recommendedBeans.map(bean => (
            <div
              key={bean.id}
              className="bg-stone-50 rounded-xl p-3 border border-stone-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg flex items-center justify-center text-white text-lg">
                  🫘
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-stone-800 text-sm">
                    {bean.name[lang]}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {roastLabels[lang][bean.roast]} · {bean.flavor[lang].slice(0, 2).join(', ')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="text-xs bg-white border border-stone-300 rounded px-2 py-1"
                    >
                      {Object.keys(bean.prices).map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <span className="text-sm font-medium text-stone-700">
                      €{bean.prices[selectedSize].toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(bean, 'bean', selectedSize)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    addedItems[`${bean.id}-${selectedSize}`]
                      ? 'bg-green-500 text-white'
                      : 'bg-stone-800 text-white hover:bg-stone-700'
                  }`}
                >
                  {addedItems[`${bean.id}-${selectedSize}`] ? '✓' : '+'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Sirups & Accessories */}
      {(recommendedSirups.length > 0 || recommendedAccessories.length > 0) && (
        <div>
          <h3 className="text-sm font-medium text-stone-500 mb-2">{l.alsoGreat}:</h3>
          <div className="flex flex-wrap gap-2">
            {recommendedSirups.map(sirup => (
              <button
                key={sirup.id}
                onClick={() => handleAddToCart(sirup, 'sirup')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-all ${
                  addedItems[sirup.id]
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                <span>🍯</span>
                <span>{sirup.name[lang]}</span>
                <span className="text-stone-400">+€{sirup.price.toFixed(2)}</span>
                {addedItems[sirup.id] && <span>✓</span>}
              </button>
            ))}
            {recommendedAccessories.map(acc => (
              <button
                key={acc.id}
                onClick={() => handleAddToCart(acc, 'accessory')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-all ${
                  addedItems[acc.id]
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                <span>☕</span>
                <span>{acc.name[lang]}</span>
                <span className="text-stone-400">+€{acc.price.toFixed(2)}</span>
                {addedItems[acc.id] && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
