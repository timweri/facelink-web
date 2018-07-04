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
    var category = $('.grid-category')
    var product = $('.grid-product');
    if(category.length) {
      var num = Math.round((category.length + product.length )/4);
      var list = '';
      for(var i = 0; i< num; i++) {
        list += `<div class="item-bg-product" style="background-image: url(http://localhost:3000/briq-dev/wp-content/themes/Briq/images/img-section-category.jpg)"></div>`
      }
      var dom = '<div class="list-bg-product">' + list +'</div>';
      $('.ecwid_html .mod-content-editor').append(dom)
    }
  }
  function addModulePromotion() {
    var modPromotion = $('.mod-promotion');
    Ecwid.OnCartChanged.add(function(cart){
      // console.log('change', $('.product-details'));
      setTimeout(function(){
        if($('.product-details').length && $('.mod-promotion').length) {
          var promotion = $('.mod-promotion')[0].outerHTML;
          $(promotion).insertAfter(".product-details");
          console.log(cart)
        }
      }, 1000);
    });
  }
  Ecwid.OnPageLoad.add(function(page) {
    console.log(page.type)
    setTimeout(function() {
      appendBreadCrumb()
      addListImageProduct()
      if(page.type == 'PRODUCT') {
        addModulePromotion()
      }
    })

  });
  return {

  }
})()