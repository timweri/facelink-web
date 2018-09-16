import $ from 'jquery'

const StudentForm = (($) => {
  const NAME = 'student-form'
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

  class StudentForm {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.$submitbtn = $('#submit-btn')
      this._addEventListener()
    }
    // public api
    static get Default () {
      return Default
    }

    // private api
    _addEventListener () {
      var database = firebase.database()
      var $name = $('.student-form input[name="name"]')
      var $university = $('.student-form input[name="university"]')
      var $program = $('.student-form input[name="program"]')
      var $year = $('.student-form input[name="year"]')
      var $description = $('.student-form textarea[name="description"]')
      var $submitbtn = this.$submitbtn
      var uid
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          uid = user.uid
          database.ref(`users/${uid}`).once('value').then((snapshot) => {
            var currole = snapshot.val().role
            if (currole == 'recruiter') window.location.assign('/')
            else {
              $submitbtn.click((e) => {
                database = database.ref(`users/${uid}`)
                var json = {}
                json["name"] = $name.val()
                json["university"] = $university.val()
                json["program"] = $program.val()
                json["year"] = $year.val()
                json["description"] = $description.val()
                database.update(json)
                alert('Update successful')
                window.location.assign('/facial-reg.html')
              })
            }
          })
        } else {
          window.location.assign('/')
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
          data = new StudentForm(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    StudentForm._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = StudentForm._jQueryInterface
  $.fn[NAME].Constructor = StudentForm

  return StudentForm
})($)

export default StudentForm
