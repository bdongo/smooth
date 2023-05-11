const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateReviewForm = [
    check('author')
        .exists({checkFalsy: true})
        .withMessage('Review must have an author'),
    check('event')
        .exists({checkFalsy: true})
        .withMessage('Review must reference an event'),
    check('title')
        .isLength({ max: 48})
        .withMessage('Title cannot exceed 48 characters'),
    check('text')
        .isLength({ max: 255})
        .withMessage('Text cannot exceed 255 characters'),
    check('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    check('price')
        .isInt({ min: 1, max: 100 })
        .withMessage('Price must be between 1 and 100'),
    check('time')
        .isInt({ min: 1, max: 8 })
        .withMessage('Amount of time must be between 1 and 8'),
    handleValidationErrors
]

module.exports = validateReviewForm