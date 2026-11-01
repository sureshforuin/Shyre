import React, { useEffect, useRef } from 'react';
import styles from './BackgroundParticles.module.scss';

// Variety of rich shapes: heart, star, sparkle, circle, ring, triangle, diamond, cross, petal, crescent, hexagon
type ShapeType =
  | 'heart'
  | 'star'
  | 'sparkle'
  | 'circle'
  | 'ring'
  | 'triangle'
  | 'diamond'
  | 'cross'
  | 'petal'
  | 'crescent'
  | 'hexagon';

interface Particle {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  size: number;
  shape: ShapeType;
  color: string;
  baseOpacity: number;
  rotation: number;
  rotSpeed: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface WaveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  color: string;
}

// Pre-compile Path2D objects once so the GPU canvas renders them in microsecond batches
const createShapePaths = () => {
  // Heart Path
  const heart = new Path2D(
    'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  );

  // 4-Pointed Star Path
  const star = new Path2D(
    'M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z'
  );

  // Sparkle Flare Path
  const sparkle = new Path2D(
    'M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z'
  );

  // Triangle Path
  const triangle = new Path2D();
  triangle.moveTo(12, 2);
  triangle.lineTo(22, 22);
  triangle.lineTo(2, 22);
  triangle.closePath();

  // Diamond Path
  const diamond = new Path2D();
  diamond.moveTo(12, 1);
  diamond.lineTo(23, 12);
  diamond.lineTo(12, 23);
  diamond.lineTo(1, 12);
  diamond.closePath();

  // Cross Path
  const cross = new Path2D('M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2z');

  // Floral Petal Path
  const petal = new Path2D(
    'M12 2C7 2 3 7 3 12C3 18 12 22 12 22C12 22 21 18 21 12C21 7 17 2 12 2Z'
  );

  // Crescent Moon Path
  const crescent = new Path2D(
    'M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 8.66-5A8 8 0 1 1 12 2z'
  );

  // Hexagon Path
  const hexagon = new Path2D();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = 12 + 10 * Math.cos(angle);
    const y = 12 + 10 * Math.sin(angle);
    if (i === 0) hexagon.moveTo(x, y);
    else hexagon.lineTo(x, y);
  }
  hexagon.closePath();

  return { heart, star, sparkle, triangle, diamond, cross, petal, crescent, hexagon };
};

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const paths = createShapePaths();

    // Subtle luxury translucent palette matching ShyRe brand
    const subtleColors = [
      'rgba(194, 51, 99,',   // Brand rose
      'rgba(217, 107, 143,', // Rose petal blush
      'rgba(197, 154, 90,',  // Champagne gold
      'rgba(224, 185, 126,', // Amber quartz
      'rgba(163, 177, 138,', // Herbal sage
      'rgba(224, 122, 95,',  // Terracotta
      'rgba(202, 168, 206,', // Lavender quartz
      'rgba(180, 142, 105,', // Antique bronze
      'rgba(142, 182, 156,', // Eucalyptus mint
      'rgba(235, 148, 172,', // Baby pink
    ];

    const shapes: ShapeType[] = [
      'heart',
      'heart',
      'star',
      'sparkle',
      'circle',
      'ring',
      'triangle',
      'diamond',
      'cross',
      'petal',
      'crescent',
      'hexagon',
    ];

    const PARTICLE_COUNT = 130;
    const particles: Particle[] = [];
    const ripples: WaveRipple[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseVx = (Math.random() - 0.5) * 0.45;
      const baseVy = -(Math.random() * 0.45 + 0.15);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseVx,
        baseVy,
        vx: baseVx,
        vy: baseVy,
        size: Math.random() * 14 + 8, // 8px to 22px
        shape: shapes[i % shapes.length],
        color: subtleColors[i % subtleColors.length],
        baseOpacity: Math.random() * 0.35 + 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Handle global mouse click to produce the wave ripple and particle displacement
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      // 1. Spawn a glowing expanding wave ripple
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: Math.max(width, height) * 0.35, // Expands gracefully outwards
        opacity: 0.65,
        speed: 7.5,
        color: 'rgba(197, 154, 90,', // Champagne gold luminous ring
      });

      // Also spawn a secondary subtle rose inner wave
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.22,
        opacity: 0.5,
        speed: 5.5,
        color: 'rgba(194, 51, 99,', // Brand rose inner ring
      });

      // 2. Displace particles in the blast zone with radial kinetic force
      const blastRadius = 240; // Area of displacement
      const maxForce = 9.5;    // Impulse velocity

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy);

        if (dist < blastRadius && dist > 0) {
          // Falloff: stronger push closer to the click point
          const force = (1 - dist / blastRadius) * maxForce;
          const angle = Math.atan2(dy, dx);
          
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
          // Spin faster on displacement
          p.rotSpeed += (Math.random() - 0.5) * 0.15;
        }
      }
    };

    window.addEventListener('click', handleClick, { passive: true });

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 60FPS Canvas Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- Draw & Update Expanding Wave Ripples ---
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.opacity *= 0.965; // Smooth exponential fade-out

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${rip.color} ${Math.max(0, rip.opacity)})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Delicate outer glow on ripple
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, Math.max(1, rip.radius - 2), 0, Math.PI * 2);
        ctx.strokeStyle = `${rip.color} ${Math.max(0, rip.opacity * 0.4)})`;
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.restore();

        // Remove expired waves
        if (rip.opacity <= 0.01 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // --- Draw & Update Particles ---
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        // Apply friction to restore natural floating velocities smoothly
        p.vx = p.vx * 0.94 + p.baseVx * 0.06;
        p.vy = p.vy * 0.94 + p.baseVy * 0.06;

        // Position update
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.pulsePhase += p.pulseSpeed;

        // Wrap around seamlessly across entire screen
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        } else if (p.y > height + 30) {
          p.y = -20;
        }

        if (p.x < -30) {
          p.x = width + 20;
        } else if (p.x > width + 30) {
          p.x = -20;
        }

        // Compute subtle pulsating opacity
        const currentOpacity =
          p.baseOpacity + Math.sin(p.pulsePhase) * 0.12;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const scale = p.size / 24;
        ctx.scale(scale, scale);
        ctx.translate(-12, -12);

        ctx.fillStyle = `${p.color} ${Math.max(0.1, currentOpacity)})`;
        ctx.strokeStyle = `${p.color} ${Math.max(0.1, currentOpacity)})`;

        switch (p.shape) {
          case 'heart':
            ctx.fill(paths.heart);
            break;
          case 'star':
            ctx.fill(paths.star);
            break;
          case 'sparkle':
            ctx.fill(paths.sparkle);
            break;
          case 'triangle':
            ctx.fill(paths.triangle);
            break;
          case 'diamond':
            ctx.fill(paths.diamond);
            break;
          case 'cross':
            ctx.fill(paths.cross);
            break;
          case 'petal':
            ctx.fill(paths.petal);
            break;
          case 'crescent':
            ctx.fill(paths.crescent);
            break;
          case 'hexagon':
            ctx.fill(paths.hexagon);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(12, 12, 8, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'ring':
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(12, 12, 8, 0, Math.PI * 2);
            ctx.stroke();
            break;
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.particleCanvas}
      aria-hidden="true"
    />
  );
};
