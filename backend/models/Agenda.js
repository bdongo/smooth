const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;
const eventSchema = require('./Event').schema

const agendaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }],
    saved: {
        type: Boolean,
        default: false
    },
    time: {
        type: Number,
        default: 8
    },
    budget: {
        type: Number,
        default: 100
    }
}, {
    timestamps: true
});

agendaSchema.set('toObject', { default: true }, { default: [] });
agendaSchema.set('toJSON', { default: true }, { default: [] });

module.exports = mongoose.model('Agenda', agendaSchema)