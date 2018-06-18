import $ from 'jquery'

const TabBenefits = (($) => {
  const NAME = 'tab-benefits'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
    elementItem: '.tab-item'
  }
  const ClassName = { // eslint-disable-line
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }

  class TabBenefits {
    constructor(element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.$tabs = $('.mod-tab-benefits .tab-item')
      this.$desktopHeaders = $('.mod-tab-benefits .col-left h2')
      this.$tabs.eq(0).addClass('is-open-tab').children('.tab-content').css('display', 'block')
      this.$desktopHeaders.eq(0).addClass('is-open-tab')
      this.openTabMobile()
      this.openTabDesktop()
      this.resetOnResize()
    }

    resetOnResize () {
      let $desktopHeaders = this.$desktopHeaders,
          $firstHeader = $desktopHeaders.eq(0),
          $firstTabItem= this.$tabs.eq(0);
      $(window).resize(() => {
        if ($desktopHeaders.is(':visible') && $firstHeader.hasClass('is-open-tab')) {
          $firstTabItem.children('.tab-content').css('display', 'block');
        }
      });
    }

    openTabDesktop() {
      let $content_tabs = this.$tabs;
      this.$desktopHeaders.click((e) => {
        const $ele = $(e.currentTarget),
          ele_index = $ele.index();
        if (!$ele.hasClass('is-open-tab')) {
          $ele.siblings().removeClass('is-open-tab');
          $content_tabs.not(`:nth-child(${ele_index + 1})`).removeClass('is-open-tab').children('.tab-content').hide();
          $ele.addClass('is-open-tab');
          $content_tabs.eq(ele_index).addClass('is-open-tab').children('.tab-content').fadeIn();
        }
      });
    }

    openTabMobile() {
      let $desktopHeaders = this.$desktopHeaders;
      this.$tabs.on('click', 'h2', (e) => {
        const $ele = $(e.currentTarget),
          $parent = $ele.parent('.tab-item'),
          $content = $ele.siblings('.tab-content'),
          $other_parents = $parent.siblings('.tab-item'),
          $other_content = $other_parents.children('.tab-content');
        if ($parent.hasClass('is-open-tab')) {
          $content.slideUp(() => {
            $parent.removeClass('is-open-tab');
          })
          $desktopHeaders.eq($parent.index()).removeClass('is-open-tab');
          $desktopHeaders.eq(0).addClass('is-open-tab');
        }
        else {
          $other_content.slideUp(() => {
            $other_parents.removeClass('is-open-tab');
          })
          $parent.addClass('is-open-tab');
          $content.slideDown();
          $desktopHeaders.removeClass('is-open-tab');
          $desktopHeaders.eq($parent.index()).addClass('is-open-tab');
        }
      })
    }

    _getConfig(config) {
      config = $.extend({}, Default, config)
      return config
    }
    static _jQueryInterface(config) {
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
          data = new TabBenefits(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    TabBenefits._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = TabBenefits._jQueryInterface
  $.fn[NAME].Constructor = TabBenefits

  return TabBenefits
})($)

export default TabBenefits
