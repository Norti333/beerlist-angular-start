var express = require('express');
var router = express.Router();
var User = require("../models/userModel");
var passport = require('passport');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var handler = function (res, next) {
  return function (err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer);
  }
}

router.post('/register', function (req, res, next) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      res.send({
        username: req.user.username
      });


    });
  });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user.username)
});


router.get('/currentuser',function (req, res){
 if (req.user) {
    res.send(req.user.username)
  } else {
    res.send(null)
  }
});

router.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged Out');
});
module.exports = router;