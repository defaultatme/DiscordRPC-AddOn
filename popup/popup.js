document.addEventListener('DOMContentLoaded', () => {
    const listEl = document.getElementById('siteList');
    const addBtn = document.getElementById('addCurrentBtn');

    function renderList(sites) {
        listEl.innerHTML = '';
        if(sites.length === 0) {
            listEl.innerHTML = '<li style="justify-content:center; color:#949ba4;">No sites added</li>';
            return;
        }
        sites.forEach(site => {
            const li = document.createElement('li');
            li.textContent = site;
            const rmBtn = document.createElement('button');
            rmBtn.textContent = 'Remove';
            rmBtn.className = 'remove-btn';
            rmBtn.onclick = () => removeSite(site);
            li.appendChild(rmBtn);
            listEl.appendChild(li);
        });
    }

    function removeSite(siteToRemove) {
        chrome.storage.local.get(['sites'], (result) => {
            let sites = result.sites || [];
            sites = sites.filter(s => s !== siteToRemove);
            chrome.storage.local.set({ sites }, () => renderList(sites));
        });
    }

    chrome.storage.local.get(['sites'], (result) => {
        renderList(result.sites || []);
    });

    addBtn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].url) {
                const hostname = new URL(tabs[0].url).hostname;
                chrome.storage.local.get(['sites'], (result) => {
                    let sites = result.sites || [];
                    if (!sites.includes(hostname)) {
                        sites.push(hostname);
                        chrome.storage.local.set({ sites }, () => renderList(sites));
                    }
                });
            }
        });
    });
});
