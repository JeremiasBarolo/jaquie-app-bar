
    const express = require('express');
    const router = express.Router();
    const {BebidasController }= require('../controllers');

    router.get('/', BebidasController.listAllBebidas);
    router.get('/:Bebidas_id', BebidasController.listOneBebidas);
    router.post('/', BebidasController.createBebidas);
    router.put('/:Bebidas_id', BebidasController.updateBebidas);
    router.delete('/:Bebidas_id', BebidasController.deleteBebidas);



    module.exports = router;
    