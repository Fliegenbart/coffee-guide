import React, { useState, useEffect } from 'react';
import { coffees, categories } from './data/coffees';
import { translations } from './i18n/translations';
import HeroCup from './components/HeroCup';
import CoffeeCarousel from './components/CoffeeCarousel';
import CoffeeMixer from './components/CoffeeMixer';
import Cart from './components/shop/Cart';
import AiBarista from './components/AiBarista';
import CoffeeGrounds from './components/CoffeeGrounds';
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

  // Check for shared coffee in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Check for regular coffee ID
    const coffeeId = params.get('coffee');
    if (coffeeId) {
      const foundCoffee = coffees.find(c => c.id === coffeeId);
      if (foundCoffee) {
        setSelected(foundCoffee);
        setCustomCoffee(null);
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
        return;
      }
    }

    // Check for custom coffee (encoded)
    const custom = params.get('custom');
    if (custom) {
      try {
        const data = JSON.parse(atob(custom));
        // Expand compact format to full format
        const customCoffeeData = {
          id: 'shared-' + Date.now(),
          name: typeof data.n === 'string' ? { de: data.n, en: data.n } : data.n,
          description: typeof data.d === 'string' ? { de: data.d, en: data.d } : (data.d || { de: '', en: '' }),
          layers: data.l.map(layer => ({
            type: layer.t,
            ratio: layer.r
          })),
          graphic: data.g || 'robot',
          recommendedBean: data.b,
          category: 'custom',
          note: 'KI'
        };
        setCustomCoffee(customCoffeeData);
        setSelected(null);
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
      } catch (e) {
        console.error('Invalid custom coffee data:', e);
      }
    }

    // Legacy mix format support
    const mix = params.get('mix');
    if (mix) {
      try {
        const data = JSON.parse(atob(mix));
        const customCoffeeData = {
          id: 'mix-' + Date.now(),
          name: { de: data.name || 'Eigene Kreation', en: data.name || 'Custom Creation' },
          description: { de: 'Eine selbst gemischte Kreation', en: 'A custom mixed creation' },
          layers: data.layers,
          category: 'custom',
          note: 'Mix'
        };
        setCustomCoffee(customCoffeeData);
        setSelected(null);
        window.history.replaceState({}, '', window.location.pathname);
      } catch (e) {
        console.error('Invalid mix data:', e);
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

    let url;
    if (customCoffee || coffee.category === 'custom' || coffee.id?.startsWith('custom-')) {
      // Encode custom coffee in compact format
      const compactData = {
        n: coffee.name,
        d: coffee.description,
        l: coffee.layers.map(l => ({ t: l.type, r: l.ratio })),
        g: coffee.graphic || 'robot',
        b: coffee.recommendedBean
      };
      const encoded = btoa(JSON.stringify(compactData));
      url = `${window.location.origin}${window.location.pathname}?custom=${encoded}`;
    } else {
      // Regular coffee - simple ID
      url = `${window.location.origin}${window.location.pathname}?coffee=${coffee.id}`;
    }

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

      {/* Header - Apple/Jony Ive Style */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Abstract Modern Logo */}
            <div className="flex items-center gap-4">
              {/* Abstract Coffee Cup Logo - SVG */}
              <div className="relative w-12 h-12">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  {/* Abstract geometric coffee representation */}
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                    <linearGradient id="steamGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Steam curves */}
                  <path d="M18 8 Q20 4 18 0" stroke="url(#steamGradient)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6">
                    <animate attributeName="d" values="M18 8 Q20 4 18 0;M18 8 Q16 4 18 0;M18 8 Q20 4 18 0" dur="2s" repeatCount="indefinite"/>
                  </path>
                  <path d="M24 10 Q26 5 24 1" stroke="url(#steamGradient)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8">
                    <animate attributeName="d" values="M24 10 Q26 5 24 1;M24 10 Q22 5 24 1;M24 10 Q26 5 24 1" dur="2.5s" repeatCount="indefinite"/>
                  </path>
                  <path d="M30 8 Q32 4 30 0" stroke="url(#steamGradient)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6">
                    <animate attributeName="d" values="M30 8 Q32 4 30 0;M30 8 Q28 4 30 0;M30 8 Q32 4 30 0" dur="1.8s" repeatCount="indefinite"/>
                  </path>
                  {/* Cup body - abstract geometric */}
                  <path d="M8 16 L8 38 Q8 44 16 44 L32 44 Q40 44 40 38 L40 16 Z" fill="url(#logoGradient)" />
                  {/* Cup liquid surface */}
                  <ellipse cx="24" cy="18" rx="14" ry="4" fill="#fef3c7" opacity="0.4"/>
                  {/* Handle - minimal */}
                  <path d="M40 22 Q48 22 48 30 Q48 38 40 38" stroke="url(#logoGradient)" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-display font-semibold text-stone-900 tracking-tight">
                  {t.title}
                </h1>
                <p className="text-stone-400 text-sm font-light mt-0.5">{coffees.length} {t.subtitle}</p>
              </div>
            </div>

            {/* Action Buttons - Refined */}
            <div className="flex items-center gap-3">
              {/* Surprise Me Button */}
              <button
                onClick={handleSurpriseMe}
                disabled={isSpinning}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isSpinning
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                <span className={isSpinning ? 'animate-spin' : ''}>{isSpinning ? '◐' : '↻'}</span>
                <span className="hidden sm:inline">{t.surpriseMe}</span>
              </button>

              {/* Mixer Button */}
              <button
                onClick={() => setMixerOpen(true)}
                className="px-5 py-2.5 rounded-full text-sm font-medium bg-white border border-stone-200 text-stone-700 hover:border-stone-400 hover:shadow-sm transition-all flex items-center gap-2"
              >
                <span className="text-base">◎</span>
                <span className="hidden sm:inline">{t.mixer}</span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="w-11 h-11 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-stone-400 hover:shadow-sm transition-all flex items-center justify-center text-sm font-semibold"
              >
                {t.language}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-11 h-11 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-stone-400 hover:shadow-sm transition-all flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="h-full pt-24 flex">
        {/* Left Side - Coffee Selection */}
        <div className="w-1/2 h-full flex flex-col p-4 pt-4 border-r border-stone-200">
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
              onShare={handleShare}
            />
          </div>
        </div>
      </main>

      {/* Floating AI Barista Button - Left Side */}
      <button
        onClick={() => setBaristaOpen(true)}
        className="fixed bottom-6 left-6 z-50 group"
      >
        <div className="relative">
          {/* Pulse animation */}
          <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-25" />

          {/* Main button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-xl flex items-center justify-center transform transition-all group-hover:scale-110 group-hover:shadow-2xl border-4 border-white">
            <span className="text-3xl">🤖</span>
          </div>

          {/* Speech bubble - pointing left */}
          <div className="absolute -top-12 left-0 bg-white rounded-xl px-3 py-1.5 shadow-lg border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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

      {/* Random Coffee Grounds Animation */}
      <CoffeeGrounds />
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
