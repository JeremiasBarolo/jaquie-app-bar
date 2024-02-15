

    var models = require('../models');

    const listAllventa= async () => {
    try {
        const venta = await models.venta.findAll({

            include: [{model: models.pedido_produccion}],

        });
        console.log('✅ venta were found');
        return venta;
    } catch (err) {
        console.error('🛑 Error when fetching venta', err);
        throw err;
    }
    };

    const listOneventa= async (venta_id) => {
    try {
        const oneventa= await models.venta.findByPk(venta_id, 
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

    const updateventa= async (venta_id, dataUpdated) => {
    

    try {

        const oldventa= await models.venta.findByPk(venta_id);
        
        let newventa = await oldventa.update(dataUpdated);

        return newventa;
    } catch (err) {
        console.error('🛑 Error when updating venta', err);
        throw err;
    }
    
    };


    const deleteventa = async (venta_id) => {
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

