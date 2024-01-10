$(document).ready(function () {
    const popShown = localStorage.getItem("pop_true", "");
    $.ajax({
        url: base_url + "/popups/get_active_popups",
        type: "GET",
        success: function (response) {
            if (response.status == true) {
                let arrOfBlog = response.data.data;
                if (arrOfBlog.length > 0) {
                    const obj = arrOfBlog[0];
                    const currentDate = new Date();
                    const from = new Date(obj.from_date);
                    const to = new Date(obj.to_date);
                    const modalId = obj._id;
                    const ctaUrl = obj.cta_url;
                    if (popShown == null || popShown != obj.title) {
                        if (currentDate >= from && currentDate <= to) {
                            let modalContent = `
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content modal_content">
                        <div class="modal-body p-0 popbody" style="outline:2px solid #fff;border-radius:4px">
                          <a href="javascript:void(0)" id="popup-a" onclick="modalCount('${modalId}', '${ctaUrl}')">
                            <img class="popimg" id="popupImage" src="${obj
                                    .image[0]
                                    .icon_url}" alt="popupImage" width="100%">
                          </a>
                          <button id="close" type="button" class="close popopclose" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </div>`;
                            $("#popup").append(modalContent);
                            setTimeout(() => {
                                $("#popup").modal("show");
                                localStorage.setItem("pop_true", obj.title);
                            }, 3000);
                        }
                    }
                }
            }
        }
    });
    $(document).on("click", "#close", function (e) {
        e.preventDefault();
        $(".modal").modal("hide");
    });
    //   $('.event-slide').owlCarousel({
    //     loop:true,
    //     margin:10,
    //     // nav:true,
    //     responsive:{
    //         0:{
    //             items:1
    //         },
    //         600:{
    //             items:3
    //         },
    //         1000:{
    //             items:3
    //         }
    //     }
    // })
    $.ajax({
        url: base_url + "/homes/get_active_home_slider",
        type: "GET",
        success: function (response) {
            if (response.status == true) {
                $("#head-swiper").empty();
                const sliderItems = response.data.data;
                if (sliderItems && sliderItems.length > 0) {
                    const sliderContainer = $("#head-swiper");
                    sliderContainer.empty();
                    $(".event-slide").empty();
                    sliderItems.forEach(function (item) {
                        const dateText =
                            item.from_date && item.to_date
                                ? `${moment(item.from_date).format("Do MMM YY")} to ${moment(
                                    item.to_date
                                ).format("Do MMM YY")}`
                                : item.from_date
                                    ? moment(item.from_date).format("Do MMM YY")
                                    : item.to_date
                                        ? moment(item.to_date).format("Do MMM YY")
                                        : null;
                        const sliderContent = `
                  <div class="item">
                  <a href="javascript:void(0)"  onclick="eventCount('${item._id}', '${item.cta_url}')">
                  <div class="hero_silde_img">
                        <img src="${item.image[0]
                                .icon_path}" alt="">                   
                      </div>
                      <div class="slider_details">
                      <p class="slider-title">${truncateTitle(
                                    item.title,
                                    17
                                )}<br>
                      <samp>${dateText}</samp></p>
                      </div>
                    </a>
                  </div>
                `;
                        $(".event-slide").append(sliderContent);
                    });
                }
            } else {
                $(".event-slide").append(`<div class="item">
          <div class="cardShimmer">
              <div class="shimmerBG media"></div>
  
          </div>
            </div>
            <div class="item">
                <div class="cardShimmer">
                    <div class="shimmerBG media"></div>
  
                </div>
            </div>
            <div class="item">
                <div class="cardShimmer">
                    <div class="shimmerBG media"></div>
  
                </div>
      </div>`);
            }
            setTimeout(() => {
                $(".event-slide").owlCarousel({
                    loop: true,
                    margin: 10,
                    dots: false,
                    // nav:true,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 3
                        },
                        1000: {
                            items: 3
                        }
                    }
                });
            });
        }
    });
    Fancybox.bind(
        '[data-fancybox="video-gallery"]',
        {
            // hideScrollbar: false,
        }
    );
    Fancybox.bind(
        '[data-fancybox="video-gallery2"]',
        {
            // hideScrollbar: false,
        }
    );
});
function modalCount(popup_id, renderUrl) {
    $.ajax({
        url: base_url + "/popups/increase_count",
        type: "POST",
        data: { popup_id: popup_id },
        success: function (response) {
            if (response.status == true) {
                window.location.href = renderUrl;
            }
        },
        error: function (error) {
            console.log("Error:", error);
        }
    });
}
function truncateTitle(title, maxLength) {
    if (title.length > maxLength) {
        return title.substring(0, maxLength - 3) + "...";
    }
    return title;
}

function eventCount(home_slider_id, renderUrl) {
    const data = { event_id: home_slider_id };
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: base_url + "/homes/increase_count",
        type: "POST",
        data: JSON.stringify(data),
        success: function (response) {
            if (response.status == true) {
                window.location.href = renderUrl;
            }
        },
        error: function (error) {
            console.log("Error:", error);
        }
    });
}

$(document).ready(async function () {
    // for pricing plan
    const pricingResponse = await fetch(base_url + "/api/get_pricing_data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.data;
        });

    pricingResponse.data.forEach(element => {
        // business special plan
        if (element.id == 11) {
            $(".BVP_actual_price").text(element.price);
            $(".BVP_disc_price").text(element.discount_amt);
            $(".BVP_save_price").text(
                Number(element.price) - Number(element.discount_amt)
            );
            $(".BVP_rupess_one_image").text(
                (element.discount_amt / Number(element.credit)).toFixed(2)
            );
        }
        // brand booster plan
        if (element.id == 4) {
            if (element.credit <= 0) {
                $(".lessThanRupee").html("&lt; ");
                $(".BB_rupess_one_image").text("1");
            } else {
                $(".lessThanRupee").html("");
                $(".BB_rupess_one_image").text(
                    Number(element.discount_amt) / Number(element.credit).toFixed(2)
                );
            }
            $(".BB_actual_price").text(element.price);
            $(".BB_disc_price").text(element.discount_amt);
            $(".BB_save_price").text(
                Number(element.price) - Number(element.discount_amt).toFixed(2)
            );
            // $(".BB_rupess_one_image").text(Number(element.discount_amt)/Number(element.credit))
        }
        // yearly limited plan
        if (element.id == 3) {
            $(".yearly_actual_price").text(element.price);
            $(".yearly_disc_price").text(element.discount_amt);
            $(".yearly_save_price").text(
                Number(element.price) - Number(element.discount_amt)
            );
            $(".yearly_rupess_one_image").text(
                (Number(element.discount_amt) / Number(element.credit)).toFixed(2)
            );
        }
        // quarterly
        if (element.id == 9) {
            $(".quarterly_actual_price").text(element.price);
            $(".quarterly_disc_price").text(element.discount_amt);
            $(".quarterly_save_price").text(
                Number(element.price) - Number(element.discount_amt)
            );
            $(".quarterly_rupess_one_image").text(
                (Number(element.discount_amt) / Number(element.credit)).toFixed(2)
            );
        }
        // monthly
        if (element.id == 1) {
            $(".monthly_actual_price").text(element.price);
            $(".monthly_disc_price").text(element.discount_amt);
            $(".monthly_save_price").text(
                Number(element.price) - Number(element.discount_amt)
            );
            $(".monthly_rupess_one_image").text(
                (Number(element.discount_amt) / Number(element.credit)).toFixed(2)
            );
        }
    });
    // $("#industries").hover(function(){
    //     $("#industryDropdown").removeClass('d-none');
    // })
});
$(document).ready(async function () { });

//Main
let eventCatData;
$(document).ready(async function () {
    const eventsResponse = await fetch(
        node_url + "/api/get_homepage_calendar_for_website",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
        .then(response => response.json())
        .then(data => {
            return data;
        });

    const eventsResponseData = eventsResponse.data.splice(0, 7);
    eventCatData = eventsResponseData;

    let eventsBlock = ``;
    await eventsResponseData.map(async (obj, i) => {
        var calenderIcon = `<img src="${obj.calender_img}" alt="${obj.festival_name}">`;
        if (obj.calender_img === null) {
            calenderIcon = ``;
        }
        var initialDate = new Date(obj.date);
        var month = moment(new Date(obj.date)).format("MMM");
        var date = moment(new Date(obj.date)).format("Do");

        const [digits, dateInitials] = date.toString().match(/\D+|\d+/g);
        var setActive = "";
        if (new Date().getDate() == initialDate.getDate()) {
            setActive = "active";
            // renderTemplates(obj.id, null);
        }

        //  eventsBlock += `<div class="swiper-slide swiperDate ${setActive}" onclick="renderTemplates(${obj.id}, this)" data-aos="fade-right" data-aos-delay="${i*100}" style="height:100%!important">
        eventsBlock += `<div class="swiper-slide eventDateDetails ${setActive}" onclick="renderCategory(${obj.id},this)" data-aos="fade-right" data-aos-delay="${i *
            100}" style="height:100%!important">
                      
                        <div class="eventAngle"> </div>
                        <h2 class="eventDate">${moment(obj.date).format(
                "D[<sup>th</sup>]"
            )} <p class="yearAndMonth">${moment(obj.date).format(
                "MMM,YYYY"
            )}</p> <samp>${moment(obj.date).format("dddd")}</samp></h2>
                        <div class="eventDateText">
                         
                        </div>

                    </div>`;
    });

    $("#renderFestival").empty("");
    $("#renderFestival").append(eventsBlock);
    $("#renderFestival").children().first().click();

    new Swiper(".festivalCarousel", {
        slidesPerView: 2,
        slidesPerColumn: 1,
        spaceBetween: 20,
        // loop: true,
        lazy: true,
        breakpoints: {
            360: { slidesPerView: 3, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 6, spaceBetween: 20 }
        }
    });
});

$(document).ready(function () { });
// This isElementInView function checks if the specified element
function isElementInView(elem) {
    var $elem = $(elem);
    var windowTop = $(window).scrollTop();
    var windowBottom = windowTop + $(window).height() + 300;
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return elemBottom <= windowBottom && elemTop >= windowTop;
}

// view port check for home page
// for businessCategories
let businessCategories = true;
$(window).on("scroll", function () {
    if (businessCategories) {
        if (isElementInView("#BusinessCategories")) {
            businessCategories = false;

            $("#BusinessCategories").append(`     <div class="container-fluid">
          <div class="brand_category">
              <h2 class="allTitle_font_size">Business Categories</h2>
              <div class="swiper category_swiper">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide">
                          <a href="/gems-jewellery-post">
                              <div class="category_div">
                                  <img src="/img/category_img/Gems And Jewellery.jpg"
                                      alt="Gems And Jewellery">
                                  <div class="category_name">
                                      <p>Gems And Jewellery </p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div class="swiper-slide">
                          <a href="/mobile-accessories-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Mobile And Accessories.jpg"
                                      alt="Mobile And Accessories">
                                  <div class="category_name">
                                      <p>Mobile And Accessories</p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div class="swiper-slide">
                          <a href="/education-coaching-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Education And  Coaching.jpg"
                                      alt="Education And  Coaching ">
                                  <div class="category_name">
                                      <p>Education And Coaching </p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div class="swiper-slide">
                          <a href="/hotel-restaurants-lodging-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Hotel Restaurant And Lodging.jpg"
                                      alt="Hotel Restaurant And Lodging">
                                  <div class="category_name">
                                      <p>Hote Restaurant Lodging</p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div class="swiper-slide">
                          <a href="/politician-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Politicians.jpg" alt="Politicians">
                                  <div class="category_name">
                                      <p>Politicians </p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div class="swiper-slide">
                          <a href="/apparel-clothingshop-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Apparel And Clothing.jpg"
                                      alt="Apparel And Clothing ">
                                  <div class="category_name">
                                      <p>Apparel And Clothing </p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div class="swiper-slide">
                          <a href="/beuty-cosmetic-personal-care-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Beauty, Cosmetic And Personal Care.jpg"
                                      alt="Beauty , Cosmetic And Personal Care ">
                                  <div class="category_name">
                                      <p>Beauty , Cosmetic </p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div class="swiper-slide">
                          <a href="/electricals-electronics-appliances-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Electronic And Appliances.jpg"
                                      alt="Electronic And Appliances">
                                  <div class="category_name">
                                      <p>Electronic And Appliances </p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      <div class="swiper-slide">
                          <a href="/hospital-clinics-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Hospital And Clinics.jpg"
                                      alt="Hospital And Clinics">
                                  <div class="category_name">
                                      <p>Hospital And Clinics </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                      <div class="swiper-slide">
                          <a href="/media-advertisement-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Advertising And Media.jpg"
                                      alt="Advertising And Media">
                                  <div class="category_name">
                                      <p>Advertising And Media </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                      <div class="swiper-slide">
                          <a href="/banking-finance-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Banking & Finance.jpg" alt="Banking & Finance">
                                  <div class="category_name">
                                      <p>Banking & Finance </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                      <div class="swiper-slide">
                          <a href="/real-estate-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Real Estate.jpg" alt="Real Estate">
                                  <div class="category_name">
                                      <p>Real Estate </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                      <div class="swiper-slide">
                          <a href="/contractor-labours-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Contractor And labors.jpg"
                                      alt="Contractor And labors">
                                  <div class="category_name">
                                      <p>Contractor And labors </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                      <div class="swiper-slide">
                          <a href="/tours-travels-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Tours And Travels.jpg" alt="Tours And Travels">
                                  <div class="category_name">
                                      <p>Tours And Travels </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                      <div class="swiper-slide">
                          <a href="/farming-agriculture-industry">
                              <div class="category_div">
                                  <img src="/img/category_img/Agriculture And Allied.jpg"
                                      alt="Agriculture And Allied">
                                  <div class="category_name">
                                      <p>Agriculture And Allied </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                      <div class="swiper-slide">
                          <a href="/furniture-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Furniture.jpg" alt="Furniture">
                                  <div class="category_name">
                                      <p>Furniture </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                      <div class="swiper-slide">
                          <a href="/bakery-confectionery-posts">
                              <div class="category_div">
                                  <img src="/img/category_img/Bakery & Confectionary.jpg"
                                      alt="Bakery & Confectionary">
                                  <div class="category_name">
                                      <p>Bakery & Confectionary </p>
                                  </div>
                              </div>
                          </a>
 
                      </div>
                  </div>
              </div>
          </div>
          <!-- for View All button -->
 
          <div class="container" style="padding: 30px 0;">
              <div class="row d-flex justify-content-center">
                  <a href="https://web.adbanao.com/" class="viewAllBtn position-relative joinus">
                      <div class="arrowDiv position-absolute">
                          <!-- <i class="fa fa-arrow-right" aria-hidden="true" style="color:#000000"></i> -->
                      </div>
                      <span href="javascript:void(0)" style="z-index:1000;font-weight: bold;color:#000">View
                          All</span>
                  </a>
              </div>
          </div>
      </div>`);
            setTimeout(() => {
                var swiper = new Swiper(".category_swiper", {
                    slidesPerView: 8,
                    autoHeight: false, //enable auto height
                    spaceBetween: 12,
                    autoplay: true,
                    breakpoints: {
                        320: { slidesPerView: 2, spaceBetween: 40 },
                        360: { slidesPerView: 3, spaceBetween: 10 },
                        480: { slidesPerView: 3, spaceBetween: 10 },
                        768: { slidesPerView: 7, spaceBetween: 10 }
                    }
                });
            }, 200);
        }
    }
});

// for instagramfeeds
let instagramfeeds = true;
$(window).on("scroll", function () {
    if (instagramfeeds) {
        if (isElementInView("#instagram-feeds")) {
            instagramfeeds = false;

            $("#viewInstagram").append(`   <!-- Swiper -->
        <div class="swiper reels-silder" >
            <div class="swiper-wrapper">
            <div class="swiper-slide video-gallery" id="reels-popup">
            <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F22-11-2023%2F31274ff7-8a10-4ab2-bb12-d9320c7c539f.mp4" data-fancybox="video-gallery" >
                <div class="reels-card">
                    <div class="reels-thumbnail">
                        <img src="/img/reels-thumbnail/Aflatoon.jpg" alt="Aflatoon">
                        <div class="play-btn">
                            <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                        </div>

                    </div>
                    <div class="reels-details">
                        <h4>Aflatoon</h4>
                        <p>Pune , Maharashtra </p>
                    </div>
                
                </div>  
            </a>                       
        </div>
            <div class="swiper-slide video-gallery" id="reels-popup">
            <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F22-11-2023%2F84d06c27-6077-414d-b879-996eb6c1280c.mp4" data-fancybox="video-gallery" >
                <div class="reels-card">
                    <div class="reels-thumbnail">
                        <img src="/img/reels-thumbnail/Yash Kashid.jpg" alt="Yash Kashid">
                        <div class="play-btn">
                            <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                        </div>

                    </div>
                    <div class="reels-details">
                        <h4>Yash Kashid</h4>
                        <p>Jintur , Maharashtra</p>
                    </div>
                
                </div>  
            </a>                       
        </div>
            <div class="swiper-slide video-gallery" id="reels-popup">
            <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F22-11-2023%2F2659b11c-8230-4f68-9ba9-4870ef33741f.mp4" data-fancybox="video-gallery" >
                <div class="reels-card">
                    <div class="reels-thumbnail">
                        <img src="/img/reels-thumbnail/Go Ahmedabad.jpg" alt="Go Ahmedabad">
                        <div class="play-btn">
                            <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                        </div>

                    </div>
                    <div class="reels-details">
                        <h4>Go Ahmedabad</h4>
                        <p>Ahmedabad , Gujarat </p>
                    </div>
                
                </div>  
            </a>                       
        </div>
            <div class="swiper-slide video-gallery" id="reels-popup">
            <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F22-11-2023%2Fc2143a97-b363-4a50-bc59-501becb9483f.mp4" data-fancybox="video-gallery" >
                <div class="reels-card">
                    <div class="reels-thumbnail">
                        <img src="/img/reels-thumbnail/Hari Om Jaiswal.jpg" alt="Hari Om Jaiswal">
                        <div class="play-btn">
                            <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                        </div>

                    </div>
                    <div class="reels-details">
                        <h4>Hari Om Jaiswal</h4>
                        <p>Varanasi , Uttar Pradesh</p>
                    </div>
                
                </div>  
            </a>                       
        </div>
            <div class="swiper-slide video-gallery" id="reels-popup">
            <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F22-11-2023%2F255950ca-dd21-4314-8d92-514335796f88.mp4" data-fancybox="video-gallery" >
                <div class="reels-card">
                    <div class="reels-thumbnail">
                        <img src="/img/reels-thumbnail/Gaurav Sharma.jpg" alt="Gaurav Sharma">
                        <div class="play-btn">
                            <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                        </div>

                    </div>
                    <div class="reels-details">
                        <h4>Gaurav Sharma</h4>
                        <p>Udaipur , Rajasthan </p>
                    </div>
                
                </div>  
            </a>                       
        </div>
                <div class="swiper-slide video-gallery" id="reels-popup">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2F6853163b-ccb3-4fc6-bc79-744ee2b3633e.mp4" data-fancybox="video-gallery" >
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Saurabh Bhosle.jpg" alt="Saurabh Bhosle">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Saurabh Bhosale</h4>
                                <p>Pune , Maharashtra </p>
                            </div>
                        
                        </div>  
                    </a>                       
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2Fa1887748-84b9-4f3e-b88c-caa42c31fdfb.mp4" data-fancybox="video-gallery" >
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Gujarti Media Factory.jpg" alt="Gujarti Media Factory">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Gujarti Media Factory </h4>
                                <p>Ahmedabad, Gujarat</p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2F6119ec9f-2bcc-44a5-ae6c-91541ed26e42.mp4" data-fancybox="video-gallery">
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Nagpur X Factor.jpg" alt="Nagpur X Factor">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Nagpur X Factor  </h4>
                                <p>Nagpur , Maharashtra </p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao/cvfile_file/25-10-2023/f365d939-d97d-4390-8dca-a352441cb7af.mp4" data-fancybox="video-gallery">
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Gyan Infinet.jpg" alt="Gyan Infinet">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Gyan Infinet </h4>
                                <p>Delhi  </p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2F90032dfb-3edf-415d-85c9-662367083ac7.mp4" data-fancybox="video-gallery">
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/The AI Kid.jpg" alt="The AI Kid ">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Gyan Infinet </h4>
                                <p>Indore ,Madhya Pradesh</p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2Fca47a68d-00f6-4952-b81f-eb1d9d28bef6.mp4" data-fancybox="video-gallery">
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Tech Help India.jpg" alt="Tech Help India ">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Tech Help India </h4>
                                <p>Hyderabad , Telangana </p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2Fa2789552-affa-4fba-81e9-a193cdc5c96d.mp4" data-fancybox="video-gallery">
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Tech Kid Expert.jpg" alt="Tech Kid Expert ">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Tech Kid Expert</h4>
                                <p>Gurugram , Haryana  </p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2F89d6c1c0-7293-4862-8929-154717ae82fa.mp4" data-fancybox="video-gallery">
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Success Tales Marathi.jpg" alt="Success Tales Marathi">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Success Tales Marathi  </h4>
                                <p>Mumbai , Maharashtra  </p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2F3ad16362-af88-436e-b039-48444afed819.mp4" data-fancybox="video-gallery">
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Digi Rock.jpg" alt="Digi Roc">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Digi Rock</h4>
                                <p>Thane , Maharashtra  </p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
                <div class="swiper-slide">
                    <a href="https://adbanao.s3.ap-south-1.amazonaws.com/adbanao%2Fcvfile_file%2F25-10-2023%2Fc9d6c78a-5a80-44bc-8128-25911f8fadd3.mp4" data-fancybox="video-gallery" >
                        <div class="reels-card">
                            <div class="reels-thumbnail">
                                <img src="/img/reels-thumbnail/Panacea.Tutor.jpg" alt="Panacea.Tutor ">
                                <div class="play-btn">
                                    <img src="/img/reels-thumbnail/play-btn.png" alt="play-btn" >
                                </div>

                            </div>
                            <div class="reels-details">
                                <h4>Panacea.Tutor </h4>
                                <p>Chandigarh, Punjab </p>
                            </div>
                        
                        </div>   
                    </a>           
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>`);
            setTimeout(() => {
                var swiper = new Swiper(".reels-silder", {
                    // slidesPerView: 5,
                    spaceBetween: 20,
                    autoplay: {
                        delay: 3000, // Autoplay delay in milliseconds (3 seconds in this case)
                        disableOnInteraction: false // Autoplay will not be disabled after user interactions (optional)
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 1 // Display 2 slides when the screen width is 768px or more
                        },
                        1024: {
                            slidesPerView: 5 // Display 3 slides when the screen width is 1024px or more
                        }
                        // Add more breakpoints as needed
                    }
                });
                $(".play-btn").hide();
                $(".reels-thumbnail")
                    .mouseenter(function (e) {
                        // Find the nearest .play-btn within the hovered .reels-thumbnail
                        var nearestPlayBtn = $(this).find(".play-btn").first();
                        // var reelsDetails = $(this).find('.reels-details').first();
                        // reelsDetails.addClass("show-reels-details")
                        // Show the nearest .play-btn
                        nearestPlayBtn.show();
                    })
                    .mouseleave(function () {
                        // Find the nearest .play-btn within the hovered .reels-thumbnail
                        var nearestPlayBtn = $(this).find(".play-btn").first();
                        // var reelsDetails = $(this).find('.reels-details').first();
                        // reelsDetails.removeClass("show-reels-details")
                        // Show the nearest .play-btn
                        nearestPlayBtn.hide();
                    });
            }, 200);
        }
    }
});
// for whatsappSection
let whatsappSection = true;
$(window).on("scroll", function () {
    if (whatsappSection) {
        if (isElementInView("#whatsappSection")) {
            whatsappSection = false;
            $("#viewwhatsappSection")
                .append(` <div class="row" style="align-items: center;">
      <div class="col-md-6 whatsapp-1">
          <h2 class="sectionHeading allTitle_font_size">Are you bored of the same old
              <samp>WhatsApp Stickers?</samp>
          </h2>
          <br>
          <div class="whatappFeatureIcon">
              <div class="IconList">
                  <img src="/img/listIcon.png" alt="listIcon">
                  <p>Perfect for birthdays, anniversaries, festivals, and more.</p>
              </div>
              <div class="IconList">
                  <img src="/img/listIcon.png" alt="listIcon">
                  <p>Create custom stickers or choose from thousands of ready-made ones.</p>
              </div>
              <div class="IconList">
                  <img src="/img/listIcon.png" alt="listIcon">
                  <p>Express emotions, share business stickers, memes, or prank friends.</p>
              </div>
              <div class="IconList">
                  <img src="/img/listIcon.png" alt="listIcon">
                  <p>Download, browse, and add stickers to WhatsApp.</p>
              </div>
          </div>
          <br>
          <div class="trybtn">
              <a id="dynamicLink" href=""><button class="tryNowBtn" type="button">Find Out
                      More</button></a>
          </div>
      </div>
      <div class="col-md-6 whatsapp-2">

          <!-- <video width="100%" height="80%" controls autoplay >
              <source src="/img/home_page/video/Premium WA Stickers.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video> -->
          <img src="/img/home_page/video/whatappAnimation.webp" alt="whatappAnimation" id="">
      </div>
  </div>`);
        }
    }
});
// for BusinessCardSection
let BusinessCardSection = true;
$(window).on("scroll", function () {
    if (BusinessCardSection) {
        if (isElementInView("#BusinessCardSection")) {
            BusinessCardSection = false;
            $("#viewBusinessCardSection").append(`   <div class="row">
        <div class="col-md-6 BusinessCardSection-1">
            <img src="/img/home_page/video/business_card.webp" alt="BusinessCard" id="">
        </div>
        <div class="col-md-6 whatsapp-1">
            <h2 class="sectionHeading allTitle_font_size">Still Doing Networking with Paper
                <samp>Business Cards?</samp>
            </h2>
            <br>
            <div class="whatappFeatureIcon">
                <div class="IconList">
                    <img src="/img/listIcon.png" alt="listIcon">
                    <p>Replace paper business cards and go digital with AdBanao.</p>
                </div>
                <div class="IconList">
                    <img src="/img/listIcon.png" alt="listIcon">
                    <p>Choose from 22+ templates for your digital business card.</p>
                </div>
                <div class="IconList">
                    <img src="/img/listIcon.png" alt="listIcon">
                    <p>Stay up-to-date, save the environment, and easily share your card in PDF.</p>
                </div>
                <div class="IconList">
                    <img src="/img/listIcon.png" alt="listIcon">
                    <p>Boost your brand value with AdBanao's digital business cards.</p>
                </div>
            </div>
            <br>
            <div class="trybtn">
                <a id="digitalcardLink" href=""><button class="tryNowBtn" type="button">Get Yours
                        Today</button></a>
            </div>

        </div>
        <br>
        <div class="col-md-6 BusinessCardSection-3">
            <img src="/img/home_page/video/business_card.webp" alt="BusinessCard" id="">
        </div>

    </div>`);
        }
    }
});

// for animationVideo
let animationVideo = true;
$(window).on("scroll", function () {
    if (animationVideo) {
        if (isElementInView("#animationVideo")) {
            animationVideo = false;
            $("#viewAnimationVideo").append(`<div class="row">
      <div class="col-md-7 whatsapp-1 animation-1">
          <h2 class="sectionHeading allTitle_font_size">Do You Want To Create Your Own Stunning
              <samp>Animation Videos In Minutes?</samp>
          </h2>
          <br>
          <div class="whatappFeatureIcon">
              <div class="IconList">
                  <img src="/img/listIcon.png" alt="listIcon">
                  <p>Choose from a variety of templates, characters, backgrounds, and music.</p>
              </div>
              <div class="IconList">
                  <img src="/img/listIcon.png" alt="listIcon">
                  <p>Make videos for any occasion: business, social media, product ads, and more.</p>
              </div>
              <div class="IconList">
                  <img src="/img/listIcon.png" alt="listIcon">
                  <p>Download the app, edit, preview, and share your videos instantly.</p>
              </div>
              <div class="IconList">
                  <img src="/img/listIcon.png" alt="listIcon">
                  <p>Take your videos to the next level with AdBanao App.</p>
              </div>
          </div>
          <br>
          <div class="trybtn">
              <a id="animationLink" href=""><button class="tryNowBtn" type="button">Try For
                      Free</button></a>
          </div>

      </div>
      <div class="col-md-5 animationVideo-2 text-center">
          <img src="/img/home_page/video/animation_video.webp" alt="animationVideoImg" id="">
      </div>
  </div>`);
        }
    }
});
// for screenshots
let screenshots = true;
$(window).on("scroll", function () {
    if (screenshots) {
        if (isElementInView("#screenshots")) {
            screenshots = false;
            $("#viewscreenshots")
                .append(`  <!-- <div class="screenshot-frame"></div> -->
      <div class="mobile_view1"></div>
      <div class="screen-carousel owl-carousel owl-theme dot-indicator">
          <img src="/img/new_screenshot/1.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/2.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/3.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/4.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/5.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/6.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/7.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/8.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/9.png" class=" screenshots_img" alt="screenshots" />
          <img src="/img/new_screenshot/10.png" class=" screenshots_img" alt="screenshots" />


      </div>`);
            setTimeout(() => {
                // 10. Screenshots slider
                $(".screen-carousel").owlCarousel({
                    loop: true,
                    margin: 0,
                    center: true,
                    dots: true,
                    nav: false,
                    autoplay: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 3
                        },
                        991: {
                            items: 4
                        },
                        1200: {
                            items: 4
                        },
                        1920: {
                            items: 4
                        }
                    }
                });
            }, 200);
        }
    }
});

// for how-it-work
let howitwork = true;
$(window).on("scroll", function () {
    if (howitwork) {
        if (isElementInView("#how-it-work")) {
            howitwork = false;
            $("#viewhowitwork").append(`  <div class="">
        <div class="howitwork">
            <div class="howitwork-img">
                <div class="lottie-animation" id="template-lottie-animation" style="width: 50%;">
                </div>
                <!-- <img src="/img/howitwork/step-1.png" alt="Choose Your Template"> -->
            </div>
            <div class="howitwork-title">
                <h5>Choose Your Template</h5>
                <div class="howitwork-decription">
                    <p>Go to <samp>AdBanao</samp> Poster Maker and select a poster template.</p>
                </div>
            </div>

        </div>
    </div>
    <div class="step-arrow">

        <img src="/img/howitwork/center-line.png" alt="center-line">
    </div>
    <div class="">
        <div class="howitwork">
            <div class="howitwork-img">
                <div id="create-lottie-animation" style="width: 50%;"></div>
                <!-- <img src="/img/howitwork/step-2.png" alt="Customize Template"> -->
            </div>
            <div class="howitwork-title">
                <h5>Customize Template</h5>
                <div class="howitwork-decription">
                    <p>Customize your poster layout with text, match brand colors, add icons and
                        design elements, and more.</p>
                </div>
            </div>

        </div>
    </div>
    <div class="step-arrow">
        <img src="/img/howitwork/center-line.png" alt="center-line">
    </div>
    <div class="">
        <div class="howitwork">
            <div class="howitwork-img">
                <div id="download-lottie-animation" style="width: 50%;"></div>
                <!-- <img src="/img/howitwork/step-3.png" alt="Download & Share"> -->
            </div>
            <div class="howitwork-title">
                <h5>Download & Share</h5>
                <div class="howitwork-decription">
                    <p>Share to social media directly or download as a PDF for best print quality.
                    </p>
                </div>
            </div>

        </div>
    </div>`);
            setTimeout(() => {
                // Load the animation JSON file
                var animationContainer = document.getElementById(
                    "template-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path:
                        "/img/Animated Adbanao home page icons/Choose Your Template.json" // Replace with the path to your JSON file
                });
                // Load the animation JSON file
                var animationContainer = document.getElementById(
                    "create-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path: "/img/Animated Adbanao home page icons/Customize Template.json" // Replace with the path to your JSON file
                });
                var animationContainer = document.getElementById(
                    "download-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path: "/img/Animated Adbanao home page icons/DownloadShare.json" // Replace with the path to your JSON file
                });
            }, 200);
        }
    }
});

// for feature-section
let featuresection = true;
$(window).on("scroll", function () {
    if (featuresection) {
        if (isElementInView("#feature-section")) {
            featuresection = false;
            $("#viewfeaturesection")
                .append(` <div class="row align-items-center featured-maindiv">
      <div class="col-lg-3 col-md-12 mobileChange">
          <div class="row" style="gap: 20px;">
              <div class="col-12">
                  <div class="d-flex mainFeature mainFeature1">
                      <div class="feature-img">
                          <div id="calender-lottie-animation" style="width: 30%;"></div>
                          <!-- <img src="/img/featured/365 Days Calender.png" alt=""> -->
                      </div>
                      <div class="feature-title">
                          <h6>365 Days Calender</h6>
                          <img src="/img/featured/bottom-border.png" alt="border-bottom">
                      </div>
                      <div class="feature-decription">
                          <p>Business owners who call and/or meet prospects personally to get
                              business.</p>
                      </div>
                  </div>
              </div>
              <div class="col-12">
                  <div class="d-flex mainFeature mainFeature2">
                      <div class="feature-img">
                          <div id="BusinessCard-lottie-animation" style="width: 30%;"></div>

                          <!-- <img src="/img/featured/150+ Business Categories.png"
                              alt="150+ Business Categories"> -->
                      </div>
                      <div class="feature-title">
                          <h6>150+ Business Categories</h6>
                          <img src="/img/featured/bottom-border.png" alt="border-bottom">
                      </div>
                      <div class="feature-decription">
                          <p>AdBanao App provides industry-wise
                              creatives, poster for more than 150+ business categories.</p>
                      </div>
                  </div>
              </div>
              <div class="col-12">
                  <div class="d-flex mainFeature mainFeature3">
                      <div class="feature-img">
                          <div id="Automatic-lottie-animation" style="width: 35%;"></div>
                          <!-- <img src="/img/featured/AutomaticBrandPlacement.png"
                              alt="Automatic Brand Placement"> -->
                      </div>
                      <div class="feature-title">
                          <h6>Automatic Brand Placement</h6>
                          <img src="/img/featured/bottom-border.png" alt="border-bottom">
                      </div>
                      <div class="feature-decription">
                          <p>With this feature, your brand logo,
                              business name, and contact details will place automatically in
                              your creative</p>
                      </div>
                  </div>
              </div>
              <div class="col-12">
                  <div class="d-flex mainFeature mainFeature4">
                      <div class="feature-img">
                          <div id="Click-lottie-animation" style="width: 25%;"></div>
                          <!-- <img src="/img/featured/CustomAudioWithTextSpeech.png"
                              alt="Custom Audio With Text Speech"> -->
                      </div>
                      <div class="feature-title">
                          <h6>1 Click Background Removal</h6>
                          <img src="/img/featured/bottom-border.png" alt="border-bottom">
                      </div>
                      <div class="feature-decription">
                          <p>With Background remover, you can remove
                              the background of any object or product for doing product
                              branding or highlighting the specific object on the poster</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div
          class="col-lg-4 col-md-12 d-md-block d-lg-block swiper mySwiper radius_screen swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events hideOnmobile">

          <div class="mobile_view"></div>
          <div class="position-relative pb-md-5 py-lg-0 featureSwipper swiper-wrapper"
              style="margin-bottom: 10px; height: 100% !important; transform: translate3d(-4560px, 0px, 0px); transition-duration: 0ms;"
              id="swiper-wrapper-51b103b511d241ba8" aria-live="off">
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper_stle swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="0"
                  role="group" aria-label="1 / 8">
                  <img alt="Calender" src="/img/home_page/ss/calender.jpg"
                      class="img-center img-fluid swiper-img  img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="1"
                  role="group" aria-label="2 / 8">
                  <img alt="Bussiness Category" src="/img/home_page/ss/bussiness_category.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="2"
                  role="group" aria-label="3 / 8">
                  <img alt="Brand Placement" src="/img/home_page/ss/brad_placement.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate swiper-slide-duplicate-prev"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="3"
                  role="group" aria-label="4 / 8">
                  <img alt="Background Removal" src="/img/home_page/ss/background_remove.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate swiper-slide-duplicate-active"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="4"
                  role="group" aria-label="5 / 8">
                  <img alt="Digital Bussiness Card"
                      src="/img/home_page/ss/digital_bussiness_card.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate swiper-slide-duplicate-next"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="5"
                  role="group" aria-label="6 / 8">
                  <img alt="Audio Jingles text" src="/img/home_page/ss/audio_text.jpg"
                      class="img-center img-fluid swiper-img  img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="6"
                  role="group" aria-label="7 / 8">
                  <img alt="Audio Jingle" src="/img/home_page/ss/audio_jingle.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="7"
                  role="group" aria-label="8 / 8">
                  <img alt="Multigual Content" src="/img/home_page/ss/multigual_content.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper_stle"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="0"
                  role="group" aria-label="1 / 8">
                  <img alt="Calender" src="/img/home_page/ss/calender.jpg"
                      class="img-center img-fluid swiper-img  img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="1"
                  role="group" aria-label="2 / 8">
                  <img alt="Bussiness Category" src="/img/home_page/ss/bussiness_category.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="2"
                  role="group" aria-label="3 / 8">
                  <img alt="Brand Placement" src="/img/home_page/ss/brad_placement.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-prev"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="3"
                  role="group" aria-label="4 / 8">
                  <img alt="Bakground Removal" src="/img/home_page/ss/background_remove.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-active"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="4"
                  role="group" aria-label="5 / 8">
                  <img alt="Digital Bussiness Card"
                      src="/img/home_page/ss/digital_bussiness_card.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-next"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="5"
                  role="group" aria-label="6 / 8">
                  <img alt="Audio Jingle Text" src="/img/home_page/ss/audio_text.jpg"
                      class="img-center img-fluid swiper-img  img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="6"
                  role="group" aria-label="7 / 8">
                  <img alt="Audio Jingle" src="/img/home_page/ss/audio_jingle.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="7"
                  role="group" aria-label="8 / 8">
                  <img alt="Multigual content" src="/img/home_page/ss/multigual_content.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper_stle swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="0"
                  role="group" aria-label="1 / 8">
                  <img alt="Calender" src="/img/home_page/ss/calender.jpg"
                      class="img-center img-fluid swiper-img  img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="1"
                  role="group" aria-label="2 / 8">
                  <img alt="Bussiness Category" src="/img/home_page/ss/bussiness_category.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="2"
                  role="group" aria-label="3 / 8">
                  <img alt="Brand Placement" src="/img/home_page/ss/brad_placement.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate swiper-slide-duplicate-prev"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="3"
                  role="group" aria-label="4 / 8">
                  <img alt="Background Removal" src="/img/home_page/ss/background_remove.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate swiper-slide-duplicate-active"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="4"
                  role="group" aria-label="5 / 8">
                  <img alt="Digital Bussiness Card"
                      src="/img/home_page/ss/digital_bussiness_card.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate swiper-slide-duplicate-next"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="5"
                  role="group" aria-label="6 / 8">
                  <img alt="Audio Jingle text" src="/img/home_page/ss/audio_text.jpg"
                      class="img-center img-fluid swiper-img  img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="6"
                  role="group" aria-label="7 / 8">
                  <img alt="Audio Jingle" src="/img/home_page/ss/audio_jingle.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
              <div class="swiper-slide position-relative pb-md-5 py-lg-0 swiper-slide-duplicate"
                  style="height: 100% !important; margin-right: 30px;" data-swiper-slide-index="7"
                  role="group" aria-label="8 / 8">
                  <img alt="Multigual content" src="/img/home_page/ss/multigual_content.jpg"
                      class="img-center img-fluid swiper-img img_in_screen">
              </div>
          </div>
          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
      </div>
      <div class="col-lg-3 col-md-12 mobileChange">
          <div class="row" style="gap: 20px;">
              <div class="col-12">
                  <div class="d-flex mainFeature mainFeature5">
                      <div class="feature-img">
                          <div id="Digital-lottie-animation" style="width: 30%;"></div>
                          <!-- <img src="/img/featured/Digital Business Card.png"
                              alt="Digital Business Card"> -->
                      </div>
                      <div class="feature-title">
                          <h6>Digital Business Card</h6>
                          <img src="/img/featured/bottom-border.png" alt="border-bottom">
                      </div>
                      <div class="feature-decription">
                          <p>Easily share your details with other users
                              directly or through their email if they don't have the same app</p>
                      </div>
                  </div>

              </div>
              <div class="col-12">
                  <div class="d-flex mainFeature mainFeature6">

                      <div class="feature-img">
                          <div id="Audio-lottie-animation" style="width: 30%;"></div>
                          <!-- <img src="/img/featured/Readymade Audio Jingle.png"
                              alt="Readymade Audio Jingle"> -->
                      </div>
                      <div class="feature-title">
                          <h6>Readymade Audio Jingles</h6>
                          <img src="/img/featured/bottom-border.png" alt="border-bottom">
                      </div>
                      <div class="feature-decription">
                          <p>Play background music, audio jingles and
                              custom audio in your videos, posters and banners with audio
                              library.</p>
                      </div>
                  </div>
              </div>
              <div class="col-12">

                  <div class="d-flex mainFeature mainFeature7">
                      <div class="feature-img">
                          <div id="custom-audio-animation" style="width: 30%;"></div>
                          <!-- <img src="/img/featured/Remove Background.png" alt="Remove Background"> -->
                      </div>
                      <div class="feature-title">
                          <h6>Create Custom Audio with Text to speech</h6>
                          <img src="/img/featured/bottom-border.png" alt="border-bottom">
                      </div>
                      <div class="feature-decription">
                          <p>This helps you to make background custom
                              audio for your creative, you just need to insert the text
                              paragraph</p>
                      </div>
                  </div>
              </div>
              <div class="col-12">
                  <div class="d-flex mainFeature mainFeature8">
                      <div class="feature-img">
                          <div id="multilingual-audio-animation" style="width: 30%;"></div>
                          <!-- <img src="/img/featured/Multilingual Language.png"
                              alt="Multilingual Language"> -->
                      </div>
                      <div class="feature-title">
                          <h6>Multilingual Content</h6>
                          <img src="/img/featured/bottom-border.png" alt="border-bottom">
                      </div>
                      <div class="feature-decription">
                          <p>You don’t need any translator because
                              AdBanao provides you readymade contents in different languages
                              such as Hindi, Marathi, Gujarati, English etc.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`);
            setTimeout(() => {
                var swiper = new Swiper(".mySwiper", {
                    slidesPerView: "auto",
                    centeredSlides: true,
                    spaceBetween: 30,
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    }
                });
                swiper.on("slideChange", function (e) {
                    for (let i = 1; i <= 8; i++) {
                        $(".mainFeature" + i).removeClass("active");
                    }
                    $(`.mainFeature${e.realIndex + 1}`).addClass("active");
                });

                for (let i = 1; i <= 8; i++) {
                    $(`.mainFeature${i}`).on("click", e => {
                        swiper.slideTo(i - 1);
                    });
                }
                var animationContainer = document.getElementById(
                    "calender-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path: "/img/Animated Adbanao home page icons/Days Calender.json" // Replace with the path to your JSON file
                });
                var animationContainer = document.getElementById(
                    "BusinessCard-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path: "/img/Animated Adbanao home page icons/Business Categories.json" // Replace with the path to your JSON file
                });
                var animationContainer = document.getElementById(
                    "Automatic-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path: "/img/Animated Adbanao home page icons/Brand Placement.json" // Replace with the path to your JSON file
                });
                var animationContainer = document.getElementById(
                    "Click-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path: "/img/Animated Adbanao home page icons/Background Removal.json" // Replace with the path to your JSON file
                });
                var animationContainer = document.getElementById(
                    "Digital-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path:
                        "/img/Animated Adbanao home page icons/Digital Business Card.json" // Replace with the path to your JSON file
                });
                var animationContainer = document.getElementById(
                    "Audio-lottie-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path: "/img/Animated Adbanao home page icons/audio.json" // Replace with the path to your JSON file
                });
                var animationContainer = document.getElementById(
                    "custom-audio-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path: "/img/Animated Adbanao home page icons/Custom Audio.json" // Replace with the path to your JSON file
                });
                var animationContainer = document.getElementById(
                    "multilingual-audio-animation"
                );
                var animation = bodymovin.loadAnimation({
                    container: animationContainer,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    path:
                        "/img/Animated Adbanao home page icons/Multilingual Content.json" // Replace with the path to your JSON file
                });
            }, 200);
        }
    }
});

// for our_customer_speak_section
let our_customer_speak_section = true;
$(window).on("scroll", function () {
    if (our_customer_speak_section) {
        if (isElementInView("#our_customer_speak_section")) {
            our_customer_speak_section = false;
            $("#viewVideoIframe")
                .append(`   <iframe class="videoIframe1" src="https://www.youtube.com/embed/zUJGQ_lxvko"
        title="YouTube video player" frameborder="0" allow="autoplay; clipboard-write; "
        allowfullscreen></iframe>  `);
        }
    }
});

// for counting
let counting = true;
$(window).on("scroll", function () {
    if (counting) {
        if (isElementInView("#counting")) {
            counting = false;
            $("#viewcounting").append(`<div class="row counter-div">
        <div class="counter-main">
            <div class="counter_title">
                <h6><samp id="businessRegisteredNumber"></samp> Lac+</h6>
            </div>
            <div class="counter_decription">
                <p>Business
                    Registered</p>
            </div>
        </div>
        <div class=" counter-main">
            <div class="counter_title">
                <h6><samp id="SubIndustry"></samp>+</h6>
            </div>
            <div class="counter_decription">
                <p>Sub
                    Industries</p>
            </div>
        </div>

        <div class="counter-main">
            <div class="counter_title">
                <h6 id="language"></h6>
            </div>
            <div class="counter_decription">
                <p>Regional Language
                </p>
            </div>
        </div>
        <div class=" counter-main">
            <div class="counter_title">
                <h6><samp id="templateNumber"></samp> Lac+</h6>
            </div>
            <div class="counter_decription">
                <p>Creative
                    Template</p>
            </div>
        </div>
        <div class="counter-main">
            <div class="counter_title">
                <h6><samp id="readyMedeNumber"></samp> Lac+</h6>
            </div>
            <div class="counter_decription">
                <p>Readymade
                    Videos</p>
            </div>
        </div>
        <div class="counter-main">
            <div class="counter_title">
                <h6 id="whatsappstickerNumber"></h6>
            </div>
            <div class="counter_decription">
                <p>Whatsapp
                    Stickers</p>
            </div>
        </div>
    </div> `);
        }
        setTimeout(() => {
            document.documentElement.style.setProperty("--animate-duration", "5s");
            // Search box function
            // ---- ---- Search Const ---- ---- //
            // Target the HTML element you want to animate
            // Function to check if an element is in the viewport

            function isInViewport(element) {
                var $element = $(element);
                var elementTop = $element.offset().top;
                var elementHeight = $element.outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportHeight = $(window).height();

                var elementBottom = elementTop + elementHeight;
                var viewportBottom = viewportTop + viewportHeight;

                return elementBottom > viewportTop && elementTop < viewportBottom;
            }

            // Target the HTML element you want to animate
            var element = document.getElementById("counting");

            // Function to start the animation when element is in the viewport
            // Because Number Speaks itself! section animation
            function animateIfVisible() {
                if (isInViewport(element)) {
                    // Number counter animation
                    function counterAnimation(elementId, targetValue) {
                        $(elementId).text(targetValue);
                        $(elementId).each(function () {
                            $(this).prop("Counter", 0).animate(
                                {
                                    Counter: $(this).text()
                                },
                                {
                                    duration: 2000,
                                    easing: "swing",
                                    step: function (now) {
                                        $(this).text(Math.ceil(now));
                                    }
                                }
                            );
                        });
                    }
                    counterAnimation("#businessRegisteredNumber", 20);
                    counterAnimation("#SubIndustry", 1400);
                    counterAnimation("#language", 11);
                    counterAnimation("#templateNumber", 50);
                    counterAnimation("#readyMedeNumber", 10);
                    counterAnimation("#whatsappstickerNumber", 2000);
                    window.removeEventListener("scroll", animateIfVisible);
                }
            }

            // Add event listener to trigger animation on scroll
            window.addEventListener("scroll", animateIfVisible);

            // Check if element is already in the viewport when the page loads
            animateIfVisible();
        }, 200);
    }
});
// for testimonialsview
let testimonialsview = true;
$(window).on("scroll", function () {
    if (testimonialsview) {
        if (isElementInView("#testimonialsview")) {
            testimonialsview = false;
            $("#viewtestimonials")
                .append(`<div class="swiper testimonials-swiper">
      <div class="swiper-wrapper">
          <div class="swiper-slide video-gallery">
              <div class="col-12 video-container">
                <div class="video-play">
                  <a data-fancybox="video-gallery2"
                      href="https://www.youtube.com/embed/T8DxLiAOi4g">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/Avadhut_Lohokare_adbanao_youtube.jpg"
                          alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                  </a>
                    </div>

                  <div class="video-title">
                      <p class="business">Jewellery</p>
                      <p class="address">Newasa(MH)</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr.Avadhut Lohokare</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" 
                      href="https://www.youtube.com/embed/x5r_Wd5FpoI">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/Shreya-Electronics-Hindi-Thumbnail.jpg"
                          alt="Shreya Electronics Hindi Thumbnail">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                          </div>

                  <div class="video-title">
                      <p class="business">Shreya Electronics</p>
                      <p class="address">Pune (New Sangvi)</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr. Shailesh Bomble</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2"
                      href="https://www.youtube.com/embed/oe15lTUJwIg">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/Mahavir_Gandhi.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business">Apparel & Clothing</p>
                      <p class="address">Bhingar(Ahmednagar)</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr. Mahavir Gandhi</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/r5b4LIrFb5Y">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/Sujata_Deolalikar.jpg"
                          alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business"> Beauty, Cosmetic & Personal Care </p>
                      <p class="address">Ahmednagar</p>
                  </div>
                  <div class="video-shop">
                      <p>Sujata Deolalikar</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/dgbuezX1Ulc">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/Samarth_Mobile.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business"> Mobile & Accessories </p>
                      <p class="address">Parner(Maharashtra)</p>
                  </div>
                  <div class="video-shop">
                      <p>Samartha Mobile</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/wi-1bS8H8yM">
                      <img class="card-img py-2" src="/img/youtube_video_thumbnail/Ajit_Pawar.jpg"
                          alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business">Electrical, Electronics, Appliances</p>
                      <p class="address">Kedgaon(MH)</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr. Ajit Pawar</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/mj94ppecfhc">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/Mininath_Chavan.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business">Electricals, Electronics & Appliances</p>
                      <p class="address">Ahmednagar</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr. Mininath Chavan</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/kOcS-nRvqxc">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/GauravKarhade.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business"> Real Estate </p>
                      <p class="address">Ahemadnagar, Pune</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr. Gaurav Karhade</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/cJ71DmTubjE">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/Neha_Gurbani.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business"> Supermarket & Grocery Store </p>
                      <p class="address">Savedi(Maharashtra)</p>
                  </div>
                  <div class="video-shop">
                      <p>Neha Gurbani</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/Vxje13W-peU">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/Navid Shaikh.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business"> Eye Clinic </p>
                      <p class="address">Ahmednagar</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr. Navid Shaikh</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/xgsr63-YAiA">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/sayali_kumbhar.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business">Tattoos XI </p>
                      <p class="address">Pune</p>
                  </div>
                  <div class="video-shop">
                      <p>Sayali Kumbhar</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/siVqt9OcXpk">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/saurabh_shinde.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business">SS Hair Studio </p>
                      <p class="address">Ahmednagar</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr. Saurabh Shinde</p>
                  </div>
              </div>
          </div>
          <div class="swiper-slide">
              <div class="col-12 video-container">
              <div class="video-play">
              <a data-fancybox="video-gallery2" href="https://www.youtube.com/embed/HLrC5dAgN5s">
                      <img class="card-img py-2"
                          src="/img/youtube_video_thumbnail/milind_kulkarni.jpg" alt="Card image">
                      <img class="play-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                          alt="youtube icon" class="mx-auto my-auto w-25">
                          </a>
                  </div>
                  <div class="video-title">
                      <p class="business">Vivekanand Spoken English</p>
                      <p class="address">Pune</p>
                  </div>
                  <div class="video-shop">
                      <p>Mr.Milind Kulkarni</p>
                  </div>
              </div>
          </div>
      </div>
      <div class="swiper-pagination"></div>
  </div> `);
        }
        setTimeout(() => {
            var swiper = new Swiper(".testimonials-swiper ", {
                slidesPerView: 3,
                spaceBetween: 30,
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 40 },
                    360: { slidesPerView: 1, spaceBetween: 10 },
                    480: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 4, spaceBetween: 20 }
                }
            });
        }, 200);
    }
});

// for testimonialsview
let mediaAwards = true;
$(window).on("scroll", function () {
    if (mediaAwards) {
        if (isElementInView("#mediaAwards")) {
            mediaAwards = false;
            $("#viewtrusted").append(`   <!-- Swiper -->
        <div class="swiper trusted_companies_swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="media-award">
                        <img src="/img/mediaandaward/msme.png" alt="msme">
                    </div>
                </div>
                <div class="swiper-slide">
                <a href="https://www.hindustantimes.com/cities/pune-news/startup-mantra-economical-branding-solutions-gaining-traction-101671878019705.html"target="_blank">
                <div class="media-award">
                    <img src="/img/mediaandaward/hindustantime.png" alt="hindustantime">
                </div>
                </a>
            </div>
            <div class="swiper-slide">
            <a href="https://indianexpress.com/article/cities/pune/an-app-for-small-businesses-to-create-ads-pune-entrepreneurs-brainchild-8524499/"
        target="_blank">
            <div class="media-award">
                <img src="/img/mediaandaward/indianexress.png" alt="the india express">
            </div>
            </a>
        </div>
                <div class="swiper-slide">
                    <a href="https://epaper.enavabharat.com/article-20-january-2023-pune-edition-navabharat-pun/2-10/"
                target="_blank" >
                    <div class="media-award">
                        <img src="/img/mediaandaward/navbhart.png" alt="navbhart">
                    </div>
                    </a>
                </div>
                <div class="swiper-slide">
                <a href="https://www.esakal.com/pune/adbanao-startup-to-boost-business-growth-pjp78" target="_blank"
        >
                <div class="media-award">
                    <img src="/img/mediaandaward/sakal.png" alt="sakal">
                </div>
                </a>
            </div>
            <div class="swiper-slide">
                <a href="http://epunyanagari.com/editionpage.php?edn=Smart%20Pune&date=2023-01-26&edid=PNAGARI_PUS&pid=PNAGARI_PU&issueid=PNAGARI_PUS_20230203&pn=1#Page/7"
            target="_blank">
                <div class="media-award">
                    <img src="/img/mediaandaward/punenagri.png" alt="punenagri">
                </div>
                </a>
            </div>
                <div class="swiper-slide">
                <a href="https://epaper.navarashtra.com/article-21-february-2023-pune-edition-pune-plus/4-3/"
            target="_blank">
                <div class="media-award">
                    <img src="/img/mediaandaward/navrashtra.png" alt="navrashtra">
                </div>
                </a>
            </div>
            <div class="swiper-slide">
                <a href="http://www.dailykesari.com/epaper/PaperPdf/Pune/21022023Pune.pdf"
                target="_blank">
                <div class="media-award">
                    <img src="/img/mediaandaward/kesari.png" alt="kesari">
                </div>
                </a>
            </div>
            <div class="swiper-slide">
                <a href="https://www.punekarnews.in/adbanao-rolls-out-attractive-plans-for-small-businesses-make-creatives-for-less-than-rs-one/"
                target="_blank">
                <div class="media-award">
                    <img src="/img/mediaandaward/punekar.png" alt="punekar">
                </div>
                </a>
            </div>
            </div>
        </div>`);
        }
        setTimeout(() => {
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
        }, 200);
    }
});

// for testimonialsview
let featuredBlog = true;
$(window).on("scroll", function () {
    if (featuredBlog) {
        if (isElementInView("#featuredBlog")) {
            featuredBlog = false;
            $.ajax({
                url: `${base_url}` + "/blog/getAllBlogs",
                type: "GET",
                success: function (response) {
                    if (response.status == true) {
                        let arrOfBlog = response.data.data;
                        let blogItem = "";
                        arrOfBlog.forEach((obj, i) => {
                            console.log(countWords(obj.title));
                            blogItem = `  <div class="item blogCount">
                              <a href="${base_url +
                                "/blog-details/" +
                                obj.unique_url}" data-blogcatid="63e3305cf6568a022f65a75f" onclick="header.addblogids(this)">
                              <div class="blog-main-container">
                              <div class="blog-img">
                                  <img src="${obj.image[0].icon_url}"alt="">
                              </div>
                              <div class="blog-title">
                                  <h6> ${countWords(obj.title) >= 15
                                    ? obj.title.slice(0, 60) + "..."
                                    : obj.title}</h6>
                              </div>
                              <div class="flex-details">
                                  <div class="dateandread">
                                      <div class="blog-date">
                                          <samp>${moment(obj.date).format(
                                        "LL"
                                    )}</samp>
                                      </div>
                                      <div class="blog-read-more">
                                          <samp>Read More</samp>
                                          <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                      </div>
                                  </div>
                              </div>
                           
                          </div>    
          
                              </a>
                          </div>`;
                            $("#blogCarasoul").append(blogItem);
                        });
                        $("#blogCarasoul").owlCarousel({
                            loop: true,
                            //nav:true,
                            margin: 10,
                            hideNav: true,
                            autoplay: false,
                            autoHeight: true,
                            autoHeightClass: "owl-height",
                            dots: false,
                            responsiveClass: true,
                            responsive: {
                                0: {
                                    items: 1
                                },
                                600: {
                                    items: 3
                                },
                                768: {
                                    items: 2
                                },
                                1440: {
                                    items: 4
                                },
                                1024: {
                                    items: 4
                                }
                            }
                        });
                    }
                }
            });
        }
    }
    function countWords(str) {
        // Remove leading/trailing spaces and split the string by spaces
        var words = str.trim().split(/\s+/);
        return words.length;
    }
});
