import React from 'react';
import { 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Atom, 
  Zap, 
  ExternalLink,
  ChevronRight,
  Flame,
  Scale
} from 'lucide-react';
import { StockDetail } from '../types';

interface HeroVerdictProps {
  topStock: StockDetail;
  onExploreMoat: () => void;
  onExploreCouncil: () => void;
  onExploreSimulator: () => void;
}

export const HeroVerdict: React.FC<HeroVerdictProps> = ({
  topStock,
  onExploreMoat,
  onExploreCouncil,
  onExploreSimulator,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-cyan-950/80 border border-emerald-500/30 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-400 text-black">
                  UNANIMOUS CONVICTION VERDICT
                </span>
                <span className="text-xs text-neutral-400 font-mono">5/5 MoE Agents in Agreement</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                The Single Best Stock to Buy Right Now: Taiwan Semiconductor (NYSE: TSM)
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-stretch sm:self-auto justify-between sm:justify-end border-t sm:border-t-0 border-neutral-800 pt-3 sm:pt-0">
            <div className="text-right">
              <div className="text-[11px] font-mono text-neutral-400 uppercase">Target Price</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">${topStock.targetPrice.toFixed(2)}</div>
            </div>
            <div className="h-8 w-px bg-neutral-800"></div>
            <div className="text-right">
              <div className="text-[11px] font-mono text-neutral-400 uppercase">Projected Upside</div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono">+{topStock.upside}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Verdict Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: The Core Investment Thesis & Physical Foundation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-4 mb-5">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Institutional Thesis</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <span>{topStock.name}</span>
                  <span className="text-sm font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {topStock.ticker} : {topStock.exchange}
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-neutral-800 text-neutral-200 border border-neutral-700">
                  Current: ${topStock.currentPrice.toFixed(2)}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Grade: {topStock.convictionGrade}
                </span>
              </div>
            </div>

            {/* Core Paradox & Why TSMC Wins */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-neutral-950/80 border-l-4 border-emerald-500 text-sm text-neutral-300 leading-relaxed">
                <span className="font-semibold text-white">The Core Synthesis Paradox: </span>
                Wall Street focuses on the software application layer and GPU brand wars. But under the hard laws of physics, 
                <span className="text-emerald-300 font-medium"> every single AI accelerator on Earth</span>—whether it is Nvidia Blackwell/Rubin, 
                Google TPU v6/v7, AMD MI350, Apple M5, Meta MTIA, Amazon Trainium, or Microsoft Maia—must be physically fabricated and packaged 
                at TSMC. Nvidia has intense customer pricing power, but TSMC possesses the 
                <span className="text-cyan-300 font-medium"> irreplaceable atomic-scale monopoly of matter</span>.
              </div>

              {/* 3 Pillars of Superiority */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center space-x-2 text-cyan-400 mb-1.5">
                    <Atom className="h-4 w-4" />
                    <span className="text-xs font-semibold font-mono uppercase">1. Physics Monopoly</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Controls &gt;92% of sub-3nm volume. 2nm Gate-All-Around (GAA) nanosheets and CoWoS 3D packaging represent an insurmountable $60B/year R&amp;D barrier.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center space-x-2 text-amber-400 mb-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs font-semibold font-mono uppercase">2. Allied Sovereign Policy</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Neutralizing Taiwan risk via sovereign nodes: Arizona Fab 21 ($6.6B CHIPS Act), Kumamoto (Japan METI), and Dresden (EU). A protected global asset.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center space-x-2 text-emerald-400 mb-1.5">
                    <Scale className="h-4 w-4" />
                    <span className="text-xs font-semibold font-mono uppercase">3. Valuation Arbitrage</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Trades at only ~21.5x forward P/E and PEG of 0.76. 35% cheaper than NVDA (34x) and 30% cheaper than VRT (32x) despite higher operating margins (&gt;42%).
                  </p>
                </div>
              </div>

              {/* Catalysts Strip */}
              <div className="pt-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">Upcoming 2025/2026 Key Catalysts:</span>
                <div className="flex flex-wrap gap-2">
                  {topStock.catalysts.map((cat, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/60 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={onExploreMoat}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-semibold text-xs transition cursor-pointer flex items-center gap-2"
              >
                <span>Inspect Physics &amp; Engineering Moat</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={onExploreCouncil}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition cursor-pointer flex items-center gap-2 border border-neutral-700"
              >
                <span>View All 5 Expert Deliberations</span>
              </button>

              <button
                type="button"
                onClick={onExploreSimulator}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition cursor-pointer flex items-center gap-2 border border-neutral-700"
              >
                <span>Stress-Test Valuation in Simulator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: The Institutional Barbell Pair Strategy (TSM + VRT) */}
        <div className="space-y-6">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 relative">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                The Barbell Pairing Hedge
              </span>
              <span className="text-[11px] font-mono text-neutral-400">Optimal 75/25 Balance</span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Vertiv Holdings (VRT)</span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Rank #2 Hedge</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">Direct-to-Chip Liquid Cooling Monopolist</div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-800/60 text-xs font-mono">
                  <span className="text-neutral-400">Target: $155.00</span>
                  <span className="text-cyan-400 font-semibold">+31.1% Upside</span>
                </div>
              </div>

              <div className="text-xs text-neutral-300 leading-relaxed p-3 rounded-lg bg-neutral-950/60 border border-neutral-800">
                <span className="text-amber-400 font-medium">Why VRT pairs with TSM: </span>
                As TSMC creates denser 2nm silicon, GPU heat dissipation reaches 120-200 kW per rack. Air cooling fails. Vertiv owns the direct-to-chip liquid cooling CDUs. 
                <span className="block mt-1 text-neutral-400">Owning TSM gives you the compute monopoly; owning VRT gives you the thermal cooling hedge with 100% US manufacturing.</span>
              </div>

              {/* MoE Composite Scores Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">TSM MoE Composite:</span>
                  <span className="text-emerald-400 font-bold">{topStock.compositeScore} / 100</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${topStock.compositeScore}%` }}></div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                    <div className="text-neutral-400">Physics Moat</div>
                    <div className="text-cyan-400 font-bold">{topStock.scores.sciencePhysics}/100</div>
                  </div>
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                    <div className="text-neutral-400">Valuation</div>
                    <div className="text-emerald-400 font-bold">{topStock.scores.valuation}/100</div>
                  </div>
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                    <div className="text-neutral-400">Power Grid</div>
                    <div className="text-violet-400 font-bold">{topStock.scores.powerGrid}/100</div>
                  </div>
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                    <div className="text-neutral-400">Geopolitics</div>
                    <div className="text-amber-400 font-bold">{topStock.scores.geopolitics}/100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
