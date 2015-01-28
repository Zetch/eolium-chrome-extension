
// Load preferences
chrome.storage.local.get({
  // Other
  'eolium_other_hideForumTitle':     false,
  'eolium_other_hideRelatedWikis':   false,
  'eolium_other_hideGlobalAnnouces': false,
  'eolium_other_hideRules':          false

}, function(items) {
  var preferences = items;

  // Hide main title in forums
  if (window.location.pathname.match(/^\/foro_/) &&
      preferences['eolium_other_hideForumTitle']) {
        
    var title = document.querySelector('#forum-wrap > h1');
    if (title) {
      title.remove();
    }
    try {
      document.querySelector('#forum-wrap > h2.breadcrumbs').style.float = 'left';
      document.querySelector('#forum-wrap > ul.linklist').style.float = 'right';
      document.querySelector('#forum-wrap > .clear').remove();
    } catch (err) {

    }
  }

  // Hide related wikis
  if (preferences['eolium_other_hideRelatedWikis']) {
    var wikis = document.querySelector('#forum-wrap > .forabg.wikis');
    if (wikis) {
      wikis.remove();
    }
  }

  // Hide global announces
  if (preferences['eolium_other_hideGlobalAnnouces']) {
    var announces = document.querySelector('#forum-wrap > .forumbg.announcement');
    if (announces) {
      announces.remove();
    }
  }

  // Hide Rules banner
  if (preferences['eolium_other_hideRules']) {
    var rules = document.querySelector('#forum-wrap > .rules');
    if (rules) {
      rules.remove();
    }
  }

});
