const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);

