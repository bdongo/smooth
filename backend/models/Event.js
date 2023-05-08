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
    avgprice: getAverage(Event.reviews.price),
    avgtime: getAverage(Event.reviews.time)
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);

