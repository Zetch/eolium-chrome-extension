
var userPopup = document.querySelector('#h-popup.h-popup-user');

// If user is logged then exists
if (userPopup) {
  // Replace <br> with whitespaces
  userPopup.innerHTML = userPopup.innerHTML.replace(/<br>/g, ' ');

  // Delete user zone options separator
  var options = userPopup.querySelector('#h-p-options');
  if (options) {
    Array.prototype.forEach.call(options.childNodes, function(node) {
      if (node.nodeType === 3) { // It's just text node
        node.remove();
      }
    });
  }

  // Put close session link inside of popup
  var logout = document.querySelector('#h-ucp #u-meta');
  var popupContent = userPopup.querySelector('#h-p-content');
  logout.remove();
  userPopup.insertBefore(logout, userPopup.firstChild);
}