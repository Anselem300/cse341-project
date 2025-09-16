const { body, param, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");


// Generic function to handle validation errors
const handleValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


// Validation for creating/updating contacts
const contactValidationRules = [
    body("firstName").notEmpty().withMessage("First name is required")
    .isLength({min: 2}).withMessage("First name must be at least two characters long."),

    body("lastName").notEmpty().withMessage("Last name is required"),

    body("email").notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Valid email is required"),

    body("favoriteColor").notEmpty().withMessage("Favorite color is required")
    .isString().withMessage("Favorite color must be a string"),

    body("birthday").notEmpty().withMessage("Birthday is required")
    .isISO8601().withMessage("Birthday must be a valid cate in YYYY-MM-DD format"),
    handleValidation
]

// Validation for contact ID
const idValidationRules = [
    param("id").custom((value) => ObjectId.isValid(value))
    .withMessage("Invalid contact ID"),
    handleValidation
]

module.exports = {
    contactValidationRules, idValidationRules
}