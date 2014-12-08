var express = require('express');
var nodemailer = require('nodemailer');
var emailAddresses = require('email-validator');
var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'AgileAvatars.com' });
});

router.post('/', function (req, res) {
  var email, mailOpts, smtpTrans;

  email = req.body.email;
  if (!emailAddresses.validate(email)) {
    res.render('index', { title: 'AgileAvatars.com', error: 'the email is invalid', page: 'index' })
    return;
  }

  // headers: "From: " + req.body.email,
  sendgrid.send({
    to:       'philippe.bourgau@gmail.com',
    from:     email,
    subject:  '[Interested by AgileAvatars.com]',
    text:     "Interested by AgileAvatars.com"
  }, function(error, json) {
    if (error) {
      res.render('index', { title: 'AgileAvatars.com', error: error, page: 'index' })
      console.log("Failed to send email because " + error);
    }
    else {
      res.render('index', { title: 'AgileAvatars.com', contactSent: true, email: email, page: 'index' })
      conole.log("Mail sent successfully");
    }
  });
});

module.exports = router;
