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
    Ecwid.OnCartChanged.add(function(cart){
      setTimeout(function(){
        var pageCategory = $('.ecwid-productBrowser-CategoryPage');
        if(pageCategory.find('.grid-product').length) {
          $modContentEditor.addClass('list-category');
          var listbgProduct = $('.list-bg-product')[0].outerHTML;
          $modContentEditor.append(listbgProduct);
        } else {
          $modContentEditor.find('.list-bg-product').remove()
        }
      }, 1000);
    })
    
  }
  function addModulePromotion() {
    var modPromotion = $('.mod-promotion');
    Ecwid.OnCartChanged.add(function(cart){
      setTimeout(function(){
        if($('.product-details').length && $('.mod-promotion').length) {
          var promotion = $('.mod-promotion')[0].outerHTML;
          $(promotion).insertAfter(".product-details");
        }
      }, 1000);
    });
  }

  function setTitle() {

  }
  Ecwid.OnPageLoad.add(function(page) {
    console.log(page.type)
    setTimeout(function() {
      appendBreadCrumb()
      addListImageProduct()
      setTitle()
      if(page.type == 'PRODUCT') {
        addModulePromotion()
      }
    })

  });
  return {

  }
})()