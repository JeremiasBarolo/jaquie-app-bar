

    var models = require('../models');

    const listAllestadistica= async () => {
    try {
        const estadistica = await models.estadistica.findAll(
        );
        console.log('✅ estadistica were found');
        return estadistica;
    } catch (err) {
        console.error('🛑 Error when fetching estadistica', err);
        throw err;
    }
    };

    const listOneestadistica= async (estadistica_id) => {
    try {
        const oneestadistica= await models.estadistica.findByPk(estadistica_id, 
        );
        if (!oneestadistica) {
        
        return null;
        }
        return oneestadistica;
    } catch (err) {
        
        throw err;
    }
    };

    const createestadistica= async (Dataestadistica) => {
    

    try {
        
        const newestadistica= await models.estadistica.create(Dataestadistica);
        
        return newestadistica;
        
    } catch (err) {
        console.error('🛑 Error when creating estadistica', err);
        throw err;
    }
    };

    const updateestadistica= async (estadistica_id, dataUpdated) => {
    

    try {

        const oldestadistica= await models.estadistica.findByPk(estadistica_id);
        
        let newestadistica = await oldestadistica.update(dataUpdated);

        return newestadistica;
    } catch (err) {
        console.error('🛑 Error when updating estadistica', err);
        throw err;
    }
    
    };


    const deleteestadistica = async (estadistica_id) => {
    try {
        const deletedestadistica = await models.estadistica.findByPk(estadistica_id, 
        );

        if (!deletedestadistica) {
        return null;
        }
        
        await models.estadistica.destroy({ where: { id: estadistica_id } });


        return deletedestadistica;
    } catch (err) {
        console.error('🛑 Error when deleting estadistica', err);
        throw err;
    }
    };


    module.exports = {
    listAllestadistica, listOneestadistica, createestadistica, updateestadistica, deleteestadistica,
    };

