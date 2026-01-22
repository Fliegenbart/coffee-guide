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
              ? 'bg-stone-200 scale-105 shadow-md'
              : 'hover:bg-stone-100 hover:scale-102'
          }`}
        >
          {/* Mini Cup */}
          <div className="relative w-12 h-14 flex flex-col justify-end">
            <div className="w-10 mx-auto rounded-b-lg overflow-hidden bg-white shadow border border-stone-200 h-11">
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
            <div className="absolute -right-0.5 top-1/2 -translate-y-1/3 w-1.5 h-4 border border-stone-300 rounded-r-full bg-transparent" />
            {/* Badge */}
            {coffee.note && (
              <span className="absolute -top-1 -right-1 text-[8px] bg-stone-700 text-white px-1 rounded">
                {coffee.note}
              </span>
            )}
          </div>

          {/* Name */}
          <span
            className={`mt-2 text-[11px] text-center leading-tight transition-colors ${
              selected?.id === coffee.id
                ? 'text-stone-900 font-medium'
                : 'text-stone-600'
            }`}
          >
            {coffee.name[lang]}
          </span>
        </button>
      ))}
    </div>
  );
}
