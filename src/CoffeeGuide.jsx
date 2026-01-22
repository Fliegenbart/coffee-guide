import React, { useState, useEffect } from 'react';
import { coffees, categories } from './data/coffees';
import { translations } from './i18n/translations';
import HeroCup from './components/HeroCup';
import CoffeeCarousel from './components/CoffeeCarousel';
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
  const [customCoffee, setCustomCoffee] = useState(null);

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
    setCustomCoffee(null);
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
    if (!selected && !customCoffee) return;
    const coffee = customCoffee || selected;
    const url = `${window.location.origin}?coffee=${coffee.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle custom coffee from AI Barista
  const handleCustomCoffee = (coffee) => {
    setCustomCoffee(coffee);
    setSelected(null);
  };

  // Handle selecting a regular coffee
  const handleSelectCoffee = (coffee) => {
    setCustomCoffee(null);
    setSelected(coffee);
  };

  const displayedCoffee = customCoffee || selected;

  return (
    <div className="h-screen w-screen overflow-hidden bg-stone-100 relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #d4d4d4 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />

      {/* Header - Fixed */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center shadow-lg">
                <span className="text-lg">☕</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-semibold text-stone-800 tracking-wide">
                  {t.title}
                </h1>
                <p className="text-stone-500 text-xs">{coffees.length} {t.subtitle}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Surprise Me Button */}
              <button
                onClick={handleSurpriseMe}
                disabled={isSpinning}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isSpinning
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-white border border-stone-300 text-stone-700 hover:border-amber-600 hover:bg-amber-50'
                }`}
              >
                {isSpinning ? '🎰' : '🎲'}
                <span className="hidden sm:inline">{t.surpriseMe}</span>
              </button>

              {/* Mixer Button */}
              <button
                onClick={() => setMixerOpen(true)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-stone-300 text-stone-700 hover:border-amber-600 hover:bg-amber-50 transition-all flex items-center gap-2"
              >
                🧪
                <span className="hidden sm:inline">{t.mixer}</span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="w-10 h-10 rounded-full bg-white border border-stone-300 text-stone-600 hover:border-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center text-sm font-medium"
              >
                {t.language}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-10 h-10 rounded-full bg-white border border-stone-300 text-stone-700 hover:border-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center"
              >
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
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
        {/* Left Side - Coffee Selection */}
        <div className="w-1/2 h-full flex flex-col p-4 pt-2 border-r border-stone-200">
          {/* Filter Pills */}
          <div className="flex gap-2 flex-wrap mb-3 justify-center">
            {Object.entries(cats).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === key
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white border border-stone-300 text-stone-600 hover:border-amber-600 hover:bg-amber-50'
                }`}
              >
                {key === 'crazy' && '🤪 '}
                {key === 'decaf' && '😴 '}
                {label}
              </button>
            ))}
          </div>

          {/* Coffee Carousel */}
          <div className="flex-1 flex items-center overflow-hidden">
            <CoffeeCarousel
              coffees={filtered}
              selected={selected}
              onSelect={handleSelectCoffee}
              lang={lang}
            />
          </div>
        </div>

        {/* Right Side - Hero Cup */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-stone-50 to-stone-100">
          <div className="flex-1 flex items-center justify-center overflow-y-auto">
            <HeroCup
              coffee={displayedCoffee}
              lang={lang}
              t={t}
              isCustom={!!customCoffee}
            />
          </div>

          {/* Share Button */}
          {displayedCoffee && (
            <button
              onClick={handleShare}
              className="absolute bottom-20 right-8 px-4 py-2 rounded-full text-sm font-medium bg-white border border-stone-300 text-stone-700 hover:border-amber-600 hover:bg-amber-50 transition-all flex items-center gap-2 shadow-md"
            >
              {copied ? '✓' : '🔗'}
              {copied ? t.shareCopied : t.share}
            </button>
          )}
        </div>
      </main>

      {/* Floating AI Barista Button */}
      <button
        onClick={() => setBaristaOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Pulse animation */}
          <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-25" />

          {/* Main button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-xl flex items-center justify-center transform transition-all group-hover:scale-110 group-hover:shadow-2xl border-4 border-white">
            <span className="text-3xl">🤖</span>
          </div>

          {/* Speech bubble */}
          <div className="absolute -top-12 -left-2 bg-white rounded-xl px-3 py-1.5 shadow-lg border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="text-sm font-medium text-stone-700">
              {lang === 'de' ? 'Hey, brauchst du Hilfe?' : 'Need help?'}
            </span>
            <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-white border-r border-b border-stone-200 transform rotate-45" />
          </div>
        </div>
      </button>

      {/* Footer - Minimal */}
      <footer className="absolute bottom-0 left-0 right-1/2 text-center py-2 text-xs text-stone-400">
        {t.footer}
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
        onSelectCoffee={handleSelectCoffee}
        onCustomCoffee={handleCustomCoffee}
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
