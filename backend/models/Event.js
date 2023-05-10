const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Review = mongoose.model('Review');
// const reviewSchema = require('./Review')
const reviewSchema = require('./Review').schema

const getAverage = (array) => {
    let sum = 0;
    array.forEach(el => {
        sum += el;
    });
    return sum / array.length;
}

const eventSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true 
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    // reviews: [reviewSchema],
    agendas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agenda'}],
    avgPrice: {
        type: Number,
        default: function () {
            if (this.reviews && this.reviews.length > 0) {
                const prices = this.reviews.map(review => review.price);
                return getAverage(prices);
            }
            return 0;
        }
    },
    avgTime: {
        type: Number,
        default: function () {
            if (this.reviews && this.reviews.length > 0) {
                const times = this.reviews.map(review => review.time);
                return getAverage(times);
            }
            return 0;
        }
    }, 
    avgRating: {
        type: Number,
        default: function () {
            if (this.reviews && this.reviews.length > 0) {
                const ratings = this.reviews.map(review => review.rating);
                return getAverage(ratings);
            }
            return 0;
        }
    },
    imageUrls: {
        type: [String],
        required: false
    }
}, {
    timestamps: true
});

eventSchema.methods.updateAverages = function(){
    if(!this.reviews?.length) return;

    const prices = this.reviews.map(review => review.price)
    const ratings = this.reviews.map(review => review.rating)
    const times = this.reviews.map(review => review.time)
    
    const length = this.reviews.length
    
    const totalPrice = prices.reduce((sum, price) => sum + price, 0)
    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0)
    const totalTime = times.reduce((sum, time) => sum + time, 0)

    this.avgPrice = totalPrice / length
    this.avgTime = totalTime / length
    this.avgRating = totalRating / length
}

module.exports = mongoose.model('Event', eventSchema);

const Event = mongoose.model('Event', eventSchema);

// Event.find()
//     .then((events) => {
//         events.forEach((event) => {
//             event.updateAverages();
//             event.save();
//         });
//         // console.log(events);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// Event.find()
//     .populate('reviews')
//     .then((events) => {
//         events.forEach((event) => {
//             event.updateAverages();
//             event.save();
//         });
//         // console.log(events);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

test = {
    "author": "645a7bf9c64b62d6212c5179",
    "title": "test",
    "description": "test",
    "category": "test",
    "address": {
        "street": "test",
        "city": "test",
        "state": "test",
        "zipcode": "test"
    }
}

testId = "645aa6f6c77b2ff7bb6cdc88"