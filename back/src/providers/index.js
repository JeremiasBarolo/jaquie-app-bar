// Index of routes
const TipoArticuloProvider = require('./TipoArticulo');
const conversion_UMProvider = require('./conversion_UM');
const estadisticaProvider = require('./estadistica');
const personasProvider = require('./personas');
const usuariosProvider = require('./usuarios');
const maestro_articulosProvider = require('./maestro_articulos');
const disponibilidad_articulosProvider = require('./disponibilidad_articulos');
const recetaProvider = require('./receta');
const ventaProvider = require('./venta');




module.exports = {
    TipoArticuloProvider,
    conversion_UMProvider,
    estadisticaProvider,
    personasProvider,
    usuariosProvider,
    maestro_articulosProvider,
    disponibilidad_articulosProvider,
    recetaProvider,
    ventaProvider
};