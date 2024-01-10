$(document).ready(async function() {
    // console.log("unique url",unique_url)
    $.ajax({
    //   url: blog_url + "/blogs/get_blog_details/" +unique_url,
      url: base_url + "/blog/getBlogDetails/" +unique_url,
      type: "GET",
      success: function(response) {
        let blogsMarkup = ""
        let blogDate = moment(response.data.data.BlogData[0].date).format("DD-MM-YYYY");

        if (response.status) {
            if(response.data.data.BlogData[0].blog_meta_tags == null){
                $(".blog_metatag").attr("content","Karnataka elections 2023, Yediyurappa, b s yediyurappa, Jagdish Shettar, siddaramaiah,,jds photos, jds kumarswamy, nalin kumar kateel,narendra modi images,modi karnataka,rahul gandhi karnataka,kiccha sudeep,sudeep bjp photos,kannadiga, dk aruna, dk shivakumar, bommai cm, bommai images") 
            }else{
                $(".blog_metatag").attr("content",response.data.data.BlogData[0].blog_meta_tags)
            }
            response.data.data.BlogData[0].unique_url == null? $(".linkSend").attr("content","Adbanao Blog"): $(".linkSend").attr("content",`http://www.adbanao.com/blog-details/${response.data.data.BlogData[0].unique_url}`)
            response.data.data.BlogData[0].title == null ? $(".linkTitle").attr("content","Adbanao Blog"): $(".linkTitle").attr("content",response.data.data.BlogData[0].title)
            response.data.data.BlogData[0].title == null ? $(".main_title").text("Adbanao Blog"): $(".main_title").text(response.data.data.BlogData[0].title)
            response.data.data.BlogData[0].meta_dec == null ?  $(".meta_description").attr("content","Adbanao Blog"):  $(".meta_description").attr("content",response.data.data.BlogData[0].meta_dec)
            $(".canonical").attr("content",response.data.data.BlogData[0].image[0].icon_url)
            $(".canonical-link").attr("href",response.data.data.BlogData[0].image[0].icon_url)
            blogsMarkup = `   <div class="blog_main_banner_div">
            <div class="blog_main_banner">
                <img src="${response.data.data.BlogData[0].image[0].icon_url}" alt="">
            </div>
            <div class="black_button">
             <a href="/blogs">
                <button class="bg-warning" >
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    <p>Back</p>
                </button>
                </a>
            </div>
        </div>
        <div class="row">
            <div class="blog_details col-md-12">
                <div class="row">
                    <div class="blog_title col-md-12">
                        <h1>${response.data.data.BlogData[0].title}</h1>
                    </div>
                    <div class="blog_date col-md-2">
                        <p class="text-right">${blogDate}</p>
                    </div>
                </div>
             
                <div >
                    <h6 style="color: #000">${response.data.data.BlogData[0].description}</h6>
                </div>
                <div class="blogDetails" style="color: #000 !importent">
                    <p>${response.data.data.BlogData[0].detail_description}</p>
                </div>
                <div class="d-flex align-items-center justify-content-center showdropdown">
        
                <div class="dropdown">
                    <a class="sharebutton dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span><i class="fa fa-share-alt" aria-hidden="true"></i></span> 
                    Share With Your Friends</a>

                        <div class="dropdown-menu shareDropdown" aria-labelledby="dropdownMenuLink">
                            <input type="text" id="copyUrl" class="" style="height: 0; border: none !important;">
                            <a class="dropdown-item share-item" href="https://facebook.com/sharer/sharer.php?u=${base_url +'/blogs/blog-details/' + response.data.data.BlogData[0].unique_url}" target="_blank"> <span><img src="/img/blog_social_icon/facebook.svg" alt=""></span> Share on Facebook</a>
                            <a class="dropdown-item share-item" href="https://twitter.com/intent/tweet/?text=${base_url +'/blogs/blog-details/' + response.data.data.BlogData[0].unique_url}" target="_blank"> <span><img src="/img/blog_social_icon/twitter.svg" alt=""></span>Share on Twitter</a>
                            <a class="dropdown-item share-item" href="mailto:?subject=${base_url +'/blogs/blog-details/' + response.data.data.BlogData[0].unique_url}" target="_blank"> <span><img src="/img/blog_social_icon/mail.svg" alt=""></span>Share on Email</a>
                            <a class="dropdown-item share-item" href="javascript:void(0);" onclick="copytoClipboard(this)" data-url="${base_url +'/blogs/blog-details/' + response.data.data.BlogData[0].unique_url}"> <span><img src="/img/blog_social_icon/link.svg" alt=""></span>Share on Link</a>
                            <a class="dropdown-item share-item" href="https://api.whatsapp.com/send/?text=${base_url +'/blogs/blog-details/' + response.data.data.BlogData[0].unique_url}" target="_blank"> <span><img src="/img/blog_social_icon/whatsapp.svg" alt=""></span>Share on Whatsapp</a>
                        </div>
                </div>
            </div>
  
            </div>
  
  
        </div>`
          $("#renderblogs").empty(blogsMarkup);
  
          $("#renderblogs").append(blogsMarkup);
        } else {
          $(".blogsSection").hide();
        }
      }
    });

  });

  function copytoClipboard(e){
    $("body").append('<input id="copyURL" type="text" value="" />');
    $("#copyURL").val(window.location.href).select();
    document.execCommand("copy");
    $("#copyURL").remove();            
}
  //------------------------------------------------------------------------
//   $(document).ready(async function(){
//     // console.log(blog_url)
//     $.ajax({
//         url: blog_url + "/blogs/get_all_blogs",
//         type: "GET",
//         success: function (response) {
//             if(response.status == true){
//                 let arrOfBlog  = response.data
//                 let blogItem = ""
//                 arrOfBlog.forEach((obj,i)=>{
                    
//                     blogItem = `<div class="item blogCount">
//                     <a href="${base_url +'/blogs/blog-details/' + obj.unique_url}" data-blogcatid="63e3305cf6568a022f65a75f" onclick="header.addblogids(this)">
//                         <div class="featured_blog_container">
//                         <div class="featured_blog_Imge">
//                             <img src="${obj.thumbnail_image[0].icon_url}" alt="Secret Alchemist is NOW part of the Luke Curated Family">
//                         </div>
//                         <div class="featured_blog_card">
//                             <div class="featured_blogContent">
                          
//                                 <div class="featured_blogTitle">
//                                 ${obj.title}
//                                 </div>
        
//                             </div>
//                         </div>
//                         </div>
//                     </a>
//                 </div>`
//                                 $("#blogCarasoul").append(blogItem)
//                 })
//                 $('#blogCarasoul').owlCarousel({
//                     loop:true,
//                     //nav:true,
//                     margin: 10,
//                     hideNav : true,
//                     dots: false,
//                     autoplay: false,
//                     responsiveClass:true,
//                     responsive:{
//                         0:{
//                             items:1
//                         },
//                         600:{
//                             items:3
//                         },
//                         768:{
//                            items:2
//                         },
//                         1440:{
//                             items:4
//                         },
//                         1024:{
//                            items:4
//                         }
                        
//                     }
//                    });
                
//             }
//         },
//     });
  
//   })
  