
    const express = require('express');
    const router = express.Router();
    const {ventaController }= require('../controllers');

    router.get('/', ventaController.listAllventa);
    router.get('/:venta_id', ventaController.listOneventa);
    router.post('/', ventaController.createventa);
    router.put('/:venta_id', ventaController.updateventa);
    router.delete('/:venta_id', ventaController.deleteventa);

    module.exports = router;
    