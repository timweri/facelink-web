import $ from 'jquery'

const Signup = (($) => {
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

  class Signup {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.validateContact()
    }

    validateContact () {
      var func = this
      var signupForm = $('.mod-cta .contact-form')
      signupForm.parsley()
      signupForm.append('<div class="wait-loading-app"></div>')
      $('#btn-signup').on('click', function () {
        if (signupForm.parsley().isValid()) {
          func.processFormContact(signupForm)
        } else {
          let formGroup = signupForm.find('.group-contact')
          if (formGroup.length) {
            signupForm.parsley().on('form:error', function () {
              formGroup.each(function (index, item) {
                if (!$(item).hasClass('parsley-error')) {
                  $(this).addClass('parsley-error')
                }
                $(item).find('.parsley-errors-list').remove()
              })
            })
          }
        }
      })
    }
    /*
     * main method contact submit
     */
    processFormContact (object) {
      var isClick = false
      if (isClick == true) { // eslint-disable-line
        return false
      } else {
        isClick = true
        console.log('object', object)
        $(object).find('.wait-loading-app').hide()
        $(object).find('.wait-loading-app').show()
        var dataString = jQuery(object).serialize().replace(/\%5B/g, '[').replace(/\%5D/g, ']') // eslint-disable-line
        $.ajax({
          type: 'POST',
          url: $(object).attr('action'),
          dataType: 'json',
          data: dataString,
          beforeSend: function () {
            $(object).find('button[type=submit]').prop('disabled', true)
          },
          success: function (data) {
            $(object).find('.wait-loading-app').hide()
            $(object).find('button[type=submit]').prop('disabled', false)
            isClick = false
            console.log('data success', data)
          },
          error: function (data) {
            console.log('error', data)
            $('html, body').animate({
              scrollTop: $(object).offset().top - 200
            }, 200)
            // $(object).html('<div class="message-form">' + $('.form-cta .response-fail-send').html() + '</div>')
          },
          complete: function (xhr, data) {
            $('html, body').animate({
              scrollTop: $(object).offset().top - 200
            }, 200)
            console.log('data complete', data)
            // $(object).html('<div class="message-form">' + $('.form-cta .response-success-send').html() + '</div>')
          }
        })
        return false
      }
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
          data = new Signup(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    Signup._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Signup._jQueryInterface
  $.fn[NAME].Constructor = Signup

  return Signup
})($)

export default Signup
