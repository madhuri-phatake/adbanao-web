var element = "";
var cards = "";

$(document).ready(async function () {
    // for get industries data
    const industries = await fetch(base_url + "/api/get_sub_industry_data", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then((data) => {
            return data.data;
        });
    // console.log("-------------------->",industries);
    industries.data.forEach((item, e) => {
        // console.log("industry:", item.sub_industry);
        element += `<div class="col d-flex justify-content-center col-lg-3 col-md-4 col-sm-12 col-xs-12 mb-4"><a href="${item.website_sub_industry_url}"><div class="card " style="width: 15rem;height:14rem;">
        <div class="pt-0 mx-0 px-5 py-2  ">
  <img src="${item.img_path}" class="card-img-top " alt="${item.sub_industry}" style="box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19);" >
  </div>
  <div class="card-body py-2">
    <h5 class="card-title text-center text-justify" style="font-size:14px;">${item.sub_industry}</h5>  
  </div>
</div></a></div>`;
    })
    $("#industries_data").append(element);

});
window.addEventListener('load', function () {
    $(".loader_section").hide();
})

