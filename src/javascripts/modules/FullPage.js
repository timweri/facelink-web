import $ from 'jquery'
import 'fullpage.js'

import {
  TweenMax,
  TimelineMax
  // TimelineLite 
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
      this.fullPage = $('#fullpage')
      this.fullPageHome()
    }
    // public api
    static get Default () {
      return Default
    }
    onResizeWindow () {
     
    }
   
    fullPageHome() {
      this.fullPage.fullpage({
        navigation: false,
        css3: true,
        scrollingSpeed: 800,
        responsiveHeight: 330,
        dragAndMove: true,
        lockAnchors: true
      })
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
