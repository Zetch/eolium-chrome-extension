/* global browser */

browser.storage.local
  .get({
    // Design
    eolium_header_compactMode: false,
    eolium_style_darkMode: false,
    // Forums
    eolium_forums_hideFilter: '',
    eolium_forums_hideRead: false,
    eolium_forums_hideClosed: false,
    eolium_forums_hideArchived: false,
    eolium_forums_hideIgnored: false,
    eolium_forums_ignoredThreads: [],
    // Threads
    eolium_threads_compactMode: false,
    eolium_threads_hideImages: false,
    // Other
    eolium_other_hideRelatedWikis: false,
    eolium_other_hideGlobalAnnouces: false,
    eolium_other_hideRules: false,
    eolium_other_hideBanners: false
  })
  .then(preferences => {
    // Change option and save
    function toggleCheckbox (event) {
      const toggle = event.target
      if (toggle.id in preferences) {
        preferences[toggle.id] = toggle.checked
        browser.storage.local.set(preferences)
      }
    }

    // Load preferences and event handling
    Object.keys(preferences)
      .map(id => [id, document.getElementById(id)])
      .filter(pair => pair[1] !== null)
      .forEach(pair => {
        pair[1].checked = preferences[pair[0]]
        pair[1].addEventListener('click', toggleCheckbox)
      })

    // Load ignored threads
    const ignored = preferences.eolium_forums_ignoredThreads
    const ignoredTopics = document.getElementById(
      'eolium_forums_ignoredThreads'
    )

    // Show/Hide list toggle
    document
      .getElementById('toggleIgnored')
      .addEventListener('click', event => {
        event.preventDefault()
        ignoredTopics.classList.toggle('hide')
        event.target.classList.toggle('open')
      })

    // Remove ignored topic
    function toggleIgnored (event) {
      event.preventDefault()
      const id = parseInt(event.target.id)
      browser.storage.local.set(
        {
          eolium_forums_ignoredThreads: ignored.filter(topic => topic.id !== id)
        },
        () => {
          event.target.parentNode.remove()
        }
      )
    }

    // Build tree
    ignored
      .sort((a, b) => a.forumName > b.forumName)
      .reduce((prev, next) => {
        if (prev === null || prev.forumId !== next.forumId) {
          const span = document.createElement('span')
          span.classList.add('forum-name')
          span.textContent = next.forumName
          ignoredTopics.appendChild(span)
        }
        const topic = document.createElement('li')
        const link = document.createElement('a')
        link.classList.add('topic')
        link.textContent = next.title
        link.setAttribute('href', 'http://www.elotrolado.net/' + next.url)
        topic.appendChild(link)
        const toggle = document.createElement('a')
        toggle.classList.add('toggle')
        toggle.id = next.id
        toggle.textContent = '×'
        toggle.setAttribute('href', '#')
        toggle.addEventListener('click', toggleIgnored)
        topic.appendChild(toggle)
        ignoredTopics.appendChild(topic)
        return next
      }, null)
  })
