import React from 'react';

const beans = [
  { id: 1, size: 24, x: 5, delay: 0, duration: 20 },
  { id: 2, size: 18, x: 15, delay: 2, duration: 25 },
  { id: 3, size: 28, x: 25, delay: 5, duration: 22 },
  { id: 4, size: 20, x: 35, delay: 1, duration: 28 },
  { id: 5, size: 22, x: 45, delay: 4, duration: 24 },
  { id: 6, size: 16, x: 55, delay: 3, duration: 26 },
  { id: 7, size: 26, x: 65, delay: 6, duration: 21 },
  { id: 8, size: 19, x: 75, delay: 2, duration: 27 },
  { id: 9, size: 23, x: 85, delay: 4, duration: 23 },
  { id: 10, size: 17, x: 92, delay: 1, duration: 29 },
];

export default function FloatingBeans() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {beans.map((bean) => (
        <div
          key={bean.id}
          className="absolute animate-float-bean opacity-20"
          style={{
            left: `${bean.x}%`,
            animationDelay: `${bean.delay}s`,
            animationDuration: `${bean.duration}s`,
          }}
        >
          <svg
            width={bean.size}
            height={bean.size * 1.4}
            viewBox="0 0 24 34"
            fill="none"
            className="transform rotate-12"
          >
            {/* Coffee Bean Shape */}
            <ellipse
              cx="12"
              cy="17"
              rx="10"
              ry="15"
              fill="#92600a"
            />
            {/* Center Line */}
            <path
              d="M12 4 Q8 17 12 30 Q16 17 12 4"
              stroke="#6b4508"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Highlight */}
            <ellipse
              cx="8"
              cy="12"
              rx="3"
              ry="5"
              fill="#b8860b"
              opacity="0.4"
            />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes float-bean {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.15;
          }
          90% {
            opacity: 0.15;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-bean {
          animation: float-bean linear infinite;
        }
      `}</style>
    </div>
  );
}
