import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../data/types';

interface Props {
  achievement: Achievement;
  onDismiss: () => void;
}

export default function AchievementUnlock({ achievement, onDismiss }: Props) {
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= achievement.flavorText.length) {
        setTypedText(achievement.flavorText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [showContent, achievement.flavorText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
      angle: number;
      speed: number;
      gravity: number;
    }

    const particles: Particle[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const colors = ['#FFD700', '#FFA500', '#FFEC8B', '#DAA520', '#B8860B', '#FFE4B5'];

    const spawnBurst = () => {
      for (let i = 0; i < 80; i++) {
        const angle = (Math.PI * 2 * i) / 80 + Math.random() * 0.5;
        const speed = Math.random() * 8 + 3;
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 80 + Math.random() * 60,
          size: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle,
          speed,
          gravity: 0.08,
        });
      }
    };

    spawnBurst();

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;

        const alpha = Math.min(1, p.life / 10) * (1 - p.life / p.maxLife);
        if (alpha <= 0 || p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.3;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleClick = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 text-center max-w-lg px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-8xl md:text-9xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{
                duration: 0.8,
                times: [0, 0.6, 1],
                type: 'spring',
                stiffness: 200,
                damping: 12,
              }}
            >
              {achievement.icon}
            </motion.div>

            <motion.h2
              className="font-playfair text-4xl md:text-5xl text-gold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {achievement.name}
            </motion.h2>

            <motion.p
              className="text-xl text-gold-dark mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              已解锁！
            </motion.p>

            <motion.p
              className="text-lg text-white/80 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {achievement.description}
            </motion.p>

            <motion.div
              className="mt-6 min-h-[60px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className="font-playfair text-lg text-white/70 italic leading-relaxed"
              >
                "{typedText}"
                <span className="inline-block w-0.5 h-5 bg-gold ml-1 align-middle"
                  style={{ animation: 'blink 1s step-end infinite' }}
                />
              </p>
            </motion.div>

            <motion.p
              className="text-sm text-white/40 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              点击任意处关闭
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
