

    var models = require('../models');
    const {calcularCosto} = require('./cerrarCaja');
    const { listAlldisponibilidad_articulos, listOnedisponibilidad_articulos } = require('./disponibilidad_articulos');
    const {listOnemaestro_articulos} = require('./maestro_articulos');

    const listAllventa= async () => {
        try {
            const ventas = await models.venta.findAll({
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
            return ventas;
        } catch (err) {
            console.error('🛑 Error when fetching ventas', err);
            throw err;
        }
    };

    const listOneventa= async (venta_id) => {
    try {
        const oneventa= await models.venta.findByPk(venta_id,{ 
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
        }
        );
        if (!oneventa) {
        
        return null;
        }
        return oneventa;
    } catch (err) {
        
        throw err;
    }
    };

    const createventa= async (Dataventa) => {
    

    try {
        
        const newventa= await models.venta.create(Dataventa);
        
        return newventa;

        
        
    } catch (err) {
        console.error('🛑 Error when creating venta', err);
        throw err;
    }
    };

    const updateventa = async (venta_id, dataUpdated) => {
        try {
            let insumos_recorridos = [];
            const oldventa = await listOneventa(venta_id);
            
            if (dataUpdated.estado === 'FINALIZADO') {
                let costo = await calcularCosto(oldventa.maestro_articulos);
                let newventa = await oldventa.update({...dataUpdated, total: dataUpdated.subtotal, precio: costo});
                let pedidos = await models.pedido_produccion.findAll({ where: { ventaId: venta_id } });

                //<================ CAMBIO DE ESTADO ==================>
                for (const pedido of pedidos) {
                    pedido.update({
                        estado: dataUpdated.estado
                    });
                }

                //<================ RELLENO DE ARRAY DE INSUMOS  ==================>
                for(const maestro_principal of oldventa.maestro_articulos){
                    const maestro = await listOnemaestro_articulos(maestro_principal.id);
    
                        if (maestro.tipo_articulo.description === "Bebidas" || maestro.tipo_articulo.description === "Productos Elaborados") {
                            await Promise.all(maestro.receta.map(async receta => {
                                const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                                const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                                let pedido = await models.pedido_produccion.findOne({ where: { maestroId: maestro.id, ventaId: venta_id } });   
                                if (!existente) {
                                    insumos_recorridos.push({
                                        id: disponibilidad.id,
                                        cant_restar: receta.cant_necesaria * pedido.cant_requerida,
                                    });
                                } else {
                                    existente.cant_restar += receta.cant_necesaria * pedido.cant_requerida;
                                }
                            }));
                        } else {
                            const disponibilidad = await models.disponibilidad_articulos.findOne({ where: { articuloId: maestro.id } });
                            const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                            let pedido = await models.pedido_produccion.findOne({ where: { maestroId: maestro.id, ventaId: venta_id } });

                            if (!existente) {
                                insumos_recorridos.push({
                                    id: disponibilidad.id,
                                    cant_restar: pedido.cant_requerida,
                                });
                            } else {
                                existente.cant_restar += pedido.cant_requerida;
                            }
                        };



                        

                }

                
            //<================ UPDATE DE INSUMOS ==================>
            for (const insumo of insumos_recorridos) {
                let disponibilidad = await listOnedisponibilidad_articulos(insumo.id)
                await disponibilidad.update({
                    cant_comprometida: disponibilidad.cant_comprometida - insumo.cant_restar,
                })
            } 

            

            } else if (dataUpdated.estado === 'DEVOLVER') {
                if (oldventa.maestro_articulos.length === 0) {
                    
                    await models.venta.destroy({ where: { id: venta_id } });
                } else {
                    for (const maestro of oldventa.maestro_articulos) {
                        let entidad = await listOnemaestro_articulos(maestro.id);
                        let pedidos = await models.pedido_produccion.findAll({ where: { ventaId: venta_id } });
            
                        if (entidad.tipo_articulo.description === "Bebidas" || entidad.tipo_articulo.description === "Productos Elaborados") {
                            for (const receta of entidad.receta) {
                                let pedido = pedidos.find(item => item.maestroId === maestro.id);
                                await receta.disponibilidad_articulo.update({
                                    cant_disponible: receta.disponibilidad_articulo.cant_disponible + (receta.cant_necesaria * pedido.cant_requerida),
                                    cant_comprometida: receta.disponibilidad_articulo.cant_comprometida - (receta.cant_necesaria * pedido.cant_requerida),
                                    cant_fisica: receta.disponibilidad_articulo.cant_disponible + (receta.cant_necesaria * pedido.cant_requerida),
                                });
                            }
                        } else {
                            let pedido = pedidos.find(item => item.maestroId === entidad.id);
                            let disponibilidad = await models.disponibilidad_articulos.findOne({ where: { articuloId: entidad.id } });
            
                            await disponibilidad.update({
                                cant_disponible: disponibilidad.cant_disponible + pedido.cant_requerida,
                                cant_comprometida: disponibilidad.cant_comprometida - pedido.cant_requerida,
                                cant_fisica: disponibilidad.cant_disponible + pedido.cant_requerida,
                            });
                        }
                    }
            
                    
                    await models.venta.destroy({ where: { id: venta_id } });
                }
            }else{
                let costo = await calcularCosto(oldventa.maestro_articulos)
                let newventa = await oldventa.update({...dataUpdated, total:dataUpdated.subtotal, precio:costo});
                return true
            }
        } catch (err) {
            console.error('🛑 Error when updating venta', err);
            throw err;
        }
    };
    


    const deleteventa = async (venta_id, devolver) => {
    try {
        const deletedventa = await models.venta.findByPk(venta_id, 
        );

        if (!deletedventa) {
        return null;
        }
        
        await models.venta.destroy({ where: { id: venta_id } });


        return deletedventa;
    } catch (err) {
        console.error('🛑 Error when deleting venta', err);
        throw err;
    }
    };


    module.exports = {
    listAllventa, listOneventa, createventa, updateventa, deleteventa,
    };

