
function myslick() {
    $('.slick_caraousel').not('.slick-initialized').slick({
        
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToScroll: 1,
        centerMode: false,
        prevArrow: $('.my-arrows-container .prev-arrow'),
        nextArrow: $('.my-arrows-container .next-arrow'),
        responsive:[{
            breakpoint:768,
            settings:{
                dots:false,
                arrows:false,
                infinite:false,
                slidesToShow:2,
                slidesToScroll:1,
            }
        }]
    })
   
}
myslick();


$('.testimonials-carousel-new').owlCarousel({
    loop: true,
    margin: 0,
     nav: true,
    dots: true,
    
    responsiveClass: true,
    autoplay: true,
    lazyLoad: true,
    navText : ['<i class="fa fa-chevron-left testimonial-new-angle-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right testimonial-new-angle-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        dotsEach: 1,
        items: 1,
        margin:10
      },
      500: {
        dotsEach: 1,
        items: 1,
        margin:10

      },
      600: {
        dotsEach: 1,
        items: 1,
        margin:10
      },
      700: {
        dotsEach: 1,
        items: 2,
        margin:10
      },
      800: {
        dotsEach: 1,
        items: 2,
        margin:10
      },
      1200: {
        dotsEach: 1,
        items: 3,
        margin:10
      }

    }
   
  });
  function photomodel(photopath) {
    document.getElementById("photo").innerHTML = `<img src="${photopath}" alt="Photo not found" width="100%" height="100%">`
}


function myfunction(){
  var x = document.getElementById("myDIV");
  // var y=document.getElementsByClassName('read-more');
  // y.style.opacity='1'
  if (x.style.display === "block") {

      x.style.display = "none";
  } else {
      x.style.display = "block";
  }

}

var swiper = new Swiper(".trusted_companies_swiper", {
  slidesPerView: 7,
  spaceBetween: 20,
  autoplay: true,
  breakpoints: {
    320: { slidesPerView: 2, spaceBetween: 40 },
    360: { slidesPerView: 3, spaceBetween: 10 },
    480: { slidesPerView: 3, spaceBetween: 10 },
    768: { slidesPerView: 7, spaceBetween: 10 }
  }
});
