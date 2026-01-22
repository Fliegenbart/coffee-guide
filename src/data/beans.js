export const beans = [
  {
    id: 'brazil-santos',
    name: { de: 'Brazil Santos', en: 'Brazil Santos' },
    roast: 'medium',
    intensity: 3,
    acidity: 2,
    flavor: {
      de: ['nussig', 'schokoladig', 'mild'],
      en: ['nutty', 'chocolatey', 'mild']
    },
    description: {
      de: 'Unser Klassiker aus dem Hochland von Santos. Perfekt für Milchkaffees.',
      en: 'Our classic from the Santos highlands. Perfect for milk coffees.'
    },
    origin: {
      country: { de: 'Brasilien', en: 'Brazil' },
      region: 'Santos',
      altitude: '1.100m',
      farmer: 'Fazenda Santa Maria',
      story: {
        de: 'Familie Santos bewirtschaftet diese Farm seit 4 Generationen.',
        en: 'The Santos family has been running this farm for 4 generations.'
      }
    },
    prices: {
      '250g': 12.90,
      '500g': 22.90,
      '1kg': 39.90
    },
    image: '/beans/brazil-santos.jpg',
    bestFor: ['cappuccino', 'latte', 'flatwhite', 'cortado']
  },
  {
    id: 'ethiopia-sidamo',
    name: { de: 'Ethiopia Sidamo', en: 'Ethiopia Sidamo' },
    roast: 'light',
    intensity: 2,
    acidity: 4,
    flavor: {
      de: ['fruchtig', 'blumig', 'zitrus'],
      en: ['fruity', 'floral', 'citrus']
    },
    description: {
      de: 'Elegante Aromen aus der Wiege des Kaffees. Fruchtig und komplex.',
      en: 'Elegant flavors from the birthplace of coffee. Fruity and complex.'
    },
    origin: {
      country: { de: 'Äthiopien', en: 'Ethiopia' },
      region: 'Sidamo',
      altitude: '1.900m',
      farmer: 'Kooperative Bekele',
      story: {
        de: 'Die Bekele-Kooperative vereint 300 Kleinbauern aus dem Sidamo-Hochland.',
        en: 'The Bekele cooperative unites 300 small farmers from the Sidamo highlands.'
      }
    },
    prices: {
      '250g': 14.90,
      '500g': 26.90,
      '1kg': 47.90
    },
    image: '/beans/ethiopia-sidamo.jpg',
    bestFor: ['espresso', 'americano', 'longblack', 'pourover']
  },
  {
    id: 'colombia-supremo',
    name: { de: 'Colombia Supremo', en: 'Colombia Supremo' },
    roast: 'medium',
    intensity: 3,
    acidity: 3,
    flavor: {
      de: ['karamell', 'nussig', 'ausgewogen'],
      en: ['caramel', 'nutty', 'balanced']
    },
    description: {
      de: 'Ausgewogener Allrounder aus den kolumbianischen Anden.',
      en: 'Balanced all-rounder from the Colombian Andes.'
    },
    origin: {
      country: { de: 'Kolumbien', en: 'Colombia' },
      region: 'Huila',
      altitude: '1.700m',
      farmer: 'Finca El Paraiso',
      story: {
        de: 'Juan Carlos führt die Finca mit innovativen, nachhaltigen Methoden.',
        en: 'Juan Carlos runs the finca with innovative, sustainable methods.'
      }
    },
    prices: {
      '250g': 13.90,
      '500g': 24.90,
      '1kg': 43.90
    },
    image: '/beans/colombia-supremo.jpg',
    bestFor: ['cappuccino', 'mocha', 'latte', 'macchiato']
  },
  {
    id: 'italian-espresso',
    name: { de: 'Italian Espresso Blend', en: 'Italian Espresso Blend' },
    roast: 'dark',
    intensity: 5,
    acidity: 1,
    flavor: {
      de: ['kräftig', 'schokoladig', 'rauchig'],
      en: ['bold', 'chocolatey', 'smoky']
    },
    description: {
      de: 'Unser kräftigster Blend - für echte Espresso-Liebhaber.',
      en: 'Our boldest blend - for true espresso lovers.'
    },
    origin: {
      country: { de: 'Blend', en: 'Blend' },
      region: 'Brasilien, Vietnam, Indien',
      altitude: 'Various',
      farmer: 'Mehrere Partner',
      story: {
        de: 'Traditionelle italienische Röstkunst mit ausgewählten Bohnen.',
        en: 'Traditional Italian roasting with selected beans.'
      }
    },
    prices: {
      '250g': 11.90,
      '500g': 20.90,
      '1kg': 36.90
    },
    image: '/beans/italian-espresso.jpg',
    bestFor: ['espresso', 'doppio', 'ristretto', 'redeye', 'blackeye']
  },
  {
    id: 'house-blend',
    name: { de: 'House Blend', en: 'House Blend' },
    roast: 'medium',
    intensity: 3,
    acidity: 2,
    flavor: {
      de: ['ausgewogen', 'schokoladig', 'nussig'],
      en: ['balanced', 'chocolatey', 'nutty']
    },
    description: {
      de: 'Unser Signature Blend - vielseitig und für jeden Tag.',
      en: 'Our signature blend - versatile and for every day.'
    },
    origin: {
      country: { de: 'Blend', en: 'Blend' },
      region: 'Brasilien, Kolumbien',
      altitude: 'Various',
      farmer: 'Partnerfarmen',
      story: {
        de: 'Sorgfältig komponiert für das perfekte Alltagserlebnis.',
        en: 'Carefully composed for the perfect everyday experience.'
      }
    },
    prices: {
      '250g': 10.90,
      '500g': 18.90,
      '1kg': 32.90
    },
    image: '/beans/house-blend.jpg',
    bestFor: ['all']
  },
  {
    id: 'decaf-swiss-water',
    name: { de: 'Decaf Swiss Water', en: 'Decaf Swiss Water' },
    roast: 'medium',
    intensity: 2,
    acidity: 2,
    flavor: {
      de: ['mild', 'schokoladig', 'weich'],
      en: ['mild', 'chocolatey', 'smooth']
    },
    description: {
      de: 'Schonend entkoffeiniert mit dem Swiss Water Verfahren. Voller Geschmack.',
      en: 'Gently decaffeinated with the Swiss Water process. Full flavor.'
    },
    origin: {
      country: { de: 'Kolumbien', en: 'Colombia' },
      region: 'Huila',
      altitude: '1.600m',
      farmer: 'Finca La Esperanza',
      story: {
        de: '100% chemiefreie Entkoffeinierung für puren Genuss.',
        en: '100% chemical-free decaffeination for pure enjoyment.'
      }
    },
    prices: {
      '250g': 14.90,
      '500g': 26.90,
      '1kg': 47.90
    },
    image: '/beans/decaf.jpg',
    bestFor: ['sanftermorgen', 'traumwolke', 'nachtruhe', 'schokoseele', 'decaf']
  },
  {
    id: 'cold-brew-special',
    name: { de: 'Cold Brew Special', en: 'Cold Brew Special' },
    roast: 'medium-light',
    intensity: 2,
    acidity: 3,
    flavor: {
      de: ['fruchtig', 'süß', 'erfrischend'],
      en: ['fruity', 'sweet', 'refreshing']
    },
    description: {
      de: 'Speziell für Cold Brew geröstet - fruchtig und erfrischend.',
      en: 'Specially roasted for cold brew - fruity and refreshing.'
    },
    origin: {
      country: { de: 'Guatemala', en: 'Guatemala' },
      region: 'Antigua',
      altitude: '1.500m',
      farmer: 'Finca El Injerto',
      story: {
        de: 'Preisgekrönte Bohnen aus dem vulkanischen Boden Antiguas.',
        en: 'Award-winning beans from the volcanic soil of Antigua.'
      }
    },
    prices: {
      '250g': 15.90,
      '500g': 28.90,
      '1kg': 51.90
    },
    image: '/beans/cold-brew.jpg',
    bestFor: ['frappe', 'berlinernacht', 'nordlicht', 'coldbrew']
  }
];

// Mapping von Kaffee-IDs zu empfohlenen Bohnen
export const coffeeBeansMapping = {
  // Klassiker - Pur
  espresso: ['italian-espresso', 'ethiopia-sidamo'],
  doppio: ['italian-espresso'],
  ristretto: ['italian-espresso'],
  lungo: ['house-blend', 'colombia-supremo'],
  americano: ['ethiopia-sidamo', 'house-blend'],
  longblack: ['ethiopia-sidamo'],
  redeye: ['italian-espresso', 'house-blend'],
  blackeye: ['italian-espresso'],

  // Mit Milch
  macchiato: ['italian-espresso', 'colombia-supremo'],
  cortado: ['brazil-santos', 'colombia-supremo'],
  piccolo: ['brazil-santos'],
  flatwhite: ['brazil-santos', 'colombia-supremo'],
  cappuccino: ['brazil-santos', 'house-blend'],
  latte: ['brazil-santos', 'house-blend'],
  lattemacchiato: ['house-blend', 'brazil-santos'],
  breve: ['brazil-santos'],
  galao: ['house-blend'],

  // Spezial
  mocha: ['colombia-supremo', 'brazil-santos'],
  affogato: ['italian-espresso'],
  irishcoffee: ['italian-espresso', 'house-blend'],
  vienna: ['italian-espresso', 'colombia-supremo'],
  conpanna: ['italian-espresso'],
  dirtychai: ['italian-espresso'],
  cafebombon: ['italian-espresso'],
  frappe: ['cold-brew-special', 'house-blend'],

  // Entkoffeiniert
  sanftermorgen: ['decaf-swiss-water'],
  traumwolke: ['decaf-swiss-water'],
  nachtruhe: ['decaf-swiss-water'],
  schokoseele: ['decaf-swiss-water'],

  // Fantasie
  mitternachtstraumer: ['decaf-swiss-water'],
  polarfuchs: ['italian-espresso'],
  vulkanausbruch: ['italian-espresso'],
  einhornlatte: ['decaf-swiss-water'],
  berlinernacht: ['cold-brew-special'],
  goldenerdrache: ['ethiopia-sidamo'],
  nebelwald: ['ethiopia-sidamo'],
  karamellsupernova: ['brazil-santos'],
  zimtzeitreise: ['decaf-swiss-water'],
  nordlicht: ['cold-brew-special'],
  samuraisunrise: ['ethiopia-sidamo'],
  marsexplorer: ['brazil-santos', 'colombia-supremo']
};

export const roastLabels = {
  de: {
    light: 'Helle Röstung',
    'medium-light': 'Mittelhelle Röstung',
    medium: 'Mittlere Röstung',
    'medium-dark': 'Mitteldunkle Röstung',
    dark: 'Dunkle Röstung'
  },
  en: {
    light: 'Light Roast',
    'medium-light': 'Medium-Light Roast',
    medium: 'Medium Roast',
    'medium-dark': 'Medium-Dark Roast',
    dark: 'Dark Roast'
  }
};
