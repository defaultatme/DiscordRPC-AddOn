let managedSites = [];
let port = null;

function connectNativeBridge() {
    try {
        port = chrome.runtime.connectNative('simplerpc_bridge');
        
        if (port) {
            port.onMessage.addListener((msg) => {
                console.log("Bridge response:", msg);
            });

            port.onDisconnect.addListener(() => {
                console.log("Native bridge disconnected:", chrome.runtime.lastError);
                port = null;
                setTimeout(connectNativeBridge, 5000);
            });
        }
    } catch (e) {
        console.error("Failed to connect to native bridge:", e);
        setTimeout(connectNativeBridge, 5000);
    }
}

// Load saved managed sites
chrome.storage.local.get(['sites'], (result) => {
    if (result.sites) managedSites = result.sites;
});

// React to site list updates from popup
chrome.storage.onChanged.addListener((changes) => {
    if (changes.sites) {
        managedSites = changes.sites.newValue;
        updateRPC();
    }
});

// Listen to tab state updates
chrome.tabs.onUpdated.addListener(() => updateRPC());
chrome.tabs.onActivated.addListener(() => updateRPC());
chrome.tabs.onRemoved.addListener(() => updateRPC());

function updateRPC() {
    if (!port) return;

    chrome.tabs.query({}, (tabs) => {
        const matchingTabs = tabs.filter(tab => {
            if (!tab.url) return false;
            try {
                const hostname = new URL(tab.url).hostname;
                return managedSites.includes(hostname);
            } catch (e) { return false; }
        });

        if (matchingTabs.length === 0) {
            try { port.postMessage({ action: "clear" }); } catch (err) {}
            return;
        }

        let targetTab = matchingTabs.find(t => t.active) || matchingTabs[0];
        const hostname = new URL(targetTab.url).hostname;

        try {
            port.postMessage({
                action: "set",
                site: hostname,
                title: targetTab.title || hostname
            });
        } catch (err) {
            console.error("Error sending message to bridge:", err);
        }
    });
}

connectNativeBridge();
