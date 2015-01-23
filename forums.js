
function setFilter(keyword, rows) {
  // Convert text before search
  var keywd = sanitizeText(keyword);

  // Check rows
  Array.prototype.forEach.call(rows, function(row) {
    var threadLink = row.querySelector('dl > dt > a');
    // Check link exists
    if (threadLink) {
      var title = sanitizeText(threadLink.text);
      // Check link text doesn't contain keyword, then hide row
      if (title.search(keywd) < 0) {
        // Avoid to add the same class twice or more
        if (!row.classList.contains('noDisplay')) {
          row.classList.add('noDisplay');
        }
      // If keyword exists but row was previously hidden, show it
      } else if (row.classList.contains('noDisplay')) {
        row.classList.remove('noDisplay');
      // Keyword exists and it's not hidden
      } else {
        // OK
      }
    }
  });
}

function toggleVisibility(toggle, hidden, rows) {
  // Check given toggle name
  var selector, className;
  if (toggle === 'read') {
    selector  = 'a:not(.rowunre)';
    className = 'hideRead';
  } else if (toggle === 'closed') {
    selector = 'a.rowlock';
    className = 'hideClosed';
  } else if (toggle === 'archived') {
    selector = 'a.rowarch';
    className = 'hideArchived';
  } else {
    // Do nothing
    return;
  }
  // Toggle class on desired rows
  Array.prototype.forEach.call(rows, function(row) {
    var isMatched = row.querySelector('dl > ' + selector);
    if (isMatched) {
      row.classList.toggle(className);
    }
  });
}

// If it's a forum and it can be filtered (exclude forums without topics)
if (document.querySelector('#content-wrap #forum-wrap') &&
    document.querySelector('#forum-wrap .topic-actions')) {

  // Bind elements
  var form = document.querySelector('#forum-wrap .topic-actions #forum-search');
  var rows = document.querySelectorAll('#forum-wrap .forumbg:not(.announcement) .topics .row');

  // Create new elements for filtering
  var inputFilter = document.createElement('input');
  inputFilter.setAttribute('type',        'text');
  inputFilter.setAttribute('id',          'inputFilter');
  inputFilter.setAttribute('placeholder', 'Filtrar hilos...');

  var buttonRead = document.createElement('button');
  buttonRead.setAttribute('id',    'buttonRead');
  buttonRead.setAttribute('title', 'Leídos');
  buttonRead.setAttribute('class', 'active');

  var buttonClosed = document.createElement('button');
  buttonClosed.setAttribute('id',    'buttonClosed');
  buttonClosed.setAttribute('title', 'Cerrados');
  buttonClosed.setAttribute('class', 'active');

  var buttonArchived = document.createElement('button');
  buttonArchived.setAttribute('id',    'buttonArchived');
  buttonArchived.setAttribute('title', 'Archivados');
  buttonArchived.setAttribute('class', 'active');

  // Setup events on new elements
  inputFilter.addEventListener('input', function(e) {
    setFilter(e.target.value, rows);
  });

  buttonRead.addEventListener('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    toggleVisibility('read', e.target.classList.toggle('active'), rows);
  });

  buttonClosed.addEventListener('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    toggleVisibility('closed', e.target.classList.toggle('active'), rows);
  });

  buttonArchived.addEventListener('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    toggleVisibility('archived', e.target.classList.toggle('active'), rows);
  });

  // Append to page
  form.appendChild(inputFilter);
  form.appendChild(buttonRead);
  form.appendChild(buttonClosed);
  form.appendChild(buttonArchived);
}