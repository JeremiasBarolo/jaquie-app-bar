
    const express = require('express');
    const router = express.Router();
    const {conversion_UMController }= require('../controllers');

    router.get('/', conversion_UMController.listAllconversion_UM);
    router.get('/:conversion_UM_id', conversion_UMController.listOneconversion_UM);
    router.post('/', conversion_UMController.createconversion_UM);
    router.put('/:conversion_UM_id', conversion_UMController.updateconversion_UM);
    router.delete('/:conversion_UM_id', conversion_UMController.deleteconversion_UM);

    module.exports = router;
    