import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Atom, 
  ShieldCheck, 
  Scale, 
  Zap, 
  ShieldAlert,
  Search,
  Flame,
  TrendingDown
} from 'lucide-react';
import { StockDetail } from '../types';

interface LeaderboardTableProps {
  stocks: StockDetail[];
  onSelectStockForResearch: (ticker: string) => void;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  stocks,
  onSelectStockForResearch,
}) => {
  const [expandedTicker, setExpandedTicker] = useState<string | null>('TSM');
  const [filterTier, setFilterTier] = useState<'all' | 'best' | 'ok' | 'worst'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleExpand = (ticker: string) => {
    setExpandedTicker(expandedTicker === ticker ? null : ticker);
  };

  const filteredStocks = stocks.filter((s) => {
    const matchesTier = filterTier === 'all' || s.tier === filterTier;
    const matchesSearch = 
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case 'best':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-600 text-white shadow shadow-blue-500/20">
            ★ BEST (BLUE)
          </span>
        );
      case 'worst':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-600 text-white shadow shadow-rose-500/20">
            ⚠ WORST (RED)
          </span>
        );
      case 'ok':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-600 text-white shadow shadow-emerald-500/20">
            ✓ OK (GREEN)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Filter Controls */}
      <div className="bg-[#101822] border border-[#1b2838] rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#17202d] border border-[#2a475e] text-xs font-mono text-neutral-300 mb-1.5">
              <Flame className="h-3 w-3 text-blue-400" />
              <span>SteamDB Sales Color System</span>
              <span className="text-blue-400 font-bold ml-1">Blue: Best</span>
              <span className="text-neutral-500">•</span>
              <span className="text-emerald-400 font-bold">Green: OK</span>
              <span className="text-neutral-500">•</span>
              <span className="text-rose-400 font-bold">Red: Worst</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Global Multi-Agent Stock Matrix
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Complete rankings across 10 global stocks evaluated by 4 expert agents (Financials, Technology, Politics, News).
            </p>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-2 self-start md:self-auto">
            <div className="flex items-center p-1 bg-[#0b1016] rounded-lg border border-[#1b2838]">
              <button
                type="button"
                onClick={() => setFilterTier('all')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  filterTier === 'all'
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All ({stocks.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterTier('best')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  filterTier === 'best'
                    ? 'bg-blue-600 text-white shadow shadow-blue-500/30'
                    : 'text-blue-400 hover:bg-blue-950/40'
                }`}
              >
                Best
              </button>
              <button
                type="button"
                onClick={() => setFilterTier('ok')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  filterTier === 'ok'
                    ? 'bg-emerald-600 text-white shadow shadow-emerald-500/30'
                    : 'text-emerald-400 hover:bg-emerald-950/40'
                }`}
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setFilterTier('worst')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  filterTier === 'worst'
                    ? 'bg-rose-600 text-white shadow shadow-rose-500/30'
                    : 'text-rose-400 hover:bg-rose-950/40'
                }`}
              >
                Worst
              </button>
            </div>

            <div className="relative w-full sm:w-44">
              <Search className="h-3 w-3 absolute left-2.5 top-2.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter ticker..."
                className="w-full bg-[#0b1016] border border-[#1b2838] focus:border-blue-500/50 rounded-lg pl-7 pr-2.5 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stocks Table */}
      <div className="bg-[#101822] border border-[#1b2838] rounded-xl overflow-hidden shadow-2xl">
        <div className="divide-y divide-[#1b2838]">
          {filteredStocks.map((stock) => {
            const isExpanded = expandedTicker === stock.ticker;
            return (
              <div key={stock.ticker} className="transition-colors hover:bg-[#17202d]">
                {/* Main Row */}
                <div
                  onClick={() => toggleExpand(stock.ticker)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3.5">
                    {/* Rank Badge */}
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                      stock.tier === 'best'
                        ? 'bg-blue-600 text-white shadow shadow-blue-500/30'
                        : stock.tier === 'worst'
                        ? 'bg-rose-600 text-white shadow shadow-rose-500/30'
                        : 'bg-emerald-600 text-white shadow shadow-emerald-500/30'
                    }`}>
                      #{stock.rank}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-base">{stock.name}</span>
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-[#0b1016] text-neutral-300 border border-[#1b2838]">
                          {stock.ticker}
                        </span>
                        {getTierBadge(stock.tier)}
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1 max-w-xl">
                        {stock.simpleOneLiner || stock.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right side metrics */}
                  <div className="flex items-center justify-between md:justify-end space-x-6 border-t md:border-t-0 border-[#1b2838] pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">Price / Target</span>
                      <div className="text-sm font-mono text-white">
                        ${stock.currentPrice.toFixed(2)}{' '}
                        <span className="text-neutral-400 font-normal">→</span>{' '}
                        <span className={`font-bold ${
                          stock.tier === 'best' ? 'text-blue-400' : stock.tier === 'worst' ? 'text-rose-400' : 'text-emerald-400'
                        }`}>
                          ${stock.targetPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">Upside</span>
                      <div className={`text-sm font-mono font-bold ${
                        stock.upside >= 0 
                          ? stock.tier === 'best' ? 'text-blue-400' : 'text-emerald-400'
                          : 'text-rose-400'
                      }`}>
                        {stock.upside >= 0 ? `+${stock.upside}%` : `${stock.upside}%`}
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">SteamDB Rating</span>
                      <div className="text-sm font-mono font-bold text-white flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${
                          stock.tier === 'best' ? 'bg-blue-400' : stock.tier === 'worst' ? 'bg-rose-400' : 'bg-emerald-400'
                        }`} />
                        {stock.compositeScore.toFixed(1)}%
                      </div>
                    </div>

                    <div className="p-1 rounded text-neutral-400 hover:text-white">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 bg-[#0b1016] border-t border-[#1b2838] space-y-4">
                    
                    {/* 5-Expert Score Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                      <div className="p-2.5 rounded bg-[#101822] border border-[#1b2838]">
                        <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-mono">
                          <Atom className="h-3.5 w-3.5" />
                          <span>Physics</span>
                        </div>
                        <div className="text-base font-bold font-mono text-white mt-1">
                          {stock.scores.sciencePhysics} <span className="text-[10px] text-neutral-500">/ 100</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#101822] border border-[#1b2838]">
                        <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-mono">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>Geopolitics</span>
                        </div>
                        <div className="text-base font-bold font-mono text-white mt-1">
                          {stock.scores.geopolitics} <span className="text-[10px] text-neutral-500">/ 100</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#101822] border border-[#1b2838]">
                        <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-mono">
                          <Scale className="h-3.5 w-3.5" />
                          <span>Valuation</span>
                        </div>
                        <div className="text-base font-bold font-mono text-white mt-1">
                          {stock.scores.valuation} <span className="text-[10px] text-neutral-500">/ 100</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#101822] border border-[#1b2838]">
                        <div className="flex items-center space-x-1.5 text-cyan-400 text-xs font-mono">
                          <Zap className="h-3.5 w-3.5" />
                          <span>Power &amp; Grid</span>
                        </div>
                        <div className="text-base font-bold font-mono text-white mt-1">
                          {stock.scores.powerGrid} <span className="text-[10px] text-neutral-500">/ 100</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#101822] border border-[#1b2838]">
                        <div className="flex items-center space-x-1.5 text-violet-400 text-xs font-mono">
                          <ShieldAlert className="h-3.5 w-3.5" />
                          <span>Defense Moat</span>
                        </div>
                        <div className="text-base font-bold font-mono text-white mt-1">
                          {stock.scores.riskDefense} <span className="text-[10px] text-neutral-500">/ 100</span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Synthesis Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                      <div className="p-3.5 rounded-lg bg-[#101822] border border-[#1b2838]">
                        <div className="font-semibold text-white mb-1">Physics &amp; Science Moat:</div>
                        <p className="text-neutral-300">{stock.scienceMoat}</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#101822] border border-[#1b2838]">
                        <div className="font-semibold text-white mb-1">Geopolitical &amp; Sovereign Posture:</div>
                        <p className="text-neutral-300">{stock.geopolitics}</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#101822] border border-[#1b2838]">
                        <div className="font-semibold text-white mb-1">Valuation &amp; Free Cash Flow:</div>
                        <p className="text-neutral-300">{stock.valuation}</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#101822] border border-[#1b2838]">
                        <div className="font-semibold text-rose-400 mb-1">Bear Case &amp; Vulnerabilities:</div>
                        <p className="text-neutral-300">{stock.bearCase}</p>
                      </div>
                    </div>

                    {/* Catalysts & Action Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-neutral-500">Key Catalysts:</span>
                        {stock.catalysts.map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#17202d] text-neutral-300 border border-[#2a475e]"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectStockForResearch(stock.ticker)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                      >
                        <span>Live Internet Deep Research</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
