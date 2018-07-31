import $ from 'jquery'

const FullPage = (($) => {
  const NAME = 'fullPage'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {}
  const ClassName = {
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }

  class FullPage {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.footer = $('#footer')
      this.header = $('#header')
      this.cta = $('.mod-cta')
      this.setHeightCTA()
      $(window).resize(this.onResizeWindow.bind(this))
      let that = this
      setTimeout(function () {
        that.stickNavigationHome()
      }, 300)
    }
    // public api
    static get Default () {
      return Default
    }
    onResizeWindow () {
      this.setHeightCTA()
    }

    stickNavigationHome () {
      let element = this._element.find(' .section')
      let navigationHomepage = $('.navigation-homepage')
      let offset = []
      element.each(function () {
        offset.push({
          'id': $(this).attr('id'),
          'top': $(this).offset().top
        })
      })
      $(window).scroll(function () {
        let top = $(this).scrollTop()
        let elementActive
        // console.clear()
        // console.log('-------')
        // console.log(top)
        offset.forEach(element => {
          if (element.top <= top + $('#header').outerHeight()) {
            elementActive = element.id
            return true
          }
        })
        if (top + $(window).height() >= $('html').outerHeight() - $('#footer').outerHeight()) {
          elementActive = offset[offset.length - 1].id
        }
        // console.log(elementActive)
        if (navigationHomepage.attr('id') !== elementActive) {
          navigationHomepage.removeAttr('id').find('.active').removeClass('active')
          navigationHomepage.find('[href="#' + elementActive + '"]').parent().addClass('active').parents('.navigation-homepage').attr('id', elementActive)
        }
      })
    }
    setHeightCTA () {
      if (this._element.length) {
        let $windowWidth = $(window).width()
        let $FooterHeight = this.footer.innerHeight()
        let $windowHeight = $(window).height()
        let $headerHeight = this.header.innerHeight()
        if ($windowHeight < 641 || $windowWidth < 992) {
          this.cta.removeAttr('style')
        } else {
          this.cta.css('height', $windowHeight / 2)
        }
      }
    }

    _getConfig (config) {
      config = $.extend({}, Default, config)
      return config
    }
    static _jQueryInterface (config) {
      return this.each(function () {
        const $element = $(this)
        const _config = $.extend({},
          Default,
          $element.data(),
          typeof config === 'object' && config
        )
        let data = $element.data(DATA_KEY)
        if (!data) {
          data = new FullPage(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    FullPage._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = FullPage._jQueryInterface
  $.fn[NAME].Constructor = FullPage

  return FullPage
})($)

export default FullPage
