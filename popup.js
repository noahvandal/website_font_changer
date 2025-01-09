document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.local.get(['fontFamily', 'textColor', 'backgroundColor'], function(result) {
      if (result.fontFamily) document.getElementById('fontFamily').value = result.fontFamily;
      if (result.textColor) document.getElementById('textColor').value = result.textColor;
      if (result.backgroundColor) document.getElementById('backgroundColor').value = result.backgroundColor;
    });
  
    // Apply button click handler
    document.getElementById('apply').addEventListener('click', function() {
      const settings = {
        fontFamily: document.getElementById('fontFamily').value,
        textColor: document.getElementById('textColor').value,
        backgroundColor: document.getElementById('backgroundColor').value
      };
  
      // Save settings
      chrome.storage.local.set(settings);
  
      // Send message to content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'applyStyles',
          settings: settings
        });
      });
    });
      // Reset button click handler
  document.getElementById('reset').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'resetStyles'
      });
    });
    chrome.storage.local.clear();
  });
});
