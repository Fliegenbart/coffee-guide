import React, { useState, useRef, useEffect } from 'react';
import { coffees } from '../data/coffees';

// Regelbasierter KI-Barista (kann später durch Claude API ersetzt werden)
const baristaResponses = {
  greetings: [
    { de: 'Hey! Ich bin dein KI-Barista. Was darf es heute sein?', en: 'Hey! I\'m your AI barista. What can I get you today?' },
    { de: 'Willkommen! Erzähl mir, wonach dir ist – ich finde den perfekten Kaffee für dich.', en: 'Welcome! Tell me what you\'re in the mood for – I\'ll find the perfect coffee for you.' },
  ],
  tired: {
    keywords: ['müde', 'tired', 'wach', 'energie', 'energy', 'power', 'aufwachen', 'wake'],
    response: {
      de: 'Du brauchst Power! Ich empfehle dir einen **{coffee}** – {description}',
      en: 'You need power! I recommend a **{coffee}** – {description}'
    },
    coffeeIds: ['blackeye', 'redeye', 'doppio', 'espresso']
  },
  relax: {
    keywords: ['entspann', 'relax', 'chill', 'ruhig', 'calm', 'abend', 'evening', 'gemütlich'],
    response: {
      de: 'Zeit zum Entspannen! Wie wäre es mit einem **{coffee}**? {description}',
      en: 'Time to relax! How about a **{coffee}**? {description}'
    },
    coffeeIds: ['sanftermorgen', 'traumwolke', 'nachtruhe', 'latte']
  },
  sweet: {
    keywords: ['süß', 'sweet', 'schokolade', 'chocolate', 'dessert', 'karamell', 'caramel'],
    response: {
      de: 'Du stehst auf Süßes! Der **{coffee}** ist genau richtig – {description}',
      en: 'You have a sweet tooth! The **{coffee}** is perfect – {description}'
    },
    coffeeIds: ['mocha', 'karamellsupernova', 'schokoseele', 'cafebombon']
  },
  milk: {
    keywords: ['milch', 'milk', 'cremig', 'creamy', 'latte', 'cappuccino', 'schaum', 'foam'],
    response: {
      de: 'Milchkaffee-Lover! Probier den **{coffee}** – {description}',
      en: 'Milk coffee lover! Try the **{coffee}** – {description}'
    },
    coffeeIds: ['cappuccino', 'flatwhite', 'latte', 'cortado']
  },
  strong: {
    keywords: ['stark', 'strong', 'kräftig', 'bold', 'intensiv', 'intense', 'bitter'],
    response: {
      de: 'Du magst es stark! Der **{coffee}** hat ordentlich Wumms – {description}',
      en: 'You like it strong! The **{coffee}** packs a punch – {description}'
    },
    coffeeIds: ['ristretto', 'doppio', 'vulkanausbruch', 'espresso']
  },
  special: {
    keywords: ['besonder', 'special', 'ausgefallen', 'crazy', 'verrückt', 'neu', 'new', 'überrasch'],
    response: {
      de: 'Du willst was Besonderes! Probier den **{coffee}** – {description} Das ist echt außergewöhnlich!',
      en: 'You want something special! Try the **{coffee}** – {description} It\'s truly extraordinary!'
    },
    coffeeIds: ['vulkanausbruch', 'nordlicht', 'einhornlatte', 'berlinernacht', 'goldenerdrache']
  },
  cold: {
    keywords: ['kalt', 'cold', 'eis', 'ice', 'erfrisch', 'refresh', 'sommer', 'summer'],
    response: {
      de: 'Erfrischung gefällig! Der **{coffee}** ist perfekt bei warmem Wetter – {description}',
      en: 'Refreshment incoming! The **{coffee}** is perfect for warm weather – {description}'
    },
    coffeeIds: ['frappe', 'nordlicht', 'affogato']
  },
  default: {
    response: {
      de: 'Hmm, wie wäre es mit einem **{coffee}**? {description} Ein echter Klassiker!',
      en: 'Hmm, how about a **{coffee}**? {description} A true classic!'
    },
    coffeeIds: ['cappuccino', 'espresso', 'latte', 'americano']
  }
};

function findMatchingCategory(message) {
  const lowerMessage = message.toLowerCase();

  for (const [category, data] of Object.entries(baristaResponses)) {
    if (category === 'greetings' || category === 'default') continue;
    if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return category;
    }
  }
  return 'default';
}

function generateResponse(message, lang) {
  const category = findMatchingCategory(message);
  const data = baristaResponses[category] || baristaResponses.default;

  // Pick random coffee from recommendations
  const coffeeId = data.coffeeIds[Math.floor(Math.random() * data.coffeeIds.length)];
  const coffee = coffees.find(c => c.id === coffeeId) || coffees[0];

  let response = data.response[lang];
  response = response.replace('{coffee}', coffee.name[lang]);
  response = response.replace('{description}', coffee.description[lang]);

  return { text: response, coffeeId };
}

export default function AiBarista({ isOpen, onClose, onSelectCoffee, lang }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const labels = {
    de: {
      title: 'KI-Barista',
      placeholder: 'Schreib mir...',
      showCoffee: 'Zeig mir diesen Kaffee',
      suggestions: ['Ich bin müde', 'Etwas Süßes', 'Überrasch mich!', 'Kalt & erfrischend']
    },
    en: {
      title: 'AI Barista',
      placeholder: 'Type a message...',
      showCoffee: 'Show me this coffee',
      suggestions: ['I\'m tired', 'Something sweet', 'Surprise me!', 'Cold & refreshing']
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

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const { text: responseText, coffeeId } = generateResponse(text, lang);
      setMessages(prev => [...prev, { role: 'ai', text: responseText, coffeeId }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleCoffeeClick = (coffeeId) => {
    const coffee = coffees.find(c => c.id === coffeeId);
    if (coffee) {
      onSelectCoffee(coffee);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp border border-amber-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-white text-lg shadow">
              🤖
            </div>
            <div>
              <h2 className="font-semibold text-stone-800">{l.title}</h2>
              <span className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-amber-100 text-stone-500 hover:text-stone-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-amber-50/30">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user' ? 'chat-bubble-user-light' : 'chat-bubble-ai-light'
              }`}>
                <p className={`text-sm ${msg.role === 'user' ? 'text-white' : 'text-stone-700'}`}>
                  {msg.text.split('**').map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className="text-gold">{part}</strong> : part
                  )}
                </p>
                {msg.coffeeId && (
                  <button
                    onClick={() => handleCoffeeClick(msg.coffeeId)}
                    className="mt-2 text-xs btn-gold px-3 py-1.5 rounded-full"
                  >
                    {l.showCoffee} →
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="chat-bubble-ai-light rounded-2xl">
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
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
          {l.suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSend(suggestion)}
              className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-amber-200 text-stone-600 hover:border-gold hover:text-gold hover:bg-amber-50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={l.placeholder}
              className="flex-1 px-4 py-3 bg-white rounded-xl text-stone-700 placeholder-stone-400 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`px-4 rounded-xl transition-all ${
                input.trim()
                  ? 'btn-gold'
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
