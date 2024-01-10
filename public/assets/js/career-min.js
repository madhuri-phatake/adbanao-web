function carrerformSubmition() {
  $("#loader-file").show(), $("#careersub").text("Please Wait...");
  let e = {};
  (e.firstName = $("#jobformfname").val()), (e.lastName = $(
    "#jobformlname"
  ).val()), (e.email = $("#jobformemail").val()), (e.phone = $(
    "#mobile_number"
  ).val()), (e.city = $("#jobformcity").val()), (e.position = $(
    "#jobformposition"
  ).val()), (e.startdate = $("#jobformstart").val()), (e.experience = $(
    "#jobformexperience"
  ).val()), (e.cv_url = $("#jobformcvfile").attr("data-url")), $.ajax({
    url: "http://localhost:5002/career/send-career-email",
    contentType: "application/json; charset= utf-8",
    type: "POST",
    data: JSON.stringify(e),
    dataType: "json",
    success: function(r) {
      (r.status = !0), $("#career-jobform").hide(), $("#loader-file").hide(), $(
        "#careerModalLabel"
      ).text(
        `Thank you, ${e.firstName} , for reaching out to us! We appreciate your interest.`
      ), $("#massege").hide();
    },
    error: function(e) {
      $("#careerModalLabel").text(
        "Oops! There was an error processing your request. Please try again later."
      );
    }
  });
}
async function UPLOAD_ICON(e, r) {
  $("#loader-file").show(), (AWS.config.region =
    "ap-south-1"), (AWS.config.credentials = new AWS.CognitoIdentityCredentials(
    { IdentityPoolId: "ap-south-1:b7895b86-e6fc-4674-9c2b-78fb3878e245" }
  ));
  var a = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "adbanao" }
  });
  let o = {
    id: $(e).attr("id"),
    "progress-bar": $(e).attr("data-progress-bar"),
    "append-class": $(e).attr("data-append-class"),
    "common-class": $(e).attr("data-common-class"),
    "subfolder-name": $(e).attr("data-subfolder-name"),
    "data-is-multiple": $(e).attr("data-is-multiple")
  };
  if ("false" == o["data-is-multiple"] && $("." + o["common-class"]).length > 0)
    return swal("Error", "You can't upload multiple files", "error"), !1;
  var t = document.getElementById(o.id).value;
  if ("" == t);
  else {
    var l = t.substring(t.lastIndexOf(".") + 1).toLowerCase();
    if ("pdf" == l || "PDF" == l || "jpeg" == l) {
      $("#" + o["progress-bar"]).css("width", "0%");
      for (
        var i = new Date(),
          s = i.getDate() + "-" + (i.getMonth() + 1) + "-" + i.getFullYear(),
          n = 0;
        n < r.target.files.length;
        n++
      ) {
        var d = r.target.files[n];
        ((new Image().src = window.URL.createObjectURL(d)), d.size <= 1e6)
          ? await a.upload(
              {
                Key:
                  "adbanao/" +
                  o["subfolder-name"] +
                  "/" +
                  s +
                  "/" +
                  uuidv4() +
                  "." +
                  l,
                Body: d,
                ACL: "public-read"
              },
              async function(e, r) {
                e
                  ? console.log(e, "error")
                  : (
                      $("#loader-file").attr("src", "/img/event-tick.png"),
                      $("#jobformcvfile").attr("data-url", r.Location),
                      $("#file-upload-error").text(
                        "File uploaded successefully"
                      ),
                      $("#file-upload-error").removeClass("file-error"),
                      $("#file-upload-error").addClass("file-success")
                    );
              }
            )
          : (
              console.log("file upload"),
              $("#loader-file").hide(),
              $("#file-upload-error").text("File upload size is more then 5mb"),
              $("#file-upload-error").addClass("file-error"),
              $("#jobformcvfile").val("")
            );
      }
    } else
      console.log("file upload error"), $("#loader-file").hide(), $(
        "#file-upload-error"
      ).text("File upload wrong format please upload pdf"), $(
        "#file-upload-error"
      ).addClass("file-error"), $("#jobformcvfile").val("");
  }
}
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, e =>
    (e ^
      (crypto.getRandomValues(new Uint8Array(1))[0] &
        (15 >> (e / 4)))).toString(16)
  );
}
$("#career-jobform").submit(function(e) {
  return !1;
}), $(".massge").hide(), $("#loader-file").hide(), $(
  "#careersub"
).click(function(e) {
  $("#career-jobform").validate({
    rules: {
      jobformfname: { required: !0 },
      jobformlname: { required: !0 },
      jobformemail: { required: !0, email: !0 },
      mobile_number: { required: !0 },
      jobformcity: { required: !0 },
      jobformposition: { required: !0 },
      jobformstart: { required: !0 },
      jobformcvfile: { required: !0 }
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
          "<span style='font-size:14px; color: red;'>Please enter Contect Number</span>"
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
    submitHandler: function(e) {
      carrerformSubmition(), $("#careersub").attr("disabled");
    }
  });
});
