const { check } = require('express-validator');
const { checkValidationResult } = require('../helpers/validateHelper');


const validateInputs = [
    check('fullName')
        .exists().trim().escape().withMessage('El campo es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El campo debe tener entre 2 y 50 caracteres.'),
    
    check('phone')
        .exists().trim().escape().withMessage('El campo es obligatorio')
        .isMobilePhone('es-AR',{strictMode:false}).withMessage('No es un número de teléfono válido'),
    
    check('email')
        .trim().escape().exists({values:'falsy'}).withMessage('El campo es obligatorio')
        .isEmail().withMessage('No es una dirección de e-mail válida'),
        
    check('message')
        .trim().escape().isLength({ max: 255 }).withMessage('El campo debe tener como maximo 255 caracteres.'),
    
    (req, res, next) => {
        checkValidationResult(req, res, next)
    }
]


module.exports = { validateInputs }