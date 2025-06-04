function isComicSans(fontFamily) {
  if (!fontFamily) return false;
  return fontFamily.toLowerCase().includes("comic sans");
}

function replaceComicSansWith(font) {
  const allElements = document.querySelectorAll("*");

  allElements.forEach(el => {
    const computedStyle = window.getComputedStyle(el);
    const fontFamily = computedStyle.getPropertyValue("font-family");

    if (isComicSans(fontFamily)) {
      el.style.setProperty("font-family", font, "important");
    }
  });
}

// Load the replacement font from storage and run replacement
chrome.storage.sync.get("replacementFont", (data) => {
  const replacementFont = data.replacementFont || "Arial, sans-serif";
  replaceComicSansWith(replacementFont);
  setTimeout(() => replaceComicSansWith(replacementFont), 1000); // handle late-loading fonts
});
