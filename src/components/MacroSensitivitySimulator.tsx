import React, { useState } from 'react';
import { Sliders, RefreshCw, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

export const MacroSensitivitySimulator: React.FC = () => {
  // Simulator input parameters
  const [capexGrowth, setCapexGrowth] = useState<number>(32); // %
  const [geopoliticalDiscount, setGeopoliticalDiscount] = useState<number>(14); // %
  const [targetPE, setTargetPE] = useState<number>(24); // Multiple
  const [liquidCoolingRate, setLiquidCoolingRate] = useState<number>(45); // %

  // Dynamic calculations
  // Baseline TSM: $198.50 current price, forward EPS approx $11.50
  const adjustedTSMEps = 11.50 * (1 + (capexGrowth - 30) * 0.012);
  const adjustedTSMMultiple = Math.max(14, targetPE * (1 - geopoliticalDiscount * 0.01));
  const tsmProjectedPrice = Math.round(adjustedTSMEps * adjustedTSMMultiple * 100) / 100;
  const tsmUpside = Math.round(((tsmProjectedPrice - 198.50) / 198.50) * 1000) / 10;

  // Baseline VRT: $118.20 current price, benefits heavily from high liquid cooling rate
  const vrtBoost = (liquidCoolingRate - 30) * 0.8;
  const vrtProjectedPrice = Math.round((145 + vrtBoost) * 100) / 100;
  const vrtUpside = Math.round(((vrtProjectedPrice - 118.20) / 118.20) * 1000) / 10;

  // Baseline NVDA: $136.80
  const nvdaEps = 4.80 * (1 + (capexGrowth - 30) * 0.015);
  const nvdaMultiple = Math.max(20, 32 * (1 - (geopoliticalDiscount * 0.4) * 0.01));
  const nvdaProjectedPrice = Math.round(nvdaEps * nvdaMultiple * 100) / 100;
  const nvdaUpside = Math.round(((nvdaProjectedPrice - 136.80) / 136.80) * 1000) / 10;

  // Dynamic allocation recommendation based on sliders
  const tsmAllocation = Math.max(30, Math.min(65, Math.round(50 - geopoliticalDiscount * 0.4 + (targetPE - 20) * 0.8)));
  const vrtAllocation = Math.max(15, Math.min(40, Math.round(25 + (liquidCoolingRate - 40) * 0.3)));
  const avgoAllocation = Math.max(10, 20);
  const gevAllocation = Math.max(5, 100 - tsmAllocation - vrtAllocation - avgoAllocation);

  const resetDefaults = () => {
    setCapexGrowth(32);
    setGeopoliticalDiscount(14);
    setTargetPE(24);
    setLiquidCoolingRate(45);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Dynamic Scenario Modeling</span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              Macro, Geopolitics &amp; Physics Sensitivity Simulator
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
              Stress-test the thesis under various macro conditions: see how changes in Big Tech capex growth, Taiwan risk premiums, and liquid cooling adoption shift fair value targets.
            </p>
          </div>

          <button
            type="button"
            onClick={resetDefaults}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition cursor-pointer self-start md:self-auto border border-neutral-700"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Baseline Parameters</span>
          </button>
        </div>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Input Controls */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-neutral-800 pb-3 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-cyan-400" />
            <span>Adjust Scenario Assumptions</span>
          </h3>

          <div className="space-y-5">
            {/* Slider 1: Capex Growth */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="capex-growth" className="font-semibold text-neutral-200">
                  Global Hyperscaler AI Hardware CapEx CAGR:
                </label>
                <span className="font-mono text-emerald-400 font-bold">{capexGrowth}% / yr</span>
              </div>
              <input
                id="capex-growth"
                type="range"
                min="15"
                max="65"
                step="1"
                value={capexGrowth}
                onChange={(e) => setCapexGrowth(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>15% (Bear Capex Slowdown)</span>
                <span>32% (Base Consensus)</span>
                <span>65% (Super-Cycle)</span>
              </div>
            </div>

            {/* Slider 2: Geopolitical Risk Discount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="geopolitical-discount" className="font-semibold text-neutral-200">
                  Taiwan Geopolitical Multiple Discount:
                </label>
                <span className="font-mono text-amber-400 font-bold">{geopoliticalDiscount}% penalty</span>
              </div>
              <input
                id="geopolitical-discount"
                type="range"
                min="0"
                max="35"
                step="1"
                value={geopoliticalDiscount}
                onChange={(e) => setGeopoliticalDiscount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>0% (Full Sovereign Parity)</span>
                <span>14% (Current Base)</span>
                <span>35% (Severe Escalation)</span>
              </div>
            </div>

            {/* Slider 3: Target P/E Multiple */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="target-pe" className="font-semibold text-neutral-200">
                  TSMC Baseline Target P/E Multiple:
                </label>
                <span className="font-mono text-cyan-400 font-bold">{targetPE}x Forward P/E</span>
              </div>
              <input
                id="target-pe"
                type="range"
                min="16"
                max="35"
                step="1"
                value={targetPE}
                onChange={(e) => setTargetPE(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>16x (Cyclical Foundry)</span>
                <span>24x (Tech Monopoly)</span>
                <span>35x (Nvidia Parity)</span>
              </div>
            </div>

            {/* Slider 4: Liquid Cooling Adoption */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="liquid-cooling-rate" className="font-semibold text-neutral-200">
                  New Datacenter Liquid Cooling Adoption Rate:
                </label>
                <span className="font-mono text-violet-400 font-bold">{liquidCoolingRate}% of racks</span>
              </div>
              <input
                id="liquid-cooling-rate"
                type="range"
                min="15"
                max="85"
                step="1"
                value={liquidCoolingRate}
                onChange={(e) => setLiquidCoolingRate(Number(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>15% (Air-Cooling Persistence)</span>
                <span>45% (Base Transition)</span>
                <span>85% (Mandatory Liquid)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Outputs */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-neutral-800 pb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>Simulated Target Prices &amp; Returns</span>
            </span>
            <span className="text-xs font-mono text-neutral-400">Live Recalculation</span>
          </h3>

          {/* Dynamic Stock Cards */}
          <div className="space-y-3">
            {/* TSM Result */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">Taiwan Semiconductor (TSM)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    #1 Anchor
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-mono">
                  Base Price: $198.50 → Adjusted P/E: {adjustedTSMMultiple.toFixed(1)}x
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold font-mono text-emerald-400">
                  ${tsmProjectedPrice.toFixed(2)}
                </div>
                <div className={`text-xs font-mono font-semibold ${tsmUpside >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
                  {tsmUpside >= 0 ? `+${tsmUpside}%` : `${tsmUpside}%`}
                </div>
              </div>
            </div>

            {/* VRT Result */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">Vertiv Holdings (VRT)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    #2 Hedge
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-mono">
                  Base Price: $118.20 → Liquid Demand Index: {liquidCoolingRate}%
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold font-mono text-white">
                  ${vrtProjectedPrice.toFixed(2)}
                </div>
                <div className="text-xs font-mono font-semibold text-cyan-400">
                  +{vrtUpside}%
                </div>
              </div>
            </div>

            {/* NVDA Result */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">NVIDIA (NVDA)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    #3 Compute
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-mono">
                  Base Price: $136.80 → Hyperscaler Capex Beta: 1.35x
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold font-mono text-white">
                  ${nvdaProjectedPrice.toFixed(2)}
                </div>
                <div className="text-xs font-mono font-semibold text-cyan-400">
                  +{nvdaUpside}%
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Allocation Strip */}
          <div className="pt-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
              Scenario-Optimized Portfolio Allocation:
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-400 text-[10px]">TSM</div>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">{tsmAllocation}%</div>
              </div>
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-400 text-[10px]">VRT</div>
                <div className="text-cyan-400 font-bold text-sm mt-0.5">{vrtAllocation}%</div>
              </div>
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-400 text-[10px]">AVGO</div>
                <div className="text-violet-400 font-bold text-sm mt-0.5">{avgoAllocation}%</div>
              </div>
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-400 text-[10px]">GEV / Cash</div>
                <div className="text-amber-400 font-bold text-sm mt-0.5">{gevAllocation}%</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
