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
    time: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
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
    "rating": 5,
    "price": 100,
    "time": 0,
    "author": "64593c4d4546c8781f6fa9aa",
    "event": "64597e34c7b180355bd14a18"
}
