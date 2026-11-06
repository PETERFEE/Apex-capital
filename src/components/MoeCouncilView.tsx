import React, { useState } from 'react';
import { 
  Atom, 
  Landmark, 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  FileCode,
  MessageSquareQuote
} from 'lucide-react';
import { MOE_AGENTS } from '../data/agents';
import { AgentProfile } from '../types';

export const MoeCouncilView: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(MOE_AGENTS[0].id);

  const selectedAgent = MOE_AGENTS.find((a) => a.id === selectedAgentId) || MOE_AGENTS[0];

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="h-5 w-5" />;
      case 'Landmark':
        return <Landmark className="h-5 w-5" />;
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5" />;
      case 'Zap':
        return <Zap className="h-5 w-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-5 w-5" />;
      default:
        return <Atom className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Multi-Agent Mixture of Experts (MoE)</span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              The 5-Discipline Deliberation Chamber
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-3xl">
              Unlike traditional single-analyst reports, APEX synthesizes insights across solid-state physics, sovereign geopolitics, rigorous discounted cash flows, thermodynamics, and black-swan stress tests.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-neutral-400">Consensus Status:</span>
            <span className="text-emerald-400 font-bold">Unanimous Conviction on TSM</span>
          </div>
        </div>

        {/* Agent Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-5">
          {MOE_AGENTS.map((agent) => {
            const isSelected = agent.id === selectedAgentId;
            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-3 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-800/90 border-neutral-600 shadow-md ring-1 ring-neutral-500'
                    : 'bg-neutral-950/80 border-neutral-800/80 hover:bg-neutral-900 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="p-1.5 rounded-md text-white"
                    style={{ backgroundColor: agent.color + '25', color: agent.color }}
                  >
                    {getAgentIcon(agent.icon)}
                  </div>
                  <span
                    className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: agent.color + '20', color: agent.color }}
                  >
                    {agent.convictionScore}%
                  </span>
                </div>
                <div className="mt-2.5">
                  <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                    {agent.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate mt-0.5 font-mono">
                    {agent.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Dossier */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="flex items-start space-x-4">
            <div
              className="p-3.5 rounded-xl text-white shadow-lg flex-shrink-0"
              style={{ backgroundColor: selectedAgent.color + '25', color: selectedAgent.color, border: `1px solid ${selectedAgent.color}50` }}
            >
              {getAgentIcon(selectedAgent.icon)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                  style={{ backgroundColor: selectedAgent.color + '20', color: selectedAgent.color }}
                >
                  {selectedAgent.badge}
                </span>
                <span className="text-xs text-neutral-500 font-mono">Primary Discipline</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{selectedAgent.name}</h3>
              <p className="text-xs text-neutral-300 font-mono mt-0.5">{selectedAgent.title}</p>
              <p className="text-xs text-neutral-400 mt-1">{selectedAgent.discipline}</p>
            </div>
          </div>

          <div className="text-left md:text-right bg-neutral-950 p-3 rounded-lg border border-neutral-800 flex-shrink-0">
            <span className="text-[11px] font-mono text-neutral-400 uppercase block">Conviction on TSM</span>
            <div className="text-2xl font-bold font-mono" style={{ color: selectedAgent.color }}>
              {selectedAgent.convictionScore} / 100
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Grade: AAA Strong Buy</span>
          </div>
        </div>

        {/* Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          {/* Left Column: Core Thesis & Scientific Laws */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <MessageSquareQuote className="h-4 w-4 text-neutral-400" />
                Core Discipline Thesis
              </span>
              <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-300 leading-relaxed">
                "{selectedAgent.coreThesis}"
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <FileCode className="h-4 w-4 text-neutral-400" />
                Key Governing Laws &amp; Mathematical Principles
              </span>
              <div className="space-y-2">
                {selectedAgent.keyEquationsAndLaws.map((eq, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 flex items-start space-x-2">
                    <span className="text-neutral-500">[{idx + 1}]</span>
                    <span className="text-cyan-300">{eq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Assessment & Friction Point */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Specific Assessment of Taiwan Semiconductor (TSM)
              </span>
              <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-300 leading-relaxed">
                {selectedAgent.currentAssessmentOfTSM}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                Friction Point &amp; Primary Risk Watched
              </span>
              <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-900/40 text-sm text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Watch Item: </span>
                {selectedAgent.frictionPoint}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Consensus Matrix Summary */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider mb-3">
          MoE Consensus Matrix: Why All 5 Experts Selected TSM
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded bg-neutral-950 border border-neutral-800">
            <div className="text-cyan-400 font-bold mb-1">🔬 Physics MoE</div>
            <p className="text-neutral-400">Natural packaging &amp; EUV monopoly that cannot be engineered around.</p>
          </div>
          <div className="p-3 rounded bg-neutral-950 border border-neutral-800">
            <div className="text-amber-400 font-bold mb-1">🏛️ Geopolitics MoE</div>
            <p className="text-neutral-400">Allied sovereign fab distribution (US/JP/DE) eliminates single-choke risk.</p>
          </div>
          <div className="p-3 rounded bg-neutral-950 border border-neutral-800">
            <div className="text-emerald-400 font-bold mb-1">📈 Quant MoE</div>
            <p className="text-neutral-400">PEG of 0.76 represents the cheapest asset in the entire AI hardware complex.</p>
          </div>
          <div className="p-3 rounded bg-neutral-950 border border-neutral-800">
            <div className="text-violet-400 font-bold mb-1">⚡ Energy MoE</div>
            <p className="text-neutral-400">2nm node yields 25-30% thermal/power reduction to salvage grid constraints.</p>
          </div>
          <div className="p-3 rounded bg-neutral-950 border border-neutral-800">
            <div className="text-rose-400 font-bold mb-1">🛡️ Risk MoE</div>
            <p className="text-neutral-400">Downside protected by $60B/yr replacement capex and take-or-pay contracts.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
