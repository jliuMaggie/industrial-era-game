import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../engine/GameState';

export default function StartScreen() {
  const [familyName, setFamilyName] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useGame();

  const handleStart = useCallback(() => {
    if (familyName.trim()) {
      dispatch({ type: 'START_GAME', payload: { familyName: familyName.trim() } });
      navigate('/play');
    }
  }, [familyName, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 text-center max-w-2xl px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-4 leading-tight">
            家族穿越
          </h1>
          <motion.h2
            className="font-playfair text-2xl md:text-3xl text-gold mb-12 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            工业革命纪元
          </motion.h2>
        </motion.div>

        <motion.p
          className="text-white/60 text-lg mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          从1830年的蒸汽机到2025年的量子计算。
          <br />
          引领你的家族穿越四个工业革命时代。
          <br />
          投资、扩张、 survive 危机、把握机遇。
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <input
            type="text"
            placeholder="输入你的家族名称..."
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            className="w-full max-w-md mx-auto block px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-center text-lg focus:outline-none focus:border-gold/50 focus:bg-white/15 transition-all"
          />

          <motion.button
            className="px-12 py-4 bg-gold text-black font-playfair text-xl font-bold rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: familyName.trim() ? 1.05 : 1 }}
            whileTap={{ scale: familyName.trim() ? 0.95 : 1 }}
            onClick={handleStart}
            disabled={!familyName.trim()}
          >
            开启征程
          </motion.button>
        </motion.div>

        <motion.p
          className="text-white/30 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          跨越四个时代 · 200年商业史诗 · 你的决策决定家族命运
        </motion.p>
      </div>
    </div>
  );
}
