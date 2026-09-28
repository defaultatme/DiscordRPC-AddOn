chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSiteInfo") {
        let iconElement = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        sendResponse({
            title: document.title,
            icon: iconElement ? iconElement.href : ""
        });
    }
});
