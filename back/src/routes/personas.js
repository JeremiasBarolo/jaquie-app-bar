
    const express = require('express');
    const router = express.Router();
    const {personasController }= require('../controllers');

    router.get('/', personasController.listAllpersonas);
    router.get('/:personas_id', personasController.listOnepersonas);
    router.post('/', personasController.createpersonas);
    router.put('/:personas_id', personasController.updatepersonas);
    router.delete('/:personas_id', personasController.deletepersonas);

    module.exports = router;
    