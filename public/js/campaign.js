let campaign = {
  base_url: null,
  canvas: null,
  token: null,
  userId: null,
  templateId: null,
  template: null,
  userPlan: null,
  canvasHeight: null,
  canvasWidth: null,
  init: async function () {
    const idToken = await campaign.getIdToken();
    this.token = idToken;
    this.bind_events();
    const template = await campaign.getTemplate();
    this.template = template;
    const userPlanInfo = await campaign.getUserPlanInfo();
    this.userPlan = userPlanInfo;
    this.setUserTemplateValues();
    this.initTemplate();
    // this.initFabric();
  },

  bind_events: function () {
    const self = this;

    const urlSearchParams = new URLSearchParams(window.location.search);
    const { u, t } = Object.fromEntries(urlSearchParams.entries());
    self.userId = u;
    self.templateId = t;
  },

  getIdToken: async function () {
    return new Promise(async (callback) => {
      try {
        // Sign in user
        await firebase.auth().signInAnonymously();
        const idToken = await firebase.auth().currentUser.getIdToken();
        callback(idToken);
      } catch (error) {
      }
    });
  },

  getTemplate: async function () {
    const self = this;


    return new Promise(async (callback) => {
      var baseUrl = self.base_url;
      var testTemplateId = self.templateId;

      let payload = {
        template_id: testTemplateId,
      };

      fetch(baseUrl + "get_template", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: self.token,
        },
        body: JSON.stringify(payload),
      })
        .then((value) => {
          return value.json();
        })
        .then((val) => {
          
          callback(val.data);
        });
    });
  },

  getUserPlanInfo: async function () {
    const self = this;

    return new Promise(async (callback) => {
      var baseUrl = self.base_url;
      var userId = self.userId;

      let payload = {
        user_id: userId,
      };

      fetch(baseUrl + "getuser_planinfo", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: self.token,
        },
        body: JSON.stringify(payload),
      })
        .then((value) => {
          return value.json();
        })
        .then((val) => {
          callback(val.data);
        });
    });
  },

  setUserTemplateValues: async function () {
    const self = this;
    var user = self.userPlan.user_info;

    var testTemplate = self.template;
    var textList = [];
    var imageList = [];
	console.log(testTemplate.text)
    testTemplate.text.forEach((element) => {
      if (element.brand_element != null && element.brand_element.length != 0) {
        var userBrandElement = this.getUserBrandElement(
          element.brand_element,
          user
        );

        if (userBrandElement != null && userBrandElement.length != 0) {
          element.text = userBrandElement;
          textList.push(element);
        }
      } else {
        textList.push(element);
      }
    });

    for (const element in testTemplate.images) {
      if (
        testTemplate.images[element].brand_element != null &&
        testTemplate.images[element].brand_element.length != 0 &&
        testTemplate.images[element].brand_element == "Social Media"
      ) {
        // const iconList = await self.getPackById(
        //   testTemplate.social_media_pack_id
        // );
        imageList.push(testTemplate.images[element]);
        // self.addSocialMediaImage(iconList, testTemplate.images[element]);
      } else if (
        testTemplate.images[element].brand_element != null &&
        testTemplate.images[element].brand_element.length != 0 &&
        testTemplate.images[element].brand_element != "Social Media"
      ) {
        const userBrandElement = this.getUserBrandElement(
          testTemplate.images[element].brand_element,
          user
        );

        if (userBrandElement != null && userBrandElement.length != 0) {
          testTemplate.images[element].image_url = userBrandElement;
          imageList.push(testTemplate.images[element]);
        }
      } else {
        imageList.push(testTemplate.images[element]);
      }
    }

    testTemplate.text = textList;
    testTemplate.images = imageList;

    self.template = testTemplate;


    // var uid = 29700;
    // var tid = 64527;
  },

  addSocialMediaImage: async function (list, imageElement, index) {
    const self = this;
    var user = self.userPlan.user_info;

    const canvasHeight = self.canvasHeight;
    const canvasWidth = self.canvasWidth;
    const imageHeight = canvasHeight * imageElement.height;
    // const imageWidth = 600 * imageElement.width;

    const qx = imageElement.positionX * canvasWidth;
    const qy = imageElement.positionY * canvasHeight;


    var data = [];
    for (var i = 0; i < list.length; i++) {
      if (user.social_media_ids.includes(list[i].social_media_id)) {
        data.push(list[i]);
      }
    }

    for (var i = 0; i < data.length; i++) {
      const leftPosition = qx + (imageHeight + 3) * i;

      fabric.Image.fromURL(
        data[i].icon,
        function (img) {
          img.set({
            left: leftPosition,
            top: qy,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
          });
          img.scaleToHeight(imageHeight);

          self.canvas.add(img);
          self.canvas.moveTo(img, index);
        }.bind(this),
        {
          crossOrigin: "anonymous",
        }
      );
    }
  },

  getPackById: async function (id) {
    const self = this;

    return new Promise(async (callback) => {
      var baseUrl = self.base_url;
      let payload = {
        pack_id: id,
      };

      fetch(baseUrl + "get_socila_media_bypack_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: self.token,
        },
        body: JSON.stringify(payload),
      })
        .then((value) => {
          return value.json();
        })
        .then((val) => {
          callback(val.data);
          //   return val.data;
        });
    });
  },

  getUserBrandElement: function (brandElementName, uploadBrandDetailsModel) {
    switch (brandElementName) {
      case "Photo":
        return uploadBrandDetailsModel.photo;
      case "Logo":
        return uploadBrandDetailsModel.logo;
      case "Name":
        return uploadBrandDetailsModel.name;
      case "Slogan":
        return uploadBrandDetailsModel.slogan;
      case "Website":
        return uploadBrandDetailsModel.website;
      case "Contact":
        return uploadBrandDetailsModel.contact_no;
      case "Email":
        return uploadBrandDetailsModel.email_id;
      case "Products & Services":
        return uploadBrandDetailsModel.products_services;
      case "Header Image":
        return uploadBrandDetailsModel.header_image;
      case "Extra Element":
        return uploadBrandDetailsModel.extra_element;
      case "Organisation Logo":
        return uploadBrandDetailsModel.partylogourl;
      case "Designation":
        return uploadBrandDetailsModel.designation;
      case "Party":
        return uploadBrandDetailsModel.organization;
      case "Address":
        return uploadBrandDetailsModel.address;
    }
    return null;
  },

  initTemplate: async function () {
    const self = this;


    var canvasWidth = 0.0;
    var canvasHeight = 0.0;
    var maxWidth = 600;
    var maxHeight = 600;

    var array = self.template.aspect_ratio.split(":");

    var availableAspectRatio;

    if (maxWidth < 500) {
      availableAspectRatio = maxWidth / maxHeight;
    } else {
      availableAspectRatio = maxWidth / 2 / (maxWidth / 2);
    }

    var imageAspectRatio = parseFloat(array[0]) / parseFloat(array[1]);

    if (maxWidth < 500) {
      if (imageAspectRatio > availableAspectRatio) {
        canvasWidth = maxWidth;
        canvasHeight = (maxWidth / parseFloat(array[0])) * parseFloat(array[1]);
      } else {
        canvasHeight = maxHeight;
        canvasWidth =
          canvasHeight * (parseFloat(array[0]) / parseFloat(array[1]));
      }
    } else {
      if (imageAspectRatio > availableAspectRatio) {
        canvasWidth = maxWidth / 2;
        canvasHeight =
          (maxWidth / 2 / parseFloat(array[0])) * parseFloat(array[1]);
      } else {
        canvasHeight = maxHeight;
        canvasWidth =
          canvasHeight * (parseFloat(array[0]) / parseFloat(array[1]));
      }
    }


    self.canvasHeight = canvasHeight;
    self.canvasWidth = canvasWidth;

    // const result = await self.placeImageItems(true);

    self.canvas = this.__canvas = new fabric.Canvas("campaignCanvas", {
      // backgroundColor: "#ffffff",
      //   backgroundColor: "#752775",
      height: canvasHeight,
      width: canvasWidth,
      //   controlsAboveOverlay: false,
      //   editable: false,
    });

    const result1 = await self.placeBackgroundImage();

    self.placeImageItems(false).then((val) => {
      setTimeout(() => {
        self.placeTextItems();
      }, 3000);
    });

    // setTimeout(() => {
    //   self.placeTextItems();
    // }, 5000);

    // const result3 = await self.placeTextItems();
  },

  placeImageItems: async function (addBackgroundImage) {
    return new Promise(async (callback) => {
      const self = this;

      const template = self.template;
      const canvasHeight = self.canvasHeight;
      const canvasWidth = self.canvasWidth;
      const margin = 0;

      for (let [i, element] of template.images.entries()) {
        if (element.isBackgroundPhoto == addBackgroundImage) {
          const qx = element.positionX * canvasWidth + margin;
          const qy = element.positionY * canvasHeight + margin;

          const objectHeight = element.height * canvasHeight;
          const objectWidth = element.width * canvasWidth;

          element.objectHeight = objectHeight;
          element.objectWidth = objectWidth;
          let url = element.image_url
          .toString()
          .replace(
            "https://adbanao.s3.ap-south-1.amazonaws.com",
            "https://images.adbanao.com"
            );
            
          element.image_url = url;

          if (
            element.brand_element != null &&
            element.brand_element.length != 0 &&
            element.brand_element == "Social Media"
          ) {
            self.getPackById(template.social_media_pack_id).then((iconList) => {
              self.addSocialMediaImage(iconList, element, i);
            });
          } else if (element.image_url != null) {
            if (element.islayervisible == true) {
              if (element.strColor != 0) {
                //var image;
                let imgEl = document.createElement("img");
                imgEl.crossOrigin = "anonymous";
                imgEl.src = element.image_url;
                // imgEl.setAttribute("style", "position:absolute;bottom:10px");
                imgEl.style.position = "absolute";
                imgEl.style.bottom = "20px";
                imgEl.onload = function () {
                  let image = new fabric.Image(imgEl);
                  image.scale(1);
                  image.filters = [new fabric.Image.filters.BlendColor()];
                  image.set({
                    left:  qx + 10,
                    top: element.imageType === "SHAPE" ? qy - 9 : qy - 5,
                    hasControls: false,
                    lockMovementX: true,
                    lockMovementY: true,
                  });
                  image.scaleToHeight(objectHeight);
                  image.scaleToWidth(objectWidth);
                  self.canvas.add(image);
                  
                  // self.canvas.setActiveObject(image);

                  image.filters[0].alpha = 1;
                  image.filters[0].color = toColor(element.strColor);
                  image.filters[0].mode = "overlay";
                  image.applyFilters();
                  self.canvas.moveTo(image, i);
                  image = null;
                  // self.canvas.requestRenderAll();
                };
              } else {
                fabric.Image.fromURL(
                  element.image_url,
                  function (img) {
                    img.set({
                      left: qx,
                      top: qy,
                      hasControls: false,
                      lockMovementX: true,
                      lockMovementY: true,
                    });
                    img.scaleToHeight(objectHeight);
                    img.scaleToWidth(objectWidth);

                    self.canvas.add(img);
                    self.canvas.moveTo(img, i);
                    // self.canvas.setActiveObject(img);
                  }.bind(this),
                  {
                    crossOrigin: "anonymous",
                  }
                );
              }
            }
          }

        }
      }

      function toColor(num) {
        num >>>= 0;
        var b = num & 0xff,
          g = (num & 0xff00) >>> 8,
          r = (num & 0xff0000) >>> 16,
          a = ((num & 0xff000000) >>> 24) / 255;
        return "rgba(" + [r, g, b, a].join(",") + ")";
      }

      callback(true);
    });
  },

  placeBackgroundImage: async function () {
    return new Promise(async (callback) => {

      const self = this;

      var canvasWidth = 0.0;
      var canvasHeight = 0.0;
      var maxWidth = 600;
      var maxHeight = 600;

      var array = self.template.aspect_ratio.split(":");

      var availableAspectRatio;

      if (maxWidth < 500) {
        availableAspectRatio = maxWidth / maxHeight;
      } else {
        availableAspectRatio = maxWidth / 2 / (maxWidth / 2);
      }

      var imageAspectRatio = parseFloat(array[0]) / parseFloat(array[1]);

      if (maxWidth < 500) {
        if (imageAspectRatio > availableAspectRatio) {
          canvasWidth = maxWidth;
          canvasHeight =
            (maxWidth / parseFloat(array[0])) * parseFloat(array[1]);
        } else {
          canvasHeight = maxHeight;
          canvasWidth =
            canvasHeight * (parseFloat(array[0]) / parseFloat(array[1]));
        }
      } else {
        if (imageAspectRatio > availableAspectRatio) {
          canvasWidth = maxWidth / 2;
          canvasHeight =
            (maxWidth / 2 / parseFloat(array[0])) * parseFloat(array[1]);
        } else {
          canvasHeight = maxHeight;
          canvasWidth =
            canvasHeight * (parseFloat(array[0]) / parseFloat(array[1]));
        }
      }


      self.canvasHeight = canvasHeight;
      self.canvasWidth = canvasWidth;

      const template = self.template;


      let url = template.background_image_path
        .toString()
        .replace(
          "https://adbanao.s3.ap-south-1.amazonaws.com",
          "https://images.adbanao.com"
        );

      template.background_image_path = url;

      if (template.background_image_path != null) {
        const canvasElem = document.querySelector("#campaignCanvas");
        canvasElem.style.backgroundImage = `url(${template.background_image_path})`;
        canvasElem.style.backgroundSize = `100% 100%`;

        // self.canvas.setBackgroundImage(
        //   template.background_image_path,
        //   self.canvas.renderAll.bind(self.canvas),
        //   {

        //     // Optionally add an opacity lvl to the image
        //     // backgroundImageOpacity: 0.5,
        //     // should the image be resized to fit the container?
        //     // backgroundImageStretch: false,
        //     scaleX: canvasWidth / 600,
        //     scaleY: canvasHeight / 600,
        //   }
        // );
      } else if (template.background_color != null) {
        var rect = new fabric.Rect({
          fill: "yellow", // specify background of a object
          width: canvasWidth, // object width in px
          height: canvasHeight, // object height in px
          editable: false,
        });

        self.canvas.add(rect);
      }

      callback(true);
    });
  },

  placeTextItems: async function () {
    return new Promise(async (callback) => {
      const self = this;
      
      const template = self.template;
      const canvasHeight = self.canvasHeight;
      const canvasWidth = self.canvasWidth;
      const margin = 0;

      for (var i = 0; i < template.text.length; i++) {
        console.log(template.text)
        const qx = template.text[i].positionX * canvasWidth + margin;
        const qy = template.text[i].positionY * canvasHeight + margin;


        const objectHeight = template.text[i].height * canvasHeight;
        const objectWidth = template.text[i].width * canvasWidth;


        const textColor = toColor(template.text[i].textColor);
        const textBg = toColor(template.text[i].text_background);

        const url = "https://adbanao.s3.ap-south-1.amazonaws.com/Font/";
        // const fontUrl = url + 'Poppins.ttf';
        const fontUrl = url + template.text[i].font;


        const getCss = (urlArray) => {

          let fonts = "";
          for (let url of urlArray) {
            fonts += `@font-face{
                          font-family: ${url.name};
                          src: url('${url.url}');
                      }`;
          }
          return fonts;
        };

        function addStyle(styles) {

          var css = document.createElement("style");
          css.type = "text/css";

          if (css.styleSheet) css.styleSheet.cssText = styles;
          else css.appendChild(document.createTextNode(styles));
          document.getElementsByTagName("head")[0].appendChild(css);
        }

        // const css = getCss([{"url":fontUrl, "name": 'Poppins'}]);
        const css = getCss([
          { url: fontUrl, name: template.text[i].font.split(".")[0] },
        ]);
        addStyle(css);


        const createTextImage = (options) => {
          return new Promise(async (callback) => {
            const workshop = document.querySelector(".workshop");
            let div = document.createElement("div");
            div.classList.add("element");
            let trimText = "";
            let splitText = options.text.split("  ");
            splitText.forEach((i, j)=>{
              if (i !== "" && j != splitText.length){
                trimText += i + "\n";
              }
            })

            div.innerText = trimText != "" ? trimText : options.text;
            trimText != "" ? div.style.paddingTop = "20px" : null;
            div.style.width = options.width + "px";
            div.style.height = options.height + "px";
            div.style.paddingTop = options.paddingTop;
            div.style.color = options.fill.toString();
            div.style.fontFamily = options.fontFamily.toString();
            div.style.fontWeight = options.fontWeight;
            div.style.fontStyle = options.fontStyle.toString();
            console.log(options)
            if (options.underline) {
              div.style.textDecoration = "underline";
            }

            if (options.textAlign === "C") {
              div.style.textAlign = "center";
            } else {
              div.style.textAlign = options.textAlign.toString();
            }

            if (options.lineSpacing === "auto") {
              div.style.lineHeight = options.lineSpacing;
            } else {
              div.style.lineHeight = options.lineSpacing + "px";
            }


            div.style.backgroundColor = options.textBackgroundColor.toString();
            
            workshop.innerHTML = "";
            workshop.appendChild(div);
            let context = document.querySelector(".element");
            textFit(context);
            html2canvas(document.querySelector(".element"), {
              backgroundColor: null,
            }).then(function (ctx) {
              var dataURL = ctx.toDataURL("image/png");
              workshop.innerHTML = "";
              callback(dataURL);
            });
          });
        };
        console.log(template.text[i])
        const options = {
          text: template.text[i].text,
          fill: textColor,
          textBackgroundColor: "transparent",
          // textBackgroundColor: textBg,
          fontFamily: template.text[i].font.split(".")[0],
          fontWeight: template.text[i].style == "bold" ? 700 : 400,
          fontStyle: template.text[i].isItalic == true ? "italic" : "normal",
          lineSpacing: "auto",
          height: objectHeight+40,
          width: objectWidth+40,
          paddingTop: template.text[i].brand_element != null ? 0 : 20,
          //paddingTo: template.text[i].brand_element != null ? 0 : 20,
          underline: template.text[i].isunderline == true ? true : false,
          textAlign:
            template.text[i].text_aligment == "C"
              ? "center"
              : template.text[i].text_aligment,
        };

        const image = await createTextImage(options);
        if (template.text[i].islayervisible) {
          fabric.Image.fromURL(
            image,
            function (img) {
              img.set({
                left: qx,
                top: qy - 5,
                hasControls: false,
                lockMovementX: true,
                lockMovementY: true,
              });
              img.scaleToHeight(objectHeight);
              img.scaleToWidth(objectWidth);

              self.canvas.add(img);
            }.bind(this),
            {
              crossOrigin: "anonymous",
            }
          );
        }
      }

      function toColor(num) {
        num >>>= 0;
        var b = num & 0xff,
          g = (num & 0xff00) >>> 8,
          r = (num & 0xff0000) >>> 16,
          a = ((num & 0xff000000) >>> 24) / 255;
        return "rgba(" + [r, g, b, a].join(",") + ")";
      }

      callback(true);
    });
  },

  downloadCanvas: async function () {
    var canvasElem = document.querySelector(".canvas-container");
    html2canvas(canvasElem, { allowTaint: true, useCORS: true }).then(
      (canvas) => {
        var image = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        var link = document.createElement("a");
        link.download = "my-image.png";
        link.href = image;
        link.click();
      }
    );

    // let self = this;
    // var canvas = document.getElementById("campaignCanvas");
    //   var image = self.canvas.toDataURL({ format: 'png', width: 600,
    //   height: 600
    // });
    //   // var image = self.canvas.toPNG();
    //   var link = document.createElement('a');
    //   link.download = "my-image.png";
    //   link.href = image;
    //   link.click();
  },
};

// number = 255
// h = parseInt(number, 10).toString(16)
// // Result: "ff"

// // Add Padding
// h = h.padStart(6, "0")
// // Result: "0000ff"

class DownloadFiles {
  constructor(url) {
    this.url = url;
  }
  downloadImages() {
    return new Promise(async (callback) => {
      return await fetch(this.url)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            var base64data = reader.result;
            callback(base64data);
          };
        });
    });
  }

  fabricImage() {
    return new Promise(async (callback) => {
      fabric.Image.fromURL(
        this.url,
        function (img) {
          callback(img);
        }.bind(this),
        {
          crossOrigin: "anonymous",
        }
      );
    });
  }
}
