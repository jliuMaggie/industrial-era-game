import { motion } from 'framer-motion';

interface Props {
  familyName: string;
  era: number;
  turn: number;
}

export default function HeirBar({ familyName, era, turn }: Props) {
  const generation = Math.floor((turn - 1) / 20) + 1;
  const heirNames = ['长子', '次子', '三子', '长孙', '曾孙', '玄孙'];
  const heirName = heirNames[Math.min(generation - 1, heirNames.length - 1)];

  return (
    <motion.div
      className="bg-slate-800/50 rounded-xl border border-white/10 p-4 flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-2xl">
        👤
      </div>
      <div>
        <p className="text-white font-medium">
          {familyName}家族 · {heirName}
        </p>
        <p className="text-sm text-white/50">
          第{generation}代继承人 · 已传承{turn}年
        </p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-xs text-white/40">时代</p>
        <p className="text-gold font-playfair">{era}/4</p>
      </div>
    </motion.div>
  );
}
