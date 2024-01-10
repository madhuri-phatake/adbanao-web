var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config()
const cron = require('node-cron');
var fs = require('fs');
const { CostExplorer } = require('aws-sdk');
var arrayOfUrl = []
const redisClient = require("./redisConnection");

const redisTime = process.env.REDIS_CACHE_TIME;//In sec

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home',
    {
      title: 'Index Page',
      sub_industries_data: req.locals.sub_industry_data,
      event_data: req.locals.event_data,
      pricing_data: req.pricing_data
    });
});
///routesr for logo page
router.get('/freelogomaker', function (req, res, next) {
  res.render('logo_page',
    {
      title: 'Logo Desing Page',
      sub_industries_data: req.locals.sub_industry_data,
      event_data: req.locals.event_data,
      pricing_data: req.pricing_data
    });
});
///routesr for quotes page
router.get('/getfreequotes', function (req, res, next) {
  res.render('daily_quotes',
    {
      title: 'daily_quotes',
      sub_industries_data: req.locals.sub_industry_data,
      event_data: req.locals.event_data,
      pricing_data: req.pricing_data
    });
});
///routesr for quotes page
router.get('/career', function (req, res, next) {
  res.render('Career',
    {
      title: 'Career page',
      sub_industries_data: req.locals.sub_industry_data,
      event_data: req.locals.event_data,
      pricing_data: req.pricing_data
    });
});
router.get('/:id', function (req, res, next) {
  res.render(req.params.id,
    {
      sub_industries_data: req.locals.sub_industry_data,
      event_data: req.locals.event_data,
      pricing_data: req.pricing_data
    });
});

// Get data for pricing plan 
router.get('/api/get_pricing_data', async function (req, res, next) {
  try {
    const redisKey = 'get_pricing_plan_for_website';
    let data = await redisClient.get(redisKey)
    if(data) {
      return res.status(200).send({
        status: true,
        message: 'Data served through redis cache.',
        data: JSON.parse(data),
      });

    } else {
      const resdata = await axios.get(`${process.env.API_URL}/api/get_pricing_plan_for_website`);
      const Cache_Response = await redisClient.set(
        redisKey,
        JSON.stringify(resdata.data),
        {
          EX: redisTime,
          NX: true
        }
      );

      if(Cache_Response) {
        return res.status(200).send({
          status: true,
          message: 'Data served.',
          data: resdata.data,
        });

      } else {
        return res.status(200).send({
          status: false,
          message: 'Something broke while storing redis cache!',
          data: "error",
        });
      }
    }
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: "Something went wrong",
      data: error,
    });
  }

});

// Get Sub Industry data for industry page 
router.get('/api/get_sub_industry_data', async function (req, res, next) {
  try {
    const redisKey = 'get_subindustries';
    let data = await redisClient.get(redisKey);
    if(data) {
      return res.status(200).send({
        status: true,
        message: 'Data served through redis cache.',
        data: JSON.parse(data),
      });

    } else {
      const resdata = await axios.get(`${process.env.API_URL}/api/get_subindustries`);


      const Cache_Response = await redisClient.set(
        redisKey,
        JSON.stringify(resdata.data),
        {
          EX: redisTime,
          NX: true
        }
      );

      if(Cache_Response) {
        return res.status(200).send({
          status: true,
          message: 'Data served.',
          data: resdata.data,
        });

      } else {
        return res.status(200).send({
          status: false,
          message: 'Something broke while storing redis cache!',
          data: "error",
        });
      }
    }
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: "Something went wrong",
      data: error,
    });
  }

});


//Automatic Site map file creation all function
const getCurrentSitemap = async () => {
  return new Promise(async (resolve, reject) => {
    var pages = ["https://www.adbanao.com",
      "https://www.adbanao.com/contact-us",
      "https://www.adbanao.com/cancellation-and-refund",
      "https://www.adbanao.com/privacy-and-policy",
      "https://www.adbanao.com/industry",
      "https://www.adbanao.com/FAQ",
      "https://www.adbanao.com/adbanao-in-media",
      "https://www.adbanao.com/blogs",
      "https://www.adbanao.com/getfreequotes",
      "https://www.adbanao.com/freelogomaker",
      "https://www.adbanao.com/vidhansabha-election-special-adbanao-app"
    ];
    // resolve(pages);
    pages.forEach((e) => {
      arrayOfUrl.push(e)
    })
  })
}
const industries = async () => {
  return new Promise(async (resolve, reject) => {
    const url = `${process.env.API_URL}` + "/api/get_subindustries";
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.get(url, headers).then(values => {
      if (values.data.title == "Successful") {
        let arrayUrl = []
        values.data.data.forEach(element => {
          if (element.website_sub_industry_url != null) {
            arrayOfUrl.push("https://www.adbanao.com/" + element.website_sub_industry_url)
          }
        });
        resolve(arrayUrl);
      } else {
        // console.log("industries rejected")
        reject(values.data);
      }
    }).catch((err) => {
      // console.log(err)
    })
  })
}
const event = async () => {
  return new Promise(async (resolve, reject) => {
    const url = `${process.env.API_URL}` + "/api/get_event_data_for_website";
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.get(url, headers).then(values => {
      let arrayUrl = []
      values.data.data.forEach(element => {
        if (element.website_url != null) {
          arrayOfUrl.push("https://www.adbanao.com/" + element.website_url)
        }
        resolve(arrayUrl);
      });
    }).catch((err) => {
      console.log(err)
    })
  })
}
const blogaUrl = async () => {
  return new Promise(async (resolve, reject) => {
    const url = `${process.env.BLOG_URL}/blogs/get_all_blogs_no_limit`;
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.get(url, headers).then(values => {
      let arrayUrl = []
      values.data.data.forEach(element => {
        if (element.unique_url != null) {
          arrayOfUrl.push("https://www.adbanao.com/" + element.unique_url)
        }
        resolve(arrayUrl);
      });
    }).catch((err) => {
      console.log(err)
    })
  })
}
const generateXML = function (arrayOfUrl) {
  var urls = ``;
  var data = new Date();
  arrayOfUrl.forEach(async (obj, i) => {
    urls += `<url>
                  <loc>${obj}</loc>
                  <lastmod>${data}</lastmod>
              </url>`;
  });
  var xmlText = `<?xml version="1.0" encoding="utf-8"?>
              <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
              ${urls}
          </urlset>`;

  return new Promise(async (resolve, reject) => {
    fs.writeFile('sitemap.xml', xmlText, function (err) {
      if (err) {
        reject({
          title: "error"
        })
      } else {
        resolve({
          title: "success"
        });
      };
    });
  });
}
cron.schedule('1 0 15 * *', async () => {
  const pathToFile = "sitemap.xml"

  fs.unlink(pathToFile, function (err) {
    if (err) {
      console.log("Not sitemap.xml the file.")
    } else {
      console.log("Successfully deleted sitemap.xml the file.")
    }
  })
  blogaUrl()
  industries()
  event()
  getCurrentSitemap()
  setTimeout(() => {
    generateXML(arrayOfUrl)
    console.log("Successfully created sitemap.xml the file.")
  }, 5000)
});


router.get('/popups/get_active_popups',async (req, res) => {
  try {
    const redisKey = 'get_active_popups';
    let data = await redisClient.get(redisKey);
    if(data) {
      return res.status(200).send({
        status: true,
        message: 'Data served through redis cache.',
        data: JSON.parse(data),
      });

    } else {
      const resdata = await   axios.get(`${process.env.BLOG_URL}/popups/get_active_popups`)


      const Cache_Response = await redisClient.set(
        redisKey,
        JSON.stringify(resdata.data),
        {
          EX: redisTime,
          NX: true
        }
      );

      if(Cache_Response) {
        return res.status(200).send({
          status: true,
          message: 'Data served.',
          data: resdata.data,
        });

      } else {
        return res.status(200).send({
          status: false,
          message: 'Something broke while storing redis cache!',
          data: "error",
        });
      }
    }
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: "Something went wrong",
      data: error,
    });
  }

});

router.post('/popups/increase_count', (req, res, next) => {
  axios.post(`${process.env.BLOG_URL}/popups/increase_count`, req.body)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: 'Data sent successfully',
        data: response.data
      });
    })
    .catch((error) => {
      res.status(503).json({
        status: false,
        message: 'Something went wrong',
        error: error.message
      });
    });
});
router.get('/homes/get_active_home_slider', async function (req, res, next) {
  try {
    const redisKey = 'get_active_home_slider';
    let data = await redisClient.get(redisKey);
    if(data) {
      return res.status(200).send({
        status: true,
        message: 'Data served through redis cache.',
        data: JSON.parse(data),
      });

    } else {
      const resdata = await axios.get(`${process.env.BLOG_URL}/homes/get_active_home_slider`);
      const Cache_Response = await redisClient.set(
        redisKey,
        JSON.stringify(resdata.data),
        {
          EX: redisTime,
          NX: true
        }
      );

      if(Cache_Response) {
        return res.status(200).send({
          status: true,
          message: 'Data served.',
          data: resdata.data,
        });

      } else {
        return res.status(200).send({
          status: false,
          message: 'Something broke while storing redis cache!',
          data: "error",
        });
      }
    }
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: "Something went wrong",
      data: error,
    });
  }

});

router.post('/homes/increase_count', async function (req, res, next) {
  try {
    const response = await axios.post(`${process.env.BLOG_URL}/homes/increase_count`, req.body);
    return res.status(200).json({
      status: true,
      message: 'Data sent successfully',
      data: response.data
    });
  } catch (error) {
    return res.status(503).json({
      status: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
  
});

module.exports = router;



