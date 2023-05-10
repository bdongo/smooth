const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    text: String,
    title: String,
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
    "author": "645aeaa012d08c4b32993801",
    "event": "645aeaa612d08c4b32993839",
    "rating": 5,
    "price": 100,
    "time": 1
}