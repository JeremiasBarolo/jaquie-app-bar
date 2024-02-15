
    const express = require('express');
    const router = express.Router();
    const {maestro_articulosController }= require('../controllers');

    router.get('/', maestro_articulosController.listAllmaestro_articulos);
    router.get('/:maestro_articulos_id', maestro_articulosController.listOnemaestro_articulos);
    router.post('/', maestro_articulosController.createmaestro_articulos);
    router.put('/:maestro_articulos_id', maestro_articulosController.updatemaestro_articulos);
    router.delete('/:maestro_articulos_id', maestro_articulosController.deletemaestro_articulos);

    module.exports = router;
    