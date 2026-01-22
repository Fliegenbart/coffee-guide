import React, { useState, useMemo } from 'react';
import { ingredients } from '../data/ingredients';

const ITEMS_PER_PAGE = 16;

export default function CoffeeCarousel({ coffees, selected, onSelect, lang }) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(coffees.length / ITEMS_PER_PAGE);

  const paginatedCoffees = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return coffees.slice(start, start + ITEMS_PER_PAGE);
  }, [coffees, currentPage]);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(0);
  }, [coffees.length]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Coffee Grid - 4x4 */}
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="grid grid-cols-4 gap-2 w-full">
          {paginatedCoffees.map((coffee) => (
            <button
              key={coffee.id}
              onClick={() => onSelect(coffee)}
              className={`group flex flex-col items-center p-2 rounded-xl transition-all ${
                selected?.id === coffee.id
                  ? 'bg-white scale-105 shadow-lg ring-2 ring-amber-500'
                  : 'bg-white/70 hover:bg-white hover:shadow-md'
              }`}
            >
              {/* Mini Cup */}
              <div className="relative w-8 h-10 flex flex-col justify-end">
                <div className="w-7 mx-auto rounded-b-md overflow-hidden bg-white shadow border border-stone-200 h-8">
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
                <div className="absolute -right-0.5 top-1/2 -translate-y-1/3 w-1 h-2.5 border border-stone-300 rounded-r-full bg-transparent" />
                {/* Badge */}
                {coffee.note && (
                  <span className="absolute -top-1 -right-1.5 text-[6px] bg-amber-500 text-white px-0.5 rounded font-bold">
                    {coffee.note}
                  </span>
                )}
              </div>

              {/* Name */}
              <span
                className={`mt-1.5 text-[9px] text-center leading-tight transition-colors line-clamp-2 w-full ${
                  selected?.id === coffee.id
                    ? 'text-amber-700 font-semibold'
                    : 'text-stone-600 group-hover:text-stone-800'
                }`}
              >
                {coffee.name[lang]}
              </span>
            </button>
          ))}

          {/* Fill empty slots for consistent grid */}
          {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - paginatedCoffees.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-2 pb-2">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            className="w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-600 hover:bg-stone-50 hover:border-amber-500 transition-all flex items-center justify-center shadow-sm text-sm"
          >
            ←
          </button>

          {/* Page Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`transition-all rounded-full ${
                  currentPage === i
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            className="w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-600 hover:bg-stone-50 hover:border-amber-500 transition-all flex items-center justify-center shadow-sm text-sm"
          >
            →
          </button>

          {/* Page Counter */}
          <span className="text-xs text-stone-400 ml-2">
            {currentPage + 1}/{totalPages}
          </span>
        </div>
      )}
    </div>
  );
}
