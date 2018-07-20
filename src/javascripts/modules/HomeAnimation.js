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
            }).setTween(timelineMaxs[key][i]['timeline']).addTo(controller).addIndicators({ name: key + 'AnimationStart' + i })
            _totalDuration += timelineMaxs[key][i]['duration']
          } else {
            // console.log('ok')
            new ScrollMagic.Scene({
              triggerElement: _element,
              duration: timelineMaxs[key][i]['duration'],
              offset: timelineMaxs[key][i]['offset'] === undefined ? _totalDuration : _totalDuration + timelineMaxs[key][i]['offset']
            }).setTween(timelineMaxs[key][i]['timeline']).addTo(controller).addIndicators({ name: key + 'AnimationStart' + i })
            _totalDuration += timelineMaxs[key][i]['duration']
          }
        }
      }

      var spaceduration = timelineMaxs[key][i]['spaceduration'] === undefined ? 0 : timelineMaxs[key][i]['spaceduration']

      new ScrollMagic.Scene({
        triggerElement: _element,
        duration: _totalDuration + spaceduration
      }).setPin(_element).addTo(controller).addIndicators({ name: key + 'AnimationStart' })
    }
  }

  const frame1Timeline = () => {
    var key = 'frame1'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    var containerFrame1 = frame + ' .container-frame1'
    var imgProductionFrame1 = frame + ' .img-production-frame1'
    // custom css

    // create timeline animation
    new TimelineMax()
      .from(containerFrame1, 1, { bottom: '-100%', ease: Back.easeOut.config(1), force3D: true })
      .from(imgProductionFrame1, 1, { bottom: '-100%', ease: Back.easeOut.config(1), force3D: true }, 0)

    timelineMaxs[key].push({
      'duration': duration,
      'spaceduration': -1 * duration,
      'timeline': new TimelineMax()
        .to(containerFrame1, 5, { opacity: '0', bottom: '100%' })
        .to(imgProductionFrame1, 5, { opacity: '0', bottom: '100%' }, 0)
        .to(frame, 0, { position: 'relative' })
    })
  }

  // const frame2Timeline = () => {
  //   var key = 'frame2'
  //   var frame = elementFrames[key]
  //   var timeline = timelineMaxs[key]
  //   // custom css

  //   // create timeline animation
  //   timeline['0']
  //     .addPause(1)
  // }

  const frame2Timeline = () => {
    var key = 'frame2'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    var subheadFrame2 = frame + ' .subhead-frame2'
    var animationFrame2 = frame + ' .animation-frame2'
    var contFrame2 = frame + ' .cont-frame2'
    // custom css

    // create timeline animation
    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .from(animationFrame2, 0.5, { left: '100%' })
        .from(contFrame2, 0.7, { left: '45%', opacity: '0', ease: Back.easeOut.config(1) }, 0)
        .from(subheadFrame2, 0.5, { top: '100%', ease: Back.easeOut.config(1) })
        .addPause(2)
    })

    timelineMaxs[key].push({
      'duration': duration / 2,
      'timeline': new TimelineMax()
        .to(animationFrame2, 1, { left: '100%' })
        .to(contFrame2, 0.7, { left: '45%', opacity: '0' }, 0)
        .to(subheadFrame2, 0.5, { top: '-20%', delay: '0.1' }, 0)
    })

    timelineMaxs[key].push({
      'duration': 0,
      'timeline': new TimelineMax()
    })
  }

  const frame3Timeline = () => {
    var key = 'frame3'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    var bgOrange = frame + ' .bg-orange'
    var subheadFrame3 = frame + ' .subhead-frame3'
    var descriptionIframe3 = frame + ' .description-iframe3'

    // custom css
    $(frame + ' .bg-image-frame3').css('background-attachment', 'fixed')

    // create timeline animation
    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .from(bgOrange, 0.5, { right: '-100%' })
        .from(subheadFrame3, 0.7, { left: '45%', opacity: '0' }, 0)
        .from(descriptionIframe3, 0.2, { bottom: '0', opacity: '0', delay: '0.6' }, 0)
        .addPause(1)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .to(descriptionIframe3, 0.2, { bottom: '0', opacity: '0' }, 0)
        .to(subheadFrame3, 0.7, { left: '45%', opacity: '0' }, 0)
        .to(bgOrange, 0.7, { right: '-100%', delay: '0.3' }, 0)
    })

    timelineMaxs[key].push({
      'spaceduration': -1 * (duration / 2)
    })
  }

  const frame4Timeline = () => {
    var key = 'frame4'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    var contFrame4 = frame + ' .cont-frame4'
    var imageProductFrame4 = frame + ' .col-image-product-frame4'
    var bgOrange = frame + ' .bg-orange'
    var fruitFrame4 = frame + ' .fruit-frame4'

    // custom css

    // create timeline animation
    timelineMaxs[key].push({
      'offset': -1 * (duration / 2),
      'duration': duration,
      'timeline': new TimelineMax()
        .from(bgOrange, 0.8, { left: '100%' })
        .from(contFrame4, 0.3, { top: '100%' }, 0.3)
        .from(imageProductFrame4, 0.3, { top: '100vh', delay: '0.2' }, 0.3)
        .from(fruitFrame4, 0.3, { top: '100%', ease: Back.easeOut.config(2) }, 0.7)
        .addPause(1)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .to(fruitFrame4, 0.5, { top: '-100%' })
        .to(imageProductFrame4, 0.6, { top: '-100vh', delay: '0.2' }, 0)
        .to(contFrame4, 1, { top: '-100%' }, 0)
        .to(bgOrange, 1, { left: '100%' }, 0)
    })

    timelineMaxs[key].push({
      'spaceduration': -1 * (duration - 300)
    })
  }

  const frame5Timeline = () => {
    var key = 'frame5'
    var frame = elementFrames[key]
    var duration = durationScrollMagics[key]
    // var contFrame4 = frame + ' .cont-frame4'
    // var imageProductFrame4 = frame + ' .col-image-product-frame4'
    // var bgOrange = frame + ' .bg-orange'
    // var fruitFrame4 = frame + ' .fruit-frame4'

    // // custom css
    // $(frame + ' .bg-image-frame3').css('background-attachment', 'fixed')

    // create timeline animation
    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
    })
  }

  $(document).ready(function () {
    $('body, html').animate({
      scrollTop: 0
    }, 0)
    if (isPageHome && $(window).width() >= 992) {
      frame1Timeline()
      frame2Timeline()
      frame3Timeline()
      frame4Timeline()
      // frame5Timeline()
      runScrollMagicScene()
    }
  })
})()
export default HomeAnimation
