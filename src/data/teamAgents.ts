import { SimulationResult } from '../utils/simulationLogic';

export interface AgentRoleDefinition {
  id: 'market_financials' | 'tech_trends' | 'politics_regulatory' | 'news_sentiment';
  agentNumber: 1 | 2 | 3 | 4;
  name: string;
  roleTitle: string;
  iconName: string;
  badge: string;
  color: string;
  focusAreas: string[];
}

export const TEAM_ROLES: AgentRoleDefinition[] = [
  {
    id: 'market_financials',
    agentNumber: 1,
    name: 'Agent 1: Market & Financials',
    roleTitle: 'Chief Quantitative & Financial Valuation Officer',
    iconName: 'TrendingUp',
    badge: 'Market & Financials',
    color: '#10b981', // Emerald
    focusAreas: [
      'Discounted Cash Flow (DCF) & Intrinsic Value',
      'Forward P/E, PEG Ratios & Multiple Comparison',
      'Gross Margin (>53%) & Operating Margin (>42%) Durability',
      'Capital Expenditure (CapEx) Return: ROIC vs WACC',
      'Free Cash Flow (FCF) Conversion & Balance Sheet Health',
    ],
  },
  {
    id: 'tech_trends',
    agentNumber: 2,
    name: 'Agent 2: Technology Trends',
    roleTitle: 'Principal Semiconductor & Systems Architect',
    iconName: 'Cpu',
    badge: 'Technology Trends',
    color: '#06b6d4', // Cyan
    focusAreas: [
      'Sub-3nm & 2nm Gate-All-Around (GAA) Nanosheet Physics',
      '3D Heterogeneous CoWoS Silicon Packaging & Interposers',
      'High-Bandwidth Memory (HBM3e/HBM4) Interconnect Speeds',
      'Thermal Dissipation & Liquid Cooling Interfaces',
      'A16 Backside Power Delivery (Super PowerRail) Architecture',
    ],
  },
  {
    id: 'politics_regulatory',
    agentNumber: 3,
    name: 'Agent 3: Political & Regulatory Landscape',
    roleTitle: 'Director of Sovereign Policy & Geopolitical Risk',
    iconName: 'Landmark',
    badge: 'Political & Regulatory',
    color: '#f59e0b', // Amber
    focusAreas: [
      'CHIPS and Science Act Direct Funding ($6.6B US Grants)',
      'Cross-Strait Taiwan Strait Defense Umbrella & Silicon Shield',
      'Export Administration Regulations (EAR) Chokepoint Rules',
      'Global Sovereign Diversification (Arizona, Kumamoto, Dresden)',
      'Tariff Exposure & Surcharge Pass-Through Elasticity',
    ],
  },
  {
    id: 'news_sentiment',
    agentNumber: 4,
    name: 'Agent 4: News & Sentiment Analysis',
    roleTitle: 'Head of Alternative Data & Sentiment Intelligence',
    iconName: 'Globe',
    badge: 'News & Sentiment',
    color: '#8b5cf6', // Violet
    focusAreas: [
      'Wall Street Analyst Consensus & Earnings Revision Velocity',
      'Institutional 13F Accumulation & Sovereign Wealth Flows',
      'Options Market Gamma Exposure & Put/Call Ratio',
      'Global News Media Sentiment Index & FactSet Headwinds',
      'Retail & Developer Community Mindshare (Reddit/X/GitHub)',
    ],
  },
];

export const PRESET_SIMULATION_RESULTS: Record<string, SimulationResult> = {
  TSM: {
    ticker: 'TSM',
    companyName: 'Taiwan Semiconductor Manufacturing Co.',
    timestamp: '2026-11-05T20:30:00Z',
    agentReports: {
      market_financials: {
        roleId: 'market_financials',
        agentName: 'Agent 1: Market & Financials',
        roleTitle: 'Chief Quantitative & Financial Valuation Officer',
        score: 96,
        keyMetrics: {
          'Forward P/E': '21.5x',
          'PEG Ratio': '0.76 (Deep Value)',
          'Operating Margin': '43.2%',
          'ROIC': '26.4%',
          'FCF Yield': '4.3%',
          '2026 CapEx Budget': '$42.0 Billion',
        },
        detailedReport: `FINANCIAL AUDIT REPORT: TSM trades at a severe valuation disconnect relative to its monopoly status. While Nvidia trades at ~34x forward earnings and Vertiv trades at ~32x, TSMC trades at only 21.5x 2025/2026 earnings. With consensus projected EPS growth exceeding 28.2%, TSM's PEG ratio is 0.76—the cheapest multiple among tier-1 tech monopolists. 

Operating cash flow exceeds $45B annually, easily self-funding its record $38B-$42B CapEx while returning capital via growing quarterly dividends. Operating margin stands at a fortress-like 43.2%, protected by take-or-pay wafer reservation agreements with Apple, Nvidia, and AMD. Discounted Cash Flow (DCF) using an 8.5% WACC and 4.0% perpetual growth implies an intrinsic fair value of $275.00/ADR.`,
        bullPerspective: '35% valuation discount compared to hyperscaler customer basket; pristine net cash position with industry-leading ROIC of 26.4%.',
        bearPerspective: 'Massive annual capital expenditure requirements ($40B+) create fixed depreciation charges if wafer utilization ever drops below 80%.',
      },
      tech_trends: {
        roleId: 'tech_trends',
        agentName: 'Agent 2: Technology Trends',
        roleTitle: 'Principal Semiconductor & Systems Architect',
        score: 99,
        keyMetrics: {
          'Sub-3nm Global Share': '> 92%',
          'Leading Process Node': '2nm GAA Nanosheet',
          'Packaging Monopoly': '100% Tier-1 AI CoWoS',
          'Memory Interconnect': '8.0+ TB/s HBM3e/HBM4',
          'Thermal Efficiency': '+30% TOPS/Watt @ 2nm',
        },
        detailedReport: `TECHNOLOGY ROADMAP AUDIT: The laws of solid-state physics dictate that computing power is fundamentally limited by thermal dissipation, voltage IR-drop, and sub-atomic quantum tunneling. TSMC has built an unassailable engineering monopoly across two non-negotiable vectors:

1. Nanometer Lithography Scaling: TSMC has mastered 13.5nm Extreme Ultraviolet (EUV) patterning and is transitioning to 2nm Gate-All-Around (GAA) nanosheets in 2025. This yields a 25-30% power reduction at equal performance—crucial for datacenters capped by substation power limits.
2. 3D Advanced Packaging (CoWoS): Single-die reticle limits (~858 mm²) force all modern AI accelerators to be split into chiplets and stitched on TSMC's silicon interposers with sub-micron microbumps. Every single Nvidia B200/Vera Rubin, Google TPU v6/v7, AMD MI350, and Apple M-series chip physically relies on TSMC CoWoS packaging. Competitors (Intel 18A, Samsung) lag by 2-3 years in high-volume defect density.`,
        bullPerspective: 'Complete architectural monopoly over high-volume advanced packaging and sub-3nm nodes; zero credible commercial alternatives before 2027.',
        bearPerspective: 'Dependency on ASML for High-NA EUV lithography tool deliveries and specialized chemical photoresist precursors.',
      },
      politics_regulatory: {
        roleId: 'politics_regulatory',
        agentName: 'Agent 3: Political & Regulatory Landscape',
        roleTitle: 'Director of Sovereign Policy & Geopolitical Risk',
        score: 85,
        keyMetrics: {
          'US CHIPS Act Grants': '$6.6 Billion Direct',
          'US Low-Cost Loans': '$5.0 Billion',
          'Japan METI Subsidy': '> 50% CapEx Coverage',
          'Sovereign Fabs': 'Arizona (US), Kumamoto (JP), Dresden (EU)',
          'Tariff Elasticity': '100% Pass-Through via Contract',
        },
        detailedReport: `POLITICAL & REGULATORY AUDIT: The 'Taiwan Strait Geopolitical Discount' is well-known, but our analysis reveals it is heavily over-discounted by market participants. TSMC is protected by two distinct political mechanisms:

1. The Silicon Shield: A military disruption of Taiwan would wipe out over $2.5 Trillion in global GDP within months, making defense of the island a vital national security priority for the United States, Japan, and the G7 alliance.
2. Global Sovereign Fab Distribution: TSMC is executing the largest geographic de-risking in industrial history. Arizona Fab 21 is commencing commercial wafer output with $6.6B in direct US CHIPS Act grants; Kumamoto Fab 1 & 2 in Japan are heavily subsidized by the Japanese government; Dresden Fab anchors European automotive semiconductors. Furthermore, TSMC contracts feature ironclad clauses that pass trade tariffs directly onto purchasers.`,
        bullPerspective: 'Direct beneficiary of tens of billions in allied sovereign subsidies; essential allied strategic asset.',
        bearPerspective: 'Heightened geopolitical headlines around Chinese military exercises create periodic macro volatility and multiple compression.',
      },
      news_sentiment: {
        roleId: 'news_sentiment',
        agentName: 'Agent 4: News & Sentiment Analysis',
        roleTitle: 'Head of Alternative Data & Sentiment Intelligence',
        score: 93,
        keyMetrics: {
          'Wall Street Buy Rating': '96% (32/33 Analysts)',
          'Institutional Accumulation': '+$8.4B Net Inflow (Last 2Q)',
          'Put/Call Sentiment Ratio': '0.58 (Heavy Bullish Bias)',
          'Earnings Revision Index': '+18.4% Net Upward',
          'Media Sentiment Score': '+78/100 (Strongly Favorable)',
        },
        detailedReport: `SENTIMENT & NEWSFLOW AUDIT: Global newsflow and alternative sentiment indicators are overwhelmingly positive heading into the 2025/2026 cycle. 

Wall Street consensus has initiated aggressive upward earnings revisions (+18.4% over the past 90 days), citing accelerating CoWoS capacity expansion and unexpected volume orders for custom hyperscaler silicon (Google, Meta, Amazon, Microsoft). Institutional 13F filings demonstrate massive net accumulation from top sovereign wealth funds and tier-1 hedge funds. Retail sentiment on financial social channels has pivoted from fearing Taiwan tensions to recognizing TSMC as the indispensable gatekeeper of AI. Options skew exhibits heavy call-buying activity around the $220 - $250 strike zones.`,
        bullPerspective: 'Unmatched 96% Wall Street Buy consensus with accelerating upward earnings revisions; options market pricing substantial upside expansion.',
        bearPerspective: 'Any headline regarding cross-strait military maneuvers triggers short-term algorithmic selling by macro hedge funds.',
      },
    },
    finalSynthesis: {
      recommendedStock: 'Taiwan Semiconductor Manufacturing Co. (TSMC)',
      ticker: 'TSM',
      convictionGrade: 'AAA+ STRONGEST BUY',
      compositeScore: 94.6,
      targetPrice: 275.0,
      projectedUpside: 38.5,
      verdictSummary:
        'All 4 AI Agents converged on an unambiguous recommendation: Taiwan Semiconductor (TSM) is the single optimal investment in the market today. It possesses the irreducible atomic physics monopoly of sub-3nm lithography and CoWoS 3D packaging, while trading at a 35% valuation discount (21.5x forward P/E, 0.76 PEG) compared to customers like Nvidia. Geopolitical risks are effectively hedged via $15B+ in Western sovereign fab expansion.',
      keyCatalysts: [
        'Commercial mass-production ramp of 2nm GAA nanosheets in H2 2025',
        'Doubling of CoWoS advanced packaging capacity from 35k to 70k+ wafers/month',
        'First revenue recognition from Arizona Fab 21 commercial silicon shipments',
        'Hyperscaler custom silicon boom (Google TPU, Meta MTIA, Apple M5)',
      ],
      criticalRisks: [
        'Cross-strait military escalation or naval blockade of Taiwan trade routes',
        'Potential hyperscaler CapEx pause if consumer AI monetization lags expectations',
      ],
      recommendedAllocation:
        '50% Core Allocation into TSM, hedged with 25% Vertiv (VRT - liquid cooling thermodynamic play) and 15% Broadcom (AVGO - custom silicon networking).',
    },
  },

  NVDA: {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    timestamp: '2026-11-05T20:30:00Z',
    agentReports: {
      market_financials: {
        roleId: 'market_financials',
        agentName: 'Agent 1: Market & Financials',
        roleTitle: 'Chief Quantitative & Financial Valuation Officer',
        score: 83,
        keyMetrics: {
          'Forward P/E': '34.2x',
          'PEG Ratio': '0.98',
          'Operating Margin': '62.0%',
          'ROIC': '68.0%',
          'FCF Yield': '2.8%',
          'Gross Margin': '74.5%',
        },
        detailedReport: `FINANCIAL AUDIT: Incredible profitability with gross margins exceeding 74% and net margins above 50%. However, valuation multiple of 34.2x forward P/E is elevated compared to TSM (21.5x). Over 45% of total revenue is concentrated in just 4 cloud hyperscalers, creating vulnerability to cyclical CapEx digestion.`,
        bullPerspective: 'Astounding pricing power with industry-high gross margins (>74%) and cash generation.',
        bearPerspective: 'High customer concentration and valuation multiple leaves minimal margin of safety if cloud giants pause server purchases.',
      },
      tech_trends: {
        roleId: 'tech_trends',
        agentName: 'Agent 2: Technology Trends',
        roleTitle: 'Principal Semiconductor & Systems Architect',
        score: 96,
        keyMetrics: {
          'Compute Platform': 'Blackwell / Vera Rubin',
          'Interconnect Bandwidth': '1.8 TB/s NVLink 5',
          'Software Moat': 'CUDA Ecosystem (4M+ Devs)',
          'System Architecture': 'Rack-Scale NVL72',
          'Cooling Interface': 'Direct Liquid Cooled',
        },
        detailedReport: `TECHNOLOGY AUDIT: Nvidia continues to dominate compute architecture. The transition to rack-scale computing (NVL72) turns 72 GPUs into a single unified supercomputer. CUDA provides an immense developer moat that competitors have failed to pierce for 18 years.`,
        bullPerspective: 'CUDA ecosystem lock-in and rack-scale co-design make replacing Nvidia nearly impossible for frontier LLM training.',
        bearPerspective: 'Completely dependent on TSMC foundry and CoWoS packaging capacity; vulnerable to rising custom silicon (Google TPU, Meta MTIA) for inference.',
      },
      politics_regulatory: {
        roleId: 'politics_regulatory',
        agentName: 'Agent 3: Political & Regulatory Landscape',
        roleTitle: 'Director of Sovereign Policy & Geopolitical Risk',
        score: 76,
        keyMetrics: {
          'Export Control Exposure': 'EAR Restrictions on China',
          'Antitrust Scrutiny': 'DOJ Subpoenas on Bundling',
          'Sovereign AI Deals': 'UAE, Saudi Arabia, Japan',
          'Domestic Fab Share': '0% (Fabless)',
          'Supply Chain Chokepoint': '100% TSMC reliant',
        },
        detailedReport: `REGULATORY AUDIT: Nvidia faces escalating export bans preventing advanced chip shipments to China, cutting off what was once 20-25% of revenues. Department of Justice antitrust inquiries into software bundling and network switch tying add regulatory friction.`,
        bullPerspective: 'Sovereign AI initiatives from European and Middle Eastern governments offset China restrictions.',
        bearPerspective: 'Ongoing regulatory tightening on compute thresholds and scrutiny over market dominance.',
      },
      news_sentiment: {
        roleId: 'news_sentiment',
        agentName: 'Agent 4: News & Sentiment Analysis',
        roleTitle: 'Head of Alternative Data & Sentiment Intelligence',
        score: 91,
        keyMetrics: {
          'Wall Street Buy Rating': '92%',
          'Retail Mindshare': '#1 Most Discussed Tech',
          'Institutional Ownership': '68%',
          'Media Buzz Score': '+92/100 (Maximum)',
          'Options Volume': 'Highest in Global Markets',
        },
        detailedReport: `SENTIMENT AUDIT: Maximum institutional and retail popularity. Nvidia remains the universal poster-child for the AI revolution. High options open interest can create gamma squeezes, though expectations are sky-high every quarterly earnings print.`,
        bullPerspective: 'Unmatched brand equity and developer loyalty; automatic beneficiary of every AI software breakthrough.',
        bearPerspective: 'Expectations bar is priced for perfection; any minor revenue miss causes sharp volatility.',
      },
    },
    finalSynthesis: {
      recommendedStock: 'NVIDIA Corporation',
      ticker: 'NVDA',
      convictionGrade: 'AA STRONG BUY (Rank #3)',
      compositeScore: 88.5,
      targetPrice: 178.0,
      projectedUpside: 30.1,
      verdictSummary:
        'Nvidia remains an exceptional technology powerhouse with CUDA software lock-in, but ranks behind TSMC due to higher valuation (34x vs 21.5x) and customer concentration risk. TSMC captures economic rent from Nvidia AND every custom ASIC competitor simultaneously.',
      keyCatalysts: ['Blackwell full-scale enterprise shipments', 'Vera Rubin architecture preview with HBM4'],
      criticalRisks: ['Hyperscaler CapEx digestion year', 'US-China chip export ban expansion'],
      recommendedAllocation: '20% allocation in an aggressive growth portfolio.',
    },
  },

  VRT: {
    ticker: 'VRT',
    companyName: 'Vertiv Holdings Co.',
    timestamp: '2026-11-05T20:30:00Z',
    agentReports: {
      market_financials: {
        roleId: 'market_financials',
        agentName: 'Agent 1: Market & Financials',
        roleTitle: 'Chief Quantitative & Financial Valuation Officer',
        score: 84,
        keyMetrics: {
          'Forward P/E': '32.0x',
          'PEG Ratio': '1.15',
          'Organic Growth': '28.0% YoY',
          'Order Backlog': '$7.5+ Billion',
          'Operating Margin': '19.5%',
          'FCF Conversion': '> 90%',
        },
        detailedReport: `FINANCIAL AUDIT: Vertiv is an industrial hyper-growth company. Order backlog has swelled to over $7.5B, driven by datacenter liquid cooling retrofits. While forward P/E of 32x is not cheap for an industrial, earnings growth of 30%+ justifies the multiple.`,
        bullPerspective: 'Record order backlog providing 18+ months of revenue visibility; 90%+ FCF conversion.',
        bearPerspective: 'Gross margins (36%) are lower than semiconductor pure-plays; execution risk on supply chain.',
      },
      tech_trends: {
        roleId: 'tech_trends',
        agentName: 'Agent 2: Technology Trends',
        roleTitle: 'Principal Semiconductor & Systems Architect',
        score: 97,
        keyMetrics: {
          'Rack Power Density': '130 - 220 kW / rack',
          'Cooling Medium': 'Direct-to-Chip Dielectric Fluid',
          'PUE Reduction': '1.55 down to 1.15',
          'Thermal Moat': 'CoolTera CDU Modular Architecture',
          'Fluid Heat Capacity': '4x vs Forced Air',
        },
        detailedReport: `TECHNOLOGY AUDIT: Direct beneficiary of the immutable laws of thermodynamics. As GPU rack power climbs to 130kW (Blackwell) and 200kW+ (Rubin), air cooling is physically incapable of extracting the heat flux. Vertiv owns the CoolTera liquid cooling distribution unit (CDU) technology that prevents chips from throttling.`,
        bullPerspective: 'Liquid cooling is mandatory for modern AI racks; Vertiv has an 80%+ relationship with hyperscalers.',
        bearPerspective: 'Modular cooling competition from Schneider Electric, Eaton, and nVent.',
      },
      politics_regulatory: {
        roleId: 'politics_regulatory',
        agentName: 'Agent 3: Political & Regulatory Landscape',
        roleTitle: 'Director of Sovereign Policy & Geopolitical Risk',
        score: 96,
        keyMetrics: {
          'Geographic Footprint': '100% Western / US & Europe',
          'Tariff Resilience': 'High (Domestic Assembly)',
          'Export Control Risk': 'Near Zero',
          'Regulatory Tailwinds': 'Datacenter Efficiency Mandates',
          'Grid Policy Favor': 'High PUE compliance',
        },
        detailedReport: `POLITICAL AUDIT: Vertiv has the cleanest geopolitical profile in the entire AI ecosystem. Zero exposure to Taiwan Strait military risk, immune to semiconductor export bans, and fully compliant with US Buy American and European green datacenter regulations.`,
        bullPerspective: 'Perfect geopolitical hedge against Taiwan risk with 100% Western manufacturing and zero trade ban exposure.',
        bearPerspective: 'Subject to local electrical grid zoning and environmental water consumption regulations in dry climates.',
      },
      news_sentiment: {
        roleId: 'news_sentiment',
        agentName: 'Agent 4: News & Sentiment Analysis',
        roleTitle: 'Head of Alternative Data & Sentiment Intelligence',
        score: 90,
        keyMetrics: {
          'Wall Street Buy Rating': '88%',
          'Analyst Revisions': 'Consistently Upward',
          'Institutional Sponsorship': 'High and Rising',
          'Media Narrative': 'The "AI Energy & Heat" Trade',
          'Short Interest': 'Low (2.4%)',
        },
        detailedReport: `SENTIMENT AUDIT: Highly favorable institutional sentiment as Wall Street realizes that chips cannot run without cooling. Vertiv is widely recognized as the premier pick-and-shovel infrastructure play.`,
        bullPerspective: 'Unanimously recognized as the top non-semiconductor AI infrastructure winner.',
        bearPerspective: 'Rapid price appreciation over the past 2 years leaves it sensitive to broader tech pullbacks.',
      },
    },
    finalSynthesis: {
      recommendedStock: 'Vertiv Holdings Co.',
      ticker: 'VRT',
      convictionGrade: 'AA+ STRONG BUY (Rank #2 Hedge)',
      compositeScore: 91.5,
      targetPrice: 155.0,
      projectedUpside: 31.1,
      verdictSummary:
        'Vertiv is the #1 physical thermodynamic necessity and the ideal geopolitical hedge against TSMC Taiwan risk. While TSMC dominates atomic compute, Vertiv handles the extreme heat flux of those chips with 100% Western manufacturing.',
      keyCatalysts: ['Blackwell NVL72 liquid cooling mass rollouts', 'Global datacenter PUE retrofit regulations'],
      criticalRisks: ['Component shortages in heavy heat exchangers and pumps'],
      recommendedAllocation: '25% allocation as the indispensable thermodynamic barbell pair to TSM.',
    },
  },
};
