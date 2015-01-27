
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // Only for forum pages on desired host
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "www.elotrolado.net",
            }
          })
        ],

        // Display icon to show that extension is active
        actions: [
          new chrome.declarativeContent.ShowPageAction()
        ]
      }
    ])
  })
});

// Load options page when click on icon
chrome.pageAction.onClicked.addListener(function() {
  chrome.tabs.create({ 'url': chrome.extension.getURL('options.html') });
});