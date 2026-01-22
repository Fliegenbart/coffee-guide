import React, { useState, useMemo } from 'react';
import { ingredients } from '../data/ingredients';

const ITEMS_PER_PAGE = 8;

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
      {/* Coffee Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-3 w-full max-w-lg">
          {paginatedCoffees.map((coffee) => (
            <button
              key={coffee.id}
              onClick={() => onSelect(coffee)}
              className={`group flex flex-col items-center p-3 rounded-xl transition-all ${
                selected?.id === coffee.id
                  ? 'bg-white scale-105 shadow-lg border-2 border-gold'
                  : 'bg-white/60 hover:bg-white hover:shadow-md border-2 border-transparent hover:border-amber-200'
              }`}
            >
              {/* Mini Cup */}
              <div className="relative w-10 h-12 flex flex-col justify-end">
                <div className="w-8 mx-auto rounded-b-lg overflow-hidden bg-white shadow border border-amber-200 h-9">
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
                <div className="absolute -right-0.5 top-1/2 -translate-y-1/3 w-1 h-3 border border-amber-300 rounded-r-full bg-transparent" />
                {/* Badge */}
                {coffee.note && (
                  <span className="absolute -top-1 -right-2 text-[7px] bg-gold text-white px-1 rounded font-medium">
                    {coffee.note}
                  </span>
                )}
              </div>

              {/* Name */}
              <span
                className={`mt-2 text-[10px] text-center leading-tight transition-colors line-clamp-2 ${
                  selected?.id === coffee.id
                    ? 'text-gold font-semibold'
                    : 'text-stone-600 group-hover:text-stone-800'
                }`}
              >
                {coffee.name[lang]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            className="w-10 h-10 rounded-full bg-white/80 border border-amber-200 text-stone-600 hover:bg-white hover:border-gold hover:text-gold transition-all flex items-center justify-center shadow-sm"
          >
            ←
          </button>

          {/* Page Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`transition-all ${
                  currentPage === i
                    ? 'w-8 h-3 bg-gold rounded-full'
                    : 'w-3 h-3 bg-amber-200 rounded-full hover:bg-amber-300'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            className="w-10 h-10 rounded-full bg-white/80 border border-amber-200 text-stone-600 hover:bg-white hover:border-gold hover:text-gold transition-all flex items-center justify-center shadow-sm"
          >
            →
          </button>
        </div>
      )}

      {/* Page Indicator */}
      <div className="text-center mt-2 text-xs text-stone-400">
        {currentPage + 1} / {totalPages}
      </div>
    </div>
  );
}
