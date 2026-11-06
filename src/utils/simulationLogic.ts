export interface AgentReport {
  roleId: 'market_financials' | 'tech_trends' | 'politics_regulatory' | 'news_sentiment';
  agentName: string;
  roleTitle: string;
  score: number; // 0-100
  keyMetrics: Record<string, string | number>;
  detailedReport: string;
  bullPerspective: string;
  bearPerspective: string;
}

export interface SimulationResult {
  ticker: string;
  companyName: string;
  timestamp: string;
  agentReports: Record<string, AgentReport>;
  finalSynthesis: {
    recommendedStock: string;
    ticker: string;
    convictionGrade: string;
    compositeScore: number;
    targetPrice: number;
    projectedUpside: number;
    verdictSummary: string;
    keyCatalysts: string[];
    criticalRisks: string[];
    recommendedAllocation: string;
  };
}

export const AGENT_WEIGHTS = {
  market_financials: 0.30,
  tech_trends: 0.30,
  politics_regulatory: 0.20,
  news_sentiment: 0.20,
};

/**
 * Calculates weighted consensus score across the 4 specific agents
 */
export function calculateTeamConsensusScore(
  scores: {
    market_financials: number;
    tech_trends: number;
    politics_regulatory: number;
    news_sentiment: number;
  },
  weights = AGENT_WEIGHTS
): number {
  const composite =
    scores.market_financials * weights.market_financials +
    scores.tech_trends * weights.tech_trends +
    scores.politics_regulatory * weights.politics_regulatory +
    scores.news_sentiment * weights.news_sentiment;

  return Math.round(composite * 10) / 10;
}

/**
 * Determines agreement or disagreement index (variance between agents)
 */
export function calculateAgentDisagreementIndex(scores: number[]): {
  variance: number;
  consensusLevel: 'HIGH UNANIMITY' | 'MODERATE CONSENSUS' | 'SIGNIFICANT DEBATE';
} {
  if (scores.length === 0) return { variance: 0, consensusLevel: 'HIGH UNANIMITY' };

  const mean = scores.reduce((sum, val) => sum + val, 0) / scores.length;
  const variance = scores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / scores.length;
  const standardDeviation = Math.sqrt(variance);

  let consensusLevel: 'HIGH UNANIMITY' | 'MODERATE CONSENSUS' | 'SIGNIFICANT DEBATE' = 'HIGH UNANIMITY';
  if (standardDeviation > 12) {
    consensusLevel = 'SIGNIFICANT DEBATE';
  } else if (standardDeviation > 6) {
    consensusLevel = 'MODERATE CONSENSUS';
  }

  return {
    variance: Math.round(variance * 10) / 10,
    consensusLevel,
  };
}

/**
 * Determines conviction grade based on final composite score
 */
export function determineConvictionGrade(compositeScore: number): string {
  if (compositeScore >= 93) return 'AAA+ STRONGEST BUY';
  if (compositeScore >= 88) return 'AAA STRONG BUY';
  if (compositeScore >= 80) return 'AA BUY';
  if (compositeScore >= 72) return 'A ACCUMULATE';
  return 'HOLD / NEUTRAL';
}
