import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../engine/GameState';
import { calculateInvest, processYearEndReturns } from '../engine/InvestEngine';
import { simulateAITurn } from '../engine/AISystem';
import { getInvestmentsByEra, getLegendaryInvestments } from '../data/investments';
import { getRandomCrisis } from '../data/crises';
import { getRandomOpportunity } from '../data/opportunities';
import { ERA_NAMES, ERA_YEARS, INITIAL_ASSETS, COMBO_THRESHOLD } from '../data/constants';
import InvestmentCard from '../components/InvestmentCard';
import RankingPanel from '../components/RankingPanel';
import HeirBar from '../components/HeirBar';
import EraTransition from '../components/EraTransition';
import EventModal from '../components/EventModal';
import AchievementUnlock from '../components/AchievementUnlock';
import type { Investment, Crisis, Opportunity } from '../data/types';

export default function MainGame() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [availableInvestments, setAvailableInvestments] = useState<Investment[]>([]);
  const [comboCount, setComboCount] = useState(0);
  const [critCount, setCritCount] = useState(0);
  const [opportunityCount, setOpportunityCount] = useState(0);
  const [survivedCrisis, setSurvivedCrisis] = useState(false);
  const [hasBeenBankrupt, setHasBeenBankrupt] = useState(false);

  const currentEraInvestments = useMemo(() => getInvestmentsByEra(state.era), [state.era]);

  useEffect(() => {
    if (!state.gameStarted) {
      navigate('/');
      return;
    }
    refreshInvestments();
  }, [state.era, state.gameStarted]);

  const refreshInvestments = useCallback(() => {
    const shuffled = [...currentEraInvestments].sort(() => Math.random() - 0.5);
    setAvailableInvestments(shuffled.slice(0, 3));
  }, [currentEraInvestments]);

  useEffect(() => {
    const checks = [
      { id: 'first_investment', condition: state.investments.length > 0 },
      { id: 'millionaire', condition: state.assets >= 1000000 },
      { id: 'billionaire', condition: state.assets >= 1000000000 },
      { id: 'era_master_1', condition: state.era > 1 },
      { id: 'era_master_2', condition: state.era > 2 },
      { id: 'era_master_3', condition: state.era > 3 },
      { id: 'era_master_4', condition: state.era > 4 },
      { id: 'survivor', condition: survivedCrisis && state.assets > 0 },
      { id: 'opportunist', condition: opportunityCount >= 3 },
      { id: 'diversified', condition: new Set(state.investments.map(i => {
        const inv = currentEraInvestments.find(e => e.id === i.investmentId);
        return inv?.category;
      }).filter(Boolean)).size >= 5 },
      { id: 'combo_king', condition: comboCount >= 3 },
      { id: 'crit_master', condition: critCount >= 5 },
      { id: 'prestige_100', condition: state.prestige >= 100 },
      { id: 'prestige_500', condition: state.prestige >= 500 },
      { id: 'rank_1', condition: state.ranking === 1 },
      { id: 'all_eras', condition: state.era >= 4 },
      { id: 'century_merchant', condition: state.turn >= 100 },
    ];

    checks.forEach(check => {
      const achievement = state.achievements.find(a => a.id === check.id);
      if (check.condition && achievement && !achievement.unlocked) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: check.id });
      }
    });

    if (state.assets < INITIAL_ASSETS * 0.1) {
      setHasBeenBankrupt(true);
    }
    if (hasBeenBankrupt && state.assets >= INITIAL_ASSETS * 2) {
      const phoenix = state.achievements.find(a => a.id === 'phoenix');
      if (phoenix && !phoenix.unlocked) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'phoenix' });
      }
    }
  }, [state.investments, state.assets, state.era, state.prestige, state.ranking, state.turn, state.achievements, comboCount, critCount, opportunityCount, survivedCrisis, hasBeenBankrupt, dispatch, currentEraInvestments]);

  const handleInvest = useCallback((investment: Investment) => {
    if (state.assets < investment.cost) return;

    const existing = state.investments.find(i => i.investmentId === investment.id);
    const result = calculateInvest(
      investment.id,
      state.turn,
      (existing?.quantity || 0) + 1,
      existing?.totalReturn || 0
    );

    if (result.isCrit) setCritCount(prev => prev + 1);
    if (result.comboCount >= COMBO_THRESHOLD) setComboCount(prev => prev + 1);

    dispatch({ type: 'INVEST', payload: { investmentId: investment.id, amount: investment.cost } });

    const legendary = state.achievements.find(a => a.id === 'legendary_investor');
    if (investment.level >= 2 && legendary && !legendary.unlocked) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'legendary_investor' });
    }

    refreshInvestments();
  }, [state, dispatch, refreshInvestments]);

  const handleNextYear = useCallback(() => {
    const { totalIncome } = processYearEndReturns(state.investments);
    if (totalIncome !== 0) {
      dispatch({ type: 'APPLY_EFFECTS', payload: { effects: [{ type: 'asset', value: totalIncome / state.assets, description: '年度投资回报' }], isCrisis: false } });
    }

    const shouldTriggerCrisis = Math.random() < 0.40;
    const shouldTriggerOpportunity = !shouldTriggerCrisis && Math.random() < 0.50;
    const shouldTriggerLegendary = !shouldTriggerCrisis && !shouldTriggerOpportunity && Math.random() < 0.10;

    if (shouldTriggerCrisis) {
      const crisis = getRandomCrisis(state.era);
      if (crisis) {
        dispatch({ type: 'TRIGGER_CRISIS', payload: crisis });
        setSurvivedCrisis(true);
      }
    } else if (shouldTriggerOpportunity) {
      const opportunity = getRandomOpportunity(state.era);
      if (opportunity) {
        dispatch({ type: 'TRIGGER_OPPORTUNITY', payload: opportunity });
        setOpportunityCount(prev => prev + 1);
      }
    } else if (shouldTriggerLegendary) {
      const legendaries = getLegendaryInvestments(state.era);
      if (legendaries.length > 0) {
        const legendary = legendaries[Math.floor(Math.random() * legendaries.length)];
        dispatch({ type: 'TRIGGER_OPPORTUNITY', payload: {
          id: legendary.id,
          name: legendary.name,
          year: state.year,
          era: state.era,
          description: legendary.description,
          narrative: legendary.flavorText,
          effects: [],
          icon: legendary.icon,
        } as Opportunity });
      }
    }

    const updatedAIs = simulateAITurn(state.aiFamilies, state.era, state.turn);
    dispatch({ type: 'UPDATE_AI', payload: updatedAIs });

    dispatch({ type: 'NEXT_YEAR' });
    refreshInvestments();
  }, [state, dispatch, refreshInvestments]);

  const handleEventAccept = useCallback(() => {
    if (state.currentEvent?.type === 'crisis') {
      const crisis = state.currentEvent.data as Crisis;
      dispatch({ type: 'APPLY_EFFECTS', payload: { effects: crisis.effects, isCrisis: true } });
    } else if (state.currentEvent?.type === 'opportunity') {
      const opportunity = state.currentEvent.data as Opportunity;
      dispatch({ type: 'APPLY_EFFECTS', payload: { effects: opportunity.effects, isCrisis: false } });
    }
    dispatch({ type: 'DISMISS_EVENT' });
  }, [state, dispatch]);

  const handleEraTransitionComplete = useCallback(() => {
    dispatch({ type: 'DISMISS_ERA_TRANSITION' });
    dispatch({ type: 'NEXT_ERA' });
  }, [dispatch]);

  const eraYearRange = ERA_YEARS[state.era - 1];
  const eraProgress = state.year - eraYearRange.start;
  const eraTotal = eraYearRange.end - eraYearRange.start;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            className="bg-slate-800/50 rounded-xl border border-white/10 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs text-white/50">年份</p>
            <p className="text-2xl font-playfair text-white">{state.year}</p>
          </motion.div>
          <motion.div
            className="bg-slate-800/50 rounded-xl border border-white/10 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs text-white/50">时代</p>
            <p className="text-xl font-playfair text-gold">{ERA_NAMES[state.era - 1]}</p>
            <div className="w-full bg-white/10 rounded-full h-1 mt-2">
              <div
                className="bg-gold rounded-full h-1 transition-all"
                style={{ width: `${(eraProgress / eraTotal) * 100}%` }}
              />
            </div>
          </motion.div>
          <motion.div
            className="bg-slate-800/50 rounded-xl border border-white/10 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs text-white/50">资产</p>
            <p className="text-2xl font-playfair text-gold">{state.assets.toLocaleString()}</p>
          </motion.div>
          <motion.div
            className="bg-slate-800/50 rounded-xl border border-white/10 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-white/50">排名</p>
            <p className="text-2xl font-playfair text-white">#{state.ranking}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investment Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-2xl text-white">投资机会</h2>
            <span className="text-sm text-white/50">回合 {state.turn}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableInvestments.map((inv, i) => (
              <InvestmentCard
                key={inv.id}
                investment={inv}
                onInvest={() => handleInvest(inv)}
                canAfford={state.assets >= inv.cost}
                index={i}
              />
            ))}
          </div>

          <motion.button
            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium text-lg transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleNextYear}
          >
            进入下一年 →
          </motion.button>

          <HeirBar familyName={state.familyName} era={state.era} turn={state.turn} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RankingPanel
            aiFamilies={state.aiFamilies}
            playerAssets={state.assets}
            playerName={state.familyName}
          />
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {state.eraTransition && (
          <EraTransition
            transition={state.eraTransition}
            stats={{
              assetPeak: state.lastAssetPeak,
              investmentCount: state.investments.length,
              ranking: state.ranking,
            }}
            onComplete={handleEraTransitionComplete}
          />
        )}

        {state.currentEvent && (
          <EventModal
            event={state.currentEvent}
            onAccept={handleEventAccept}
            onDecline={() => dispatch({ type: 'DISMISS_EVENT' })}
            playerAssets={state.assets}
          />
        )}

        {state.currentAchievement && (
          <AchievementUnlock
            achievement={state.currentAchievement}
            onDismiss={() => dispatch({ type: 'DISMISS_ACHIEVEMENT' })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
