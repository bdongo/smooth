const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCreateAgenda = [
    check('user')
        .exists({checkFalsy: true})
        .withMessage('Agenda must have a user'),
    check('event')
        .exists({checkFalsy: true })
        .withMessage('Agenda must reference an event'),
    check('time')
        .exists({checkFalsy: true})
        .withMessage('Time cannot be blank'),
    handleValidationErrors
];

module.exports = validateCreateAgenda