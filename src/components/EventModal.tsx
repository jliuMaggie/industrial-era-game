import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Crisis, Opportunity, Investment, GameEvent } from '../data/types';

interface Props {
  event: GameEvent;
  onAccept: () => void;
  onDecline?: () => void;
  playerAssets: number;
}

export default function EventModal({ event, onAccept, onDecline, playerAssets }: Props) {
  const [typedText, setTypedText] = useState('');
  const [showEffects, setShowEffects] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isCrisis = event.type === 'crisis';
  const isOpportunity = event.type === 'opportunity';
  const isLegendary = event.type === 'legendary';

  const data = event.data;
  const narrative = isCrisis ? (data as Crisis).narrative : isOpportunity ? (data as Opportunity).narrative : (data as Investment).flavorText;
  const effects = isCrisis ? (data as Crisis).effects : isOpportunity ? (data as Opportunity).effects : [];
  const title = isCrisis ? (data as Crisis).name : isOpportunity ? (data as Opportunity).name : (data as Investment).name;
  const year = isCrisis ? (data as Crisis).year : isOpportunity ? (data as Opportunity).year : undefined;

  const themeColor = isCrisis ? '#DC2626' : isOpportunity ? '#F59E0B' : '#FFD700';
  const bgGradient = isCrisis
    ? 'from-red-950/90 via-black/80 to-red-900/70'
    : isOpportunity
    ? 'from-amber-950/90 via-black/80 to-amber-900/70'
    : 'from-slate-950/95 via-slate-900/90 to-black/95';
  const headerText = isCrisis ? '时代危机降临' : isOpportunity ? '时代机遇降临' : '传说投资机会出现！';
  const buttonText = isCrisis ? '接受命运' : isOpportunity ? '把握机遇' : '立即投资';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= narrative.length) {
        setTypedText(narrative.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setShowEffects(true);
        setTimeout(() => setShowButtons(true), 500);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [narrative]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }[] = [];

    const spawnParticle = () => {
      const colors = isCrisis
        ? ['#DC2626', '#FF4500', '#8B0000', '#FF6347']
        : isOpportunity
        ? ['#FFD700', '#FFA500', '#FFEC8B', '#DAA520']
        : ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0088FF', '#FF00FF'];
      particles.push({
        x: Math.random() * canvas.width,
        y: isCrisis ? canvas.height + 10 : Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isCrisis ? 2 : 1),
        vy: isCrisis ? -Math.random() * 3 - 1 : (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: 100 + Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.3) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        if (isCrisis) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = alpha * 0.5;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [isCrisis, isOpportunity]);

  const handleAccept = useCallback(() => {
    if (showButtons) onAccept();
  }, [showButtons, onAccept]);

  const handleDecline = useCallback(() => {
    if (showButtons && onDecline) onDecline();
  }, [showButtons, onDecline]);

  const canAfford = isLegendary ? playerAssets >= ((data as Investment)?.cost || Infinity) : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => { if (showButtons && !isLegendary) handleAccept(); }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className={`absolute inset-0 bg-gradient-to-b ${bgGradient}`} />

      {isLegendary && (
        <motion.div
          className="absolute inset-4 border-4 rounded-2xl pointer-events-none"
          style={{ borderColor: themeColor }}
          animate={{
            borderColor: ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0088FF', '#FF00FF', '#FF0000'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      <motion.div
        className="relative z-10 max-w-2xl w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          className="text-center mb-8"
          animate={isCrisis ? { textShadow: ['0 0 20px #DC2626', '0 0 40px #DC2626', '0 0 20px #DC2626'] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair mb-2"
            style={{ color: themeColor }}
          >
            {headerText}
          </h2>
          {isCrisis && (
            <motion.div
              className="w-32 h-1 mx-auto rounded"
              style={{ backgroundColor: themeColor }}
              animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10">
          <h3 className="text-3xl md:text-4xl font-playfair text-white mb-2 text-center">
            {title}
          </h3>
          {year && (
            <p className="text-center text-white/50 text-lg mb-6">{year}年</p>
          )}

          <div className="min-h-[120px] mb-6">
            <p className="font-playfair text-lg md:text-xl text-white/90 leading-relaxed"
            >
              {typedText}
              <span className="inline-block w-0.5 h-5 bg-white/70 ml-1 align-middle"
                style={{
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </p>
          </div>

          {showEffects && effects.length > 0 && (
            <motion.div
              className="space-y-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {effects.map((effect, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <span className="text-2xl">{isCrisis ? '🔻' : '🔺'}</span>
                  <div>
                    <p className="text-white font-medium">{effect.description}</p>
                    <p className="text-sm text-white/60">
                      {effect.type === 'asset'
                        ? `${effect.value > 0 ? '+' : ''}${(effect.value * 100).toFixed(0)}%`
                        : `${effect.value > 0 ? '+' : ''}${effect.value}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {isLegendary && (
            <div className="text-center mb-6">
              <p className="text-gold text-lg mb-2">
                需要资金: {(data as Investment).cost.toLocaleString()}
              </p>
              <p className="text-white/60">
                预期回报率: {((data as Investment).returnRate * 100).toFixed(0)}%
              </p>
            </div>
          )}

          {showButtons && (
            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                className="px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                style={{
                  backgroundColor: canAfford ? themeColor : '#555',
                  color: isCrisis || isLegendary ? '#fff' : '#000',
                }}
                whileHover={canAfford ? { scale: 1.05 } : {}}
                whileTap={canAfford ? { scale: 0.95 } : {}}
                onClick={(e) => { e.stopPropagation(); handleAccept(); }}
                disabled={!canAfford}
              >
                {canAfford ? buttonText : '资金不足'}
              </motion.button>

              {isLegendary && onDecline && (
                <motion.button
                  className="px-8 py-3 rounded-lg font-semibold text-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); handleDecline(); }}
                >
                  放弃
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
