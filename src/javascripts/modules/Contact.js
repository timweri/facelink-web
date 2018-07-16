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
      $('#btn-contact').on('click submit', function () {
        if ($('#contactForm .contact-form').parsley().isValid()) {
          func.processFormContact(contactForm)
        } else {
          let $groupContact = contactForm.find('.group-contact')
          if ($groupContact.length) {
            contactForm.parsley().on('form:error', function () {
              if (!contactForm.find('.group-contact ul').hasClass('parsley-error')) {
                $groupContact.addClass('parsley-error')
              }
              // $($groupContact).find('.parsley-errors-list').remove()
              console.log('error')
            })
            contactForm.parsley().on('form:success', function () {
              // $groupContact.removeClass('parsley-error')
              console.log('success')
            })
          }
          // if ($('#fullname').val() === '') {
          //   $('#fullname').addClass('error')
          // }
          // if ($('#email').val() === '') {
          //   $('#email').addClass('error')
          // }
          // if ($('#message').val() === '') {
          //   $('#message').addClass('error')
          // }
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
    }

    /*
     * main method contact submit
     */
    processFormContact (object) {
      var isClick = $(object).find('.submit').data('isClick') // do not allow spam
      if (isClick == true) { // eslint-disable-line
        return false
      } else {
        $(object).find('.submit').data('isClick', true)
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
            $(object).find('button[type=submit]').prop('disabled', false)
          },
          error: function () {
            $('html, body').animate({
              scrollTop: $(object).offset().top - 200
            }, 200)
            $(object).html('<div class="message-form">' + $('.response-fail-send').html() + '</div>')
          },
          complete: function (xhr, data) {
            $('html, body').animate({
              scrollTop: $(object).offset().top - 200
            }, 200)
            $(object).html('<div class="message-form">' + $('.response-success-send').html() + '</div>')
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
