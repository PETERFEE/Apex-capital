// Apex Capital - SteamDB Stock Extension Popup Logic

const EXTENSION_STOCKS = [
  {
    ticker: 'TSM',
    name: 'Taiwan Semiconductor Manufacturing Co.',
    exchange: 'NYSE',
    currentPrice: 198.50,
    targetPrice: 275.00,
    upside: 38.5,
    convictionGrade: 'AAA+ STRONG BUY',
    compositeScore: 95.2,
    rank: 1,
    tier: 'best',
    simpleOneLiner: 'Controls >92% of the world\'s advanced AI chips, yet trades at a 35% discount to Nvidia.',
    breakdown: {
      financials: '21.5x forward P/E and 0.76 PEG. >$45B annual cash flow self-funds $40B CapEx with 26.4% ROIC.',
      technology: 'Monopoly on sub-3nm nodes and 100% of CoWoS packaging required by all AI accelerators.',
      politics: 'Western "Silicon Shield" protection with $15B+ subsidies in Arizona ($6.6B), Japan, and Germany.',
      sentiment: '96% of analysts rate Buy. Institutional inflows of +$8.4B and continuous upward estimate revisions.'
    }
  },
  {
    ticker: 'VRT',
    name: 'Vertiv Holdings Co.',
    exchange: 'NYSE',
    currentPrice: 118.20,
    targetPrice: 155.00,
    upside: 31.1,
    convictionGrade: 'AA+ STRONG BUY',
    compositeScore: 91.8,
    rank: 2,
    tier: 'best',
    simpleOneLiner: 'Mandatory liquid cooling CDU supplier for 120kW+ AI racks with 100% Western manufacturing.',
    breakdown: {
      financials: 'Hyper-growth industrial with $7.5B+ backlog and 90%+ Free Cash Flow conversion.',
      technology: 'Water 4x thermal heat capacity vs air prevents Blackwell thermal throttling.',
      politics: '100% US/European manufacturing footprint; pure geopolitical barbell hedge to TSMC.',
      sentiment: 'Top Wall Street pick for datacenter power & thermal management theme.'
    }
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    currentPrice: 136.80,
    targetPrice: 168.00,
    upside: 22.8,
    convictionGrade: 'AA OK / SOLID BUY',
    compositeScore: 86.4,
    rank: 3,
    tier: 'ok',
    simpleOneLiner: 'AI compute architecture king with CUDA lock-in, but higher valuation (34x P/E).',
    breakdown: {
      financials: '74% gross margins and 60%+ ROIC, though trading at premium multiple and $3.3T cap.',
      technology: 'Monolithic Blackwell rack computing unified via 1.8 TB/s NVLink 5.',
      politics: 'Faces China export restrictions, offset by Sovereign AI national cluster deals.',
      sentiment: '#1 global developer mindshare with universal liquidity.'
    }
  },
  {
    ticker: 'AVGO',
    name: 'Broadcom Inc.',
    exchange: 'NASDAQ',
    currentPrice: 182.40,
    targetPrice: 215.00,
    upside: 17.9,
    convictionGrade: 'A+ OK / SOLID BUY',
    compositeScore: 84.5,
    rank: 4,
    tier: 'ok',
    simpleOneLiner: 'Custom silicon ASICs (Google TPU, Meta) & high-speed Tomahawk network switches.',
    breakdown: {
      financials: '>$20B annual Free Cash Flow with 45%+ operating margins and dividend growth.',
      technology: 'Dominates SerDes optical networking physics and custom hyperscaler ASIC co-design.',
      politics: 'US enterprise software core with VMware recurring subscription model.',
      sentiment: 'Top rated institutional hedge against Nvidia GPU pricing.'
    }
  },
  {
    ticker: 'GEV',
    name: 'GE Vernova Inc.',
    exchange: 'NYSE',
    currentPrice: 345.00,
    targetPrice: 395.00,
    upside: 14.5,
    convictionGrade: 'A OK / ACCUMULATE',
    compositeScore: 81.2,
    rank: 5,
    tier: 'ok',
    simpleOneLiner: 'Gas turbines and high-voltage grid equipment powering AI datacenter electrons.',
    breakdown: {
      financials: 'Order backlog stretching past 2028 ensures guaranteed revenue and cash margins.',
      technology: 'Supplies behind-the-meter gas turbines to bypass 5-7 year utility queue.',
      politics: 'Essential Western industrial grid resilience asset.',
      sentiment: 'Leading beneficiary of the data center power bottleneck trade.'
    }
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    currentPrice: 412.50,
    targetPrice: 465.00,
    upside: 12.7,
    convictionGrade: 'B+ OK / HOLD',
    compositeScore: 78.5,
    rank: 6,
    tier: 'ok',
    simpleOneLiner: 'World-class cloud cash flows, but $80B+ AI CapEx temporarily compresses margins.',
    breakdown: {
      financials: 'Trading at 31x forward P/E; heavy datacenter leasing expenses.',
      technology: 'Azure AI scale and Copilot integration across commercial enterprise.',
      politics: 'Subject to FTC and European antitrust scrutiny on cloud bundling.',
      sentiment: 'Core institutional holding with 88% Buy ratings.'
    }
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    exchange: 'NASDAQ',
    currentPrice: 205.20,
    targetPrice: 235.00,
    upside: 14.5,
    convictionGrade: 'B+ OK / HOLD',
    compositeScore: 79.2,
    rank: 7,
    tier: 'ok',
    simpleOneLiner: 'AWS re-accelerating and advertising margins high, but power constraints slow datacenters.',
    breakdown: {
      financials: 'Free cash flow expanding past $50B with strong retail operating leverage.',
      technology: 'Custom Trainium2 silicon offers internal training cost advantages.',
      politics: 'FTC antitrust headwinds persist over marketplace practices.',
      sentiment: 'Strong Wall Street compounder consensus.'
    }
  },
  {
    ticker: 'INTC',
    name: 'Intel Corporation',
    exchange: 'NASDAQ',
    currentPrice: 21.40,
    targetPrice: 17.50,
    upside: -18.2,
    convictionGrade: 'F WORST / AVOID',
    compositeScore: 38.2,
    rank: 8,
    tier: 'worst',
    simpleOneLiner: 'Burning billions in foundry losses with 18A yield risks and continuous server share loss.',
    breakdown: {
      financials: 'Severe -$10B+ annual cash burn, suspended dividend, rising debt.',
      technology: 'Lost EUV photolithography cadence to TSMC by 3+ years.',
      politics: 'Awarded $8.5B CHIPS Act grants, but fab execution delays in Ohio and Germany.',
      sentiment: 'Heavy institutional divestment and negative rating consensus.'
    }
  },
  {
    ticker: 'SMCI',
    name: 'Super Micro Computer Inc.',
    exchange: 'NASDAQ',
    currentPrice: 28.50,
    targetPrice: 22.00,
    upside: -22.8,
    convictionGrade: 'F WORST / HIGH RISK',
    compositeScore: 34.5,
    rank: 9,
    tier: 'worst',
    simpleOneLiner: 'Auditor resignation, delayed 10-K, and hardware margins collapsed to 11%.',
    breakdown: {
      financials: 'Gross margins collapsed from 18% to 11.2% with heavy inventory debt.',
      technology: 'No proprietary silicon or thermodynamic IP; server assembly easily commoditized.',
      politics: 'DOJ inquiry and Nasdaq delisting compliance overhang.',
      sentiment: 'Catastrophic sentiment shock and retail volatility trap.'
    }
  },
  {
    ticker: 'WOLF',
    name: 'Wolfspeed Inc.',
    exchange: 'NYSE',
    currentPrice: 8.90,
    targetPrice: 5.50,
    upside: -38.2,
    convictionGrade: 'F WORST / AVOID',
    compositeScore: 29.8,
    rank: 10,
    tier: 'worst',
    simpleOneLiner: 'Crushed by EV silicon carbide overcapacity, crystal defect delays, and $5B debt.',
    breakdown: {
      financials: 'Negative EBITDA, chronic cash bleed, debt yields trading at distressed levels.',
      technology: '200mm SiC crystal boule yield problems; Chinese low-cost wafers flood market.',
      politics: 'Vulnerable to automotive EV subsidy rollbacks.',
      sentiment: 'Down >85% with heavy short seller targeting.'
    }
  }
];

let currentSelectedTicker = 'TSM';
let currentTier = 'all';
let currentSearch = '';
const expandedAgents = {};

function init() {
  // Check if ticker was set by context menu
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['targetInspectTicker'], (res) => {
      if (res && res.targetInspectTicker) {
        const found = EXTENSION_STOCKS.find(s => s.ticker === res.targetInspectTicker);
        if (found) {
          currentSelectedTicker = found.ticker;
        }
      }
      render();
    });
  } else {
    render();
  }

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTier = btn.getAttribute('data-tier');
      if (currentTier !== 'all') {
        const first = EXTENSION_STOCKS.find(s => s.tier === currentTier);
        if (first) currentSelectedTicker = first.ticker;
      }
      render();
    });
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase();
      render();
    });
  }
}

function render() {
  const stock = EXTENSION_STOCKS.find(s => s.ticker === currentSelectedTicker) || EXTENSION_STOCKS[0];
  const featuredContainer = document.getElementById('featuredCardContainer');
  const listContainer = document.getElementById('stockListContainer');

  const tierBadgeClass = stock.tier === 'best' ? 'badge-best' : stock.tier === 'worst' ? 'badge-worst' : 'badge-ok';
  const cardBorderClass = stock.tier === 'best' ? 'card-best' : stock.tier === 'worst' ? 'card-worst' : 'card-ok';
  const tierLabel = stock.tier === 'best' ? '★ BEST PICK' : stock.tier === 'worst' ? '⚠ WORST / AVOID' : '✓ OK / FAIR';
  const upsideColor = stock.upside >= 0 ? (stock.tier === 'best' ? '#38bdf8' : '#4ade80') : '#f43f5e';

  // Render Feature Card
  featuredContainer.innerHTML = `
    <div class="stock-card ${cardBorderClass}">
      <div class="stock-title-row">
        <div>
          <span class="stock-badge ${tierBadgeClass}">${tierLabel}</span>
          <span class="stock-ticker" style="margin-left:4px">#${stock.rank} ${stock.exchange}</span>
        </div>
        <div style="font-family:monospace;font-size:12px;font-weight:bold;color:${upsideColor}">
          ${stock.upside >= 0 ? '+' + stock.upside + '%' : stock.upside + '%'}
        </div>
      </div>

      <div class="stock-name">${stock.name} (${stock.ticker})</div>
      <div style="font-size:11px;color:#94a3b8;margin-top:2px">${stock.simpleOneLiner}</div>

      <div class="metrics-grid">
        <div class="metric-box">
          <div class="metric-label">Price</div>
          <div class="metric-val">$${stock.currentPrice.toFixed(2)}</div>
        </div>
        <div class="metric-box">
          <div class="metric-label">Target</div>
          <div class="metric-val" style="color:${upsideColor}">$${stock.targetPrice.toFixed(2)}</div>
        </div>
        <div class="metric-box">
          <div class="metric-label">SteamDB</div>
          <div class="metric-val">${stock.compositeScore.toFixed(0)}%</div>
        </div>
      </div>

      <div style="font-family:monospace;font-size:10px;color:#64748b;text-transform:uppercase;margin:8px 0 4px 0">
        4-Agent Deliberation Reports
      </div>

      <div class="agent-item">
        <button class="agent-btn" data-agent="fin">
          <span>Agent 1: Market &amp; Financials</span>
          <span>${expandedAgents.fin ? '▲' : '▼'}</span>
        </button>
        ${expandedAgents.fin ? `<div class="agent-details">${stock.breakdown.financials}</div>` : ''}
      </div>

      <div class="agent-item">
        <button class="agent-btn" data-agent="tech">
          <span>Agent 2: Technology &amp; Physics</span>
          <span>${expandedAgents.tech ? '▲' : '▼'}</span>
        </button>
        ${expandedAgents.tech ? `<div class="agent-details">${stock.breakdown.technology}</div>` : ''}
      </div>

      <div class="agent-item">
        <button class="agent-btn" data-agent="pol">
          <span>Agent 3: Politics &amp; Subsidies</span>
          <span>${expandedAgents.pol ? '▲' : '▼'}</span>
        </button>
        ${expandedAgents.pol ? `<div class="agent-details">${stock.breakdown.politics}</div>` : ''}
      </div>

      <div class="agent-item">
        <button class="agent-btn" data-agent="sent">
          <span>Agent 4: News &amp; Sentiment</span>
          <span>${expandedAgents.sent ? '▲' : '▼'}</span>
        </button>
        ${expandedAgents.sent ? `<div class="agent-details">${stock.breakdown.sentiment}</div>` : ''}
      </div>
    </div>
  `;

  // Attach agent toggle listeners
  document.querySelectorAll('.agent-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const agentKey = btn.getAttribute('data-agent');
      expandedAgents[agentKey] = !expandedAgents[agentKey];
      render();
    });
  });

  // Filter stocks for quick table
  const filtered = EXTENSION_STOCKS.filter(s => {
    const matchesTier = currentTier === 'all' || s.tier === currentTier;
    const matchesSearch = s.ticker.toLowerCase().includes(currentSearch) || s.name.toLowerCase().includes(currentSearch);
    return matchesTier && matchesSearch;
  });

  // Render Table
  listContainer.innerHTML = filtered.map(s => {
    const isSelected = s.ticker === currentSelectedTicker;
    const badgeClass = s.tier === 'best' ? 'badge-best' : s.tier === 'worst' ? 'badge-worst' : 'badge-ok';
    const tag = s.tier === 'best' ? 'BEST' : s.tier === 'worst' ? 'WORST' : 'OK';
    const upColor = s.upside >= 0 ? (s.tier === 'best' ? '#38bdf8' : '#4ade80') : '#f43f5e';
    return `
      <div class="stock-row ${isSelected ? 'selected' : ''}" data-ticker="${s.ticker}">
        <div style="display:flex;align-items:center;gap:6px">
          <span class="stock-badge ${badgeClass}" style="font-size:8px">${tag}</span>
          <span style="font-weight:bold;color:#fff">${s.ticker}</span>
          <span style="font-size:10px;color:#64748b;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.name}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;font-family:monospace">
          <span style="color:#94a3b8">$${s.currentPrice.toFixed(0)}</span>
          <span style="font-weight:bold;color:${upColor}">${s.upside >= 0 ? '+' + s.upside + '%' : s.upside + '%'}</span>
        </div>
      </div>
    `;
  }).join('');

  // Row clicks
  document.querySelectorAll('.stock-row').forEach(row => {
    row.addEventListener('click', () => {
      currentSelectedTicker = row.getAttribute('data-ticker');
      render();
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
