
var preferences = {
  // Header
  'eolium_header_compactMode':       false,

  // News
  'eolium_news_singleRow':           false,

  // User Panel
  'eolium_userZone_compactMode':     true,

  // Forums
  'eolium_forums_hideRead':          false,
  'eolium_forums_hideClosed':        false,
  'eolium_forums_hideArchived':      false,
  'eolium_forums_hideIgnored':       false,
  'eolium_forums_ignoredThreads':    {},

  // Threads
  'eolium_threads_compactMode':      false,
  'eolium_threads_hideImages':       false,

  // Other
  'eolium_other_hideForumTitle':     false,
  'eolium_other_hideRelatedWikis':   false,
  'eolium_other_hideGlobalAnnouces': false,
  'eolium_other_hideRules':          false
};


function toggleThreadsContainer(e) {
  e.preventDefault();
  var threads = document.getElementById('eolium_forums_ignoredThreads');
  threads.classList.toggle('hide');
  event.target.classList.toggle('open');
}


function savePreferences(e) {
  var toSave = {};
  // Load values from form
  for (name in preferences) {
    if (name == 'eolium_forums_ignoredThreads') continue;
    var input = document.getElementById(name);
    if (input) {
      var value;
      if (input.type === "checkbox") {
        value = input.checked;
      } else {
        value = input.value;
      }
      toSave[name] = value;
    }
  }
  // Save them to Chrome Storage
  chrome.storage.local.set(toSave, function() {
    var status = document.getElementById('status');
    status.textContent = 'Saved';
    status.classList.toggle('show');
    setTimeout(function() {
      status.classList.toggle('show');
    }, 2000);
  });
}


function loadPreferences(e) {
  // Restore preferences, it uses default values if they're not defined
  chrome.storage.local.get(preferences, function(items) {

    for (name in items) {
      var input = document.getElementById(name);
      if (name !== 'eolium_forums_ignoredThreads') {
        if (input.type === "checkbox") {
          input.checked = items[name];
        } else {
          input.value = items[name];
        }
      } else {
        var manager = new IgnoredManager(items['eolium_forums_ignoredThreads']);
        var tree = manager.buildHtml();
        input.appendChild(tree);
      }
    }
  });
}

var toggleIgnored = document.getElementById('toggleIgnored');
toggleIgnored.addEventListener('click', toggleThreadsContainer);

// Load preferences on load
document.addEventListener('DOMContentLoaded', loadPreferences);
// Save preferences on 'Save' link
document.getElementById('savePreferences').addEventListener('click', savePreferences);
