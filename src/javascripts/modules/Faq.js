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
      var $faq_items = $(`[data-module="${NAME}"] .faq-item`)
      $.each($faq_items, (index, parent) => {
        this.clickEvent($faq_items, $(parent))
      })
    }

    clickEvent ($faq_items, $parent) {
      let $child_h4 = $parent.children('h4'),
          $child_content = $parent.children('.faq-answer');
      $child_h4.click(() => {
        if ($parent.hasClass('faq-opened')) {
          $child_content.slideUp(() => {
            $parent.removeClass('faq-opened').addClass('faq-closed');
          });
        }
        else {
          $.map($faq_items, (value, index) => {
            let $value = $(value);
            if ($value.hasClass('faq-opened')) {
              $value.children('.faq-answer').slideUp(() => {
                $value.removeClass('faq-opened').addClass('faq-closed');
              });
            }
          });
          $parent.removeClass('faq-closed').addClass('faq-opened');
          $child_content.slideDown();
        }
      });
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
