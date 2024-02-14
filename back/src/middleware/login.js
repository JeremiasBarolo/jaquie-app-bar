const { check } = require('express-validator');
const { checkValidationResult } = require('../helpers/validateHelper');

//TODO verificar si las validaciones son correctas.
const validateInputs = [
    check('username')
        .exists().trim().escape().withMessage('El campo es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El campo debe tener entre 2 y 50 caracteres.'),
    
    check('password')
        .exists().trim().escape().withMessage('El campo es obligatorio')
        .notEmpty().withMessage('Sus credeciales no son válidas'),
           
    (req, res, next) => {
        checkValidationResult(req, res, next)
    }
]


module.exports = { validateInputs }