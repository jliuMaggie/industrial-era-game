import { motion } from 'framer-motion';
import type { AIFamily } from '../data/types';

interface Props {
  aiFamilies: AIFamily[];
  playerAssets: number;
  playerName: string;
}

export default function RankingPanel({ aiFamilies, playerAssets, playerName }: Props) {
  const allFamilies = [
    { id: 'player', name: playerName || '你的家族', assets: playerAssets, isPlayer: true },
    ...aiFamilies.map(f => ({ id: f.id, name: f.name, assets: f.currentAssets, isPlayer: false })),
  ];

  allFamilies.sort((a, b) => b.assets - a.assets);

  return (
    <div className="bg-slate-800/50 rounded-xl border border-white/10 p-4">
      <h3 className="font-playfair text-lg text-gold mb-4">家族排名</h3>
      <div className="space-y-2">
        {allFamilies.map((family, index) => (
          <motion.div
            key={family.id}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              family.isPlayer ? 'bg-gold/10 border border-gold/30' : 'bg-white/5'
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className={`text-sm font-bold w-6 ${
              index === 0 ? 'text-gold' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-white/40'
            }`}>
              #{index + 1}
            </span>
            <span className="text-lg">{family.isPlayer ? '👤' : aiFamilies.find(f => f.id === family.id)?.avatar || '🎩'}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm truncate ${family.isPlayer ? 'text-gold' : 'text-white/80'}`}>
                {family.name}
              </p>
            </div>
            <span className="text-xs font-mono text-white/60">
              {family.assets.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
