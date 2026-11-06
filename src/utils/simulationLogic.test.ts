import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTeamConsensusScore,
  calculateAgentDisagreementIndex,
  determineConvictionGrade,
  AGENT_WEIGHTS,
} from './simulationLogic';

test('calculateTeamConsensusScore calculates weighted 4-agent score', () => {
  const scores = {
    market_financials: 95,
    tech_trends: 98,
    politics_regulatory: 85,
    news_sentiment: 90,
  };
  // 95*0.3 (28.5) + 98*0.3 (29.4) + 85*0.2 (17.0) + 90*0.2 (18.0) = 92.9
  const result = calculateTeamConsensusScore(scores, AGENT_WEIGHTS);
  assert.equal(result, 92.9);
});

test('calculateAgentDisagreementIndex detects high unanimity vs significant debate', () => {
  const unanimousScores = [92, 94, 91, 95];
  const unanimousResult = calculateAgentDisagreementIndex(unanimousScores);
  assert.equal(unanimousResult.consensusLevel, 'HIGH UNANIMITY');

  const debatingScores = [95, 98, 60, 70];
  const debatingResult = calculateAgentDisagreementIndex(debatingScores);
  assert.equal(debatingResult.consensusLevel, 'SIGNIFICANT DEBATE');
});

test('determineConvictionGrade returns correct tier grades', () => {
  assert.equal(determineConvictionGrade(95.5), 'AAA+ STRONGEST BUY');
  assert.equal(determineConvictionGrade(89.0), 'AAA STRONG BUY');
  assert.equal(determineConvictionGrade(82.0), 'AA BUY');
  assert.equal(determineConvictionGrade(75.0), 'A ACCUMULATE');
  assert.equal(determineConvictionGrade(65.0), 'HOLD / NEUTRAL');
});
