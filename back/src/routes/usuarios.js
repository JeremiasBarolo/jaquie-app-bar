
    const express = require('express');
    const router = express.Router();
    const {usuariosController }= require('../controllers');

    router.get('/', usuariosController.listAllusuarios);
    router.get('/:usuarios_id', usuariosController.listOneusuarios);
    router.post('/', usuariosController.createusuarios);
    router.put('/:usuarios_id', usuariosController.updateusuarios);
    router.delete('/:usuarios_id', usuariosController.deleteusuarios);

    module.exports = router;
    