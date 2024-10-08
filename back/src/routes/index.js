// Index of routes
const TipoArticuloRouter = require('./TipoArticulo');
const conversion_UMRouter = require('./conversion_UM');
const estadisticaRouter = require('./estadistica');
const personaRouter = require('./personas');
const usuariosRouter = require('./usuarios');
const maestro_articulosRouter = require('./maestro_articulos');
const disponibilidad_articulosRouter = require('./disponibilidad_articulos');
const recetaRouter = require('./receta');
const ventaRouter = require('./venta');
const pedido_stockRouter = require('./pedido_stock');
const pedido_produccionRouter = require('./pedido_produccion');
const bebidasRouter = require('./Bebidas');
const loginRouter = require('./login');
const agregarPedidoRouter = require('./agregarPedido');
const TipoFormaPagosRouter = require('./TipoFormaPagos');
const verPdfRouter = require('./verPdf');


module.exports = {
    TipoArticuloRouter,
    conversion_UMRouter,
    estadisticaRouter,
    personaRouter,
    usuariosRouter,
    maestro_articulosRouter,
    disponibilidad_articulosRouter,
    recetaRouter,
    ventaRouter,
    pedido_stockRouter,
    pedido_produccionRouter,
    bebidasRouter,
    loginRouter,
    agregarPedidoRouter,
    TipoFormaPagosRouter,
    verPdfRouter
};