import $ from 'jquery'

const SignUp = (($) => {
  const NAME = 'sign-up'
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

  class SignUp {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.validateSignUp()
    }

    validateSignUp () {
      $('.form-cta .contact-form').parsley()
      $('#btn-signup').on('click submit', function () {
        if ($('.form-cta .contact-form').parsley().isValid() === false) {
          console.log('sign up')
          if ($('#email_cta').val() === '') {
            $('#email_cta').addClass('error')
          }
        }
      })

      $('#email_cta').on('keyup keypress', function (e) {
        if ($('.form-cta .contact-form').parsley().isValid() === true) {
          $(this).removeClass('error')
        } else {
          $(this).addClass('error')
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
          data = new SignUp(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    SignUp._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = SignUp._jQueryInterface
  $.fn[NAME].Constructor = SignUp

  return SignUp
})($)

export default SignUp
