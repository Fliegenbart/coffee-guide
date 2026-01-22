export const sirups = [
  {
    id: 'vanilla-sirup',
    name: { de: 'Vanille Sirup', en: 'Vanilla Syrup' },
    price: 6.90,
    size: '250ml',
    forCoffees: ['latte', 'cappuccino', 'traumwolke', 'einhornlatte', 'samuraisunrise']
  },
  {
    id: 'caramel-sirup',
    name: { de: 'Karamell Sirup', en: 'Caramel Syrup' },
    price: 6.90,
    size: '250ml',
    forCoffees: ['latte', 'macchiato', 'karamellsupernova', 'marsexplorer']
  },
  {
    id: 'hazelnut-sirup',
    name: { de: 'Haselnuss Sirup', en: 'Hazelnut Syrup' },
    price: 6.90,
    size: '250ml',
    forCoffees: ['latte', 'mocha', 'schokoseele']
  },
  {
    id: 'chili-sirup',
    name: { de: 'Chili Sirup', en: 'Chili Syrup' },
    price: 7.90,
    size: '250ml',
    forCoffees: ['vulkanausbruch']
  },
  {
    id: 'lavender-sirup',
    name: { de: 'Lavendel Sirup', en: 'Lavender Syrup' },
    price: 8.90,
    size: '250ml',
    forCoffees: ['mitternachtstraumer']
  },
  {
    id: 'mint-sirup',
    name: { de: 'Minz Sirup', en: 'Mint Syrup' },
    price: 6.90,
    size: '250ml',
    forCoffees: ['polarfuchs']
  },
  {
    id: 'cinnamon-sirup',
    name: { de: 'Zimt Sirup', en: 'Cinnamon Syrup' },
    price: 6.90,
    size: '250ml',
    forCoffees: ['zimtzeitreise', 'chai']
  },
  {
    id: 'maple-sirup',
    name: { de: 'Ahornsirup', en: 'Maple Syrup' },
    price: 9.90,
    size: '250ml',
    forCoffees: ['berlinernacht']
  }
];

export const accessories = [
  {
    id: 'milk-frother',
    name: { de: 'Milchaufschäumer', en: 'Milk Frother' },
    description: {
      de: 'Elektrischer Milchaufschäumer für perfekten Schaum',
      en: 'Electric milk frother for perfect foam'
    },
    price: 34.90,
    forCoffees: ['cappuccino', 'latte', 'flatwhite', 'macchiato']
  },
  {
    id: 'french-press',
    name: { de: 'French Press', en: 'French Press' },
    description: {
      de: 'Klassische French Press aus Borosilikatglas (600ml)',
      en: 'Classic French press made of borosilicate glass (600ml)'
    },
    price: 29.90,
    forCoffees: ['americano', 'lungo']
  },
  {
    id: 'pour-over',
    name: { de: 'Pour Over Set', en: 'Pour Over Set' },
    description: {
      de: 'Handfilter mit Karaffe und 50 Filtern',
      en: 'Hand filter with carafe and 50 filters'
    },
    price: 39.90,
    forCoffees: ['drip', 'redeye', 'blackeye']
  },
  {
    id: 'cold-brew-maker',
    name: { de: 'Cold Brew Maker', en: 'Cold Brew Maker' },
    description: {
      de: 'Cold Brew Karaffe mit Edelstahlfilter (1L)',
      en: 'Cold brew carafe with stainless steel filter (1L)'
    },
    price: 24.90,
    forCoffees: ['frappe', 'berlinernacht', 'nordlicht']
  },
  {
    id: 'espresso-cups',
    name: { de: 'Espresso Tassen Set', en: 'Espresso Cup Set' },
    description: {
      de: '4 doppelwandige Espressotassen (80ml)',
      en: '4 double-walled espresso cups (80ml)'
    },
    price: 24.90,
    forCoffees: ['espresso', 'doppio', 'ristretto', 'macchiato']
  },
  {
    id: 'latte-glasses',
    name: { de: 'Latte Gläser Set', en: 'Latte Glass Set' },
    description: {
      de: '2 doppelwandige Latte Gläser (350ml)',
      en: '2 double-walled latte glasses (350ml)'
    },
    price: 19.90,
    forCoffees: ['latte', 'lattemacchiato', 'cappuccino']
  },
  {
    id: 'chocolate-drops',
    name: { de: 'Schokoladen Drops', en: 'Chocolate Drops' },
    description: {
      de: 'Belgische Schokoladen Drops zum Einrühren (200g)',
      en: 'Belgian chocolate drops for stirring in (200g)'
    },
    price: 8.90,
    forCoffees: ['mocha', 'vulkanausbruch', 'schokoseele', 'marsexplorer']
  },
  {
    id: 'whipped-cream-dispenser',
    name: { de: 'Sahne Spender', en: 'Whipped Cream Dispenser' },
    description: {
      de: 'Edelstahl Sahnespender (500ml) inkl. 3 Kapseln',
      en: 'Stainless steel cream dispenser (500ml) incl. 3 cartridges'
    },
    price: 44.90,
    forCoffees: ['vienna', 'conpanna', 'irishcoffee', 'mocha']
  }
];

// Mapping von Kaffee-IDs zu empfohlenem Zubehör
export const coffeeAccessoriesMapping = {
  espresso: ['espresso-cups'],
  doppio: ['espresso-cups'],
  ristretto: ['espresso-cups'],
  cappuccino: ['milk-frother', 'latte-glasses'],
  latte: ['milk-frother', 'latte-glasses'],
  flatwhite: ['milk-frother'],
  macchiato: ['milk-frother', 'espresso-cups'],
  mocha: ['milk-frother', 'chocolate-drops'],
  vienna: ['whipped-cream-dispenser', 'espresso-cups'],
  conpanna: ['whipped-cream-dispenser', 'espresso-cups'],
  irishcoffee: ['whipped-cream-dispenser'],
  frappe: ['cold-brew-maker'],
  berlinernacht: ['cold-brew-maker'],
  nordlicht: ['cold-brew-maker'],
  vulkanausbruch: ['chocolate-drops', 'espresso-cups'],
  schokoseele: ['chocolate-drops', 'milk-frother'],
  marsexplorer: ['chocolate-drops'],
  americano: ['french-press'],
  lungo: ['french-press'],
  redeye: ['pour-over'],
  blackeye: ['pour-over']
};

// Mapping von Kaffee-IDs zu empfohlenen Sirups
export const coffeeSirupsMapping = {
  latte: ['vanilla-sirup', 'caramel-sirup', 'hazelnut-sirup'],
  cappuccino: ['vanilla-sirup', 'caramel-sirup'],
  macchiato: ['caramel-sirup'],
  mocha: ['hazelnut-sirup'],
  traumwolke: ['vanilla-sirup'],
  einhornlatte: ['vanilla-sirup'],
  samuraisunrise: ['vanilla-sirup'],
  karamellsupernova: ['caramel-sirup'],
  marsexplorer: ['caramel-sirup'],
  schokoseele: ['hazelnut-sirup'],
  vulkanausbruch: ['chili-sirup'],
  mitternachtstraumer: ['lavender-sirup'],
  polarfuchs: ['mint-sirup'],
  zimtzeitreise: ['cinnamon-sirup'],
  berlinernacht: ['maple-sirup']
};
