import { CRIT_CHANCE, CRIT_MULTIPLIER, COMBO_THRESHOLD, COMBO_MULTIPLIER } from '../data/constants';
import { getInvestmentById } from '../data/investments';
import type { OwnedInvestment } from '../data/types';

export interface InvestResult {
  baseReturn: number;
  isCrit: boolean;
  critMultiplier: number;
  comboCount: number;
  comboMultiplier: number;
  finalReturn: number;
  totalReturn: number;
}

let comboCounter = 0;
let lastInvestTurn = 0;

export function calculateInvest(
  investmentId: string,
  turn: number,
  _quantity: number,
  existingTotalReturn: number
): InvestResult {
  const investment = getInvestmentById(investmentId);
  if (!investment) {
    return {
      baseReturn: 0, isCrit: false, critMultiplier: 1,
      comboCount: 0, comboMultiplier: 1, finalReturn: 0, totalReturn: existingTotalReturn,
    };
  }

  const baseReturn = investment.returnRate * investment.cost;

  const isCrit = Math.random() < CRIT_CHANCE;
  const critMultiplier = isCrit ? CRIT_MULTIPLIER : 1;

  if (turn === lastInvestTurn + 1) {
    comboCounter++;
  } else {
    comboCounter = 1;
  }
  lastInvestTurn = turn;

  const comboMultiplier = comboCounter >= COMBO_THRESHOLD ? COMBO_MULTIPLIER : 1;
  const comboCount = comboCounter;

  const finalReturn = baseReturn * critMultiplier * comboMultiplier;
  const totalReturn = existingTotalReturn + finalReturn;

  return {
    baseReturn,
    isCrit,
    critMultiplier,
    comboCount,
    comboMultiplier,
    finalReturn,
    totalReturn,
  };
}

export function resetCombo() {
  comboCounter = 0;
  lastInvestTurn = 0;
}

export function getComboCount(): number {
  return comboCounter;
}

export function processYearEndReturns(investments: OwnedInvestment[]): { updatedInvestments: OwnedInvestment[]; totalIncome: number } {
  let totalIncome = 0;
  const updatedInvestments = investments.map(inv => {
    const investment = getInvestmentById(inv.investmentId);
    if (!investment) return inv;

    const yearlyReturn = investment.returnRate * investment.cost * inv.quantity;
    totalIncome += yearlyReturn;

    return {
      ...inv,
      totalReturn: inv.totalReturn + yearlyReturn,
    };
  });

  return { updatedInvestments, totalIncome };
}
