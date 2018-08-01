import $ from 'jquery'

const Login = (($) => {
	const NAME = 'login'
	const DATA_KEY = `bs.${NAME}`
	const EVENT_KEY = `.${DATA_KEY}`
	const DATA_API_KEY = '.data-api'
	const Event = {
		LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
		CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
	}
	const Default = {
	}
	const ClassName = { // eslint-disable-line
	}
	const Selector = {
		DATA_MODULE: `[data-module="${NAME}"]`
	}

	class Login {
		constructor(element, config) {
			this._element = $(element)
			this._config = this._getConfig(config)
			this.logoutEvent();
			// this.validateLogin()
		}

		logoutEvent() {
			// console.log('load event click');
			$('.btn-signout').click(function(){
				// console.log('event click');
				var localStoragePrefix = 'PSecwid__' + Ecwid.getOwnerId() + 'PS';
				var isLoggedIn = (localStorage.getItem(localStoragePrefix + 'token') != null);
				if (isLoggedIn) {
					var itemsToRemove = ['token', 'customerid', 'profile'];
					for (var i = 0; i < itemsToRemove.length; i++) {
						localStorage.removeItem(localStoragePrefix + itemsToRemove[i]);
					}
					window.location.reload(true);
				}
			});
		}

		// validateLogin() {
		// 	console.log('valid');
			
		// 	var func = this;
		// 	var forgotForm = $('.mod-forgot form');
		// 	var inputErr = $('.um-form-field');
		// 	forgotForm.submit(function (event) {
		// 		var value = forgotForm.find('input[type="text"]').val();
		// 		if (value) {
		// 		} else {
		// 			$('.um-form-field').addClass('um-error');
		// 			event.preventDefault();
		// 		}

		// 	});
		// 	inputErr.focus(function () {
		// 		if (inputErr.hasClass('um-error')) {
		// 			inputErr.removeClass('um-error');
		// 			console.log('clear');
		// 		}
		// 	});
		// 	console.log('func', func);
			
		// }
    
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
					data = new Login(this, _config)
					$element.data(DATA_KEY, data)
				}
			})
		}
	}

  /**
   * Data Api implement
   */
	$(window).on(Event.LOAD_DATA_API, () => {
		// console.log('dddd func');
		Login._jQueryInterface.call($(Selector.DATA_MODULE))
	})

  /**
   * jQuery
   */
	$.fn[NAME] = Login._jQueryInterface
	$.fn[NAME].Constructor = Login

	return Login
})($)

export default Login



// var Login = (function() {
// 	init()
// 	function init () {
// 		console.log('ddd');
// 		$('.mod-login .mask').click(function () {
// 			console.log('d');
// 				if ($('.mod-login').hasClass('active')) {
// 						$('.mod-login').removeClass('active');
// 				} else {

// 				}
// 		})
// 		$('.btn-signin').click(function () {
// 			console.log('as');
// 				$('.mod-login').addClass('active');
// 		});
// 	}
// 	return {
// 		init: init
// 	}
// })();

// export default Login
