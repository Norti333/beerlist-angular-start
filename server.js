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

var handler = function (res, next) {
  return function (err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer);
  }
}

app.post('/beers/:id/ratings', function (req, res, next) {
  var updateObject = {
    $push: {
      ratings: req.body.rating
    }
  };

  Beer.findByIdAndUpdate(req.params.id, updateObject, {
    new: true
  }, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});


app.get('/beers', function (req, res, next) {
  Beer.find(function (err, beer) {
    if (err) {
      return next(err);
    }
    for (var x = 0; x < beer.length; x++) {
      var total = 0;
      var length = beer[x].ratings.length
      for (var i = 0; i < length; i++) {
        total = total + beer[x].ratings[i]
      }
      var calcAvg = total / length;
      var avg = calcAvg.toFixed(2);
      beer[x].avg = avg
    }
    res.send(beer)
  })
});

app.post('/beers', function (req, res, next) {
  Beer.create(req.body, handler(res, next));
});

app.delete('/beers/:beerId', function (req, res, next) {
  Beer.findByIdAndRemove(req.params.beerId, handler(res, next));
});

app.put('/beers/:id', function (req, res, next) {
  Beer.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (error, beer) {
    if (error) {
      return next(error);
    }
    res.send(beer);
  });
});


app.post('/beers/:id/reviews', function (req, res, next) {
  var update = {
    $push: {
      reviews: req.body
    }
  };

  Beer.findByIdAndUpdate(req.params.id, update, {
    new: true
  }, function (err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer)
  });
});

app.delete('/beers/:beerid/reviews/:reviewid', function (req, res, next) {
  var update = {
    $pull: {
      reviews: {
        _id: req.params.reviewid
      }
    }
  };
  Beer.findByIdAndUpdate(req.params.beerid, update, {
    new: true
  }, function (err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer)
  });
});

app.get('/beers/:id', function (req, res, next) {
  Beer.findById(req.params.id, function (err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer)
  })
});

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