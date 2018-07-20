// import $ from 'jquery'
// const Login = (($) => {
//     const NAME = 'Login'
//     const DATA_KEY = `bs.${NAME}`
//     const EVENT_KEY = `.${DATA_KEY}`
//     const DATA_API_KEY = '.data-api'
//     const Event = {
//         LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
//         CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
//     }
//     const Default = {
//         scrollT: 0
//     }
//     const Selector = {
//         DATA_MODULE: `[data-module="${NAME}"]`
//     }

//     class Login {
//         constructor(element, config) {
//             this._element = $(element)
//             this._config = this._getConfig(config)
//             this.initLogin()
//         }
//         // public api
//         static get Default() {
//             return Default
//         }

//         initLogin() {
//             console.log('init login ');
//             $('.mod-login .mask').click(function () {
// 								console.log('submit');
//                 if ($('.mod-login').hasClass('active')) {
//                     $('.mod-login').removeClass('active');
//                 } else {

//                 }
//             })
//             $('.btn-signin').click(function () {
// 							console.log('submit');
//                 $('.mod-login').addClass('active');
//             });
//         }

//         showLogin () {
//             console.log('init login ');
//             $('.mod-login').addClass('active');
//         }

//         _getConfig(config) {
//             config = $.extend({}, Default, config)
//             return config
//         }
//         static _jQueryInterface(config) {
//             return this.each(function () {
//                 const $element = $(this)
//                 const _config = $.extend(
//                     {},
//                     Default,
//                     $element.data(),
//                     typeof config === 'object' && config
//                 )
//                 let data = $element.data(DATA_KEY)
//                 if (!data) {
//                     data = new Login(this, _config)
//                     $element.data(DATA_KEY, data)
//                 }
//             })
//         }
//     }

//     /**
//      * Data Api implement
//      */
//     $(window).on(Event.LOAD_DATA_API, () => {
//         Login._jQueryInterface.call($(Selector.DATA_MODULE))
//     })

//     /**
//      * jQuery
//      */
//     $.fn[NAME] = Login._jQueryInterface
//     $.fn[NAME].Constructor = Login

//     return Login
// })($)


var Login = (function() {
	init()
	function init () {
		console.log('ddd');
		$('.mod-login .mask').click(function () {
			console.log('d');
				if ($('.mod-login').hasClass('active')) {
						$('.mod-login').removeClass('active');
				} else {

				}
		})
		$('.btn-signin').click(function () {
			console.log('as');
				$('.mod-login').addClass('active');
		});
	}
	return {
		init: init
	}
})();

export default Login
