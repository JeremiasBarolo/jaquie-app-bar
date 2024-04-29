
    var models = require('../models');
    const {listOnemaestro_articulos} = require('./maestro_articulos');
    const {listOnedisponibilidad_articulos} = require('./disponibilidad_articulos');
const { where } = require('sequelize');

    

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
    
                if (maestro.tipo_articulo.description === "Productos Elaborados") {
                    await Promise.all(maestro.receta.map(async receta => {
                        const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                        const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                        if (!existente) {
                            insumos_recorridos.push({
                                id: disponibilidad.id,
                                cant_necesaria: receta.cant_necesaria * insumo.cantidad
                            });
                        } else {
                            existente.cant_necesaria += insumo.cantidad * insumo.cantidad
                        }
                    }));
                }else if(maestro.tipo_articulo.description === "Bebidas"){
                   
                        const maestroReal = await models.Bebidas.findOne({
                            where: {nombre: insumo.id}
                        });
                        
                        let componentes = await traerComponentesDeBebida(maestroReal)

                        await Promise.all(componentes.map(async receta => {

                            let disponibilidad = await models.disponibilidad_articulos.findOne({
                                where:  { articuloId: receta.componente }
                            })

                            //  <=================== calculamos cantidad exacta ======================>
                            let alto = maestroReal.cantidadTotalRecipiente * receta.cantidad
                            let total = alto / 100

                            let cant_principal_exacta = total / 1000 

                            const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                            if (!existente) {
                                insumos_recorridos.push({
                                    id: disponibilidad.id,
                                    cant_necesaria: cant_principal_exacta * insumo.cantidad,
                                });
                            } else {
                                existente.cant_necesaria += cant_principal_exacta * insumo.cantidad;
                            }

                            //  <=================== Actualizamos ======================>
                            // await disponibilidad.update({
                            //     cant_comprometida: disponibilidad.cant_comprometida + cant_principal_exacta,
                            //     cant_disponible: disponibilidad.cant_disponible - cant_principal_exacta,
                            //     cant_fisica: disponibilidad.cant_fisica - cant_principal_exacta,
                            // });
                            



                        }));

                        return componentes;

                    
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
    
            
            await Promise.all(insumos_recorridos.map(async (receta) => {
                let disponibilidad = await listOnedisponibilidad_articulos(receta.id);
                await disponibilidad.update({
                    cant_fisica: disponibilidad.cant_fisica,
                    cant_disponible: disponibilidad.cant_disponible - receta.cant_necesaria,
                    cant_comprometida: disponibilidad.cant_comprometida + receta.cant_necesaria,
                });
                
            }));
    
            return insumos_recorridos;
        } catch (err) {
            console.error('🛑 Error when creating or updating pedido_stock', err);
            throw err;
        }
    };

    const updatepedido_produccion = async (pedido_produccion_id, dataUpdated) => {
        try {
           
            let insumos_recorridos = [];
            // Iteramos sobre los insumos enviados
            for (const insumo of dataUpdated.insumos) {
                const maestro = await listOnemaestro_articulos(insumo.id);
                
    
               
                let pedidoExistente = await models.pedido_produccion.findOne({
                    where: { maestroId: insumo.id, ventaId: dataUpdated.mesa }
                });
    
                if (!pedidoExistente) {
                    pedidoExistente = await models.pedido_produccion.create({
                        maestroId: insumo.id,
                        ventaId: dataUpdated.mesa,
                        cant_requerida: insumo.cantidad
                    });
                } 
    
                
                if ( maestro.tipo_articulo.description === "Productos Elaborados") {
                    for (const receta of maestro.receta) {
                        const disponibilidad = await  models.disponibilidad_articulos.findByPk(receta.disponibilidad_articulo.id);
                        await insumoRecorridos(disponibilidad.id, dataUpdated.mesa, maestro.id, insumo.cantidad, pedidoExistente, insumos_recorridos, maestro.tipo_articulo.description, insumo.cantidad );
                    }


                }else if(maestro.tipo_articulo.description === "Bebidas"){
                    const maestroReal = await models.Bebidas.findOne({
                        where: {nombre: insumo.id}
                    });
                    
                    let componentes = await traerComponentesDeBebida(maestroReal)

                    await Promise.all(componentes.map(async receta => {
                        let disponibilidad = await models.disponibilidad_articulos.findOne({
                            where:  { articuloId: receta.componente }
                        })

                        //  <=================== calculamos cantidad exacta ======================>
                        let alto = maestroReal.cantidadTotalRecipiente * receta.cantidad
                        let total = alto / 100

                        let cant_principal = total / 1000
                        let cant_principal_exacta = cant_principal
                        

                        //  <=================== Lo hacemos pasar por insumos recorridos ======================>
                        await insumoRecorridos(disponibilidad.id, dataUpdated.mesa, maestro.id, cant_principal_exacta, pedidoExistente, insumos_recorridos, maestro.tipo_articulo.description, insumo.cantidad);
                      
                    }));


                }else {
                    const disponibilidad = await models.disponibilidad_articulos.findOne({ where: { articuloId: maestro.id } });
                    await insumoRecorridos(disponibilidad.id, dataUpdated.mesa, maestro.id, insumo.cantidad, pedidoExistente, insumos_recorridos, maestro.tipo_articulo.description,insumo.cantidad);
                }
            }
            

            const oldpedido_produccion = await models.venta.findByPk(pedido_produccion_id, { include: [{ all: true }] });


            if(oldpedido_produccion.estado === 'PREPARACION'){

                for (const disponibilidad_art of insumos_recorridos) {
                    let disponibilidad = await listOnedisponibilidad_articulos(disponibilidad_art.id);
                    const stock_real = disponibilidad.cant_disponible + disponibilidad_art.cantidad_anterior;
                    
                    const cant_fisica_nueva = disponibilidad.cant_fisica
                    const cant_disponible_nueva = stock_real - disponibilidad_art.cant_necesaria;
    
                    const cant_comprometida_real = disponibilidad.cant_comprometida- disponibilidad_art.cantidad_anterior;
                    const cant_comprometida_nueva = cant_comprometida_real + disponibilidad_art.cant_necesaria;
                    
                    await disponibilidad.update({
                        cant_fisica: cant_fisica_nueva,
                        cant_disponible: cant_disponible_nueva,
                        cant_comprometida: cant_comprometida_nueva
                    });
                }
                
            }else if(oldpedido_produccion.estado === 'COMIENDO'){
                for (const disponibilidad_art of insumos_recorridos) {
                    let disponibilidad = await listOnedisponibilidad_articulos(disponibilidad_art.id);
                    const stock_real = disponibilidad.cant_disponible + disponibilidad_art.cantidad_anterior;
                    
                    const cant_fisica_nueva = stock_real - disponibilidad_art.cant_necesaria;
                    const cant_disponible_nueva = stock_real - disponibilidad_art.cant_necesaria;
    
                    const cant_comprometida_real = disponibilidad.cant_comprometida- disponibilidad_art.cantidad_anterior;
                    const cant_comprometida_nueva = cant_comprometida_real + disponibilidad_art.cant_necesaria;
                    
                    await disponibilidad.update({
                        cant_fisica: cant_fisica_nueva,
                        cant_disponible: cant_disponible_nueva,
                        cant_comprometida: cant_comprometida_nueva
                    });
                }
            }
            
            




            // <========================================= Filtrado de insumos inexistentes ===============================>

            const insumos_en_pedido = await models.pedido_produccion.findAll({
            where: {
                ventaId: dataUpdated.mesa,
            }
            });

            for(insumo_existentes of insumos_en_pedido){
                const existe = dataUpdated.insumos.find(existente => existente.id === insumo_existentes.maestroId);

            
                if (!existe) {
                    await insumo_existentes.destroy();
                }
            }

            
        // <========================================= Actualizamos los pedidos existentes ===============================>
            

            
                for (const maestro of oldpedido_produccion.maestro_articulos) {
                    for (const insumo of dataUpdated.insumos) {
                        if (maestro.id === insumo.id) {
                            await maestro.pedido_produccion.update({
                                cant_requerida: insumo.cantidad,
                            });
                        }
                    }
                }
            
        
           
    
            return dataUpdated;
        } catch (err) {
            console.error('🛑 Error al actualizar pedido_produccion', err);
            throw err;
        }
    };
    
    


    const deletepedido_produccion = async (pedido_produccion_id) => {

        

        try {
            const deletedpedido_produccion = await models.venta.findByPk(pedido_produccion_id, { include: ['maestro_articulos'] });
    
            
            if (deletedpedido_produccion) {



                for (const maestro of deletedpedido_produccion.maestro_articulos) {
                    
                    let maestroReal = await listOnemaestro_articulos(maestro.id)

                    let pedidos = await models.pedido_produccion.findAll({ where: { ventaId: deletedpedido_produccion.id } });
                    let pedido = pedidos.find(item => item.maestroId === maestroReal.id);

                    if(maestroReal.tipo_articulo.description === 'Bebidas'){

                        const bebida = await models.Bebidas.findOne({
                            where: {nombre: maestroReal.id}
                        });

                        
                        
                        let componentes = await traerComponentesDeBebida(bebida)

                        await Promise.all(componentes.map(async receta => {

                            let disponibilidad = await models.disponibilidad_articulos.findOne({
                                where:  { articuloId: receta.componente }
                            })

                            //  <=================== calculamos cantidad exacta ======================>
                            let alto = bebida.cantidadTotalRecipiente * receta.cantidad
                            let total = alto / 100

                            let cant_principal = total / 1000
                            let cant_principal_exacta = cant_principal * pedido.cant_requerida


                            //  <=================== Actualizamos ======================>
                            await disponibilidad.update({
                                cant_comprometida: disponibilidad.cant_comprometida - cant_principal_exacta,
                                cant_disponible: disponibilidad.cant_disponible + cant_principal_exacta,
                                cant_fisica: disponibilidad.cant_fisica,
                            });
                            



                        }));


                    }else if(maestroReal.tipo_articulo.description === 'Productos Elaborados'){
                        const disponibilidad = await listOnemaestro_articulos(maestro.id);
                        
                        disponibilidad.receta.forEach(async receta => {
                                const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                                await disponibilidad.update({
                                    cant_fisica: disponibilidad.cant_fisica,
                                    cant_disponible: disponibilidad.cant_disponible + receta.cant_necesaria * pedido.cant_requerida,
                                    cant_comprometida: disponibilidad.cant_comprometida - receta.cant_necesaria * pedido.cant_requerida,
                                });
                        });
                        
                    }
                    else{
                        
                        const disponibilidad = await models.disponibilidad_articulos.findOne({
                            where:  { articuloId: maestro.id }
                        })

                        await disponibilidad.update({
                            cant_fisica: disponibilidad.cant_fisica,
                            cant_disponible: disponibilidad.cant_disponible + pedido.cant_requerida,
                            cant_comprometida: disponibilidad.cant_comprometida - pedido.cant_requerida,
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

    

   

    
    const insumoRecorridos = async (disponibilidad_id, mesa_id, maestro_id, insumo_cantidad, pedido_existente, insumos_recorridos, tipo_articulo, cantidad_necesaria) => {
        const existente = insumos_recorridos.find(item => item.id === disponibilidad_id);
        const cantidad_anterior_data = await models.pedido_produccion.findOne({ where: { maestroId: maestro_id, ventaId: mesa_id } });
        let cantidad_anterior = 
        cantidad_anterior_data 
        ? cantidad_anterior_data.cant_requerida 
        : 0;

        if(tipo_articulo === 'Bebidas'){
            let cantidad_anterior_real = insumo_cantidad * cantidad_anterior
            let cantidad_pedido = insumo_cantidad * cantidad_necesaria

            if (!existente) {
                if (!pedido_existente || !cantidad_anterior) {
                    // por si lo creamos o no tenemos cantidad anterior
                    insumos_recorridos.push({
                        id: disponibilidad_id,
                        cant_necesaria: cantidad_pedido,
                        cantidad_anterior: 0,
                    });
                } else {
                    insumos_recorridos.push({
                        id: disponibilidad_id,
                        cant_necesaria: cantidad_pedido,
                        cantidad_anterior: cantidad_anterior_real,
                    });
                }
            } else {
                if (!pedido_existente || !cantidad_anterior_real) {
                    
                    existente.cant_necesaria += cantidad_pedido;
                    existente.cantidad_anterior += 0;
                } else {
                    existente.cant_necesaria += cantidad_pedido;
                }
            }


        // <=============== SI NO ES BEBIDA =======================>
        }else{
            if (!existente) {
                if (!pedido_existente || !cantidad_anterior) {
                    // por si lo creamos o no tenemos cantidad anterior
                    insumos_recorridos.push({
                        id: disponibilidad_id,
                        cant_necesaria: insumo_cantidad,
                        cantidad_anterior: 0,
                    });
                } else {
                    insumos_recorridos.push({
                        id: disponibilidad_id,
                        cant_necesaria: insumo_cantidad,
                        cantidad_anterior: cantidad_anterior,
                    });
                }
            } else {
                if (!pedido_existente || !cantidad_anterior) {
                    // por si lo creamos o no tenemos cantidad anterior
                    existente.cant_necesaria += insumo_cantidad;
                    existente.cantidad_anterior += 0;
                } else {
                    existente.cant_necesaria += insumo_cantidad;
                }
            }
        }
    
       
    };

    const traerComponentesDeBebida = async (bebida ) => {

        let componentes = []
        
    
        for (const key of ['primerComponente', 'segundoComponente', 'tercerComponente', 'cuartoComponente', 'quintoComponente']) {
          if (bebida[key] !== null && bebida[`${key}Cantidad`] !== null) {
            componentes.push({
              componente: bebida[key],
              cantidad: bebida[`${key}Cantidad`]
            });
          }
        }

        return componentes
    }
    


        
    module.exports = {
        listAllpedido_produccion, listOnepedido_produccion, createpedido_produccion, updatepedido_produccion, deletepedido_produccion, traerComponentesDeBebida
        };
                
    