
    const express = require('express');
    const router = express.Router();
    const {TipoFormaPagosController }= require('../controllers');

    router.get('/', TipoFormaPagosController.listAllTipoFormaPagos);
    router.get('/:TipoFormaPagos_id', TipoFormaPagosController.listOneTipoFormaPagos);
    router.post('/', TipoFormaPagosController.createTipoFormaPagos);
    router.put('/:TipoFormaPagos_id', TipoFormaPagosController.updateTipoFormaPagos);
    router.delete('/:TipoFormaPagos_id', TipoFormaPagosController.deleteTipoFormaPagos);

    module.exports = router;
    