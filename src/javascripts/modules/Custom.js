import $ from 'jquery'
const Custom = (() => {
  const editButton = () => {
    var button = $('.btn-custom')
    $.each(button, function (i, o) {
      if ($(o).find('span').length <= 0) {
        var textBtn = $(o).html()
        var dom = '<span>' + textBtn + '</span>' +
            '<span>' + textBtn + '</span>'
        $(o).html(dom)
      }
    })
  }
  editButton()
  $(window).on('load', function () {

  })
})()
export default Custom
