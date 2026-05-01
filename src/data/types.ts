export interface Investment {
  id: string;
  name: string;
  description: string;
  cost: number;
  returnRate: number;
  riskLevel: number;
  category: string;
  era: number;
  level: number;
  icon: string;
  flavorText: string;
}

export interface Crisis {
  id: string;
  name: string;
  year: number;
  era: number;
  description: string;
  narrative: string;
  effects: Effect[];
  icon: string;
}

export interface Opportunity {
  id: string;
  name: string;
  year: number;
  era: number;
  description: string;
  narrative: string;
  effects: Effect[];
  icon: string;
}

export interface Effect {
  type: 'asset' | 'prestige' | 'investment' | 'ranking';
  value: number;
  description: string;
}

export interface AIFamily {
  id: string;
  name: string;
  avatar: string;
  strategy: 'aggressive' | 'conservative' | 'balanced' | 'opportunist';
  currentAssets: number;
  currentPrestige: number;
  investments: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  flavorText: string;
  icon: string;
  condition: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface EraTransitionText {
  fromEra: number;
  toEra: number;
  title: string;
  lines: string[];
}

export interface GameState {
  year: number;
  era: number;
  familyName: string;
  assets: number;
  prestige: number;
  investments: OwnedInvestment[];
  ranking: number;
  history: HistoryEntry[];
  turn: number;
  aiFamilies: AIFamily[];
  achievements: Achievement[];
  lastAssetPeak: number;
  gameStarted: boolean;
  currentEvent: GameEvent | null;
  currentAchievement: Achievement | null;
  eraTransition: EraTransitionState | null;
}

export interface OwnedInvestment {
  investmentId: string;
  quantity: number;
  totalReturn: number;
}

export interface HistoryEntry {
  year: number;
  action: string;
  result: string;
  assetChange: number;
}

export interface GameEvent {
  type: 'crisis' | 'opportunity' | 'legendary';
  data: Crisis | Opportunity | Investment;
}

export interface EraTransitionState {
  fromEra: number;
  toEra: number;
  stage: number;
}

export type GameAction =
  | { type: 'START_GAME'; payload: { familyName: string } }
  | { type: 'INVEST'; payload: { investmentId: string; amount: number } }
  | { type: 'NEXT_YEAR' }
  | { type: 'TRIGGER_CRISIS'; payload: Crisis }
  | { type: 'TRIGGER_OPPORTUNITY'; payload: Opportunity }
  | { type: 'NEXT_ERA' }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'DISMISS_EVENT' }
  | { type: 'DISMISS_ACHIEVEMENT' }
  | { type: 'DISMISS_ERA_TRANSITION' }
  | { type: 'SET_ERA_TRANSITION_STAGE'; payload: number }
  | { type: 'LEGENDARY_INVEST'; payload: { investmentId: string } }
  | { type: 'UPDATE_AI'; payload: AIFamily[] };
