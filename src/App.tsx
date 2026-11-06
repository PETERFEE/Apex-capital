import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroVerdict } from './components/HeroVerdict';
import { MoeCouncilView } from './components/MoeCouncilView';
import { PhysicsBottleneckFlow } from './components/PhysicsBottleneckFlow';
import { LeaderboardTable } from './components/LeaderboardTable';
import { DeepResearchTerminal } from './components/DeepResearchTerminal';
import { MacroSensitivitySimulator } from './components/MacroSensitivitySimulator';
import { TradeExecutionPlan } from './components/TradeExecutionPlan';
import { AgentTeamSimulation } from './components/AgentTeamSimulation';
import { MinimalistView } from './components/MinimalistView';
import { ChromeExtensionModal } from './components/ChromeExtensionModal';
import { StockDetail, AppViewMode } from './types';
import { BASELINE_STOCKS } from './data/stocks';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('minimalist');
  const [activeTab, setActiveTab] = useState<string>('simulation');
  const [stocks, setStocks] = useState<StockDetail[]>(BASELINE_STOCKS as unknown as StockDetail[]);
  const [isLoadingStocks, setIsLoadingStocks] = useState<boolean>(false);
  const [researchQueryPreset, setResearchQueryPreset] = useState<string>('');
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState<boolean>(false);

  const fetchStockData = async () => {
    setIsLoadingStocks(true);
    try {
      const res = await fetch('/api/stocks/leaderboard');
      if (res.ok) {
        const data = await res.json();
        if (data.stocks && data.stocks.length > 0) {
          setStocks(data.stocks);
        }
      }
    } catch (err) {
      console.warn('Using baseline institutional stock data:', err);
    } finally {
      setIsLoadingStocks(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const topStock = stocks[0] || (BASELINE_STOCKS[0] as unknown as StockDetail);

  const handleLaunchResearch = (queryText: string) => {
    setResearchQueryPreset(queryText);
    setActiveTab('research');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Institutional Top Navigation Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefreshData={fetchStockData}
        isLoading={isLoadingStocks}
        onOpenExtensionModal={() => setIsExtensionModalOpen(true)}
      />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewMode === 'minimalist' ? (
          <MinimalistView
            stocks={stocks}
            onSwitchToPro={() => setViewMode('professional')}
            onExploreExecution={() => {
              setViewMode('professional');
              setActiveTab('execution');
            }}
            onOpenExtensionModal={() => setIsExtensionModalOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'simulation' && (
              <AgentTeamSimulation onExploreExecution={() => setActiveTab('execution')} />
            )}

            {activeTab === 'verdict' && (
              <HeroVerdict
                topStock={topStock}
                onExploreMoat={() => setActiveTab('physics')}
                onExploreCouncil={() => setActiveTab('council')}
                onExploreSimulator={() => setActiveTab('simulator')}
              />
            )}

            {activeTab === 'council' && (
              <MoeCouncilView />
            )}

            {activeTab === 'physics' && (
              <PhysicsBottleneckFlow />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardTable
                stocks={stocks}
                onSelectStockForResearch={handleLaunchResearch}
              />
            )}

            {activeTab === 'research' && (
              <DeepResearchTerminal initialQuery={researchQueryPreset} />
            )}

            {activeTab === 'simulator' && (
              <MacroSensitivitySimulator />
            )}

            {activeTab === 'execution' && (
              <TradeExecutionPlan />
            )}
          </>
        )}
      </main>

      {/* Terminal Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950/80 py-4 text-xs font-mono text-neutral-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>APEX CAPITAL // Multi-Agent Mixture of Experts Investment Intelligence</span>
          </div>
          <div>
            Data Grounded via Google Search &amp; Modern Solid-State Physics · Confidential Terminal
          </div>
        </div>
      </footer>

      {/* Chrome Extension Modal */}
      <ChromeExtensionModal
        isOpen={isExtensionModalOpen}
        onClose={() => setIsExtensionModalOpen(false)}
        stocks={stocks}
      />

    </div>
  );
}
