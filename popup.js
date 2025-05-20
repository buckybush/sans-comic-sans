const select = document.getElementById('fontSelect');

// Load saved font on popup open
chrome.storage.sync.get("replacementFont", (data) => {
  if (data.replacementFont) {
    select.value = data.replacementFont;
  }
});

// Save new font when user changes selection
select.addEventListener("change", () => {
  chrome.storage.sync.set({ replacementFont: select.value });
});
