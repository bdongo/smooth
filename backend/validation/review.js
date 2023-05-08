const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateReviewForm = [
    check('author')
        .exists({checkFalsy: true})
        .withMessage('Review must have an author'),
    check('event')
        .exists({checkFalsy: true})
        .withMessage('Review must reference an event'),
    check('rating')
        .isInt({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),
    check('price')
        .exists({checkFalsy: true})
        .withMessage('Price cannot be blank'),
    check('time')
        .exists({checkFalsy: true})
        .withMessage('Time cannot be blank'),
    handleValidationErrors
]

module.exports = validateReviewForm