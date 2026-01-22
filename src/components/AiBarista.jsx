import React, { useState, useRef, useEffect } from 'react';
import { coffees } from '../data/coffees';
import { ingredients } from '../data/ingredients';

// System prompt for Claude API
const SYSTEM_PROMPT = `Du bist ein lustiger, frecher KI-Barista namens "Beans". Du liebst Kaffee über alles und machst gerne Witze.

Deine Persönlichkeit:
- Frech aber freundlich
- Machst Kaffee-Wortspiele
- Enthusiastisch über ausgefallene Kreationen
- Nennst den User "Kaffeejunkie" oder "Bohnenfreund"

Wenn der User nach einer Kaffeeempfehlung fragt, antworte mit einer Empfehlung und erstelle IMMER am Ende ein JSON-Objekt in diesem Format:

\`\`\`coffee
{
  "name": {"de": "Name auf Deutsch", "en": "Name in English"},
  "description": {"de": "Kurze Beschreibung", "en": "Short description"},
  "layers": [
    {"type": "espresso", "ratio": 30},
    {"type": "steamed", "ratio": 50},
    {"type": "foam", "ratio": 20}
  ],
  "recommendedBean": "Brazil Santos oder Colombia Supremo",
  "graphic": "robot"
}
\`\`\`

WICHTIG: Wähle immer einen passenden "graphic" Key für die Animation:
- "fox" = Winterlich, arktisch, kühl, Vanille, Minze
- "volcano" = Feurig, scharf, Chili, stark, intensiv
- "unicorn" = Süß, bunt, Regenbogen, verspielt, mit Sirup
- "dragon" = Mutig, feurig, gewagt, exotisch
- "ghost" = Nacht, Traum, mysteriös, Decaf
- "alien" = Außergewöhnlich, exotisch, ungewöhnlich
- "wizard" = Magisch, geheimnisvoll, besonders
- "mermaid" = Ozean, frisch, Kokosnuss, tropisch
- "explosion" = Power, Energie, stark, Koffein-Boost
- "robot" = Standard für normale KI-Kreationen

Verfügbare Zutaten (type): espresso, decaf, doppio, ristretto, coldbrew, filter, steamed, oat, coconut, almond, foam, microfoam, cream, coldfoam, chocolate, whitechoc, caramel, vanilla, honey, cinnamon, matcha, chai, lavender, mint, chili, ice, water

Die ratios müssen zusammen 100 ergeben!

Sei kreativ mit Namen wie "Mondschein-Mokka", "Vulkan-Latte" oder "Einhorn-Frappe".`;

// Fallback responses when no API key
const baristaResponses = {
  greetings: [
    { de: 'Hey Bohnenfreund! Ich bin Beans, dein KI-Barista. Was darf\'s sein? ☕', en: 'Hey coffee lover! I\'m Beans, your AI barista. What can I get you? ☕' },
    { de: 'Moin moin! Bereit für was Koffeinhaltiges? Ich hab heute extra gute Laune! 🤖', en: 'Hey there! Ready for something caffeinated? I\'m in a great mood today! 🤖' },
  ],
  tired: {
    keywords: ['müde', 'tired', 'wach', 'energie', 'energy', 'power', 'aufwachen', 'wake'],
    response: {
      de: 'Ohoh, jemand braucht einen Koffein-Kick! 💪 Wie wärs mit dem **{coffee}**? {description} Der macht selbst Zombies wieder lebendig!',
      en: 'Uh oh, someone needs a caffeine kick! 💪 How about the **{coffee}**? {description} It\'ll wake up even zombies!'
    },
    coffeeIds: ['blackeye', 'redeye', 'doppio', 'espresso']
  },
  sweet: {
    keywords: ['süß', 'sweet', 'schokolade', 'chocolate', 'dessert', 'karamell', 'caramel'],
    response: {
      de: 'Naschkatze detected! 🍫 Der **{coffee}** ist genau dein Ding – {description} Quasi flüssiges Glück!',
      en: 'Sweet tooth detected! 🍫 The **{coffee}** is perfect for you – {description} Basically liquid happiness!'
    },
    coffeeIds: ['mocha', 'karamellsupernova', 'schokoseele', 'cafebombon']
  },
  special: {
    keywords: ['besonder', 'special', 'ausgefallen', 'crazy', 'verrückt', 'neu', 'new', 'überrasch', 'kreativ'],
    response: {
      de: 'Uuuh, ein Abenteurer! 🎢 Probier mal den **{coffee}** – {description} Das ist quasi Kaffee auf LSD (legal natürlich)!',
      en: 'Ooh, an adventurer! 🎢 Try the **{coffee}** – {description} It\'s basically coffee on an adventure!'
    },
    coffeeIds: ['vulkanausbruch', 'nordlicht', 'einhornlatte', 'berlinernacht', 'goldenerdrache']
  },
  default: {
    response: {
      de: 'Hmm, wie wär\'s mit einem **{coffee}**? {description} Ein Klassiker, der nie enttäuscht! 👌',
      en: 'Hmm, how about a **{coffee}**? {description} A classic that never disappoints! 👌'
    },
    coffeeIds: ['cappuccino', 'espresso', 'latte', 'americano']
  }
};

function findMatchingCategory(message) {
  const lowerMessage = message.toLowerCase();
  for (const [category, data] of Object.entries(baristaResponses)) {
    if (category === 'greetings' || category === 'default') continue;
    if (data.keywords?.some(keyword => lowerMessage.includes(keyword))) {
      return category;
    }
  }
  return 'default';
}

function generateFallbackResponse(message, lang) {
  const category = findMatchingCategory(message);
  const data = baristaResponses[category] || baristaResponses.default;
  const coffeeId = data.coffeeIds[Math.floor(Math.random() * data.coffeeIds.length)];
  const coffee = coffees.find(c => c.id === coffeeId) || coffees[0];
  let response = data.response[lang];
  response = response.replace('{coffee}', coffee.name[lang]);
  response = response.replace('{description}', coffee.description[lang]);
  return { text: response, coffee };
}

function parseCoffeeFromResponse(text) {
  const coffeeMatch = text.match(/```coffee\n?([\s\S]*?)\n?```/);
  if (coffeeMatch) {
    try {
      const coffeeData = JSON.parse(coffeeMatch[1]);
      // Validate layers
      if (coffeeData.layers && Array.isArray(coffeeData.layers)) {
        const validLayers = coffeeData.layers.filter(l => ingredients[l.type]);
        if (validLayers.length > 0) {
          return {
            id: 'custom-' + Date.now(),
            ...coffeeData,
            layers: validLayers,
            category: 'custom',
            note: 'KI'
          };
        }
      }
    } catch (e) {
      console.error('Failed to parse coffee JSON:', e);
    }
  }
  return null;
}

export default function AiBarista({ isOpen, onClose, onSelectCoffee, onCustomCoffee, lang }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('anthropic_api_key') || '');
  const [showApiInput, setShowApiInput] = useState(false);
  const messagesEndRef = useRef(null);

  const labels = {
    de: {
      title: 'Beans - KI-Barista',
      subtitle: 'Dein frecher Kaffee-Buddy',
      placeholder: 'Sag mir was du willst...',
      showCoffee: 'Diese Kreation zeigen',
      suggestions: ['Ich bin mega müde!', 'Was Süßes bitte!', 'Überrasch mich!', 'Etwas Verrücktes!'],
      apiKeyLabel: 'Anthropic API Key (optional)',
      apiKeyPlaceholder: 'sk-ant-...',
      apiKeySave: 'Speichern',
      noApiHint: 'Ohne API-Key gibt\'s Standard-Empfehlungen. Mit API wird\'s richtig lustig! 🎉'
    },
    en: {
      title: 'Beans - AI Barista',
      subtitle: 'Your cheeky coffee buddy',
      placeholder: 'Tell me what you want...',
      showCoffee: 'Show this creation',
      suggestions: ['I\'m super tired!', 'Something sweet!', 'Surprise me!', 'Something crazy!'],
      apiKeyLabel: 'Anthropic API Key (optional)',
      apiKeyPlaceholder: 'sk-ant-...',
      apiKeySave: 'Save',
      noApiHint: 'Without API key you get standard recommendations. With API it gets really fun! 🎉'
    }
  };

  const l = labels[lang];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = baristaResponses.greetings[Math.floor(Math.random() * baristaResponses.greetings.length)];
      setMessages([{ role: 'ai', text: greeting[lang] }]);
    }
  }, [isOpen, lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    if (apiKey) {
      // Use Claude API
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
              ...messages.filter(m => m.role !== 'ai' || !m.coffee).map(m => ({
                role: m.role === 'ai' ? 'assistant' : 'user',
                content: m.text
              })),
              { role: 'user', content: text }
            ]
          })
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        const aiText = data.content[0].text;

        // Try to extract custom coffee from response
        const customCoffee = parseCoffeeFromResponse(aiText);

        // Clean the response text (remove the JSON block)
        const cleanText = aiText.replace(/```coffee[\s\S]*?```/g, '').trim();

        setMessages(prev => [...prev, {
          role: 'ai',
          text: cleanText,
          coffee: customCoffee,
          isCustom: !!customCoffee
        }]);
      } catch (error) {
        console.error('API Error:', error);
        // Fallback to local response
        const { text: responseText, coffee } = generateFallbackResponse(text, lang);
        setMessages(prev => [...prev, { role: 'ai', text: responseText + '\n\n_(API-Fehler - Fallback-Antwort)_', coffee }]);
      }
    } else {
      // Use fallback responses
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
      const { text: responseText, coffee } = generateFallbackResponse(text, lang);
      setMessages(prev => [...prev, { role: 'ai', text: responseText, coffee }]);
    }

    setIsTyping(false);
  };

  const handleCoffeeClick = (coffee, isCustom) => {
    if (isCustom && onCustomCoffee) {
      onCustomCoffee(coffee);
    } else if (onSelectCoffee) {
      onSelectCoffee(coffee);
    }
    onClose();
  };

  const saveApiKey = () => {
    localStorage.setItem('anthropic_api_key', apiKey);
    setShowApiInput(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp border border-stone-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-lg">
              🤖
            </div>
            <div>
              <h2 className="font-bold text-white">{l.title}</h2>
              <span className="text-xs text-amber-100">{l.subtitle}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowApiInput(!showApiInput)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              title="API Settings"
            >
              ⚙️
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* API Key Input */}
        {showApiInput && (
          <div className="p-3 bg-amber-50 border-b border-amber-200">
            <label className="text-xs text-amber-800 font-medium block mb-1">{l.apiKeyLabel}</label>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={l.apiKeyPlaceholder}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-amber-300 focus:border-amber-500 focus:outline-none"
              />
              <button
                onClick={saveApiKey}
                className="px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
              >
                {l.apiKeySave}
              </button>
            </div>
            <p className="text-xs text-amber-600 mt-1">{l.noApiHint}</p>
          </div>
        )}

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-white'
                  : 'bg-white border border-stone-200 text-stone-700'
              }`}>
                <p className="text-sm whitespace-pre-wrap">
                  {msg.text.split('**').map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className={msg.role === 'user' ? 'text-white' : 'text-amber-600'}>{part}</strong> : part
                  )}
                </p>
                {msg.coffee && (
                  <button
                    onClick={() => handleCoffeeClick(msg.coffee, msg.isCustom)}
                    className="mt-2 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-full font-medium hover:bg-amber-600 transition-colors"
                  >
                    {l.showCoffee} →
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 rounded-2xl">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions */}
        <div className="px-4 pb-2 pt-2 flex gap-2 overflow-x-auto border-t border-stone-100">
          {l.suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSend(suggestion)}
              className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-stone-300 text-stone-600 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-stone-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={l.placeholder}
              className="flex-1 px-4 py-3 bg-stone-100 rounded-xl text-stone-700 placeholder-stone-400 border-0 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className={`px-4 rounded-xl transition-all ${
                input.trim() && !isTyping
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
