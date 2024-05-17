
const express = require('express');
const router = express.Router();
const {agregarPedidoController }= require('../controllers');


router.get('/:id', agregarPedidoController.traerPedidos);
router.put('/:id', agregarPedidoController.agregarPedido);

// <=============== mesas ===============>
router.delete('/sumar/:id', agregarPedidoController.sumarPedido);
router.delete('/eliminar/:id', agregarPedidoController.devolverPedido);




module.exports = router;
