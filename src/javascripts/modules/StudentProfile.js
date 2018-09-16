import $ from 'jquery'

const StudentProfile = (($) => {
  const NAME = 'student-profile'
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

  class StudentProfile {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      
      this._addEventListener()
    }
    // public api
    static get Default () {
      return Default
    }

    loadProfile () {
      var database = this.database
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var uid = user.uid
          database.ref(`users/${uid}`).once('value').then((snapshot) => {
            currole = snapshot.child('role').val()
          })
        } else {
          window.location.assign('/')
        }
      })
    }

    // private api
    _addEventListener () {

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
          data = new StudentProfile(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    StudentProfile._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = StudentProfile._jQueryInterface
  $.fn[NAME].Constructor = StudentProfile

  return StudentProfile
})($)

export default StudentProfile
