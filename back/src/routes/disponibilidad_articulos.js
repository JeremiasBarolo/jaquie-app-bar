
    const express = require('express');
    const router = express.Router();
    const {disponibilidad_articulosController }= require('../controllers');

    router.get('/', disponibilidad_articulosController.listAlldisponibilidad_articulos);
    router.get('/:disponibilidad_articulos_id', disponibilidad_articulosController.listOnedisponibilidad_articulos);
    router.post('/', disponibilidad_articulosController.createdisponibilidad_articulos);
    router.put('/:disponibilidad_articulos_id', disponibilidad_articulosController.updatedisponibilidad_articulos);
    router.delete('/:disponibilidad_articulos_id', disponibilidad_articulosController.deletedisponibilidad_articulos);

    module.exports = router;
    