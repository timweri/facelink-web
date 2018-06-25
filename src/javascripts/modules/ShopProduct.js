import $ from 'jquery'

const ShopProduct = (($) => {
  const NAME = 'shop-product'
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

  class ShopProduct {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this._addEventListener()
      this._element.css('height', 'auto')
    }
    // public api
    static get Default () {
      return Default
    }

    // private api
    _addEventListener () {
      let $this = this._element
      $this.css('height', $this.height())
      $(window).resize(() => {
        $this.css('height', 'auto')
        $this.css('height', $this.height())
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
          data = new ShopProduct(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    ShopProduct._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = ShopProduct._jQueryInterface
  $.fn[NAME].Constructor = ShopProduct

  return ShopProduct
})($)

export default ShopProduct
