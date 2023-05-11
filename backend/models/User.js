const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const agendaSchema = require('./Agenda').schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    agendas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Agenda'}],
}, {
    // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
    // datetime timestamps
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);