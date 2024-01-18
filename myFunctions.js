$(document).ready(function () {
  var mobileBtnH = document.getElementById('buttonGroup').offsetHeight + document.getElementById('creditsMenu').offsetHeight + 20;//$(window).height();


  // Hide toTop at page load
  $("#toTop").css("display","none");
  //$("#abt").css("display","none");
  $("#edu").css("display","none");
  $("#exp").css("display","none");
  $("#fol").css("display","none");
  $("#skl").css("display","none");

  $("#abt-btn").toggleClass('staydown');

  // Check to see if the window is top if not then display button
	$(window).scroll(function(){

    // if mobile
    if($(window).width() <= 767) {
  		if ($(window).scrollTop() > mobileBtnH-20) {
  			$("#toTop").fadeIn("slow");
  		} else {
  			$("#toTop").fadeOut("slow");
  		}
    } // if desktop
    else {
      if($(window).scrollTop() > $("#buttonGroup").offset().top) {
        $("#buttonGroup").stop().animate({
          marginTop: $(window).scrollTop() /*- $("#buttonGroup").offset().top*/ + 15
        });
      }
      else {
        $("#buttonGroup").stop().animate({marginTop: 0});
      }
    }
	});

	// Click event to scroll to top
	$("#toTop").click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

  // switch between divisions
  var curPage="abt";

  $("#parent").on('click', '.myButton', function() {

    var tmpdelay = 0;

    // activate current button, deactivate others
    if($(window).width() > 767) {
      tmpdelay = 300;
    }
    else
    {
      $('html,body').animate({scrollTop: mobileBtnH }, 'slow');
    }


    if(!$(this).hasClass('staydown'))
    {
      // toggle current button and untoggle others
      $(this).toggleClass('staydown').siblings().removeClass('staydown');

      // fade in current page, fade out others
      if(curPage.length){
        $("#"+curPage).fadeOut(299);
      }
      curPage=$(this).data("page");
      $("#"+curPage).delay(tmpdelay).fadeIn("slow");
    }

  });


});
