
    const express = require('express');
    const router = express.Router();
    const {TipoArticuloController }= require('../controllers');

    router.get('/', TipoArticuloController.listAllTipoArticulo);
    router.get('/:TipoArticulo_id', TipoArticuloController.listOneTipoArticulo);
    router.post('/', TipoArticuloController.createTipoArticulo);
    router.put('/:TipoArticulo_id', TipoArticuloController.updateTipoArticulo);
    router.delete('/:TipoArticulo_id', TipoArticuloController.deleteTipoArticulo);

    module.exports = router;
    