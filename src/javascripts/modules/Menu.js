import $ from 'jquery'

const Menu = (($) => {
  const NAME = 'menu'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
    elementItem: '.hamburger-menu, html, #main-menu, #header',
    navItemArrows: '.nav-item-arrows'
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }

  class Menu {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.header = $('#header, #main-menu-mobile')
      this.html = $('html')
      this.openMainMenu()
      this.closeWhenClickOutside()
      this.scrollShadow()
    }
    // public api
    static get Default () {
      return Default
    }

    scrollShadow () {
      $('.menu-wrap-inner').scroll((e) => {
        let $ele = $(e.currentTarget)
        if ($ele.scrollTop() > 20) $ele.addClass('shadow-top')
        else $ele.removeClass('shadow-top')
      })
    }

    closeWhenClickOutside () {
      let $container = $('#main-menu')
      let $closeButton = $container.siblings('.hamburger-menu')
      this.html.mouseup((e) => {
        // if the target of the click isn't the container nor a descendant of the container
        if (!$closeButton.is(e.target) && $closeButton.has(e.target).length === 0 && !$container.is(e.target) && $container.has(e.target).length === 0) {
          if ($container.hasClass('is-open-menu')) {
            $(this._config.elementItem).removeClass('is-open-menu')
          }
        }
      })
    }

    openMainMenu () {
      this.header.on('click', '.hamburger-menu', (e) => {
        e.stopPropagation()
        const ele = e.currentTarget
        if ($(ele).hasClass('is-open-menu')) {
          $(this._config.elementItem).removeClass('is-open-menu')
        } else {
          $(this._config.elementItem).addClass('is-open-menu')
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
          data = new Menu(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    Menu._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Menu._jQueryInterface
  $.fn[NAME].Constructor = Menu

  return Menu
})($)

export default Menu
