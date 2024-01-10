var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();
const redisClient = require("./redisConnection");

const redisTime = process.env.REDIS_CACHE_TIME;//In sec


// for Get All Blogs on homepage.
router.get('/blog/getAllBlogs', async function (req, res, next) {

  try {
    const redisKey = 'get_all_blogs';
    let data = await redisClient.get(redisKey);
    if(data) {
      return res.status(200).send({
        status: true,
        message: 'Data served through redis cache.',
        data: JSON.parse(data),
      });

    } else {
      const resdata = await axios.get(`${process.env.BLOG_URL}/blogs/get_all_blogs`);

      // axios
      // .get(`${process.env.BLOG_URL}/blogs/get_all_blogs`)
      // .then((response) => {
      //   return res.status(200).send({
      //     status: true,
      //     message: 'Successful',
      //     data: response.data,
      //   });
      // })
      // .catch((error) => {
      //   if (error.response && error.response.status === 503) {
      //     return res.status(503).json({
      //       status: false,
      //       message: "Service is temporarily unavailable. Please try again later.",
      //       data: null,
      //     });
      //   } else {
      //     return res.status(503).send({
      //       status: false,
      //       message: "Something went wrong",
      //       data: error.toString(),
      //     });
      //   }
      // });

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

// GET all Blogs No limit
router.get('/blog/getAllBlogsNoLimit', async (req, res) => {

  try {
    const redisKey = 'get_all_blogs_no_limit';
    let data = await redisClient.get(redisKey);
    if(data) {
      return res.status(200).send({
        status: true,
        message: 'Data served through redis cache.',
        data: JSON.parse(data),
      });

    } else {

      const resdata = await axios.get(`${process.env.BLOG_URL}/blogs/get_all_blogs_no_limit`);

    // axios
      //   .get(`${process.env.BLOG_URL}/blogs/get_all_blogs_no_limit`)
      //   .then((response) => {
      //     return res.status(200).json({
      //       status: true,
      //       message: 'Successful',
      //       data: response.data,
      //     });
      //   })
      //   .catch((error) => {
      //     return res.status(503).json({
      //       status: false,
      //       message: "Something went wrong",
      //       data: error.response ? error.response.data : error.message,
      //     });
      //   });


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

// GET blog-details page
router.get('/blog/getBlogDetails/:url', (req, res) => {
  axios
    .get(`${process.env.BLOG_URL}/blogs/get_blog_details/${req.params.url}`)
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: 'Successful',
        data: response.data,
      });
    })
    .catch((error) => {
      return res.status(503).json({
        status: false,
        message: "Something went wrong",
        data: error.response ? error.response.data : error.message,
      });
    });
});


/* GET bloga home page. */

router.get("/blog",function(req,res,next) {
  res.render('blogs-listing', 
  { 
    title: 'Blog Listing',
    sub_industries_data: req.body.sub_industry_data,
    event_data: req.body.event_data
  });
})

let resultData= ''
const blogDate = async function blogMiddleware(req, res,next) {
  resultData = await axios.get(`${process.env.BLOG_URL}/blogs/get_blog_details/${req.params.url}`);
  next()
}
router.get('/blog-details/:url',blogDate,async function (req, res, next) {

  res.render('blog-details', 
  { 
    title: 'Blog Listing',
    blog_url : req.params.url,
    sub_industries_data: req.body.sub_industry_data,
    event_data: req.body.event_data,
    canonical_img: resultData.data.data.BlogData[0].image[0].icon_path,
    unique_url: resultData.data.data.BlogData[0].unique_url,
    title: resultData.data.data.BlogData[0].title,
    meta_dec: resultData.data.data.BlogData[0].meta_dec,
    meta_title:resultData.data.data.BlogData[0].meta_title,
    blog_meta_tags:resultData.data.data.BlogData[0].blog_meta_tags
  });
  
});


module.exports = router;
