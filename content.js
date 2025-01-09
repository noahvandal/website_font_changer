
// Store original styles
let originalStyles = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'applyStyles') {
    applyStyles(request.settings);
  } else if (request.action === 'resetStyles') {
    resetStyles();
  }
});

function applyStyles(settings) {
  // Store original styles if not already stored
  if (!originalStyles) {
    originalStyles = {
      fontFamily: document.body.style.fontFamily,
      color: document.body.style.color,
      backgroundColor: document.body.style.backgroundColor
    };
  }

  // Apply new styles
  document.body.style.fontFamily = settings.fontFamily;
  document.body.style.color = settings.textColor;
  document.body.style.backgroundColor = settings.backgroundColor;

  // Apply to all elements to ensure consistency
  const elements = document.getElementsByTagName('*');
  for (let element of elements) {
    element.style.fontFamily = settings.fontFamily;
  }
}

function resetStyles() {
  if (originalStyles) {
    document.body.style.fontFamily = originalStyles.fontFamily;
    document.body.style.color = originalStyles.color;
    document.body.style.backgroundColor = originalStyles.backgroundColor;

    const elements = document.getElementsByTagName('*');
    for (let element of elements) {
      element.style.fontFamily = '';
    }
  }
}