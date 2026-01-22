import React from 'react';
import { useCart } from '../../context/CartContext';

export default function Cart({ lang }) {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  const labels = {
    de: {
      cart: 'Warenkorb',
      empty: 'Dein Warenkorb ist leer',
      total: 'Gesamt',
      checkout: 'Zur Kasse',
      clear: 'Leeren',
      remove: 'Entfernen'
    },
    en: {
      cart: 'Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Checkout',
      clear: 'Clear',
      remove: 'Remove'
    }
  };

  const l = labels[lang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div
        className="absolute inset-0"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <h2 className="text-lg font-semibold text-stone-800">{l.cart}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="text-center text-stone-400 py-12">
              <span className="text-4xl block mb-4">🛒</span>
              {l.empty}
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 bg-stone-50 rounded-lg p-3"
                >
                  <div className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center">
                    {item.type === 'bean' && '🫘'}
                    {item.type === 'sirup' && '🍯'}
                    {item.type === 'accessory' && '☕'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-800 truncate">
                      {typeof item.name === 'object' ? item.name[lang] : item.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-stone-500">{item.variant}</p>
                    )}
                    <p className="text-sm text-stone-600">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 text-stone-600"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 text-stone-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-stone-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-stone-600">{l.total}</span>
              <span className="text-xl font-semibold text-stone-800">
                €{totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full py-3 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-700 transition-colors"
            >
              {l.checkout}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-stone-500 text-sm hover:text-stone-700"
            >
              {l.clear}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
