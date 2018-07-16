import $ from 'jquery'

const Contact = (($) => {
  const NAME = 'contact'
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

  class Contact {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.validateContact()
    }

    validateContact () {
      $('.contact-form').parsley()
      $('#btn-contact').on('click submit', function () {
        if ($('.contact-form').parsley().isValid() === false) {
          if ($('#fullname').val() === '') {
            $('#fullname').addClass('error')
          }
          if ($('#email').val() === '') {
            $('#email').addClass('error')
          }
          if ($('#message').val() === '') {
            $('#message').addClass('error')
          }
          console.log('1111')
          if ($('#email_cta').val() === '') {
            $('#email_cta').addClass('error')
          }
        }
      })

      $('#fullname').on('keyup keypress', function (e) {
        if ($(this).next().children().length === 0) {
          $(this).removeClass('error')
        } else {
          $(this).addClass('error')
        }
      })
      $('#email').on('keyup keypress', function (e) {
        if ($(this).next().children().length === 0) {
          $(this).removeClass('error')
        } else {
          $(this).addClass('error')
        }
      })
      $('#message').on('keyup keypress', function (e) {
        if ($(this).next().children().length === 0) {
          $(this).removeClass('error')
        } else {
          $(this).addClass('error')
        }
      })

      $('#email_cta').on('keyup keypress', function (e) {
        if ($('.contact-form').parsley().isValid() === true) {
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
          data = new Contact(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    Contact._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Contact._jQueryInterface
  $.fn[NAME].Constructor = Contact

  return Contact
})($)

export default Contact
