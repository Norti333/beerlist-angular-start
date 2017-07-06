var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beers');

var app = express();
var Beer = require("./models/beerModel");

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var handler = function(res, next){
  return function(err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer);
  }
}

app.post('/beers/:id/ratings', function(req, res, next) {
  console.log(req.body)
  console.log(req.params.id)
    var updateObject = {$push: { ratings: req.body.rating }}; 
    console.log(updateObject)
  /*
    Beer.findByIdAndUpdate(req.params.id, updateObject, { new: true }, function(err, beer) {
        if (err) {
            return next(err);
        } else {
            res.send(beer);
        }
    });
    */
});


app.get('/beers', function(req, res, next) {
  Beer.find(handler(res, next));
});

app.post('/beers', function(req, res, next) {
  Beer.create(req.body, handler(res, next));
});

app.delete('/beers/:beerId', function(req, res, next) {
  Beer.findByIdAndRemove(req.params.beerId, handler(res, next));
});

app.put('/beers/:id', function(req, res, next) {
  Beer.findByIdAndUpdate(req.params.id, req.body, function(err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  }, {new: true});
});


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




app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});