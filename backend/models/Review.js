const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new mongoose.Schema({
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

review1 = {
    "rating": 4,
    "price": 90,
    "time": 5,
    "author": "64598c6c44e8168a933010ca",
    "event": "64598c7844e8168a93301106"
}
