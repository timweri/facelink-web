import $ from 'jquery'
// import { TimelineMax, Linear } from 'gsap/TweenMax'
// import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

const HomeAnimation = (() => {
  var elementFrames = {
    'frame1': '.section.section-frame1',
    'frame2': '.section.section-frame2',
    'frame3': '.section.section-frame3',
    'frame4': '.section.section-frame4',
    'frame5': '.section.section-frame5'
  }
  var durationScrollMagics = {
    'frame1': $(elementFrames['frame1']).outerHeight(),
    'frame2': $(elementFrames['frame2']).outerHeight(),
    'frame3': $(elementFrames['frame3']).outerHeight(),
    'frame4': $(elementFrames['frame4']).outerHeight(),
    'frame5': $(elementFrames['frame5']).outerHeight()
  }
  var timelineMaxs = {
    'frame1': [],
    'frame2': [],
    'frame3': [],
    'frame4': [],
    'frame5': []
    // 'key': [
    //   { 'duration': '0', 'timeline': new TimelineMax() }
    // ]
  }
  var isPageHome = $('body').hasClass('page-home')
  var isFullpage = $('body').hasClass('fullpage')
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  })

  const runScrollMagicScene = () => {
    for (var key in elementFrames) {
      var _element = elementFrames[key]
      var _lengthTimelineMaxs = timelineMaxs[key].length
      var _totalDuration = 0

      // console.log(_duration)
      if (_lengthTimelineMaxs == 0) return
      var i = 0
      for (i in timelineMaxs[key]) {
        if (timelineMaxs[key][i]['timeline'] !== undefined) {
          if (i == 0) {
            new ScrollMagic.Scene({
              triggerElement: _element,
              duration: timelineMaxs[key][i]['duration'],
              offset: timelineMaxs[key][i]['offset'] === undefined ? 0 : timelineMaxs[key][i]['offset']
            }).setTween(timelineMaxs[key][i]['timeline']).addTo(controller)
              .on('enter', function (event) {
                // var _triggerElement = $(event.target.triggerElement()).parent()
                // var index = Math.max(0, $('#fullpage > div').index(_triggerElement) - 1)
                // _triggerElement = $('#fullpage > div').eq(index)
                // if (!_triggerElement.hasClass('frame-actived')) {
                //   $('.frame-actived').removeClass('frame-actived').removeClass('last').removeClass('first')
                //   _triggerElement.addClass('frame-actived first')
                // }
                var _triggerElement = $(event.target.triggerElement()).parent()
                if (!_triggerElement.hasClass('frame-actived')) {
                  $('.frame-actived').removeClass('frame-actived').removeClass('end').removeClass('start')
                  _triggerElement.addClass('frame-actived start')
                }
              })
              .on('leave', function (event) {
                $('.frame-actived').removeClass('frame-actived').removeClass('end').removeClass('start')
              })
              .addIndicators({ name: key + 'AnimationStart' + i })
            _totalDuration += timelineMaxs[key][i]['duration']
          } else {
            // console.log('ok')
            new ScrollMagic.Scene({
              triggerElement: _element,
              duration: timelineMaxs[key][i]['duration'],
              offset: timelineMaxs[key][i]['offset'] === undefined ? _totalDuration : _totalDuration + timelineMaxs[key][i]['offset']
            }).setTween(timelineMaxs[key][i]['timeline']).addTo(controller)
              .on('enter', function (event) {
                var _triggerElement = $(event.target.triggerElement()).parent()
                if (!_triggerElement.hasClass('frame-actived')) {
                  $('.frame-actived').removeClass('frame-actived').removeClass('end').removeClass('start')
                  _triggerElement.addClass('frame-actived end')
                }
              })
              .on('leave', function (event) {
                $('.frame-actived').removeClass('frame-actived').removeClass('end').removeClass('start')
              })
              .addIndicators({ name: key + 'AnimationStart' + i })
            _totalDuration += timelineMaxs[key][i]['duration']
          }
        }
      }

      var spaceduration = timelineMaxs[key][i]['spaceduration'] === undefined ? 0 : timelineMaxs[key][i]['spaceduration']

      new ScrollMagic.Scene({
        triggerElement: _element,
        duration: _totalDuration + spaceduration
      }).setPin(_element).addTo(controller)
        .addIndicators({ name: key + 'AnimationStart' })
    }
  }

  const frame1Timeline = () => {
    var key = 'frame1'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    var containerFrame1 = frame + ' .container-frame1'
    var imgProductionFrame1 = frame + ' .img-production-frame1'
    var imageFrame1 = frame + ' .image-frame1'
    // custom css

    // create timeline animation
    new TimelineMax()
      .from(containerFrame1, 1, { bottom: '-100%', ease: Back.easeOut.config(1) })
      .from(imgProductionFrame1, 1, { bottom: '-100%', ease: Back.easeOut.config(1) }, 0.2)

    timelineMaxs[key].push({
      'duration': duration,
      'spaceduration': -1 * duration,
      'timeline': new TimelineMax()
        .to(containerFrame1, 10, { bottom: '100%', ease: Power1.easeOut })
        .to(imgProductionFrame1, 10, { bottom: '100%', ease: Power1.easeOut }, 0)
        .to(imageFrame1, 10, { y: '-100px', ease: Power1.easeOut }, 0)
        .to(frame, 0, { position: 'relative' })
    })
  }

  const frame2Timeline = () => {
    var key = 'frame2'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    var subheadFrame2 = frame + ' .subhead-frame2'
    var animationFrame2 = frame + ' .animation-frame2'
    var contFrame2 = frame + ' .cont-frame2'
    // custom css
    $(frame).css('background-position', '0 80px')

    // create timeline animation
    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .from(animationFrame2, 13, { left: '100%', ease: Power1.easeOut })
        .from(contFrame2, 13, { x: '500px', opacity: '0', ease: Back.easeOut.config(1) }, 0)
        .from(subheadFrame2, 10, { top: '70%', opacity: '0', ease: Back.easeOut.config(1) }, 3)
    })

    timelineMaxs[key].push({
      'duration': duration / 2,
      'timeline': new TimelineMax()
        .to(subheadFrame2, 10, { top: '-20px', ease: Power1.easeOut })
        .to(animationFrame2, 13, { left: '100%', ease: Power1.easeOut }, 3)
        .to(contFrame2, 13, { x: '500px', opacity: '0', ease: Power1.easeOut }, 3)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'spaceduration': -1 * duration,
      'timeline': new TimelineMax()
        .to(frame, 10, { backgroundPosition: '0 -100px', ease: Power1.easeOut }, 0)
        .to(frame, 10, { top: '80px', ease: Power1.easeOut }, 0)
    })
  }

  const frame3Timeline = () => {
    var key = 'frame3'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    var bgOrange = frame + ' .bg-orange'
    var subheadFrame3 = frame + ' .subhead-frame3'
    var descriptionIframe3 = frame + ' .description-iframe3'
    var bgImageFrame3 = frame + ' .bg-image-frame3'

    // custom css
    $(bgImageFrame3).css('background-attachment', 'fixed')
    $(bgImageFrame3).css('background-position', 'center 0')

    // create timeline animation
    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .from(bgOrange, 10, { right: '-100%', ease: Power1.easeOut })
        .from(subheadFrame3, 10, { left: '45%', opacity: '0', ease: Back.easeOut.config(1) }, 5)
        .from(descriptionIframe3, 10, { bottom: '0', opacity: '0', ease: Back.easeOut.config(1) }, 5)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .to(subheadFrame3, 10, { left: '45%', opacity: '0', ease: Power1.easeOut }, 0)
        .to(descriptionIframe3, 10, { bottom: '0', opacity: '0', ease: Power1.easeOut }, 0)
        .to(bgOrange, 10, { right: '-100%', ease: Power1.easeOut }, 5)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'spaceduration': -1 * duration,
      'timeline': new TimelineMax()
        .to(bgImageFrame3, 10, { backgroundPosition: 'center -100px', ease: Power1.easeOut }, 0)
    })
    // timelineMaxs[key].push({
    //   'spaceduration': -1 * (duration / 2) - 100
    // })
  }

  const frame4Timeline = () => {
    var key = 'frame4'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    var contFrame4 = frame + ' .cont-frame4'
    var imageProductFrame4 = frame + ' .col-image-product-frame4'
    var bgOrange = frame + ' .rotate-image'
    var fruitFrame4 = frame + ' .fruit-frame4'

    // custom css

    // create timeline animation
    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .from(bgOrange, 7, { left: '100%', ease: Power1.easeOut })
        .from(contFrame4, 6, { top: '100%', ease: Back.easeOut.config(1) }, 2)
        .from(imageProductFrame4, 6, { top: '100vh', ease: Power1.easeOut }, 2)
        .from(fruitFrame4, 4, { top: '100%', ease: Back.easeOut.config(1) }, 3)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .to(fruitFrame4, 10, { top: '-10%', ease: Power1.easeOut })
        .to(imageProductFrame4, 10, { top: '-10%', ease: Power1.easeOut }, 0)
        .to(contFrame4, 10, { top: '-10%', ease: Power1.easeOut }, 0)
        .to(bgOrange, 10, { left: '100%', ease: Power1.easeOut }, 0)
    })

    timelineMaxs[key].push({
      'spaceduration': -1 * (duration)
    })
  }

  const scrollSpeed = (scrollTime, scrollDistance) => {
    var $window = $(window),
      isScroll = 0,
      finalScroll = 0

    $window.on('mousewheel DOMMouseScroll', function (event) {
      if (isScroll === 1) { event.preventDefault(); return }
      isScroll = 1

      var heso = 4,
        delta

      if (event.originalEvent.wheelDelta !== undefined) {
        delta = event.originalEvent.wheelDelta / (heso * 30) || -event.originalEvent.detail / 3
      } else {
        delta = (-1 * event.originalEvent.deltaY) / heso || -event.originalEvent.detail / 3
      }

      var el = $('.scrollmagic-pin-spacer')
      var index = el.index($('.frame-actived'))
      if (index === -1) { isScroll = 0; return }
      var isStart = el.hasClass('start')
      var isEnd = el.hasClass('end')
      finalScroll = Math.round(finalScroll)
      if (delta > 0) {
        if (isEnd && finalScroll !== Math.round($(window).scrollTop())) { delta = 0 } else delta = 1
      } else if (delta < 0) {
        if (isStart && index > 0) { delta = 0 } else { delta = -1 }
      }
      var nextIndex = Math.max(0, index - delta)
      var _ease = Sine.easeInOut
      if (nextIndex >= 0 && nextIndex < el.length) {
        finalScroll = el.eq(nextIndex).offset().top === 0 ? 0 : el.eq(nextIndex).offset().top + $(window).height()
        if (finalScroll === 0 && $(window).scrollTop() === 0) { isScroll = 0; return }

        TweenMax.to($window, scrollTime, {
          scrollTo: { y: finalScroll, autoKill: false },
          ease: _ease,
          overwrite: 5,
          onComplete: function () {
            isScroll = 0
          }
        })
        event.preventDefault()
      } else {
        isScroll = 0
      }
    })
  }

  const navigationHome = () => {
    $('.navigation-homepage').on('click', 'a', function (e) {
      var _el = $(e.target)
      var _elTarget = $(_el.attr('href'))
      var isAnimation = _elTarget.parents('.scrollmagic-pin-spacer').length !== 0
      var offsetTop = isAnimation ? _elTarget.parents('.scrollmagic-pin-spacer').offset().top : _elTarget.offset().top
      var $window = $(window)
      $(document).scrollTop(offsetTop)
      if (isAnimation && offsetTop > 0) {
        TweenMax.to($window, 1, {
          scrollTo: { y: offsetTop + $window.height(), autoKill: false },
          ease: Sine.easeInOut,
          overwrite: 5
        })
      }
      // console.log()
      e.preventDefault()
    })
  }
  $(window).on('beforeunload', function () {
    controller.scrollTo(0)
  })
  $(document).ready(function () {
    $('.over-loader').addClass('loader-hidden')
    if (isPageHome && isFullpage && $(window).width() >= 992) {
      scrollSpeed(1.5, 250)
      frame1Timeline()
      frame2Timeline()
      frame3Timeline()
      frame4Timeline()
      runScrollMagicScene()
      navigationHome()
    }
  })
})()
export default HomeAnimation
