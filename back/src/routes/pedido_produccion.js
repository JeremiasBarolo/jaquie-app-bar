
    const express = require('express');
    const router = express.Router();
    const {pedido_produccionController }= require('../controllers');
    // const pedidoValidator = require('../validators/quantities');

    router.get('/', pedido_produccionController.listAllpedido_produccion);
    
    router.get('/:pedido_produccion_id', pedido_produccionController.listOnepedido_produccion);
    
    router.post('/' ,pedido_produccionController.createpedido_produccion);
    
    router.put('/:pedido_produccion_id' ,pedido_produccionController.updatepedido_produccion);
    
    router.delete('/:pedido_produccion_id', pedido_produccionController.deletepedido_produccion);
    

    module.exports = router;
    