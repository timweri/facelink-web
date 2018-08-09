var Shop = (function () {
  var body = $('body')
  var titleProductDetail = 'Briq Supplements'
  var titleCategory = 'Briq Gear'
  function addListImageProduct () {
    var $modContentEditor = $('.mod-content-editor')
    $modContentEditor.removeClass('list-category')
    var pageCategory = $('.ecwid-productBrowser-CategoryPage')
    if (pageCategory.find('.grid-product').length) {
      $modContentEditor.addClass('list-category')
      var listbgProduct = $('.list-bg-product')[0].outerHTML
      $modContentEditor.append(listbgProduct)
    } else {
      $modContentEditor.find('.list-bg-product').remove()
    }
  }
  function moveProductSubheadingUp () {
    setTimeout(function () {
      var $subheading = $('span.details-product-attribute__title')
      if ($subheading) {
        if ($subheading.text() === 'Subheading: ') {
          var content = $('span.details-product-attribute__value').text()
          var $producttitle = $('h1.product-details__product-title')
          $subheading.parent().hide()
          $(`<br><span class="product-details__product-subheading">${content}</span>`).appendTo($producttitle)
        }
      }
    })
  }
  function addModulePromotion () {
    setTimeout(function () {
      var modPromotion = $('.mod-promotion')
      var modPromotionDouble = $('.mod-promotion.position')
      var productDetail = $('.product-details')
      var relatedProducts = $('.ec-related-products')
      var valHeight = ''
      // $('.ec-store .mod-promotion').remove()
      if ($(window).width() < 991) {
        valHeight = 40
      } else {
        valHeight = 0
      }
      if (productDetail.length && modPromotion.length && relatedProducts.length) {
        var promotion = $('.mod-promotion')[0].outerHTML
        var top = relatedProducts.position().top - valHeight
        var marginTop
        if (modPromotionDouble.length) {
          marginTop = modPromotionDouble.innerHeight() + 90
          modPromotionDouble.css('top', top)
          relatedProducts.css('padding-top', marginTop)
        } else {
          marginTop = modPromotion.innerHeight() + 90
          relatedProducts.css('padding-top', marginTop)
          $(promotion)
          .insertAfter('.ec-store__content-wrapper')
          .addClass('position')
          .css('top', top)
        }
        // console.log(marginTop)
      }
      if (productDetail.length && modPromotion.length && relatedProducts.length <= 0) {
        modPromotion.addClass('d-block')
      } else {
        modPromotion.removeClass('d-block')
      }
    })
  }

  // function setTitle() {
  //   var $title = $('.page-title__name')
  //   var $titleBanner = $('.ecwid-productBrowser-head')
  //   var modShopHeader = $('.mod-shop-header')
  //   if ($title.length || $titleBanner.length) {
  //     modShopHeader.remove()
  //     var txt = $title.html()
  //     var txtBanner = $titleBanner.html()
  //     if ((txt != '') && (txt != undefined)) {
  //       var dom = '<section class="module mod-shop-header">'
  //       + '<div class="container">'
  //       +  '<h1>' + txt +'</h1>'
  //       // +  '<p>(2 items)</p>'
  //       + '</div>'
  //       + '</section>'
  //       $(dom).insertBefore("#ecwid_html .mod-content-editor")
  //     }
  //     if (txtBanner != '' && txtBanner != undefined) {
  //       var dom = '<section class="module mod-shop-header">'
  //       + '<div class="container">'
  //       +  '<h1>' + txtBanner +'</h1>'
  //       // +  '<p>(2 items)</p>'
  //       + '</div>'
  //       + '</section>'
  //       $(dom).insertBefore("#ecwid_html .mod-content-editor")
  //     }
  //   } else {
  //     modShopHeader.remove()
  //   }
  // }

  function setTitle () {
    var modShopHeader = $('.mod-shop-header')
    var $titleBanner = $('.ecwid-productBrowser-head')
    var $title = $('.page-title__name')
    var path = window.location.pathname ? window.location.pathname.trim().split('/') : false

    if( path.length > 0) {
      var isShop = path[1] === 'shop' ? true : false
      var isSuplement = path[2].split('-')[0] === '320Z' ? true : false
      if (isShop && !isSuplement) {
        modShopHeader.remove()
        titleProductDetail = 'Briq Gear'

        $('.product-details').removeClass('muti-item')
        if ($title.length) {
          var txt = $title.html()
          if ((txt !== '') && (txt !== undefined)) {
            var dom = '<section class="module mod-shop-header">' + '<div class="container">' + '<h1>' + txt + '</h1>' + '</div>' + '</section>'
            $(dom).insertBefore('#ecwid_html .mod-content-editor')
          }
        }

        if ($titleBanner.length) {
          // console.log('titleBanner')
          var txtBanner = $titleBanner.html()
          if (txtBanner !== '' && txtBanner !== undefined) {
            var dom = '<section class="module mod-shop-header">' + '<div class="container">' + '<h1>' + txtBanner + '</h1>' + '</div>' + '</section>'
            $(dom).insertBefore('#ecwid_html .mod-content-editor')
          }
        }
      } else {
        $('.product-details').addClass('muti-item')
        modShopHeader.remove()
      }
    }
  }

  function changePage (id, name) {
    Ecwid.openPage('category', {'id': id, 'name': '"' + name + '"', 'page': 1})
  }
  function showLoading () {
    var $overLoader = $('.over-loader')
    $overLoader.removeAttr('style')
    $('#main-content').css('opacity', 0)
  }
  function closeLoading () {
    window.scrollTo(0, 0);
    setTimeout(function () {
      var $overLoader = $('.over-loader')
      $overLoader.fadeOut('300', function () {
        $('#main-content').css('opacity', 1)
      })
    }, 500)
  }
  function setLocalStorage () {
    localStorage.setItem('ecwid-product', true)
  }
  function focusInputShop () {
    $('body').on('blur','.gwt-TextBox', function (e) {
      var self = $(this)
      if (self.val().length > 0) {
        $('.ecwid-fieldEnvelope-error').find('.ecwid-fieldEnvelope-label').css('display', 'none');
        self.parents('.ecwid-fieldWrapper').removeClass('ecwid-fieldEnvelope-error');
        self.parents('table.ecwid-fieldEnvelope-error').removeClass('ecwid-fieldEnvelope-error');

        self.parents('.ecwid-fieldWrapper').addClass('has-text')
      } else {
        self.parents('.ecwid-fieldWrapper').addClass('ecwid-fieldEnvelope-error');

        self.parents('.ecwid-fieldWrapper').removeClass('has-text')
      }
    })
  }
  function checkInputHasVal () {
    var lengthInput = $('.gwt-TextBox').length
    var select = $('.gwt-ListBox')
    for (var i = 0; i < lengthInput; i++) {
      if ($('.gwt-TextBox').eq(i).val().length > 0) {
        $('.gwt-TextBox').eq(i).parents('.ecwid-fieldWrapper').addClass('has-text')
      } else {
        $('.gwt-TextBox').eq(i).parents('.ecwid-fieldWrapper').removeClass('has-text')
      }
    }
    select.find("option:selected" ).each(function() {
      if($(this).index() > 0) {
        $(this).parents('.ecwid-fieldWrapper').addClass('has-text')
      } else {
        $(this).parents('.ecwid-fieldWrapper').removeClass('has-text')
      }
    });
  }
  function checkInputThenShowPop() {
    $('body').on('click','.ecwid-AddressBook-addButton, .ecwid-btn--change', function (e) {
      setTimeout(function() {
        if ($('.ecwid-popup-content').length) {
          checkInputHasVal()
        }
      })
    })
  }
  function customiseDropDown () {
    var $selectBoxes = $('select.gwt-ListBox')
    $selectBoxes.selectpicker({
      style: 'ecwid-bootstrap-select',
      size: 16,
      mobile: true
    })
  }

  if ($('#ecwid_html').length) {
    Ecwid.OnPageLoad.add(function (page) {
      showLoading()
    })
    Ecwid.OnPageLoaded.add(function (page) {
      if (page.type === 'SIGN_IN') {
        $signinBox = $('.signin__email')
        $signinField = $signinBox.find('.form-control__text')
        $signinField.change(function () {
            if ($signinField.val() === '') {
              $signinBox.removeClass('has-text')

            } else {
              $signinBox.addClass('has-text')
            }
        })
        if ($signinField.val() !== '') {
          $signinBox.addClass('has-text')
        }
      }

      if (page.type === 'CHECKOUT_SHIPPING_ADDRESS' || page.type === 'CHECKOUT_PAYMENT_DETAILS') {
        $('#select-Country-Box').change(function () {
          if ($('#select-Country-Box').val() === '') {
            $('.ecwid-AddressForm-country-line').removeClass('has-text')
          } else {
            $('.ecwid-AddressForm-country-line').addClass('has-text')
          }
          if ($('.ecwid-AddressForm-state-line input, .ecwid-AddressForm-state-line select').val() !== '') {
            $('.ecwid-AddressForm-state-line').addClass('has-text')
          } else {
            $('.ecwid-AddressForm-state-line').removeClass('has-text')
          }
        })

        $('#select-State-Box').change(function () {
          if ($('.ecwid-AddressForm-state-line input, .ecwid-AddressForm-state-line select').val() === '') {
            $('.ecwid-AddressForm-state-line').removeClass('has-text')
          } else {
            $('.ecwid-AddressForm-state-line').addClass('has-text')
          }
        })
        if ($('#select-Country-Box').val() !== '') {
          $('.ecwid-AddressForm-country-line').addClass('has-text')
        }
        if ($('.ecwid-AddressForm-state-line input, .ecwid-AddressForm-state-line select').val() !== '') {
          $('.ecwid-AddressForm-state-line').addClass('has-text')
        }
      }

      if (page.type === 'PRODUCT') {
        body.addClass('page-product')
        $('.mod-insta-link').hide()
        if (localStorage.getItem('ecwid-product') === 'true') {
          location.reload()
          localStorage.removeItem('ecwid-product')
        } else {
          setTimeout(function () {
            var product = $('.grid__products')
            var relatedProduct = $('.ec-related-products__products')
            if (relatedProduct.length) {
              var html = $('.ec-related-products__products')[0].outerHTML
              $('.ec-related-products__products').eq(0).addClass('d-none')
              $('.ec-related-products').append(html)
              setTimeout(function () {
                if (product.length) {
                  $('.ec-related-products__products').eq(1).find('.grid__products').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    prevArrow: '<button type="button" class="slick-prev slick-arrow"><span class="icomoon icon-chevron-left"></span></button>',
                    nextArrow: '<button type="button" class="slick-next slick-arrow"><span class="icomoon icon-chevron-right"></span></button>',
                    responsive: [
                      {
                        breakpoint: 768,
                        settings: {
                          slidesToShow: 2
                        }
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          slidesToShow: 1
                        }
                      }
                    ]
                  })
                }
              })
            }
            var dom = '<section class="module mod-shop-header">' +
             '<div class="container">' +
             '<h1 class="title-detail">' + titleProductDetail + '</h1>' +
             '</div>' +
             '</section>'
            $(dom).insertBefore('#ecwid_html .mod-content-editor')
          }, 1000)
          closeLoading()
        }
      } else {
        body.removeClass('page-product')
        closeLoading()
      }
      if (page.type === 'CART') {
        $(document).on('change', '.ecwid-productBrowser-cart-chooseLocationPopup select.gwt-ListBox, .ecwid-productBrowser-cart-chooseLocationPopup input.gwt-TextBox', function () {
          var $this = $(this)
          var $label = $this.parents('table').siblings('label.ecwid-fieldLabel')
          if ($this.val() === '') {
            $label.removeClass('has-text')
          } else {
            $label.addClass('has-text')
          }
        })
        $(document).on('DOMNodeInserted', '.ecwid-productBrowser-cart-chooseLocationPopup', function () {
          $(this).find('input.gwt-TextBox, select.gwt-ListBox').each(function (index, ele) {
            var $ele = $(ele)
            var $label = $ele.parents('table').siblings('label.ecwid-fieldLabel')
            if ($ele.val() !== '') {
              $label.addClass('has-text')
            }
          })
        })
      }
      if (page.type === 'CART' || page.type === 'ORDER_CONFIRMATION') {
        body.addClass('page-cart')
      } else {
        body.removeClass('page-cart')
      }
      if (page.type === 'CHECKOUT_PAYMENT_DETAILS' || page.type === 'CHECKOUT_PLACE_ORDER') {
        body.addClass('page-check-detail')
      } else {
        body.removeClass('page-check-detail')
      }
      function addRemoveClass () {
        var $title = $('.page-title__name')
        if (page.type === 'CATEGORY' && $title.length === 0) {
          body.addClass('page-category')
          $('.mod-insta-link').hide()
        } else {
          body.removeClass('page-category')
        }
        if (page.type === 'CATEGORY' && $title.length) {
          body.addClass('page-category-list')
        } else {
          body.removeClass('page-category-list')
        }
      }

      addListImageProduct()
      addModulePromotion()
      moveProductSubheadingUp()
      setTitle()
      addRemoveClass()
      focusInputShop()
      checkInputHasVal()
      checkInputThenShowPop()
      // customiseDropDown()
      // closeLoading()
    })
    Ecwid.OnSetProfile.add(function (customer) {
      // console.log(typeof customer != 'undefined');
      if (typeof customer != 'undefined' && customer != null) {
        // console.log('customer exist');
        if (typeof customer.billingPerson.name != 'undefined' && customer.billingPerson.name != null) {
          $('.link-customer-name').text('welcome ' + customer.billingPerson.name);
          var nameLogin = $('.link-customer-name')
          var length = nameLogin.html().length
          if(length >= 20) {
            nameLogin.addClass('text-long')
          }
        }
        $('.no-login').removeClass('show');
        $('.has-login').removeClass('hide')

        $('.no-login').addClass('hide');
        $('.has-login').addClass('show');
      } else {
        // console.log('customer no exist');
        $('.no-login').removeClass('hide');
        $('.has-login').removeClass('show')

        $('.no-login').addClass('show');
        $('.has-login').addClass('hide')
      }
    });

  }
  var resizeTimer
  $(window).on('resize', function () {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(function () {
      addModulePromotion()
    }, 250)
  })
  return {
    changePage: changePage,
    showLoading: showLoading,
    closeLoading: closeLoading,
    setLocalStorage: setLocalStorage
  }
})()

Ecwid.OnCartChanged.add(function (cart) {
  var number = cart.productsQuantity
  if (cart.productsQuantity > 99) {
    number = '99+'
  }
  $('.cart-badge b').html(number)
})
