import $ from 'jquery'
import Blazy from 'blazy'
const UserAgent = (() => {
  const $html = $('html')
  const checkDevice = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $html.addClass('touch')
    } else {
      $html.addClass('no-touch')
    }
  }
  const checkIeVersion = (version) => {
    let val = false
    switch (version) {
      case 7:
        val = /MSIE 7/.test(navigator.userAgent)
        break
      case 8:
        val = /MSIE 8/.test(navigator.userAgent)
        break
      case 9:
        val = /MSIE 9/.test(navigator.userAgent)
        break
      case 10:
        val = /MSIE 10/.test(navigator.userAgent)
        break
      case 11:
        val = /rv:11/.test(navigator.userAgent)
        break
    }
    return val
  }
  const browserDetection = () => {
    let isExplorer = (navigator.userAgent.indexOf('MSIE') || navigator.userAgent.indexOf('rv:15')) > -1
    let isFirefox = navigator.userAgent.indexOf('Firefox') > -1
    let isSafari = navigator.userAgent.indexOf('Safari') > -1
    let isChrome = navigator.userAgent.indexOf('Chrome') > -1
    let isOpera = navigator.userAgent.indexOf('OPR') > -1
    if (isExplorer || document.documentMode) {
      $html.addClass('ie')
    }
    if (isFirefox) {
      $html.addClass('firefox')
    }
    if (isChrome && isSafari && !isOpera) {
      $html.addClass('chrome')
    }
    if (!isChrome && isSafari) {
      $html.addClass('safari')
    }
    if (checkIeVersion(8)) {
      $html.addClass('ie8')
    }
    if (checkIeVersion(9)) {
      $html.addClass('ie9')
    }
    if (checkIeVersion(10)) {
      $html.addClass('ie10')
    }
    if (checkIeVersion(11) || checkIeVersion(12)) {
      $html.addClass('ie11')
    }
    if (/Edge/.test(navigator.userAgent)) {
      $html.addClass('edge')
    }
  }
  const blazyload = () => {
    let bLazy = new Blazy({ // eslint-disable-line
      selector: '[data-src]',
      success: function (element) {
        setTimeout(function () {
          let parent = element.parentNode
          parent.className = parent.className.replace(/\bloading\b/, '')
        }, 200)
      }
    })
  }
  checkDevice()
  browserDetection()
  // selectpicker()
  blazyload()
  $(window).on('load', function () {

  })
})()
export default UserAgent
