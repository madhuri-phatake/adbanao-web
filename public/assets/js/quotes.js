$(document).ready(async function () {
  var swiper = new Swiper(".quotes_hero_slider", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    lazy: true,
    autoplay: {
      delay: 3000,
    },
    watchSlidesProgress: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets"
    },
  });
  $(".owl-carousel").owlCarousel({
    center: true,
    items: 5.5,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    loop: true,
    margin: 30,
    dots: false,
    responsiveClass: true,
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 3
      },
      768: {
        items: 5.5,
      },

    }
  });

  //   $(".cate-list").on("click", e => {
  //     e.preventDefault();

  //     $(".cate-list").removeClass("category-active");
  //     $(e.currentTarget).addClass("category-active");
  //   let id_quotes = $(e.currentTarget).attr("data-id");
  //     setTimeout(() => {
  //       if (id_quotes) {
  //         var topGap = 50; 
  //         $("html, body").animate(
  //           {
  //             scrollTop: $("#" + id_quotes).offset().top - topGap
  //           },
  //           100
  //         );
  //       }
  //     }, 100);
  //   });

  // });



  // $(".cate-list").on("click", e => {
  //   e.preventDefault(); 
  //   $(".cate-list").removeClass("category-active");
  //   $(e.currentTarget).addClass("category-active");
  //   let id_quotes = $(e.currentTarget).attr("data-id");
  //   setTimeout(() => {
  //     if (id_quotes) {
  //       var topGap = 50; 
  //       $("html, body").animate(
  //         {
  //           scrollTop: $("#" + id_quotes).offset().top - topGap
  //         },
  //         100
  //       );
  //     }
  //   }, 100);

  // });

  // $(".cate-list").on("click", function (e) {
  //   e.preventDefault();
  //   $(".cate-list").removeClass("category-active");
  //   $(this).addClass("category-active");
  //   let id_quotes = $(this).attr("data-id");

  //   setTimeout(() => {
  //     if (id_quotes) {
  //       // Calculate the index of the clicked category in the list
  //       const index = $(".cate-list").index(this);

  //       // Calculate the start and end index of the items to show
  //       const startIndex = index * 5;
  //       const endIndex = startIndex + 4;

  //       // Hide all items first
  //       $(".main-quotes-content").hide();

  //       // Show the selected items based on the calculated start and end index
  //       $(".main-quotes-content").slice(startIndex, endIndex + 1).show();

  //       // Scroll to the selected category
  //       var topGap = 50;
  //       $("html, body").animate(
  //         {
  //           scrollTop: $("#" + id_quotes).offset().top - topGap
  //         },
  //         100
  //       );
  //     }
  //   }, 100);
  // });

  
})
$(document).ready(function () {
  $("#quote-section-show-1").show();
  $("#quote-section-show-2").hide();
  $("#quote-section-show-3").hide();
  $("#quote-section-show-4").hide();

  // Event handler for .quote-section-1 click
  $(".quote-section-1").on("click", function (e) {
      e.preventDefault();
    $(".cate-list").removeClass("category-active");
      $(e.currentTarget).addClass("category-active");
    let id_quotes = $(e.currentTarget).attr("data-id");
      setTimeout(() => {
        if (id_quotes) {
          var topGap = 50; 
          $("html, body").animate(
            {
              scrollTop: $("#" + id_quotes).offset().top - topGap
            },
            100
          );
        }
      }, 100);
     $("#quote-section-show-1").show();
     $("#quote-section-show-2").hide();
     $("#quote-section-show-3").hide();
     $("#quote-section-show-4").hide();

  });

  // Event handler for .quote-section-2 click
  $(".quote-section-2").on("click", function (e) {
      e.preventDefault();
    $(".cate-list").removeClass("category-active");
      $(e.currentTarget).addClass("category-active");
    let id_quotes = $(e.currentTarget).attr("data-id");
      setTimeout(() => {
        if (id_quotes) {
          var topGap = 50; 
          $("html, body").animate(
            {
              scrollTop: $("#" + id_quotes).offset().top - topGap
            },
            100
          );
        }
      }, 100);
      // Get the target data-id
      $("#quote-section-show-2").show();
     $("#quote-section-show-1").hide();
     $("#quote-section-show-3").hide();
     $("#quote-section-show-4").hide();
  });

  // Event handler for .quote-section-3 click
  $(".quote-section-3").on("click", function (e) {
      e.preventDefault();
      $(".cate-list").removeClass("category-active");
      $(e.currentTarget).addClass("category-active");
    let id_quotes = $(e.currentTarget).attr("data-id");
      setTimeout(() => {
        if (id_quotes) {
          var topGap = 50; 
          $("html, body").animate(
            {
              scrollTop: $("#" + id_quotes).offset().top - topGap
            },
            100
          );
        }
      }, 100);
      // Get the target data-id
      $("#quote-section-show-3").show();
      $("#quote-section-show-1").hide();
      $("#quote-section-show-2").hide();
      $("#quote-section-show-4").hide();
  });

  // Event handler for .quote-section-4 click
  $(".quote-section-4").on("click", function (e) {
      e.preventDefault();
      $(".cate-list").removeClass("category-active");
      $(e.currentTarget).addClass("category-active");
    let id_quotes = $(e.currentTarget).attr("data-id");
      setTimeout(() => {
        if (id_quotes) {
          var topGap = 50; 
          $("html, body").animate(
            {
              scrollTop: $("#" + id_quotes).offset().top - topGap
            },
            100
          );
        }
      }, 100);
      $("#quote-section-show-4").show();
      $("#quote-section-show-1").hide();
      $("#quote-section-show-3").hide();
      $("#quote-section-show-2").hide();
  });
});


