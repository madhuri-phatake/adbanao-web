var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const axios = require('axios');
require('./routes/redisConnection')

var indexRouter = require('./routes/index');
var blogs = require('./routes/blog');
var ContactForm = require('./routes/nodemailer');
var career = require("./routes/careers")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async function(req, res, next) {
  await axios.get(`${process.env.API_URL}/api/get_subindustries`).then(res => {
      if(res.data.data){
        req.body.sub_industry_data = res.data.data;
        if(!req.locals) {
          req.locals = {}
        }
        req.locals.sub_industry_data = req.body.sub_industry_data;
        next();
      }
    });
});


app.use(async function(req, res, next) {
  await axios.get(`${process.env.API_URL}/api/get_event_data_for_website`).then(res => {
        if(res.data.data){
        req.body.event_data = res.data.data;

        if(!req.locals) {
          req.locals = {}
        }
        req.locals.event_data = req.body.event_data;
        next();
      }
    });

});

// Enable HSTS header
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

// Set the X-Content-Type-Options header to prevent MIME sniffing
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});
// Set the Referrer-Policy header to control referrer information
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

// Set the Permissions-Policy header to control permissions
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});


app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  const robotsTxtContent = `User-agent: Googlebot
Allow: 
User-agent: googlebot-image
Allow: 
User-agent: googlebot-mobile
Allow: 
User-agent: MSNBot
Allow: 
User-agent: Slurp
Allow: 
User-agent: Teoma
Allow: 
User-agent: Gigabot
Allow: 
User-agent: Robozilla
Allow: 
User-agent: Nutch
Allow: 
User-agent: ia_archiver
Allow: 
User-agent: baiduspider
Allow: 
User-agent: naverbot
Allow: 
User-agent: yeti
Allow: 
User-agent: yahoo-mmcrawler
Allow: 
User-agent: psbot
Allow: 
User-agent: yahoo-blogs/v3.9
Allow: 
User-agent: https://app.adbanao.com/login
Disallow: 
User-agent: *
Allow: 
Allow: /cgi-bin/
Sitemap: https://www.adbanao.com/`;

  res.send(robotsTxtContent);
});



app.use('/', indexRouter);
app.use('/', blogs);
app.use('/',ContactForm)
app.use('/career',career)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});





app.locals.Base_url = process.env.Base_url
// console.log(app.locals.Base_url,".......")
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('404page');
 
});

module.exports = app;
