import React, { useState } from 'react';
import { 
  Terminal, 
  Search, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  Globe
} from 'lucide-react';
import { ResearchResponse } from '../types';

interface DeepResearchTerminalProps {
  initialQuery?: string;
}

export const DeepResearchTerminal: React.FC<DeepResearchTerminalProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState<string>(
    initialQuery || 'Search the internet to find the best stock to buy right now combining science, engineering, politics, and valuation.'
  );
  const [focusArea, setFocusArea] = useState<string>('All Disciplines');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [researchResult, setResearchResult] = useState<ResearchResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const presets = [
    'Why is TSM higher conviction than NVDA right now?',
    'Evaluate Vertiv (VRT) direct-to-chip liquid cooling moat and valuation',
    'How do US-China trade policies and Taiwan Strait risks affect AI stocks?',
    'Constellation Energy (CEG) & GE Vernova (GEV): Is power the ultimate AI trade?',
    'TSMC 2nm GAA nanosheets vs Intel 18A: High-volume manufacturing yield comparison',
  ];

  const handleRunResearch = async (targetPrompt?: string) => {
    const promptToRun = targetPrompt || query;
    if (!promptToRun.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/research/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: promptToRun,
          focusArea,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: ResearchResponse = await response.json();
      setResearchResult(data);
    } catch (err: any) {
      console.error('Deep research failed:', err);
      setErrorMsg(err.message || 'Failed to complete research deliberation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!researchResult) return;
    const textToCopy = researchResult.rawAnalysis || researchResult.summary || '';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Input Console */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 relative">
        <div className="flex items-center space-x-2 text-blue-400 mb-2">
          <Terminal className="h-4 w-4" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold">
            Autonomous Multi-Agent Web Research Engine
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Query the Global Internet with the MoE Council
        </h2>
        <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
          Dispatch Gemini 3.8 with Google Search Grounding to scour current internet news, earnings calls, physics whitepapers, and sovereign policy updates.
        </p>

        {/* Search Bar */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunResearch()}
                placeholder="Ask any investment, physics, political, or tech question..."
                className="w-full pl-4 pr-20 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 font-mono transition"
              />
              <span className="absolute right-3 top-3 text-[11px] font-mono text-neutral-600 hidden sm:inline">
                ⏎ ENTER
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleRunResearch()}
              disabled={isLoading}
              className="px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <Sparkles className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Searching Internet...' : 'Run MoE Deliberation'}</span>
            </button>
          </div>

          {/* Preset Prompts Chips */}
          <div className="pt-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-1.5">
              Quick Research Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(preset);
                    handleRunResearch(preset);
                  }}
                  className="text-xs px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white transition cursor-pointer text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 animate-pulse">
            <Globe className="h-6 w-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              Scouring Global Web &amp; Convening MoE Deliberation...
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
              Querying Google Search Grounding for current news, 2025/2026 semiconductor reports, Taiwan geopolitical briefings, and thermodynamic specifications.
            </p>
          </div>
          <div className="flex justify-center items-center space-x-2 text-xs font-mono text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Synthesizing agent consensus...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {errorMsg && (
        <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4 flex items-start space-x-3 text-red-300 text-xs">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-red-200">Research Deliberation Notice</div>
            <div>{errorMsg}</div>
          </div>
        </div>
      )}

      {/* Research Results Display */}
      {researchResult && !isLoading && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-950 text-blue-300 border border-blue-800">
                  Live Grounded Search Synthesis
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {new Date(researchResult.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                MoE Deliberation Findings: "{researchResult.query}"
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition cursor-pointer flex items-center gap-1.5 border border-neutral-700"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Report'}</span>
              </button>
            </div>
          </div>

          {/* If structured agents are returned */}
          {researchResult.agents && researchResult.agents.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Individual MoE Deliberation Statements:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {researchResult.agents.map((ag, i) => (
                  <div key={i} className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-xs">{ag.name}</div>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        Conviction: {ag.convictionScore}%
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-neutral-500">{ag.role}</div>
                    <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                      "{ag.opinion}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Markdown / Text Analysis from Gemini */}
          {researchResult.rawAnalysis && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Comprehensive Research Analysis:
              </span>
              <div className="p-5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans whitespace-pre-wrap">
                {researchResult.rawAnalysis}
              </div>
            </div>
          )}

          {/* Web Grounding Citations */}
          {researchResult.citations && researchResult.citations.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-cyan-400" />
                Live Grounding Sources &amp; Retrieved Citations:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {researchResult.citations.map((cite, idx) => (
                  <a
                    key={idx}
                    href={cite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-cyan-300 hover:text-cyan-200 hover:border-cyan-700 transition flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3 w-3 text-neutral-500" />
                    <span className="truncate max-w-xs">{cite.title || cite.url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Initial Prompt Prompting when no search has run */}
      {!researchResult && !isLoading && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center space-y-3">
          <Cpu className="h-8 w-8 text-neutral-600 mx-auto" />
          <h3 className="text-base font-bold text-white">MoE Global Web Search Ready</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Click any of the preset prompts above or enter a custom stock/sector query to trigger live Google Search grounding across politics, science, and markets.
          </p>
          <button
            type="button"
            onClick={() => handleRunResearch()}
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition cursor-pointer inline-flex items-center gap-2 border border-neutral-700"
          >
            <span>Run Default Institutional Baseline Query</span>
          </button>
        </div>
      )}

    </div>
  );
};
