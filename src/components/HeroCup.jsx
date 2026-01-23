import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { ingredients, ingredientLabels } from '../data/ingredients';
import BeanRecommendation from './shop/BeanRecommendation';
import CoffeeGraphic from './CoffeeGraphic';

// Spotify playlists mapped to coffee moods
const spotifyPlaylists = {
  // Energetic/Strong
  power: {
    id: '37i9dQZF1DX76Wlfdnj7AP', // Beast Mode
    name: { de: 'Power Mode', en: 'Beast Mode' }
  },
  morning: {
    id: '37i9dQZF1DX1g0iEXLFycr', // Feelin Good
    name: { de: 'Guten Morgen', en: 'Morning Motivation' }
  },
  // Chill/Relaxed
  chill: {
    id: '37i9dQZF1DX4WYpdgoIcn6', // Chill Hits
    name: { de: 'Entspannt', en: 'Chill Vibes' }
  },
  lofi: {
    id: '37i9dQZF1DWWQRwui0ExPn', // Lo-Fi Beats
    name: { de: 'Lo-Fi Beats', en: 'Lo-Fi Beats' }
  },
  // Sweet/Cozy
  cozy: {
    id: '37i9dQZF1DX4E3UdUs7fUx', // Chillin on a Dirt Road
    name: { de: 'Gemütlich', en: 'Cozy Afternoon' }
  },
  romantic: {
    id: '37i9dQZF1DX50QitC6Oqtn', // Love Pop
    name: { de: 'Romantisch', en: 'Romantic' }
  },
  // Creative/Artsy
  jazz: {
    id: '37i9dQZF1DX0SM0LYsmbMT', // Jazz Vibes
    name: { de: 'Jazz Cafe', en: 'Jazz Vibes' }
  },
  indie: {
    id: '37i9dQZF1DX2Nc3B70tvx0', // Indie Pop
    name: { de: 'Indie Vibes', en: 'Indie Pop' }
  },
  // Party/Fun
  party: {
    id: '37i9dQZF1DXaXB8fQg7xif', // Dance Party
    name: { de: 'Party Time', en: 'Dance Party' }
  },
  tropical: {
    id: '37i9dQZF1DX1HUbZS4LEyL', // Tropical House
    name: { de: 'Tropical Vibes', en: 'Tropical House' }
  },
  // Dark/Mysterious
  dark: {
    id: '37i9dQZF1DX2TRYkJECvfC', // Dark & Stormy
    name: { de: 'Dunkel & Mysteriös', en: 'Dark & Stormy' }
  },
  electronic: {
    id: '37i9dQZF1DX4dyzvuaRJ0n', // Techno Bunker
    name: { de: 'Electronic', en: 'Electronic' }
  }
};

// Map coffee characteristics to playlist mood
function getPlaylistForCoffee(coffee) {
  const category = coffee.category;
  const graphic = coffee.graphic;
  const caffeineLevel = coffee.layers?.reduce((sum, l) => sum + (ingredients[l.type]?.caffeine || 0) * (l.ratio / 100), 0) || 0;

  // Graphic-based matching
  if (graphic) {
    const graphicMap = {
      fox: 'chill',
      volcano: 'power',
      unicorn: 'party',
      dragon: 'power',
      ghost: 'dark',
      alien: 'electronic',
      wizard: 'jazz',
      mermaid: 'tropical',
      robot: 'lofi',
      explosion: 'power'
    };
    if (graphicMap[graphic]) return spotifyPlaylists[graphicMap[graphic]];
  }

  // Category-based matching
  if (category === 'crazy') return spotifyPlaylists.party;
  if (category === 'decaf') return spotifyPlaylists.chill;
  if (category === 'special') return spotifyPlaylists.jazz;

  // Caffeine-based matching
  if (caffeineLevel >= 3) return spotifyPlaylists.power;
  if (caffeineLevel >= 2) return spotifyPlaylists.morning;

  // Default
  return spotifyPlaylists.lofi;
}

export default function HeroCup({ coffee, lang, t, isCustom = false, onShare }) {
  const [showLabels, setShowLabels] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareStatus, setShareStatus] = useState(null);
  const cardRef = useRef(null);

  if (!coffee) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-400">
        <div className="w-24 h-36 border border-dashed border-stone-300 rounded-b-[2.5rem] flex items-center justify-center opacity-50">
          <span className="text-3xl">☕</span>
        </div>
        <p className="mt-6 text-sm tracking-wide">{t.heroEmpty}</p>
      </div>
    );
  }

  const totalCaffeine = coffee.layers.reduce((sum, layer) => {
    return sum + (ingredients[layer.type]?.caffeine || 0) * (layer.ratio / 100);
  }, 0);
  const caffeineLevel = Math.min(5, Math.round(totalCaffeine));
  const playlist = getPlaylistForCoffee(coffee);

  const handleShare = () => {
    if (onShare) {
      onShare();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateImage = async () => {
    if (!cardRef.current) return null;
    setIsGeneratingImage(true);

    try {
      // Wait a bit for any animations to settle
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#fafaf9',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        removeContainer: true,
      });
      return canvas;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const downloadImage = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInstagramShare = async () => {
    setShareStatus('generating');

    try {
      const canvas = await generateImage();
      if (!canvas) {
        setShareStatus('error');
        setTimeout(() => setShareStatus(null), 2000);
        return;
      }

      // Use JPEG for better compatibility with Instagram
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setShareStatus('error');
          setTimeout(() => setShareStatus(null), 2000);
          return;
        }

        const filename = `${coffee.name[lang].replace(/\s+/g, '-')}-coffee.jpg`;
        const file = new File([blob], filename, { type: 'image/jpeg' });

        // Try Web Share API (works on mobile)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: coffee.name[lang],
              text: `${coffee.name[lang]} ☕ #coffee #kaffee`
            });
            setShareStatus('shared');
            setTimeout(() => setShareStatus(null), 2000);
            return;
          } catch (err) {
            if (err.name === 'AbortError') {
              setShareStatus(null);
              return;
            }
          }
        }

        // Fallback: Download image
        downloadImage(blob, filename);
        setShareStatus('downloaded');
        setTimeout(() => setShareStatus(null), 3000);
      }, 'image/jpeg', 0.95); // JPEG with 95% quality
    } catch (error) {
      console.error('Instagram share error:', error);
      setShareStatus('error');
      setTimeout(() => setShareStatus(null), 2000);
    }
  };

  const handleWhatsAppShare = async () => {
    setShareStatus('generating');

    try {
      const canvas = await generateImage();
      if (!canvas) {
        setShareStatus('error');
        setTimeout(() => setShareStatus(null), 2000);
        return;
      }

      // Use JPEG for better compatibility with WhatsApp
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setShareStatus('error');
          setTimeout(() => setShareStatus(null), 2000);
          return;
        }

        const filename = `${coffee.name[lang].replace(/\s+/g, '-')}-coffee.jpg`;
        const file = new File([blob], filename, { type: 'image/jpeg' });
        const shareText = `☕ ${coffee.name[lang]} - ${coffee.description[lang]}`;

        // Try Web Share API (works on mobile)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: coffee.name[lang],
              text: shareText
            });
            setShareStatus('shared');
            setTimeout(() => setShareStatus(null), 2000);
            return;
          } catch (err) {
            if (err.name === 'AbortError') {
              setShareStatus(null);
              return;
            }
          }
        }

        // Fallback: Download image + open WhatsApp
        downloadImage(blob, filename);

        // Small delay then open WhatsApp
        setTimeout(() => {
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n📸 Bild wurde heruntergeladen!')}`;
          window.open(whatsappUrl, '_blank');
        }, 500);

        setShareStatus('downloaded-wa');
        setTimeout(() => setShareStatus(null), 3000);
      }, 'image/jpeg', 0.95); // JPEG with 95% quality
    } catch (error) {
      console.error('WhatsApp share error:', error);
      setShareStatus('error');
      setTimeout(() => setShareStatus(null), 2000);
    }
  };

  const handleSpotifyOpen = () => {
    window.open(`https://open.spotify.com/playlist/${playlist.id}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center animate-fadeIn w-full max-w-sm">
      {/* Shareable Card Area */}
      <div ref={cardRef} className="flex flex-col items-center bg-stone-50 p-6 rounded-2xl">
        {/* Animated Graphic for special/custom coffees */}
        {(isCustom || coffee.graphic) && (
          <div className="mb-4 h-24">
            <CoffeeGraphic type={coffee.graphic || 'robot'} />
          </div>
        )}

        {/* Custom Coffee Badge */}
        {isCustom && (
          <div className="mb-3 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg tracking-wide">
            KI-Kreation
          </div>
        )}

        {/* Steam Animation */}
        <div className="relative h-6 w-20 mb-1">
          <div className="steam steam-1"></div>
          <div className="steam steam-2"></div>
          <div className="steam steam-3"></div>
        </div>

        {/* Apple-style Cup */}
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setShowLabels(true)}
          onMouseLeave={() => setShowLabels(false)}
        >
          {/* The Cup */}
          <div className="relative">
            {/* Cup container */}
            <div className={`
              cup-apple w-24 h-36 overflow-hidden relative
              ${isCustom ? 'ring-2 ring-amber-400/50' : ''}
            `}>
              {/* Glass highlight overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />

              {/* Layers */}
              <div className="h-full flex flex-col-reverse relative">
                {coffee.layers.map((layer, i) => {
                  const color = ingredients[layer.type]?.color || '#ccc';
                  return (
                    <div
                      key={i}
                      className="w-full layer-apple layer-fill"
                      style={{
                        '--layer-color': color,
                        backgroundColor: color,
                        height: `${layer.ratio}%`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Elegant Handle */}
            <div className={`
              handle-apple absolute -right-3 top-1/2 -translate-y-1/2
              ${isCustom ? 'border-amber-400/50' : ''}
            `} />
          </div>

          {/* Hover Labels - Left (percentages) */}
          <div className={`
            absolute -left-16 top-0 h-36 flex flex-col-reverse justify-end
            transition-all duration-300
            ${showLabels ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
          `}>
            {coffee.layers.map((layer, i) => (
              <div
                key={i}
                className="flex items-center justify-end gap-2 pr-2"
                style={{ height: `${layer.ratio}%`, minHeight: '16px' }}
              >
                <span className="text-[10px] text-stone-400 font-mono tabular-nums">
                  {layer.ratio}%
                </span>
              </div>
            ))}
          </div>

          {/* Hover Labels - Right (ingredients) */}
          <div className={`
            absolute -right-20 top-0 h-36 flex flex-col-reverse justify-end
            transition-all duration-300
            ${showLabels ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
          `}>
            {coffee.layers.map((layer, i) => (
              <div
                key={i}
                className="flex items-center gap-2 pl-4"
                style={{ height: `${layer.ratio}%`, minHeight: '16px' }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: ingredients[layer.type]?.color }}
                />
                <span className="text-[10px] text-stone-500 whitespace-nowrap">
                  {ingredientLabels[lang][layer.type]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coffee name and description */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-display font-semibold text-stone-800 tracking-tight">
            {coffee.name[lang]}
          </h2>
          <p className="text-stone-500 mt-2 max-w-xs text-sm leading-relaxed">
            {coffee.description[lang]}
          </p>
        </div>

        {/* Caffeine meter - minimal */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-1.5 h-4 rounded-full transition-all ${
                  level <= caffeineLevel
                    ? 'bg-amber-500'
                    : 'bg-stone-200'
                }`}
                style={{
                  height: `${8 + level * 3}px`
                }}
              />
            ))}
          </div>
          <span className="text-xs text-stone-400">
            {t.caffeineLevel[caffeineLevel]}
          </span>
        </div>
      </div>

      {/* Share Status Message */}
      {shareStatus && (
        <div className={`mt-2 px-4 py-2 rounded-full text-sm font-medium text-center animate-fadeIn ${
          shareStatus === 'error' ? 'bg-red-100 text-red-700' :
          shareStatus === 'generating' ? 'bg-amber-100 text-amber-700' :
          'bg-green-100 text-green-700'
        }`}>
          {shareStatus === 'generating' && (lang === 'de' ? '📸 Bild wird erstellt...' : '📸 Creating image...')}
          {shareStatus === 'downloaded' && (lang === 'de' ? '✓ Bild heruntergeladen! Jetzt auf Instagram teilen.' : '✓ Image downloaded! Share on Instagram now.')}
          {shareStatus === 'downloaded-wa' && (lang === 'de' ? '✓ Bild heruntergeladen! WhatsApp öffnet sich...' : '✓ Image downloaded! Opening WhatsApp...')}
          {shareStatus === 'shared' && (lang === 'de' ? '✓ Geteilt!' : '✓ Shared!')}
          {shareStatus === 'error' && (lang === 'de' ? '✗ Fehler beim Erstellen' : '✗ Error creating image')}
        </div>
      )}

      {/* Social Share Buttons */}
      <div className="mt-4 flex items-center gap-2 flex-wrap justify-center">
        {/* URL Share */}
        {onShare && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-all"
            title={t.share || 'Teilen'}
          >
            {copied ? (
              <span className="text-green-600">✓</span>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            )}
          </button>
        )}

        {/* Instagram Share */}
        <button
          onClick={handleInstagramShare}
          disabled={shareStatus === 'generating'}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-full transition-all ${
            shareStatus === 'generating'
              ? 'bg-stone-200 text-stone-400 cursor-wait'
              : 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:shadow-lg hover:scale-105'
          }`}
          title={lang === 'de' ? 'Bild für Instagram herunterladen' : 'Download image for Instagram'}
        >
          {shareStatus === 'generating' ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-xs">📸</span>
            </>
          )}
        </button>

        {/* WhatsApp Share */}
        <button
          onClick={handleWhatsAppShare}
          disabled={shareStatus === 'generating'}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-full transition-all ${
            shareStatus === 'generating'
              ? 'bg-stone-200 text-stone-400 cursor-wait'
              : 'bg-[#25D366] text-white hover:bg-[#20bd5a] hover:shadow-lg hover:scale-105'
          }`}
          title="WhatsApp"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>

        {/* Spotify Playlist */}
        <button
          onClick={handleSpotifyOpen}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-[#1DB954] text-white rounded-full hover:bg-[#1ed760] transition-all hover:shadow-lg"
          title={playlist.name[lang]}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="hidden sm:inline text-xs">{playlist.name[lang]}</span>
        </button>
      </div>

      {/* Bean Recommendations - only for non-custom coffees */}
      {!isCustom && <BeanRecommendation coffeeId={coffee.id} lang={lang} t={t} />}

      {/* Custom coffee recommended bean */}
      {isCustom && coffee.recommendedBean && (
        <div className="mt-5 p-4 bg-stone-50 border border-stone-200 rounded-2xl w-full">
          <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Empfohlene Bohne</p>
          <p className="text-sm text-stone-700">{coffee.recommendedBean}</p>
        </div>
      )}
    </div>
  );
}
