import $ from 'jquery'

const Faq = (($) => {
  const NAME = 'faq'
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

  class Faq {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.clickEvent()
    }

    clickEvent () {
      let $mod = this._element
      this._element.on('click', '.faq-item h4', (e) => {
        let self = $(e.currentTarget)
        let itemSelf = self.parents('.faq-item')
        let faqAnswerSelf = itemSelf.find('.faq-answer')
        let faqItem = $mod.find('.faq-item')
        let faqAnswer = $mod.find('.faq-answer')
        if(itemSelf.hasClass('faq-opened')) {
          itemSelf.removeClass('faq-opened')
          faqAnswerSelf.slideUp()
        } else {
          faqItem.removeClass('faq-opened')
          faqAnswer.slideUp()
          itemSelf.addClass('faq-opened')
          faqAnswerSelf.slideDown()
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
          data = new Faq(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    Faq._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Faq._jQueryInterface
  $.fn[NAME].Constructor = Faq

  return Faq
})($)

export default Faq
