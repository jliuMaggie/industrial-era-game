import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EraTransitionState } from '../data/types';
import { getTransitionText } from '../data/transitionTexts';
import { ERA_NAMES, ERA_COLORS } from '../data/constants';

interface Props {
  transition: EraTransitionState;
  stats: { assetPeak: number; investmentCount: number; ranking: number };
  onComplete: () => void;
}

export default function EraTransition({ transition, stats, onComplete }: Props) {
  const [stage, setStage] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const transitionText = getTransitionText(transition.fromEra, transition.toEra);

  const lines = transitionText?.lines || ['时代更迭...'];
  const fromEraName = transition.fromEra === 0 ? '序章' : ERA_NAMES[transition.fromEra - 1];
  const toEraName = ERA_NAMES[transition.toEra - 1];
  const toEraColor = ERA_COLORS[transition.toEra - 1];

  useEffect(() => {
    stageTimerRef.current = setTimeout(() => setStage(1), 4000);
    return () => clearTimeout(stageTimerRef.current);
  }, []);

  useEffect(() => {
    if (stage !== 1) return;
    if (currentLineIndex >= lines.length) {
      const timer = setTimeout(() => setStage(2), 2000);
      return () => clearTimeout(timer);
    }

    const line = lines[currentLineIndex];
    if (currentCharIndex >= line.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 600);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentCharIndex(prev => prev + 1);
      setTypedLines(prev => {
        const next = [...prev];
        next[currentLineIndex] = line.slice(0, currentCharIndex + 1);
        return next;
      });
    }, 45);
    return () => clearTimeout(timer);
  }, [stage, currentLineIndex, currentCharIndex, lines]);

  useEffect(() => {
    if (stage === 2) {
      const timer = setTimeout(() => setShowContinue(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number; color: string }[] = [];
    const colors = ['#FFD700', '#FFA500', '#FF6347', '#87CEEB', '#DDA0DD'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1 - 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.003;
        if (p.alpha <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.alpha = Math.random() * 0.8 + 0.2;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [stage]);

  const handleContinue = useCallback(() => {
    if (stage === 2 && showContinue) {
      onComplete();
    }
  }, [stage, showContinue, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleContinue}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ backgroundColor: stage === 1 ? toEraColor : '#000000' }}
        transition={{ duration: 3 }}
      />

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="stage0"
            className="relative z-10 text-center max-w-3xl px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="font-playfair text-5xl md:text-7xl text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              {fromEraName} 即将结束...
            </motion.h2>
            
            <motion.div
              className="grid grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-playfair text-gold">{stats.assetPeak.toLocaleString()}</div>
                <div className="text-sm text-white/70 mt-1">资产峰值</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-playfair text-gold">{stats.investmentCount}</div>
                <div className="text-sm text-white/70 mt-1">投资项目</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-playfair text-gold">#{stats.ranking}</div>
                <div className="text-sm text-white/70 mt-1">家族排名</div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="stage1"
            className="relative z-10 text-center max-w-4xl px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h3
              className="font-playfair text-3xl md:text-4xl text-gold mb-12 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {transitionText?.title || '时代更迭'}
            </motion.h3>
            
            <div className="space-y-4">
              {lines.map((_line, i) => (
                <motion.p
                  key={i}
                  className="font-playfair text-xl md:text-2xl text-white/90 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={i <= currentLineIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6 }}
                >
                  {typedLines[i] || ''}
                  {i === currentLineIndex && (
                    <motion.span
                      className="inline-block w-0.5 h-6 bg-gold ml-1 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    />
                  )}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="stage2"
            className="relative z-10 text-center max-w-3xl px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              className="font-playfair text-6xl md:text-8xl text-white mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }}
            >
              {toEraName}
            </motion.h2>
            <motion.p
              className="text-2xl text-gold mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              已开启
            </motion.p>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, staggerChildren: 0.2 }}
            >
              {['新投资类型', '新科技树', '新竞争格局', '新风险', '新机遇'].map((item, i) => (
                <motion.div
                  key={item}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white/80"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.3 }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {showContinue && (
              <motion.button
                className="px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-dark transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onComplete(); }}
              >
                继续征程
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
