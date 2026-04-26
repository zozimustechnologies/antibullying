export async function openSidePanel(hash: string = '') {
  try {
    // Open side panel for the current window
    const win = await chrome.windows.getCurrent();
    if (win?.id !== undefined) {
      await chrome.sidePanel.open({ windowId: win.id });
    }
    // Pass an initial hash via storage so the side panel can route on open.
    if (hash) {
      await chrome.storage.local.set({ initialHash: hash });
    }
  } catch (e) {
    // Fallback: no-op. The user can open the side panel from the action menu.
    console.warn('sidePanel.open failed', e);
  }
}
