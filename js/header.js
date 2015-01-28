
chrome.storage.local.get({
  'eolium_header_compactMode': false

}, function(items) {

  var preferences = items;

  if (preferences['eolium_header_compactMode']) {
    var header = document.getElementById('header');
    if (header) {
      header.classList.toggle('compact');
    }
    var popup = document.getElementById('h-popup');
    var ucp = document.getElementById('h-ucp');
    popup.remove();
    ucp.appendChild(popup);
  }

});