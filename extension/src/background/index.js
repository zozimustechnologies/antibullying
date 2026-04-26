// Background service worker.
// Keeps the side panel openable on action click and reserves room for
// future opt-in features (daily tips, pause-and-reflect content scripts).
chrome.runtime.onInstalled.addListener(() => {
    // Allow the toolbar icon to open the side panel as well as the popup.
    chrome.sidePanel?.setPanelBehavior?.({ openPanelOnActionClick: false }).catch(() => { });
});
export {};
