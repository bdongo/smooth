const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = require('./Event').schema

const agendaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    saved: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Agenda', agendaSchema)

testagenda = {
    user: "645e55526ec97b3e427620f2",
    events: [],
}