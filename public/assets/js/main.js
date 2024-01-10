// Swiper Init
// toastr.success("hello", "Hi", {timeOut: 100000 });

// Error:
/// load section on scroll
let arrOfElement = ["#features", "#pricing", "#screenshots", "#counts", "#testimonials", ".media_awards_container", "#featuredBlog", "#client-section"];

// $(document).ready(function() {

//   arrOfElement.forEach((item, e) => {
//     // $(item).addClass("hideItem");
//   });
//   $(window).on("resize scroll", function() {
//     if ($("#features").visible(true, "vertical")) {
//       $("#features").removeClass("hideItem");
//     }
//     if ($("#pricing").visible(true, "vertical")) {
//       $("#pricing").removeClass("hideItem");
//     }
//     if ($("#screenshots").visible(true, "vertical")) {
//       $("#screenshots").removeClass("hideItem");
//     }
//     if ($("#counts").visible(true, "vertical")) {
//       $("#counts").removeClass("hideItem");
//     }
//     if ($("#testimonials").visible(true, "vertical")) {
//       $("#testimonials").removeClass("hideItem");
//     }
//     if ($(".media_awards_container").visible(true, "vertical")) {
//       $(".media_awards_container").removeClass("hideItem");
//     }
//     if ($("#featuredBlog").visible(true, "vertical")) {
//       $("#featuredBlog").removeClass("hideItem");
//     }
//     if ($("#client-section").visible(true, "vertical")) {
//       $("#client-section").removeClass("hideItem");
//     }
//   });
// });

new Swiper(".testimonialsSwiper", {
    slidesPerView: 2,
    slidesPerColumn: 1,
    slidesPerGroupSkip: 1,
    centeredSlides: true,
    spaceBetween: 10,
    // loop: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false
    // },
    lazy: true,
    breakpoints: {
        375: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
    },
});

new Swiper(".swiper-container-1", {
    loop: true,
    direction: "horizontal",
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    parallax: true,
    breakpoints: {
        1920: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1028: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    },
});

let linksObjec = {
    1: "https://www.instagram.com/adbanao/",
    2: "https://www.facebook.com/adbanao",
    3: "https://twitter.com/adbanaoapp",
    4: "https://www.youtube.com/channel/UCZur0aBgHNMOyNYRS80_RxA",
};

// for(let i=1; i<=4; i++){
//     $(`.socialMedia${i}`).click(() => {
//         window.location.href = linksObjec[i];
//     })
// }

new Swiper(".sectionsSwiper", {
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerGroupSkip: 1,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

new Swiper(".newTestimonialsSwiper", {
    // slidesPerColumn: 1,
    // autoplay: {
    //     delay: 2000,
    //   },
    centeredSlides: true,
    loop: true,
    fade: true,
    // spaceBetween: 10,
    autoplay: true,
    slidesPerGroupSkip: 1,
    dynamicBullets: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});
$(document).ready(function () {
    var swiper = new Swiper(".hero_slider", {
        slidesPerView: 3,
        autoplay: {
            delay: 3000,
        },
        autoHeight: false, //enable auto height
        spaceBetween: 30,
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 40 },
            360: { slidesPerView: 1, spaceBetween: 40 },
            480: { slidesPerView: 1, spaceBetween: 40 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1440: { slidesPerView: 3, spaceBetween: 40 },
        },
    });
});

$(document).ready(function () {
    $("#subscribe-email").keypress(function (e) {
        var charCode = e.which ? e.which : event.keyCode;

        if (String.fromCharCode(charCode).match(/[^0-9]/g)) return false;
    });
    // $("#search-input").hide()
});

$(document).ready(function () {
    new Swiper(".workCarousel", {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        mousewheel: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        lazy: true,
    });

    $(".hamburger").on("click", function () {
        $(".sidePanel").css({
            left: 0,
        });
        $(".closeMobileMenu").css({
            right: "20px",
            left: "auto",
        });
    });
    $(".closeMobileMenu").on("click", function () {
        $(".sidePanel").css({
            left: "-100vw",
        });
        $(".closeMobileMenu").css({
            right: "auto",
            left: "-100vw",
        });
    });
    AOS.init();
    $("#adbanao__howItWorksModal").modal({
        backdrop: "static",
        keyboard: false,
    });
});

// Youtube Player

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        videoId: "TnERdVO7Yn8",
        playerVars: {
            autoplay: 1,
            controls: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

$("#showVideo, .adbanao__howItWorksModal").click(function () {
    $("#adbanao__howItWorksModal").modal("show");
    player.playVideo();
});
$(".closeVideModal").click(function () {
    $("#adbanao__howItWorksModal").modal("hide");
    player.stopVideo();
});

// For render subcategory
async function renderCategory(catID, values) {
    // $(values).find(".spinnerContainer").css({
    //     display: "flex"
    // });
    $(".eventDateDetails").each(function () {
        $(this).removeClass("eventDateDetailsActive");
    });
    $(values).addClass("eventDateDetailsActive");

    const result = eventCatData.filter((item, i) => {
        if (item.id == catID) {
            const categoryData = item;
            return categoryData;
        }
    });
    let templateImageArray = [];
    const templatesResponse = await fetch(`${node_url}/api/templates_by_event_id_for_website?industry=Business&event_id=${catID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data.data;
        });
    templateImageArray = templatesResponse.templates;
    // console.log(templateImageArray,"Array of Images")
    let subCatHtml = "";

    var imagesArr = [];
    var newImage = [];
    result[0].category.map((catItem, i) => {
        var images = "";
        templateImageArray.map((image, i) => {
            if (catItem.id === image.sub_category_id) {
                imagesArr.push(image.sample_image);
            }
        });
        async function getImageHeight(imageUrl) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = function () {
                    const height = img.naturalHeight;
                    resolve(height);
                };
                img.onerror = function () {
                    reject(new Error("Failed to load image"));
                };
                img.src = imageUrl;
            });
        }
        const randomValues = ["40+", "28+", "77+", "53+", "107+", "99+", "26+"];

        async function filterImagesByHeight(imageUrls) {
            const filteredImages = [];

            for (const imageUrl of imageUrls) {
                try {
                    const height = await getImageHeight(imageUrl);
                    if (height >= 400) {
                        filteredImages.push({ imageUrl, height });
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            return filteredImages.filter((image) => image.height <= 400);
        }

        filterImagesByHeight(imagesArr).then((res) => {
            const randomIndex = Math.floor(Math.random() * randomValues.length);
            const randomValue = randomValues[randomIndex];
            const h2Element = document.querySelector(".more-number h2");
            if (h2Element) {
                h2Element.textContent = randomValue;
            }
            images = `<div class="image-div">
      <div class="event-image">
          <img src="${res[0].imageUrl}" alt="">
          <img src="${res[1].imageUrl}" alt="">
  
      </div>
      <br>
      <div class="event-image more-event">
          <img src="${res[2].imageUrl}" alt="">
          <div style="position: relative; width:48%" >
              <img src="${res[3].imageUrl}" alt="" style="width:100%">
              <div class="more-number">
              <h2>${randomValue}</h2>
              </div>
            
          </div>
       
  
      </div></a>
  </div>`;
            subCatHtml += `<div class="eventValue">
  <a href="https://web.adbanao.com/"> 
  <div class="main-evnet">
      <div class="event-name">
          <h2 class="Name">${catItem.sub_category_name}</h2>
      </div>

      ${images}

</div>

</div>`;
            $(".eventimgs").empty().append(subCatHtml);
        });

        // console.log(catItem,"ids")

        imagesArr = [];
    });

    // var swiper = new Swiper(".eventImageswiper", {
    //   slidesPerView: 2.5,
    //   spaceBetween: 30,
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    // });
    // $("#renderSubcategory").empty().append(subCatHtml);
    // $("#renderSubcategory").children().first().click();
}

async function renderTemplatesByCatId(calenderId, catId) {
    console.log(calenderId, "and", catId);
    $(".catDiv").each(function () {
        if ($(this).find("a").attr("data-catId") == catId) {
            $(this).find("a").addClass("calenderCatActive");
        } else {
            $(this).find("a").removeClass("calenderCatActive");
        }
    });

    const templatesResponse = await fetch(`${node_url}/api/templates_by_event_id?industry=Business&event_id=${calenderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data.data;
        });
    //  console.log(templatesResponse,"img")
    let templateImage = [];
    templatesResponse.templates.filter((item) => {
        if (item.sub_category_id === catId) {
            templateImage.push(item.sample_image);
        }
    });

    let blockCount = 0;
    let templateBlock = `<div class="row">`;
    var result = templateImage.splice(0, 10);
    let j = 0;
    await result.map(async (image, i) => {
        if (image) {
            if (blockCount == 0) {
                j++;
                templateBlock += `
                    <div class="col-sm-4 col-md-4 column ${j == 5 ? "d-none d-md-block" : ""}">`;
            }
            templateBlock += `<img src="${image}" alt="adbnao creatives-${i}" class="mb-3 event-image rounded" data-aos="zoom-in" data-aos-delay="${i * 100}" data-tilt-glare="false" data-tilt-perspective="500" data-tilt-scale="1"
                data-tilt-speed="400" data-tilt-max="20" data-tilt oncontextmenu="disabledPic(event)" onclick="redirect()" style="cursor:pointer;box-shadow: 0px 4px 20px 4px rgba(189, 189, 189, 0.25), 0px 4px 20px 2px rgba(190, 190, 190, 0.25);">`;

            if (blockCount == 1) {
                templateBlock += `</div>`;
                blockCount = 0;
            } else {
                blockCount++;
            }
        }
    });
    templateBlock += `</div>`;
    $("#renderTemplates").empty("");
    $("#renderTemplates").append(templateBlock);
}

$(document).ready(function () {
    $(".counter-count").each(function () {
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text(),
                },
                {
                    duration: 5000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    },
                }
            );
    });
});

async function getRandomImages(imagesArray, count) {
    var randomImages = [];

    // Shuffle the array using Fisher-Yates shuffle algorithm
    for (var i = imagesArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [imagesArray[i], imagesArray[j]] = [imagesArray[j], imagesArray[i]];
    }

    // Select the first 'count' elements from the shuffled array
    randomImages = imagesArray.slice(0, count);

    return randomImages;
}

function disabledPic(event) {
    event.preventDefault();
}

function redirect() {
    window.location.href = "https://web.adbanao.com/";
}

window.addEventListener("load", function () {
    $(".loader_section").hide();
});
//Blog rendring

document.addEventListener("DOMContentLoaded", function () {
    var link = document.getElementById("dynamicLink");
    var link2 = document.getElementById("digitalcardLink");
    var link3 = document.getElementById("animationLink");
    var link4 = document.getElementById("popup-a");

    function updateLink() {
        if (window.innerWidth <= 768) {
            // Mobile view (considering screens equal to or smaller than 768px width as mobile devices)
            link.href = "https://adbanao.page.link/whatsapp_sticker";
            link2.href = "https://adbanao.page.link/digi_card";
            link3.href = "https://adbanao.page.link/animatedVideo";
            link4.href = "https://adbanao.page.link/sm";
        } else {
            // Laptop view
            link.href = "https://web.adbanao.com/";
            link2.href = "https://web.adbanao.com/";
            link3.href = "https://web.adbanao.com/";
            link4.href = "https://web.adbanao.com/";
        }
    }
    updateLink();
    window.addEventListener("resize", updateLink);
});

function updateButtonsHref() {
    var buttons = document.querySelectorAll(".downloadFreePost");
    buttons.forEach(function (button) {
        if (window.innerWidth <= 768) {
            // Change the width threshold as needed
            button.href = "https://play.google.com/store/apps/details?id=com.adbanao&hl=en_IN&gl=US"; // Mobile view URL
        } else {
            button.href = "https://web.adbanao.com/"; // Desktop view URL
        }
    });
}

// Call the function initially and whenever the window is resized
updateButtonsHref();
window.addEventListener("resize", updateButtonsHref);
if (480 >= $(window).width()) {
    $("#whatsappsticker").attr("src", "/img/whatsapp-sticker-2.png");
    $("#businessCardImg").attr("src", "/img/busnescard-2.png");
    $("#animationVideoImg").attr("src", "/img/animationVideo-2.png");
} else {
    $("#whatsappsticker").attr("src", "/img/whatsapp-sticker-1.png");
    $("#businessCardImg-1").attr("src", "/img/busnescard-1.png");
    $("#animationVideoImg").attr("src", "/img/animationVideo-1.png");
}
$(".video-play").on("click", function (e) {
    $("#videoIframe").attr("src", "");
    $("#videoIframe").attr("src", $(e.currentTarget).attr("data-url"));
});

//Media and awards part
$(".media_awards-carousel").owlCarousel({
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
