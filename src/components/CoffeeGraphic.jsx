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

// Cat Animation - Cozy/Cute theme
function CatAnimation() {
  return (
    <div className="relative w-20 h-20">
      <svg className="cat-purr w-full h-full" viewBox="0 0 80 80">
        {/* Yarn ball */}
        <circle cx="15" cy="60" r="8" fill="#f472b6" />
        <path d="M15,52 Q10,48 18,45" fill="none" stroke="#f472b6" strokeWidth="2" />
        {/* Cat body */}
        <ellipse cx="50" cy="55" rx="18" ry="12" fill="#fbbf24" />
        {/* Tail */}
        <path d="M32,55 Q20,45 25,35" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round">
          <animate attributeName="d" values="M32,55 Q20,45 25,35;M32,55 Q25,40 30,32;M32,55 Q20,45 25,35" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Head */}
        <circle cx="55" cy="40" r="14" fill="#fbbf24" />
        {/* Ears */}
        <polygon points="45,30 42,18 50,28" fill="#fbbf24" />
        <polygon points="65,30 68,18 60,28" fill="#fbbf24" />
        <polygon points="46,29 44,22 49,28" fill="#fda4af" />
        <polygon points="64,29 66,22 61,28" fill="#fda4af" />
        {/* Face */}
        <ellipse cx="50" cy="42" rx="2.5" ry="3" fill="#1c1917" />
        <ellipse cx="60" cy="42" rx="2.5" ry="3" fill="#1c1917" />
        <ellipse cx="55" cy="48" rx="3" ry="2" fill="#f472b6" />
        {/* Whiskers */}
        <line x1="42" y1="46" x2="35" y2="44" stroke="#1c1917" strokeWidth="1" />
        <line x1="42" y1="48" x2="35" y2="48" stroke="#1c1917" strokeWidth="1" />
        <line x1="68" y1="46" x2="75" y2="44" stroke="#1c1917" strokeWidth="1" />
        <line x1="68" y1="48" x2="75" y2="48" stroke="#1c1917" strokeWidth="1" />
        {/* Zzz */}
        <text className="zzz-animation" x="68" y="25" fontSize="8" fill="#94a3b8">z</text>
        <text className="zzz-animation" style={{animationDelay: '0.3s'}} x="72" y="18" fontSize="10" fill="#94a3b8">z</text>
        <text className="zzz-animation" style={{animationDelay: '0.6s'}} x="76" y="10" fontSize="12" fill="#94a3b8">z</text>
      </svg>
    </div>
  );
}

// Sloth Animation - Lazy/Relaxed theme
function SlothAnimation() {
  return (
    <div className="relative w-20 h-20">
      <svg className="sloth-swing w-full h-full" viewBox="0 0 80 80">
        {/* Branch */}
        <path d="M5,15 Q40,10 75,18" fill="none" stroke="#78350f" strokeWidth="4" />
        <ellipse cx="25" cy="12" rx="8" ry="4" fill="#22c55e" />
        <ellipse cx="60" cy="15" rx="10" ry="5" fill="#22c55e" />
        {/* Arms holding branch */}
        <path d="M35,18 Q33,28 38,32" fill="none" stroke="#a8a29e" strokeWidth="4" strokeLinecap="round" />
        <path d="M50,16 Q52,26 47,32" fill="none" stroke="#a8a29e" strokeWidth="4" strokeLinecap="round" />
        {/* Body */}
        <ellipse cx="42" cy="50" rx="15" ry="18" fill="#a8a29e" />
        {/* Face patch */}
        <ellipse cx="42" cy="45" rx="12" ry="10" fill="#fef3c7" />
        {/* Eyes with dark patches */}
        <ellipse cx="37" cy="43" rx="5" ry="4" fill="#57534e" />
        <ellipse cx="47" cy="43" rx="5" ry="4" fill="#57534e" />
        <circle cx="37" cy="43" r="2" fill="#1c1917" />
        <circle cx="47" cy="43" r="2" fill="#1c1917" />
        {/* Sleepy eye lids */}
        <path d="M33,41 Q37,39 41,41" fill="none" stroke="#fef3c7" strokeWidth="2" />
        <path d="M43,41 Q47,39 51,41" fill="none" stroke="#fef3c7" strokeWidth="2" />
        {/* Nose */}
        <ellipse cx="42" cy="50" rx="3" ry="2" fill="#1c1917" />
        {/* Smile */}
        <path d="M38,54 Q42,58 46,54" fill="none" stroke="#1c1917" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// Bee Animation - Honey/Sweet theme
function BeeAnimation() {
  return (
    <div className="relative w-20 h-20">
      {/* Honey drips */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="honey-drip" style={{ left: `${20 + i * 25}%`, animationDelay: `${i * 0.5}s` }} />
      ))}
      <svg className="bee-fly w-full h-full" viewBox="0 0 80 80">
        {/* Flower */}
        <circle cx="60" cy="65" r="8" fill="#f472b6" />
        <circle cx="60" cy="65" r="4" fill="#fbbf24" />
        <line x1="60" y1="73" x2="60" y2="80" stroke="#22c55e" strokeWidth="2" />
        {/* Bee body */}
        <ellipse cx="35" cy="40" rx="12" ry="10" fill="#fbbf24" />
        {/* Stripes */}
        <rect x="29" y="34" width="4" height="12" fill="#1c1917" rx="1" />
        <rect x="35" y="34" width="4" height="12" fill="#1c1917" rx="1" />
        {/* Head */}
        <circle cx="48" cy="40" r="8" fill="#1c1917" />
        {/* Eyes */}
        <circle cx="50" cy="38" r="3" fill="#ffffff" />
        <circle cx="51" cy="38" r="1.5" fill="#1c1917" />
        {/* Antennae */}
        <path d="M52,32 Q55,28 58,30" fill="none" stroke="#1c1917" strokeWidth="1.5" />
        <path d="M48,32 Q50,26 53,25" fill="none" stroke="#1c1917" strokeWidth="1.5" />
        <circle cx="58" cy="30" r="2" fill="#1c1917" />
        <circle cx="53" cy="25" r="2" fill="#1c1917" />
        {/* Wings */}
        <ellipse className="wing-left" cx="32" cy="30" rx="8" ry="5" fill="#bfdbfe" opacity="0.7" />
        <ellipse className="wing-right" cx="38" cy="30" rx="8" ry="5" fill="#bfdbfe" opacity="0.7" />
        {/* Stinger */}
        <polygon points="23,40 18,40 20,38" fill="#1c1917" />
      </svg>
    </div>
  );
}

// Cloud Animation - Rainy day/Dreamy theme
function CloudAnimation() {
  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 80 80">
        {/* Sun behind cloud */}
        <circle cx="60" cy="25" r="12" fill="#fbbf24" opacity="0.6" />
        {/* Rays */}
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="60" y1="25" x2={60 + Math.cos(i * Math.PI / 4) * 18} y2={25 + Math.sin(i * Math.PI / 4) * 18} stroke="#fbbf24" strokeWidth="2" opacity="0.4" />
        ))}
        {/* Cloud */}
        <g className="cloud-float">
          <ellipse cx="25" cy="35" rx="12" ry="10" fill="#ffffff" />
          <ellipse cx="40" cy="32" rx="15" ry="12" fill="#ffffff" />
          <ellipse cx="55" cy="35" rx="12" ry="10" fill="#ffffff" />
          <ellipse cx="35" cy="40" rx="20" ry="10" fill="#ffffff" />
          {/* Cloud face */}
          <circle cx="35" cy="36" r="2" fill="#1c1917" />
          <circle cx="45" cy="36" r="2" fill="#1c1917" />
          <path d="M37,42 Q40,45 43,42" fill="none" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <circle cx="32" cy="40" r="3" fill="#fda4af" opacity="0.5" />
          <circle cx="48" cy="40" r="3" fill="#fda4af" opacity="0.5" />
        </g>
        {/* Rain drops */}
        {[...Array(5)].map((_, i) => (
          <ellipse key={i} className="raindrop" cx={25 + i * 10} cy="55" rx="2" ry="4" fill="#60a5fa" style={{animationDelay: `${i * 0.2}s`}} />
        ))}
      </svg>
    </div>
  );
}

// Panda Animation - Cute/Asian theme
function PandaAnimation() {
  return (
    <div className="relative w-20 h-20">
      {/* Bamboo */}
      <svg className="w-full h-full" viewBox="0 0 80 80">
        <rect x="5" y="20" width="6" height="60" fill="#22c55e" rx="2" />
        <rect x="5" y="35" width="6" height="2" fill="#15803d" />
        <rect x="5" y="55" width="6" height="2" fill="#15803d" />
        <path d="M8,25 Q15,20 12,10" fill="#22c55e" />
        {/* Panda */}
        <g className="panda-munch">
          {/* Body */}
          <ellipse cx="50" cy="58" rx="16" ry="14" fill="#ffffff" />
          {/* Head */}
          <circle cx="50" cy="38" r="18" fill="#ffffff" />
          {/* Ears */}
          <circle cx="35" cy="24" r="7" fill="#1c1917" />
          <circle cx="65" cy="24" r="7" fill="#1c1917" />
          {/* Eye patches */}
          <ellipse cx="42" cy="38" rx="7" ry="8" fill="#1c1917" />
          <ellipse cx="58" cy="38" rx="7" ry="8" fill="#1c1917" />
          {/* Eyes */}
          <circle cx="42" cy="38" r="3" fill="#ffffff" />
          <circle cx="58" cy="38" r="3" fill="#ffffff" />
          <circle cx="43" cy="37" r="1.5" fill="#1c1917" />
          <circle cx="59" cy="37" r="1.5" fill="#1c1917" />
          {/* Nose */}
          <ellipse cx="50" cy="46" rx="4" ry="3" fill="#1c1917" />
          {/* Mouth */}
          <path d="M46,50 Q50,54 54,50" fill="none" stroke="#1c1917" strokeWidth="1.5" />
          {/* Blush */}
          <circle cx="38" cy="45" r="3" fill="#fda4af" opacity="0.6" />
          <circle cx="62" cy="45" r="3" fill="#fda4af" opacity="0.6" />
          {/* Bamboo in hand */}
          <rect x="68" y="50" width="4" height="20" fill="#22c55e" rx="1" />
        </g>
      </svg>
    </div>
  );
}

// Octopus Animation - Adventurous/Ocean theme
function OctopusAnimation() {
  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 80 80">
        {/* Bubbles */}
        {[...Array(4)].map((_, i) => (
          <circle key={i} className="bubble-rise" cx={15 + i * 18} cy={60 - i * 5} r={2 + i} fill="#60a5fa" opacity="0.4" style={{animationDelay: `${i * 0.3}s`}} />
        ))}
        {/* Tentacles */}
        <g className="tentacles-wave">
          <path d="M20,50 Q15,60 20,70 Q25,75 22,80" fill="none" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" />
          <path d="M30,52 Q28,62 32,72 Q35,78 30,80" fill="none" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" />
          <path d="M40,54 Q40,65 42,75 Q43,78 40,80" fill="none" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" />
          <path d="M50,52 Q52,62 48,72 Q45,78 50,80" fill="none" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" />
          <path d="M60,50 Q65,60 60,70 Q55,75 58,80" fill="none" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" />
        </g>
        {/* Head */}
        <ellipse cx="40" cy="35" rx="22" ry="20" fill="#c084fc" />
        {/* Spots */}
        <circle cx="28" cy="30" r="3" fill="#a855f7" opacity="0.5" />
        <circle cx="52" cy="32" r="4" fill="#a855f7" opacity="0.5" />
        <circle cx="45" cy="22" r="2" fill="#a855f7" opacity="0.5" />
        {/* Eyes */}
        <ellipse cx="32" cy="38" rx="6" ry="7" fill="#ffffff" />
        <ellipse cx="48" cy="38" rx="6" ry="7" fill="#ffffff" />
        <circle cx="34" cy="38" r="3" fill="#1c1917" />
        <circle cx="50" cy="38" r="3" fill="#1c1917" />
        <circle cx="35" cy="37" r="1" fill="#ffffff" />
        <circle cx="51" cy="37" r="1" fill="#ffffff" />
        {/* Smile */}
        <path d="M35,48 Q40,53 45,48" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
        {/* Coffee cup on tentacle */}
        <rect x="62" y="55" width="8" height="10" fill="#78350f" rx="1" />
        <rect x="70" y="58" width="3" height="5" fill="none" stroke="#78350f" strokeWidth="1.5" rx="1" />
      </svg>
    </div>
  );
}

// Rainbow Animation - Colorful/Happy theme
function RainbowAnimation() {
  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 80 80">
        {/* Rainbow */}
        <g className="rainbow-appear">
          <path d="M5,60 Q40,0 75,60" fill="none" stroke="#ef4444" strokeWidth="4" />
          <path d="M10,60 Q40,8 70,60" fill="none" stroke="#f97316" strokeWidth="4" />
          <path d="M15,60 Q40,16 65,60" fill="none" stroke="#fbbf24" strokeWidth="4" />
          <path d="M20,60 Q40,24 60,60" fill="none" stroke="#22c55e" strokeWidth="4" />
          <path d="M25,60 Q40,32 55,60" fill="none" stroke="#3b82f6" strokeWidth="4" />
          <path d="M30,60 Q40,40 50,60" fill="none" stroke="#8b5cf6" strokeWidth="4" />
        </g>
        {/* Clouds */}
        <g>
          <ellipse cx="12" cy="60" rx="10" ry="8" fill="#ffffff" />
          <ellipse cx="20" cy="58" rx="8" ry="6" fill="#ffffff" />
          <ellipse cx="68" cy="60" rx="10" ry="8" fill="#ffffff" />
          <ellipse cx="60" cy="58" rx="8" ry="6" fill="#ffffff" />
        </g>
        {/* Stars */}
        <text className="twinkle" x="35" y="20" fontSize="10">✨</text>
        <text className="twinkle" style={{animationDelay: '0.5s'}} x="50" y="15" fontSize="8">⭐</text>
        <text className="twinkle" style={{animationDelay: '1s'}} x="25" y="28" fontSize="6">✨</text>
      </svg>
    </div>
  );
}

// Mushroom Animation - Earthy/Forest theme
function MushroomAnimation() {
  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 80 80">
        {/* Grass */}
        <path d="M0,70 Q5,65 10,70 Q15,65 20,70 Q25,65 30,70 Q35,65 40,70 Q45,65 50,70 Q55,65 60,70 Q65,65 70,70 Q75,65 80,70 L80,80 L0,80 Z" fill="#22c55e" />
        {/* Small mushroom */}
        <rect x="12" y="55" width="6" height="15" fill="#fef3c7" />
        <ellipse cx="15" cy="55" rx="10" ry="8" fill="#ef4444" />
        <circle cx="12" cy="52" r="2" fill="#ffffff" />
        <circle cx="18" cy="54" r="1.5" fill="#ffffff" />
        {/* Main mushroom */}
        <g className="mushroom-bounce">
          <rect x="32" y="45" width="16" height="25" fill="#fef3c7" rx="3" />
          <ellipse cx="40" cy="45" rx="22" ry="15" fill="#ef4444" />
          {/* Spots */}
          <circle cx="30" cy="42" r="4" fill="#ffffff" />
          <circle cx="45" cy="38" r="5" fill="#ffffff" />
          <circle cx="52" cy="45" r="3" fill="#ffffff" />
          <circle cx="35" cy="50" r="3" fill="#ffffff" />
          {/* Face */}
          <circle cx="36" cy="42" r="2" fill="#1c1917" />
          <circle cx="44" cy="42" r="2" fill="#1c1917" />
          <path d="M38,48 Q40,51 42,48" fill="none" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="33" cy="45" r="2.5" fill="#fda4af" opacity="0.6" />
          <circle cx="47" cy="45" r="2.5" fill="#fda4af" opacity="0.6" />
        </g>
        {/* Sparkles */}
        <text className="sparkle-float" x="60" y="35" fontSize="10">✨</text>
        <text className="sparkle-float" style={{animationDelay: '0.7s'}} x="20" y="40" fontSize="8">✨</text>
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
    cat: CatAnimation,
    sloth: SlothAnimation,
    bee: BeeAnimation,
    cloud: CloudAnimation,
    panda: PandaAnimation,
    octopus: OctopusAnimation,
    rainbow: RainbowAnimation,
    mushroom: MushroomAnimation,
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
  cat: 'Gemütlich, kuschelig, entspannt, warm',
  sloth: 'Faul, entspannt, langsam, chillig',
  bee: 'Honig, süß, Blumen, fleißig',
  cloud: 'Regentag, verträumt, weich, fluffig',
  panda: 'Asiatisch, süß, Matcha, Bambus',
  octopus: 'Abenteuerlich, verrückt, Meer, viele Arme',
  rainbow: 'Bunt, fröhlich, Pride, Regenbogen',
  mushroom: 'Wald, Erde, natürlich, magisch',
};
