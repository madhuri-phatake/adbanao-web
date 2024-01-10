$("#contactUs").submit(function(e) {
  return false;
});
$(".massge").hide();
$("#loader").hide();
$("#contact-btn").click(function(e) {
  $("#contactUs").validate({
    rules: {
      firstName: {
        required: true
      },
      lastName: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      }
    },
    messages: {
      firstName: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter First name</span>"
      },
      lastName: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Last name</span>"
      },
      email: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Email</span>"
      },
      phone: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Phone</span>"
      }
    },

    submitHandler: function() {
      contactUsformSubmition();
      $("#contact-btn").attr("disabled");
    }
  });
});

function contactUsformSubmition() {
  let contactobj = {};
  contactobj.firstName = $("#firstName").val();
  contactobj.lastName = $("#lastName").val();
  contactobj.email = $("#email").val();
  contactobj.phone = $("#phone").val();
  contactobj.message = $("#message").val();
  const currentURL=window.location.origin
   // Get the reCAPTCHA response
  contactobj.recaptchaResponse = grecaptcha.getResponse();
  if(contactobj.recaptchaResponse  === ''){
    alert("Please Validate Captcha")
  }else{
     $("#loader").show();
    $.ajax({
      url: "https://www.adbanao.com/send-email",
      contentType: "application/json; charset= utf-8",
      type: "POST",
      data: JSON.stringify(contactobj),
      dataType: "json",
      success: function(data) {
        if ((data.status = true)) {
          $("#contactUs").hide();
          $("#form-title").text(
            `Thank you, ${contactobj.firstName} for reaching out to us! We appreciate your interest.`
          );
          $(".massge").show();
        }
      },
      // Error handling
      error: function(error) {
        console.log(`Error ${error}`);
        $("#form-title").text(
          `Oops! There was an error processing your request. Please try again later.`
        );
      }
    });
  }

}
