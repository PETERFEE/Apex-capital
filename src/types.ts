export interface ExpertScores {
  sciencePhysics: number;
  geopolitics: number;
  valuation: number;
  powerGrid: number;
  riskDefense: number;
}

export interface SimpleExpertPerspective {
  title: string;
  expertRole: string;
  simpleTakeaway: string;
  detailedAnalysis: string;
  score: number;
  highlightStat: string;
  statLabel: string;
}

export interface StockDetail {
  ticker: string;
  name: string;
  exchange: string;
  currentPrice: number;
  targetPrice: number;
  upside: number;
  convictionGrade: string;
  compositeScore: number;
  rank: number;
  tier?: 'best' | 'ok' | 'worst';
  summary: string;
  simpleOneLiner?: string;
  expertBreakdown?: {
    financials: SimpleExpertPerspective;
    technology: SimpleExpertPerspective;
    politics: SimpleExpertPerspective;
    sentiment: SimpleExpertPerspective;
  };
  scienceMoat: string;
  geopolitics: string;
  valuation: string;
  powerAndGrid: string;
  bearCase: string;
  catalysts: string[];
  scores: ExpertScores;
}

export type AppViewMode = 'minimalist' | 'professional';

export interface AgentProfile {
  id: string;
  name: string;
  title: string;
  badge: string;
  icon: string;
  color: string;
  bgLight: string;
  discipline: string;
  coreThesis: string;
  keyEquationsAndLaws: string[];
  currentAssessmentOfTSM: string;
  convictionScore: number;
  frictionPoint: string;
}

export interface Citation {
  title: string;
  url: string;
}

export interface ResearchResponse {
  source: string;
  query: string;
  timestamp: string;
  summary?: string;
  rawAnalysis?: string;
  agents?: Array<{
    name: string;
    role: string;
    opinion: string;
    convictionScore: number;
  }>;
  citations: Citation[];
}
