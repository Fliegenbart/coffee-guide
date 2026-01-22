import React, { useState, useEffect } from 'react';
import { coffees, categories } from './data/coffees';
import { translations } from './i18n/translations';
import HeroCup from './components/HeroCup';
import CoffeeGrid from './components/CoffeeGrid';
import CoffeeMixer from './components/CoffeeMixer';

export default function CoffeeGuide() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [lang, setLang] = useState('de');
  const [mixerOpen, setMixerOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = translations[lang];
  const cats = categories[lang];

  // Check for shared mix in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mix = params.get('mix');
    if (mix) {
      try {
        const data = JSON.parse(atob(mix));
        // Could show custom mix here
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
        // Final selection
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
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-stone-800 tracking-wide">{t.title}</h1>
              <p className="text-stone-500 text-sm">{coffees.length} {t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Surprise Me Button */}
              <button
                onClick={handleSurpriseMe}
                disabled={isSpinning}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isSpinning
                    ? 'bg-yellow-400 text-stone-800 animate-pulse'
                    : 'bg-stone-800 text-white hover:bg-stone-700'
                }`}
              >
                {isSpinning ? '🎰' : '🎲'} {t.surpriseMe}
              </button>

              {/* Mixer Button */}
              <button
                onClick={() => setMixerOpen(true)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 transition-all"
              >
                🧪 {t.mixer}
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all flex items-center justify-center text-sm font-medium"
              >
                {t.language}
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {Object.entries(cats).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  filter === key
                    ? 'bg-stone-800 text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {key === 'crazy' && '🤪 '}
                {key === 'decaf' && '😴 '}
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Coffee Grid */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-stone-200/50">
            <CoffeeGrid
              coffees={filtered}
              selected={selected}
              onSelect={setSelected}
              lang={lang}
            />
          </div>

          {/* Right: Hero Cup */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200/50 min-h-[500px] flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <HeroCup coffee={selected} lang={lang} t={t} />
            </div>

            {/* Share Button */}
            {selected && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleShare}
                  className="px-6 py-2 rounded-full text-sm font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all flex items-center gap-2"
                >
                  {copied ? '✓ ' : '🔗 '}
                  {copied ? t.shareCopied : t.share}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-stone-400 text-sm">
        <p>{t.footer}</p>
      </footer>

      {/* Mixer Modal */}
      <CoffeeMixer
        isOpen={mixerOpen}
        onClose={() => setMixerOpen(false)}
        lang={lang}
        t={t}
      />
    </div>
  );
}
