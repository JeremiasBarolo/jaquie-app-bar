
const express = require('express');
const router = express.Router();
const {agregarPedidoController }= require('../controllers');


router.get('/:id', agregarPedidoController.traerPedidos);
router.put('/:id', agregarPedidoController.agregarPedido);





module.exports = router;
