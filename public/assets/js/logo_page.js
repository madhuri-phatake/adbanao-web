var swiper = new Swiper(".logo_hero_slider", {
    pagination: {
      el: ".swiper-pagination",
      // type: "progressbar",
      clickable: true

    },
    loop: true,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });