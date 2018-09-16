import $ from 'jquery'

const LoginPanel = (($) => {
  const NAME = 'login-panel'
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

  class LoginPanel {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.$loginbtn = $('#login-btn')
      this.$signupbtn = $('#signup-btn')
      this._addEventListener()
    }
    // public api
    static get Default () {
      return Default
    }

    // private api
    _addEventListener () {
      var $email = $('input[name="username"]')
      var $pass = $('input[name="pass"]')
      var $student = $('input#student')
      var $recruiter = $('input#recruiter')
      var currole = -1;
      var database = firebase.database()
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var uid = user.uid
          database.ref(`users/${uid}`).orderByChild('role').on('value', (snapshot) => {
            currole = snapshot.child('role').val()
            if (currole == 'student') window.location.assign("/student-main.html")
            else if (currole == 'recruiter') window.location.assign("/recruiter-main.html")
          })
        }
      })
      this.$loginbtn.click((e) => {
        firebase.auth().signInWithEmailAndPassword($email.val(), $pass.val()).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
        });
      })
      this.$signupbtn.click((e) => {
        if ($student[0].checked) currole = "student"
        else if ($recruiter[0].checked) currole = "recruiter"
        firebase.auth().createUserWithEmailAndPassword($email.val(), $pass.val()).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
        }).then((authData) => {
          if(authData) {
            database.ref(`users/${authData.user.uid}`).set({
              username: $email.val(),
              email: $email.val(),
              role: currole
            })
            alert('Sign-up successful')
            if (currole == 'student') window.location.assign("/facial-reg.html")
            else if (currole == 'recruiter') window.location.assign("/recruiter-main.html")
          }
        })
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
          data = new LoginPanel(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    LoginPanel._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = LoginPanel._jQueryInterface
  $.fn[NAME].Constructor = LoginPanel

  return LoginPanel
})($)

export default LoginPanel
