/* global browser */

browser.storage.local
  .get({
    eolium_header_compactMode: false,
    eolium_other_hideRelatedWikis: false,
    eolium_other_hideGlobalAnnouces: false,
    eolium_other_hideRules: false,
    eolium_other_hideBanners: false
  })
  .then(preferences => {
    // Restyling
    if (preferences.eolium_header_compactMode) {
      // Add CSS
      document.body.classList.add('eolium')

      const navigation = {
        main: {
          title: 'Home',
          align: 'ltr',
          links: [
            ['Miembros', '/memberlist.php'],
            ['Staff', '/memberlist.php?mode=leaders'],
            ['Genteol', '/gallery.php'],
            ['Colecciones', 'http://colecciones.elotrolado.net'],
            ['Búsqueda Avanzanda', '/search.php'],
            ['Normas', '/hilo_recordatorio-de-las-principales-normas_1014288']
          ]
        },
        news: {
          title: 'News',
          align: 'ltr',
          links: [
            ['Consolas', '/noticias/consolas/'],
            ['Juegos', '/noticias/juegos/'],
            ['Scene', '/noticias/scene/'],
            ['Tecnología', '/noticias/tecnologia/'],
            ['Internet', '/noticias/internet/'],
            ['Otros', '/noticias/otros/']
          ]
        },
        multi: {
          title: 'Multi',
          align: 'ltr',
          links: [
            ['General', '/foro_multiplataforma-general_22'],
            ['Sistemas VR', '/foro_multiplataforma-sistemas-vr_224'],
            [
              'C. Alternativas',
              '/foro_multiplataforma-consolas-alternativas_120'
            ],
            ['Google Stadia', '/foro_multiplataforma-google-stadia_228'],
            ['Desarrollo', '/foro_multiplataforma-desarrollo_152']
          ]
        },
        ps5: {
          title: 'PS5',
          align: 'ltr',
          link: '/foro_multiplataforma-playstation-5_229'
        },
        xsx: {
          title: 'XSX',
          align: 'ltr',
          link: '/foro_multiplataforma-xbox-series-x_230'
        },
        switch: {
          title: 'Switch',
          align: 'ltr',
          links: [
            ['General', '/foro_nintendo-switch-general_216'],
            ['Juegos', '/foro_nintendo-switch-juegos_218'],
            ['Online', '/foro_nintendo-switch-online_221'],
            ['Scene', '/foro_nintendo-switch-scene_226']
          ]
        },
        xone: {
          title: 'Xbox One',
          align: 'ltr',
          links: [
            ['General', '/foro_xbox-one-general_200'],
            ['Juegos', '/foro_xbox-one-juegos_207'],
            ['Online', '/foro_xbox-one-online_210']
          ]
        },
        ps4: {
          title: 'PS4',
          align: 'ltr',
          links: [
            ['General', '/foro_playstation-4-general_201'],
            ['Juegos', '/foro_playstation-4-juegos_208'],
            ['Online', '/foro_playstation-4-online_209'],
            ['Scene', '/foro_playstation-4-scene_225']
          ]
        },
        wiiu: {
          title: 'Wii U',
          align: 'ltr',
          links: [
            ['General', '/foro_wii-u-general_191'],
            ['Juegos', '/foro_wii-u-juegos_194'],
            ['Online', '/foro_wii-u-online_211'],
            ['Scene', '/foro_wii-u-scene_213']
          ]
        },
        ps3: {
          title: 'PS3',
          align: 'ltr',
          links: [
            ['General', '/foro_playstation-3-general_149'],
            ['Juegos', '/foro_playstation-3-juegos_161'],
            ['Online', '/foro_playstation-3-online_162'],
            ['Scene', '/foro_playstation-3-scene_163'],
            [
              'Modchips/Softmods',
              '/foro_playstation-3-modchips-y-softmods_179'
            ],
            ['Carga de Backups', '/foro_playstation-3-carga-de-backups_180']
          ]
        },
        x360: {
          title: 'Xbox 360',
          align: 'ltr',
          links: [
            ['General', '/foro_xbox-360-general_129'],
            ['Juegos', '/foro_xbox-360-juegos_138'],
            ['Online', '/foro_xbox-360-online_142'],
            ['Mod. de Lectores', '/foro_xbox-360-modificacion-de-lectores_143'],
            ['Grabación', '/foro_xbox-360-grabacion_151'],
            ['Exploits/Homebrew', '/foro_xbox-360-exploits-y-homebrew_178']
          ]
        },
        '3ds': {
          title: '3DS',
          align: 'rtl',
          links: [
            ['General', '/foro_nintendo-3ds-general_182'],
            ['Juegos', '/foro_nintendo-3ds-juegos_184'],
            ['Online', '/foro_nintendo-3ds-online_189'],
            ['Scene', '/foro_nintendo-3ds-scene_202']
          ]
        },
        otras: {
          title: 'Otras',
          align: 'rtl',
          links: [
            [
              'PS  Vita',
              [
                ['General', '/foro_ps-vita-general_185'],
                ['Juegos', '/foro_ps-vita-juegos_187'],
                ['Online', '/foro_ps-vita-online_190'],
                ['Scene', '/foro_ps-vita-scene_192']
              ]
            ],
            [
              'Wii',
              [
                ['General', '/foro_wii-general_148'],
                ['Juegos', '/foro_wii-juegos_155'],
                ['Online', '/foro_wii-online_156'],
                ['Scene', '/foro_wii-scene_165'],
                ['Modchips', '/foro_wii-modchips_158'],
                ['Softmods', '/foro_wii-softmods_170'],
                ['Parches', '/foro_wii-parches-y-grabacion_171']
              ]
            ],
            [
              'PSP',
              [
                ['General', '/foro_psp-general_126'],
                ['Juegos', '/foro_psp-juegos_133'],
                ['Scene', '/foro_psp-scene_128'],
                ['Firmwares/Modchips', '/foro_psp-firmwares-y-modchips_153'],
                ['Backups', '/foro_psp-carga-de-backups_134']
              ]
            ],
            [
              'Nintendo DS',
              [
                ['General', '/foro_nds-general_125'],
                ['Juegos', '/foro_nds-juegos_135'],
                ['Flash Carts', '/foro_nds-flash-carts_150'],
                ['Scene', '/foro_nds-scene_130'],
                ['Backups', '/foro_nds-carga-de-backups_136']
              ]
            ],
            [
              'PlayStation 2',
              [
                ['General', '/foro_playstation-2-general_16'],
                ['Juegos', '/foro_playstation-2-juegos_23'],
                ['Online', '/foro_playstation-2-online_103'],
                ['Modchips', '/foro_playstation-2-modchips_24'],
                ['Cog-Swap', '/foro_playstation-2-cog-swap_73'],
                [
                  'Parches/Grabación',
                  '/foro_playstation-2-parches-y-grabacion_74'
                ],
                ['Scene', '/foro_playstation-2-scene_124']
              ]
            ],
            [
              'Retro',
              [
                ['Xbox', '/foro_otras-consolas-xbox_78'],
                ['GameCube', '/foro_otras-consolas-gamecube_85'],
                ['Dreamcast', '/foro_otras-consolas-dreamcast_6'],
                ['PlayStation', '/foro_otras-consolas-playstation_81'],
                ['GBA', '/foro_retro-y-descatalogado-game-boy_66'],
                ['Clásicas', '/foro_otras-consolas-consolas-clasicas_80'],
                [
                  'Arcade y Emulación',
                  '/foro_retro-y-descatalogado-arcade-y-emulacion_220'
                ]
              ]
            ]
          ]
        },
        pc: {
          title: 'PC',
          align: 'rtl',
          links: [
            ['General', '/foro_pc-general_18'],
            ['Hardware', '/foro_pc-hardware_9'],
            ['Mac', '/foro_pc-mac_169'],
            ['Software Libre', '/foro_pc-software-libre_84'],
            ['Juegos', '/foro_pc-juegos_62'],
            ['Online', '/foro_pc-online_64']
          ]
        },
        tecno: {
          title: 'Tecnología',
          align: 'rtl',
          links: [
            ['Telefonía', '/foro_tecnologia-telefonia_119'],
            ['Electrónica', '/foro_tecnologia-electronica-de-consumo_141']
          ]
        },
        cv: {
          title: 'C/V',
          align: 'rtl',
          links: [
            ['Nueva Generación', '/foro_compra-venta-nueva-generacion_212'],
            ['Actuales', '/foro_compra-venta-consolas-actuales_97'],
            ['Modernas', '/foro_compra-venta-consolas-modernas_164'],
            ['Clásicas', '/foro_compra-venta-consolas-clasicas_98'],
            ['Informática', '/foro_compra-venta-informatica_99'],
            ['Otros', '/foro_compra-venta-otros_100'],
            ['Feedback', '/foro_compra-venta-feedback-cv_117']
          ]
        },
        offtopic: {
          title: 'Off-Topic',
          align: 'rtl',
          links: [
            ['Miscelánea', '/foro_off-topic-miscelanea_11'],
            ['El rincón de EOL', '/foro_off-topic-el-rincon-del-eoliano_67'],
            ['Series y Cine', '/foro_off-topic-series-y-cine_219'],
            ['Manganime y Cómics', '/foro_off-topic-manganime-y-comics_60'],
            ['Literatura', '/foro_off-topic-literatura_61'],
            ['Música', '/foro_off-topic-musica_115'],
            ['ex-Pruebas', '/foro_off-topic-ex-pruebas_21']
          ]
        },
        more: {
          title: 'Más',
          align: 'rtl',
          links: [
            [
              'Feedback',
              [
                ['Políticas EOL', '/foro_feedback-politicas-de-eol_10'],
                [
                  'Cuestiones técnicas',
                  '/foro_feedback-cuestiones-tecnicas_166'
                ],
                ['Wiki', '/foro_feedback-wiki_159'],
                ['Compra-Venta', '/foro_compra-venta-feedback-cv_117']
              ]
            ],
            [
              'Noticias',
              [
                ['El Buffer', '/foro_noticias-el-buffer_157'],
                ['Consolas', '/foro_noticias-consolas_195'],
                ['Juegos', '/foro_noticias-juegos_196'],
                ['eSports', '/foro_noticias-esports_227'],
                ['Scene', '/foro_noticias-scene_197'],
                ['Tecnología', '/foro_noticias-tecnologia_33'],
                ['Internet', '/foro_noticias-internet_90'],
                ['Otros', '/foro_noticias-otros_30'],
                ['Breves', '/foro_noticias-breves_214']
              ]
            ],
            ['Wiki', '/wiki/']
          ]
        }
      }

      // Get user metadata
      const user = {
        username: document.querySelector('#u-nick > a').textContent,
        profile: document.querySelector('#u-nick > a').getAttribute('href'),
        logout: document.querySelector('#u-meta > a').getAttribute('href'),
        avatar: document
          .querySelector('#u-avatar-inner > img')
          .getAttribute('src'),
        messages: 0
      }

      // Get PM count
      if (document.getElementById('u-badge-top')) {
        user.messages = parseInt(
          document.getElementById('u-badge-top').textContent
        )
      }

      // Get some elements and remove header then
      const search = document.getElementById('h-search')
      const switchWide = document.getElementById('switch-wide')
      document.getElementById('header').parentNode.remove()

      // Create navbar and links
      ;(function () {
        const navbar = (function () {
          // New popup links
          const userlinks = [
            ['ucp-cp', 'Panel de Control', '/ucp.php'],
            ['ucp-pm', 'Mensajes privados', '/ucp.php?i=pm'],
            ['ucp-sub', 'Hilos suscritos', '/ucp.php?i=main&mode=subscribed'],
            ['ucp-fav', 'Hilos favoritos', '/ucp.php?i=main&mode=bookmarks'],
            [
              'ucp-posts',
              'Mis mensajes',
              '/search.php?search_id=egosearch&sr=posts'
            ],
            [
              'ucp-threads',
              'Mis hilos',
              '/search.php?search_id=egosearch&sr=topics&sf=firstpost'
            ],
            ['ucp-mentions', 'Mis menciones', '/ucp.php?i=mentions'],
            ['ucp-logout', 'Cerrar sessión', user.logout]
          ]

          // Build navbar
          const navbar = document.createElement('div')
          navbar.classList.add('bar')
          navbar.classList.add('navbar')

          const row = document.createElement('div')
          row.classList.add('bar--row')
          row.classList.add('container-fluid')
          row.classList.add('limit-width')

          const title = document.createElement('a')
          title.setAttribute('href', '/')
          title.classList.add('bar--title')
          const logo = document.createElement('img')
          logo.classList.add('logo')
          logo.src = browser.extension.getURL('images/eollogo.svg')
          title.appendChild(logo)

          const spacer = document.createElement('div')
          spacer.classList.add('bar--spacer')

          const form = document.createElement('div')
          form.classList.add('bar--form')

          // User panel
          const profile = document.createElement('div')
          profile.classList.add('navbar--profile')

          if (user.messages > 0) {
            const badge = document.createElement('a')
            badge.textContent = user.messages
            badge.setAttribute('href', '/ucp.php?i=pm')
            badge.classList.add('badge')
            profile.appendChild(badge)
          }

          const username = document.createElement('span')
          username.classList.add('username')
          username.textContent = user.username
          username.addEventListener('click', function (event) {
            profile.classList.toggle('open')
          })

          const avatar = document.createElement('img')
          avatar.classList.add('avatar')
          avatar.setAttribute('src', user.avatar)

          const popup = document.createElement('div')
          popup.classList.add('popup')

          const popupList = document.createElement('nav')

          // Is logged
          if (user.username !== 'Invitado') {
            userlinks.forEach(function (pair) {
              const a = document.createElement('a')
              a.id = pair[0]
              a.textContent = pair[1]
              a.setAttribute('href', pair[2])
              popupList.appendChild(a)
            })

            // Show login link
          } else {
            const login = document.createElement('a')
            login.id = 'ucp-login'
            login.textContent = 'Login'
            login.setAttribute('href', '/ucp.php?mode=login')
            popupList.appendChild(login)

            const register = document.createElement('a')
            register.id = 'ucp-register'
            register.textContent = 'Register'
            register.setAttribute('href', '/ucp.php?mode=register')
            popupList.appendChild(register)
          }

          popup.appendChild(popupList)
          form.appendChild(search)
          profile.appendChild(username)
          profile.appendChild(avatar)
          profile.appendChild(popup)
          row.appendChild(title)
          row.appendChild(spacer)
          row.appendChild(form)
          row.appendChild(profile)
          navbar.appendChild(row)

          return navbar
        })()

        document.body.insertBefore(navbar, document.body.firstChild)

        const menubar = (function () {
          const menubar = document.createElement('div')
          menubar.classList.add('bar')
          menubar.classList.add('menubar')

          const row = document.createElement('div')
          row.classList.add('bar--row')
          row.classList.add('container-fluid')
          row.classList.add('limit-width')

          const menu = document.createElement('ul')
          menu.classList.add('bar--list')
          menu.classList.add('main')

          Object.keys(navigation).forEach(function (name) {
            const menuItem = document.createElement('li')

            if (navigation[name].links) {
              const toggle = document.createElement('span')
              toggle.classList.add('toggle')
              toggle.textContent = navigation[name].title
              toggle.addEventListener('click', function (event) {
                Array.prototype.slice
                  .call(document.querySelectorAll('.menubar .main > li'))
                  .forEach(
                    item =>
                      item !== event.target.parentNode &&
                      item.classList.remove('open')
                  )
                menuItem.classList.toggle('open')
              })
              menuItem.appendChild(toggle)

              const submenu = document.createElement('ul')
              submenu.classList.add('main-popup')
              submenu.classList.add(navigation[name].align)
              navigation[name].links.forEach(function (link) {
                const li = document.createElement('li')
                // Add menu link
                if (typeof link[1] === 'string') {
                  const a = document.createElement('a')
                  a.textContent = link[0]
                  a.setAttribute('href', link[1])
                  li.appendChild(a)

                  // Or create sub links
                } else {
                  const s = document.createElement('span')
                  s.classList.add('toggle')
                  s.textContent = link[0]
                  s.addEventListener('click', function (event) {
                    li.classList.toggle('open')
                  })
                  li.appendChild(s)

                  const ul = document.createElement('ul')
                  ul.classList.add('submenu')
                  link[1].forEach(function (sublink) {
                    const li = document.createElement('li')
                    const a = document.createElement('a')
                    a.textContent = sublink[0]
                    a.setAttribute('href', sublink[1])
                    li.appendChild(a)
                    ul.appendChild(li)
                  })
                  li.appendChild(ul)
                }
                submenu.appendChild(li)
              })
              menuItem.appendChild(submenu)
            } else {
              const anchor = document.createElement('a')
              anchor.textContent = navigation[name].title
              anchor.setAttribute('href', navigation[name].link)
              menuItem.appendChild(anchor)
            }
            menu.appendChild(menuItem)
          })

          row.appendChild(menu)
          menubar.appendChild(row)

          return menubar
        })()

        document.body.insertBefore(menubar, navbar.nextSibling)

        // Toggle full-width
        ;(function () {
          const li = document.createElement('li')
          li.appendChild(switchWide)
          document.querySelector('.menubar .main-popup').appendChild(li)
        })()
      })()
    }

    // Hide related wikis
    if (preferences.eolium_other_hideRelatedWikis) {
      const wikis = document.querySelector('.section > .row.topic.wikir')
      if (wikis) wikis.parentNode.remove()
    }

    // Hide global announces
    if (preferences.eolium_other_hideGlobalAnnouces) {
      const announces = document.querySelector(
        '.section > .row.topic.announcement'
      )
      if (announces) announces.parentNode.remove()
    }

    // Hide Rules banner
    if (preferences.eolium_other_hideRules) {
      const rules = document.querySelector('.section > .row #forum-rules')
      if (rules) rules.parentNode.parentNode.remove()
    }

    // Hide Rules banner
    if (preferences.eolium_other_hideBanners) {
      const selectors = ['.dfp-queue', '.news-ad']

      selectors.forEach(selector => {
        Array.prototype.slice
          .call(document.querySelectorAll(selector))
          .forEach(node => node.remove())
      })
    }
  })
