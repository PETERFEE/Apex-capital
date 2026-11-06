// Apex Capital - Chrome Extension Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  // Set badge text for #1 pick
  chrome.action.setBadgeText({ text: '#1' });
  chrome.action.setBadgeBackgroundColor({ color: '#1a9fff' }); // SteamDB Royal Blue

  // Context menu for quick stock search on highlighted text
  chrome.contextMenus.create({
    id: 'steamdb_inspect_stock',
    title: 'Analyze "%s" on SteamDB Stock Recommender',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'steamdb_inspect_stock' && info.selectionText) {
    const ticker = info.selectionText.trim().toUpperCase().replace(/[^A-Z]/g, '');
    if (ticker) {
      chrome.storage.local.set({ targetInspectTicker: ticker }, () => {
        // Open the extension popup or notify
        chrome.action.openPopup?.();
      });
    }
  }
});
