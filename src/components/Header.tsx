import React from 'react';
import { ShieldCheck, Cpu, Terminal, Sparkles, Activity, Layers, Chrome } from 'lucide-react';
import { AppViewMode } from '../types';

interface HeaderProps {
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRefreshData?: () => void;
  isLoading?: boolean;
  onOpenExtensionModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  viewMode, 
  setViewMode, 
  activeTab, 
  setActiveTab, 
  onRefreshData, 
  isLoading,
  onOpenExtensionModal,
}) => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Terminal Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-500/20">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Multi-Agent Intelligence
                </span>
                <span className="text-neutral-600">|</span>
                <span className="text-[11px] font-mono text-neutral-400">
                  {viewMode === 'minimalist' ? 'Minimalist Mode' : 'Professional Terminal v4.8'}
                </span>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                APEX CAPITAL
                <span className="text-xs font-normal px-2 py-0.5 rounded border border-neutral-700 bg-neutral-900 text-neutral-300">
                  Stock Research Engine
                </span>
              </h1>
            </div>
          </div>

          {/* Center Mode Switcher (Minimalist vs Professional) */}
          <div className="flex items-center gap-2.5">
            <div className="flex rounded-lg bg-neutral-900 p-1 border border-neutral-700 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('minimalist')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'minimalist'
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                aria-label="Switch to Minimalist simple interface"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Minimalist (Simple)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('professional')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'professional'
                    ? 'bg-neutral-700 text-white font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                aria-label="Switch to Professional terminal interface"
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>Professional (Terminal)</span>
              </button>
            </div>

            {onOpenExtensionModal && (
              <button
                type="button"
                onClick={onOpenExtensionModal}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                aria-label="Open Chrome Extension deployment and publishing hub"
              >
                <Chrome className="h-3.5 w-3.5 text-blue-400" />
                <span className="hidden sm:inline">Chrome Extension</span>
                <span className="sm:hidden">Extension</span>
              </button>
            )}

            {onRefreshData && (
              <button
                type="button"
                onClick={onRefreshData}
                disabled={isLoading}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-medium transition cursor-pointer disabled:opacity-50"
                aria-label="Refresh Research Telemetry"
              >
                <Sparkles className={`h-3 w-3 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Updating...' : 'Re-Score'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs (Available in Professional Mode, or quick jump from Minimalist) */}
        {viewMode === 'professional' && (
          <nav className="flex space-x-1 sm:space-x-2 mt-3 pt-2 border-t border-neutral-800/80 overflow-x-auto text-xs sm:text-sm font-medium" aria-label="Terminal views">
            <button
              type="button"
              onClick={() => setActiveTab('simulation')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulation'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-800/60'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>4-Agent Simulation</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('verdict')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'verdict'
                  ? 'bg-neutral-800 text-emerald-400 font-semibold border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <span>#1 Verdict & Thesis</span>
            </button>

          <button
            type="button"
            onClick={() => setActiveTab('council')}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'council'
                ? 'bg-neutral-800 text-cyan-400 font-semibold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>5-Agent MoE Chamber</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('physics')}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'physics'
                ? 'bg-neutral-800 text-violet-400 font-semibold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Physics Bottleneck Stack</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-neutral-800 text-amber-400 font-semibold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <span>SteamDB Stock Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('research')}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'research'
                ? 'bg-neutral-800 text-blue-400 font-semibold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Live Internet Deep Search</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-neutral-800 text-emerald-400 font-semibold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <span>Macro Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('execution')}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'execution'
                ? 'bg-neutral-800 text-rose-400 font-semibold border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <span>Execution & Sizing</span>
          </button>
        </nav>
      )}
      </div>
    </header>
  );
};
