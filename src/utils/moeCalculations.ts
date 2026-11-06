export interface ExpertScore {
  sciencePhysics: number; // 0-100
  geopolitics: number;    // 0-100
  valuation: number;      // 0-100
  powerGrid: number;      // 0-100
  riskDefense: number;    // 0-100
}

export interface StockCandidate {
  ticker: string;
  name: string;
  sector: string;
  currentPrice: number;
  forwardPE: number;
  expectedGrowthRate: number; // % e.g. 28.5
  scores: ExpertScore;
  taiwanRiskExposure: number; // % 0-100
  packagingMoatIndex: number; // 0-100
  thermalPowerMoat: number;   // 0-100
}

export interface RankedCandidate extends StockCandidate {
  compositeScore: number;
  projectedUpside: number;
  targetPrice: number;
  rank: number;
  recommendation: 'STRONG BUY' | 'BUY' | 'ACCUMULATE' | 'HOLD';
}

export const DEFAULT_WEIGHTS = {
  sciencePhysics: 0.30, // Hardware physics & engineering moat
  valuation: 0.25,      // Price discipline & FCF yield
  powerGrid: 0.15,      // Datacenter energy & thermal reality
  geopolitics: 0.15,    // Sovereign policy & tariff resilience
  riskDefense: 0.15,    // Downside margin of safety
};

/**
 * Calculates weighted MoE conviction score (0 - 100)
 */
export function calculateMoEWeightedScore(
  scores: ExpertScore,
  weights: Record<keyof ExpertScore, number> = DEFAULT_WEIGHTS
): number {
  const total =
    scores.sciencePhysics * (weights.sciencePhysics ?? 0) +
    scores.geopolitics * (weights.geopolitics ?? 0) +
    scores.valuation * (weights.valuation ?? 0) +
    scores.powerGrid * (weights.powerGrid ?? 0) +
    scores.riskDefense * (weights.riskDefense ?? 0);

  return Math.round(total * 10) / 10;
}

/**
 * Computes projected target price and upside % based on PEG and EPS growth
 */
export function computeTargetPrice(
  currentPrice: number,
  forwardPE: number,
  expectedGrowthRate: number,
  targetPEG: number = 1.35
): { targetPrice: number; upsidePercentage: number } {
  if (currentPrice <= 0 || forwardPE <= 0 || expectedGrowthRate <= 0) {
    return { targetPrice: currentPrice, upsidePercentage: 0 };
  }

  // Fair target P/E = Target PEG * Growth Rate (capped between 15x and 45x)
  const justifiedPE = Math.min(Math.max(targetPEG * expectedGrowthRate, 16), 42);
  const multipleExpansionRatio = justifiedPE / forwardPE;
  const targetPrice = Math.round(currentPrice * multipleExpansionRatio * 100) / 100;
  const upsidePercentage = Math.round(((targetPrice - currentPrice) / currentPrice) * 1000) / 10;

  return { targetPrice, upsidePercentage };
}

/**
 * Evaluates engineering moat strength based on lithography node and advanced packaging
 */
export function calculatePhysicsMoatScore(
  nanometerNode: number,
  packagingYield: number,
  thermalEfficiency: number
): number {
  // Lower nanometer = higher score (2nm vs 5nm vs 14nm)
  const nodeScore = Math.max(0, Math.min(100, (10 - nanometerNode) * 12.5));
  const yieldComponent = Math.max(0, Math.min(100, packagingYield));
  const thermalComponent = Math.max(0, Math.min(100, thermalEfficiency));

  return Math.round((nodeScore * 0.45 + yieldComponent * 0.35 + thermalComponent * 0.20) * 10) / 10;
}

/**
 * Calculates geopolitical vulnerability factor (lower is safer, 0-100)
 */
export function calculateGeopoliticalRiskFactor(
  taiwanExposurePercent: number,
  domesticDiversificationRate: number,
  defensePactIndex: number
): number {
  const baseExposure = taiwanExposurePercent;
  const mitigated = baseExposure * (1 - (domesticDiversificationRate / 100) * 0.5);
  const netRisk = Math.max(0, Math.min(100, mitigated - defensePactIndex * 0.25));
  return Math.round(netRisk * 10) / 10;
}

/**
 * Synthesizes candidate list and produces institutional rankings
 */
export function synthesizeStockRanking(
  stocks: StockCandidate[],
  customWeights: Record<keyof ExpertScore, number> = DEFAULT_WEIGHTS
): RankedCandidate[] {
  const scored = stocks.map((stock) => {
    const compositeScore = calculateMoEWeightedScore(stock.scores, customWeights);
    const { targetPrice, upsidePercentage } = computeTargetPrice(
      stock.currentPrice,
      stock.forwardPE,
      stock.expectedGrowthRate
    );

    let recommendation: 'STRONG BUY' | 'BUY' | 'ACCUMULATE' | 'HOLD' = 'HOLD';
    if (compositeScore >= 90) recommendation = 'STRONG BUY';
    else if (compositeScore >= 80) recommendation = 'BUY';
    else if (compositeScore >= 70) recommendation = 'ACCUMULATE';

    return {
      ...stock,
      compositeScore,
      targetPrice,
      projectedUpside: upsidePercentage,
      rank: 1,
      recommendation,
    };
  });

  // Sort descending by composite score, then by upside
  scored.sort((a, b) => b.compositeScore - a.compositeScore || b.projectedUpside - a.projectedUpside);

  // Assign ranks
  return scored.map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));
}
