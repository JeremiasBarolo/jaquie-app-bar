
    var models = require('../models');
    const {listOnemaestro_articulos} = require('./maestro_articulos');
    const {listOnedisponibilidad_articulos} = require('./disponibilidad_articulos');

    const listAllpedido_produccion = async () => {
        try {
            const pedido_produccion = await models.pedido_produccion.findAll({
                include: [{ all:true}],
                attributes: ['id', 'cant_requerida', 'updatedAt', 'createdAt']
            });

            return pedido_produccion;
        } catch (err) {
            console.error('🛑 Error when fetching pedido_produccion', err);
            throw err;
        }
    };
    
    

    const listOnepedido_produccion= async (pedido_produccion_id) => {
    try {
        const onepedido_produccion= await models.pedido_produccion.findByPk(pedido_produccion_id, {
            include: [{ all:true}],
            attributes: ['id', 'cant_requerida', 'updatedAt', 'createdAt']
        }
        );
        if (!onepedido_produccion) {
        
        return null;
        }
        return onepedido_produccion;
    } catch (err) {
        
        throw err;
    }
    };

    const createpedido_produccion= async (Datapedido_produccion) => {
        let insumos_recorridos = [];
    
        try {
            await Promise.all(Datapedido_produccion.insumos.map(async insumo => {
                await models.pedido_produccion.create({
                    maestroId: insumo.id,
                    cant_requerida: insumo.cantidad,
                    ventaId: Datapedido_produccion.mesa,
                    estado: Datapedido_produccion.estado
                });
    
                const maestro = await listOnemaestro_articulos(insumo.id);
    
                if (maestro.tipo_articulo.description === "Bebidas" || maestro.tipo_articulo.description === "Productos Elaborados") {
                    await Promise.all(maestro.receta.map(async receta => {
                        const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                        const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                        if (!existente) {
                            insumos_recorridos.push({
                                id: disponibilidad.id,
                                cant_necesaria: insumo.cantidad,
                            });
                        } else {
                            existente.cant_necesaria += insumo.cantidad;
                        }
                    }));
                } else {
                    const disponibilidad = await models.disponibilidad_articulos.findOne({ where: { articuloId: maestro.id } });
                    const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                    if (!existente) {
                        insumos_recorridos.push({
                            id: disponibilidad.id,
                            cant_necesaria: insumo.cantidad,
                        });
                    } else {
                        existente.cant_necesaria += insumo.cantidad;
                    }
                }
            }));
    
            
            insumos_recorridos.map(async (receta) => {
                let disponibilidad = await listOnedisponibilidad_articulos(receta.id);
                disponibilidad.update({
                    cant_fisica: disponibilidad.cant_fisica - receta.cant_necesaria,
                    cant_disponible: disponibilidad.cant_disponible - receta.cant_necesaria,
                    cant_comprometida: disponibilidad.cant_comprometida + receta.cant_necesaria,
                });
            });
    
            return insumos_recorridos;
        } catch (err) {
            console.error('🛑 Error when creating or updating pedido_stock', err);
            throw err;
        }
    };

    const updatepedido_produccion = async (pedido_produccion_id, dataUpdated) => {
        let insumos_recorridos = [];
        try {

            await Promise.all(dataUpdated.insumos.map(async insumo => {

                const maestro = await listOnemaestro_articulos(insumo.id);
    
                if (maestro.tipo_articulo.description === "Bebidas" || maestro.tipo_articulo.description === "Productos Elaborados") {
                    await Promise.all(maestro.receta.map(async receta => {
                        const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                        const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                        const cantidad_anterior = await models.pedido_produccion.findOne({ where: { maestroId: maestro.id, ventaId: dataUpdated.mesa } });

                        if (!existente) {
                            insumos_recorridos.push({
                                id: disponibilidad.id,
                                cant_necesaria: insumo.cantidad,
                                cantidad_anterior: cantidad_anterior.cant_requerida,
                            });
                        } else {
                            existente.cant_necesaria += insumo.cantidad;
                            existente.cantidad_anterior += cantidad_anterior;
                        }
                      
                    }));
                } else {
                    const disponibilidad = await models.disponibilidad_articulos.findOne({ where: { articuloId: maestro.id } });
                    const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                    const cantidad_anterior = await models.pedido_produccion.findOne({ where: { maestroId: maestro.id, ventaId: dataUpdated.mesa } });

                    if (!existente) {
                        insumos_recorridos.push({
                            id: disponibilidad.id,
                            cant_necesaria: insumo.cantidad,
                            cantidad_anterior: cantidad_anterior.cant_requerida,
                        });
                    } else {
                        existente.cant_necesaria += insumo.cantidad;
                        existente.cantidad_anterior += cantidad_anterior;
                    }
                }
            }));

            insumos_recorridos.map(async (disponibilidad_art) => {
                let disponibilidad = await listOnedisponibilidad_articulos(disponibilidad_art.id);

                disponibilidad.update({
                    cant_fisica: disponibilidad.cant_fisica + disponibilidad_art.cantidad_anterior - disponibilidad_art.cant_necesaria,
                    cant_disponible: disponibilidad.cant_disponible + disponibilidad_art.cantidad_anterior - disponibilidad_art.cant_necesaria,
                    cant_comprometida: disponibilidad.cant_comprometida - disponibilidad_art.cantidad_anterior + disponibilidad_art.cant_necesaria,
                });
            });

            // actualizar pedido
            const oldpedido_produccion = await models.venta.findByPk(pedido_produccion_id, { include: [{ all: true }] });
        
            await Promise.all(oldpedido_produccion.maestro_articulos.map(async maestro => {
                dataUpdated.insumos.forEach(async insumo => {
                    if (maestro.id === insumo.id) {
                        await maestro.pedido_produccion.update({
                            cant_requerida: insumo.cantidad,
                        });
                    }
                });
            }));
    
            return dataUpdated;
        } catch (err) {
            console.error('🛑 Error when updating pedido_produccion', err);
            throw err;
        }
    };
    


    const deletepedido_produccion = async (pedido_produccion_id) => {
        try {
            const deletedpedido_produccion = await models.venta.findByPk(pedido_produccion_id, { include: ['maestro_articulos'] });
    
            
            if (deletedpedido_produccion) {
                for (const maestro of deletedpedido_produccion.maestro_articulos) {
                    
                    const disponibilidad = await listOnemaestro_articulos(maestro.id);
                    if (disponibilidad.receta.length > 0) {
                        disponibilidad.receta.forEach(async receta => {
                            const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                            await disponibilidad.update({
                                cant_fisica: disponibilidad.cant_fisica + receta.cant_necesaria,
                                cant_disponible: disponibilidad.cant_disponible + receta.cant_necesaria,
                                cant_comprometida: disponibilidad.cant_comprometida - receta.cant_necesaria,
                            });
                        });
                    }else{
                        await disponibilidad.update({
                            cant_fisica: disponibilidad.cant_fisica + maestro.pedido_produccion.cant_requerida,
                            cant_disponible: disponibilidad.cant_disponible + maestro.pedido_produccion.cant_requerida,
                            cant_comprometida: disponibilidad.cant_comprometida - maestro.pedido_produccion.cant_requerida,
                        });
                    }
                     
                    await maestro.pedido_produccion.destroy();
                }
                
    
                
                // await deletedpedido_produccion.destroy();
            } else {
                console.log('Pedido de producción no encontrado');
            }
        } catch (error) {
            console.error('Error al eliminar pedido de producción:', error);
            throw error;
        }
    }

    

    module.exports = {
    listAllpedido_produccion, listOnepedido_produccion, createpedido_produccion, updatepedido_produccion, deletepedido_produccion,
    };

    