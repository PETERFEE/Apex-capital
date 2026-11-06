<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e4376e97-1abd-4424-a172-38ca8b117121

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# Privacy Policy & Security Architecture

**Product:** Apex Capital - SteamDB AI Stock Recommender  
**Version:** 1.0.0 (Google Chrome Manifest V3)  
**Developer Contact:** fenghon000@gmail.com  
**Effective Date:** November 6, 2026  
**Live Policy URL:** https://ais-pre-kr5b5rohzuxver4ea7x3zm-583637110131.us-east1.run.app/privacy.html

---

## 1. Single Purpose Statement

The **Apex Capital - SteamDB AI Stock Recommender** extension provides investors with objective Mixture-of-Experts (MoE) stock ratings and SteamDB-style visual color classifications (🔵 **Blue** for Best, 🟢 **Green** for OK, 🔴 **Red** for Worst) directly in their browser toolbar and on recognized financial websites.

---

## 2. Zero-Data-Collection Guarantee

Apex Capital is architected with a strict privacy-first model: **we do not collect, store, sell, log, or transmit any user data.**

| Data Category | Collection Status | Explanation |
| :--- | :---: | :--- |
| **Personally Identifiable Information (PII)** | ❌ **None** | No names, emails, addresses, phone numbers, or account IDs are ever requested or collected. |
| **Financial & Payment Information** | ❌ **None** | The extension never connects to your bank, brokerage accounts (Robinhood, Schwab, etc.), credit cards, or portfolio holdings. |
| **Authentication & Passwords** | ❌ **None** | No user accounts, passwords, session tokens, or PINs exist. The extension works immediately upon installation. |
| **Browsing History & URLs** | ❌ **None** | Your browser history, visited tabs, search queries, and visit timestamps are never tracked, stored, or sent to any server. |
| **User Activity & Keystroke Logging** | ❌ **None** | No mouse clicks, movement, scroll tracking, network packet sniffing, or keystrokes are recorded. |
| **Website Content** | ❌ **None** | Content scripts run completely client-side in memory to recognize public stock ticker symbols (e.g. `$TSM`, `$NVDA`). No text or page content is ever saved or exfiltrated. |

---

## 3. Extension Permissions Breakdown

Every requested permission in `manifest.json` serves an explicit, non-intrusive purpose:

### `storage`
* **Purpose:** Stores user interface preferences locally on your machine via `chrome.storage.local`.
* **Data Stored:** Chosen autonomous research cadence (e.g., `1m`, `15m`, `60m`, `1440m`), dark theme toggle, and local stock consensus cache for instant offline rendering.
* **Network Behavior:** Stays 100% on device; never transmitted over the internet.

### `activeTab`
* **Purpose:** Allows the extension popup or context menu to interact with the currently focused financial page when explicitly triggered by the user.
* **Security Guardrail:** Does not give permanent or background access to tabs—only grants temporary access to the active tab upon user click.

### `contextMenus`
* **Purpose:** Adds a right-click menu entry: *"Analyze '%s' on SteamDB Stock Recommender"*.
* **Behavior:** When you highlight a stock ticker or company name on any webpage, right-clicking lets you inspect its 4-agent fundamental thesis directly.

### `alarms`
* **Purpose:** Drives the autonomous background research loop via Manifest V3 `chrome.alarms`.
* **Behavior:** Wakes up the background service worker at the frequency you choose (e.g., every 1 hour) to recalculate consensus scores and update the toolbar icon badge.

### `notifications`
* **Purpose:** Displays optional Chrome desktop notifications when a tracked stock changes conviction tier (such as an upgrade to 🔵 Best or downgrade to 🔴 Worst).
* **Control:** Can be toggled on or off at any time in extension settings.

### Host Permissions (`content_scripts`)
* **Domains Targeted:**
  * `*://*.finance.yahoo.com/*`
  * `*://*.google.com/finance*`
  * `*://*.bloomberg.com/*`
  * `*://*.reddit.com/*`
  * `*://*.twitter.com/*` & `*://*.x.com/*`
  * `*://*.cnbc.com/*`
  * `*://*.marketwatch.com/*`
* **Purpose:** Enables in-page detection of stock tickers in financial news articles and forum threads to render SteamDB color pills.
* **Privacy Assurance:** Executes 100% in-memory; no DOM data is ever copied, transmitted, or logged.

---

## 4. No Remote Code (Manifest V3 Compliance)

In compliance with Google Chrome Web Store policies:
* **Zero Remote Code Execution:** The extension contains **no remote JavaScript, no remote WebAssembly, no `eval()`, and no external CDN `<script>` tags**.
* **Fully Auditable:** All HTML, CSS, JavaScript, and PNG icon files are bundled locally inside the published package.

---

## 5. Developer Program Certifications

In accordance with Google Chrome Web Store Developer Program Policies:
1. **No Data Selling:** We do not sell, rent, or transfer user data to data brokers, advertising networks, or third parties.
2. **Single Purpose Alignment:** We do not use or transfer user data for purposes unrelated to stock recommendation and analysis.
3. **No Lending or Creditworthiness Assessment:** We do not use any data to evaluate creditworthiness or make lending decisions.

---

## 6. How to Host or Update This Privacy Policy

This policy is hosted live at:
https://ais-pre-kr5b5rohzuxver4ea7x3zm-583637110131.us-east1.run.app/privacy.html

To update the policy:
1. Edit `/public/privacy.html` for the web-facing HTML page.
2. Edit `/PRIVACY.md` for repository and developer documentation.
3. Both files stay synchronized and are immediately available for Chrome Web Store audits.

---

## 7. Contact & Support

For privacy inquiries, technical audits, or feature feedback:
* **Developer:** Apex Capital Engineering Team
* **Email:** fenghon000@gmail.com
* **Application Repository:** AI Studio Build `e4376e97-1abd-4424-a172-38ca8b117121`
