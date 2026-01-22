import React, { useState, useEffect } from 'react';
import { coffees, categories } from './data/coffees';
import { translations } from './i18n/translations';
import HeroCup from './components/HeroCup';
import CoffeeGrid from './components/CoffeeGrid';
import CoffeeMixer from './components/CoffeeMixer';
import Cart from './components/shop/Cart';
import AiBarista from './components/AiBarista';
import { CartProvider, useCart } from './context/CartContext';

function CoffeeGuideInner() {
  const [selected, setSelected] = useState(() => coffees[0]);
  const [filter, setFilter] = useState('all');
  const [lang, setLang] = useState('de');
  const [mixerOpen, setMixerOpen] = useState(false);
  const [baristaOpen, setBaristaOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = translations[lang];
  const cats = categories[lang];
  const { totalItems, setIsOpen: setCartOpen } = useCart();

  // Check for shared mix in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mix = params.get('mix');
    if (mix) {
      try {
        const data = JSON.parse(atob(mix));
        console.log('Shared mix:', data);
      } catch (e) {
        console.error('Invalid mix data');
      }
    }
  }, []);

  const filterCoffee = (coffee) => {
    if (filter === 'all') return true;
    return coffee.category === filter;
  };

  const filtered = coffees.filter(filterCoffee);

  const handleSurpriseMe = () => {
    setIsSpinning(true);
    let count = 0;
    const maxSpins = 15;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * coffees.length);
      setSelected(coffees[randomIndex]);
      count++;
      if (count >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalIndex = Math.floor(Math.random() * coffees.length);
        setSelected(coffees[finalIndex]);
        setFilter('all');
      }
    }, 100);
  };

  const handleShare = () => {
    if (!selected) return;
    const url = `${window.location.origin}?coffee=${selected.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <header className="glass-card border-b border-dark-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-gold-glow">
                <span className="text-lg">☕</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-semibold text-white tracking-wide">
                  {t.title}
                </h1>
                <p className="text-gray-500 text-xs">{coffees.length} {t.subtitle}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* AI Barista Button */}
              <button
                onClick={() => setBaristaOpen(true)}
                className="px-4 py-2 rounded-full text-sm font-medium btn-gold flex items-center gap-2"
              >
                <span>🤖</span>
                <span className="hidden sm:inline">KI-Barista</span>
              </button>

              {/* Surprise Me Button */}
              <button
                onClick={handleSurpriseMe}
                disabled={isSpinning}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isSpinning
                    ? 'bg-gold text-dark-primary animate-pulse'
                    : 'bg-dark-card border border-dark-border text-white hover:border-gold'
                }`}
              >
                {isSpinning ? '🎰' : '🎲'}
                <span className="hidden sm:inline">{t.surpriseMe}</span>
              </button>

              {/* Mixer Button */}
              <button
                onClick={() => setMixerOpen(true)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-dark-card border border-dark-border text-white hover:border-gold transition-all flex items-center gap-2"
              >
                🧪
                <span className="hidden sm:inline">{t.mixer}</span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="w-10 h-10 rounded-full bg-dark-card border border-dark-border text-gray-400 hover:border-gold hover:text-white transition-all flex items-center justify-center text-sm font-medium"
              >
                {t.language}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-10 h-10 rounded-full bg-dark-card border border-dark-border text-white hover:border-gold transition-all flex items-center justify-center"
              >
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-dark-primary text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="glass-card rounded-2xl p-6 gold-border">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Hero Cup */}
            <div className="flex-1 flex justify-center">
              <HeroCup coffee={selected} lang={lang} t={t} />
            </div>

            {/* Share Button */}
            {selected && (
              <div className="flex lg:flex-col justify-center items-center gap-4">
                <button
                  onClick={handleShare}
                  className="px-6 py-2 rounded-full text-sm font-medium bg-dark-card border border-dark-border text-white hover:border-gold transition-all flex items-center gap-2"
                >
                  {copied ? '✓' : '🔗'}
                  {copied ? t.shareCopied : t.share}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 pb-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(cats).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === key
                  ? 'btn-gold'
                  : 'bg-dark-card border border-dark-border text-gray-400 hover:border-gold hover:text-white'
              }`}
            >
              {key === 'crazy' && '🤪 '}
              {key === 'decaf' && '😴 '}
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Coffee Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="glass-card rounded-2xl p-4">
          <CoffeeGrid
            coffees={filtered}
            selected={selected}
            onSelect={setSelected}
            lang={lang}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-dark-border">
        <p className="text-gray-600 text-sm">{t.footer}</p>
        <p className="text-gold text-xs mt-2">Powered by AI ✨</p>
      </footer>

      {/* Modals */}
      <CoffeeMixer
        isOpen={mixerOpen}
        onClose={() => setMixerOpen(false)}
        lang={lang}
        t={t}
      />

      <Cart lang={lang} />

      <AiBarista
        isOpen={baristaOpen}
        onClose={() => setBaristaOpen(false)}
        onSelectCoffee={setSelected}
        lang={lang}
      />
    </div>
  );
}

export default function CoffeeGuide() {
  return (
    <CartProvider>
      <CoffeeGuideInner />
    </CartProvider>
  );
}
