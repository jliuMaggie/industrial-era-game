import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { GameState, GameAction } from '../data/types';
import { INITIAL_ASSETS, INITIAL_PRESTIGE, START_YEAR, TURNS_PER_ERA, MAX_ERAS } from '../data/constants';
import { AI_FAMILIES } from '../data/aiFamilies';
import { ACHIEVEMENTS } from '../data/achievements';
import { calculateRanking } from '../engine/AISystem';

const initialState: GameState = {
  year: START_YEAR,
  era: 1,
  familyName: '',
  assets: INITIAL_ASSETS,
  prestige: INITIAL_PRESTIGE,
  investments: [],
  ranking: 3,
  history: [],
  turn: 1,
  aiFamilies: AI_FAMILIES.map(f => ({ ...f })),
  achievements: ACHIEVEMENTS.map(a => ({ ...a })),
  lastAssetPeak: INITIAL_ASSETS,
  gameStarted: false,
  currentEvent: null,
  currentAchievement: null,
  eraTransition: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...initialState,
        familyName: action.payload.familyName,
        gameStarted: true,
        aiFamilies: AI_FAMILIES.map(f => ({ ...f, currentAssets: INITIAL_ASSETS + Math.random() * 20000 - 10000 })),
      };
    }

    case 'INVEST': {
      const { investmentId, amount } = action.payload;
      const cost = amount;
      if (state.assets < cost) return state;

      const existing = state.investments.find(i => i.investmentId === investmentId);
      const newInvestments = existing
        ? state.investments.map(i =>
            i.investmentId === investmentId
              ? { ...i, quantity: i.quantity + 1, totalReturn: i.totalReturn }
              : i
          )
        : [...state.investments, { investmentId, quantity: 1, totalReturn: 0 }];

      return {
        ...state,
        assets: state.assets - cost,
        investments: newInvestments,
        history: [
          ...state.history,
          { year: state.year, action: `投资`, result: investmentId, assetChange: -cost },
        ],
      };
    }

    case 'NEXT_YEAR': {
      const newYear = state.year + 1;
      const newTurn = state.turn + 1;
      const shouldAdvanceEra = newTurn > state.era * TURNS_PER_ERA && state.era < MAX_ERAS;

      return {
        ...state,
        year: newYear,
        turn: newTurn,
        era: shouldAdvanceEra ? state.era + 1 : state.era,
        eraTransition: shouldAdvanceEra
          ? { fromEra: state.era, toEra: state.era + 1, stage: 0 }
          : state.eraTransition,
        lastAssetPeak: Math.max(state.lastAssetPeak, state.assets),
      };
    }

    case 'TRIGGER_CRISIS': {
      return {
        ...state,
        currentEvent: { type: 'crisis', data: action.payload },
      };
    }

    case 'TRIGGER_OPPORTUNITY': {
      return {
        ...state,
        currentEvent: { type: 'opportunity', data: action.payload },
      };
    }

    case 'NEXT_ERA': {
      const nextEra = state.era + 1;
      return {
        ...state,
        era: nextEra,
        prestige: state.prestige + 50,
        history: [
          ...state.history,
          { year: state.year, action: '时代跨越', result: `进入第${nextEra}时代`, assetChange: 0 },
        ],
      };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      return {
        ...state,
        achievements: state.achievements.map(a =>
          a.id === action.payload ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
        ),
        currentAchievement: state.achievements.find(a => a.id === action.payload) || null,
      };
    }

    case 'DISMISS_EVENT': {
      return { ...state, currentEvent: null };
    }

    case 'DISMISS_ACHIEVEMENT': {
      return { ...state, currentAchievement: null };
    }

    case 'DISMISS_ERA_TRANSITION': {
      return { ...state, eraTransition: null };
    }

    case 'UPDATE_AI': {
      return {
        ...state,
        aiFamilies: action.payload,
        ranking: calculateRanking(state.assets, action.payload),
      };
    }

    case 'LEGENDARY_INVEST': {
      const { investmentId } = action.payload;
      return {
        ...state,
        currentEvent: null,
        investments: [...state.investments, { investmentId, quantity: 1, totalReturn: 0 }],
      };
    }

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
