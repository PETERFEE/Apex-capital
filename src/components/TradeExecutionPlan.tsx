import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';

export const TradeExecutionPlan: React.FC = () => {
  const [portfolioSize, setPortfolioSize] = useState<number>(100000); // Default $100k
  const [entryStyle, setEntryStyle] = useState<'tranche' | 'lump'>('tranche');

  const allocations = [
    {
      ticker: 'TSM',
      name: 'Taiwan Semiconductor',
      role: 'Anchor Physics Monopoly',
      percentage: 50,
      targetDollar: portfolioSize * 0.50,
      entryZone: '$192.00 - $202.00',
      priceTarget: '$275.00',
      upside: '+38.5%',
      stopLoss: '$168.00 (-15%)',
    },
    {
      ticker: 'VRT',
      name: 'Vertiv Holdings',
      role: 'Liquid Cooling Thermodynamic Hedge',
      percentage: 25,
      targetDollar: portfolioSize * 0.25,
      entryZone: '$112.00 - $120.00',
      priceTarget: '$155.00',
      upside: '+31.1%',
      stopLoss: '$98.00 (-17%)',
    },
    {
      ticker: 'AVGO',
      name: 'Broadcom Inc.',
      role: 'Hyperscaler Custom Silicon & Photonics',
      percentage: 15,
      targetDollar: portfolioSize * 0.15,
      entryZone: '$175.00 - $185.00',
      priceTarget: '$235.00',
      upside: '+28.8%',
      stopLoss: '$155.00 (-15%)',
    },
    {
      ticker: 'GEV',
      name: 'GE Vernova',
      role: 'Datacenter Power & Gas Turbines',
      percentage: 10,
      targetDollar: portfolioSize * 0.10,
      entryZone: '$330.00 - $350.00',
      priceTarget: '$430.00',
      upside: '+24.6%',
      stopLoss: '$290.00 (-16%)',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-rose-400 uppercase tracking-wider">Trading Desk Execution Blueprint</span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              Portfolio Allocation &amp; Tranche Sizing Engine
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
              Turn the MoE synthesis into risk-adjusted capital deployment. We recommend a 50/25/15/10 barbell distribution to capture the compute monopoly while hedging thermodynamics and geopolitics.
            </p>
          </div>

          {/* Capital Input */}
          <div className="flex items-center space-x-2 bg-neutral-950 p-2 rounded-lg border border-neutral-800">
            <span className="text-xs font-mono text-neutral-400">Target Capital:</span>
            <div className="relative">
              <span className="absolute left-2 top-1.5 text-xs text-neutral-500 font-mono">$</span>
              <input
                type="number"
                value={portfolioSize}
                onChange={(e) => setPortfolioSize(Math.max(1000, Number(e.target.value)))}
                className="w-28 pl-5 pr-2 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allocations.map((alloc) => (
          <div key={alloc.ticker} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white font-mono">{alloc.ticker}</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {alloc.percentage}% Weight
              </span>
            </div>

            <div>
              <div className="text-xs font-semibold text-neutral-200">{alloc.name}</div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{alloc.role}</div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500">Allocated Dollar:</span>
                <span className="text-white font-bold">${alloc.targetDollar.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Entry Zone:</span>
                <span className="text-cyan-400 font-bold">{alloc.entryZone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Target / Upside:</span>
                <span className="text-emerald-400 font-bold">{alloc.priceTarget} ({alloc.upside})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Hard Stop:</span>
                <span className="text-rose-400">{alloc.stopLoss}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tranche Entry Schedule and Execution Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: 3-Tranche Execution Protocol */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-neutral-800 pb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <span>Recommended 3-Tranche Staged Accumulation</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Tranche 1: 40% Immediate Baseline</span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">At Market ($195 - $200)</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Establish primary footprint immediately. Waiting for large dips risks missing the continuous multiple rerating as 2nm orders roll in.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Tranche 2: 30% Volatility Pullback</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">50-Day EMA Dip ($186 - $192)</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Deploy when macro noise, tariff headlines, or general market drawdowns create brief algorithmic selloffs.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Tranche 3: 30% Milestone Confirmation</span>
                <span className="text-xs font-mono text-violet-400 font-semibold">Catalyst Validation</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Execute upon official confirmation of Arizona Fab 21 commercial revenue ramp or quarterly gross margins exceeding 54.5%.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Risk Rules and Invalidation Triggers */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-neutral-800 pb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400" />
            <span>Risk Invalidation Triggers &amp; Pre-Mortem</span>
          </h3>

          <div className="space-y-3 text-xs text-neutral-300">
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="font-semibold text-rose-300 block mb-1">1. Kinetic Conflict in Taiwan Strait:</span>
              <p className="text-neutral-400 leading-relaxed">
                Trigger: Active military action or naval blockade. Action: Immediate liquidation of Taiwan-specific equity; reallocate proceeds into US defense and domestic infrastructure (Vertiv, GE Vernova).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="font-semibold text-amber-300 block mb-1">2. Hyperscaler CapEx Retraction:</span>
              <p className="text-neutral-400 leading-relaxed">
                Trigger: Microsoft, Google, or Meta reducing overall cloud datacenter capex by &gt;15% YoY. Action: Trim TSMC weighting from 50% to 35% and raise cash reserve to 20%.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="font-semibold text-cyan-300 block mb-1">3. Leading Edge Yield Failure at 2nm:</span>
              <p className="text-neutral-400 leading-relaxed">
                Trigger: Defect density (D₀) remaining above 0.3/cm² into late 2025. Action: Re-evaluate Intel 18A foundry competitive parity and reassess pricing power.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
