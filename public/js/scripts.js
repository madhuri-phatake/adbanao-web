/*================
 Template Name: AppBeats App Landing Page Template
 Description: AppBeats is app and product landing page template.
 Version: 1.0
 Author: https://themeforest.net/user/themetags
=======================*/

// TABLE OF CONTENTS
// 1. preloader
// 2. fixed navbar
// 3. closes the responsive menu on menu item click
// 4. back to top
// 5. magnify popup video
// 6. magnify gallery popup
// 7. client-testimonial one item carousel
// 8. client logo item carousel
// 9. wow js
// 10. Screenshots slider
// 11. countdown or coming soon
// 12.Media and awards part

jQuery(function ($) {
  "use strict";

  // 1. preloader
  $(window).ready(function () {
      $("#preloader").delay(200).fadeOut("fade");
  });

  // 2. fixed navbar
  $(window).on("scroll", function () {
      // checks if window is scrolled more than 500px, adds/removes solid class
      if ($(this).scrollTop() > 58) {
          $(".navbar").addClass("affix");
          $(".scroll-to-target").addClass("open");
      } else {
          $(".navbar").removeClass("affix");
          $(".scroll-to-target").removeClass("open");
      }
  });

  // 2. page scrolling feature - requires jQuery Easing plugin
  if (window.location.hash) scroll(0, 0);
  // takes care of some browsers issue
  setTimeout(function () {
      scroll(0, 0);
  }, 1);
  $(function () {
      $(document).on("click", "a.page-scroll", function (event) {
          var $anchor = $(this);
          $("html, body")
              .stop()
              .animate(
                  {
                      scrollTop: $($anchor.attr("href")).offset().top - 58,
                  },
                  900,
                  "easeInOutExpo"
              );
          event.preventDefault();
      });
  });

  // 3. closes the responsive menu on menu item click
  $(window).ready(function () {
      $(".navbar-toggler").addClass("collapsed");
      $(".navbar-collapse").addClass("collapse");
  });

  $(".navbar-nav li a").on("click", function (event) {
      if (!($(this).parent().hasClass("dropdown") || $(this).parent().parent().hasClass("sub-menu"))) {
          $(".navbar-collapse").collapse("hide");
      }
  });

  // 4. back to top
  if ($(".scroll-to-target").length) {
      $(".scroll-to-target").on("click", function () {
          var target = $(this).attr("data-target");
          // animate
          $("html, body").animate(
              {
                  scrollTop: $(target).offset().top,
              },
              500
          );
      });
  }

  // 5. magnify popup video
  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
  });

  // 6. magnify gallery popup
  $(".popup-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-img-mobile",
      gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
      image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function (item) {
              return item.el.attr("title") + "<small>by Marsel Van Oosten</small>";
          },
      },
  });

  // 7. client-testimonial one item carousel
  $(".client-testimonial").owlCarousel({
      // loop: true,
      margin: 30,
      nav: false,
      dots: false,
      responsiveClass: true,
      autoplay: true,
      autoplayHoverPause: true,
      lazyLoad: true,
      responsive: {
          0: {
              items: 1,
          },
          500: {
              items: 1,
          },
          600: {
              items: 2,
          },
          800: {
              items: 2,
          },
          1200: {
              items: 3,
          },
      },
  });

  $(".testimonials-carousel").owlCarousel({
      loop: true,
      margin: 20,
      responsiveClass: true,
      // nav:true,
      autoplay: false,
      dotsEach: true,
      dots: true,
      navText: ['<i class="fa fa-arrow-circle-left testimonial-angle-left" aria-hidden="true"></i>', '<i class="fa fa-arrow-circle-right testimonial-angle-right" aria-hidden="true"></i>'],
      responsive: {
          0: {
              items: 1,
          },
          500: {
              items: 1,
          },
          600: {
              items: 2,
          },
          800: {
              items: 3,
          },
          1200: {
              items: 3,
          },
      },
  });

  $(".testimonials-carousel-new").owlCarousel({
      loop: true,
      margin: 0,
      // nav: true,
      dots: true,
      responsiveClass: true,
      autoplay: true,
      lazyLoad: true,
      navText: ['<i class="fa fa-chevron-left testimonial-new-angle-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right testimonial-new-angle-right" aria-hidden="true"></i>'],
      responsive: {
          0: {
              dotsEach: 1,
              items: 1,
              margin: 10,
          },
          500: {
              dotsEach: 1,
              items: 1,
              margin: 10,
          },
          600: {
              dotsEach: 1,
              items: 1,
              margin: 10,
          },
          700: {
              dotsEach: 1,
              items: 2,
              margin: 10,
          },
          800: {
              dotsEach: 1,
              items: 2,
              margin: 10,
          },
          1200: {
              dotsEach: 1,
              items: 3,
              margin: 10,
          },
      },
  });

  // Pricing Carousel
  $(".pricing-owl-carousel").owlCarousel({
      loop: true,
      margin: 5,
      // stagePadding:30,
      responsiveClass: true,
      // nav:true,
      // autoplay: true,
      // autoplayTimeout: 6000,
      dots: false,
      navText: ['<i class="fa fa-arrow-circle-left pricing-angle-left" aria-hidden="true"></i>', '<i class="fa fa-arrow-circle-right pricing-angle-right" aria-hidden="true"></i>'],
      responsive: {
          0: {
              items: 1,
              margin: 2,
          },
          500: {
              items: 1,
              margin: 2,
          },
          600: {
              items: 2,
          },
          800: {
              items: 2,
          },
          1000: {
              items: 3,
          },
          1200: {
              items: 4,
          },
      },
  });

  // 8. client logo item carousel
  $(".clients-carousel").owlCarousel({
      autoplay: false,
      loop: true,
      responsiveClass: true,
      margin: 15,
      dots: false,
      slideTransition: "linear",
      autoplayTimeout: 4500,
      autoplayHoverPause: true,
      autoplaySpeed: 4500,
      responsive: {
          0: {
              items: 2,
          },
          500: {
              items: 3,
          },
          600: {
              items: 4,
          },
          800: {
              items: 5,
          },
          1200: {
              items: 6,
          },
      },
  });

  $(".clients-carousel-1").owlCarousel({
      autoplay: true,
      loop: true,
      rtl: true,
      margin: 15,
      dots: false,
      responsiveClass: true,
      slideTransition: "linear",
      autoplayTimeout: 4500,
      autoplayHoverPause: true,
      autoplaySpeed: 4500,
      responsive: {
          0: {
              items: 2,
          },
          500: {
              items: 3,
          },
          600: {
              items: 4,
          },
          800: {
              items: 5,
          },
          1200: {
              items: 6,
          },
      },
  });

  $(".clients-carousel-2").owlCarousel({
      autoplay: true,
      loop: true,
      responsiveClass: true,
      margin: 15,
      dots: false,
      slideTransition: "linear",
      autoplayTimeout: 4500,
      autoplayHoverPause: true,
      autoplaySpeed: 4500,
      responsive: {
          0: {
              items: 2,
          },
          500: {
              items: 3,
          },
          600: {
              items: 4,
          },
          800: {
              items: 5,
          },
          1200: {
              items: 6,
          },
      },
  });

  // 9. wow js
  function wowAnimation() {
      new WOW({
          offset: 100,
          mobile: true,
      }).init();
  }

  wowAnimation();

  // 11. countdown or coming soon

  $("#clock").countdown("2022/01/30", function (event) {
      $(this).html(
          event.strftime(
              "" +
                  '<div class="row">' +
                  '<div class="col">' +
                  '<h2 class="mb-1">%-D</h2>' +
                  "<h5>Day%!d</h5>" +
                  "</div>" +
                  '<div class="col">' +
                  '<h2 class="mb-1">%H</h2>' +
                  "<h5>Hours</h5>" +
                  "</div>" +
                  '<div class="col">' +
                  '<h2 class="mb-1">%M</h2>' +
                  "<h5>Minutes</h5>" +
                  "</div>" +
                  '<div class="col">' +
                  '<h2 class="mb-1">%S</h2>' +
                  "<h5>Seconds</h5>" +
                  "</div>" +
                  "</div>"
          )
      );
  });

  // Subscription
  if ($("#getQuoteFrm").length) {
      $("#getQuoteFrm")
          .validator()
          .on("submit", function (event) {
              if (event.isDefaultPrevented()) {
                  // handle the invalid form...
                  submitMSG(false);
              } else {
                  // everything looks good!
                  event.preventDefault();
                  submitGetQuoteForm();
              }
          });
  }

  function submitGetQuoteForm() {
      // Initiate Variables With Form Content
      var name = $('#getQuoteFrm input[name="name"]').val();
      var email = $('#getQuoteFrm input[name="email"]').val();
      var subject = $('#getQuoteFrm input[name="subject"]').val();
      var message = $('#getQuoteFrm textarea[name="message"]').val();

      if (!$("#getQuoteFrm #exampleCheck1").is(":checked")) {
          submitMSG(false, ".sign-up-form-wrap");
          return;
      }

      // $.ajax({
      //     type: "POST",
      //     url: "libs/quote-form-process.php",
      //     data: "name=" + name + "&email=" + email + "&subject=" + subject + "&message=" + message,
      //     success : function(text){
      //         if (text == "success"){
      //             quoteFormSuccess();
      //         } else {
      //             submitMSG(false, '.sign-up-form-wrap');
      //         }
      //     }
      // });
  }

  function quoteFormSuccess() {
      $("#getQuoteFrm")[0].reset();
      submitMSG(true, ".sign-up-form-wrap");
  }

  // contact form
  if ($("#contactForm").length) {
      $("#contactForm")
          .validator()
          .on("submit", function (event) {
              if (event.isDefaultPrevented()) {
                  // handle the invalid form...
                  submitMSG(false, ".contact-us");
              } else {
                  // everything looks good!
                  event.preventDefault();
                  submitContactForm();
              }
          });
  }

  function submitContactForm() {
      // Initiate Variables With Form Content
      var name = $("#contactForm #name").val();
      var email = $("#contactForm #email").val();
      var phone = $("#contactForm #phone").val();
      var company = $("#contactForm #company").val();
      var message = $("#contactForm #message").val();

      // $.ajax({
      //     type: "POST",
      //     url: "libs/contact-form-process.php",
      //     data: "name=" + name + "&email=" + email + "&phone=" + phone + "&company=" + company + "&message=" + message,
      //     success : function(text){
      //         if (text == "success"){
      //             formSuccess();
      //         } else {
      //             submitMSG(false, '.contact-us');
      //         }
      //     }
      // });
  }

  function formSuccess() {
      $("#contactForm")[0].reset();
      submitMSG(true, ".contact-us");
  }

  function submitMSG(valid, parentSelector) {
      if (valid) {
          $(parentSelector + " .message-box")
              .removeClass("d-none")
              .addClass("d-block ");
          $(parentSelector + " .message-box div")
              .removeClass("alert-danger")
              .addClass("alert-success")
              .text("Form submitted successfully");
      } else {
          $(parentSelector + " .message-box")
              .removeClass("d-none")
              .addClass("d-block ");
          $(parentSelector + " .message-box div")
              .removeClass("alert-success")
              .addClass("alert-danger")
              .text("Found error in the form. Please check again.");
      }
  }
}); // JQuery end

// Selecting elements
let inputBox = $(".input-box");
let searchIcon = $(".search");
let closeIcon = $(".close-icon");
let hideOption = $(".search-option ");
let searchInput = $("#search-input");

// Open Input
// Industry input
allSub = $(".industryName");
allEvent = $(".eventsName");
const industryNameArr = [
  {
      name: "Vidhansabha Election",
      url: "/vidhansabha-election-special-adbanao-app",
  },
  {
      name: "Vocal For Local",
      url: "/india's-vocal-for-local-movement-with-adBanao",
  },
];
const EventNameArr = [];
for (let i = 0; i <= allSub.length; i++) {
  industryNameArr.push({
      name: $(allSub[i]).text(),
      url: $(allSub[i]).attr("href"),
  });
}
for (let i = 0; i <= allEvent.length; i++) {
  EventNameArr.push({
      name: $(allEvent[i]).text(),
      url: $(allEvent[i]).attr("href"),
  });
}

let uniqueArray = industryNameArr.filter((currentObj, index, self) => {
  const duplicateIndex = self.findIndex((obj) => obj.name === currentObj.name && obj.age === currentObj.age);

  return index === duplicateIndex;
});

uniqueArray2 = EventNameArr.filter((currentObj, index, self) => {
  const duplicateIndex = self.findIndex((obj) => obj.name === currentObj.name && obj.age === currentObj.age);

  return index === duplicateIndex;
});
uniqueArray = [...uniqueArray2, ...uniqueArray];
searchIcon.click(function () {
  // inputBox.addClass("open");
  // $(".search-option").select();
  // searchInput.focus()
  // removeClass(".search-option");
});
let activeItemIndex = -1;

function showSearchOptions(matchingObjects) {
  hideOption.empty().removeClass("hide-search");

  activeItemIndex = -1;
  matchingObjects.forEach((res) => {
      const option = `<div class="searchResult" url="${res.url}">${res.name}</div>`;
      hideOption.append(option);
  });

  $(".searchResult").click(function () {
      const url = $(this).attr("url");
      const name = $(this).text();
      searchInput.val(name);
      hideOption.addClass("hide-search");
      window.location = url;
      searchInput.val("");
  });
}
function hideSearchOptions() {
  hideOption.empty().addClass("hide-search");
}
$("#search-input").on("input", function () {
  let value = $(this).val().toLowerCase();
  if (value.length === 0) {
      $(".options").addClass("hide-search");
  }
  if (value.length > 0) {
      const matchingObjects = uniqueArray.filter((obj) => obj.name.toLowerCase().includes(value));
      if (matchingObjects.length > 0) {
          showSearchOptions(matchingObjects);
      } else {
          hideOption.empty().append(`<div class="noResult">No Result Found</div>`);
      }
  } else {
      hideOption.empty();
      $(".options").removeClass(".search-option");
  }
});

$("#search-input").on("keydown", function (e) {
  const searchResults = $(".searchResult");
  if (e.keyCode === 40) {
      // Down arrow key
      activeItemIndex = Math.min(activeItemIndex + 1, searchResults.length - 1);
      updateActiveItem();
      scrollActiveItem("down");
  } else if (e.keyCode === 38) {
      // Up arrow key
      activeItemIndex = Math.max(activeItemIndex - 1, -1);
      updateActiveItem();
      scrollActiveItem("up");
  } else if (e.keyCode === 13) {
      // Enter key
      e.preventDefault();
      const activeItem = $(".searchResult.active");
      if (activeItem.length > 0) {
          const url = activeItem.attr("url");
          const name = activeItem.text();
          searchInput.val(name);
          hideOption.addClass("hide-search");
          window.location = url;
          searchInput.val("");
      }
  }
});

function updateActiveItem() {
  const searchResults = $(".searchResult");
  searchResults.removeClass("active");
  if (activeItemIndex >= 0) {
      const activeItem = $(searchResults[activeItemIndex]);
      activeItem.addClass("active");
  }
}

function scrollActiveItem(direction) {
  const searchResults = $(".searchResult");
  const activeItem = $(searchResults[activeItemIndex]);
  if (activeItem.length > 0) {
      const dropdown = $(".search-option");
      const itemTop = activeItem.offset().top - dropdown.offset().top;
      const itemHeight = activeItem.outerHeight();
      const dropdownHeight = dropdown.innerHeight();

      if (direction === "down") {
          const itemBottom = itemTop + itemHeight;
          if (itemBottom > dropdownHeight) {
              // Scroll down to show the active item at the bottom
              dropdown.scrollTop(dropdown.scrollTop() + (itemBottom - dropdownHeight));
          }
      } else if (direction === "up") {
          if (itemTop < 0) {
              // Scroll up to show the active item at the top
              dropdown.scrollTop(dropdown.scrollTop() + itemTop);
          }
      }
  }
}

$(".search").click(function () {
  hideOption.removeClass("hide-search");
  searchInput.focus();
});

$(".close-icon").click(function () {
  hideOption.addClass("hide-search");
  searchInput.val("");
});

// Close Input
closeIcon.click(function () {
  inputBox.removeClass("open");
  hideOption.addClass("hide-search");
  searchInput.val("");
});

//loader

//   function hidePreloader() {
//     var preloader = document.getElementById('preloader');
//     preloader.style.display = 'none';
// }

// // Attach event listener to wait for content to load
// window.addEventListener('load', function () {
//     // Add a delay of 1 second (1000 milliseconds) before hiding the preloader
//     setTimeout(hidePreloader, 2000);
// });

// Modal script
// const userLoginId = localStorage.getItem("login_id");

// if (!userLoginId) {
//     if (localStorage.getItem("pop_true") == null) {
//         setTimeout(() => {
//             const popupData = JSON.parse(document.getElementById('popup').getAttribute('data-popup'));

//             const popupImage = document.getElementById('popupImage');
//             const popupButton = document.getElementById('loginAnchor');

//             if (popupData) {
//                 popupImage.src = popupData.imageSrc;
//                 popupButton.textContent = popupData.buttonText;
//                 popupButton.href = popupData.buttonLink;
//             }

//             $('#popup').modal('show');
//             localStorage.setItem("pop_true", true);
//         }, 5000);
//     }
// }

// $("#close").on("click", function (e) {
//     e.preventDefault();
//     $(".modal").modal('hide');
// });

// const userLoginId = localStorage.getItem("login_id");
// if (true) {

//     setTimeout(() => {
//       $('#popup').modal('show')
//       localStorage.setItem("pop_true", true)
//     }, 3000)

// }
// $("#close").on("click", function (e) {
//   e.preventDefault();
//   $(".modal").modal('hide');

// });
