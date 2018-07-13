var Shop = (function(){
  var body = $('body')
  var titleProductDetail = 'Briq Supplements';
  var titleCategory = 'Briq Gear';
  function addListImageProduct() {
    var $modContentEditor = $('.mod-content-editor');
    $modContentEditor.removeClass('list-category');
    var pageCategory = $('.ecwid-productBrowser-CategoryPage');
    if(pageCategory.find('.grid-product').length) {
      $modContentEditor.addClass('list-category');
      var listbgProduct = $('.list-bg-product')[0].outerHTML;
      $modContentEditor.append(listbgProduct);
    } else {
      $modContentEditor.find('.list-bg-product').remove()
    }
    
  }
  function addModulePromotion() {
    setTimeout(function() {
      var modPromotion = $('.mod-promotion');
      var modPromotionDouble = $('.mod-promotion.position')
      var productDetail = $('.product-details');
      var relatedProducts = $('.ec-related-products')
      var valHeight = '';
      // $('.ec-store .mod-promotion').remove()
      if($(window).width() < 991) {
        valHeight = 40
      } else {
        valHeight = 0
      }
      if(productDetail.length && modPromotion.length && relatedProducts.length) {
        var promotion = $('.mod-promotion')[0].outerHTML;
        var top = relatedProducts.position().top - valHeight;
        var marginTop;
        if(modPromotionDouble.length) {
          marginTop = modPromotionDouble.innerHeight() + 90;
          // console.log(1)
          modPromotionDouble.css('top', top)
        } else {
          marginTop = modPromotion.innerHeight() + 90;
          relatedProducts.css('padding-top', marginTop);
          $(promotion)
          .insertAfter(".ec-store__content-wrapper")
          .addClass('position')
          .css('top', top)
          // console.log(2)
        }
        // console.log(marginTop)
        
      }
      if(productDetail.length && modPromotion.length && relatedProducts.length <= 0) {
        modPromotion.addClass('d-block')
      } else {
        modPromotion.removeClass('d-block')
      }
    })
    
  }

  function setTitle() {
    var $title = $('.page-title__name');
    var $titleBanner = $('.ecwid-productBrowser-head');
    var modShopHeader = $('.mod-shop-header');
    if($title.length || $titleBanner.length) {
      modShopHeader.remove();
      var txt = $title.html();
      var txtBanner = $titleBanner.html()
      if ((txt != '') && (txt != undefined)) {
        var dom = '<section class="module mod-shop-header">'
        + '<div class="container">'
        +  '<h1>' + txt +'</h1>'
        // +  '<p>(2 items)</p>'
        + '</div>'
        + '</section>';
        $(dom).insertBefore("#ecwid_html .mod-content-editor");
      }
      if (txtBanner != '' && txtBanner != undefined) {
        var dom = '<section class="module mod-shop-header">'
        + '<div class="container">'
        +  '<h1>' + txtBanner +'</h1>'
        // +  '<p>(2 items)</p>'
        + '</div>'
        + '</section>';
        $(dom).insertBefore("#ecwid_html .mod-content-editor");
      }
      
    } else {
      modShopHeader.remove()
    }
  }
  function changePage(id, name) {
    Ecwid.openPage('category', {'id': id, 'name': '"'+ name +'"', 'page': 1});
  }
  function showLoading() {
    var $overLoader = $('.over-loader')
    $overLoader.removeAttr('style')
    $('#main-content').css('opacity', 0);

  }
  function closeLoading() {
    setTimeout(function() {
      var $overLoader = $('.over-loader')
      $overLoader.fadeOut('300', function() {
        $('#main-content').css('opacity', 1);
      })
    }, 500)
  }
  function setLocalStorage() {
    localStorage.setItem("ecwid-product", true);
  }
  if ($("#ecwid_html").length) {
    Ecwid.OnPageLoad.add(function(page) {
      // console.log(page.type)
      showLoading();
    })
    Ecwid.OnPageLoaded.add(function(page) {
      // console.log(page.type)
      if(page.type == 'PRODUCT') {
        body.addClass('page-product');
        if($('.details-gallery--one-image').length <= 0) {
          $('.product-details').addClass('muti-item')
        }
        if(localStorage.getItem("ecwid-product") == "true") {
          location.reload();
          localStorage.removeItem("ecwid-product");
        } else {
          setTimeout(function() {
            var product = $('.grid__products')
            var relatedProduct = $('.ec-related-products__products')
            if(relatedProduct.length) {
              var html = $('.ec-related-products__products')[0].outerHTML
              $('.ec-related-products__products').eq(0).addClass('d-none');
              $('.ec-related-products').append(html)
              setTimeout(function(){
                if(product.length) {
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
            var dom = '<section class="module mod-shop-header">'
            + '<div class="container">'
            +  '<h1>' + titleProductDetail +'</h1>'
            + '</div>'
            + '</section>';
            $(dom).insertBefore("#ecwid_html .mod-content-editor");
          }, 1000)
          closeLoading()
        }
        
      } else {
        body.removeClass('page-product');
        $('.product-details').addClass('muti-item')
        closeLoading()
      }
      if(page.type == 'CART' || page.type == 'ORDER_CONFIRMATION') {
        body.addClass('page-cart');
      } else {
        body.removeClass('page-cart');
      }
      if(page.type == 'CHECKOUT_PAYMENT_DETAILS' || page.type == 'CHECKOUT_PLACE_ORDER') {
        body.addClass('page-check-detail');
      } else {
        body.removeClass('page-check-detail');
      }
      function addRemoveClass() {
        var $title = $('.page-title__name');
        if (page.type == 'CATEGORY' && $title.length == 0 ) {
          body.addClass('page-category')
        } else {
          body.removeClass('page-category')
        }
        if (page.type == 'CATEGORY' && $title.length) {
          body.addClass('page-category-list')
        } else {
          body.removeClass('page-category-list')
        }
      }

      addListImageProduct();
      addModulePromotion();
      setTitle();
      addRemoveClass();
      // closeLoading()
    });
   
  }
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      addModulePromotion()
    }, 250);
  })
  return {
    changePage: changePage,
    showLoading: showLoading,
    closeLoading: closeLoading,
    setLocalStorage: setLocalStorage
  }
})()

Ecwid.OnCartChanged.add(function(cart) {
    var number = cart.productsQuantity;
    if(cart.productsQuantity > 99){
        number = "99+";
    }
    $(".cart-badge b").html(number);

});