const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateRegisterInput is a combination Express middleware that uses the check
// middleware to validate the keys in the body of the request to register a user
const validateRegisterInput = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Email is invalid'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 24 })
        .withMessage('Username must be between 4 and 24 characters'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 8, max: 24 })
        .withMessage('Password must be between 8 and 24 characters'),
    check('password')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character'),
    check('password')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one capitalized letter'),
    handleValidationErrors
];

module.exports = validateRegisterInput;