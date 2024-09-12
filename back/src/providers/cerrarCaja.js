
var models = require('../models');
const {listOnemaestro_articulos} = require('./maestro_articulos');









const cerrarCaja = async () => {
    try {
        // const maestros = await listAllmaestro_articulos();
        
        const mesas = await models.venta.findAll({
            include: [
                {
                    model: models.maestro_articulos, 
                    include: [
                        {
                            model: models.pedido_produccion, // para saber en cantidad_requerida cuando se pidio de ese articulo
                            include: [
                                {
                                    model: models.maestro_articulos,
                                    attributes: ['descripcion', 'costo_unitario']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if(mesas.length === 0){
            throw new Error('No se puede cerrar la caja, no hay mesas creadas');
        }
        for(const mesa of mesas){
            if(mesa.estado !== 'FINALIZADO' || mesas.length === 0){
                throw new Error('No se puede cerrar la caja, hay pedidos pendientes.');
            }
        }


        let mejorArticuloId = await encontrarMejorArticulo(mesas)

       

        let costoTotal = 0;
        let recaudacionTotal = 0;

        // Calcula el costo total
        mesas.forEach(element => {
            costoTotal += element.precio;
        });

        // Calcula la recaudación total
        mesas.forEach(element => {
            recaudacionTotal += element.total;
        });

        // Calcula la ganancia
        let ganacia = recaudacionTotal - costoTotal;


       

        // Crea la estadística
        let estadistica = await models.estadistica.create({
            recaudacion: recaudacionTotal,
            costo_total: costoTotal,
            profit: ganacia,
            mejorArticuloId: mejorArticuloId.id,
            totalArticulo: mejorArticuloId.cantidad
        });

        let productosVendidos = await listadoDeProductos(mesas)

        for(const producto of productosVendidos){
            await models.ProductosDelDia.create({
                cantidad: producto.cantidad,
                articuloId: producto.id,
                estadisticaId: estadistica.id
            })
        }

        
        await models.pedido_produccion.destroy({
            where: { estado: 'FINALIZADO' }
        });

        await models.venta.destroy({
            where: { estado: 'FINALIZADO' }
        });

        
        return estadistica;
        
    } catch (error) {
        console.error('Error al cerrar la caja:', error);
        throw error;
    }
};


const calcularCosto = async (maestros) => {
    let costoTotalMesa = [];

    for (const maestroArticulo of maestros) {
        let costoMesa = []
        let costoArticulo = 0


        const tipo = await models.tipo_articulo.findByPk(maestroArticulo.tipoId);
        
        if (tipo.description === 'Comidas') {
            costoMesa.push(maestroArticulo.pedido_produccion.cant_requerida * maestroArticulo.costo_unitario);
        } else {
            let especifico = await listOnemaestro_articulos(maestroArticulo.id)
            for (const receta of especifico.receta) {
                const disponibilidadArticulo = receta.disponibilidad_articulo;
                const costoUnitarioArticulo = disponibilidadArticulo.maestro_articulo.costo_unitario;
                const cantidadNecesaria = receta.cant_necesaria;
                costoArticulo += costoUnitarioArticulo * cantidadNecesaria
            }

            costoMesa.push(costoArticulo*maestroArticulo.pedido_produccion.cant_requerida );
        }

        costoTotalMesa.push(costoMesa);
    }


    let sumaTotal = 0;

        for (const arrayInterno of costoTotalMesa) {
            for (const valor of arrayInterno) {
                sumaTotal += valor;
            }
        }
  

    return sumaTotal;

    
}

const encontrarMejorArticulo = async (ventas) => {
    let mejorArticuloId = null;
    let mejorCantidad = 0;
  
    const articulosVendidos = {};
  
    for (const venta of ventas) {
      
      for (const maestroArticulo of venta.maestro_articulos) {
        const cantidadVendida = maestroArticulo.pedido_produccion.cant_requerida;
  
        
        if (!articulosVendidos[maestroArticulo.id]) {
          articulosVendidos[maestroArticulo.id] = 0;
        }
  
        articulosVendidos[maestroArticulo.id] += cantidadVendida;
  
        
        if (articulosVendidos[maestroArticulo.id] > mejorCantidad) {
          mejorCantidad = articulosVendidos[maestroArticulo.id];
          mejorArticuloId = maestroArticulo.id;
        }
      }
    }
  
    return { id: mejorArticuloId, cantidad: mejorCantidad };
  };
  

  const listadoDeProductos = async (mesas) => {
    const productosVendidos = {};
  
    // Recorrer todas las mesas
    for (const mesa of mesas) {
      
      for (const maestroArticulo of mesa.maestro_articulos) {
        const articuloId = maestroArticulo.id;
        const cantidadVendida = maestroArticulo.pedido_produccion.cant_requerida;
  
        
        if (!productosVendidos[articuloId]) {
          productosVendidos[articuloId] = {
            id: articuloId,
            cantidad: 0
          };
        }
  
        productosVendidos[articuloId].cantidad += cantidadVendida;
      }
    }
  
    return Object.values(productosVendidos);
  };




module.exports = {
cerrarCaja, calcularCosto
};


