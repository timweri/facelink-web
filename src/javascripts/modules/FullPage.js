import $ from 'jquery'
import 'fullpage.js'

import {
  TweenMax,
  TimelineMax
} from 'gsap'
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
      this.fullPageHome()
      this.setHeightCTA()
      $(window).resize(this.onResizeWindow.bind(this))
    }
    // public api
    static get Default () {
      return Default
    }
    onResizeWindow () {
      this.setHeightCTA()
      this.fullPageHome()
    }

    fullPageHome () {
      let $fullPage = this._element
      let scroll = window.innerWidth - document.documentElement.clientWidth
      let winW = document.documentElement.clientWidth
      let winH = $(window).height()
      let itemLength = this._element.find('.section').length
      let that = this
      function initFullPage () {
        $fullPage.fullpage({
          anchors: ['First', '2nd', '3rd', '4th', '5th', '6th'],
          navigation: true,
          navigationPosition: 'right',
          css3: true,
          scrollingSpeed: 800,
          responsiveHeight: 100,
          dragAndMove: true,
          // lockAnchors: true,
          afterRender: function () {
            for (var i = 0; i < itemLength; i++) {
              $('#fp-nav li').eq(i).find('span').html(i + 1)
            }
          },
          afterLoad: function (anchorLink, index) {
            let Nav = $('#fp-nav')
            switch (index) {
              case 2:
                Nav.removeAttr('class').addClass('blue')
                break
              case 3:
                Nav.removeAttr('class').addClass('red')
                break
              case 4:
                Nav.removeAttr('class').addClass('orange')
                break
              case 5:
                Nav.removeAttr('class').addClass('gray')
                break
              case 6:
                Nav.removeAttr('class').addClass('green')
                break
              default:
                Nav.removeAttr('class')
            }
          },
          onLeave: function (index, nextIndex, direction) {
            if (nextIndex === 6) {
              that.header.addClass('visibility-hide')
            } else {
              that.header.removeClass('visibility-hide')
            }
          }
        })
      }
      function destroyFullPage () {
        $.fn.fullpage.destroy('all')
      }
      if (scroll > 0) {
        if ((winW + scroll) < 992) {
          if ($fullPage.find('.fp-section').length) {
            setTimeout(function () {
              destroyFullPage()
            }, 300)
          }
        } else if ((winW + scroll) >= 992 && winH >= 640) {
          if ($fullPage.find('.fp-section').length) {

          } else {
            initFullPage()
          }
        } else if ((winW + scroll) >= 992 && winH < 640) {
          if ($fullPage.find('.fp-section').length) {
            setTimeout(function () {
              destroyFullPage()
            }, 300)
          }
        }
      } else {
        if (winW < 992) {
          if ($fullPage.find('.fp-section').length) {
            setTimeout(function () {
              destroyFullPage()
            }, 300)
          }
        } else if ((winW + scroll) >= 992 && winH >= 640) {
          if ($fullPage.find('.fp-section').length) {

          } else {
            initFullPage()
          }
        } else if ((winW + scroll) >= 992 && winH < 640) {
          if ($fullPage.find('.fp-section').length) {
            setTimeout(function () {
              destroyFullPage()
            }, 300)
          }
        }
      }
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
          this.cta.css('height', $windowHeight - $FooterHeight)
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
