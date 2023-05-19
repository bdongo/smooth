const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');
const mongoose = require('mongoose');
const Agenda = mongoose.model('Agenda');

const validateCreateAgenda = [
    check('user')
        .exists({checkFalsy: true})
        .withMessage('Agenda must reference a user'),
    check('user')
        .custom(async (user, { req }) => {
            const existingAgenda = await Agenda.find({ user, saved: false });
            if (existingAgenda.length) {
            throw new Error('Pending itinerary exists');
            }
        }),
    handleValidationErrors
];

module.exports = validateCreateAgenda