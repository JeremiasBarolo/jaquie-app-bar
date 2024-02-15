
    const express = require('express');
    const router = express.Router();
    const {pedido_stockController }= require('../controllers');

    router.get('/', pedido_stockController.listAllpedido_stock);
    router.get('/:pedido_stock_id', pedido_stockController.listOnepedido_stock);
    router.post('/', pedido_stockController.createpedido_stock);
    router.put('/:pedido_stock_id', pedido_stockController.updatepedido_stock);
    router.delete('/:pedido_stock_id', pedido_stockController.deletepedido_stock);

    module.exports = router;
    