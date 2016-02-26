(function(){
  'use strict';

  // Load preferences for toggles
  chrome.storage.local.get({
    'eolium_threads_hideImages':  false,
    'eolium_threads_compactMode': false

  }, (preferences) => {

    // Get post list
    const posts = Array.prototype.slice.call(document.querySelectorAll('.row.post'));

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

      posts.forEach((post) => {
        const content = post.querySelector('.message');

        // If no message (deleted messages)
        if (!content) return;

        const message = sanitizeText(content.textContent);

        // Check link text doesn't contain keyword, then hide row
        if (message.search(pattern) < 0) {
          // Avoid to add the same class twice or more
          if (!post.classList.contains('hide')) {
            post.classList.add('hide');
          }
        // If keyword exists but post was previously hidden, show it
        } else if (post.classList.contains('hide')) {
          post.classList.remove('hide');
        }
      });
    }

    // Toggle images or compact mode
    function toggleVisibility(event) {
      const postList = document.querySelector('.row.post').parentNode;
      let state;

      if (event.target.id === 'toggle-images') {
        postList.classList.toggle('hide-images');
        state = event.target.classList.toggle('active');
        chrome.storage.local.set({ 'eolium_threads_hideImages': state });

      } else if (event.target.id === 'toggle-compact') {
        postList.classList.toggle('compact');
        state = event.target.classList.toggle('active');
        chrome.storage.local.set({ 'eolium_threads_compactMode': state });
      }
    }

    // Create filter form
    const filterForm = (() => {
      const form = document.createElement('form');

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Filtrar mensajes...');
        input.addEventListener('input', setFilter);
        input.addEventListener('keydown', (e) => {
          // Clean filter with 'ESC' key
          if (e.keyCode === 27) {
            input.value = '';
            setFilter(e);
          }
        });

        const toggleCompact = document.createElement('input');
        toggleCompact.id = 'toggle-compact';
        toggleCompact.setAttribute('type', 'button');
        toggleCompact.setAttribute('title', 'Modo compacto');
        toggleCompact.classList.add('toggle');
        toggleCompact.addEventListener('click', toggleVisibility);
        if (preferences['eolium_threads_compactMode']) toggleCompact.click();

        const toggleImages = document.createElement('input');
        toggleImages.id = 'toggle-images';
        toggleImages.setAttribute('type', 'button');
        toggleImages.setAttribute('title', 'Ocultar imágenes');
        toggleImages.classList.add('toggle');
        toggleImages.addEventListener('click', toggleVisibility);
        if (preferences['eolium_threads_hideImages']) toggleImages.click();

      form.appendChild(input);
      form.appendChild(toggleCompact);
      form.appendChild(toggleImages);

      return form;
    })();

    const container = document.querySelector('.topic-actions form').parentNode;
    container.classList.add('topic-filters');
    container.appendChild(filterForm);

  });

})();
