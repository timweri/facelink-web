import $ from 'jquery'

const EventAuth = (($) => {
  const NAME = 'event-auth'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
  }
  const ClassName = { // eslint-disable-line
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }
  var uid
  var database = firebase.database()

  class EventAuth {
    constructor(element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.$container = $('.events-card > .container')
      this._addEventListener()
    }

    genHTML (title, location, time, eventid) {
      var html = `<div class="blog-card">
      <div class="description">
          <h1>${title}</h1>
          <h2>${location} ${time}</h2>
          <a href="/event.html?eventid=${eventid}"></a>
      </div>
      </div>`
      return html
    }

    // public api
    static get Default() {
      return Default
    }

    // private api
    _addEventListener() {
      var $container = this.$container
      var thisgenHTML = this.genHTML
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          uid = user.uid;
          console.log(uid)
          database.ref(`/users/${uid}/events`).orderByKey().once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              console.log(childSnapshot)
              var title = childSnapshot.val().title
              var location = childSnapshot.val().location
              var time = childSnapshot.val().time
              var eventid = childSnapshot.key
              $container.append($(thisgenHTML(title, location, time, eventid)))
            })
          })
          console.log('logged in')
        }
      })
    }
    _getConfig(config) {
      config = $.extend({}, Default, config)
      return config
    }
    static _jQueryInterface(config) {
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
          data = new EventAuth(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    EventAuth._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = EventAuth._jQueryInterface
  $.fn[NAME].Constructor = EventAuth

  return EventAuth
})($)

export default EventAuth
