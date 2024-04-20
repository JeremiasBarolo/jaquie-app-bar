// Index of routes
const TipoArticuloService = require('./TipoArticulo');
const conversion_UMService = require('./conversion_UM');
const estadisticaService = require('./estadistica');
const personasService = require('./personas');
const usuariosService = require('./usuarios');
const maestro_articulosService = require('./maestro_articulos');
const disponibilidad_articulosService = require('./disponibilidad_articulos');
const recetaService = require('./receta');
const ventaService = require('./venta');
const pedido_stockService = require('./pedido_stock');
const pedido_produccionService = require('./pedido_produccion');
const BebidasService = require('./Bebidas');




module.exports = {
    TipoArticuloService,
    conversion_UMService,
    estadisticaService,
    personasService,
    usuariosService,
    maestro_articulosService,
    disponibilidad_articulosService,
    recetaService,
    ventaService,
    pedido_stockService,
    pedido_produccionService,
    BebidasService
};