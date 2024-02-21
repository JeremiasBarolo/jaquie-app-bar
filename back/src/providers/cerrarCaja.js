
var models = require('../models');

const {listAllmaestro_articulos, listOnemaestro_articulos} = require('./maestro_articulos');
const {listAllventa} = require('./venta');



const cerrarCaja = async () => {
    try {
        // const maestros = await listAllmaestro_articulos();
        // const mesas = await listAllventa();
        const mesas = await models.venta.findAll({
                include: [
                    {
                        model: models.maestro_articulos,
                        include: [
                            {
                                model: models.pedido_produccion,
                                include: [
                                    {
                                        model: models.maestro_articulos,
                                        attributes: ['descripcion', 'costo_unitario' ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        let costoTotal = 0
        let recaudacionTotal = 0



// <=================================== Costo Total =====================================>
        // for (const maestroArticulo of maestros) {
        //     let costoTotalMesa = 0;

    
        //     for (const pedidoProduccion of maestroArticulo.pedido_produccions) {
                
        //         if (maestroArticulo.tipo_articulo.description === 'Comidas') {
        //             costoTotalMesa += pedidoProduccion.cant_requerida * maestroArticulo.costo_unitario;
        //         } else {
                    
        //             for (const receta of maestroArticulo.receta) {
        //                 const disponibilidadArticulo = receta.disponibilidad_articulo;
        //                 const costoUnitarioArticulo = disponibilidadArticulo.maestro_articulo.costo_unitario;
        //                 const cantidadNecesaria = receta.cant_necesaria;
        //                 const totalArticulo = costoUnitarioArticulo*cantidadNecesaria
        //                 const totalPedido = pedidoProduccion.cant_requerida * totalArticulo;
        //                 costoTotalMesa += totalPedido;
        //             }
        //         }
        //     }

            
        //     costoPorMesa.push({ id: maestroArticulo.id, costo: costoTotalMesa });
        // }

        await mesas.forEach(element => {
            costoTotal += element.precio;
            return costoTotal;
        })
// <=================================== Final de  Costo Total =====================================>


// <========================= Recaudacion =============================>
        await mesas.forEach(element => {
            recaudacionTotal += element.total;
            console.log(recaudacionTotal);
            return recaudacionTotal;
        })
// <========================= Final Recaudacion =============================>

// <========================= Ganancia =============================>

    let ganacia = recaudacionTotal - costoTotal;

// // <========================= Final Ganancia =============================>

return {recaudacion: recaudacionTotal, costo: costoTotal, ganancia: ganacia}
        
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



module.exports = {
cerrarCaja, calcularCosto
};