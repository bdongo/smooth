const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: { //number of hours
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    event: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event' 
    }    
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);

// const Review = mongoose.model('Review', reviewSchema);
// module.exports = Review

newreview = {
    "author": "645d2392a6e27c34fd77c7f9",
    "event": "645d2393a6e27c34fd77c804",
    "text": "Nice!",
    "rating": 5,
    "price": 100,
    "time": 8
}