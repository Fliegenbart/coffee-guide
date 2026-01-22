import React, { useState } from 'react';

const coffees = [
  { name: 'Espresso', layers: [{ type: 'espresso', ratio: 100 }] },
  { name: 'Doppio', layers: [{ type: 'espresso', ratio: 100 }], note: '2x' },
  { name: 'Ristretto', layers: [{ type: 'espresso', ratio: 100 }], note: 'kurz' },
  { name: 'Lungo', layers: [{ type: 'espresso', ratio: 40 }, { type: 'water', ratio: 60 }] },
  { name: 'Americano', layers: [{ type: 'espresso', ratio: 30 }, { type: 'water', ratio: 70 }] },
  { name: 'Long Black', layers: [{ type: 'water', ratio: 60 }, { type: 'espresso', ratio: 40 }] },
  { name: 'Macchiato', layers: [{ type: 'espresso', ratio: 80 }, { type: 'foam', ratio: 20 }] },
  { name: 'Cortado', layers: [{ type: 'espresso', ratio: 50 }, { type: 'steamed', ratio: 50 }] },
  { name: 'Piccolo', layers: [{ type: 'espresso', ratio: 40 }, { type: 'steamed', ratio: 50 }, { type: 'foam', ratio: 10 }] },
  { name: 'Flat White', layers: [{ type: 'espresso', ratio: 35 }, { type: 'steamed', ratio: 60 }, { type: 'microfoam', ratio: 5 }] },
  { name: 'Cappuccino', layers: [{ type: 'espresso', ratio: 33 }, { type: 'steamed', ratio: 33 }, { type: 'foam', ratio: 34 }] },
  { name: 'Latte', layers: [{ type: 'espresso', ratio: 20 }, { type: 'steamed', ratio: 70 }, { type: 'foam', ratio: 10 }] },
  { name: 'Latte Macchiato', layers: [{ type: 'steamed', ratio: 60 }, { type: 'espresso', ratio: 25 }, { type: 'foam', ratio: 15 }] },
  { name: 'Mocha', layers: [{ type: 'chocolate', ratio: 15 }, { type: 'espresso', ratio: 25 }, { type: 'steamed', ratio: 50 }, { type: 'cream', ratio: 10 }] },
  { name: 'Affogato', layers: [{ type: 'icecream', ratio: 60 }, { type: 'espresso', ratio: 40 }] },
  { name: 'Irish Coffee', layers: [{ type: 'whiskey', ratio: 15 }, { type: 'espresso', ratio: 35 }, { type: 'cream', ratio: 50 }] },
  { name: 'Vienna', layers: [{ type: 'espresso', ratio: 50 }, { type: 'cream', ratio: 50 }] },
  { name: 'Con Panna', layers: [{ type: 'espresso', ratio: 70 }, { type: 'cream', ratio: 30 }] },
  { name: 'Breve', layers: [{ type: 'espresso', ratio: 25 }, { type: 'halfhalf', ratio: 65 }, { type: 'foam', ratio: 10 }] },
  { name: 'Red Eye', layers: [{ type: 'drip', ratio: 70 }, { type: 'espresso', ratio: 30 }] },
  { name: 'Black Eye', layers: [{ type: 'drip', ratio: 60 }, { type: 'espresso', ratio: 40 }], note: '2x' },
  { name: 'Dirty Chai', layers: [{ type: 'chai', ratio: 70 }, { type: 'espresso', ratio: 30 }] },
  { name: 'Café Bombón', layers: [{ type: 'condensed', ratio: 50 }, { type: 'espresso', ratio: 50 }] },
  { name: 'Galão', layers: [{ type: 'espresso', ratio: 25 }, { type: 'steamed', ratio: 75 }] },
  { name: 'Frappé', layers: [{ type: 'ice', ratio: 40 }, { type: 'espresso', ratio: 30 }, { type: 'milk', ratio: 20 }, { type: 'foam', ratio: 10 }] },
];

const ingredients = {
  espresso: { color: '#3D2314', label: 'Espresso' },
  water: { color: '#87CEEB', label: 'Wasser' },
  steamed: { color: '#FFF8E7', label: 'Milch' },
  milk: { color: '#FFFEF0', label: 'Milch' },
  foam: { color: '#FFFFFF', label: 'Schaum' },
  microfoam: { color: '#FEFEFE', label: 'Mikroschaum' },
  cream: { color: '#FFFDD0', label: 'Sahne' },
  chocolate: { color: '#5C4033', label: 'Schokolade' },
  icecream: { color: '#FFF5E1', label: 'Eis' },
  whiskey: { color: '#D4A849', label: 'Whiskey' },
  halfhalf: { color: '#FFF5DC', label: 'Half & Half' },
  drip: { color: '#6F4E37', label: 'Filterkaffee' },
  chai: { color: '#C19A6B', label: 'Chai' },
  condensed: { color: '#FFF8DC', label: 'Kondensmilch' },
  ice: { color: '#E0F7FA', label: 'Eis' },
};

export default function CoffeeGuide() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = {
    all: 'Alle',
    pure: 'Pur',
    milk: 'Mit Milch',
    special: 'Spezial',
  };

  const filterCoffee = (coffee) => {
    if (filter === 'all') return true;
    if (filter === 'pure') return coffee.layers.every(l => ['espresso', 'water', 'drip'].includes(l.type));
    if (filter === 'milk') return coffee.layers.some(l => ['steamed', 'milk', 'foam', 'microfoam'].includes(l.type));
    if (filter === 'special') return coffee.layers.some(l => ['chocolate', 'whiskey', 'chai', 'icecream', 'condensed'].includes(l.type));
    return true;
  };

  const filtered = coffees.filter(filterCoffee);

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-light text-stone-800 tracking-wide">Kaffee Guide</h1>
        <p className="text-stone-500 mt-1">{coffees.length} Getränke</p>
        
        <div className="flex gap-2 mt-4 flex-wrap">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                filter === key 
                  ? 'bg-stone-800 text-white' 
                  : 'bg-white text-stone-600 hover:bg-stone-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {filtered.map((coffee, idx) => (
            <button
              key={coffee.name}
              onClick={() => setSelected(selected === idx ? null : idx)}
              className={`group flex flex-col items-center transition-all ${
                selected === idx ? 'scale-105' : 'hover:scale-102'
              }`}
            >
              {/* Cup */}
              <div className="relative w-16 h-20 flex flex-col justify-end">
                {/* Cup body */}
                <div 
                  className="w-14 mx-auto rounded-b-xl overflow-hidden bg-white shadow-md border border-stone-200"
                  style={{ height: '56px' }}
                >
                  <div className="h-full flex flex-col-reverse">
                    {coffee.layers.map((layer, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: ingredients[layer.type]?.color || '#ccc',
                          height: `${layer.ratio}%`,
                        }}
                        className="w-full transition-all"
                      />
                    ))}
                  </div>
                </div>
                {/* Handle */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-6 border-2 border-stone-300 rounded-r-full bg-transparent" />
                {/* Note badge */}
                {coffee.note && (
                  <span className="absolute -top-1 -right-1 text-[9px] bg-stone-700 text-white px-1 rounded">
                    {coffee.note}
                  </span>
                )}
              </div>
              
              {/* Name */}
              <span className={`mt-2 text-xs text-center leading-tight transition-colors ${
                selected === idx ? 'text-stone-900 font-medium' : 'text-stone-600'
              }`}>
                {coffee.name}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {selected !== null && filtered[selected] && (
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm max-w-md mx-auto">
            <h2 className="text-xl font-medium text-stone-800 mb-4">
              {filtered[selected].name}
            </h2>
            <div className="space-y-2">
              {filtered[selected].layers.map((layer, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full border border-stone-200"
                    style={{ backgroundColor: ingredients[layer.type]?.color }}
                  />
                  <span className="text-stone-600 text-sm">
                    {ingredients[layer.type]?.label}
                  </span>
                  <span className="text-stone-400 text-sm ml-auto">
                    {layer.ratio}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Legend */}
      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-stone-200">
        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries(ingredients).slice(0, 8).map(([key, { color, label }]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border border-stone-200"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-stone-500">{label}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
