

    var models = require('../models');

    const listAllTipoFormaPagos= async () => {
    try {
        const TipoFormaPagos = await models.TipoFormaPagos.findAll(
        );
        console.log('✅ TipoFormaPagos were found');
        return TipoFormaPagos;
    } catch (err) {
        console.error('🛑 Error when fetching TipoFormaPagos', err);
        throw err;
    }
    };

    const listOneTipoFormaPagos= async (TipoFormaPagos_id) => {
    try {
        const oneTipoFormaPagos= await models.TipoFormaPagos.findByPk(TipoFormaPagos_id, 
        );
        if (!oneTipoFormaPagos) {
        
        return null;
        }
        return oneTipoFormaPagos;
    } catch (err) {
        
        throw err;
    }
    };

    const createTipoFormaPagos= async (DataTipoFormaPagos) => {
    

    try {
        
        const newTipoFormaPagos= await models.TipoFormaPagos.create(DataTipoFormaPagos);
        
        return newTipoFormaPagos;
        
    } catch (err) {
        console.error('🛑 Error when creating TipoFormaPagos', err);
        throw err;
    }
    };

    const updateTipoFormaPagos= async (TipoFormaPagos_id, dataUpdated) => {
    

    try {

        const oldTipoFormaPagos= await models.TipoFormaPagos.findByPk(TipoFormaPagos_id);
        
        let newTipoFormaPagos = await oldTipoFormaPagos.update(dataUpdated);

        return newTipoFormaPagos;
    } catch (err) {
        console.error('🛑 Error when updating TipoFormaPagos', err);
        throw err;
    }
    
    };


    const deleteTipoFormaPagos = async (TipoFormaPagos_id) => {
    try {
        const deletedTipoFormaPagos = await models.TipoFormaPagos.findByPk(TipoFormaPagos_id, 
        );

        if (!deletedTipoFormaPagos) {
        return null;
        }
        
        await models.TipoFormaPagos.destroy({ where: { id: TipoFormaPagos_id } });


        return deletedTipoFormaPagos;
    } catch (err) {
        console.error('🛑 Error when deleting TipoFormaPagos', err);
        throw err;
    }
    };


    module.exports = {
    listAllTipoFormaPagos, listOneTipoFormaPagos, createTipoFormaPagos, updateTipoFormaPagos, deleteTipoFormaPagos,
    };

