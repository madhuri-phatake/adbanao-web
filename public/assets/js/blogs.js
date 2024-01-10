
$(document).ready(async function() {
  // console.log("hello")
  $.ajax({
    // url: blog_url + "/blogs/get_all_blogs_no_limit",
    url: base_url + "/blog/getAllBlogsNoLimit",
    type: "GET",
    success: function(response) {

      if (response.status == true) {
        let arrOfBlog = response.data.data;
        let blogItem =  "";
        arrOfBlog.forEach((obj, i) => {
     
          blogItem = `  <div class="col-lg-4 col-md-4 ">
                    <a href="${base_url +'/blog-details/' + obj.unique_url}" >
                    <div class="item  blogcard ">
                        <div class=" bloggallary " >
                            <div class="blog_image_add">
                                <img src="${obj.image[0].icon_url}"  class="img_in_div"  alt="Example Image">
                            </div>
                            <div class="text">
                                <h6 class="blog_text_in_div ">${obj.title}</h6>
                            </div>
                        </div>
                    </div>
                </a>
                                        </div>`;
          $("#blog_row").append(blogItem);
        });
      }
    }
  });
});
function copytoClipboard(e) {
    const recipeUrl = $(e).attr("data-url");

    let copyCurrentUrl = document.getElementById("copyUrl");
    copyCurrentUrl.value = recipeUrl;


    copyCurrentUrl.select();
    document.execCommand('copy')
    
    // navigator.clipboard.writeText(recipeUrl);
    toastr.success('Link Copied!', 'Success');

}