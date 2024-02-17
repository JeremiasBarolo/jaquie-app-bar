

    const { where } = require('sequelize');
var models = require('../models');

    const listAllpedido_stock = async () => {
        try {
            const pedido_stock = await models.pedido_stock.findAll({
                include: {
                    model: models.maestro_articulos,
                }
            });
            console.log('✅ pedido_stock were found');
            return pedido_stock;
        } catch (err) {
            console.error('🛑 Error when fetching pedido_stock', err);
            throw err;
        }
    };

    const listOnepedido_stock= async (pedido_stock_id) => {
    try {
        const onepedido_stock= await models.pedido_stock.findByPk(pedido_stock_id, 
        );
        if (!onepedido_stock) {
        
        return null;
        }
        return onepedido_stock;
    } catch (err) {
        
        throw err;
    }
    };

    const createpedido_stock = async (Datapedido_stock) => {

        try {
            
            const existingPedidoStock = await models.pedido_stock.findOne({ where: { articuloId: Datapedido_stock.articuloId } });
    
            if (existingPedidoStock) {
                
                const suma = existingPedidoStock.cant_requerida += Datapedido_stock.cant_requerida;
                await existingPedidoStock.update({ cant_requerida: suma });
            } else {
                
                const newPedidoStock = await models.pedido_stock.create(Datapedido_stock);
                return newPedidoStock;
            }
        } catch (err) {
            console.error('🛑 Error when creating or updating pedido_stock', err);
            throw err;
        }
    }
    
    
    const updatepedido_stock= async (pedido_stock_id, dataUpdated) => {


    try {

        const oldpedido_stock= await models.pedido_stock.findByPk(pedido_stock_id);
        
        let newpedido_stock = await oldpedido_stock.update(dataUpdated);

        return newpedido_stock;
    } catch (err) {
        console.error('🛑 Error when updating pedido_stock', err);
        throw err;
    }
    
    };


    const deletepedido_stock = async (pedido_stock_id) => {
    try {
        const deletedpedido_stock = await models.pedido_stock.findByPk(pedido_stock_id, 
        );

        if (!deletedpedido_stock) {
        return null;
        }
        
        await models.pedido_stock.destroy({ where: { id: pedido_stock_id } });


        return deletedpedido_stock;
    } catch (err) {
        console.error('🛑 Error when deleting pedido_stock', err);
        throw err;
    }
    };


    module.exports = {
    listAllpedido_stock, listOnepedido_stock, createpedido_stock, updatepedido_stock, deletepedido_stock,
    };

