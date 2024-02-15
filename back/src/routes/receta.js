
    const express = require('express');
    const router = express.Router();
    const {recetaController }= require('../controllers');

    router.get('/', recetaController.listAllreceta);
    router.get('/:receta_id', recetaController.listOnereceta);
    router.post('/', recetaController.createreceta);
    router.put('/:receta_id', recetaController.updatereceta);
    router.delete('/:receta_id', recetaController.deletereceta);

    module.exports = router;
    