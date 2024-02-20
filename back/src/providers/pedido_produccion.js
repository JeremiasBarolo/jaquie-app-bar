

    var models = require('../models');

    const listAllpedido_produccion = async () => {
        try {
            const pedido_produccion = await models.pedido_produccion.findAll({
                include: [{ all:true}],
                attributes: ['id', 'cant_requerida', 'updatedAt', 'createdAt']
            });

            pedido_produccion.forEach(pedido => {
                console.log('pedido_produccion ID:', pedido.id);
                // Aquí puedes hacer más operaciones con cada pedido_produccion si es necesario
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
    
        // return await models.pedido_produccion.create(Datapedido_produccion)
        try {
            const newPedidoStock = Datapedido_produccion.insumos.forEach(async insumo => {
                await models.pedido_produccion.create(
                    {
                        maestroId: insumo.id,
                        cant_requerida: insumo.cantidad,
                        ventaId: Datapedido_produccion.mesa
                    }
                );
            });
            return newPedidoStock;
                
                
            
        } catch (err) {
            console.error('🛑 Error when creating or updating pedido_stock', err);
            throw err;
        }
 };

    const updatepedido_produccion= async (pedido_produccion_id, dataUpdated) => {
    

    try {

        const oldpedido_produccion= await models.venta.findByPk(pedido_produccion_id, {include: [{ all:true}]});
        
        try {
            oldpedido_produccion.maestro_articulos.forEach(maestro => {
                dataUpdated.insumos.forEach(insumo => {
                    if (maestro.id === insumo.id) {
                        maestro.pedido_produccion.update({
                            cant_requerida: insumo.cantidad,
                        })
                    }
                })
            })
                
            const newpedido_produccion=oldpedido_produccion.update(
                {id: dataUpdated.mesa }
            )

            return newpedido_produccion;
        } catch (err) {
            console.error('🛑 Error when creating or updating pedido_stock', err);
            throw err;
        }

        
    } catch (err) {
        console.error('🛑 Error when updating pedido_produccion', err);
        throw err;
    }
    
    };


    const deletepedido_produccion = async (pedido_produccion_id) => {
    try {
        const deletedpedido_produccion = await models.pedido_produccion.findByPk(pedido_produccion_id, 
        );

        if (!deletedpedido_produccion) {
        return null;
        }
        
        await models.pedido_produccion.destroy({ where: { id: pedido_produccion_id } });


        return deletedpedido_produccion;
    } catch (err) {
        console.error('🛑 Error when deleting pedido_produccion', err);
        throw err;
    }
    };


    module.exports = {
    listAllpedido_produccion, listOnepedido_produccion, createpedido_produccion, updatepedido_produccion, deletepedido_produccion,
    };

