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



module.exports = {
    TipoArticuloService,
    conversion_UMService,
    estadisticaService,
    personasService,
    usuariosService,
    maestro_articulosService,
    disponibilidad_articulosService,
    recetaService,
    ventaService
};