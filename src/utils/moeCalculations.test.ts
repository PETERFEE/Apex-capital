import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMoEWeightedScore,
  computeTargetPrice,
  calculatePhysicsMoatScore,
  calculateGeopoliticalRiskFactor,
  synthesizeStockRanking,
  DEFAULT_WEIGHTS,
  StockCandidate,
} from './moeCalculations';

test('calculateMoEWeightedScore computes correctly with default weights', () => {
  const scores = {
    sciencePhysics: 98,
    geopolitics: 75,
    valuation: 92,
    powerGrid: 88,
    riskDefense: 80,
  };
  // 98*0.30 (29.4) + 75*0.15 (11.25) + 92*0.25 (23.0) + 88*0.15 (13.2) + 80*0.15 (12.0) = 88.85 -> 88.9
  const score = calculateMoEWeightedScore(scores, DEFAULT_WEIGHTS);
  assert.equal(score, 88.9);
});

test('computeTargetPrice calculates upside and fair target price', () => {
  const result = computeTargetPrice(200, 20, 25, 1.2);
  // targetPEG 1.2 * 25 = 30 P/E
  // 30 / 20 = 1.5x -> 200 * 1.5 = 300 target
  // upside = 50%
  assert.equal(result.targetPrice, 300);
  assert.equal(result.upsidePercentage, 50);
});

test('calculatePhysicsMoatScore ranks leading edge higher', () => {
  const tsmcMoat = calculatePhysicsMoatScore(2, 95, 85); // 2nm node
  const legacyMoat = calculatePhysicsMoatScore(14, 80, 50); // 14nm node

  assert.ok(tsmcMoat > legacyMoat, 'TSMC 2nm node should have a strictly higher physics moat than 14nm');
  assert.ok(tsmcMoat > 85, 'Leading edge packaging & 2nm should score above 85');
});

test('calculateGeopoliticalRiskFactor properly discounts diversification', () => {
  const highRisk = calculateGeopoliticalRiskFactor(90, 5, 20); // 90% in Taiwan, only 5% diversified
  const diversifiedRisk = calculateGeopoliticalRiskFactor(90, 40, 20); // 40% diversified into Arizona, Kumamoto, Dresden

  assert.ok(diversifiedRisk < highRisk, 'Diversified fabs should reduce geopolitical risk score');
});

test('synthesizeStockRanking ranks candidates and assigns Strong Buy', () => {
  const candidates: StockCandidate[] = [
    {
      ticker: 'TSM',
      name: 'Taiwan Semiconductor',
      sector: 'Foundry & Advanced Packaging',
      currentPrice: 195,
      forwardPE: 22,
      expectedGrowthRate: 28,
      scores: {
        sciencePhysics: 99,
        geopolitics: 74,
        valuation: 94,
        powerGrid: 90,
        riskDefense: 85,
      },
      taiwanRiskExposure: 82,
      packagingMoatIndex: 98,
      thermalPowerMoat: 88,
    },
    {
      ticker: 'NVDA',
      name: 'NVIDIA Corp',
      sector: 'Accelerated Compute & Silicon',
      currentPrice: 135,
      forwardPE: 34,
      expectedGrowthRate: 35,
      scores: {
        sciencePhysics: 96,
        geopolitics: 84,
        valuation: 75,
        powerGrid: 78,
        riskDefense: 79,
      },
      taiwanRiskExposure: 95,
      packagingMoatIndex: 94,
      thermalPowerMoat: 72,
    },
  ];

  const ranked = synthesizeStockRanking(candidates);
  assert.equal(ranked.length, 2);
  assert.equal(ranked[0].rank, 1);
  assert.equal(ranked[0].ticker, 'TSM');
  assert.equal(ranked[0].recommendation, 'STRONG BUY');
});
