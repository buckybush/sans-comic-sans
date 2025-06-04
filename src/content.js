function isComicSans(fontFamily) {
  if (!fontFamily) return false;
  return fontFamily.toLowerCase().includes("comic sans");
}

function replaceComicSansWith(font) {
  // Handle regular DOM elements
  const allElements = document.querySelectorAll("*");
  replaceElementsFonts(allElements, font);

  // Handle Shadow DOM elements
  const shadowRoots = findShadowRoots(document.documentElement);
  shadowRoots.forEach(root => {
    const shadowElements = root.querySelectorAll("*");
    replaceElementsFonts(shadowElements, font);
  });
}

function findShadowRoots(element) {
  const shadowRoots = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_ELEMENT,
    null,
    false
  );

  while (walker.nextNode()) {
    if (walker.currentNode.shadowRoot) {
      shadowRoots.push(walker.currentNode.shadowRoot);
    }
  }
  return shadowRoots;
}

function replaceElementsFonts(elements, font) {
  elements.forEach(el => {
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
  
  // Initial replacement
  replaceComicSansWith(replacementFont);
  
  // Set up a MutationObserver to handle dynamically loaded content
  const observer = new MutationObserver(() => {
    replaceComicSansWith(replacementFont);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});