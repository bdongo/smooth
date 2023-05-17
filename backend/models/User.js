const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Agenda = require('./Agenda')
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

userSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const newAgenda = new Agenda({
                user: this._id,
                events: []
            });
            const savedAgenda = await newAgenda.save();
            this.agendas.push(savedAgenda._id);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);