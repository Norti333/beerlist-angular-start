var express = require('express');
var router = express.Router();
var Beer = require("../models/BeerModel");

var handler = function (res, next) {
  return function (err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer);
  }
}

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status('401').send({message: "Unauthorized" });
  }
};


router.post('/:id/ratings', function (req, res, next) {
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
router.get('/', function (req, res, next) {
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
router.get('/:id', function (req, res, next) {
  Beer.findById(req.params.id, function (err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer)
  })
});
router.post('/', function (req, res, next) {
  Beer.create(req.body, handler(res, next));
});
router.delete('/:beerId', function (req, res, next) {
  Beer.findByIdAndRemove(req.params.beerId, handler(res, next));
});
router.put('/:id', function (req, res, next) {
  Beer.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (error, beer) {
    if (error) {
      return next(error);
    }
    res.send(beer);
  });
});
router.post('/:id/reviews', function (req, res, next) {
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
router.delete('/:beerid/reviews/:reviewid', function (req, res, next) {
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



module.exports = router;