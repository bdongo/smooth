const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = require('./Event').schema

const agendaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    time: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Agenda', agendaSchema)