// Apex Capital - SteamDB Content Script
// Detects known stock tickers and overlays SteamDB ratings

const STOCK_TIERS = {
  TSM: { tier: 'best', rank: 1, score: 95.2, target: '$275.00', upside: '+38.5%', label: '★ BEST' },
  VRT: { tier: 'best', rank: 2, score: 91.8, target: '$155.00', upside: '+31.1%', label: '★ BEST' },
  NVDA: { tier: 'ok', rank: 3, score: 86.4, target: '$168.00', upside: '+22.8%', label: '✓ OK' },
  AVGO: { tier: 'ok', rank: 4, score: 84.5, target: '$215.00', upside: '+17.9%', label: '✓ OK' },
  GEV: { tier: 'ok', rank: 5, score: 81.2, target: '$395.00', upside: '+14.5%', label: '✓ OK' },
  MSFT: { tier: 'ok', rank: 6, score: 78.5, target: '$465.00', upside: '+12.7%', label: '✓ OK' },
  AMZN: { tier: 'ok', rank: 7, score: 79.2, target: '$235.00', upside: '+14.5%', label: '✓ OK' },
  INTC: { tier: 'worst', rank: 8, score: 38.2, target: '$17.50', upside: '-18.2%', label: '⚠ WORST' },
  SMCI: { tier: 'worst', rank: 9, score: 34.5, target: '$22.00', upside: '-22.8%', label: '⚠ WORST' },
  WOLF: { tier: 'worst', rank: 10, score: 29.8, target: '$5.50', upside: '-38.2%', label: '⚠ WORST' },
};

function injectSteamDbBadges() {
  const elements = document.querySelectorAll('p, span, h1, h2, h3, a');
  const processedKey = 'data-steamdb-scanned';

  elements.forEach((el) => {
    if (el.getAttribute(processedKey) || el.children.length > 0) return;
    el.setAttribute(processedKey, 'true');

    const text = el.textContent || '';
    for (const [ticker, data] of Object.entries(STOCK_TIERS)) {
      const regex = new RegExp(`\\b(\\$?${ticker})\\b`, 'g');
      if (regex.test(text)) {
        const badge = document.createElement('span');
        badge.className = `steamdb-badge steamdb-badge-${data.tier}`;
        badge.textContent = `${ticker} ${data.label}`;
        badge.title = `Apex Capital MoE: ${data.score}% Rating | Target: ${data.target} (${data.upside})`;
        el.appendChild(badge);
        break;
      }
    }
  });
}

// Initial scan
setTimeout(injectSteamDbBadges, 1000);
// Scan on DOM changes
const observer = new MutationObserver(() => injectSteamDbBadges());
observer.observe(document.body, { childList: true, subtree: true });
