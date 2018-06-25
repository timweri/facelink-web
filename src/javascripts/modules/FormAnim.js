import $ from 'jquery'

const FormAnimation = (($) => {
  const NAME = 'form-animation'
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

  class FormAnimation {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.$module_items = $(`[data-module="${NAME}"]`)
      this.$form_controls = this.$module_items.find('.form-group').find('.form-control')

      this.$form_controls.focus(this.textFocus)
      this.$form_controls.focusout(this.textFocusOut)
    }

    textFocus () {
      let $this = $(this)
      let $thisLabel = $this.parent().siblings('label')

      $thisLabel.addClass('up')
    }

    textFocusOut () {
      let $this = $(this)
      let $thisLabel = $this.parent().siblings('label')

      if (!$this.val()) {
        $thisLabel.removeClass('up')
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
          data = new FormAnimation(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    FormAnimation._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = FormAnimation._jQueryInterface
  $.fn[NAME].Constructor = FormAnimation

  return FormAnimation
})($)

export default FormAnimation
