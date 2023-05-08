const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCreateEvent = [
    check('author')
        .exists({checkFalsy: true})
        .withMessage('Event must have an author'),
    check('title')
        .exists({checkFalsy: true })
        .withMessage('Title cannot be blank'),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Description cannot be blank'),
    check('address.street')
        .exists({checkFalsy: true})
        .withMessage('Street address cannot be blank'),
    check('address.city')
        .exists({checkFalsy: true})
        .withMessage('City cannot be blank'),
    check('address.state')
        .exists({checkFalsy: true})
        .withMessage('State cannot be blank'),
    check('address.zipcode')
        .exists({checkFalsy: true})
        .withMessage('Zipcode cannot be blank'),
    // check('location.lat')
    //     .exists({checkFalsy: true})
    //     .withMessage('Location cannot be blank'),
    // check('location.lng')
    //     .exists({checkFalsy: true})
    //     .withMessage('Location cannot be blank'),
    handleValidationErrors
];

module.exports = validateCreateEvent