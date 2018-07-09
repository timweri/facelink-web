var Shop = (function(){
  function appendBreadCrumb() {
    if($('.ecwid-Checkout-BreadCrumbs').length) {
      var ItemCrumb = $('.ecwid-Checkout-BreadCrumbs .ecwid-Checkout-BreadCrumbs-link');
      var lengthItemCrumb = ItemCrumb.length
      var html = `<div class="breadCrumb-shop text-center"></div>`;
      $(html).insertBefore( ".ec-size" );
      for(var i = 0; i<lengthItemCrumb; i++) {
        $('.breadCrumb-shop').append('<div class="item-breadCrumb"><p>'+ ItemCrumb.eq(i).html() + '</p></div>');
      }

      var active = $('.ecwid-Checkout-BreadCrumbs-link-current').parents('td').parents('td').index();
      var breadCrumb = $('.breadCrumb-shop')
      breadCrumb.find('.item-breadCrumb').eq(active).addClass('active')
      for (var j = 0; j< active; j++) {
        breadCrumb.find('.item-breadCrumb').eq(j).addClass('done-action')
      }
    }
  }
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
      if($('.product-details').length && $('.mod-promotion').length) {
        var promotion = $('.mod-promotion')[0].outerHTML;
        $(promotion).insertAfter(".ec-footer");
      }
    }, 1000);
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
  
  if ($("#ecwid_html").length) {
    Ecwid.OnPageLoaded.add(function(page) {
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
        console.log(page.type , $title)
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
      
    });
  }
  function changePage(id, name) {
    Ecwid.openPage('category', {'id': id, 'name': '"'+ name +'"', 'page': 1});
  }
  return {
    changePage: changePage
  }
})()