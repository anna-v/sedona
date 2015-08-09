(function() {
  // Dropdown navigation script
  var tempScrollTop, currentScrollTop = 0,
      header = $('.header-index'),
      main = $('.main-index'),
      flag = true,
      current, input;

  $(window).scroll(function(){
    currentScrollTop = $(window).scrollTop();

    if($(window).scrollTop() === 0) {
      flag = true;
      header.removeClass('fixed').removeAttr('style');
      main.removeClass('scrolled');
    }

    //Scrolling down and more than 400px:
    if (tempScrollTop < currentScrollTop ) {
      if($(window).scrollTop() >= 400) {
        header.addClass('fixed');
        if (flag) {
          header.animate({'top':'0'}, 400);
          main.addClass('scrolled');
          flag = false;
        }
      }
    }
    tempScrollTop = currentScrollTop;
  });

  // Range slider on hotels page
  $('.range-control').noUiSlider({
    start: [ 0, 3000 ],
    orientation: "horizontal",
    connect: true,
    step: 1,
    range: {
      'min': 0,
      'max': 5000,
    },
    format: wNumb({
      decimals: 0
    })
  });

  $(".range-control").Link('lower').to($('#price-from'));
  $(".range-control").Link('upper').to($('#price-to'));

  // Search form on the main page:
  $('#checkin').prop('readonly', true);
  $('#checkout').prop('readonly', true);

  $('.search-form-minus').on('click',function(event) {
    event.preventDefault();
    current = +$(this).siblings('input').val();
    input = $(this).siblings('input');
    $(input).val(current - 1);

    if (current < 1) {
      $(input).val(current);
    }
  });

  $('.search-form-plus').on('click',function(event) {
    event.preventDefault();
    current = +$(this).siblings('input').val();
    input = $(this).siblings('input');
    $(input).val(current + 1);
  });

  $('.date-input').datepick({
    yearRange: 'c-0:c+5'
  });

  // Disabling empty links
  $('.menu a.disabled').on('click',function(event) {
    event.preventDefault();
    $(this).css('cursor','default');
  });

  // Disabling typing letters in numeric inputs
  $(":input[class='people-number']").keypress(function (e) { // selector by class is used for IE9 support
    //Don't type anything if the key is not digit
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      console.log('not a digit!');
      return false;
    }
    // Allow max 4 digits in input
    if (this.value.length > 3) {
      return false;
    }
  });
})();
