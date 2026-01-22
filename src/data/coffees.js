export const coffees = [
  // === KLASSIKER ===
  {
    id: 'espresso',
    name: { de: 'Espresso', en: 'Espresso' },
    layers: [{ type: 'espresso', ratio: 100 }],
    category: 'pure',
    description: {
      de: 'Der pure Klassiker - intensiv und aromatisch',
      en: 'The pure classic - intense and aromatic'
    }
  },
  {
    id: 'doppio',
    name: { de: 'Doppio', en: 'Doppio' },
    layers: [{ type: 'espresso', ratio: 100 }],
    category: 'pure',
    note: '2x',
    description: {
      de: 'Doppelter Espresso für doppelte Power',
      en: 'Double espresso for double power'
    }
  },
  {
    id: 'ristretto',
    name: { de: 'Ristretto', en: 'Ristretto' },
    layers: [{ type: 'espresso', ratio: 100 }],
    category: 'pure',
    note: 'kurz',
    description: {
      de: 'Kurz und knackig - maximale Intensität',
      en: 'Short and punchy - maximum intensity'
    }
  },
  {
    id: 'lungo',
    name: { de: 'Lungo', en: 'Lungo' },
    layers: [{ type: 'espresso', ratio: 40 }, { type: 'water', ratio: 60 }],
    category: 'pure',
    description: {
      de: 'Verlängerter Espresso, milder im Geschmack',
      en: 'Extended espresso, milder in taste'
    }
  },
  {
    id: 'americano',
    name: { de: 'Americano', en: 'Americano' },
    layers: [{ type: 'espresso', ratio: 30 }, { type: 'water', ratio: 70 }],
    category: 'pure',
    description: {
      de: 'Espresso trifft heißes Wasser',
      en: 'Espresso meets hot water'
    }
  },
  {
    id: 'longblack',
    name: { de: 'Long Black', en: 'Long Black' },
    layers: [{ type: 'water', ratio: 60 }, { type: 'espresso', ratio: 40 }],
    category: 'pure',
    description: {
      de: 'Australischer Americano mit Crema',
      en: 'Australian Americano with crema'
    }
  },
  {
    id: 'macchiato',
    name: { de: 'Macchiato', en: 'Macchiato' },
    layers: [{ type: 'espresso', ratio: 80 }, { type: 'foam', ratio: 20 }],
    category: 'milk',
    description: {
      de: 'Espresso mit einem Hauch Milchschaum',
      en: 'Espresso with a touch of milk foam'
    }
  },
  {
    id: 'cortado',
    name: { de: 'Cortado', en: 'Cortado' },
    layers: [{ type: 'espresso', ratio: 50 }, { type: 'steamed', ratio: 50 }],
    category: 'milk',
    description: {
      de: 'Perfekte Balance aus Espresso und Milch',
      en: 'Perfect balance of espresso and milk'
    }
  },
  {
    id: 'piccolo',
    name: { de: 'Piccolo', en: 'Piccolo' },
    layers: [{ type: 'espresso', ratio: 40 }, { type: 'steamed', ratio: 50 }, { type: 'foam', ratio: 10 }],
    category: 'milk',
    description: {
      de: 'Kleiner Latte mit großem Geschmack',
      en: 'Small latte with big taste'
    }
  },
  {
    id: 'flatwhite',
    name: { de: 'Flat White', en: 'Flat White' },
    layers: [{ type: 'espresso', ratio: 35 }, { type: 'steamed', ratio: 60 }, { type: 'microfoam', ratio: 5 }],
    category: 'milk',
    description: {
      de: 'Samtig-cremig mit Mikroschaum',
      en: 'Velvety smooth with microfoam'
    }
  },
  {
    id: 'cappuccino',
    name: { de: 'Cappuccino', en: 'Cappuccino' },
    layers: [{ type: 'espresso', ratio: 33 }, { type: 'steamed', ratio: 33 }, { type: 'foam', ratio: 34 }],
    category: 'milk',
    description: {
      de: 'Der italienische Frühstücksklassiker',
      en: 'The Italian breakfast classic'
    }
  },
  {
    id: 'latte',
    name: { de: 'Latte', en: 'Latte' },
    layers: [{ type: 'espresso', ratio: 20 }, { type: 'steamed', ratio: 70 }, { type: 'foam', ratio: 10 }],
    category: 'milk',
    description: {
      de: 'Viel Milch, sanfter Kaffeegeschmack',
      en: 'Lots of milk, gentle coffee taste'
    }
  },
  {
    id: 'lattemacchiato',
    name: { de: 'Latte Macchiato', en: 'Latte Macchiato' },
    layers: [{ type: 'steamed', ratio: 60 }, { type: 'espresso', ratio: 25 }, { type: 'foam', ratio: 15 }],
    category: 'milk',
    description: {
      de: 'Geschichtete Schönheit im Glas',
      en: 'Layered beauty in a glass'
    }
  },
  {
    id: 'mocha',
    name: { de: 'Mocha', en: 'Mocha' },
    layers: [{ type: 'chocolate', ratio: 15 }, { type: 'espresso', ratio: 25 }, { type: 'steamed', ratio: 50 }, { type: 'cream', ratio: 10 }],
    category: 'special',
    description: {
      de: 'Wenn Kaffee auf Schokolade trifft',
      en: 'When coffee meets chocolate'
    }
  },
  {
    id: 'affogato',
    name: { de: 'Affogato', en: 'Affogato' },
    layers: [{ type: 'icecream', ratio: 60 }, { type: 'espresso', ratio: 40 }],
    category: 'special',
    description: {
      de: 'Heißer Espresso über kaltem Eis - Dessert!',
      en: 'Hot espresso over cold ice cream - dessert!'
    }
  },
  {
    id: 'irishcoffee',
    name: { de: 'Irish Coffee', en: 'Irish Coffee' },
    layers: [{ type: 'whiskey', ratio: 15 }, { type: 'espresso', ratio: 35 }, { type: 'cream', ratio: 50 }],
    category: 'special',
    description: {
      de: 'Mit einem Schuss irischer Wärme',
      en: 'With a shot of Irish warmth'
    }
  },
  {
    id: 'vienna',
    name: { de: 'Vienna', en: 'Vienna' },
    layers: [{ type: 'espresso', ratio: 50 }, { type: 'cream', ratio: 50 }],
    category: 'special',
    description: {
      de: 'Wiener Eleganz mit Sahnehaube',
      en: 'Viennese elegance with whipped cream'
    }
  },
  {
    id: 'conpanna',
    name: { de: 'Con Panna', en: 'Con Panna' },
    layers: [{ type: 'espresso', ratio: 70 }, { type: 'cream', ratio: 30 }],
    category: 'special',
    description: {
      de: 'Espresso mit Sahne-Krone',
      en: 'Espresso with cream crown'
    }
  },
  {
    id: 'breve',
    name: { de: 'Breve', en: 'Breve' },
    layers: [{ type: 'espresso', ratio: 25 }, { type: 'halfhalf', ratio: 65 }, { type: 'foam', ratio: 10 }],
    category: 'milk',
    description: {
      de: 'Amerikanisch cremig mit Half & Half',
      en: 'American creamy with half & half'
    }
  },
  {
    id: 'redeye',
    name: { de: 'Red Eye', en: 'Red Eye' },
    layers: [{ type: 'drip', ratio: 70 }, { type: 'espresso', ratio: 30 }],
    category: 'pure',
    description: {
      de: 'Filterkaffee + Espresso = Wachmacher',
      en: 'Drip coffee + espresso = wake-up call'
    }
  },
  {
    id: 'blackeye',
    name: { de: 'Black Eye', en: 'Black Eye' },
    layers: [{ type: 'drip', ratio: 60 }, { type: 'espresso', ratio: 40 }],
    category: 'pure',
    note: '2x',
    description: {
      de: 'Doppelt hält besser - maximales Koffein',
      en: 'Double shot - maximum caffeine'
    }
  },
  {
    id: 'dirtychai',
    name: { de: 'Dirty Chai', en: 'Dirty Chai' },
    layers: [{ type: 'chai', ratio: 70 }, { type: 'espresso', ratio: 30 }],
    category: 'special',
    description: {
      de: 'Chai mit einem Espresso-Kick',
      en: 'Chai with an espresso kick'
    }
  },
  {
    id: 'cafebombon',
    name: { de: 'Café Bombón', en: 'Café Bombón' },
    layers: [{ type: 'condensed', ratio: 50 }, { type: 'espresso', ratio: 50 }],
    category: 'special',
    description: {
      de: 'Spanisch süß mit Kondensmilch',
      en: 'Spanish sweet with condensed milk'
    }
  },
  {
    id: 'galao',
    name: { de: 'Galão', en: 'Galão' },
    layers: [{ type: 'espresso', ratio: 25 }, { type: 'steamed', ratio: 75 }],
    category: 'milk',
    description: {
      de: 'Portugiesischer Milchkaffee',
      en: 'Portuguese milk coffee'
    }
  },
  {
    id: 'frappe',
    name: { de: 'Frappé', en: 'Frappé' },
    layers: [{ type: 'ice', ratio: 40 }, { type: 'espresso', ratio: 30 }, { type: 'milk', ratio: 20 }, { type: 'foam', ratio: 10 }],
    category: 'special',
    description: {
      de: 'Griechische Erfrischung auf Eis',
      en: 'Greek refreshment on ice'
    }
  },

  // === ENTKOFFEINIERT ===
  {
    id: 'sanftermorgen',
    name: { de: 'Sanfter Morgen', en: 'Gentle Morning' },
    layers: [{ type: 'decaf', ratio: 33 }, { type: 'steamed', ratio: 33 }, { type: 'foam', ratio: 34 }],
    category: 'decaf',
    description: {
      de: 'Cappuccino ohne Koffein, voller Genuss',
      en: 'Cappuccino without caffeine, full enjoyment'
    }
  },
  {
    id: 'traumwolke',
    name: { de: 'Traumwolke', en: 'Dream Cloud' },
    layers: [{ type: 'decaf', ratio: 25 }, { type: 'vanilla', ratio: 10 }, { type: 'steamed', ratio: 45 }, { type: 'foam', ratio: 20 }],
    category: 'decaf',
    description: {
      de: 'Fluffig, vanillig und schlaffreundlich',
      en: 'Fluffy, vanilla and sleep-friendly'
    }
  },
  {
    id: 'nachtruhe',
    name: { de: 'Nachtruhe', en: 'Night Rest' },
    layers: [{ type: 'decaf', ratio: 20 }, { type: 'chamomile', ratio: 15 }, { type: 'steamed', ratio: 50 }, { type: 'honey', ratio: 15 }],
    category: 'decaf',
    description: {
      de: 'Mit Kamille und Honig in süße Träume',
      en: 'With chamomile and honey into sweet dreams'
    }
  },
  {
    id: 'schokoseele',
    name: { de: 'Schoko-Seele', en: 'Choco Soul' },
    layers: [{ type: 'chocolate', ratio: 20 }, { type: 'decaf', ratio: 25 }, { type: 'steamed', ratio: 40 }, { type: 'hazelnut', ratio: 15 }],
    category: 'decaf',
    description: {
      de: 'Schokoladig-nussig ohne Aufputsch',
      en: 'Chocolatey-nutty without the buzz'
    }
  },

  // === FANTASIE-KREATIONEN ===
  {
    id: 'mitternachtstraumer',
    name: { de: 'Mitternachtsträumer', en: 'Midnight Dreamer' },
    layers: [{ type: 'decaf', ratio: 25 }, { type: 'lavender', ratio: 10 }, { type: 'oat', ratio: 50 }, { type: 'honey', ratio: 15 }],
    category: 'crazy',
    graphic: 'ghost',
    description: {
      de: 'Lavendel trifft Hafermilch - entspannend und verträumt',
      en: 'Lavender meets oat milk - relaxing and dreamy'
    }
  },
  {
    id: 'polarfuchs',
    name: { de: 'Polarfuchs', en: 'Arctic Fox' },
    layers: [{ type: 'espresso', ratio: 25 }, { type: 'whitechoc', ratio: 15 }, { type: 'coconut', ratio: 45 }, { type: 'mint', ratio: 15 }],
    category: 'crazy',
    graphic: 'fox',
    description: {
      de: 'Eisig-minzig mit weißer Schokolade',
      en: 'Icy-minty with white chocolate'
    }
  },
  {
    id: 'vulkanausbruch',
    name: { de: 'Vulkanausbruch', en: 'Volcanic Eruption' },
    layers: [{ type: 'espresso', ratio: 35 }, { type: 'chili', ratio: 10 }, { type: 'chocolate', ratio: 25 }, { type: 'cream', ratio: 30 }],
    category: 'crazy',
    note: '🔥',
    graphic: 'volcano',
    description: {
      de: 'Doppelt Espresso mit Chili-Kick - Vorsicht heiß!',
      en: 'Double espresso with chili kick - caution hot!'
    }
  },
  {
    id: 'einhornlatte',
    name: { de: 'Einhorn Latte', en: 'Unicorn Latte' },
    layers: [{ type: 'decaf', ratio: 20 }, { type: 'butterfly', ratio: 15 }, { type: 'vanilla', ratio: 10 }, { type: 'steamed', ratio: 40 }, { type: 'foam', ratio: 15 }],
    category: 'crazy',
    graphic: 'unicorn',
    description: {
      de: 'Magisch lila mit Butterfly Pea Flower',
      en: 'Magically purple with butterfly pea flower'
    }
  },
  {
    id: 'berlinernacht',
    name: { de: 'Berliner Nacht', en: 'Berlin Night' },
    layers: [{ type: 'coldbrew', ratio: 35 }, { type: 'charcoal', ratio: 10 }, { type: 'oat', ratio: 40 }, { type: 'maple', ratio: 15 }],
    category: 'crazy',
    graphic: 'ghost',
    description: {
      de: 'Dunkel wie die Nacht, süß wie Berlin',
      en: 'Dark as night, sweet as Berlin'
    }
  },
  {
    id: 'goldenerdrache',
    name: { de: 'Goldener Drache', en: 'Golden Dragon' },
    layers: [{ type: 'espresso', ratio: 30 }, { type: 'turmeric', ratio: 10 }, { type: 'ginger', ratio: 10 }, { type: 'coconut', ratio: 40 }, { type: 'honey', ratio: 10 }],
    category: 'crazy',
    graphic: 'dragon',
    description: {
      de: 'Kurkuma-Ingwer Power aus Fernost',
      en: 'Turmeric-ginger power from the Far East'
    }
  },
  {
    id: 'nebelwald',
    name: { de: 'Nebelwald', en: 'Misty Forest' },
    layers: [{ type: 'matcha', ratio: 30 }, { type: 'espresso', ratio: 20 }, { type: 'almond', ratio: 40 }, { type: 'foam', ratio: 10 }],
    category: 'crazy',
    graphic: 'mushroom',
    description: {
      de: 'Matcha trifft Espresso - grün und stark',
      en: 'Matcha meets espresso - green and strong'
    }
  },
  {
    id: 'karamellsupernova',
    name: { de: 'Karamell-Supernova', en: 'Caramel Supernova' },
    layers: [{ type: 'espresso', ratio: 30 }, { type: 'caramel', ratio: 20 }, { type: 'mascarpone', ratio: 35 }, { type: 'foam', ratio: 15 }],
    category: 'crazy',
    graphic: 'explosion',
    description: {
      de: 'Salzkaramell mit Mascarpone-Explosion',
      en: 'Salted caramel with mascarpone explosion'
    }
  },
  {
    id: 'zimtzeitreise',
    name: { de: 'Zimt-Zeitreise', en: 'Cinnamon Time Travel' },
    layers: [{ type: 'decaf', ratio: 25 }, { type: 'cinnamon', ratio: 15 }, { type: 'cardamom', ratio: 10 }, { type: 'condensed', ratio: 50 }],
    category: 'crazy',
    graphic: 'wizard',
    description: {
      de: 'Ceylon-Zimt und Kardamom wie bei Oma',
      en: 'Ceylon cinnamon and cardamom like grandma\'s'
    }
  },
  {
    id: 'nordlicht',
    name: { de: 'Nordlicht', en: 'Northern Lights' },
    layers: [{ type: 'coldbrew', ratio: 30 }, { type: 'bluecuracao', ratio: 15 }, { type: 'tonic', ratio: 40 }, { type: 'lemon', ratio: 15 }],
    category: 'crazy',
    graphic: 'alien',
    description: {
      de: 'Schimmernder Cold Brew Tonic - Instagram-ready',
      en: 'Shimmering cold brew tonic - Instagram-ready'
    }
  },
  {
    id: 'samuraisunrise',
    name: { de: 'Samurai Sunrise', en: 'Samurai Sunrise' },
    layers: [{ type: 'matcha', ratio: 35 }, { type: 'vanilla', ratio: 10 }, { type: 'oat', ratio: 45 }, { type: 'honey', ratio: 10 }],
    category: 'crazy',
    graphic: 'panda',
    description: {
      de: 'Japanischer Matcha mit Vanille-Harmonie',
      en: 'Japanese matcha with vanilla harmony'
    }
  },
  {
    id: 'marsexplorer',
    name: { de: 'Mars Explorer', en: 'Mars Explorer' },
    layers: [{ type: 'espresso', ratio: 35 }, { type: 'caramel', ratio: 15 }, { type: 'chocolate', ratio: 20 }, { type: 'almond', ratio: 30 }],
    category: 'crazy',
    note: '🚀',
    graphic: 'alien',
    description: {
      de: 'Wie ein Schokoriegel in Kaffeeform',
      en: 'Like a candy bar in coffee form'
    }
  },

  // === NEUE VERRÜCKTE KREATIONEN ===
  {
    id: 'kuschelkatze',
    name: { de: 'Kuschel-Katze', en: 'Cozy Cat' },
    layers: [{ type: 'espresso', ratio: 25 }, { type: 'honey', ratio: 10 }, { type: 'steamed', ratio: 50 }, { type: 'foam', ratio: 15 }],
    category: 'crazy',
    graphic: 'cat',
    note: '😺',
    description: {
      de: 'Warm und kuschelig wie eine schnurrende Katze',
      en: 'Warm and cozy like a purring cat'
    }
  },
  {
    id: 'faultiertag',
    name: { de: 'Faultier-Tag', en: 'Sloth Day' },
    layers: [{ type: 'decaf', ratio: 30 }, { type: 'vanilla', ratio: 15 }, { type: 'oat', ratio: 45 }, { type: 'foam', ratio: 10 }],
    category: 'decaf',
    graphic: 'sloth',
    note: '🦥',
    description: {
      de: 'Für Tage, an denen man einfach abhängen will',
      en: 'For days when you just want to hang around'
    }
  },
  {
    id: 'honigbiene',
    name: { de: 'Fleißige Biene', en: 'Busy Bee' },
    layers: [{ type: 'espresso', ratio: 30 }, { type: 'honey', ratio: 20 }, { type: 'lavender', ratio: 10 }, { type: 'steamed', ratio: 40 }],
    category: 'crazy',
    graphic: 'bee',
    note: '🐝',
    description: {
      de: 'Honig-Lavendel Power für fleißige Menschen',
      en: 'Honey-lavender power for busy people'
    }
  },
  {
    id: 'regenwolke',
    name: { de: 'Regenwolke', en: 'Rain Cloud' },
    layers: [{ type: 'coldbrew', ratio: 35 }, { type: 'vanilla', ratio: 10 }, { type: 'steamed', ratio: 40 }, { type: 'foam', ratio: 15 }],
    category: 'crazy',
    graphic: 'cloud',
    note: '🌧️',
    description: {
      de: 'Perfekt für gemütliche Regentage',
      en: 'Perfect for cozy rainy days'
    }
  },
  {
    id: 'bambuspanda',
    name: { de: 'Bambus-Panda', en: 'Bamboo Panda' },
    layers: [{ type: 'matcha', ratio: 35 }, { type: 'coconut', ratio: 30 }, { type: 'vanilla', ratio: 10 }, { type: 'foam', ratio: 25 }],
    category: 'crazy',
    graphic: 'panda',
    note: '🐼',
    description: {
      de: 'Matcha-Traum aus dem Bambuswald',
      en: 'Matcha dream from the bamboo forest'
    }
  },
  {
    id: 'tintenfisch',
    name: { de: 'Tinten-Twist', en: 'Inky Twist' },
    layers: [{ type: 'espresso', ratio: 30 }, { type: 'charcoal', ratio: 10 }, { type: 'coconut', ratio: 35 }, { type: 'blacksesame', ratio: 15 }, { type: 'foam', ratio: 10 }],
    category: 'crazy',
    graphic: 'octopus',
    note: '🐙',
    description: {
      de: 'Dunkel und geheimnisvoll aus der Tiefsee',
      en: 'Dark and mysterious from the deep sea'
    }
  },
  {
    id: 'regenbogentraum',
    name: { de: 'Regenbogen-Traum', en: 'Rainbow Dream' },
    layers: [{ type: 'decaf', ratio: 20 }, { type: 'butterfly', ratio: 15 }, { type: 'rose', ratio: 10 }, { type: 'oat', ratio: 40 }, { type: 'foam', ratio: 15 }],
    category: 'crazy',
    graphic: 'rainbow',
    note: '🌈',
    description: {
      de: 'Bunt wie ein Regenbogen nach dem Regen',
      en: 'Colorful like a rainbow after the rain'
    }
  },
  {
    id: 'waldpilz',
    name: { de: 'Magischer Pilz', en: 'Magic Mushroom' },
    layers: [{ type: 'espresso', ratio: 25 }, { type: 'miso', ratio: 10 }, { type: 'maple', ratio: 10 }, { type: 'oat', ratio: 45 }, { type: 'foam', ratio: 10 }],
    category: 'crazy',
    graphic: 'mushroom',
    note: '🍄',
    description: {
      de: 'Umami-Trip durch den Zauberwald',
      en: 'Umami trip through the enchanted forest'
    }
  },
  {
    id: 'persischerprinz',
    name: { de: 'Persischer Prinz', en: 'Persian Prince' },
    layers: [{ type: 'espresso', ratio: 25 }, { type: 'rose', ratio: 15 }, { type: 'pistachio', ratio: 15 }, { type: 'steamed', ratio: 35 }, { type: 'foam', ratio: 10 }],
    category: 'crazy',
    graphic: 'wizard',
    description: {
      de: 'Orientalische Magie mit Rose und Pistazie',
      en: 'Oriental magic with rose and pistachio'
    }
  },
  {
    id: 'tokyodrift',
    name: { de: 'Tokyo Drift', en: 'Tokyo Drift' },
    layers: [{ type: 'espresso', ratio: 25 }, { type: 'blacksesame', ratio: 15 }, { type: 'condensed', ratio: 20 }, { type: 'oat', ratio: 35 }, { type: 'foam', ratio: 5 }],
    category: 'crazy',
    graphic: 'panda',
    note: '🗼',
    description: {
      de: 'Schwarzer Sesam trifft japanische Perfektion',
      en: 'Black sesame meets Japanese perfection'
    }
  },
  {
    id: 'erdnusstraum',
    name: { de: 'Erdnuss-Traum', en: 'Peanut Dream' },
    layers: [{ type: 'espresso', ratio: 30 }, { type: 'peanut', ratio: 20 }, { type: 'banana', ratio: 15 }, { type: 'oat', ratio: 30 }, { type: 'foam', ratio: 5 }],
    category: 'crazy',
    graphic: 'sloth',
    description: {
      de: 'Wie Erdnussbutter-Sandwich zum Trinken',
      en: 'Like a drinkable peanut butter sandwich'
    }
  },
  {
    id: 'mediterraneo',
    name: { de: 'Mediterraneo', en: 'Mediterraneo' },
    layers: [{ type: 'espresso', ratio: 35 }, { type: 'olive', ratio: 10 }, { type: 'orange', ratio: 10 }, { type: 'steamed', ratio: 40 }, { type: 'foam', ratio: 5 }],
    category: 'crazy',
    graphic: 'mermaid',
    description: {
      de: 'Olivenöl-Espresso aus dem Mittelmeer',
      en: 'Olive oil espresso from the Mediterranean'
    }
  },
  {
    id: 'himbeerwolke',
    name: { de: 'Himbeer-Wolke', en: 'Raspberry Cloud' },
    layers: [{ type: 'decaf', ratio: 25 }, { type: 'raspberry', ratio: 20 }, { type: 'whitechoc', ratio: 15 }, { type: 'oat', ratio: 30 }, { type: 'foam', ratio: 10 }],
    category: 'decaf',
    graphic: 'cloud',
    note: '☁️',
    description: {
      de: 'Rosa Wolken zum Träumen',
      en: 'Pink clouds for dreaming'
    }
  },
  {
    id: 'avocadoengel',
    name: { de: 'Avocado-Engel', en: 'Avocado Angel' },
    layers: [{ type: 'espresso', ratio: 25 }, { type: 'avocado', ratio: 25 }, { type: 'honey', ratio: 10 }, { type: 'oat', ratio: 35 }, { type: 'foam', ratio: 5 }],
    category: 'crazy',
    graphic: 'sloth',
    note: '🥑',
    description: {
      de: 'Ja, wirklich! Cremig und überraschend lecker',
      en: 'Yes, really! Creamy and surprisingly delicious'
    }
  },
  {
    id: 'taropurpur',
    name: { de: 'Taro Purpur', en: 'Taro Purple' },
    layers: [{ type: 'espresso', ratio: 20 }, { type: 'taro', ratio: 25 }, { type: 'coconut', ratio: 35 }, { type: 'condensed', ratio: 15 }, { type: 'foam', ratio: 5 }],
    category: 'crazy',
    graphic: 'unicorn',
    note: '💜',
    description: {
      de: 'Lila wie der Sonnenuntergang auf Bali',
      en: 'Purple like a Bali sunset'
    }
  },
  {
    id: 'halloweenhorror',
    name: { de: 'Halloween Horror', en: 'Halloween Horror' },
    layers: [{ type: 'espresso', ratio: 30 }, { type: 'pumpkin', ratio: 20 }, { type: 'cinnamon', ratio: 10 }, { type: 'oat', ratio: 30 }, { type: 'cream', ratio: 10 }],
    category: 'crazy',
    graphic: 'ghost',
    note: '🎃',
    description: {
      de: 'Pumpkin Spice für Grusel-Fans',
      en: 'Pumpkin spice for spooky fans'
    }
  },
  {
    id: 'tahinizauber',
    name: { de: 'Tahini-Zauber', en: 'Tahini Magic' },
    layers: [{ type: 'espresso', ratio: 30 }, { type: 'tahini', ratio: 20 }, { type: 'honey', ratio: 10 }, { type: 'oat', ratio: 35 }, { type: 'foam', ratio: 5 }],
    category: 'crazy',
    graphic: 'wizard',
    description: {
      de: 'Sesampaste trifft Kaffee - total abgefahren',
      en: 'Sesame paste meets coffee - totally wild'
    }
  },
  {
    id: 'drachenatem',
    name: { de: 'Drachenatem', en: 'Dragon Breath' },
    layers: [{ type: 'espresso', ratio: 35 }, { type: 'chili', ratio: 15 }, { type: 'ginger', ratio: 10 }, { type: 'coconut', ratio: 30 }, { type: 'honey', ratio: 10 }],
    category: 'crazy',
    graphic: 'dragon',
    note: '🐲',
    description: {
      de: 'Schärfe und Ingwer für mutige Krieger',
      en: 'Heat and ginger for brave warriors'
    }
  },
];

export const categories = {
  de: {
    all: 'Alle',
    pure: 'Pur',
    milk: 'Mit Milch',
    special: 'Spezial',
    decaf: 'Entkoffeiniert',
    crazy: 'Verrückt',
  },
  en: {
    all: 'All',
    pure: 'Pure',
    milk: 'With Milk',
    special: 'Special',
    decaf: 'Decaf',
    crazy: 'Crazy',
  },
};
