
    const express = require('express');
    const router = express.Router();
    const {estadisticaController }= require('../controllers');

    router.get('/', estadisticaController.listAllestadistica);
    router.get('/traerDisponibilidad', estadisticaController.listDisponibilidad);
    router.get('/:estadistica_id', estadisticaController.listOneestadistica);
    router.post('/', estadisticaController.createestadistica);
    router.put('/:estadistica_id', estadisticaController.updateestadistica);
    router.delete('/:estadistica_id', estadisticaController.deleteestadistica);

    module.exports = router;
    