import React, { useState } from 'react';
import { 
  Download, 
  Chrome, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  FolderArchive, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  X,
  FileCode,
  Flame,
  Search,
  Eye,
  HelpCircle
} from 'lucide-react';
import { StockDetail } from '../types';

interface ChromeExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: StockDetail[];
}

export const ChromeExtensionModal: React.FC<ChromeExtensionModalProps> = ({
  isOpen,
  onClose,
  stocks,
}) => {
  const [activeTab, setActiveTab] = useState<'download' | 'preview' | 'publish-guide' | 'files'>('download');
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Simulator state
  const [simSelectedTicker, setSimSelectedTicker] = useState<string>('TSM');
  const [simTier, setSimTier] = useState<'all' | 'best' | 'ok' | 'worst'>('all');
  const [simSearch, setSimSearch] = useState<string>('');
  const [simExpandedAgents, setSimExpandedAgents] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const handleDownloadZip = () => {
    setIsDownloading(true);
    // Trigger download of the pre-packed zip from public folder or API
    const link = document.createElement('a');
    link.href = '/api/extension/download';
    link.download = 'apex-capital-chrome-extension.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  const selectedStock = stocks.find((s) => s.ticker === simSelectedTicker) || stocks[0];
  const filteredStocks = stocks.filter((s) => {
    const matchesTier = simTier === 'all' || s.tier === simTier;
    const matchesSearch = s.ticker.toLowerCase().includes(simSearch.toLowerCase()) || s.name.toLowerCase().includes(simSearch.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-4xl bg-[#0c141d] border border-[#1b2838] rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#101822] border-b border-[#1b2838]">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Chrome className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Chrome Extension (Manifest V3)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready to Deploy &amp; Publish
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Apex Capital - SteamDB AI Stock Recommender Extension
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#1b2838] bg-[#0e1620] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('download')}
            className={`px-3.5 py-2 rounded-t-lg transition cursor-pointer flex items-center gap-1.5 font-bold ${
              activeTab === 'download'
                ? 'bg-[#101822] text-blue-400 border-t-2 border-blue-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download &amp; Install Locally</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-2 rounded-t-lg transition cursor-pointer flex items-center gap-1.5 font-bold ${
              activeTab === 'preview'
                ? 'bg-[#101822] text-blue-400 border-t-2 border-blue-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Interactive Popup Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('publish-guide')}
            className={`px-3.5 py-2 rounded-t-lg transition cursor-pointer flex items-center gap-1.5 font-bold ${
              activeTab === 'publish-guide'
                ? 'bg-[#101822] text-blue-400 border-t-2 border-blue-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Chrome className="h-3.5 w-3.5" />
            <span>Publish to Chrome Web Store</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={`px-3.5 py-2 rounded-t-lg transition cursor-pointer flex items-center gap-1.5 font-bold ${
              activeTab === 'files'
                ? 'bg-[#101822] text-blue-400 border-t-2 border-blue-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Package Files &amp; Manifest V3</span>
          </button>
        </div>

        {/* Tab 1: Download & 3-Step Install Guide */}
        {activeTab === 'download' && (
          <div className="p-6 space-y-6">
            
            {/* Top Download Card */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-[#101822] to-[#101822] border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                  Complete Manifest V3 ZIP Package
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  apex-capital-chrome-extension.zip
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                  Contains <code className="text-neutral-300">manifest.json</code>, background service worker, in-page ticker scanner, popup interface with SteamDB colors, and icons.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={isDownloading}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/25 flex-shrink-0"
              >
                <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                <span>{isDownloading ? 'Downloading...' : 'Download Extension (.ZIP)'}</span>
              </button>
            </div>

            {/* Quick 3-Step Local Install Guide */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>How to Install into Google Chrome (Takes 30 Seconds):</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#101822] border border-[#1b2838] space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="h-6 w-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <span className="text-xs font-bold text-white font-mono">Unzip The File</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Download and extract <code className="text-blue-300">apex-capital-chrome-extension.zip</code> to a folder on your computer (e.g. in your Documents or Projects folder).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#101822] border border-[#1b2838] space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="h-6 w-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="text-xs font-bold text-white font-mono">Open Extensions Page</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    In Google Chrome, navigate to:
                  </p>
                  <div className="flex items-center justify-between p-2 rounded bg-[#0b1016] border border-[#1b2838] text-xs font-mono text-cyan-300">
                    <span>chrome://extensions</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('chrome://extensions', 'url')}
                      className="text-neutral-400 hover:text-white cursor-pointer ml-1"
                    >
                      {copiedStep === 'url' ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#101822] border border-[#1b2838] space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="h-6 w-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <span className="text-xs font-bold text-white font-mono">Load Unpacked</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Toggle on <strong className="text-white">Developer mode</strong> in the top-right corner. Then click <strong className="text-white">Load unpacked</strong> and select the extracted folder!
                  </p>
                </div>
              </div>
            </div>

            {/* In-Browser Highlights Demonstration */}
            <div className="p-4 rounded-xl bg-[#0b1016] border border-[#1b2838]">
              <div className="text-xs font-mono text-neutral-400 font-bold mb-2">
                What Happens When You Browse The Web:
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                When you visit Yahoo Finance, Google Finance, Bloomberg, Reddit, or X/Twitter, the extension automatically highlights ticker symbols with SteamDB indicators:
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-3">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-600 text-white font-mono">
                  $TSM ★ BEST (95%)
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-600 text-white font-mono">
                  $VRT ★ BEST (92%)
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-600 text-white font-mono">
                  $NVDA ✓ OK (86%)
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-600 text-white font-mono">
                  $AVGO ✓ OK (85%)
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-600 text-white font-mono">
                  $INTC ⚠ WORST (38%)
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-600 text-white font-mono">
                  $SMCI ⚠ WORST (35%)
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Interactive Popup Simulator */}
        {activeTab === 'preview' && (
          <div className="p-6 flex flex-col items-center">
            <div className="text-center mb-4">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                Interactive Chrome Extension Toolbar Popup Simulator
              </span>
              <p className="text-xs text-neutral-400">
                This simulates the exact 440px popup that opens when you click the extension icon in Chrome's toolbar.
              </p>
            </div>

            {/* Chrome Frame */}
            <div className="w-full max-w-[440px] bg-[#0c141d] border-2 border-[#2a475e] rounded-xl shadow-2xl overflow-hidden font-sans">
              
              {/* Chrome Mock Header */}
              <div className="bg-[#101822] border-b border-[#1b2838] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                    <span className="text-blue-400">⚡</span>
                    <span>APEX CAPITAL</span>
                    <span className="text-[10px] text-neutral-500 font-normal">Recommender</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400">v1.0.0</span>
                </div>

                {/* SteamDB Legend */}
                <div className="flex items-center justify-between text-[10px] font-mono bg-[#0b1016] px-2 py-1 rounded border border-[#1b2838] text-neutral-400 mb-2">
                  <span>SteamDB:</span>
                  <span className="text-blue-400 font-bold">Blue = Best</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">Green = OK</span>
                  <span>•</span>
                  <span className="text-rose-400 font-bold">Red = Worst</span>
                </div>

                {/* Filter and search */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSimTier('all')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      simTier === 'all' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimTier('best')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      simTier === 'best' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-950/40'
                    }`}
                  >
                    ★ Best
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimTier('ok')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      simTier === 'ok' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:bg-emerald-950/40'
                    }`}
                  >
                    ✓ OK
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimTier('worst')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      simTier === 'worst' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:bg-rose-950/40'
                    }`}
                  >
                    ⚠ Worst
                  </button>
                  <input
                    type="text"
                    value={simSearch}
                    onChange={(e) => setSimSearch(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-[#0b1016] border border-[#1b2838] rounded px-2 py-0.5 text-[10px] text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Popup Main Card */}
              <div className="p-3">
                <div className={`p-3 rounded-xl bg-[#101822] border ${
                  selectedStock.tier === 'best' 
                    ? 'border-blue-500/40' 
                    : selectedStock.tier === 'worst' 
                    ? 'border-rose-500/40' 
                    : 'border-emerald-500/40'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      selectedStock.tier === 'best' ? 'bg-blue-600 text-white' : selectedStock.tier === 'worst' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {selectedStock.tier === 'best' ? '★ BEST' : selectedStock.tier === 'worst' ? '⚠ WORST' : '✓ OK'}
                    </span>
                    <span className={`text-xs font-mono font-bold ${
                      selectedStock.upside >= 0 
                        ? selectedStock.tier === 'best' ? 'text-blue-400' : 'text-emerald-400' 
                        : 'text-rose-400'
                    }`}>
                      {selectedStock.upside >= 0 ? `+${selectedStock.upside}%` : `${selectedStock.upside}%`}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-1">
                    {selectedStock.name} ({selectedStock.ticker})
                  </h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-2">
                    {selectedStock.simpleOneLiner}
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 my-2 text-center text-xs font-mono">
                    <div className="p-1 rounded bg-[#0b1016] border border-[#1b2838]">
                      <div className="text-[8px] text-neutral-500">PRICE</div>
                      <div className="font-bold text-white text-[11px]">${selectedStock.currentPrice.toFixed(0)}</div>
                    </div>
                    <div className="p-1 rounded bg-[#0b1016] border border-[#1b2838]">
                      <div className="text-[8px] text-neutral-500">TARGET</div>
                      <div className="font-bold text-white text-[11px]">${selectedStock.targetPrice.toFixed(0)}</div>
                    </div>
                    <div className="p-1 rounded bg-[#0b1016] border border-[#1b2838]">
                      <div className="text-[8px] text-neutral-500">RATING</div>
                      <div className="font-bold text-white text-[11px]">{selectedStock.compositeScore.toFixed(0)}%</div>
                    </div>
                  </div>

                  {/* 4 Agent Expanders in Popup */}
                  <div className="space-y-1 pt-1">
                    <button
                      type="button"
                      onClick={() => setSimExpandedAgents(prev => ({ ...prev, fin: !prev.fin }))}
                      className="w-full text-left p-1.5 rounded bg-[#0b1016] border border-[#1b2838] text-[10px] text-neutral-300 font-semibold flex items-center justify-between cursor-pointer"
                    >
                      <span>Agent 1: Market &amp; Financials</span>
                      <span>{simExpandedAgents.fin ? '▲' : '▼'}</span>
                    </button>
                    {simExpandedAgents.fin && (
                      <div className="p-2 rounded bg-[#0e141b] text-[10px] text-neutral-400 leading-relaxed">
                        {selectedStock.expertBreakdown?.financials.simpleTakeaway}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setSimExpandedAgents(prev => ({ ...prev, tech: !prev.tech }))}
                      className="w-full text-left p-1.5 rounded bg-[#0b1016] border border-[#1b2838] text-[10px] text-neutral-300 font-semibold flex items-center justify-between cursor-pointer"
                    >
                      <span>Agent 2: Technology &amp; Physics</span>
                      <span>{simExpandedAgents.tech ? '▲' : '▼'}</span>
                    </button>
                    {simExpandedAgents.tech && (
                      <div className="p-2 rounded bg-[#0e141b] text-[10px] text-neutral-400 leading-relaxed">
                        {selectedStock.expertBreakdown?.technology.simpleTakeaway}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Catalog in Popup */}
                <div className="mt-3">
                  <div className="text-[9px] font-mono text-neutral-500 uppercase mb-1">
                    Stock Catalog (Click to switch)
                  </div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {filteredStocks.map((stk) => (
                      <div
                        key={stk.ticker}
                        onClick={() => setSimSelectedTicker(stk.ticker)}
                        className={`p-1.5 rounded border border-[#1b2838] flex items-center justify-between text-[11px] cursor-pointer transition ${
                          stk.ticker === simSelectedTicker ? 'bg-[#17202d] border-blue-500/50' : 'bg-[#0b1016] hover:bg-[#101822]'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span className={`px-1.5 py-0.2 rounded text-[8px] font-mono font-bold ${
                            stk.tier === 'best' ? 'bg-blue-600 text-white' : stk.tier === 'worst' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                          }`}>
                            {stk.tier?.toUpperCase()}
                          </span>
                          <span className="font-bold text-white">{stk.ticker}</span>
                        </div>
                        <span className="font-mono font-bold text-neutral-300 text-[10px]">
                          {stk.upside >= 0 ? `+${stk.upside}%` : `${stk.upside}%`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Step-by-Step Chrome Web Store Publishing Guide */}
        {activeTab === 'publish-guide' && (
          <div className="p-6 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                Chrome Web Store Distribution Checklist
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                How to Publish Your Extension to 3+ Billion Chrome Users
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Your extension is already pre-configured to meet all Manifest V3 policies, permissions, and security criteria. Follow these steps to publish it:
              </p>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="p-4 rounded-xl bg-[#101822] border border-[#1b2838] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-mono flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">1</span>
                    <span>Sign in to the Chrome Developer Dashboard</span>
                  </span>
                  <a
                    href="https://chrome.google.com/webstore/devconsole"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono"
                  >
                    <span>Open Dashboard</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-neutral-400 pl-7">
                  Sign in with your Google account. If this is your first extension, Google requires a one-time $5 developer registration fee.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#101822] border border-[#1b2838] space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-mono">2</span>
                  <span className="font-bold text-white font-mono">Upload Package</span>
                </div>
                <p className="text-neutral-400 pl-7">
                  Click the blue <strong className="text-white">"Add new item"</strong> button and upload your downloaded <code className="text-blue-300">apex-capital-chrome-extension.zip</code> file.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#101822] border border-[#1b2838] space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-mono">3</span>
                  <span className="font-bold text-white font-mono">Store Listing &amp; Metadata</span>
                </div>
                <div className="pl-7 space-y-1 text-neutral-400">
                  <div>• <strong className="text-neutral-200">Name:</strong> Apex Capital - SteamDB AI Stock Recommender</div>
                  <div>• <strong className="text-neutral-200">Category:</strong> Productivity / Financial Analysis</div>
                  <div>• <strong className="text-neutral-200">Summary:</strong> SteamDB-style AI multi-expert stock recommendation engine. Blue for Best, Green for OK, Red for Worst.</div>
                  <div>• <strong className="text-neutral-200">Icon:</strong> 128x128 icon is pre-packaged in the zip (<code className="text-neutral-300">icons/icon128.png</code>).</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101822] border border-[#1b2838] space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-mono">4</span>
                  <span className="font-bold text-white font-mono">Privacy Practices (Single Purpose Declaration)</span>
                </div>
                <div className="pl-7 text-neutral-400 space-y-1">
                  <p>In the Privacy tab, copy and paste this pre-approved single purpose statement:</p>
                  <div className="p-2 rounded bg-[#0b1016] border border-[#1b2838] text-neutral-300 font-mono text-[11px]">
                    "Apex Capital provides investors with SteamDB-style stock ratings and 4-agent fundamental insights (Financials, Technology, Politics, News) via toolbar popup and in-page ticker badges."
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101822] border border-[#1b2838] space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-mono">5</span>
                  <span className="font-bold text-white font-mono">Submit for Review</span>
                </div>
                <p className="text-neutral-400 pl-7">
                  Click <strong className="text-white">"Submit for Review"</strong>. Google's automated Manifest V3 verification reviews the extension. Typical approval time is 24 to 48 hours, after which anyone can install it from the Chrome Web Store!
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Package Files Manifest Inspector */}
        {activeTab === 'files' && (
          <div className="p-6 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                Manifest V3 Architecture &amp; File Tree
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Pre-Packaged Chrome Extension Structure
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-[#0b1016] border border-[#1b2838] font-mono text-xs text-neutral-300 space-y-1.5">
              <div className="text-blue-400 font-bold">📦 apex-capital-chrome-extension.zip</div>
              <div className="pl-4">├── 📄 <span className="text-emerald-400 font-bold">manifest.json</span> <span className="text-neutral-500">// Manifest V3 specification &amp; permissions</span></div>
              <div className="pl-4">├── 📄 <span className="text-cyan-400">background.js</span> <span className="text-neutral-500">// Service worker, badges (#1 TSM), context menus</span></div>
              <div className="pl-4">├── 📄 <span className="text-cyan-400">content.js</span> <span className="text-neutral-500">// Scans webpage text for tickers ($TSM, $NVDA)</span></div>
              <div className="pl-4">├── 📄 <span className="text-neutral-400">content.css</span> <span className="text-neutral-500">// Tooltip &amp; SteamDB pill styles</span></div>
              <div className="pl-4">├── 📄 <span className="text-violet-400">popup.html</span> <span className="text-neutral-500">// Standalone extension toolbar popup</span></div>
              <div className="pl-4">├── 📄 <span className="text-violet-400">popup.js</span> <span className="text-neutral-500">// Popup state, SteamDB filtering, 4-agent expanders</span></div>
              <div className="pl-4">├── 📄 <span className="text-neutral-400">popup.css</span> <span className="text-neutral-500">// Dark SteamDB slate styling for 440px popup</span></div>
              <div className="pl-4">└── 📁 icons/</div>
              <div className="pl-8">├── 🖼️ icon16.png <span className="text-neutral-500">// Toolbar favicon (16x16)</span></div>
              <div className="pl-8">├── 🖼️ icon32.png <span className="text-neutral-500">// Windows taskbar icon (32x32)</span></div>
              <div className="pl-8">├── 🖼️ icon48.png <span className="text-neutral-500">// Extensions page icon (48x48)</span></div>
              <div className="pl-8">└── 🖼️ icon128.png <span className="text-neutral-500">// Chrome Web Store listing icon (128x128)</span></div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDownloadZip}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs transition cursor-pointer flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Ready-To-Deploy ZIP</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#101822] border-t border-[#1b2838] flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span>Google Chrome Manifest V3 Standard Compliant</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
