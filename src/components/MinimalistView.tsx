import React, { useState } from 'react';
import { 
  TrendingUp, 
  Cpu, 
  Landmark, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Flame,
  Layers,
  Search,
  Filter,
  BarChart3,
  Chrome
} from 'lucide-react';
import { StockDetail } from '../types';

interface MinimalistViewProps {
  stocks: StockDetail[];
  onSwitchToPro: () => void;
  onExploreExecution?: () => void;
  onOpenExtensionModal?: () => void;
}

export const MinimalistView: React.FC<MinimalistViewProps> = ({
  stocks,
  onSwitchToPro,
  onExploreExecution,
  onOpenExtensionModal,
}) => {
  const [selectedTicker, setSelectedTicker] = useState<string>('TSM');
  const [filterTier, setFilterTier] = useState<'all' | 'best' | 'ok' | 'worst'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    financials: false,
    technology: false,
    politics: false,
    sentiment: false,
  });

  const selectedStock = stocks.find((s) => s.ticker === selectedTicker) || stocks[0];
  const breakdown = selectedStock.expertBreakdown;

  // Filter stocks based on tier and search
  const handleTierFilter = (tier: 'all' | 'best' | 'ok' | 'worst') => {
    setFilterTier(tier);
    if (tier !== 'all') {
      const firstInTier = stocks.find((s) => s.tier === tier);
      if (firstInTier) setSelectedTicker(firstInTier.ticker);
    }
  };

  const filteredStocks = stocks.filter((stk) => {
    const matchesTier = filterTier === 'all' || stk.tier === filterTier;
    const matchesSearch = 
      stk.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stk.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      financials: true,
      technology: true,
      politics: true,
      sentiment: true,
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      financials: false,
      technology: false,
      politics: false,
      sentiment: false,
    });
  };

  const isAllExpanded = Object.values(expandedSections).every(Boolean);

  // Helper colors for SteamDB convention:
  // Blue for Best (#1a9fff / blue-500)
  // Green for OK (#5c7e10 / emerald-500)
  // Red for Worst (#cd5c5c / rose-500)
  const getTierColors = (tier?: string) => {
    switch (tier) {
      case 'best':
        return {
          pillBg: 'bg-blue-500/10 border-blue-500/40 text-blue-400',
          badgeBg: 'bg-blue-600 text-white font-bold',
          activeBtn: 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-lg shadow-blue-500/30',
          inactiveBtn: 'bg-neutral-900 border-blue-900/40 text-neutral-300 hover:border-blue-500/50 hover:bg-neutral-850',
          cardBorder: 'border-blue-500/40 shadow-blue-500/5',
          cardGlow: 'from-blue-950/20 via-neutral-900 to-neutral-900',
          accentText: 'text-blue-400',
          upsideBadge: 'bg-blue-500/20 text-blue-300 border border-blue-400/40',
          label: '★ STEAMDB BEST PICK',
          iconColor: 'text-blue-400',
        };
      case 'worst':
        return {
          pillBg: 'bg-rose-500/10 border-rose-500/40 text-rose-400',
          badgeBg: 'bg-rose-600 text-white font-bold',
          activeBtn: 'bg-rose-600 text-white ring-2 ring-rose-400 shadow-lg shadow-rose-500/30',
          inactiveBtn: 'bg-neutral-900 border-rose-900/40 text-neutral-300 hover:border-rose-500/50 hover:bg-neutral-850',
          cardBorder: 'border-rose-500/40 shadow-rose-500/5',
          cardGlow: 'from-rose-950/20 via-neutral-900 to-neutral-900',
          accentText: 'text-rose-400',
          upsideBadge: 'bg-rose-500/20 text-rose-300 border border-rose-400/40',
          label: '⚠ STEAMDB WORST / AVOID',
          iconColor: 'text-rose-400',
        };
      case 'ok':
      default:
        return {
          pillBg: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
          badgeBg: 'bg-emerald-600 text-white font-bold',
          activeBtn: 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/30',
          inactiveBtn: 'bg-neutral-900 border-emerald-900/40 text-neutral-300 hover:border-emerald-500/50 hover:bg-neutral-850',
          cardBorder: 'border-emerald-500/40 shadow-emerald-500/5',
          cardGlow: 'from-emerald-950/20 via-neutral-900 to-neutral-900',
          accentText: 'text-emerald-400',
          upsideBadge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
          label: '✓ STEAMDB OK / FAIR',
          iconColor: 'text-emerald-400',
        };
    }
  };

  const selectedTierStyles = getTierColors(selectedStock.tier);

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-10">
      
      {/* Top SteamDB-Style Banner */}
      <div className="bg-[#101822] border border-[#1b2838] rounded-2xl p-5 text-center space-y-3 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-rose-500" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17202d] border border-[#2a475e] text-xs font-mono text-neutral-300">
          <Flame className="h-3.5 w-3.5 text-blue-400" />
          <span>SteamDB Sales Style Rating Engine</span>
          <span className="text-neutral-500">|</span>
          <span className="text-blue-400 font-bold">Blue = Best</span>
          <span className="text-neutral-500">•</span>
          <span className="text-emerald-400 font-bold">Green = OK</span>
          <span className="text-neutral-500">•</span>
          <span className="text-rose-400 font-bold">Red = Worst</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI Multi-Agent Stock Recommendations
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Modeled like <span className="text-blue-400 font-semibold">SteamDB Sales</span>: 4 specialized AI agents analyzed financials, physical engineering, politics, and news sentiment. Ranked with blue for the best buys, green for solid/fair holds, and red for high-risk traps.
        </p>

        {/* SteamDB Filter Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto border-t border-[#1b2838] pt-4">
          
          {/* Tier Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0b1016] rounded-xl border border-[#1b2838]">
            <button
              type="button"
              onClick={() => handleTierFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                filterTier === 'all'
                  ? 'bg-neutral-700 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All ({stocks.length})
            </button>
            <button
              type="button"
              onClick={() => handleTierFilter('best')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1.5 ${
                filterTier === 'best'
                  ? 'bg-blue-600 text-white shadow shadow-blue-500/30 ring-1 ring-blue-400'
                  : 'text-blue-400 hover:bg-blue-950/40'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-blue-400 inline-block" />
              <span>Best ({stocks.filter(s => s.tier === 'best').length})</span>
            </button>
            <button
              type="button"
              onClick={() => handleTierFilter('ok')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1.5 ${
                filterTier === 'ok'
                  ? 'bg-emerald-600 text-white shadow shadow-emerald-500/30 ring-1 ring-emerald-400'
                  : 'text-emerald-400 hover:bg-emerald-950/40'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              <span>OK ({stocks.filter(s => s.tier === 'ok').length})</span>
            </button>
            <button
              type="button"
              onClick={() => handleTierFilter('worst')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1.5 ${
                filterTier === 'worst'
                  ? 'bg-rose-600 text-white shadow shadow-rose-500/30 ring-1 ring-rose-400'
                  : 'text-rose-400 hover:bg-rose-950/40'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-rose-400 inline-block" />
              <span>Worst ({stocks.filter(s => s.tier === 'worst').length})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-60">
            <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticker or name..."
              className="w-full bg-[#0b1016] border border-[#1b2838] focus:border-blue-500/50 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Horizontal Stock Recommendation Chips (SteamDB style badges) */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {filteredStocks.map((stk) => {
            const isSelected = stk.ticker === selectedTicker;
            const colors = getTierColors(stk.tier);
            return (
              <button
                key={stk.ticker}
                type="button"
                onClick={() => setSelectedTicker(stk.ticker)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer flex items-center gap-2 border ${
                  isSelected ? colors.activeBtn : colors.inactiveBtn
                }`}
              >
                <span>{stk.ticker}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  stk.tier === 'best' 
                    ? 'bg-blue-400/20 text-blue-300 border border-blue-400/40' 
                    : stk.tier === 'worst'
                    ? 'bg-rose-400/20 text-rose-300 border border-rose-400/40'
                    : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                }`}>
                  {stk.tier === 'best' ? '★ BEST' : stk.tier === 'worst' ? '⚠ WORST' : '✓ OK'}
                </span>
                <span className="text-[11px] opacity-80">
                  {stk.compositeScore.toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Feature Stock Recommendation Card */}
      <div className={`bg-gradient-to-b ${selectedTierStyles.cardGlow} bg-neutral-900 border ${selectedTierStyles.cardBorder} rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden`}>
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase ${selectedTierStyles.badgeBg}`}>
                {selectedTierStyles.label}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {selectedStock.exchange} : {selectedStock.ticker}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                Rank #{selectedStock.rank}
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
              {selectedStock.name}
            </h3>
            
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
              {selectedStock.simpleOneLiner || selectedStock.summary}
            </p>
          </div>

          {/* SteamDB Style Price & Upside Box */}
          <div className="flex items-center space-x-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800 self-start sm:self-auto flex-shrink-0 shadow-inner">
            <div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Current Price</div>
              <div className="text-lg font-bold text-white font-mono">${selectedStock.currentPrice.toFixed(2)}</div>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Target Price</div>
              <div className={`text-xl font-bold font-mono ${selectedTierStyles.accentText}`}>
                ${selectedStock.targetPrice.toFixed(2)}
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase">SteamDB Rating</div>
              <div className={`text-xl font-bold font-mono ${selectedTierStyles.accentText}`}>
                {selectedStock.compositeScore.toFixed(1)}%
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Upside / Disc.</div>
              <span className={`px-2 py-1 rounded text-sm font-bold font-mono inline-block ${
                selectedStock.upside >= 0 ? selectedTierStyles.upsideBadge : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {selectedStock.upside >= 0 ? `+${selectedStock.upside}%` : `${selectedStock.upside}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Section Header with Expand / Collapse All control */}
        <div className="flex items-center justify-between pt-5 pb-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold flex items-center gap-1.5">
              <span>Why The 4 Expert Agents Reached This Verdict:</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${selectedTierStyles.pillBg}`}>
                {selectedStock.convictionGrade}
              </span>
            </span>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click any agent card below to expand their detailed findings, numbers, and physical evidence.
            </p>
          </div>

          <button
            type="button"
            onClick={isAllExpanded ? collapseAll : expandAll}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer flex items-center gap-1"
          >
            {isAllExpanded ? 'Collapse All' : 'Expand All Details'}
          </button>
        </div>

        {/* The 4 Expert Perspective Cards (Click to expand!) */}
        <div className="space-y-3 pt-2">
          
          {/* Card 1: Financial & Valuation Expert */}
          {breakdown?.financials && (
            <div className="border border-neutral-800 rounded-xl bg-neutral-950 transition overflow-hidden hover:border-neutral-700">
              <button
                type="button"
                onClick={() => toggleSection('financials')}
                className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 text-left transition cursor-pointer hover:bg-neutral-900/60"
              >
                <div className="flex items-start sm:items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                        {breakdown.financials.expertRole}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {breakdown.financials.highlightStat} ({breakdown.financials.statLabel})
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {breakdown.financials.simpleTakeaway}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 text-xs text-neutral-400 font-medium pt-1 sm:pt-0">
                  <span className="hidden sm:inline">
                    {expandedSections.financials ? 'Hide Details' : 'Expand Details'}
                  </span>
                  {expandedSections.financials ? (
                    <ChevronUp className="h-5 w-5 text-neutral-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-300" />
                  )}
                </div>
              </button>

              {expandedSections.financials && (
                <div className="px-5 pb-5 pt-1 border-t border-neutral-800/80 bg-neutral-900/40 text-xs sm:text-sm text-neutral-300 space-y-3">
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 leading-relaxed">
                    <span className="font-semibold text-white block mb-1">Detailed Valuation Analysis:</span>
                    {breakdown.financials.detailedAnalysis}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Key Valuation Metric</div>
                      <div className="text-emerald-400 font-bold mt-0.5">{breakdown.financials.highlightStat} ({breakdown.financials.statLabel})</div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Target Upside</div>
                      <div className={`font-bold mt-0.5 ${selectedStock.upside >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                        {selectedStock.upside >= 0 ? `+${selectedStock.upside}%` : `${selectedStock.upside}%`} (${selectedStock.targetPrice.toFixed(2)})
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Valuation Score</div>
                      <div className="text-white font-bold mt-0.5">{selectedStock.scores.valuation} / 100 Rating</div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Conviction Tier</div>
                      <div className={`font-bold mt-0.5 ${selectedTierStyles.accentText}`}>{selectedStock.convictionGrade}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Card 2: Technology & Engineering Expert */}
          {breakdown?.technology && (
            <div className="border border-neutral-800 rounded-xl bg-neutral-950 transition overflow-hidden hover:border-neutral-700">
              <button
                type="button"
                onClick={() => toggleSection('technology')}
                className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 text-left transition cursor-pointer hover:bg-neutral-900/60"
              >
                <div className="flex items-start sm:items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 flex-shrink-0">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
                        {breakdown.technology.expertRole}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        {breakdown.technology.highlightStat} ({breakdown.technology.statLabel})
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {breakdown.technology.simpleTakeaway}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 text-xs text-neutral-400 font-medium pt-1 sm:pt-0">
                  <span className="hidden sm:inline">
                    {expandedSections.technology ? 'Hide Details' : 'Expand Details'}
                  </span>
                  {expandedSections.technology ? (
                    <ChevronUp className="h-5 w-5 text-neutral-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-300" />
                  )}
                </div>
              </button>

              {expandedSections.technology && (
                <div className="px-5 pb-5 pt-1 border-t border-neutral-800/80 bg-neutral-900/40 text-xs sm:text-sm text-neutral-300 space-y-3">
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 leading-relaxed">
                    <span className="font-semibold text-white block mb-1">Detailed Technology &amp; Physics Moat:</span>
                    {breakdown.technology.detailedAnalysis}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Physics &amp; Tech Moat</div>
                      <div className="text-blue-400 font-bold mt-0.5">{selectedStock.scores.sciencePhysics} / 100 Rating</div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Energy &amp; Power Score</div>
                      <div className="text-emerald-400 font-bold mt-0.5">{selectedStock.scores.powerGrid} / 100 Efficiency</div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Core Engineering Lead</div>
                      <div className="text-white font-bold mt-0.5">{breakdown.technology.highlightStat}</div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Moat Assessment</div>
                      <div className="text-neutral-300 font-bold mt-0.5">
                        {selectedStock.tier === 'best' ? 'Absolute Monopoly' : selectedStock.tier === 'worst' ? 'Severe Disadvantage' : 'Competitive Core'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Card 3: Political & Regulatory Expert */}
          {breakdown?.politics && (
            <div className="border border-neutral-800 rounded-xl bg-neutral-950 transition overflow-hidden hover:border-neutral-700">
              <button
                type="button"
                onClick={() => toggleSection('politics')}
                className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 text-left transition cursor-pointer hover:bg-neutral-900/60"
              >
                <div className="flex items-start sm:items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex-shrink-0">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                        {breakdown.politics.expertRole}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        {breakdown.politics.highlightStat} ({breakdown.politics.statLabel})
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {breakdown.politics.simpleTakeaway}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 text-xs text-neutral-400 font-medium pt-1 sm:pt-0">
                  <span className="hidden sm:inline">
                    {expandedSections.politics ? 'Hide Details' : 'Expand Details'}
                  </span>
                  {expandedSections.politics ? (
                    <ChevronUp className="h-5 w-5 text-neutral-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-300" />
                  )}
                </div>
              </button>

              {expandedSections.politics && (
                <div className="px-5 pb-5 pt-1 border-t border-neutral-800/80 bg-neutral-900/40 text-xs sm:text-sm text-neutral-300 space-y-3">
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 leading-relaxed">
                    <span className="font-semibold text-white block mb-1">Detailed Sovereign &amp; Policy Findings:</span>
                    {breakdown.politics.detailedAnalysis}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Geopolitical Security</div>
                      <div className="text-emerald-400 font-bold mt-0.5">{selectedStock.scores.geopolitics} / 100 Score</div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Defensive Moat</div>
                      <div className="text-blue-400 font-bold mt-0.5">{selectedStock.scores.riskDefense} / 100 Rating</div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Sovereign Posture</div>
                      <div className="text-amber-400 font-bold mt-0.5">{breakdown.politics.highlightStat} ({breakdown.politics.statLabel})</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Card 4: News & Sentiment Expert */}
          {breakdown?.sentiment && (
            <div className="border border-neutral-800 rounded-xl bg-neutral-950 transition overflow-hidden hover:border-neutral-700">
              <button
                type="button"
                onClick={() => toggleSection('sentiment')}
                className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 text-left transition cursor-pointer hover:bg-neutral-900/60"
              >
                <div className="flex items-start sm:items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/30 flex-shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-violet-400 uppercase tracking-wider font-mono">
                        {breakdown.sentiment.expertRole}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800">
                        {breakdown.sentiment.highlightStat} ({breakdown.sentiment.statLabel})
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {breakdown.sentiment.simpleTakeaway}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 text-xs text-neutral-400 font-medium pt-1 sm:pt-0">
                  <span className="hidden sm:inline">
                    {expandedSections.sentiment ? 'Hide Details' : 'Expand Details'}
                  </span>
                  {expandedSections.sentiment ? (
                    <ChevronUp className="h-5 w-5 text-neutral-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-300" />
                  )}
                </div>
              </button>

              {expandedSections.sentiment && (
                <div className="px-5 pb-5 pt-1 border-t border-neutral-800/80 bg-neutral-900/40 text-xs sm:text-sm text-neutral-300 space-y-3">
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 leading-relaxed">
                    <span className="font-semibold text-white block mb-1">Detailed Sentiment &amp; News Analysis:</span>
                    {breakdown.sentiment.detailedAnalysis}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Wall Street Stance</div>
                      <div className="text-emerald-400 font-bold mt-0.5">{breakdown.sentiment.highlightStat} ({breakdown.sentiment.statLabel})</div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">SteamDB AI Rating</div>
                      <div className={`font-bold mt-0.5 ${selectedTierStyles.accentText}`}>
                        {selectedStock.compositeScore.toFixed(1)}% (#{selectedStock.rank})
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-neutral-500">Institutional Stance</div>
                      <div className="text-neutral-300 font-bold mt-0.5">
                        {selectedStock.tier === 'best' ? 'Massive Institutional Inflow' : selectedStock.tier === 'worst' ? 'Capital Flight & Divestment' : 'Balanced Institutional Core'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Action Strategy Box according to Tier */}
        <div className={`mt-6 p-5 rounded-xl bg-neutral-950 border ${
          selectedStock.tier === 'best' 
            ? 'border-blue-500/40' 
            : selectedStock.tier === 'worst' 
            ? 'border-rose-500/40' 
            : 'border-emerald-500/40'
        } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
          <div>
            <div className={`flex items-center space-x-2 text-xs font-mono font-bold uppercase ${selectedTierStyles.accentText}`}>
              {selectedStock.tier === 'worst' ? (
                <AlertTriangle className="h-4 w-4 text-rose-400" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <span>
                {selectedStock.tier === 'best' 
                  ? `Recommended Strategy for ${selectedStock.ticker} (Top Priority Buy)` 
                  : selectedStock.tier === 'worst' 
                  ? `Risk Warning & Avoid Advisory for ${selectedStock.ticker}`
                  : `Strategy for ${selectedStock.ticker} (Accumulate / Hold)`}
              </span>
            </div>
            
            <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
              {selectedStock.tier === 'best' && (
                `Buy 50% position now at ~$${selectedStock.currentPrice.toFixed(2)}, add remainder on minor pullbacks. Expected target: $${selectedStock.targetPrice.toFixed(2)} (+${selectedStock.upside}% upside).`
              )}
              {selectedStock.tier === 'ok' && (
                `Fairly valued. Dollar-cost average on dips below $${Math.round(selectedStock.currentPrice * 0.95)}. Strong foundational compounder with steady +${selectedStock.upside}% upside.`
              )}
              {selectedStock.tier === 'worst' && (
                `High risk value trap. Projected downside of ${selectedStock.upside}%. Avoid initiating long positions or hedge with put protection until balance sheet restructuring is completed.`
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            {onExploreExecution && (
              <button
                type="button"
                onClick={onExploreExecution}
                className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition cursor-pointer flex items-center gap-1.5 ${
                  selectedStock.tier === 'best'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : selectedStock.tier === 'worst'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <span>View Full Execution Plan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SteamDB-Style Dense Sales Matrix Table */}
      <div className="bg-[#101822] border border-[#1b2838] rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1b2838]">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              SteamDB Style Stock Catalog Matrix
            </h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Showing {filteredStocks.length} of {stocks.length} Stocks
          </span>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1b2838] text-neutral-400 text-[11px] uppercase bg-[#0b1016]">
                <th className="py-2.5 px-3">Rating Tier</th>
                <th className="py-2.5 px-3">Stock</th>
                <th className="py-2.5 px-3">Current Price</th>
                <th className="py-2.5 px-3">Target Price</th>
                <th className="py-2.5 px-3">Discount / Upside</th>
                <th className="py-2.5 px-3">SteamDB Score</th>
                <th className="py-2.5 px-3">4-Agent Consensus</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b2838]">
              {filteredStocks.map((stk) => {
                const isSelected = stk.ticker === selectedTicker;
                return (
                  <tr 
                    key={stk.ticker}
                    onClick={() => setSelectedTicker(stk.ticker)}
                    className={`transition cursor-pointer hover:bg-[#17202d] ${
                      isSelected ? 'bg-[#17202d]/90 ring-1 ring-inset ring-blue-500/50' : 'bg-transparent'
                    }`}
                  >
                    {/* Tier badge: Blue for Best, Green for OK, Red for Worst */}
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
                        stk.tier === 'best'
                          ? 'bg-blue-600 text-white shadow shadow-blue-500/20'
                          : stk.tier === 'worst'
                          ? 'bg-rose-600 text-white shadow shadow-rose-500/20'
                          : 'bg-emerald-600 text-white shadow shadow-emerald-500/20'
                      }`}>
                        {stk.tier === 'best' ? '★ BEST' : stk.tier === 'worst' ? '⚠ WORST' : '✓ OK'}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <span>{stk.ticker}</span>
                        <span className="text-[10px] text-neutral-500 font-normal">({stk.exchange})</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate max-w-[160px]">
                        {stk.name}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 text-neutral-300 font-semibold">
                      ${stk.currentPrice.toFixed(2)}
                    </td>

                    {/* Target */}
                    <td className="py-3 px-3 text-white font-semibold">
                      ${stk.targetPrice.toFixed(2)}
                    </td>

                    {/* Discount / Upside badge like SteamDB */}
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        stk.tier === 'best'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-400/40'
                          : stk.tier === 'worst'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-400/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'
                      }`}>
                        {stk.upside >= 0 ? `+${stk.upside}%` : `${stk.upside}%`}
                      </span>
                    </td>

                    {/* SteamDB Score */}
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              stk.tier === 'best' ? 'bg-blue-400' : stk.tier === 'worst' ? 'bg-rose-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(10, stk.compositeScore))}%` }}
                          />
                        </div>
                        <span className="font-bold text-neutral-200">
                          {stk.compositeScore.toFixed(0)}%
                        </span>
                      </div>
                    </td>

                    {/* 4-Agent Consensus */}
                    <td className="py-3 px-3 text-neutral-300 text-[11px]">
                      {stk.convictionGrade}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicker(stk.ticker);
                          expandAll();
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300 underline font-sans"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chrome Extension Deploy & Publish Banner */}
      {onOpenExtensionModal && (
        <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-[#101822] to-[#17202d] border border-blue-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold uppercase mb-1">
              <Chrome className="h-3 w-3" />
              <span>Deploy as Chrome Extension</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Get SteamDB Stock Ratings Directly In Your Browser
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5 max-w-xl">
              Automatic ticker highlighting on Yahoo Finance, Bloomberg, Reddit &amp; X, plus quick toolbar popup with 4-agent fundamental reports. Pre-packaged for Chrome Web Store publishing.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenExtensionModal}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs transition cursor-pointer flex items-center gap-2 flex-shrink-0 shadow-lg shadow-blue-500/20"
          >
            <Chrome className="h-4 w-4" />
            <span>Download &amp; Publish Guide →</span>
          </button>
        </div>
      )}

      {/* Switch to Professional Mode Callout Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[#101822] via-[#101822] to-[#17202d] border border-[#2a475e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs font-mono text-blue-400 uppercase font-bold tracking-wider">
            Want Advanced Institutional Analysis?
          </span>
          <h4 className="text-sm font-bold text-white mt-0.5">
            Switch to Professional Terminal Mode
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">
            Unlock the 5-layer physics bottleneck pipeline, macro sensitivity sliders, live Google Search grounding, and full mathematical weighting.
          </p>
        </div>

        <button
          type="button"
          onClick={onSwitchToPro}
          className="px-4 py-2 rounded-lg bg-[#17202d] hover:bg-[#202d3f] text-blue-300 border border-blue-500/40 text-xs font-semibold font-mono transition cursor-pointer flex items-center gap-2 flex-shrink-0"
        >
          <span>Open Professional Mode →</span>
        </button>
      </div>

    </div>
  );
};
