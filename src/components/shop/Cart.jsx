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
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
      <div
        className="absolute inset-0"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-md bg-dark-secondary h-full shadow-2xl flex flex-col animate-slideIn border-l border-dark-border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-card">
          <h2 className="text-lg font-semibold text-white">{l.cart}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark-elevated text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <span className="text-4xl block mb-4">🛒</span>
              {l.empty}
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 bg-dark-card rounded-lg p-3 border border-dark-border"
                >
                  <div className="w-10 h-10 bg-dark-elevated rounded-lg flex items-center justify-center">
                    {item.type === 'bean' && '🫘'}
                    {item.type === 'sirup' && '🍯'}
                    {item.type === 'accessory' && '☕'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {typeof item.name === 'object' ? item.name[lang] : item.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-gray-500">{item.variant}</p>
                    )}
                    <p className="text-sm text-gold">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-dark-elevated hover:bg-dark-border text-gray-400 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-dark-elevated hover:bg-dark-border text-gray-400 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
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
          <div className="p-4 border-t border-dark-border bg-dark-card space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{l.total}</span>
              <span className="text-xl font-semibold text-gold">
                €{totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full py-3 btn-gold rounded-xl font-medium transition-all"
            >
              {l.checkout}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-gray-500 text-sm hover:text-gray-300 transition-colors"
            >
              {l.clear}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
