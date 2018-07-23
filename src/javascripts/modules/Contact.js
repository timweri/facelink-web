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
      var func = this
      var contactForm = $('#contactForm .contact-form')
      contactForm.parsley()
      contactForm.append('<div class="wait-loading-app-green"></div>')
      console.log('contact')
      $('#btn-contact').on('click', function (e) {
        if (contactForm.parsley().isValid()) {
          func.processFormContact(contactForm, e)
          return true
        } else {
          let formGroup = contactForm.find('.group-contact')
          if (formGroup.length) {
            contactForm.parsley().on('form:error', function () {
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
    processFormContact (object, e) {
      var isClick = false
      if (isClick == true) { // eslint-disable-line
        return false
      } else {
        isClick = true
        e.preventDefault()
        $(object).find('.wait-loading-app-green').hide()
        $(object).find('.wait-loading-app-green').show()
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
            $(object).find('.wait-loading-app-green').hide()
            $(object).find('button[type=submit]').prop('disabled', false)
            isClick = false
          },
          error: function () {
            $('html, body').animate({
              scrollTop: $(object).offset().top - 200
            }, 200)
            $(object).html('<div class="message-form">' + $('#contactForm .response-fail-send').html() + '</div>')
            isClick = false
          },
          complete: function (xhr, data) {
            $('html, body').animate({
              scrollTop: $(object).offset().top - 200
            }, 200)
            $(object).html('<div class="message-form">' + $('#contactForm .response-success-send').html() + '</div>')
            isClick = false
          }
        })
        return false
      }
      return false // eslint-disable-line
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
