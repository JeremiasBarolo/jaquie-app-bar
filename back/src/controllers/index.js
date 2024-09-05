const TipoArticuloController= require('./TipoArticulo');
const conversion_UMController= require('./conversion_UM');
const estadisticaController= require('./estadistica');
const personasController= require('./personas');
const usuariosController= require('./usuarios');
const maestro_articulosController= require('./maestro_articulos');
const disponibilidad_articulosController= require('./disponibilidad_articulos');
const recetaController= require('./receta');
const ventaController= require('./venta');
const pedido_stockController= require('./pedido_stock');
const pedido_produccionController= require('./pedido_produccion');
const BebidasController= require('./Bebidas');
const loginController= require('./login');
const agregarPedidoController= require('./agregarPedido');
const TipoFormaPagosController= require('./TipoFormaPagos');


module.exports= {
    TipoArticuloController,
    conversion_UMController,
    estadisticaController,
    personasController,
    usuariosController,
    maestro_articulosController,
    disponibilidad_articulosController,
    recetaController,
    ventaController,
    pedido_stockController,
    pedido_produccionController,
    BebidasController,
    loginController,
    agregarPedidoController,
    TipoFormaPagosController
}