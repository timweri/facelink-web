import $ from 'jquery'

const EventDetails = (($) => {
  const NAME = 'event-details'
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

  class EventDetails {
    constructor(element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.eventid = this.parseURLParams(window.location.href).eventid[0]
      this.database = firebase.database()
      this.$container = $('.event-detail > .container')
      console.log(this.eventid)
      this._addEventListener()
    }
    // public api
    static get Default() {
      return Default
    }

    render() {

    }

    genHTML(name, program, year, university, description, curuid) {
      var html = `<div class="blog-card">
      <a href="/student-profile.html?uid=${curuid}"></a>
      <div class="photo">
          <img src="http://pages.stern.nyu.edu/~sbp345/websys/phonegap-facebook-plugin-master/src/android/facebook/FacebookLib/res/drawable/com_facebook_profile_picture_blank_square.png">
      </div>
      <div class="description">
          <h1>${name}</h1>
          <h2>${program} ${university}</h2>
          <h4>Year ${year}</h4>
      </div>`
      return html
    }

    parseURLParams(url) {
      var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

      if (query === url || query === "") return;

      for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
      }
      return parms;
    }

    // private api
    _addEventListener() {
      var eventid = this.eventid
      var $h1 = $('.event-detail h1')
      var uid
      var database = this.database
      var $container = this.$container
      var thisgenHTML = this.genHTML
      $('#record-btn').click((e) => {
        window.location.assign(`/facial-reg.html?eventid=${eventid}`)
      })
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          uid = user.uid;
          console.log(uid)
          database.ref(`/users/${uid}/events/${eventid}`).orderByKey().once('value').then((snapshot) => {
            var title = snapshot.val().title
            $h1[0].innerHTML = title
          })
          database.ref(`/users/${uid}/events/${eventid}/visitors`).orderByKey().once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var curuid = childSnapshot.key
              console.log(curuid)
              var userSnapshot = database.ref(`/users/${curuid}`).once('value').then((snapshot) => {
                var name = snapshot.val().name
                var program = snapshot.val().program
                var university = snapshot.val().university
                var year = snapshot.val().year
                var description = snapshot.val().description
                $container.append($(thisgenHTML(name, program, year, university, description, curuid)))
              })
            })
          })
          console.log('logged in')
        }
        else {
          window.location.assign('/')
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
          data = new EventDetails(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    EventDetails._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = EventDetails._jQueryInterface
  $.fn[NAME].Constructor = EventDetails

  return EventDetails
})($)

export default EventDetails
