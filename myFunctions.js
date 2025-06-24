$(document).ready(function () {
  const scrollSmoothly = true; // Toggle this to false for instant scroll
  const mobileThreshold = 767;
  let curPage = "abt";

  const $toTop = $("#toTop");
  const $buttonGroup = $("#buttonGroup");
  const $creditsMenu = $("#creditsMenu");
  const $sections = $("#edu, #exp, #fol, #skl");
  const mobileBtnH = $buttonGroup.outerHeight() + $creditsMenu.outerHeight();

  // Initial UI setup
  $toTop.hide();
  $sections.hide();
  $("#abt-btn").addClass("staydown");

  // Scroll detection and button group animation
  $(window).on("scroll", function () {
    const isMobile = $(window).width() <= mobileThreshold;
    const scrollTop = $(window).scrollTop();

    if (isMobile) {
      scrollTop > mobileBtnH - 20 ? $toTop.fadeIn("slow") : $toTop.fadeOut("slow");
    } else {
      const marginTop = scrollTop > $buttonGroup.offset().top ? scrollTop + 15 : 0;
      $buttonGroup.stop().animate({ marginTop });
    }
  });

  // Scroll-to-top button
  $toTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  // Button click navigation
  $("#parent").on("click", ".myButton", function (e) {
    e.preventDefault();
    const target = $(this).data("page");

    if ($(this).hasClass("staydown") || !target) return;

    const isMobile = $(window).width() <= mobileThreshold;
    const tmpDelay = isMobile ? 0 : 300;

    if (isMobile) {
      $("html,body").animate({ scrollTop: mobileBtnH }, scrollSmoothly ? "slow" : 0);
    }

    $(".myButton").removeClass("staydown");
    $(this).addClass("staydown");

    if (curPage) $(`#${curPage}`).fadeOut(299);
    curPage = target;
    $(`#${curPage}`).delay(tmpDelay).fadeIn("slow");
    window.location.hash = curPage; // Update URL hash
  });

  // URL hash support
  const hash = window.location.hash.replace("#", "");
  if (hash && $(`#${hash}`).length) {
    $(`#${curPage}`).hide(); // Hide the default section
    curPage = hash;
    $(`#${curPage}`).fadeIn("slow");
    $(`a[data-page="${curPage}"]`).addClass("staydown").siblings().removeClass("staydown");
  }
});
