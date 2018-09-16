import $ from 'jquery'

const Menu = (($) => {
  const NAME = 'menu'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
    elementItem: '.hamburger-menu, html, #main-menu, #header',
    navItemArrows: '.nav-item-arrows'
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }

  class Menu {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.header = $('#header, #main-menu-mobile')
      this.$menu = $('ul.menu-style')
      this.html = $('html')
      this.database = firebase.database()
      this.loadMenu()
      this.attachSignout()
    }
    // public api
    static get Default () {
      return Default
    }

    attachSignout() {
      this.$menu.on('click', '#logout-btn', (e) => {
        firebase.auth().signOut().then(function() {
          window.location.assign('/')
          alert('Sign-out successful')
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
        });        
      })
    }

    loadMenu () {
      var $menu = this.$menu
      var currole
      var database = this.database
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var uid = user.uid
          database.ref(`users/${uid}`).once('value').then((snapshot) => {
            currole = snapshot.child('role').val()
            database.ref(`menus/${currole}`).orderByKey().once('value').then((snapshot) => {
              snapshot.forEach((childSnapshot) => {
                var text = childSnapshot.val().text
                var link = childSnapshot.val().link
                var id = childSnapshot.val().id ? childSnapshot.val().id : ""
                var $new_item = $(`<li><a id="${id}" href="${link}">${text}</a></li>`)
                $menu.append($new_item)
              })
            })
          })
        } else {
          database.ref(`menus/unauth`).orderByKey().once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var text = childSnapshot.val().text
              var link = childSnapshot.val().link
              var id = childSnapshot.val().id ? childSnapshot.val().id : ""
              var $new_item = $(`<li><a id="${id}" href="${link}">${text}</a></li>`)
              $menu.append($new_item)
            })
          })
        }
      })
    }

    _getConfig (config) {
      config = $.extend({}, Default, config)
      return config
    }
    static _jQueryInterface (config) {
      return this.each(function () {
        const $element = $(this)
        const _config = $.extend(
          {},
          Default,
          $element.data(),
          typeof config === 'object' && config
        )
        let data = $element.data(DATA_KEY)
        if (!data) {
          data = new Menu(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    Menu._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Menu._jQueryInterface
  $.fn[NAME].Constructor = Menu

  return Menu
})($)

export default Menu
