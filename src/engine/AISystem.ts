import { getInvestmentsByEra } from '../data/investments';
import type { AIFamily } from '../data/types';

export function simulateAITurn(aiFamilies: AIFamily[], era: number, _turn: number): AIFamily[] {
  const availableInvestments = getInvestmentsByEra(era);
  if (availableInvestments.length === 0) return aiFamilies;

  return aiFamilies.map(ai => {
    const strategy = ai.strategy;
    let targetInvestments = [...ai.investments];
    let assets = ai.currentAssets;
    let prestige = ai.currentPrestige;

    const numInvestments = strategy === 'aggressive' ? 3 : strategy === 'conservative' ? 1 : 2;

    for (let i = 0; i < numInvestments; i++) {
      const affordable = availableInvestments.filter(inv => inv.cost <= assets * 0.3);
      if (affordable.length === 0) break;

      let chosen;
      if (strategy === 'aggressive') {
        chosen = affordable.reduce((a, b) => (a.returnRate > b.returnRate ? a : b));
      } else if (strategy === 'conservative') {
        chosen = affordable.reduce((a, b) => (a.riskLevel < b.riskLevel ? a : b));
      } else if (strategy === 'opportunist') {
        chosen = affordable[Math.floor(Math.random() * affordable.length)];
      } else {
        chosen = affordable.reduce((a, b) => (a.returnRate / a.riskLevel > b.returnRate / b.riskLevel ? a : b));
      }

      if (chosen && chosen.cost <= assets * 0.3) {
        assets -= chosen.cost;
        if (!targetInvestments.includes(chosen.id)) {
          targetInvestments = [...targetInvestments, chosen.id];
        }
        prestige += 2;
      }
    }

    const growthRate = strategy === 'aggressive' ? 0.15 : strategy === 'conservative' ? 0.08 : 0.12;
    const randomFactor = 0.9 + Math.random() * 0.2;
    assets = Math.max(1000, assets * (1 + growthRate * randomFactor));

    return {
      ...ai,
      currentAssets: Math.floor(assets),
      currentPrestige: prestige,
      investments: targetInvestments,
    };
  });
}

export function calculateRanking(playerAssets: number, aiFamilies: AIFamily[]): number {
  const allAssets = [
    { id: 'player', assets: playerAssets },
    ...aiFamilies.map(f => ({ id: f.id, assets: f.currentAssets })),
  ];
  allAssets.sort((a, b) => b.assets - a.assets);
  const rank = allAssets.findIndex(a => a.id === 'player') + 1;
  return rank;
}
