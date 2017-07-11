var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var beerRoutes = require('./routes/beerRoutes');
var User = require("./models/userModel");
mongoose.connect('mongodb://localhost/beers');
var app = express();

app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/beers', beerRoutes);
app.all('*', function (req, res) {
  res.sendFile(__dirname + "/public/index.html")
})
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});
app.listen(8888, function () {
  console.log("yo yo yo, on 8888!!")
});