var Shop = (function(){
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
      var productDetail = $('.product-details');
      var relatedProducts = $('.ec-related-products')
      var valHeight = '';
      $('.ec-store .mod-promotion').remove()
      if($(window).width() < 991) {
        valHeight = 40
      } else {
        valHeight = 0
      }
      if(productDetail.length && modPromotion.length && relatedProducts.length) {
        var promotion = $('.mod-promotion')[0].outerHTML;
        var top = relatedProducts.position().top - valHeight;
        var marginTop = modPromotion.innerHeight() + 90;
        relatedProducts.css('padding-top', marginTop);
        $(promotion)
        .insertAfter(".ec-store__content-wrapper")
        .addClass('position')
        .css('top', top)
      }
      if(productDetail.length && modPromotion.length && relatedProducts.length <= 0) {
        var promotion = $('.mod-promotion')[0].outerHTML;
        modPromotion.addClass('d-block')
        // .insertAfter(".ec-store__content-wrapper")
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
  if ($("#ecwid_html").length) {
    Ecwid.OnPageLoad.add(function(page) {
      // console.log(page.type)
      showLoading();
    })
    Ecwid.OnPageLoaded.add(function(page) {
      // console.log(page.type)
      if(page.type == 'PRODUCT') {
        $('body').addClass('page-product');
      } else {
        $('body').removeClass('page-product');
      }
      if(page.type == 'CART' || page.type == 'ORDER_CONFIRMATION') {
        $('body').addClass('page-cart');
      } else {
        $('body').removeClass('page-cart');
      }
      if(page.type == 'CHECKOUT_PAYMENT_DETAILS' || page.type == 'CHECKOUT_PLACE_ORDER') {
        $('body').addClass('page-check-detail');
      } else {
        $('body').removeClass('page-check-detail');
      }
      function addRemoveClass() {
        var $title = $('.page-title__name');
        if (page.type == 'CATEGORY' && $title.length == 0 ) {
          $('body').addClass('page-category')
        } else {
          $('body').removeClass('page-category')
        }
        if (page.type == 'CATEGORY' && $title.length) {
          $('body').addClass('page-category-list')
        } else {
          $('body').removeClass('page-category-list')
        }
      }

      addListImageProduct();
      addModulePromotion();
      setTitle();
      addRemoveClass();
      closeLoading();
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
    closeLoading: closeLoading
  }
})()