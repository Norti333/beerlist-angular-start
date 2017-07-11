var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    name: {
        type: String
    },
    text: {
        type: String
    }
});

var beerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    style: {
        type: String,
    },
    image_url: {
        type: String
    },
    abv: {
        type: Number,
    },
    ratings: [Number],
    avg: {
        type: Number
    },
    reviews: [reviewSchema]
});



var Beer = mongoose.model("Beer", beerSchema);

module.exports = Beer;