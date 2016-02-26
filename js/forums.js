(function(){
  'use strict';

  // Load preferences for toggles
  chrome.storage.local.get({
    'eolium_forums_hideFilter':     '',
    'eolium_forums_hideRead':       false,
    'eolium_forums_hideClosed':     false,
    'eolium_forums_hideArchived':   false,
    'eolium_forums_hideIgnored':    false,
    'eolium_forums_ignoredThreads': []

  }, (preferences) => {

    // Get topic list
    const topics = Array.prototype.slice.call(document.querySelectorAll('.row.topic:not(.announcement):not(.wikir)'));

    // Load ignored topics and set handlers
    ((ignored) => {

      // Parse ID from given path
      const regexId = /(\d+(_s\d+)?)?$/;
      const getId = (path) => parseInt(regexId.exec(path)[0].split('_')[0]);

      // Get subforum data
      const forumId = getId(window.location.pathname);
      const forumName = Array.prototype
        .slice.call(document.querySelectorAll('#breadcrumbs a'))
        .map(n => n.textContent.trim())
        .join(' > ');
      ;

      // Get subforum ignored topics
      const ignoredTopics = ignored.filter(topic => topic.forumId === forumId);

      function toggleIgnored(event) {
        event.preventDefault();
        const isIgnored = event
          .target     // .toggle
          .parentNode // .title
          .parentNode // .row
          .parentNode // .col
          .parentNode // .row
          .parentNode // .col
          .parentNode.firstElementChild.classList.toggle('rowignore');
        const link = event.target.previousElementSibling;
        const id = getId(link.getAttribute('href'))
        const title = link.textContent;

        if (isIgnored) {
          ignored.push({
            id:        id,
            title:     title.trim(),
            url:       link.getAttribute('href'),
            forumId:   forumId,
            forumName: forumName
          });
        } else {
          ignored = ignored.filter(topic => topic.id !== id);
        }

        // Save
        chrome.storage.local.set({ 'eolium_forums_ignoredThreads': ignored });
      }

      topics.forEach((topic) => {
        const title = topic.querySelector('.title a');
        const id = getId(title.getAttribute('href'));

        if (ignoredTopics.filter(i => i.id === id).length) {
          topic.firstElementChild.classList.add('rowignore');
        }

        const toggle = document.createElement('a');
        toggle.classList.add('toggle');
        toggle.textContent = '×';
        toggle.setAttribute('href', '#')
        toggle.addEventListener('click', toggleIgnored);
        title.parentNode.appendChild(toggle);
      });

    })(preferences['eolium_forums_ignoredThreads']);


    // Sanitize text before filtering
    function sanitizeText(text) {
      return text.toLowerCase()
        .replace(/[àáâãä]/g, "a")
        .replace(/[èéêẽë]/g, "e")
        .replace(/[ìíîĩï]/g, "i")
        .replace(/[òóôõö]/g, "o")
        .replace(/[ùúûũü]/g, "u");
    }

    // Set filter by pattern
    function setFilter(event) {
      const pattern = sanitizeText(event.target.value);

      topics.forEach((topic) => {
        const title = sanitizeText(topic.querySelector('.title a').getAttribute('title'));
        // Check link text doesn't contain keyword, then hide row
        if (title.search(pattern) < 0) {
          // Avoid to add the same class twice or more
          if (!topic.classList.contains('hide')) {
            topic.classList.add('hide');
          }
        // If keyword exists but topic was previously hidden, show it
        } else if (topic.classList.contains('hide')) {
          topic.classList.remove('hide');
        }
      });
    }

    // Set filter by state
    function toggleVisibility(event) {
      let selector, className, optionName;

      switch (event.target.id) {
        case 'toggle-read':
          selector  = '.topic > a.topicbtn:not(.rowunre):not(.rowmove)';
          className = 'hide-read';
          optionName = 'eolium_forums_hideRead';
          break;

        case 'toggle-closed':
          selector = '.topic > a.topicbtn.rowlock';
          className = 'hide-closed';
          optionName = 'eolium_forums_hideClosed';
          break;

        case 'toggle-archived':
          selector = '.topic > a.topicbtn.rowarch';
          className = 'hide-archived';
          optionName = 'eolium_forums_hideArchived';
          break;

        case 'toggle-ignored':
          selector = '.topic > a.topicbtn.rowignore';
          className = 'hide-ignored';
          optionName = 'eolium_forums_hideIgnored';
          break;

        default:
          return;
      }

      // Change button status and save as default
      const state = event.target.classList.toggle('active');
      chrome.storage.local.set({ [optionName]: state });

      // Toggle class on desired rows
      Array.prototype
        .slice.call(document.querySelectorAll(selector))
        .forEach(link => link.parentNode.classList.toggle(className))
      ;
    }

    // Create filter form
    const filterForm = (() => {
      const form = document.createElement('form');

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Filtrar hilos...');
        input.addEventListener('input', setFilter);
        input.addEventListener('keydown', (e) => {
          // Clean filter with 'ESC' key
          if (e.keyCode === 27) {
            input.value = '';
            setFilter(e);
          }
        });

        const toggleRead = document.createElement('input');
        toggleRead.id = 'toggle-read';
        toggleRead.setAttribute('type', 'button');
        toggleRead.classList.add('toggle');
        toggleRead.addEventListener('click', toggleVisibility);
        if (preferences['eolium_forums_hideRead']) toggleRead.click();

        const toggleClosed = document.createElement('input');
        toggleClosed.id = 'toggle-closed';
        toggleClosed.setAttribute('type', 'button');
        toggleClosed.classList.add('toggle');
        toggleClosed.addEventListener('click', toggleVisibility);
        if (preferences['eolium_forums_hideClosed']) toggleClosed.click();

        const toggleArchived = document.createElement('input');
        toggleArchived.id = 'toggle-archived';
        toggleArchived.setAttribute('type', 'button');
        toggleArchived.classList.add('toggle');
        toggleArchived.addEventListener('click', toggleVisibility);
        if (preferences['eolium_forums_hideArchived']) toggleArchived.click();

        const toggleIgnored = document.createElement('input');
        toggleIgnored.id = 'toggle-ignored';
        toggleIgnored.setAttribute('type', 'button');
        toggleIgnored.classList.add('toggle');
        toggleIgnored.addEventListener('click', toggleVisibility);
        if (preferences['eolium_forums_hideIgnored']) toggleIgnored.click();

      form.appendChild(input);
      form.appendChild(toggleRead);
      form.appendChild(toggleClosed);
      form.appendChild(toggleArchived);
      form.appendChild(toggleIgnored);

      return form;
    })();

    // Append form next to search input field
    const container = document.querySelector('.forum-actions form');
    if (container) {
      container.parentNode.classList.add('forum-filters');
      container.parentNode.appendChild(filterForm);
    }

  });

})();
