$("#career-jobform").submit(function(e) {
  return false;
});
$(".massge").hide();
$("#loader-file").hide();
 // Function to clear or remove error messages
 function clearErrorMessages() {
  $('#career-jobform').find('.error').each(function() {
      $(this).empty(); // Clear the error message content
      // Alternatively, you can hide the error messages:
      // $(this).hide();
  });
}
var myModal = new bootstrap.Modal(document.getElementById('careerModal'));

myModal._element.addEventListener('hidden.bs.modal', function (e) {
    // Perform actions when the modal is closed
  clearErrorMessages();
    // Add your custom actions here
});


$("#careersub").click(function(e) {
  $("#career-jobform").validate({
    rules: {
      jobformfname: {
        required: true
      },
      jobformlname: {
        required: true
      },
      jobformemail: {
        required: true,
        email: true
      },
      mobile_number: {
        required: true
      },
      jobformcity: {
        required: true
      },
      jobformposition: {
        required: true
      },
      jobformstart: {
        required: true
      },

      jobformcvfile: {
        required: true
      }
    },
    messages: {
      jobformfname: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter First name</span>"
      },
      jobformlname: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Last name</span>"
      },
      jobformemail: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Email</span>"
      },

      mobile_number: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Contact Number</span>"
      },
      jobformcity: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter City</span>"
      },
      jobformposition: {
        required:
          "<span style='font-size:14px; color: red;'>Please Select Position</span>"
      },
      jobformstart: {
        required:
          "<span style='font-size:14px; color: red;'>Please Select Start date</span>"
      },
      jobformcvfile: {
        required:
          "<span style='font-size:14px; color: red;'>Please Select File</span>"
      }
    },

    submitHandler: function(err) {
      carrerformSubmition();
      $("#careersub").attr("disabled");
    }
  });
});

function carrerformSubmition() {

  let careerobj = {};
  careerobj.name = $("#jobformfname").val();
  careerobj.email = $("#jobformemail").val();
  careerobj.mobile = $("#mobile_number").val();
  careerobj.city = $("#jobformcity").val();
  careerobj.position = $("#jobformposition").val();
  careerobj.startdate = $("#jobformstart").val();
  careerobj.experience = $("#jobformexperience").val();
  careerobj.cv_url = $("#jobformcvfile").attr("data-url");
  careerobj.recaptchaResponse = grecaptcha.getResponse();
  if(careerobj.recaptchaResponse  === ''){
    alert("Please Validate Captcha")
  }else{
    $("#loader-file").show();
    $("#careersub").text("Please Wait...");
    $.ajax({
      url: "https://www.adbanao.com/career/send-career-email",
      contentType: "application/json; charset= utf-8",
      type: "POST",
      data: JSON.stringify(careerobj),
      dataType: "json",
      success: function(data) {
        if ((data.status = true)) {
          $("#career-jobform").hide();
          $("#loader-file").hide();
          $("#careerModalLabel").text(
            `Thank you, ${careerobj.firstName} , for reaching out to us! We appreciate your interest.`
          );
          $("#massege").hide();
        }
      },
      // Error handling
      error: function(error) {
        $("#careerModalLabel").text(
          `Oops! There was an error processing your request. Please try again later.`
        );
      }
    });
  }

}

async function UPLOAD_ICON(dataArray, event) {
  $("#loader-file").show();
  // Initialize AWS SDK with your credentials
  AWS.config.region = "ap-south-1";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-south-1:b7895b86-e6fc-4674-9c2b-78fb3878e245"
  });
  var bucketName = "adbanao";
  var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: {
      Bucket: bucketName
    }
  });
  let data = {
    id: $(dataArray).attr("id"),
    "progress-bar": $(dataArray).attr("data-progress-bar"),
    "append-class": $(dataArray).attr("data-append-class"),
    "common-class": $(dataArray).attr("data-common-class"),
    "subfolder-name": $(dataArray).attr("data-subfolder-name"),
    "data-is-multiple": $(dataArray).attr("data-is-multiple")
  };
  if (data["data-is-multiple"] == "false") {
    if ($("." + data["common-class"]).length > 0) {
      swal("Error", "You can't upload multiple files", "error");
      return false;
    }
  }
  var fuData = document.getElementById(data["id"]);
  var FileUploadPath = fuData.value;
  if (FileUploadPath == "") {
  } else {
    var Extension = FileUploadPath.substring(
      FileUploadPath.lastIndexOf(".") + 1
    ).toLowerCase();
    if (Extension == "pdf" || Extension == "PDF" || Extension == "jpeg") {
      $("#" + data["progress-bar"]).css("width", "0%");
      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      for (var i = 0; i < event.target.files.length; i++) {
        var imageFile = event.target.files[i];
        let img = new Image();
        img.src = window.URL.createObjectURL(imageFile);

        if (imageFile.size <= 1000000) {
          var filePath =
            "adbanao/" +
            data["subfolder-name"] +
            "/" +
            date +
            "/" +
            uuidv4() +
            "." +
            Extension;
          await s3.upload(
            {
              Key: filePath,
              Body: imageFile,
              ACL: "public-read"
            },
            async function(err, data1) {
              if (err) {
                console.log(err, "error");
              } else {
                $("#loader-file").attr("src", "/img/event-tick.png");
                $("#jobformcvfile").attr("data-url", data1.Location);
                $("#file-upload-error").text("File uploaded successefully");
                $("#file-upload-error").removeClass("file-error");
                $("#file-upload-error").addClass("file-success");
              }
            }
          );
        } else {
          console.log("file upload");
          $("#loader-file").hide();
          $("#file-upload-error").text("File upload size is more then 5mb");
          $("#file-upload-error").addClass("file-error");
          $("#jobformcvfile").val("");
        }
      }
    } else {
      console.log("file upload error");
      $("#loader-file").hide();
      $("#file-upload-error").text(
        "File upload wrong format please upload pdf"
      );
      $("#file-upload-error").addClass("file-error");
      $("#jobformcvfile").val("");
    }
  }
}
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] &
        (15 >> (c / 4)))).toString(16)
  );
}
