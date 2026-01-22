import React, { useState, useEffect } from 'react';
import { coffees, categories } from './data/coffees';
import { translations } from './i18n/translations';
import HeroCup from './components/HeroCup';
import CoffeeCarousel from './components/CoffeeCarousel';
import CoffeeMixer from './components/CoffeeMixer';
import Cart from './components/shop/Cart';
import AiBarista from './components/AiBarista';
import FloatingBeans from './components/FloatingBeans';
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
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      {/* Animated Background Beans */}
      <FloatingBeans />

      {/* Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/10 pointer-events-none" />

      {/* Header - Fixed */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg">
                <span className="text-lg">☕</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-semibold text-stone-800 tracking-wide">
                  {t.title}
                </h1>
                <p className="text-amber-600 text-xs">{coffees.length} {t.subtitle}</p>
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
                    ? 'bg-gold text-white animate-pulse'
                    : 'bg-white border border-amber-300 text-stone-700 hover:border-gold hover:bg-amber-50'
                }`}
              >
                {isSpinning ? '🎰' : '🎲'}
                <span className="hidden sm:inline">{t.surpriseMe}</span>
              </button>

              {/* Mixer Button */}
              <button
                onClick={() => setMixerOpen(true)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-amber-300 text-stone-700 hover:border-gold hover:bg-amber-50 transition-all flex items-center gap-2"
              >
                🧪
                <span className="hidden sm:inline">{t.mixer}</span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="w-10 h-10 rounded-full bg-white border border-amber-300 text-stone-600 hover:border-gold hover:bg-amber-50 transition-all flex items-center justify-center text-sm font-medium"
              >
                {t.language}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-10 h-10 rounded-full bg-white border border-amber-300 text-stone-700 hover:border-gold hover:bg-amber-50 transition-all flex items-center justify-center"
              >
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="h-full pt-16 flex">
        {/* Left Side - Hero Cup */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center p-8 relative">
          <div className="flex-1 flex items-center justify-center">
            <HeroCup coffee={selected} lang={lang} t={t} />
          </div>

          {/* Share Button */}
          {selected && (
            <button
              onClick={handleShare}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-sm font-medium bg-white/90 backdrop-blur border border-amber-300 text-stone-700 hover:border-gold hover:bg-white transition-all flex items-center gap-2 shadow-lg"
            >
              {copied ? '✓' : '🔗'}
              {copied ? t.shareCopied : t.share}
            </button>
          )}
        </div>

        {/* Right Side - Coffee Selection */}
        <div className="w-1/2 h-full flex flex-col p-6 pt-4">
          {/* Filter Pills */}
          <div className="flex gap-2 flex-wrap mb-4 justify-center">
            {Object.entries(cats).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === key
                    ? 'btn-gold'
                    : 'bg-white/80 border border-amber-200 text-stone-600 hover:border-gold hover:bg-white'
                }`}
              >
                {key === 'crazy' && '🤪 '}
                {key === 'decaf' && '😴 '}
                {label}
              </button>
            ))}
          </div>

          {/* Coffee Carousel */}
          <div className="flex-1 flex items-center">
            <CoffeeCarousel
              coffees={filtered}
              selected={selected}
              onSelect={setSelected}
              lang={lang}
            />
          </div>
        </div>
      </main>

      {/* Footer - Minimal */}
      <footer className="absolute bottom-0 left-0 right-0 text-center py-2 text-xs text-amber-600/60">
        {t.footer} · Powered by AI ✨
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
