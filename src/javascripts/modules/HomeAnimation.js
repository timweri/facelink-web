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
            }).setTween(timelineMaxs[key][i]['timeline']).addTo(controller)
            // .addIndicators({ name: key + 'AnimationStart' + i })
            _totalDuration += timelineMaxs[key][i]['duration']
          } else {
            // console.log('ok')
            new ScrollMagic.Scene({
              triggerElement: _element,
              duration: timelineMaxs[key][i]['duration'],
              offset: timelineMaxs[key][i]['offset'] === undefined ? _totalDuration : _totalDuration + timelineMaxs[key][i]['offset']
            }).setTween(timelineMaxs[key][i]['timeline']).addTo(controller)
            // .addIndicators({ name: key + 'AnimationStart' + i })
            _totalDuration += timelineMaxs[key][i]['duration']
          }
        }
      }

      var spaceduration = timelineMaxs[key][i]['spaceduration'] === undefined ? 0 : timelineMaxs[key][i]['spaceduration']

      new ScrollMagic.Scene({
        triggerElement: _element,
        duration: _totalDuration + spaceduration
      }).setPin(_element).addTo(controller)
      // .addIndicators({ name: key + 'AnimationStart' })
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
      .from(imgProductionFrame1, 1, { bottom: '-100%', ease: Back.easeOut.config(1) }, 0)

    timelineMaxs[key].push({
      'duration': duration,
      'spaceduration': -1 * duration,
      'timeline': new TimelineMax()
        .to(containerFrame1, 10, { opacity: '0', bottom: '100%', ease: Linear.easeNone })
        .to(imgProductionFrame1, 10, { opacity: '0', bottom: '100%', ease: Linear.easeNone }, 0)
        .to(imageFrame1, 10, { y: '-100px', ease: Linear.easeNone }, 0)
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
    $(frame).css('background-position', '0 80px')

    // create timeline animation
    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .from(animationFrame2, 5, { left: '100%', ease: Linear.easeNone })
        .from(contFrame2, 10, { left: '45%', opacity: '0', ease: Power4.easeOut }, 2)
        .from(subheadFrame2, 8, { top: '70%', opacity: '0', ease: Power4.easeOut }, 3)
        .addPause(20)
    })

    timelineMaxs[key].push({
      'duration': duration / 2,
      'timeline': new TimelineMax()
        .to(animationFrame2, 10, { left: '100%', ease: Linear.easeNone })
        .to(contFrame2, 7, { left: '45%', opacity: '0', ease: Linear.easeNone }, 0)
        .to(subheadFrame2, 8, { top: '-20px', ease: Linear.easeNone }, 1)
        .to(frame, 10, { backgroundPosition: '0 40px', ease: Linear.easeNone }, 0)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'spaceduration': -1 * duration,
      'timeline': new TimelineMax()
        .to(frame, 10, { backgroundPosition: '0 -100px', ease: Linear.easeNone }, 0)
        .to(frame, 10, { top: '80px', ease: Linear.easeNone }, 0)
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

    // create timeline animation
    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .from(bgOrange, 5, { right: '-100%', ease: Linear.easeNone })
        .from(subheadFrame3, 7, { left: '45%', opacity: '0', ease: Linear.easeNone }, 0)
        .from(descriptionIframe3, 4, { bottom: '0', opacity: '0', ease: Linear.easeNone }, 4)
        .addPause(10)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .to(descriptionIframe3, 2, { bottom: '0', opacity: '0', ease: Linear.easeNone }, 0)
        .to(subheadFrame3, 7, { left: '45%', opacity: '0', ease: Linear.easeNone }, 0)
        .to(bgOrange, 7, { right: '-100%', delay: '0.3', ease: Linear.easeNone }, 0)
        .to(bgImageFrame3, 10, { backgroundPosition: 'center -60px', ease: Linear.easeNone }, 2)
    })

    // timelineMaxs[key].push({
    //   'duration': duration,
    //   'spaceduration': -1 * (duration / 2) - duration
    // })

    timelineMaxs[key].push({
      'spaceduration': -1 * (duration / 2) - 300
    })
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
      'offset': -1 * (duration / 1.5),
      'duration': duration,
      'timeline': new TimelineMax()
        .from(bgOrange, 7, { left: '100%', ease: Linear.easeNone })
        .from(contFrame4, 6, { y: '250px', ease: Linear.easeNone }, 2)
        .from(imageProductFrame4, 6, { top: '100vh', delay: '2', ease: Linear.easeNone }, 2)
        .from(fruitFrame4, 6, { top: '100%', ease: Back.easeOut.config(2) }, 4)
        .addPause(10)
    })

    timelineMaxs[key].push({
      'duration': duration,
      'timeline': new TimelineMax()
        .to(fruitFrame4, 10, { y: '-500px', ease: Linear.easeNone })
        .to(imageProductFrame4, 10, { top: '-10%', delay: '2', ease: Linear.easeNone }, 0)
        .to(contFrame4, 10, { top: '-10%', ease: Linear.easeNone }, 0)
        .to(bgOrange, 10, { left: '100%', ease: Linear.easeNone }, 0)
    })

    timelineMaxs[key].push({
      'spaceduration': -1 * (duration / 2)
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
      'spaceduration': -1 * (duration - 300)
    })
  }

  $(document).ready(function () {
    $('.over-loader').addClass('loader-hidden')
    if (isPageHome && $(window).width() >= 992) {
      setTimeout(function () {
        $('body, html').animate({
          scrollTop: 0
        }, 0)
      }, 100)
      jQuery.scrollSpeed(300, 800)
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
