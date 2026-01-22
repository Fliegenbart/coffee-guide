import React, { useEffect, useRef, useState } from 'react';

// Simple physics simulation for coffee grounds
const GRAVITY = 0.3;
const FRICTION = 0.8;
const BOUNCE = 0.3;
const GROUND_Y = 0.95; // 95% from top

class Particle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.7) * 3; // Slight leftward bias
    this.vy = Math.random() * 2;
    this.size = size;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.settled = false;
    this.settledY = null;
    this.color = this.getRandomBrownColor();
  }

  getRandomBrownColor() {
    const browns = [
      '#3D2314', // Dark espresso
      '#4A3728', // Medium roast
      '#5C4033', // Chocolate
      '#6B5344', // Light roast
      '#2D1810', // Extra dark
      '#4E3524', // Medium dark
    ];
    return browns[Math.floor(Math.random() * browns.length)];
  }

  update(groundLevel, particles) {
    if (this.settled) return;

    // Apply gravity
    this.vy += GRAVITY;

    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;

    // Rotate while falling
    this.rotation += this.rotationSpeed;

    // Check ground collision
    if (this.y >= groundLevel) {
      this.y = groundLevel;
      this.vy *= -BOUNCE;
      this.vx *= FRICTION;
      this.rotationSpeed *= 0.5;

      // Settle if moving slowly
      if (Math.abs(this.vy) < 0.5 && Math.abs(this.vx) < 0.5) {
        this.settled = true;
        this.settledY = this.y;
      }
    }

    // Check collision with other settled particles (pile up)
    for (const other of particles) {
      if (other === this || !other.settled) continue;

      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = (this.size + other.size) / 2;

      if (dist < minDist && this.y > other.y - other.size) {
        // Push up on top of pile
        const newGroundLevel = other.y - minDist * 0.7;
        if (this.y > newGroundLevel) {
          this.y = newGroundLevel;
          this.vy *= -BOUNCE * 0.5;
          this.vx += (Math.random() - 0.5) * 2; // Add some horizontal scatter

          if (Math.abs(this.vy) < 0.3) {
            this.settled = true;
            this.settledY = this.y;
          }
        }
      }
    }

    // Keep particles in bounds horizontally
    if (this.x < 0) {
      this.x = 0;
      this.vx *= -0.5;
    }
    if (this.x > 100) {
      this.x = 100;
      this.vx *= -0.5;
    }
  }
}

export default function CoffeeGrounds() {
  const [particles, setParticles] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const animationRef = useRef(null);
  const lastSpawnRef = useRef(0);

  // Randomly trigger the effect
  useEffect(() => {
    const triggerEffect = () => {
      // Random delay between 15-45 seconds
      const delay = 15000 + Math.random() * 30000;

      setTimeout(() => {
        setIsActive(true);
        setParticles([]);

        // Run for 3-5 seconds
        const duration = 3000 + Math.random() * 2000;
        setTimeout(() => {
          setIsActive(false);
        }, duration);

        // Schedule next trigger
        triggerEffect();
      }, delay);
    };

    // Start first effect after 5-10 seconds
    const initialDelay = 5000 + Math.random() * 5000;
    const timer = setTimeout(triggerEffect, initialDelay);

    return () => clearTimeout(timer);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isActive && particles.length === 0) return;

    const animate = (timestamp) => {
      // Spawn new particles while active
      if (isActive && timestamp - lastSpawnRef.current > 50) {
        const newParticles = [];
        const count = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < count; i++) {
          const x = 85 + Math.random() * 15; // Start from right side
          const y = -5 + Math.random() * 10; // Start above viewport
          const size = 3 + Math.random() * 4;
          newParticles.push(new Particle(x, y, size));
        }

        setParticles(prev => [...prev, ...newParticles].slice(-150)); // Limit total particles
        lastSpawnRef.current = timestamp;
      }

      // Update all particles
      setParticles(prev => {
        const groundLevel = GROUND_Y * 100;
        prev.forEach(p => p.update(groundLevel, prev));

        // Remove particles that have been settled for a while and are off-screen pile
        if (!isActive) {
          return prev.filter(p => !p.settled || p.settledY > groundLevel - 20);
        }
        return [...prev];
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, particles.length]);

  // Clean up old particles after effect ends
  useEffect(() => {
    if (!isActive && particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([]);
      }, 8000); // Clear after 8 seconds

      return () => clearTimeout(timer);
    }
  }, [isActive, particles.length]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.settled ? 0.9 : 1,
            boxShadow: particle.settled ? 'none' : '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      ))}

      {/* Ground pile effect - gradient shadow */}
      {particles.some(p => p.settled) && (
        <div
          className="absolute bottom-0 right-0 w-48 h-8 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(61,35,20,0.3) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
}
