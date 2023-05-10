const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCreateAgenda = [
    check('user')
        .exists({checkFalsy: true})
        .withMessage('Agenda must have a user'),
    check('events')
        .exists({checkFalsy: true })
        .withMessage('Agenda must reference an event'),
    handleValidationErrors
];

module.exports = validateCreateAgenda