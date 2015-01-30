
function closePopup(event) {
  var popup = event.target;
  var clickTarget = event.relatedTarget;
  var menu = document.querySelector('#menu-'+popup.getAttribute('name'));
  if (!clickTarget ||
     (!clickTarget.parentNode.isSameNode(popup) &&
      !clickTarget.isSameNode(menu) &&
      !clickTarget.isSameNode(menu.querySelector('span')) ) ) {
    popup.classList.remove('show');
    menu.querySelector('span').classList.remove('active');
  }
}

function togglePopup(event) {
  // Prevent default event
  event.preventDefault();

  // Toggle active
  var menu = this; // Use 'this', event.target may uses span inside link
  var menuBarBounds = menu.parentNode.getBoundingClientRect();
  var arrow = menu.querySelector('span');
  var arrowBounds = arrow.getBoundingClientRect();
  arrow.classList.toggle('active');

  var name = menu.getAttribute('name');
  var popup = document.querySelector('#popup-'+name);
  var orientation = popup.classList.contains('ltr') ? 'ltr':'rtl';

  // Put menu on arrow position
  var popupBounds = popup.getBoundingClientRect();
  if (orientation === 'ltr') {
    popup.style.left = arrowBounds.right - menuBarBounds.left -3 +"px";
  } else if (orientation === 'rtl') {
    // RTL orientation, 165 = popup width
    popup.style.left = arrowBounds.right - menuBarBounds.left -165 -3 +"px";
  };

  // Toggle popup
  if (popup.classList.toggle('show')) {
    popup.focus();
  }
}

function toggleSubmenu(event) {
  event.preventDefault();
  var link = this;
  link.classList.toggle('active');
  var submenu = link.nextSibling;
  submenu.classList.toggle('show');
}

var navigation = {
  'xbone': {
    'title': 'Xbox One',
    'align': 'ltr',
    'links': [
      ['General',        '/foro_xbox-one-general_200'],
      ['Juegos',         '/foro_xbox-one-juegos_207'],
      ['Online',         '/foro_xbox-one-online_210']
    ]
  },
  'ps4': {
    'title': 'PlayStation 4',
    'align': 'ltr',
    'links': [
      ['General',        '/foro_playstation-4-general_201'],
      ['Juegos',         '/foro_playstation-4-juegos_208'],
      ['Online',         '/foro_playstation-4-online_209']
    ]
  },
  'wiiu': {
    'title': 'Wii U',
    'align': 'ltr',
    'links': [
      ['General',        '/foro_wii-u-general_191'],
      ['Juegos',         '/foro_wii-u-juegos_194'],
      ['Online',         '/foro_wii-u-online_211']
    ]
  },
  'ps3': {
    'title': 'PlayStation 3',
    'align': 'ltr',
    'links': [
      ['General',        '/foro_playstation-3-general_149'],
      ['Juegos',         '/foro_playstation-3-juegos_161'],
      ['Online',         '/foro_playstation-3-online_162'],
      ['Scene',          '/foro_playstation-3-scene_163'],
      ['Modchips/Softmods',       '/foro_playstation-3-modchips-y-softmods_179'],
      ['Carga de Backups',        '/foro_playstation-3-carga-de-backups_180']
    ]
  },
  '360': {
    'title': 'Xbox 360',
    'align': 'ltr',
    'links': [
      ['General',        '/foro_xbox-360-general_129'],
      ['Juegos',         '/foro_xbox-360-juegos_138'],
      ['Online',         '/foro_xbox-360-online_142'],
      ['Mod. de Lectores',       '/foro_xbox-360-modificacion-de-lectores_143'],
      ['Grabación',      '/foro_xbox-360-grabacion_151'],
      ['Exploits/Homebrew',       '/foro_xbox-360-exploits-y-homebrew_178']
    ]
  },
  'vita': {
    'title': 'PS Vita',
    'align': 'rtl',
    'links': [
      ['General',        '/foro_ps-vita-general_185'],
      ['Juegos',         '/foro_ps-vita-juegos_187'],
      ['Online',         '/foro_ps-vita-online_190'],
      ['Scene',          '/foro_ps-vita-scene_192']
    ]
  },
  '3ds': {
    'title': 'Nintendo 3DS',
    'align': 'rtl',
    'links': [
      ['General',        '/foro_nintendo-3ds-general_182'],
      ['Juegos',         '/foro_nintendo-3ds-juegos_184'],
      ['Online',         '/foro_nintendo-3ds-online_189'],
      ['Scene',          '/foro_nintendo-3ds-scene_202']
    ]
  },
  'other': {
    'title': 'Otras Consolas',
    'align': 'rtl',
    'links': [
      ['Multiplataforma', '/foro_otras-consolas-multiplataforma_22'],
      ['Wii', 
        [
          ['General',        '/foro_wii-general_148',],
          ['Juegos',         '/foro_wii-juegos_155',],
          ['Online',         '/foro_wii-online_156',],
          ['Scene',          '/foro_wii-scene_165',],
          ['Modchips',       '/foro_wii-modchips_158',],
          ['Softmods',       '/foro_wii-softmods_170',],
          ['Parches',        '/foro_wii-parches-y-grabacion_171']
        ]
      ],
      ['PSP',
        [
          ['General', ''],
          ['Juegos',  ''],
          ['Scene',   ''],
          ['Firmwares y Modchips', ''],
          ['Backups', '']
        ]
      ],
      ['Nintendo DS',
        [
          ['General', ''],
          ['Juegos',  ''],
          ['Flash Carts', ''],
          ['Scene', ''],
          ['Backups', '']
        ]
      ],
      ['PlayStation 2',
        [
          ['General', '']
        ]
      ]
    ]
  },
  'pc': {
    'title': 'PC',
    'align': 'rtl',
    'links': [
      ['General',        '/foro_pc-general_18'],
      ['Hardware',       '/foro_pc-hardware_9'],
      ['Mac',            '/foro_pc-mac_169'],
      ['Software Libre', '/foro_pc-software-libre_84'],
      ['Juegos',         '/foro_pc-juegos_62']
    ]
  },
  'tecno': {
    'title': 'Tecnología',
    'align': 'rtl',
    'links': [
      ['Telefonía',      '/foro_tecnologia-telefonia_119'],
      ['Electrónica',    '/foro_tecnologia-electronica-de-consumo_141']
    ]
  }
}

var contentWrap = document.querySelector("#content-wrap");
var menu        = contentWrap.querySelector("#menu");

for (name in navigation) {
  if (navigation.hasOwnProperty(name)) {

    // Bind nav
    var nav = menu.querySelector('#menu-'+name);

    // Check is valid, it could dissapear
    if (nav) {
      nav.setAttribute('name', name);
      var orientation = navigation[name].align
      nav.classList.add(orientation);

      // Add arrow
      var arrow = document.createElement("span");
      if (orientation === 'ltr') {
        nav.insertBefore(arrow, nav.firstChild);
      } else if (orientation === 'rtl') {
        nav.appendChild(arrow);
      }

      // Create popup
      var popup = document.createElement('div');
      popup.setAttribute('id', 'popup-'+name);
      popup.setAttribute('class', 'popup-navigation '+orientation);
      popup.setAttribute('name', name);
      popup.setAttribute('tabindex', '-1');

      // Create links
      Array.prototype.forEach.call(navigation[name].links, function(url) {
        var link = document.createElement('a');
        link.setAttribute('href', url[1]);
        link.textContent = url[0];
        link.addEventListener('click', function(e) { e.stopPropagation(); });
        popup.appendChild(link);
      });

      // Setup menu events
      nav.addEventListener('click', togglePopup);
      popup.addEventListener('blur', closePopup);

      contentWrap.appendChild(popup);

    } else {
      nav = document.createElement('a');
      nav.textContent = navigation[name].title;
      nav.setAttribute('name', name);
      nav.setAttribute('id', 'menu-'+name);
      var orientation = navigation[name].align;
      nav.classList.add(orientation)

      var arrow = document.createElement("span");
      if (orientation === 'ltr') {
        nav.insertBefore(arrow, nav.firstChild);
      } else if (orientation === 'rtl') {
        nav.appendChild(arrow);
      }

      // Create popup
      var popup = document.createElement('div');
      popup.setAttribute('id', 'popup-'+name);
      popup.setAttribute('class', 'popup-navigation '+orientation);
      popup.setAttribute('name', name);
      popup.setAttribute('tabindex', '-1');

      // Create links
      Array.prototype.forEach.call(navigation[name].links, function(link) {
        var anchor = document.createElement('a');
        var submenu;

        anchor.textContent = link[0];

        if (typeof(link[1]) === 'string') {
          anchor.setAttribute('href', link[1]);
        } else {
          // Add arrow to show is expandable
          var arrow = document.createElement("span");
          anchor.appendChild(arrow);

          // Add submenu links
          submenu = document.createElement("div");
          submenu.classList.add('submenu');

          var sublinks = link[1];
          sublinks.forEach(function(sublink) {
            var subanchor = document.createElement('a');
            subanchor.textContent = sublink[0];
            subanchor.setAttribute('href', sublink[1]);
            submenu.appendChild(subanchor);
          });

          anchor.addEventListener('click', toggleSubmenu);
        }

        popup.appendChild(anchor);
        if (submenu) popup.appendChild(submenu);
      });

      // Setup menu events
      nav.addEventListener('click', togglePopup);
      popup.addEventListener('blur', closePopup);

      menu.appendChild(nav);
      contentWrap.appendChild(popup);
    }
  }
}