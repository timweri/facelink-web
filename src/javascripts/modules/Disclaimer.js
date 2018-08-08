import $ from 'jquery'

const Disclaimer = (($) => {
  const NAME = 'disclaimer'
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

  class Disclaimer {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.closeButton = this._element.find('.disclaimer-btn-wrap')
      this._addEventListener()
      if (!this.cookie) {
        this.showDisclaimer()
        this.closeDisclaimer()
      } 
    }

    showDisclaimer () {
      $('body').addClass('disclaimer-show')
    }

    closeDisclaimer () {
      this._element.on('click', '.disclaimer-btn-wrap', function (e) {
        $('body').removeClass('disclaimer-show')
      })
    }

    // public api
    static get Default () {
      return Default
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
          data = new Disclaimer(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    Disclaimer._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Disclaimer._jQueryInterface
  $.fn[NAME].Constructor = Disclaimer

  return Disclaimer
})($)

export default Disclaimer
