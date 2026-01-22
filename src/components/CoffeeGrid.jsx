import React from 'react';
import { ingredients } from '../data/ingredients';

export default function CoffeeGrid({ coffees, selected, onSelect, lang }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {coffees.map((coffee) => (
        <button
          key={coffee.id}
          onClick={() => onSelect(coffee)}
          className={`group flex flex-col items-center p-3 rounded-xl transition-all ${
            selected?.id === coffee.id
              ? 'bg-dark-elevated scale-105 shadow-gold-glow border border-gold/50'
              : 'hover:bg-dark-card hover:scale-102 border border-transparent'
          }`}
        >
          {/* Mini Cup */}
          <div className="relative w-12 h-14 flex flex-col justify-end">
            <div className="w-10 mx-auto rounded-b-lg overflow-hidden bg-dark-elevated shadow border border-dark-border h-11">
              <div className="h-full flex flex-col-reverse">
                {coffee.layers.map((layer, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: ingredients[layer.type]?.color || '#ccc',
                      height: `${layer.ratio}%`,
                    }}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
            {/* Mini Handle */}
            <div className="absolute -right-0.5 top-1/2 -translate-y-1/3 w-1.5 h-4 border border-dark-border rounded-r-full bg-transparent" />
            {/* Badge */}
            {coffee.note && (
              <span className="absolute -top-1 -right-1 text-[8px] bg-gold text-dark-primary px-1 rounded font-medium">
                {coffee.note}
              </span>
            )}
          </div>

          {/* Name */}
          <span
            className={`mt-2 text-[11px] text-center leading-tight transition-colors ${
              selected?.id === coffee.id
                ? 'text-gold font-medium'
                : 'text-gray-400 group-hover:text-white'
            }`}
          >
            {coffee.name[lang]}
          </span>
        </button>
      ))}
    </div>
  );
}
