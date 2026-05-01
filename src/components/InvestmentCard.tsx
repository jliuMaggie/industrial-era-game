import { motion } from 'framer-motion';
import type { Investment } from '../data/types';

interface Props {
  investment: Investment;
  onInvest: () => void;
  canAfford: boolean;
  index: number;
}

export default function InvestmentCard({ investment, onInvest, canAfford, index }: Props) {
  return (
    <motion.div
      className={`relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl border border-white/10 p-5 cursor-pointer transition-all hover:border-white/30 ${
        !canAfford ? 'opacity-50 pointer-events-none' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onInvest}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl">{investment.icon}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">
          {investment.category}
        </span>
      </div>

      <h3 className="font-playfair text-xl text-white mb-1">{investment.name}</h3>
      <p className="text-sm text-white/50 mb-3 line-clamp-2">{investment.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/50">成本</span>
          <span className="text-gold font-mono">{investment.cost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">回报率</span>
          <span className="text-green-400">{(investment.returnRate * 100).toFixed(0)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">风险</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < investment.riskLevel ? 'bg-red-400' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-white/40 italic line-clamp-2">{investment.flavorText}</p>

      <motion.button
        className="w-full mt-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        投资
      </motion.button>
    </motion.div>
  );
}
