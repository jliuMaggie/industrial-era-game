import type { AIFamily } from './types';

export const AI_FAMILIES: AIFamily[] = [
  {
    id: 'rothschild_style', name: '罗特希尔德家族', avatar: '🎩',
    strategy: 'conservative', currentAssets: 100000, currentPrestige: 60, investments: [],
  },
  {
    id: 'vanderbilt_style', name: '范德比尔特家族', avatar: '🚂',
    strategy: 'aggressive', currentAssets: 100000, currentPrestige: 45, investments: [],
  },
  {
    id: 'carnegie_style', name: '卡内基家族', avatar: '⚒️',
    strategy: 'balanced', currentAssets: 100000, currentPrestige: 55, investments: [],
  },
  {
    id: 'morgan_style', name: '摩根家族', avatar: '🏛️',
    strategy: 'opportunist', currentAssets: 100000, currentPrestige: 70, investments: [],
  },
  {
    id: 'ford_style', name: '福特家族', avatar: '🚗',
    strategy: 'aggressive', currentAssets: 100000, currentPrestige: 50, investments: [],
  },
];
