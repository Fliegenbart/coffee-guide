import React from 'react';

// Fox Animation - Arctic/Winter theme
function FoxAnimation() {
  return (
    <div className="fox-container relative">
      {/* Snowflakes */}
      {[...Array(5)].map((_, i) => (
        <span key={i} className="snowflake">❄</span>
      ))}
      {/* Fox */}
      <svg className="fox-body w-16 h-16 mx-auto" viewBox="0 0 64 64">
        <g transform="translate(8, 12)">
          {/* Ears */}
          <polygon points="8,0 12,16 4,16" fill="#f97316" />
          <polygon points="40,0 36,16 44,16" fill="#f97316" />
          <polygon points="9,2 11,14 6,14" fill="#fff7ed" />
          <polygon points="39,2 37,14 42,14" fill="#fff7ed" />
          {/* Face */}
          <ellipse cx="24" cy="28" rx="20" ry="16" fill="#f97316" />
          <ellipse cx="24" cy="32" rx="10" ry="8" fill="#ffffff" />
          {/* Eyes */}
          <circle cx="16" cy="26" r="3" fill="#1c1917" />
          <circle cx="32" cy="26" r="3" fill="#1c1917" />
          <circle cx="17" cy="25" r="1" fill="#ffffff" />
          <circle cx="33" cy="25" r="1" fill="#ffffff" />
          {/* Nose */}
          <ellipse cx="24" cy="32" rx="3" ry="2" fill="#1c1917" />
        </g>
      </svg>
    </div>
  );
}

// Volcano Animation - Fire/Spicy theme
function VolcanoAnimation() {
  return (
    <div className="volcano-container relative">
      {/* Lava drops */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="lava-drop" />
      ))}
      {/* Volcano */}
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 64 64">
        <defs>
          <linearGradient id="volcanoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="lavaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        {/* Mountain */}
        <polygon points="32,8 56,56 8,56" fill="url(#volcanoGrad)" />
        {/* Crater */}
        <ellipse cx="32" cy="14" rx="8" ry="4" fill="#1c1917" />
        {/* Lava in crater */}
        <ellipse cx="32" cy="14" rx="6" ry="3" fill="url(#lavaGrad)">
          <animate attributeName="ry" values="3;4;3" dur="1s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </div>
  );
}

// Unicorn Animation - Sweet/Colorful theme
function UnicornAnimation() {
  return (
    <div className="unicorn-container relative">
      {/* Rainbow stars */}
      {['✨', '⭐', '💫', '🌟', '✨'].map((star, i) => (
        <span key={i} className="rainbow-star">{star}</span>
      ))}
      {/* Unicorn */}
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 64 64">
        <defs>
          <linearGradient id="hornGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
          <linearGradient id="maneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="33%" stopColor="#a78bfa" />
            <stop offset="66%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {/* Horn */}
        <polygon points="32,4 28,20 36,20" fill="url(#hornGrad)" />
        {/* Head */}
        <ellipse cx="32" cy="36" rx="16" ry="14" fill="#ffffff" />
        {/* Mane */}
        <path d="M16,30 Q10,35 12,45 Q8,50 14,52" fill="none" stroke="url(#maneGrad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M18,26 Q12,30 14,40" fill="none" stroke="url(#maneGrad)" strokeWidth="3" strokeLinecap="round" />
        {/* Ear */}
        <polygon points="44,24 50,18 48,28" fill="#fdf2f8" />
        {/* Eye */}
        <ellipse cx="38" cy="34" rx="3" ry="4" fill="#1c1917" />
        <circle cx="39" cy="33" r="1" fill="#ffffff" />
        {/* Blush */}
        <circle cx="44" cy="40" r="3" fill="#fda4af" opacity="0.5" />
      </svg>
    </div>
  );
}

// Robot Animation - AI/Tech theme
function RobotAnimation() {
  return (
    <div className="robot-container relative">
      {/* Circuit lines */}
      <div className="circuit-line" style={{ top: '20%', left: '10%', width: '30%' }} />
      <div className="circuit-line" style={{ top: '70%', right: '10%', width: '25%' }} />
      {/* Robot */}
      <svg className="robot-body w-16 h-16 mx-auto" viewBox="0 0 64 64">
        <defs>
          <linearGradient id="robotGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>
        </defs>
        {/* Antenna */}
        <line x1="32" y1="8" x2="32" y2="16" stroke="#6b7280" strokeWidth="2" />
        <circle cx="32" cy="6" r="3" fill="#22d3ee">
          <animate attributeName="fill" values="#22d3ee;#06b6d4;#22d3ee" dur="1s" repeatCount="indefinite" />
        </circle>
        {/* Head */}
        <rect x="16" y="16" width="32" height="28" rx="4" fill="url(#robotGrad)" />
        {/* Eyes */}
        <g className="robot-eye">
          <rect x="22" y="24" width="8" height="10" rx="2" fill="#1c1917" />
          <rect x="34" y="24" width="8" height="10" rx="2" fill="#1c1917" />
          <circle cx="26" cy="29" r="2" fill="#22d3ee" />
          <circle cx="38" cy="29" r="2" fill="#22d3ee" />
        </g>
        {/* Mouth */}
        <rect x="26" y="38" width="12" height="3" rx="1" fill="#1c1917" />
        {/* Body hint */}
        <rect x="24" y="46" width="16" height="12" rx="2" fill="url(#robotGrad)" />
        {/* Coffee cup */}
        <rect x="44" y="48" width="10" height="12" rx="2" fill="#78350f" />
        <ellipse cx="49" cy="50" rx="4" ry="2" fill="#d4a574" />
      </svg>
    </div>
  );
}

// Explosion Animation - Power/Energy theme
function ExplosionAnimation() {
  return (
    <div className="explosion-container relative">
      {/* Rays */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="explosion-ray"
          style={{ '--rotation': `${i * 45}deg` }}
        />
      ))}
      {/* Center burst */}
      <svg className="w-16 h-16 mx-auto relative z-10" viewBox="0 0 64 64">
        <defs>
          <radialGradient id="burstGrad">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </radialGradient>
        </defs>
        {/* Star burst */}
        <polygon
          points="32,8 36,24 52,24 40,34 44,52 32,42 20,52 24,34 12,24 28,24"
          fill="url(#burstGrad)"
        >
          <animate attributeName="transform" type="rotate" values="0 32 32;10 32 32;0 32 32" dur="0.5s" repeatCount="indefinite" />
        </polygon>
        {/* POW text */}
        <text x="32" y="36" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="bold">POW!</text>
      </svg>
    </div>
  );
}

// Dragon Animation - Fire/Bold theme
function DragonAnimation() {
  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 80 80">
        <defs>
          <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        {/* Flame */}
        <g className="dragon-flame" style={{ transformOrigin: '15px 40px' }}>
          <ellipse cx="15" cy="40" rx="8" ry="5" fill="url(#flameGrad)" />
          <ellipse cx="8" cy="40" rx="5" ry="3" fill="#fbbf24" />
        </g>
        {/* Dragon head */}
        <ellipse cx="50" cy="40" rx="20" ry="15" fill="url(#dragonGrad)" />
        {/* Snout */}
        <ellipse cx="30" cy="42" rx="10" ry="8" fill="url(#dragonGrad)" />
        {/* Nostril */}
        <circle cx="25" cy="40" r="2" fill="#1c1917" />
        {/* Eye */}
        <ellipse cx="55" cy="36" rx="5" ry="6" fill="#fef3c7" />
        <ellipse cx="56" cy="36" rx="3" ry="4" fill="#dc2626" />
        <circle cx="57" cy="35" r="1" fill="#1c1917" />
        {/* Horns */}
        <polygon points="60,25 65,15 62,28" fill="#78350f" />
        <polygon points="68,28 75,20 70,32" fill="#78350f" />
        {/* Spikes */}
        <polygon points="45,25 48,18 51,25" fill="#15803d" />
        <polygon points="55,23 57,17 59,23" fill="#15803d" />
      </svg>
    </div>
  );
}

// Ghost Animation - Night/Dream theme
function GhostAnimation() {
  return (
    <div className="relative w-20 h-20">
      <svg className="ghost-float w-full h-full" viewBox="0 0 80 80">
        <defs>
          <linearGradient id="ghostGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        {/* Moon */}
        <circle cx="65" cy="15" r="8" fill="#fef3c7" />
        <circle cx="68" cy="13" r="6" fill="#1e1b4b" />
        {/* Stars */}
        <text x="15" y="20" fontSize="8">✦</text>
        <text x="50" y="12" fontSize="6">✦</text>
        <text x="25" y="65" fontSize="7">✦</text>
        {/* Ghost body */}
        <path
          d="M40,20 Q60,20 60,45 Q60,65 55,65 Q55,58 50,65 Q50,58 45,65 Q45,58 40,65 Q40,58 35,65 Q35,58 30,65 Q30,58 25,65 Q20,65 20,45 Q20,20 40,20"
          fill="url(#ghostGrad)"
          stroke="#d1d5db"
          strokeWidth="1"
        />
        {/* Eyes */}
        <ellipse cx="32" cy="38" rx="4" ry="5" fill="#1c1917" />
        <ellipse cx="48" cy="38" rx="4" ry="5" fill="#1c1917" />
        <circle cx="30" cy="36" r="1.5" fill="#ffffff" />
        <circle cx="46" cy="36" r="1.5" fill="#ffffff" />
        {/* Mouth */}
        <ellipse cx="40" cy="50" rx="5" ry="4" fill="#1c1917" />
      </svg>
    </div>
  );
}

// Alien Animation - Space/Exotic theme
function AlienAnimation() {
  return (
    <div className="relative w-20 h-20">
      {/* Stars background */}
      <div className="absolute inset-0">
        <span className="absolute text-xs" style={{ top: '10%', left: '15%' }}>✦</span>
        <span className="absolute text-xs" style={{ top: '20%', right: '20%' }}>✦</span>
        <span className="absolute text-xs" style={{ bottom: '30%', left: '10%' }}>✦</span>
      </div>
      <svg className="w-full h-full" viewBox="0 0 80 80">
        <defs>
          <linearGradient id="ufoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#71717a" />
          </linearGradient>
        </defs>
        {/* UFO */}
        <g className="ufo-hover">
          {/* Dome */}
          <ellipse cx="40" cy="28" rx="12" ry="10" fill="#22d3ee" opacity="0.5" />
          {/* Body */}
          <ellipse cx="40" cy="32" rx="25" ry="8" fill="url(#ufoGrad)" />
          {/* Lights */}
          <circle cx="25" cy="32" r="2" fill="#fbbf24">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="34" r="2" fill="#f472b6">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="55" cy="32" r="2" fill="#34d399">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
          </circle>
          {/* Beam */}
          <polygon className="ufo-beam" points="32,40 48,40 55,70 25,70" fill="#22d3ee" opacity="0.3" />
        </g>
        {/* Alien */}
        <ellipse cx="40" cy="58" rx="6" ry="8" fill="#86efac" />
        <ellipse cx="37" cy="55" rx="2" ry="3" fill="#1c1917" />
        <ellipse cx="43" cy="55" rx="2" ry="3" fill="#1c1917" />
      </svg>
    </div>
  );
}

// Wizard Animation - Magic theme
function WizardAnimation() {
  return (
    <div className="relative w-20 h-20">
      {/* Sparkles */}
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="sparkle absolute text-yellow-400"
          style={{
            '--x': `${(i - 2) * 15}px`,
            left: `${30 + i * 10}%`,
            top: '40%',
            animationDelay: `${i * 0.3}s`
          }}
        >
          ✨
        </span>
      ))}
      <svg className="w-full h-full" viewBox="0 0 80 80">
        <defs>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
        </defs>
        {/* Hat */}
        <polygon points="40,5 55,50 25,50" fill="url(#hatGrad)" />
        <polygon points="40,8 52,45 28,45" fill="#4338ca" />
        {/* Stars on hat */}
        <text x="38" y="25" fontSize="8" fill="#fbbf24">★</text>
        <text x="35" y="38" fontSize="6" fill="#fbbf24">★</text>
        {/* Hat brim */}
        <ellipse cx="40" cy="50" rx="20" ry="5" fill="url(#hatGrad)" />
        {/* Face */}
        <ellipse cx="40" cy="60" rx="12" ry="10" fill="#fef3c7" />
        {/* Eyes */}
        <circle cx="35" cy="58" r="2" fill="#1c1917" />
        <circle cx="45" cy="58" r="2" fill="#1c1917" />
        {/* Beard */}
        <path d="M30,65 Q40,80 50,65" fill="#e5e7eb" />
        {/* Wand */}
        <line x1="58" y1="55" x2="70" y2="40" stroke="#78350f" strokeWidth="2" />
        <circle cx="70" cy="38" r="3" fill="#fbbf24">
          <animate attributeName="r" values="3;4;3" dur="0.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

// Mermaid Animation - Ocean theme
function MermaidAnimation() {
  return (
    <div className="relative w-20 h-20">
      {/* Bubbles */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bubble" />
      ))}
      <svg className="w-full h-full" viewBox="0 0 80 80">
        <defs>
          <linearGradient id="tailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="scaleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* Waves */}
        <path d="M0,65 Q20,60 40,65 Q60,70 80,65" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.5">
          <animate attributeName="d" values="M0,65 Q20,60 40,65 Q60,70 80,65;M0,65 Q20,70 40,65 Q60,60 80,65;M0,65 Q20,60 40,65 Q60,70 80,65" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Tail */}
        <path d="M45,50 Q50,65 40,75 L35,70 Q42,62 38,50 Z" fill="url(#tailGrad)" />
        <ellipse cx="37" cy="72" rx="8" ry="4" fill="url(#scaleGrad)" />
        {/* Body */}
        <ellipse cx="40" cy="40" rx="10" ry="15" fill="#fef3c7" />
        {/* Scales */}
        <ellipse cx="40" cy="52" rx="8" ry="4" fill="url(#scaleGrad)" />
        {/* Hair */}
        <path d="M30,25 Q25,35 28,45" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        <path d="M35,22 Q32,32 33,42" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        <path d="M42,22 Q45,32 44,42" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        {/* Face */}
        <ellipse cx="40" cy="30" rx="10" ry="10" fill="#fef3c7" />
        {/* Eyes */}
        <ellipse cx="36" cy="30" rx="2" ry="2.5" fill="#1c1917" />
        <ellipse cx="44" cy="30" rx="2" ry="2.5" fill="#1c1917" />
        {/* Shell bra */}
        <ellipse cx="35" cy="42" rx="4" ry="3" fill="#fda4af" />
        <ellipse cx="45" cy="42" rx="4" ry="3" fill="#fda4af" />
      </svg>
    </div>
  );
}

// Main component that renders the appropriate graphic
export default function CoffeeGraphic({ type }) {
  const graphics = {
    fox: FoxAnimation,
    volcano: VolcanoAnimation,
    unicorn: UnicornAnimation,
    robot: RobotAnimation,
    explosion: ExplosionAnimation,
    dragon: DragonAnimation,
    ghost: GhostAnimation,
    alien: AlienAnimation,
    wizard: WizardAnimation,
    mermaid: MermaidAnimation,
  };

  const GraphicComponent = graphics[type];

  if (!GraphicComponent) {
    return null;
  }

  return <GraphicComponent />;
}

// Export mapping for AI prompt reference
export const graphicTypes = {
  fox: 'Winterlich, arktisch, kühl, Vanille, Minze',
  volcano: 'Feurig, scharf, Chili, stark, intensiv',
  unicorn: 'Süß, bunt, Regenbogen, verspielt, Sirup',
  robot: 'KI-generiert, technisch, futuristisch',
  explosion: 'Power, Energie, stark, Koffein-Boost',
  dragon: 'Mutig, feurig, gewagt, exotisch',
  ghost: 'Nacht, Traum, mysteriös, Decaf',
  alien: 'Außergewöhnlich, exotisch, ungewöhnlich',
  wizard: 'Magisch, geheimnisvoll, besonders',
  mermaid: 'Ozean, frisch, Kokosnuss, tropisch',
};
