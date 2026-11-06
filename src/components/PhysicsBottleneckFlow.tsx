import React, { useState } from 'react';
import { 
  Atom, 
  Layers, 
  Cpu, 
  ThermometerSnowflake, 
  Zap, 
  ArrowRight,
  Info,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface PhysicsStage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  physicsLaw: string;
  bottleneckDescription: string;
  dominantStock: string;
  ticker: string;
  moatRating: string;
  metrics: { label: string; value: string }[];
}

export const PhysicsBottleneckFlow: React.FC = () => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);

  const stages: PhysicsStage[] = [
    {
      id: 'lithography',
      stageNumber: 1,
      title: 'Nanometer Lithography & Quantum Tunneling',
      subtitle: 'The Atomic-Scale Foundation',
      physicsLaw: 'Rayleigh Criterion: CD = k₁ · (λ / NA) & Quantum Tunneling Limits',
      bottleneckDescription: 'At sub-3nm gate lengths, electrons begin quantum tunneling through oxide barriers, causing catastrophic leakage current. TSMC solved this with 2nm Gate-All-Around (GAA) nanosheet field-effect transistors (nanosheet FETs) and A16 Backside Power Delivery (Super PowerRail), routing power lines underneath the silicon wafer to eliminate voltage IR-drop.',
      dominantStock: 'Taiwan Semiconductor (TSMC)',
      ticker: 'TSM',
      moatRating: 'Absolute Monopoly (>92% share)',
      metrics: [
        { label: 'Feature Size', value: '2nm Nanosheet' },
        { label: 'EUV Wavelength', value: '13.5 nm' },
        { label: 'Power Reduction', value: '25-30% @ same clock' },
        { label: 'Capex Barrier', value: '$40B+ / year' },
      ],
    },
    {
      id: 'packaging',
      stageNumber: 2,
      title: '3D Heterogeneous CoWoS Packaging Physics',
      subtitle: 'Interconnect Resistance & Memory Bandwidth',
      physicsLaw: 'RC Interconnect Time Constant (τ = R · C) & Die-to-Die Capacitance',
      bottleneckDescription: 'Single monolithic dies have reached the reticle limit (~858 mm²). To pack 200+ billion transistors, chips must be split into chiplets and stitched on a passive silicon interposer (CoWoS - Chip-on-Wafer-on-Substrate). Sub-micron copper microbumps reduce interconnect resistance and capacitance, enabling 8 TB/s memory bandwidth to High-Bandwidth Memory (HBM3e/HBM4). Without TSMC\'s CoWoS packaging lines, AI chips simply cannot operate.',
      dominantStock: 'Taiwan Semiconductor (TSMC)',
      ticker: 'TSM',
      moatRating: 'Total Packaging Monopoly (100% of tier-1 AI)',
      metrics: [
        { label: 'Interconnect Pitch', value: '< 25 μm microbumps' },
        { label: 'HBM Bandwidth', value: '8.0+ TB/sec' },
        { label: 'Wafer Interposer Size', value: '3.3x Reticle limit' },
        { label: 'Packaging Capacity Growth', value: '2x YoY (2025-2026)' },
      ],
    },
    {
      id: 'networking',
      stageNumber: 3,
      title: 'High-Speed SerDes & Photonics Interconnects',
      subtitle: 'Cluster Latency & Bisection Bandwidth',
      physicsLaw: 'High-Frequency Skin Effect, Shannon-Hartley Capacity & Signal Loss',
      bottleneckDescription: 'When 100,000 GPUs compute in parallel, compute is not the bottleneck; communication latency is. Long copper cables experience high dielectric loss and skin effect attenuation at 224 Gbps per lane. Broadcom and Nvidia solve this with custom silicon SerDes, silicon photonics, and co-packaged optics (CPO), converting electrical electrons into optical photons with near-zero heat loss.',
      dominantStock: 'Broadcom (AVGO) & Nvidia (NVDA)',
      ticker: 'AVGO / NVDA',
      moatRating: 'Duopoly in AI Cluster Switching',
      metrics: [
        { label: 'SerDes Speed', value: '224 Gbps / lane' },
        { label: 'Optical Switch Bandwidth', value: '51.2 Tbps (Tomahawk 5)' },
        { label: 'Energy per Bit', value: '< 3.5 pJ/bit' },
        { label: 'Hyperscaler Custom ASIC Share', value: '> 70% Broadcom' },
      ],
    },
    {
      id: 'thermodynamics',
      stageNumber: 4,
      title: 'Thermodynamics & Direct-to-Chip Liquid Cooling',
      subtitle: 'Heat Flux Density & Fluid Dynamics',
      physicsLaw: "Newton's Law of Cooling & Heat Capacity: Q = m · c_p · ΔT",
      bottleneckDescription: 'Traditional datacenter air cooling hits a physical ceiling at ~35-40 kW per rack. Next-gen AI racks (Nvidia NVL72 and beyond) dissipate 120 kW to 220 kW in a 24-inch footprint—a thermal flux density higher than a nuclear reactor fuel rod. Water has a volumetric heat capacity 4x higher than air. Vertiv designs the direct-to-chip CoolTera Coolant Distribution Units (CDUs), isolating dielectric fluids and maintaining laminar flow to prevent catastrophic silicon thermal throttling.',
      dominantStock: 'Vertiv Holdings',
      ticker: 'VRT',
      moatRating: 'Primary Liquid Cooling CDU Leader',
      metrics: [
        { label: 'Rack Power Density', value: '130 - 220 kW / rack' },
        { label: 'Specific Heat Ratio', value: 'Water 4.184 vs Air 1.005 J/g°K' },
        { label: 'PUE Improvement', value: '1.55 -> 1.15' },
        { label: 'CDU Order Backlog', value: '$7.5B+' },
      ],
    },
    {
      id: 'power-grid',
      stageNumber: 5,
      title: 'Megawatt Generation & High-Voltage Grid Interconnect',
      subtitle: 'Electron Supply & Baseload Transmission',
      physicsLaw: "Joule Heating Losses: P_loss = I² · R & Carnot Efficiency",
      bottleneckDescription: 'The final bottleneck is the physical electrical grid. Hyperscale AI campuses demand 1 to 2 Gigawatts—the output of an entire Hoover Dam. Utility interconnect queues currently stretch 5 to 7 years in Virginia (PJM) and Texas (ERCOT). Big Tech is forced to procure behind-the-meter gas turbines from GE Vernova and restart nuclear baseload generation (e.g. Constellation Energy at Three Mile Island).',
      dominantStock: 'GE Vernova (GEV) & Constellation (CEG)',
      ticker: 'GEV / CEG',
      moatRating: 'Turbine & Nuclear Baseload Gatekeeper',
      metrics: [
        { label: 'Campus Demand', value: '1.0 - 2.5 GW' },
        { label: 'Interconnect Queue Time', value: '5 - 7 Years' },
        { label: 'Gas Turbine Lead Time', value: '4+ Years' },
        { label: 'Nuclear 24/7 Capacity Factor', value: '> 93%' },
      ],
    },
  ];

  const currentStage = stages[selectedStageIndex];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">Physical Sciences &amp; Engineering Stack</span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              The 5 Thermodynamic &amp; Physics Bottlenecks of AI
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-3xl">
              Software is infinite, but physical hardware is strictly governed by quantum mechanics, electromagnetic resistance, and thermodynamics. The stock that owns the irreducible root of this chain owns the ultimate economic rent.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 text-xs font-mono">
            <span className="text-neutral-400">Irreducible Root:</span>
            <span className="text-emerald-400 font-bold">Stage 1 &amp; 2 (TSMC)</span>
          </div>
        </div>

        {/* Pipeline Visual Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-5">
          {stages.map((st, idx) => {
            const isSelected = idx === selectedStageIndex;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStageIndex(idx)}
                className={`p-3 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-800 border-violet-500 shadow-md ring-1 ring-violet-500/50'
                    : 'bg-neutral-950 border-neutral-800/80 hover:bg-neutral-900 text-neutral-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      Phase {st.stageNumber}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {st.ticker}
                    </span>
                  </div>
                  <div className={`text-xs font-bold mt-2 leading-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                    {st.title}
                  </div>
                </div>

                <div className="mt-3 flex items-center text-[10px] font-mono text-neutral-500">
                  <span>Inspect physics</span>
                  <ArrowRight className="h-2.5 w-2.5 ml-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-violet-950 text-violet-300 border border-violet-800">
                Phase {currentStage.stageNumber} of 5
              </span>
              <span className="text-xs text-neutral-400 font-mono">{currentStage.subtitle}</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">{currentStage.title}</h3>
            <div className="text-xs font-mono text-cyan-400 mt-1 flex items-center gap-1.5">
              <Atom className="h-3.5 w-3.5" />
              <span>Governing Physics Law: {currentStage.physicsLaw}</span>
            </div>
          </div>

          <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 text-left md:text-right flex-shrink-0">
            <span className="text-[11px] font-mono text-neutral-400 uppercase block">Monopoly Winner</span>
            <div className="text-base font-bold text-emerald-400 mt-0.5">
              {currentStage.dominantStock} ({currentStage.ticker})
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">{currentStage.moatRating}</span>
          </div>
        </div>

        {/* Detailed physics analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                Engineering Bottleneck Analysis:
              </span>
              <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-300 leading-relaxed">
                {currentStage.bottleneckDescription}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-neutral-300 leading-relaxed">
              <span className="font-semibold text-emerald-300">Why this dictates our #1 Stock Pick: </span>
              Stages 1 and 2 (Lithography and Advanced Packaging) sit at the absolute top of the funnel. Even if Nvidia, Broadcom, or Microsoft redesigns their microarchitecture, they cannot bypass TSMC's EUV fabs or CoWoS packaging lines. 
              <span className="text-white font-medium"> The entire trillion-dollar AI industry is physically tributary to TSMC.</span>
            </div>
          </div>

          {/* Key Physics Metrics */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Quantitative Engineering Specs:
            </span>
            <div className="space-y-2">
              {currentStage.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">{m.label}</span>
                  <span className="text-xs font-mono font-bold text-white">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
