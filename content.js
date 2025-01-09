// content.js
let currentSettings = null;
let intervalId = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'applyStyles') {
    applyStyles(request.settings);
  } else if (request.action === 'resetStyles') {
    resetStyles();
  }
});

function applyStyles(settings) {
  currentSettings = settings;
  
  // Apply styles immediately
  applyCurrentStyles();
  
  // Clear any existing interval
  if (intervalId) {
    clearInterval(intervalId);
  }
  
  // Set up interval to reapply styles every second
  intervalId = setInterval(applyCurrentStyles, 1000);
}

function applyCurrentStyles() {
  if (!currentSettings) return;
  
  // Apply to body
  document.body.style.fontFamily = currentSettings.fontFamily;
  document.body.style.color = currentSettings.textColor;
  document.body.style.backgroundColor = currentSettings.backgroundColor;
  
  // Apply to ALL elements
  const elements = document.getElementsByTagName('*');
  for (let element of elements) {
    element.style.fontFamily = currentSettings.fontFamily;
  }
}

function resetStyles() {
  // Clear the interval
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  
  currentSettings = null;
  
  // Remove styles
  document.body.style.removeProperty('fontFamily');
  document.body.style.removeProperty('color');
  document.body.style.removeProperty('backgroundColor');
  
  const elements = document.getElementsByTagName('*');
  for (let element of elements) {
    element.style.removeProperty('fontFamily');
  }
}