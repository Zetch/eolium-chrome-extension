
// Load preferences
chrome.storage.local.get({
  // Other
  'eolium_other_hideRules':      false

}, function(items) {
  var preferences = items;

  // Hide Rules banner
  if (preferences['eolium_other_hideRules']) {
    var rules = document.querySelector('#forum-wrap > .rules');
    if (rules) {
      rules.remove();
    }
  }

});