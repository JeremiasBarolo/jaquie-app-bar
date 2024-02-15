

    var models = require('../models');

    const listAllpedido_produccion= async () => {
    try {
        const pedido_produccion = await models.pedido_produccion.findAll(
        );
        console.log('✅ pedido_produccion were found');
        return pedido_produccion;
    } catch (err) {
        console.error('🛑 Error when fetching pedido_produccion', err);
        throw err;
    }
    };

    const listOnepedido_produccion= async (pedido_produccion_id) => {
    try {
        const onepedido_produccion= await models.pedido_produccion.findByPk(pedido_produccion_id, 
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
    

    try {
        
        const newpedido_produccion= await models.pedido_produccion.create(Datapedido_produccion);
        
        return newpedido_produccion;
        
    } catch (err) {
        console.error('🛑 Error when creating pedido_produccion', err);
        throw err;
    }
    };

    const updatepedido_produccion= async (pedido_produccion_id, dataUpdated) => {
    

    try {

        const oldpedido_produccion= await models.pedido_produccion.findByPk(pedido_produccion_id);
        
        let newpedido_produccion = await oldpedido_produccion.update(dataUpdated);

        return newpedido_produccion;
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

