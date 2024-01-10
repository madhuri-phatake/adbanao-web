var express = require("express");
var router = express.Router();
const axios = require("axios");
const nodemailer = require("nodemailer");
require("dotenv").config();

///routesr for logo page
router.get("/", function(req, res, next) {
  res.render("Career", {
    title: "Career Page",
    sub_industries_data: req.locals.sub_industry_data,
    event_data: req.locals.event_data,
    pricing_data: req.pricing_data,
    IdentityPoolId:"ap-south-1:b7895b86-e6fc-4674-9c2b-78fb3878e245",
    bucketName:"adbanao",

  });
});
// Define middleware to rate limit email sending
const emailRateLimit = (req, res, next) => {
  const now = Date.now();
  const interval = 60 * 1000; // 1 minute

  if (!req.emailLastSent || now - req.emailLastSent >= interval) {
    req.emailLastSent = now;
    next(); // Allow sending the email
  } else {
    res
      .status(429)
      .send("Too many requests. Please wait before sending another email.");
  }
};
// Route to handle form submission
router.post("/send-career-email", emailRateLimit ,async (req, res) => {
  try {

    const {recaptchaResponse} = req.body

    const secretKey = "6Ld7dSYpAAAAAOImWGC8-Cve7qABPbUQpmAe2wVU"; // Replace with your secret key obtained from reCAPTCHA admin console

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
   
    const googleResponse = await axios.post(verificationURL);
    const { success } = googleResponse.data;
    console.log(success)
    return
    if(success){
      const {
        firstName,
        lastName,
        email,
        phone,
        city,
        position,
        startdate,
        experience,
        cv_url
      } = req.body;
  
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "Gmail", // Use your email service provider
        secure: true,
        auth: {
          user: "help.adbanao@gmail.com", // Replace with your email
          pass: "qaywrbagfpnjjgyo" // Replace with your password
        }
      });
  
      // Email data
      const mailOptions = {
        from: "help.adbanao@gmail.com",
        to: "help.adbanao@gmail.com ,careers@adbanao.com", // Replace with recipient email
        subject: `Carrer Form Submission aplication for ${position}`,
        html: `<html>
        <body>
          <h2>Career Form Submission Application</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Apply For:</strong> ${position}</p>
          <p><strong>Start date:</strong> ${startdate}</p>
          <p><strong>Experience Details:</strong> ${experience}</p>
          <p><strong>CV or Resume URL:</strong> <a href="${cv_url}">Click To Download</a></p>
        </body>
      </html>`
      };
  
      // Send email
      const info = await transporter.sendMail(mailOptions);
      // Send a response to the client
      res.status(200).json({
        data: info.response,
        message: "Email sent successfully",
        status: true
      });
    }else{
      console.error("Error sending email:", error);
      // Send an error response to the client
      res.status(500).json({
        message: "Error sending email",
        status: false
      });
    }

  } catch (error) {
    console.error("Error sending email:", error);
    // Send an error response to the client
    res.status(500).json({
      message: "Error sending email",
      status: false
    });
  }
});

module.exports = router;
