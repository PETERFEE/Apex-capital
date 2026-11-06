import React, { useState } from 'react';
import { 
  TrendingUp, 
  Cpu, 
  Landmark, 
  Globe, 
  Play, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Scale,
  Activity,
  Layers,
  FileText
} from 'lucide-react';
import { TEAM_ROLES, PRESET_SIMULATION_RESULTS } from '../data/teamAgents';
import { SimulationResult, calculateTeamConsensusScore, calculateAgentDisagreementIndex } from '../utils/simulationLogic';

interface AgentTeamSimulationProps {
  onExploreExecution?: () => void;
}

export const AgentTeamSimulation: React.FC<AgentTeamSimulationProps> = ({ onExploreExecution }) => {
  const [selectedTicker, setSelectedTicker] = useState<string>('TSM');
  const [activeView, setActiveView] = useState<'synthesis' | 'agent1' | 'agent2' | 'agent3' | 'agent4' | 'side_by_side'>('synthesis');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStage, setSimulationStage] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Current simulation data
  const currentResult: SimulationResult =
    PRESET_SIMULATION_RESULTS[selectedTicker] || PRESET_SIMULATION_RESULTS['TSM'];

  const handleRunSimulation = (ticker: string) => {
    setSelectedTicker(ticker);
    setIsSimulating(true);
    setSimulationStage(1);

    // Simulate multi-agent phased deliberation
    const timer1 = setTimeout(() => setSimulationStage(2), 500);
    const timer2 = setTimeout(() => setSimulationStage(3), 1000);
    const timer3 = setTimeout(() => setSimulationStage(4), 1500);
    const timer4 = setTimeout(() => setSimulationStage(5), 2000);
    const timer5 = setTimeout(() => {
      setIsSimulating(false);
      setSimulationStage(0);
      setActiveView('synthesis');
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  };

  const copySynthesis = () => {
    const text = `APEX CAPITAL MULTI-AGENT SYNTHESIS REPORT
Target Company: ${currentResult.companyName} (${currentResult.ticker})
Optimal Recommendation: ${currentResult.finalSynthesis.recommendedStock}
Conviction Grade: ${currentResult.finalSynthesis.convictionGrade}
Composite Score: ${currentResult.finalSynthesis.compositeScore} / 100
Target Price: $${currentResult.finalSynthesis.targetPrice.toFixed(2)} (+${currentResult.finalSynthesis.projectedUpside}%)

VERDICT SUMMARY:
${currentResult.finalSynthesis.verdictSummary}

KEY CATALYSTS:
${currentResult.finalSynthesis.keyCatalysts.map((c) => `- ${c}`).join('\n')}

CRITICAL RISKS:
${currentResult.finalSynthesis.criticalRisks.map((r) => `- ${r}`).join('\n')}

ALLOCATION RECOMMENDATION:
${currentResult.finalSynthesis.recommendedAllocation}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAgentRoleIcon = (roleId: string) => {
    switch (roleId) {
      case 'market_financials':
        return <TrendingUp className="h-4 w-4" />;
      case 'tech_trends':
        return <Cpu className="h-4 w-4" />;
      case 'politics_regulatory':
        return <Landmark className="h-4 w-4" />;
      case 'news_sentiment':
        return <Globe className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const allScores = [
    currentResult.agentReports.market_financials?.score || 90,
    currentResult.agentReports.tech_trends?.score || 90,
    currentResult.agentReports.politics_regulatory?.score || 85,
    currentResult.agentReports.news_sentiment?.score || 90,
  ];
  const consensusInfo = calculateAgentDisagreementIndex(allScores);

  return (
    <div className="space-y-6">
      
      {/* Simulation Command Deck */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                4-Agent Council Simulation Engine
              </span>
              <span className="text-xs text-neutral-400 font-mono">Autonomous Investment Synthesis</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              AI Multi-Agent Investment War Room
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
              Simulating 4 distinct expert agents working concurrently: <strong className="text-emerald-300">Agent 1 (Market &amp; Financials)</strong>, <strong className="text-cyan-300">Agent 2 (Technology Trends)</strong>, <strong className="text-amber-300">Agent 3 (Political &amp; Regulatory)</strong>, and <strong className="text-violet-300">Agent 4 (News &amp; Sentiment)</strong>.
            </p>
          </div>

          {/* Quick Stock Selector & Run Action */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex rounded-lg bg-neutral-950 p-1 border border-neutral-800">
              <button
                type="button"
                onClick={() => handleRunSimulation('TSM')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition cursor-pointer ${
                  selectedTicker === 'TSM'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                TSM (#1 Pick)
              </button>
              <button
                type="button"
                onClick={() => handleRunSimulation('VRT')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition cursor-pointer ${
                  selectedTicker === 'VRT'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                VRT (Cooling)
              </button>
              <button
                type="button"
                onClick={() => handleRunSimulation('NVDA')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition cursor-pointer ${
                  selectedTicker === 'NVDA'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                NVDA (Compute)
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleRunSimulation(selectedTicker)}
              disabled={isSimulating}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold font-mono transition cursor-pointer flex items-center gap-2 shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              <Play className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Agents Deliberating...' : 'Re-Run 4-Agent Simulation'}</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Stepper Indicator (shown during simulation) */}
        {isSimulating && (
          <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                {simulationStage === 1 && 'Agent 1 Auditing DCF, P/E, PEG, & Free Cash Flow...'}
                {simulationStage === 2 && 'Agent 2 Stress-Testing 2nm GAA & CoWoS Thermal Limits...'}
                {simulationStage === 3 && 'Agent 3 Analyzing CHIPS Act, Taiwan Geopolitics & Tariffs...'}
                {simulationStage === 4 && 'Agent 4 Scraping Wall St Revisions & Options Gamma...'}
                {simulationStage === 5 && 'CIO Generating Final Synthesis Report & Optimal Investment...'}
              </span>
              <span className="text-neutral-500">Stage {simulationStage} of 5</span>
            </div>
            <div className="w-full bg-neutral-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(simulationStage / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* 4 Agent Navigation Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <button
          type="button"
          onClick={() => setActiveView('synthesis')}
          className={`p-3 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
            activeView === 'synthesis'
              ? 'bg-neutral-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
              : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 text-neutral-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
              CIO
            </span>
            <Award className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-xs font-bold text-white leading-tight">Final Synthesis</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Optimal Recommendation</div>
          </div>
        </button>

        {TEAM_ROLES.map((role) => {
          const report = currentResult.agentReports[role.id];
          const isSelected = activeView === (`agent${role.agentNumber}` as any);
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setActiveView(`agent${role.agentNumber}` as any)}
              className={`p-3 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-neutral-800 border-neutral-600 shadow-md ring-1 ring-neutral-500'
                  : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 text-neutral-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: role.color + '20', color: role.color }}
                >
                  Agent {role.agentNumber}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {report?.score || 90}%
                </span>
              </div>
              <div className="mt-2">
                <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                  {role.badge}
                </div>
                <div className="text-[10px] text-neutral-500 truncate mt-0.5 font-mono">
                  {role.name.split(':')[1]?.trim() || role.name}
                </div>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setActiveView('side_by_side')}
          className={`p-3 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
            activeView === 'side_by_side'
              ? 'bg-neutral-800 border-cyan-500 shadow-md ring-1 ring-cyan-500/40'
              : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 text-neutral-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold">
              Matrix
            </span>
            <Layers className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2">
            <div className="text-xs font-bold text-white leading-tight">Side-by-Side</div>
            <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Compare All 4 Agents</div>
          </div>
        </button>
      </div>

      {/* VIEW 1: FINAL SYNTHESIS REPORT */}
      {activeView === 'synthesis' && (
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative">
            {/* Header banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-400 text-black">
                    OPTIMAL INVESTMENT IDENTIFIED
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Consensus: {consensusInfo.consensusLevel}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentResult.finalSynthesis.recommendedStock} ({currentResult.finalSynthesis.ticker})
                </h3>
                <div className="text-xs text-neutral-400 mt-0.5 font-mono">
                  Synthesized across Market Valuation, Technology Physics, Geopolitical Policy, and Sentiment.
                </div>
              </div>

              <div className="flex items-center space-x-3 self-stretch sm:self-auto justify-between sm:justify-end">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Target Price</span>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    ${currentResult.finalSynthesis.targetPrice.toFixed(2)}
                  </div>
                </div>
                <div className="h-8 w-px bg-neutral-800"></div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Projected Upside</span>
                  <div className="text-2xl font-bold text-cyan-400 font-mono">
                    +{currentResult.finalSynthesis.projectedUpside}%
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copySynthesis}
                  className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition cursor-pointer flex items-center gap-1.5 border border-neutral-700 ml-2"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Export'}</span>
                </button>
              </div>
            </div>

            {/* Verdict Summary Box */}
            <div className="mt-5 space-y-4">
              <div className="p-4 rounded-lg bg-neutral-950 border-l-4 border-emerald-500 text-sm text-neutral-200 leading-relaxed">
                <span className="font-semibold text-white">Chief Investment Officer Executive Summary: </span>
                {currentResult.finalSynthesis.verdictSummary}
              </div>

              {/* 4 Agent Score Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {TEAM_ROLES.map((role) => {
                  const rep = currentResult.agentReports[role.id];
                  return (
                    <div key={role.id} className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-400">{role.badge}</span>
                        <span className="font-bold" style={{ color: role.color }}>
                          {rep?.score}%
                        </span>
                      </div>
                      <div className="text-xs text-neutral-300 mt-2 font-medium line-clamp-2">
                        {rep?.bullPerspective}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Catalysts & Risks Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Key 2025/2026 Upside Catalysts:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside">
                    {currentResult.finalSynthesis.keyCatalysts.map((cat, i) => (
                      <li key={i} className="leading-relaxed">{cat}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Critical Stress-Test Risks:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside">
                    {currentResult.finalSynthesis.criticalRisks.map((risk, i) => (
                      <li key={i} className="leading-relaxed">{risk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Optimal Allocation Recommendation */}
              <div className="p-4 rounded-lg bg-neutral-950 border border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-mono text-emerald-400 uppercase font-bold block">
                    Recommended Institutional Execution Strategy:
                  </span>
                  <div className="text-neutral-300 mt-0.5">
                    {currentResult.finalSynthesis.recommendedAllocation}
                  </div>
                </div>

                {onExploreExecution && (
                  <button
                    type="button"
                    onClick={onExploreExecution}
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
                  >
                    <span>View Sizing Blueprint</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INDIVIDUAL AGENT REPORTS */}
      {activeView !== 'synthesis' && activeView !== 'side_by_side' && (() => {
        const agentNum = Number(activeView.replace('agent', ''));
        const role = TEAM_ROLES.find((r) => r.agentNumber === agentNum) || TEAM_ROLES[0];
        const report = currentResult.agentReports[role.id];

        return (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
            {/* Agent Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-neutral-800 pb-5">
              <div className="flex items-start space-x-4">
                <div
                  className="p-3.5 rounded-xl text-white shadow-lg flex-shrink-0"
                  style={{ backgroundColor: role.color + '25', color: role.color, border: `1px solid ${role.color}50` }}
                >
                  {getAgentRoleIcon(role.id)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                      style={{ backgroundColor: role.color + '20', color: role.color }}
                    >
                      {role.name}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">Specialized Audit Dossier</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{report.roleTitle}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {role.focusAreas.map((area, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 text-left md:text-right flex-shrink-0">
                <span className="text-[11px] font-mono text-neutral-400 uppercase block">Agent Conviction Score</span>
                <div className="text-2xl font-bold font-mono" style={{ color: role.color }}>
                  {report.score} / 100
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Weight: 30%</span>
              </div>
            </div>

            {/* Key Empirical Metrics Grid */}
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                Quantitative Audit Data Points:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {Object.entries(report.keyMetrics).map(([metricLabel, metricVal], idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <div className="text-[11px] text-neutral-500 font-mono">{metricLabel}</div>
                    <div className="text-sm font-bold font-mono text-white mt-1">{metricVal}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Narrative Audit */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Full Detailed Perspective Report:
                </span>
                <div className="p-5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {report.detailedReport}
                </div>
              </div>

              {/* Bull vs Bear Friction Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-neutral-300 space-y-1">
                  <div className="font-bold text-emerald-400 font-mono uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Agent Core Bull Case:</span>
                  </div>
                  <p className="leading-relaxed">{report.bullPerspective}</p>
                </div>

                <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs text-neutral-300 space-y-1">
                  <div className="font-bold text-amber-400 font-mono uppercase flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Agent Monitored Friction / Bear Case:</span>
                  </div>
                  <p className="leading-relaxed">{report.bearPerspective}</p>
                </div>
              </div>
            </div>

          </div>
        );
      })()}

      {/* VIEW 3: SIDE-BY-SIDE 4-AGENT COMPARATIVE MATRIX */}
      {activeView === 'side_by_side' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5">
          <div className="border-b border-neutral-800 pb-4">
            <h3 className="text-lg font-bold text-white">4-Agent Simultaneous Audit Comparison</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Comparative matrix evaluating {currentResult.companyName} across each specialist perspective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM_ROLES.map((role) => {
              const rep = currentResult.agentReports[role.id];
              return (
                <div key={role.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: role.color + '20', color: role.color }}
                      >
                        {role.badge}
                      </span>
                      <span className="text-sm font-bold font-mono" style={{ color: role.color }}>
                        {rep.score}%
                      </span>
                    </div>

                    <div className="text-xs font-bold text-white">{rep.roleTitle}</div>

                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80 text-[11px] text-neutral-300 leading-relaxed">
                      {rep.bullPerspective}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">Audit Metrics:</span>
                      {Object.entries(rep.keyMetrics).slice(0, 3).map(([k, v], i) => (
                        <div key={i} className="flex justify-between text-[11px] font-mono">
                          <span className="text-neutral-400">{k}:</span>
                          <span className="text-white font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveView(`agent${role.agentNumber}` as any)}
                    className="w-full py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono font-medium transition cursor-pointer border border-neutral-800 text-center"
                  >
                    Read Full Audit →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
